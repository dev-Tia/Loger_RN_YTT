import axios from 'axios';
import * as OpenKey from '../JSON/OpenKey';
import {Url} from './Url_List';

const Yesterday_Two_Axios = async(props) => {
  console.log('4.Yesterday_Two_Axios 시작');
  var yesterdayArray_Two = [];
 /*  console.log(
    'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' +
      props.Geo_Array['lat'] +
      '&lon=' +
      props.Geo_Array['lon'] +
      '&dt=' +
      props.Geo_Array['time_Two'] +
      '&appid=' +
      OpenKey.default.B +
      '&units=metric',
  ); */
  axios
    .get(
      (await Url()).open_timemachine +
        props.Geo_Array['lat'] +
        '&lon=' +
        props.Geo_Array['lon'] +
        '&dt=' +
        props.Geo_Array['time_Two'] +
        '&appid=' +
        OpenKey.default.B +
        '&units=metric',
    )
    .then(function (response) {
      //console.log(response.data['hourly']);
      console.log(
        "4.Yesterday_Two_Axios response.data['hourly'][0]['temp'] = ",
        response.data['hourly'][0]['temp'],
      );
      yesterdayArray_Two = [];
      for (var i = 15; i < response.data['hourly'].length; i++) {
        if (i == 18) {
          yesterdayArray_Two.push({
            temp: response.data['hourly'][i]['temp'],
            weather: response.data['hourly'][i]['weather'][0]['main'],
            humidity: response.data['hourly'][i]['humidity'],
          });
        }
      }
      /*  props.setYesterdayHourly_Two({
        yesterdayHourly_Two: yesterdayArray_Two,
      }); */
      var yesterdayHourly_Two = props.yesterdayHourly_Two;
      if (yesterdayArray_Two[props.callKeys] == undefined) {
        props.setYesterdayHourly_Two({
          yesterdayHourly_Two: Object.assign(yesterdayHourly_Two, {
            [props.callKeys]: yesterdayArray_Two,
          }),
        });
      }
    })
    .catch(function (error) {
      console.log('4.Yesterday_Two_Axios', error);
      alert('날씨 API호출 오류. 네트워크 상태를 다시 확인해 주세요');
    });
};

export default Yesterday_Two_Axios;
