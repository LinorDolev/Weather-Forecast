import React from "react";
import "./Home.css";
import DayWeather from "../dayWeather/DayWeather";
import {FlexboxGrid, AutoComplete, InputGroup, Icon, IconButton} from 'rsuite';
import CurrentWeather from "../currentWeather/CurrentWeather"
import WeatherService from "../../services/WeatherService.js"


const FAVORITES_KEY = 'favorites';
const DEFAULT_CITY_NAME = 'Tel-Aviv';
const DEFAULT_LOCATION_KEY = '215854';
const DEFAULT_CITY = {locationKey: DEFAULT_LOCATION_KEY, city: DEFAULT_CITY_NAME};


export default class Home extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            autoCompleteList: [],
            fiveDaysForecast: [],
            cityName: DEFAULT_CITY_NAME,
            temperature:0,
            weatherText:"",
            locationKey: DEFAULT_LOCATION_KEY,
            iconNumber: 0,
            unit:"",
            isFavorite: this.isFavorite()
        };
    }

    isFavorite(locationKey=DEFAULT_CITY){
        let favorites = JSON.parse(window.localStorage.getItem(FAVORITES_KEY));
        if(favorites === null)
            return false;

        return this.filterOutCity(favorites, locationKey).length !== favorites.length;
    }

    filterOutCity(cities, cityToFilter){
        return cities.filter((city) => city.locationKey !== cityToFilter.locationKey)
    }


    onChangeSearch(event){
        let curretSearchText = event.target.value;
        if(!curretSearchText || curretSearchText === ""){
            return
        }
        WeatherService.getAutoComplete(curretSearchText).then(
            (autoCompleteList) => {
                this.setState({autoCompleteList});
            }
        )
    }

    refreshWeather(){
        WeatherService.getCurrentWeather(this.state.locationKey).then((weatherInfo) => {
            let temperature = weatherInfo.Temperature.Metric.Value;
            let weatherText = weatherInfo.WeatherText;
            let isFavorite = this.isFavorite({
                locationKey: this.state.locationKey
            });
            let iconNumber = weatherInfo.WeatherIcon;
            this.setState({temperature, weatherText, isFavorite, iconNumber});
        });

        WeatherService.get5DaysForecast(this.state.locationKey).then((fiveDaysForecast) => {
            this.setState({fiveDaysForecast});
        });
    }

    componentDidMount() {
        this.refreshWeather();

    }



    onClickedAddToFavorite(){
        let favorites = window.localStorage.getItem(FAVORITES_KEY);

        if(favorites == null){
            favorites = [];
        }else {
            favorites = JSON.parse(favorites);
        }

        let currentCity = {
            locationKey: this.state.locationKey,
            cityName: this.state.cityName
        };

        let filteredCities = this.filterOutCity(favorites, currentCity);
        if(favorites.length === filteredCities.length) {
            favorites.push(currentCity);
            this.setState({
                isFavorite: true
            });
        }
        else {
            favorites = filteredCities;
            this.setState({
                isFavorite: false
            });
        }
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }

    toAutoCompleteResultItem(item){
        let representation = item.LocalizedName + ", " + item.Country.LocalizedName;
        return {
            label: representation,
            value: representation,
            key: item.Key
        };
    }

    onSelectCity(cityInfo){
        this.setState(
            {
                locationKey: cityInfo.key,
                cityName: cityInfo.label
            },
            this.refreshWeather.bind(this)
        );
    }

    render(){
        const heartIconClassName = this.state.isFavorite ? 'icon-red-heart' : 'icon-gray-heart';
        return(
            <div className={'home'}>
                <div className={'search-container'}>
                    <InputGroup inside className={'search-bar'}
                                placeholder={'Search here...'}
                                onChange={this.onChangeSearch.bind(this)}>
                    <AutoComplete onSelect={this.onSelectCity.bind(this)}
                                  data={this.state.autoCompleteList.map(this.toAutoCompleteResultItem.bind(this))}/>
                        <InputGroup.Button>
                            <Icon icon="search" />
                        </InputGroup.Button>
                    </InputGroup>

                </div>
                <div className='add-to-favorites'>
                    <IconButton className={heartIconClassName} icon={<Icon icon="heart" />}
                                circle size="lg"
                                onClick={this.onClickedAddToFavorite.bind(this)}/>
                </div>

                <CurrentWeather cityName={this.state.cityName}
                                temperature={this.state.temperature}
                                weatherText={this.state.weatherText}
                                iconNumber={this.state.iconNumber}
                />

                <FlexboxGrid justify="space-around" className={'flex-grid'}>
                        {this.state.fiveDaysForecast.map((dayForecast, index) => (
                        <FlexboxGrid.Item key={index}>
                            <DayWeather day={dayForecast.Date}
                                        temperature={dayForecast.Temperature.Maximum.Value}
                                        unit={dayForecast.Temperature.Maximum.Unit}
                                        iconNumber={dayForecast.Day.Icon}
                            />
                        </FlexboxGrid.Item>
                    ))}
                </FlexboxGrid>
            </div>
        );
    }

}

export const homeReducer = (state = 0, action)=>{
    switch (action.type) {
        case 'DAY':
            return state;
        default:
            return state;

    }
};








