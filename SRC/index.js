import React, {useContext} from 'react';
import {Image, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import TabColorContext from './CONTEXT/TabColors';
import TempContext from './CONTEXT/Temp';

import Forecast from './Forecast';
import Today from './DAY/TODAY/TodayTotal';
// import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const Page = () => {
  const value = useContext(TabColorContext);
  const temp = useContext(TempContext);

  let iconName;

  return (
    <Today />
    /*  <NavigationContainer>
      <Tab.Navigator //<-이전에 <NavigationContainer>으로 감싸줬다면 다시 해줄 필요 없음 탭바 내부에 탭바 가능
        initialRouteName="현재 날씨"
        initialLayout={{width: Dimensions.get('window').width}}
        tabBarPosition="bottom"
        tabBarOptions={{
          indicatorStyle: {backgroundColor: value.color},
          labelStyle: [Forecast.font.basicD, Forecast.font.tabFontSize],
          iconStyle: {width: 40, height: 40},
          showIcon: true,
          style: {
            backgroundColor: value.color,
          },
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === '어제 날씨') {
              iconName = focused
                ? '../../assets/BA.png'
                : '../../assets/BA.png';
            } else if (route.name === '현재 날씨') {
              iconName = focused
                ? '../../assets/FA.png'
                : '../../assets/FA.png';
            }
            return route.name === '어제 날씨' ? (
              <Image
                source={require('../../assets/BA.png')}
                style={{width: 40, height: 40, resizeMode: 'contain'}}
              />
            ) : route.name === '현재 날씨' ? (
              <Image
                source={require('../../assets/flag.png')}
                style={{width: 40, height: 40, resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../../assets/FA.png')}
                style={{width: 40, height: 40, resizeMode: 'contain'}}
              />
            );
          },
        })}>
        <Tab.Screen name="어제 날씨" component={Yesterday}></Tab.Screen>
        <Tab.Screen name="현재 날씨" component={Today}></Tab.Screen>
        <Tab.Screen name="내일 날씨" component={Tomorrow}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer> */
  );
};

export default Page;

//https://reactnativeexample.com/react-native-animated-background-color-view/
