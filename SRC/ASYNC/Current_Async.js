import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Url} from '../AXIOS/Url_List';
const Current_Async = async (props) => {
  console.log('2.Current_Async 시작');
  const Lat = props.Geo_Array['lat'];
  const Lon = props.Geo_Array['lon'];

  await axios
    .get((await Url()).reverse_geo + Lat + '&lon=' + Lon)
    .then((response) => {
      console.log('2.Current_Async reverseGeo axios 호출');
      console.log('2.Current_Async response.data = ', response.data);

      let Desc = response.data;
      let value = props.Geo_Array;
      var asyncValue = '';

      try {
        // 받아온 값 집어넣기
        value['lat'] = Lat;
        value['lon'] = Lon;
        value['desc'] = Desc;
        props.setKeys(Desc);
        const jsonValue = JSON.stringify(value);

        /*   console.log('2.Current_Async  axios 초기값 형태 "jsonValue" ');
        console.log(
          '2.Current_Async jsonValue["lat"] = ' + JSON.parse(jsonValue).lat,
        );
        console.log(
          '2.Current_Async jsonValue["lon"] = ' + JSON.parse(jsonValue).lon,
        );
        console.log(
          '2.Current_Async jsonValue["time_Now"] = ' +
            JSON.parse(jsonValue).time_Now,
        );
        console.log(
          '2.Current_Async jsonValue["time_One"] = ' +
            JSON.parse(jsonValue).time_One,
        );
        console.log(
          '2.Current_Async jsonValue["time_Two"] = ' +
            JSON.parse(jsonValue).time_Two,
        );
        console.log(
          '2.Current_Async jsonValue["desc"] = ' + JSON.parse(jsonValue).desc,
        );
 */
        asyncValue = {
          Location: 'CurrentLocation',
          lat: JSON.parse(jsonValue)['lat'],
          lon: JSON.parse(jsonValue)['lon'],
          desc: JSON.parse(jsonValue)['desc'],
        };
        console.log(
          '2.Current_Async jsonValue 변경',
          JSON.stringify(asyncValue),
        );
        props.setBottomMent('위치명 받아오기 완료');

        AsyncStorage.setItem(
          JSON.parse(jsonValue).desc,
          JSON.stringify(asyncValue),
        );

        props.setBottomMent('위치명 기기 저장 완료');
      } catch (e) {
        console.log('2.Current_Async SetCurrentLocation_StoreData ERROR = ', e);
        props.setBottomMent(
          '위치명 기기 저장 오류 네트워크 상태를 확인 해 주세요',
        );
      }
    })
    .catch((error) => {
      console.log('2.Current_Async ----- reverseGeo error -----');
      console.log(error);
      props.setBottomMent(
        '위치명 기기 저장 오류 네트워크 상태를 확인 해 주세요',
      );
    });
};

export default Current_Async;
