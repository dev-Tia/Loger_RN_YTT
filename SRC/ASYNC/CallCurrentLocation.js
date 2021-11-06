import AsyncStorage from '@react-native-community/async-storage';

export default call_CurrentLocation = async (props) => {
  try {
    const value = await AsyncStorage.getItem('CurrentLocation');
    if (value !== null) {
      props.setJsonValue(JSON.parse(value));
      props.setSwitch(true);
    } else {
      console.log('값이 없어요!');
    }
  } catch (e) {
    console.log('에러예요!', e);
  }
};
