import axios from 'axios';
import * as OpenKey from '../JSON/OpenKey';
import {Url} from './Url_List';

const Yesterday_Axios = async (props) => {
  console.log('3.yesterday_Axios 시작');
  var yesterdayArray = [];

  axios
    .get(
      (await Url()).open_timemachine +
        props.Geo_Array['lat'] +
        '&lon=' +
        props.Geo_Array['lon'] +
        '&dt=' +
        props.Geo_Array['time_One'] +
        '&appid=' +
        OpenKey.default.A +
        '&units=metric',
    )
    .then(function (response) {
    /*   console.log(
        "3.yesterday_Axios 값 확인 response.data['current']['temp'] = ",
        response.data['current']['temp'],
      ); */
      console.log('3.yesterday_Axios 값 확인', props.callKeys);
      yesterdayArray = [];
      for (var j = 0; j < response.data['hourly'].length; j++) {
        if (j == 0) {
          yesterdayArray.push({
            temp: response.data['hourly'][j]['temp'],
            weather: response.data['hourly'][j]['weather'][0]['main'],
            humidity: response.data['hourly'][j]['humidity'],
          });
        } else if (j == 6) {
          yesterdayArray.push({
            temp: response.data['hourly'][j]['temp'],
            weather: response.data['hourly'][j]['weather'][0]['main'],
            humidity: response.data['hourly'][j]['humidity'],
          });
        } else if (j == 12) {
          yesterdayArray.push({
            temp: response.data['hourly'][j]['temp'],
            weather: response.data['hourly'][j]['weather'][0]['main'],
            humidity: response.data['hourly'][j]['humidity'],
          });
        } else if (j == 18) {
          yesterdayArray.push({
            temp: response.data['hourly'][j]['temp'],
            weather: response.data['hourly'][j]['weather'][0]['main'],
            humidity: response.data['hourly'][j]['humidity'],
          });
        }
      }
       //props.setYesterdayHourly({yesterdayHourly: yesterdayArray});
      var yesterdayHourly = props.yesterdayHourly;
      if (yesterdayArray[props.callKeys] == undefined) {
        props.setYesterdayHourly({
          yesterdayHourly: Object.assign(yesterdayHourly, {
            [props.callKeys]: yesterdayArray,
          }),
        });
      }
    })
    .catch(function (error) {
      console.log('3.yesterday_Axios 오류 발생 ', error);
      props.setBottomMent('네트워크 통신 중 오류가 발생했습니다. Y_A');
      alert('날씨 API호출 오류. 네트워크 상태를 다시 확인해 주세요');
    });
};

export default Yesterday_Axios;
