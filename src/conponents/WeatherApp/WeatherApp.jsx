import React, { useState } from 'react';
import './WeatherApp.css';
import search from '../assets/search.png';
import few_clouds from '../assets/few-clouds.png';
import downpour from '../assets/downpour.png';
import rainy from '../assets/rainy.png';
import humidity from '../assets/humidity.png';
import snowfall from '../assets/snowfall.png';
import sunny from '../assets/sunny.png';
import windy from '../assets/windy.png';
import error_icon from '../assets/error-icon.png';
import few_clouds_n from '../assets/few-clouds-night.png';
import sunny_n from '../assets/sunny-night.png';
import downpour_n from '../assets/downpour-night.png';
import rainy_n from '../assets/rainy-n.png';
import snowfall_n from '../assets/snowfall-n.png';
import thunderstorm from '../assets/thunderstorm.png';
import thunderstorm_n from '../assets/thunderstorm-night.png';
import cloud from '../assets/cloud.png';
import broken_clouds from '../assets/broken-clouds.png';
import fogg from '../assets/fogg.png';

export const WeatherApp = () => {
    const [wicon, setWicon] = useState(few_clouds);
    var error_bar = document.getElementsByClassName("error-bar");

    let api_key_openweather = "29ac581cf0bb591731acb946ad67bcaa";
    let api_key_geolocalization = "5d0b917f26ff4dcc9d5ccac0705b94fa";

    const getLocation = async () => {
        let url_geolocalization = `https://api.geoapify.com/v1/ipinfo?&apiKey=${api_key_geolocalization}`;
        let response_geo = await fetch(url_geolocalization);
        let data_geo = await response_geo.json();
        var localization_geo = data_geo.city.name;
        searchBarUpdate(localization_geo);
    }

    const enterPressed = (event) => {
        if(event.keyCode === 13){
            searchBarUpdate();
        }
    }

    const searchBarUpdate = async (localization_geo) => {
        const element = document.getElementsByClassName("cityInput")[0];
        let url_openweather;
        try{
            if(element.value === "" && localization_geo === ""){
                return;
            }
            if(localization_geo){
                url_openweather = `https://api.openweathermap.org/data/2.5/weather?q=${localization_geo}&units=Metric&appid=${api_key_openweather}`;
            }
            else{
                url_openweather = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key_openweather}`;
                if(element.value === ""){
                    return;
                }
            }
            let response = await fetch(url_openweather);
            let data = await response.json();
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");
            const humidity = document.getElementsByClassName("humidity-percent");
            const windSpeed = document.getElementsByClassName("wind-speed");
        
            temperature[0].innerText = Math.round(data.main.temp)+"°C";
            location[0].innerText = data.name;
            humidity[0].innerText = Math.round(data.main.humidity)+"%";
            windSpeed[0].innerText = Math.round(data.wind.speed)+"km/h";
    
            if(data.weather[0].icon === "01d"){
                setWicon(sunny);
            }
            else if(data.weather[0].icon === "01n"){
                setWicon(sunny_n);
            }
            else if(data.weather[0].icon === "02d"){
                setWicon(few_clouds);
            }
            else if(data.weather[0].icon === "02n"){
                setWicon(few_clouds_n);
            }
            else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
                setWicon(cloud);
            }
            else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
                setWicon(broken_clouds);
            }
            else if(data.weather[0].icon === "09d"){
                setWicon(downpour);
            }
            else if(data.weather[0].icon === "09n"){
                setWicon(downpour_n);
            }
            else if(data.weather[0].icon === "10d"){
                setWicon(rainy);
            }
            else if(data.weather[0].icon === "10n"){
                setWicon(rainy_n);
            }
            else if(data.weather[0].icon === "11d"){
                setWicon(thunderstorm);
            }
            else if(data.weather[0].icon === "11n"){
                setWicon(thunderstorm_n);
            }
            else if(data.weather[0].icon === "13d"){
                setWicon(snowfall);
            }
            else if(data.weather[0].icon === "13n"){
                setWicon(snowfall_n);
            }
            else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                setWicon(fogg);
            }
            else{
                setWicon(cloud)
            }
            error_bar[0].style.display = "none";
            element.value = "";
            localization_geo = "";
        }
        catch(error){
            console.error(error);
            error_bar[0].style.display = "flex";
        }
    }

  return (
    <div className='container'>
        <div className='top-bar' onLoad={getLocation}>
            <input type="text" className="cityInput" placeholder='Search' onKeyDown={enterPressed}/>
            <div type="submit" className="search-icon" onClick={() => {searchBarUpdate()}}>
                <img src={search} alt="search icon" className='image'/>
            </div>
        </div>
        <div className='error-bar'>
            <img src={error_icon} alt="Error symbol" className='error-icon'/>
            <div className='error-text'>Please enter valid location name.</div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="current weather icon" className='icon-weather'/>
        </div>
        <div className='weather-temp'></div>
        <div className='weather-location'></div>
        <div className="data-container">
            <div className='element'>
                <img src={humidity} alt="humidity icon" className="icon" />
                <div className='data'>
                    <div className='humidity-percent'></div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className='element'>
                <img src={windy} alt="wind speed icon" className="icon" />
                <div className='data'>
                    <div className='wind-speed'></div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp;