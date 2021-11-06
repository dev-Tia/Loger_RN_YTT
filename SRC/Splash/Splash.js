import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

import Set_GeoArray from '../GEO/Set_GeoArray';

import Day from '../index';
import TempContext from '../CONTEXT/Temp';

import yesterday_Axios from '../AXIOS/Yesterday_Axios';
import yesterday_Two_Axios from '../AXIOS/Yesterday_Two_Axios';
import today_past_Axios from '../AXIOS/Today_past_Axios';
import today_Axios from '../AXIOS/Today_Axios';
import Notice_Axios from '../AXIOS/Notice_Axios';

import Call_Key from '../ASYNC/Call_Keys';
import Current_Async from '../ASYNC/Current_Async';
import {fonts, splash_gif} from '../ForecastCss';
import {SetUrl, getUrl} from '../ASYNC/Url_Async';

const Splash_GIF = (props) => {
  useEffect(() => {}, [props.BottomMent]);

  return (
    <View style={splash_gif.wrapper}>
      <View style={splash_gif.titleWrapper}>
        <Text style={[fonts.sys_font, fonts.splash_title]}>어제 오늘 내일</Text>
      </View>
      <View style={splash_gif.splash_box}>
        <Image
          style={splash_gif.splash_img}
          source={require('../../assets/splash.gif')}
        />
      </View>
      <View>
        <Text>{props.BottomMent}</Text>

        <Text>ver. 1.1.1 (18)</Text>


      </View>
    </View>
  );
};

const Splash = () => {
  const {
    setToday,
    setYesterdayHourly,
    setYesterdayHourly_Two,
    setTodayHourly,
    setTodayHourly_Two,
    setCurrentLocationAsync,
    setGeo_Array_Temp,
    setSeasons,
    setCallKeys,
    setTempDif,
  } = useContext(TempContext);

  const value = useContext(TempContext);

  const [_isSwitchSecond, setswitchSecond] = useState(false);

  const [_isCall_Switch, setCall_Switch] = useState(false);

  const [_isGeoCall, setGeoCall] = useState(false);
  const [keys, setKeys] = useState('');

  const [Geo_Array, Set_Geo_Array] = useState(''); //<-GeoLocation 의 position값
  const [_isCallCurrentGeo, setCallCurrentGeo] = useState(false); //<-GeoLocation 이 완료되었는가 판단
  const [BottomMent, setBottomMent] = useState('위치 정보 계산중');

  //? 공지사항 관련
  
  useEffect(() => {
    SetUrl();
    Set_GeoArray({
      Set_Geo_Array: Set_Geo_Array,
      Geo_Array: Geo_Array,
      setCallCurrentGeo: setCallCurrentGeo,
      setBottomMent: setBottomMent,
    });
    Call_Key({
      setCallKeys: setCallKeys,
      setCall_Switch: setCall_Switch,
      _isCall_Switch: _isCall_Switch,
    });
    //GetNotice();
    Notice_Axios();
  }, []);

  useEffect(() => {
    if (_isCallCurrentGeo == true) {
      console.log('1.Set_GeoArray pos값 Geo_Array에 저장 완료');
      Current_Async({
        Geo_Array: Geo_Array,
        setBottomMent: setBottomMent,
        setKeys: setKeys,
      });
      console.log('2.Current_Async Geo_Array 값 ConText 저장 완료');
      setGeo_Array_Temp({Geo_Array_Temp: Geo_Array});
      setGeoCall(true);
    }
  }, [_isCallCurrentGeo]);

  useEffect(() => {
    //어제
    if (keys !== '') {
      yesterday_Axios({
        Geo_Array: Geo_Array,
        callKeys: keys,
        setYesterdayHourly: setYesterdayHourly,
        setBottomMent: setBottomMent,
        yesterdayHourly: value.yesterdayHourly,
      });

      yesterday_Two_Axios({
        Geo_Array: Geo_Array,
        callKeys: keys,
        setYesterdayHourly_Two: setYesterdayHourly_Two,
        yesterdayHourly_Two: value.yesterdayHourly_Two,
      });

      today_past_Axios({
        Geo_Array: Geo_Array,
        callKeys: keys,
        setTodayHourly: setTodayHourly,
        todayHourly: value.todayHourly,
      });

      today_Axios({
        Geo_Array: Geo_Array,
        callKeys: keys,
        setToday: setToday,
        setSeasons: setSeasons,
        setTempDif: setTempDif,
        setTodayHourly_Two: setTodayHourly_Two,
        todayHourly_Two: value.todayHourly_Two,
        setCurrentLocationAsync: setCurrentLocationAsync,
      });
    }
  }, [keys]);

  useEffect(() => {
    //엊그제
    if (BottomMent == '위치 값 받아오기 완료') {
    }
  }, [BottomMent]);

  useEffect(() => {
    if (value.currentLocationAsync) {
      setTimeout(() => {
        setswitchSecond(true);
      }, 2000);
    }
  }, [value.currentLocationAsync]);

  return _isSwitchSecond ? <Day /> : <Splash_GIF BottomMent={BottomMent} />;
};

export default Splash;
