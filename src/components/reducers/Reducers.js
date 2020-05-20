import {dayWeatherReducer} from "../dayWeather/DayWeather";
import {homeReducer} from "../home/Home";
import {combineReducers} from 'redux';
import React from "react";

const allReducers = combineReducers({
    dayWeather: dayWeatherReducer,
    homeReducer: homeReducer
});

export default allReducers;
