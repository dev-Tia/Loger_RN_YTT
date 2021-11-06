import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const SetCurrentLocation_StoreData = async () => {
  //내 위치 받아오기!!!
  let [lat, lon] = [1233333, 4566666];
  let Desc = '일반정보값들(리버스지오 등)';

  let value = {name: '현재위치', latlon: {}, desc: {}};

  value['latlon']['lat'] = lat;
  value['latlon']['lon'] = lon;
  value['desc'] = Desc;

  const jsonValue = JSON.stringify(value);

  console.log('----- 초기값 자동으로 넣기전에 이렇게 생겼어요!!!');
  console.log(jsonValue);

  try {
    // 받아온 값 집어넣기
    // 컨텐스트로 해도 상관없지만 스토리지에 넣어도 편할것 같음
    await AsyncStorage.setItem('CurrentLocation', jsonValue);
  } catch (e) {}
};

const getCurrentLocationData = async () => {
  try {
    const value = await AsyncStorage.getItem('CurrentLocation');
    if (value !== null) {
      let jsonValue = JSON.parse(value);
      console.log(jsonValue);
      return jsonValue;
    } else {
      console.log('값이 없어요!');
      return 'null';
    }
  } catch (e) {
    console.log('에러예요!');
    return 'error';
  }
};

const getValue = async (key) => {
  try {
    const _value = await AsyncStorage.getItem(key);
    if (_value !== null) {
      console.log('getData : ' + _value);
    } else {
      console.log('값이 없어요!');
    }
  } catch (e) {}
};

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }

  console.log(keys);
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};

const addValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(e) {
    // save error
  }
  console.log('Done.')
}

const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
  console.log('Done.');
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
  console.log('clearAll Done.');
};

const Async = () => {
  console.log('Async!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  const [currentLocation, setCurrentLocation] = useState(
    '이건 기본 스테이츠 입니다',
  );

  const [Location, setLocation] = useState('이건 기본 스테이츠 입니다');

  const [textValue1, onChangeTextValue1] = React.useState('Useless Placeholder');
  const [textValue2, onChangeTextValue2] = React.useState('Useless Placeholder');

  useEffect(() => {
    console.log('useEffect start');
    //최초 실행시 현재 위치 저장
    SetCurrentLocation_StoreData().then(() => {
      getCurrentLocationData().then((res) => {
        console.log('----- 잘 가져오면 이 값을 가지고 Today 에 활용 합시다!!!');
        console.log(res['name']);
        setCurrentLocation(res['desc']);
      });
    });

    return () => {};
    
  }, []);

  const handlePress_GET = () => {
    getValue(textValue1)
  };

  const handlePress_ADD = () => {
    addValue(textValue1,textValue2)
  };

  const handlePress_DEL = () => {
    removeValue(textValue1)
  };


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Button onPress={getCurrentLocationData} title="현재 값 꺼내기" />
              <View>
                <Text>------------</Text>
              </View>
              <Button onPress={handlePress_ADD} title="추가하기" />
              <Button onPress={handlePress_DEL} title="삭제하기" />
              <Button onPress={handlePress_GET} title="원하는 값 꺼내기" />
              <View>
                <Text>------------</Text>
              </View>
              <Button onPress={getAllKeys} title="모든 키 확인" />
              <Button onPress={clearAll} title="모든 값 삭제" />
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>현재위치</Text>
              <Text style={styles.sectionDescription}>{currentLocation}</Text>

              <Text style={styles.sectionTitle}>Value</Text>
              <Text style={styles.sectionDescription}>{Location}</Text>

              <View>
                <Text>------------</Text>
              </View>

              <Text style={styles.sectionTitle}>Key</Text>
              <TextInput
                style={styles.sectionDescription}
                onChangeText={(text) => onChangeTextValue1(text)}></TextInput>

              <Text style={styles.sectionTitle}>Value</Text>
              <TextInput
                style={styles.sectionDescription}
                onChangeText={(text) => onChangeTextValue2(text)}></TextInput>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#DDDDDD',
  },
  body: {
    backgroundColor: '#DDDDDD',
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    backgroundColor: '#AA55AA55',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default Async;
