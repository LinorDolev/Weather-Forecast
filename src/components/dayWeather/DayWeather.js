import React from "react";
import './DayWeather.css';
import { Container } from 'rsuite';



export default class DayWeather extends React.Component {

     render() {
        const {day, temperature, unit, iconNumber} = this.props;
        let dayName = new Date(day).toString().split(' ')[0];

        let formattedIconNumber = iconNumber < 10 ? '0' + iconNumber : iconNumber;
        return (
                <Container className='container'>
                    <div>{dayName}</div>
                    <div>{temperature}° {unit}</div>
                    <img src={`/icons/${formattedIconNumber}-s.png`} alt={'weather forecast'}/>
                </Container>

        );
    }
}

export const dayWeatherReducer =
    (state = 0, action)=>{
        switch (action.type) {
            case 'DAY':
                return state;
            default:
                return state;

        }
    };
