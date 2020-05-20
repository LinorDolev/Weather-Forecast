
const API = 'ix9CMq6dvA1LGFpVgUytGEDDeLy2Wv5a';

export default class WeatherService {

    static getCurrentWeather(locationKey){
        const URL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API}`;
        const DUMMY_URL = 'http://localhost:3000/dummy/TelAviv.json';
        return fetch(DUMMY_URL).then((request) => {
            return request.json()
        }).then((body) => {
            return body[0]
        });
    }

    static get5DaysForecast(locationKey){
        const URL = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API}&metric=true`;
        const DUMMY_URL = 'http://localhost:3000/dummy/5DaysTelAviv.json';
        return fetch(DUMMY_URL).then((request) => {
            return request.json()
        }).then((body) => {
            return body.DailyForecasts;
        });
    }

    static getAutoComplete(searchWord){
        const URL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API}&q=${searchWord}`;
        const DUMMY_URL = `http://localhost:3000/dummy/AutoCompleteTel.json`

        return fetch(DUMMY_URL).then((request) => {
            return request.json()
        }).then((body) => {
            return body;
        });
    }
}
