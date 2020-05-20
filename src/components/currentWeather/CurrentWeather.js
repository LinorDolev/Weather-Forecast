import React from 'react'
import './CurrentWeather.css';

export default class CurrentWeather extends React.Component{

    render() {
        const {cityName, temperature, weatherText, iconNumber} = this.props;
        let formattedIconNumber = iconNumber < 10 ? '0' + iconNumber : iconNumber;

        return (
            <div>
            <div className='center-text'>
                <span>
                    {cityName}
                    <br/>
                    {weatherText}
                    <img src={`/icons/${formattedIconNumber}-s.png`}
                         alt={'weather forecast'} style={{width:'125px', height:'75px'}}/>
                    <br/>
                    {temperature}° C
                </span>
            </div>

            </div>

        )
    }
}
