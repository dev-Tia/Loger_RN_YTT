import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid, Platform} from 'react-native';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('whenInUse');
  }

  if (Platform.OS === 'android') {
    await requestLocationPermission();

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App LOCATION Permission',
        message:
          '어제오늘내일은 needs access to your LOCATION' +
          '위치정보 미제공시 앱 사용이 불안정 합니다.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('1.Set_GeoArray You can use the LOCATION');
    } else {
      console.log('1.Set_GeoArray LOCATION permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Set_GeoArray = (props) => {
  console.log('1.Set_GeoArray 시작');
  console.log('1.Set_GeoArray Platform.os = ', Platform.OS);
  var pos = '';
  requestPermissions()
    .then(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(
            '1.Set_GeoArray Geolocation.watchPosition 시작',
            position['timestamp'],
          );
          var lat = position['coords']['latitude'];
          var lon = position['coords']['longitude'];
          var time_Now = (position['timestamp'] - 2000)
            .toString()
            .substring(0, 10);
          var time_One = parseInt(time_Now) - 86400;
          var time_Two = parseInt(time_One) - 86400;
          pos = {
            lat: lat,
            lon: lon,
            time_Now: time_Now,
            time_One: time_One,
            time_Two: time_Two,
            desc: '',
          };
          console.log('1.Set_GeoArray Geolocation.watchPosition 계산된 pos 값');
          console.log(
            '1.Set_GeoArray ----{lat,lon,time_Now,time_One,time_Two,desc}----',
          );

          props.Set_Geo_Array(pos);
          props.setBottomMent('위치 값 받아오기 완료');
          props.setCallCurrentGeo(true);
        },
        (error) => {
          console.log(error.code, error.message);
          console.log(parseInt(Date.now() / 1000));

          console.log('1.Set_GeoArray Geolocation.watchPosition 시작');

          props.setBottomMent(
            '위치 값 받아오기 거절 기본 지정 값으로 진행합니다.\n권한 설정을 확인 해 주세요.',
          );
          var lat = '35.14741450723145';
          var lon = '126.85341874024874';
          var time_Now = parseInt(Date.now() / 1000);
          var time_One = time_Now - 86400;
          var time_Two = time_One - 86400;
          pos = {
            lat: lat,
            lon: lon,
            time_Now: time_Now,
            time_One: time_One,
            time_Two: time_Two,
            desc: '',
          };
          console.log('1.Set_GeoArray Geolocation.watchPosition 계산된 pos 값');
          console.log(
            '1.Set_GeoArray ----{lat,lon,time_Now,time_One,time_Two,desc}----',
          );

          props.Set_Geo_Array(pos);
          props.setBottomMent('위치 값 받아오기 완료');
          props.setCallCurrentGeo(true);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    })
    .catch((err) => {
      console.log(err.code, err.message);
      props.setBottomMent(
        '위치 값 받아오기 거절 기본 지정 값으로 진행합니다.\n권한 설정을 확인 해 주세요.',
      );
    });
};

export default Set_GeoArray;
