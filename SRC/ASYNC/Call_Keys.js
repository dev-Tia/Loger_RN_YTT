import AsyncStorage from '@react-native-community/async-storage';

const call_Keys = async (props) => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    keys = keys.filter((del) => del !== 'Notice');
    keys = keys.filter((del) => del !== 'Url');

    props.setCallKeys({callKeys: keys});
  } catch (e) {
    console.log('call_Keys Error', e);
  }

  props.setCall_Switch(!props._isCall_Switch);
};

export default call_Keys;
