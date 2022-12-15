// 데이터 : openweathermap 사이트

// 날씨 정보 주는 컴포넌트
// 현재는 위치 입력받아 해당위치 출력중 > 

import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";


const Weather = () => {
    // js처리방식 : 위>아래 라서 url과 ( 받아온 키값, 위치값) 순서가 중요함
    const API_KEY = "df39660fc891b75f918b22159e9ad35e";
    const [location, setLocation] = useState('');
    const [result, setResult] = useState({});
    const [loading , setLoading] = useState(false);
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((positon) => {
            let lat = positon.coords.latitude;
            let lon = positon.coords.longitude;
            console.log('현재위치',lat,lon);
            getWeather(lat,lon)
            
        });
    }
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units
    //         =&lang=kr&appid=${API_KEY}`;
    

    const getWeather = async (lat, lon) => {
        let url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        let res = await fetch(url);
        let data = await res.json();

        setResult(data)
    }
    useEffect(()=>{
        getCurrentLocation()
    },[])
    return (
        <WeatherWrap>
            <div className="weatherContentWrap">
                <br />
                <h4> 날씨 정보 🌤 <span style={{ color: 'red', fontSize: 'medium' }}>now</span></h4>
                <br />
                {
                    Object.keys(result).length !== 0 && (
                        <ResultWrap>
                            <div className="city">📍 :  {result.name}</div>
                            <div className="temperature">
                                🌡 :
                                {result.main.temp}˚C
                            </div>
                            <div className="sky">
                                {/* '즉시발동함수'로 jsx{}에서 중첩조건문 사용 */}
                                {
                                    (function () {
                                        if (result.weather[0].main === 'Clear') {
                                            return (" 🌞 ")
                                        } else if (result.weather[0].main === 'Mist') {
                                            return (" ⛅ ")
                                        } else if (result.weather[0].main === 'Rain') {
                                            return (" ☔ ")
                                        } else if (result.weather[0].main === 'Clouds') {
                                            return (" ☁️ ")
                                        }
                                    })()
                                }
                                {result.weather[0].main}
                            </div>

                        </ResultWrap>
                    )
                }
            </div>
        </WeatherWrap>
    );
}

export default Weather;


// styled components 사용
const WeatherWrap = styled.div`
<<<<<<< HEAD
    width:100px;
    border-radius:8px;
    .weatherContentWrap {
        text-align:center;
        margin-bottom:5px;
    }
    .weatherContentWrap > input {
        padding:2px;
        border:1px solid lightgray;
        border-radius:8px;
    }
`;

const ResultWrap = styled.div`
    padding:10px;  
    border-radius:8px;
`;