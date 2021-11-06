import React, {useState} from 'react';
import TempContext from './Temp';

const TempProvider = ({children}) => {
  const setToday = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        today: props.today,
      };
    });
  };
  const setYesterdayHourly = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        yesterdayHourly: props.yesterdayHourly,
      };
    });
  };
  const setYesterdayHourly_Two = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        yesterdayHourly_Two: props.yesterdayHourly_Two,
      };
    });
  };
  const setTodayHourly = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        todayHourly: props.todayHourly,
      };
    });
  };
  const setTodayHourly_Two = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        todayHourly_Two: props.todayHourly_Two,
      };
    });
  };
  const setCurrentLocationAsync = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        currentLocationAsync: props.currentLocationAsync,
      };
    });
  };
  const setGeo_Array_Temp = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        Geo_Array_Temp: props.Geo_Array_Temp,
      };
    });
  };
  const setAllLocation = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        allLocation: props.allLocation,
      };
    });
  };
  const setSeasons = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        seasons: props.seasons,
      };
    });
  };
  const setTempDif = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        tempDif: props.tempDif,
      };
    });
  };
  const setCallKeys = (props) => {
    setText((prevState) => {
      return {
        ...prevState,
        callKeys: props.callKeys,
      };
    });
  };
  const initialState = {
    today: '',
    yesterdayHourly: '',
    yesterdayHourly_Two: '',
    todayHourly: '',
    todayHourly_Two: '',
    Geo_Array_Temp: '',
    allLocation: '',
    callKeys: '',
    currentLocationAsync: false,
    seasons: '',
    tempDif: 0,
    setToday,
    setYesterdayHourly,
    setYesterdayHourly_Two,
    setTodayHourly,
    setTodayHourly_Two,
    setCurrentLocationAsync,
    setGeo_Array_Temp,
    setAllLocation,
    setCallKeys,
    setSeasons,
    setTempDif,
  };

  const [text, setText] = useState(initialState);
  return <TempContext.Provider value={text}>{children}</TempContext.Provider>;
};

export default TempProvider;
