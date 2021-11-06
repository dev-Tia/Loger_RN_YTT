import React, {useContext} from 'react';
import {
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;

// 기준잡기
const scale = screenWidth / 320;
const sBarHeight = 24;

//함수, 가장작은거1, 가장큰거5
function ssize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'android') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const mainColor = '#ABD1C9';

const bigMother = StyleSheet.create({
  container: {
    flex: 1,
  },
  mother_color: {
    backgroundColor: mainColor,
  },
});

const splash_gif = StyleSheet.create({
  wrapper: {
    backgroundColor: '#afcdd8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  splash_box: {
    width: '100%',
    height: '20%',
    marginBottom: '10%',
  },

  splash_img: {
    width: screenWidth,
    height: '60%',
    alignItems: 'flex-start',
    resizeMode: 'contain',
    justifyContent: 'center',
  },

  titleWrapper: {
    justifyContent: 'center',
    flex: 0.65,
  },
});

const location = StyleSheet.create({
  location_box: {
    flex: 1,
    marginTop: '2%',
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  location_txt: {
    fontSize: ssize(25),
    color: '#4c4c4c',
  },
});

const location_txt = (props) => {
  return {
    fontSize: props.length > 12 ? ssize(25) : ssize(30),
    color: '#4c4c4c',
  };
};

const weatherImg = StyleSheet.create({
  weather_box: {
    flex: 5,
  },

  weather_img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

const degree = StyleSheet.create({
  degree_box: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  degree_num: {
    textAlign: 'center',
    fontSize: ssize(35),
    color: '#4c4c4c',
  },

  degree_symbol: {
    fontSize: ssize(30),
    color: '#4c4c4c',
  },

  humidity_num: {
    textAlign: 'center',
    fontSize: ssize(15),
    color: '#4c4c4c',
  },

  humidity_Img: {
    width: '10%',
    height: '50%',
    resizeMode: 'contain',
  },
});

const comment = StyleSheet.create({
  comment_box: {
    flex: 2,
    alignItems: 'center',
    marginBottom: '10%',
    marginLeft: '5%',
    marginRight: '5%',
  },

  comment_txt: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: ssize(25),
    color: '#4c4c4c',
  },
});

const bottom_buttons = StyleSheet.create({
  All_Wrapper: {
    flex: 1,
    // flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: '5%',
    justifyContent: 'center',
  },

  Bottom_Button_Wrapper: {
    flexDirection: 'row',
    width: '100%',
    //height: screenHeight * 0.1,
    marginBottom: '7.5%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  Bottom_Button_txt: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '45%',
    marginBottom: '10%',
  },

  Bottom_Location_Button: {
    flex: 1,
    width: '100%',
  },

  Bottom_Modal_Button: {
    flex: 1,
    width: '100%',
  },

  Bottom_Location_Icon: {
    fontSize: 45,
    color: '#111111',
  },
  Bottom_Modal_Icon: {
    fontSize: 45,
  },
});

const fonts = StyleSheet.create({
  tabFontSize: {
    fontSize: ssize(10),
  },

  tabFontBox: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  splash_title: {
    color: 'white',
    fontSize: ssize(40),
  },

  font_ment_R: {
    fontFamily: 'Gaegu-Regular',
  },

  font_ment_B: {
    fontFamily: 'Gaegu-Bold',
  },

  temp_font: {
    fontFamily: 'CuteFont-Regular',
  },

  sys_font: {
    fontFamily: 'Jua-Regular',
  },
});

export {
  bigMother,
  weatherImg,
  degree,
  location,
  comment,
  fonts,
  ssize,
  splash_gif,
  bottom_buttons,
  location_txt,
};
