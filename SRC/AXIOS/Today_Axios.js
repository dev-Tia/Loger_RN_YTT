import axios from 'axios';
import * as OpenKey from '../JSON/OpenKey';
import {Url} from './Url_List';

const today_past_Axios = async (props) => {
  console.log('6.today_Axios 시작');
  var todayArray_Two = [];

  await axios
    .get(
      (await Url()).open_onecall +
        props.Geo_Array['lat'] +
        '&lon=' +
        props.Geo_Array['lon'] +
        '&exclude=minutely&appid=' +
        OpenKey.default.D +
        '&units=metric',
    )
    .then(function (response) {
      /*    console.log(
        '2213132',
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
          props.Geo_Array['lat'] +
          '&lon=' +
          props.Geo_Array['lon'] +
          '&exclude=minutely&appid=' +
          OpenKey.default.D +
          '&units=metric',
      ); */
      var today = new Date();
      yesterdayArray = [];
      todayArray_Two = [];
      var today_hours = 0;

      var TH = today.getHours();
      if (TH % 3 == 0) {
        today_hours = 0;
      } else if (TH % 3 == 1) {
        today_hours = 2;
      } else if (TH % 3 == 2) {
        today_hours = 1;
      }
      var cnt = 1;
      for (var x = today_hours; x < 48; x++) {
        if (x != 0) {
          if (x % 3 == today_hours) {
            if (cnt % 2 == 0) {
              todayArray_Two.push({
                temp: response.data['hourly'][x]['temp'],
                weather: response.data['hourly'][x]['weather'][0]['main'],
                humidity: response.data['hourly'][x]['humidity'],
                description:
                  response.data['hourly'][x]['weather'][0]['description'],
                time: response.data['hourly'][x]['dt'],
              });
            }
            cnt++;
          }
        } else if (x == 0) {
          if (TH == 9) {
            todayArray_Two.push({
              temp: response.data['hourly'][0]['temp'],
              weather: response.data['hourly'][0]['weather'][0]['main'],
              humidity: response.data['hourly'][0]['humidity'],
              description:
                response.data['hourly'][0]['weather'][0]['description'],
              time: response.data['hourly'][0]['dt'],
            });
          }
        }
      }

      let _todayMonth = parseInt(today.getMonth() + 1);

      console.log('지금은 ' + _todayMonth + '월 입니다');

      if (_todayMonth < 4 || _todayMonth == 12) {
        props.setSeasons({seasons: 'winter'});
        console.log('겨울로 셋팅');
      } else if (_todayMonth < 6) {
        props.setSeasons({seasons: 'spring'});
        console.log('봄으로 셋팅');
      } else if (_todayMonth < 9) {
        props.setSeasons({seasons: 'summer'});
        console.log('여름으로 셋팅');
      } else if (_todayMonth < 12) {
        props.setSeasons({seasons: 'autumn'});
        console.log('가을로 셋팅');
      } else {
        console.log('계절셋팅 문제 발생!!!');
      }
      props.setTempDif({
        tempDif: (
          response.data['current']['temp'] -
          response.data['daily'][2]['temp']['day']
        ).toString(),
      });

      props.setToday({today: response.data['current']});
      var todayHourly_Two = props.todayHourly_Two;
      if (todayArray_Two[props.callKeys] == undefined) {
        props.setTodayHourly_Two({
          todayHourly_Two: Object.assign(todayHourly_Two, {
            [props.callKeys]: todayArray_Two,
          }),
        });
      }
      props.setCurrentLocationAsync({currentLocationAsync: true});
    })
    .catch(function (error) {
      console.log('6.today_Axios', error);
      alert('날씨 API호출 오류. 네트워크 상태를 다시 확인해 주세요 Today');
    });
};

export default today_past_Axios;
