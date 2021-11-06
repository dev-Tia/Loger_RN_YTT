import React, {useContext, useState, useEffect} from 'react';
import {
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import {
  bigMother,
  location_txt,
  weatherImg,
  degree,
  location,
  comment,
  fonts,
} from '../SRC/ForecastCss';
import ReverseGeoSearch from './GEO/reverseGeoLocation';
import call_CurrentLocation from './ASYNC/CallCurrentLocation';
import TempContext from './CONTEXT/Temp';
import Skyimage from './JSON/Skyimage';
import Comment from './DAY/TODAY/Comment';

// console.log('statusBarHeight: ', StatusBar.currentHeight);

const Forecast = () => {
  return (
    <View style={location.location_box}>
      <Text style={[fonts.font_ment_B, location.location_txt]}>
        과연 오늘 점심은?
      </Text>
    </View>
  );
};

const Sky = (Props) => {
  const Temp = useContext(TempContext);
  //Smoke  Mist없음
  let ScreenSky = null;

  if (Props.isWhen == 'today') {
    ScreenSky = Skyimage['sky'][Temp.today['weather'][0]['main']];
  } else if (Props.isWhen == 'tomorrow') {
    ScreenSky = Skyimage['sky'][Temp.tomorrow['weather'][0]['main']];
  } else if (Props.isWhen == 'yesterday') {
    ScreenSky = Skyimage['sky'][Temp.yesterday['weather'][0]['main']];
  } else {
    ScreenSky = require('../assets/wIcon/Hot.png');
  }
  return (
    <View style={weatherImg.weather_box}>
      <Image style={weatherImg.weather_img} source={ScreenSky} />
    </View>
  );
};

const Degree = (Props) => {
  const Temp = useContext(TempContext);

  // console.log('isWhen : ' + Props.isWhen)

  let ScreenTemp = null;
  let ScreenHumidity = null;
  if (Props.isWhen == 'today') {
    ScreenTemp = Temp.today['temp'];
    ScreenHumidity = Temp.today['humidity'];
  } else if (Props.isWhen == 'tomorrow') {
    ScreenTemp = Temp.tomorrow['temp']['day'];
    ScreenHumidity = Temp.tomorrow['humidity'];
  } else if (Props.isWhen == 'yesterday') {
    ScreenTemp = Temp.yesterday['temp'];
    ScreenHumidity = Temp.yesterday['humidity'];
  } else {
    ScreenTemp = '@_@;;';
  }

  return (
    <View style={degree.degree_box}>
      <Text style={fonts.font_ment_B}>
        <Text style={degree.degree_num}>{ScreenTemp}</Text>
        <Text style={degree.degree_symbol}>º</Text>
        <Text style={degree.humidity_num}> 습도: {ScreenHumidity} %</Text>
      </Text>

      {/* <Image
        style={degree.humidity_Img}
        source={require('../assets/humidity.png')}
      /> */}
    </View>
  );
};

const Commentary = () => {
  const Temp = useContext(TempContext);
  const [ment, setMent] = useState('');
  useEffect(() => {
    setMent(Comment({Temp: Temp}));
  }, []);

  return (
    <View style={comment.comment_box}>
      <Text style={[fonts.font_ment_B, comment.comment_txt]}>{ment[0]}</Text>
      <Text style={[fonts.font_ment_B, comment.comment_txt]}>{ment[1]}</Text>
    </View>
  );
};

const Area = () => {
  /*   const [jsonValue, setJsonValue] = useState(''); */

  //const [_isSwitch, setSwitch] = useState(false);
  const Temp = useContext(TempContext);

  /*   useEffect(() => {
    call_CurrentLocation({
      setJsonValue: setJsonValue,
      setSwitch: setSwitch,
    });
  }, [_isSwitch]); */
  return (
    <View style={location.location_box}>
      <Text
        style={[
          fonts.font_ment_B,
          location.location_txt,
          {textAlign: 'center'},
        ]}>
        {Temp.Geo_Array_Temp['desc']}
      </Text>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const screenWidth = width;
const screenHeight = height;

//함수, 가장작은거1, 가장큰거5
function ssize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default {Sky, Degree, Commentary, Area};
