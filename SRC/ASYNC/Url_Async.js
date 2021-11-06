import AsyncStorage from '@react-native-community/async-storage';
import {Axios_Url} from '../AXIOS/Url_List';

const SetUrl = async () => {
  var Axios_Value = '';
  //await Axios_Url();
  Axios_Value = await new Axios_Url();
  const jsonValue = JSON.stringify(Axios_Value);
  try {
    await AsyncStorage.setItem('Url', jsonValue);
  } catch (e) {
    await AsyncStorage.setItem('Url', 'error');
  }
};

const getUrl = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Url');
    if (_value !== null) {
      if (JSON.parse(_value) == undefined) {
        result = 'error';
      } else {
        result = JSON.parse(_value);
      }
    } else {
      console.log('값이 없어요!');
      result = 'error';
    }
  } catch (e) {
    result = 'error';
  }
  return result;
};
export {SetUrl, getUrl};
