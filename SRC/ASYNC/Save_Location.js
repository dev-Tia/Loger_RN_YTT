import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Url} from '../AXIOS/Url_List';
const Save_Location = async (props) => {
  var value = props.selectValue;
  console.log('4.Save_Location');
  const Lat = value['lat'];
  const Lon = value['lon'];

  console.log('4.Lat & Lon');
  console.log('4.Lat = ', Lat);
  console.log('4.Lon = ', Lon);

  await axios
    .get((await Url()).reverse_geo + Lat + '&lon=' + Lon)
    .then((response) => {
      console.log('4.창준 reverseGeo response');

      let Desc = response.data;
      let value = {Location: '추가위치', lat: '', lon: '', desc: ''};

      value['lat'] = Lat;
      value['lon'] = Lon;
      value['desc'] = Desc;

      const jsonValue = JSON.stringify(value);
      try {
        // 받아온 값 집어넣기
        addValue(Desc, value);
        props.setRefrash(props._isRefrash);
        //call_CurrentLocation(Desc);
      } catch (e) {
        console.log('SetCurrentLocation_StoreData ERROR = ', e);
      }
    })
    .catch((error) => {
      console.log('----- reverseGeo error -----');
      console.log(error);
    });
};

export default Save_Location;

const addValue = async (Desc, value) => {
  try {
    await AsyncStorage.setItem(Desc, JSON.stringify(value));
  } catch (e) {
    // save error
    console.log('addValue ERROR = ', e);
  }
  console.log('Done.');
};
