import AsyncStorage from '@react-native-community/async-storage';

//! URL 저장
const SetNotice = async ({notice}) => {
  var getdata = notice;
  var now = parseInt(Date.now());
  const value = JSON.stringify([now, getdata]);
  try {
    await AsyncStorage.setItem('Notice', value);
  } catch (e) {
    await AsyncStorage.setItem('Notice', 'error');
  }
};

//! URL 불러옴
const GetNotice = async () => {
  var result = '';
  try {
    const _value = await AsyncStorage.getItem('Notice');
    if (_value !== null) {
      result = _value;
    } else {
      result = 'null';
    }
  } catch (e) {
    result = 'error';
  }

  return result;
};

export {SetNotice, GetNotice};
