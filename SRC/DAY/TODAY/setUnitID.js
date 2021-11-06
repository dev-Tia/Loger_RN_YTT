import {Platform} from 'react-native';

export default setadID = () => {
  if (__DEV__) {
    return 'ca-app-pub-3940256099942544/2247696110';
  } else {
    if (Platform.OS === 'ios') {
      return 'ca-app-pub-6984881740253042/9980030283';
    }
    if (Platform.OS === 'android') {
      return 'ca-app-pub-6984881740253042/3555296199';
    }
  }
};
