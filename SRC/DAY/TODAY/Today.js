import React, {useContext} from 'react';
import {View} from 'react-native';
import {TodayTotal, BottomButton} from '../TODAY/TodayTotal';
import Forecast from '../../Forecast';
import ForecastLogo from '../../ForecastLogo';
import {bottom_buttons, bigMother} from '../../ForecastCss';
import {ScrollView} from 'react-native-gesture-handler';

const BackColor = '#ABD1C9FF';

const ToDay = () => {
  return (
    <View style={{flex: 1}}>
      <ForecastLogo.LlogoSize />
      <View style={{flex: 1}}>
        <Forecast.Area />
        <Forecast.Sky isWhen="today" />
        <Forecast.Degree isWhen="today" />
        <Forecast.Commentary isWhen="today" />
      </View>
    </View>
  );
};

export default ToDay;
