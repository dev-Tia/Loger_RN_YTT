import React, { useContext } from 'react';
import {
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView
} from 'react-native';

import { getStatusBarHeight } from "react-native-status-bar-height";
import { isIphoneX, getBottomSpace } from "react-native-iphone-x-helper";

import { bigMother, weatherImg, degree, location, comment, fonts } from '../SRC/ForecastCss';
import { color } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const screenWidth = width;
const screenHeight = height;

const status = getStatusBarHeight(true);
const truePhoneX = Dimensions.get("window").height - status - getBottomSpace();
const falsePhoneX = Dimensions.get("window").height - status;

//console.log('ㄹㅇ니ㅏㅓㅣㅏㅓㅣㅏ눙히ㅏㄴ위ㅏ루', falsePhoneX);

const Height = () => {
  if (isIphoneX()) {

    return truePhoneX;
  } else {

    return falsePhoneX
  }
};

const LlogoSize = () => {
  //console.log('ㄹㅇ니ㅏㅓㅣㅏㅓㅣㅏ눙히ㅏㄴ위ㅏ루');
  if (Platform.OS === 'android') {
    return Logo();
  } if (Platform.OS === 'ios' && Height() == truePhoneX) {
    return Logo_truePhoneX();
  } if (Platform.OS === 'ios' && Height() == falsePhoneX) {
    return Logo_falsePhoneX();
  }
};

const Logo = () => {

    //console.log(screenWidth)
    return (
      <View style={[bigMother.mother_color, logo.logo_box]}>
        <Image
          style={logo.logo_size}
          source={require('../assets/log0.png')}
        />
      </View>
    );

};

const logo = StyleSheet.create({

  logo_box: {
    height: screenWidth * 0.25,
    width: screenWidth,
    alignItems: 'center',
  },

  logo_size: {
    height: '90%',
    width: screenWidth * 0.75,
    resizeMode: 'contain'
  },

});

const Logo_falsePhoneX = () => {
  return (
    <View style={[bigMother.mother_color, logo_falsePhoneX.logo_box]}>
      <Image
        style={logo_falsePhoneX.logo_size}
        source={require('../assets/log0.png')}
      />
    </View>
  );
};

const logo_falsePhoneX = StyleSheet.create({

  logo_box: {
    height: truePhoneX * 0.21,
    width: screenWidth,
    alignItems: 'center',
  },

  logo_size: {
    height: '90%',
    width: screenWidth * 0.75,
    resizeMode: 'contain'
  },

});

const Logo_truePhoneX = () => {
  return (
    <View style={[bigMother.mother_color, logo_truePhoneX.logo_box]}>
      <Image
        style={logo_truePhoneX.logo_size}
        source={require('../assets/log0.png')}
      />
    </View>
  );
};

const logo_truePhoneX = StyleSheet.create({

  logo_box: {
    height: truePhoneX * 0.21,
    width: screenWidth,
    alignItems: 'center',
  },

  logo_size: {
    height: '90%',
    width: screenWidth * 0.75,
    resizeMode: 'contain'
  },

});


export default { LlogoSize, logo_truePhoneX, logo_falsePhoneX, Logo, logo };

