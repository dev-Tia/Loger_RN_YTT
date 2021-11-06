import axios from 'axios';
import * as OpenKey from '../JSON/OpenKey';
import {Url} from './Url_List';

const today_past_Axios = async (props) => {
  console.log('5.today_past_Axios 시작');
  var todayArray = [];
  await axios
    .get(
      (await Url()).open_timemachine +
        props.Geo_Array['lat'] +
        '&lon=' +
        props.Geo_Array['lon'] +
        '&dt=' +
        props.Geo_Array['time_Now'] +
        '&appid=' +
        OpenKey.default.C +
        '&units=metric',
    )
    .then(function (response) {
      /*    console.log(
        'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' +
          props.Geo_Array['lat'] +
          '&lon=' +
          props.Geo_Array['lon'] +
          '&dt=' +
          props.Geo_Array['time_Now'] +
          '&appid=' +
          OpenKey.default.C +
          '&units=metric',
      ); */
      todayArray = [];

      if (response.data && response.data['hourly'] != undefined) {
        for (var i = 0; i < response.data['hourly'].length; i++) {
          if (i == 0) {
            todayArray.push({
              temp: response.data['hourly'][i]['temp'],
              weather: response.data['hourly'][i]['weather'][0]['main'],
              humidity: response.data['hourly'][i]['humidity'],
            });
          } else if (i == 6) {
            todayArray.push({
              temp: response.data['hourly'][i]['temp'],
              weather: response.data['hourly'][i]['weather'][0]['main'],
              humidity: response.data['hourly'][i]['humidity'],
            });
          } else if (i == 12) {
            todayArray.push({
              temp: response.data['hourly'][i]['temp'],
              weather: response.data['hourly'][i]['weather'][0]['main'],
              humidity: response.data['hourly'][i]['humidity'],
            });
          } else if (i == 18) {
            todayArray.push({
              temp: response.data['hourly'][i]['temp'],
              weather: response.data['hourly'][i]['weather'][0]['main'],
              humidity: response.data['hourly'][i]['humidity'],
            });
          }
        }
        var todayHourly = props.todayHourly;
        if (todayArray[props.callKeys] == undefined) {
          props.setTodayHourly({
            todayHourly: Object.assign(todayHourly, {
              [props.callKeys]: todayArray,
            }),
          });
        }
      } else {
        todayArray.push({
          temp: response.data['current']['temp'],
          weather: response.data['current']['weather'][0]['main'],
          humidity: response.data['current']['humidity'],
        });

        var todayHourly = props.todayHourly;

        if (todayArray[props.callKeys] == undefined) {
          props.setTodayHourly({
            todayHourly: Object.assign(todayHourly, {
              [props.callKeys]: todayArray,
            }),
          });
        }
      }
    })
    .catch(function (error) {
      console.log('5.today_past_Axiost', error);
      console.log(
        'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' +
          props.Geo_Array['lat'] +
          '&lon=' +
          props.Geo_Array['lon'] +
          '&dt=' +
          props.Geo_Array['time_Now'] +
          '&appid=' +
          OpenKey.default.C +
          '&units=metric',
      );
      alert('날씨 API호출 오류. 네트워크 상태를 다시 확인해 주세요Today_past');
    });
};

export default today_past_Axios;
