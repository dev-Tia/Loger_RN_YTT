import { createContext } from 'react';

const TempContext = createContext({
  today: '', //<-오늘 정보
  yesterdayHourly: '', //<-어제 시간별 온도 날씨
  yesterdayHourly_Two: '', //<-엊그제 시간별 온도 날씨
  todayHourly: '', //<-오늘 현제 시간 이전 시간별 온도 날씨
  todayHourly_Two: '', //<-오늘 현제 시간 이후~내일 09시 온도 날씨
  Geo_Array_Temp: '',
  allLocation: '',
  currentLocationAsync: false,
  callKeys:'',
  seasons:'',
  tempDif:0,
  setToday: () => { },
  setYesterdayHourly: () => { },
  setYesterdayHourly_Two: () => { },
  setTodayHourly: () => { },
  setTodayHourly_Two: () => { },
  setCurrentLocationAsync: () => { },
  setGeo_Array_Temp: () => { },
  setAllLocation: () => { },
  setCallKeys: () => {},
  clearTemp: () => { },
  setSeasons:() => {},
  setTempDif:() => {},
});

export default TempContext;

/*
today , yesterday구조
"current": {
    "dt": 1598334210,
    "sunrise": 1598302792,
    "sunset": 1598350168,
    "temp": 34,
    "feels_like": 37.73,
    "pressure": 1003,
    "humidity": 67,
    "dew_point": 27,
    "uvi": 9.6,
    "clouds": 20,
    "visibility": 10000,
    "wind_speed": 5.7,
    "wind_deg": 130,
    "weather": [
      {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02d"
      }
    ]
  }
*/