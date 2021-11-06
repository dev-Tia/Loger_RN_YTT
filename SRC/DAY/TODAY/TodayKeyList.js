import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Keyboard} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TempContext from '../../CONTEXT/Temp';

import Call_Key from '../../ASYNC/Call_Keys';
import today_Axios from '../../AXIOS/Today_Axios';
import today_past_Axios from '../../AXIOS/Today_past_Axios';
import yesterday_Axios from '../../AXIOS/Yesterday_Axios';
import yesterday_Two_Axios from '../../AXIOS/Yesterday_Two_Axios';

export default KeyList = (props) => {
  //const [callKeys, setCallKeys] = useState(''); //<- FlatList 선택 값
  //const [array, setArray] = useState('');
  var array = [];

  const [_isCall_Switch, setCall_Switch] = useState(false);
  const [arrayAll, setArrayAll] = useState([]);
  const {
    setToday,
    setCallKeys,
    setYesterdayHourly_Two,
    setYesterdayHourly,
    setTodayHourly,
    setTodayHourly_Two,
    setCurrentLocationAsync,
    setGeo_Array_Temp,
    setSeasons,
    setTempDif,
  } = useContext(TempContext);
  const Geo = useContext(TempContext);
  const [BottomMent, setBottomMent] = useState('');

  const removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key.key);
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };

  useEffect(() => {
    Call_Key({
      setCallKeys: setCallKeys,
      setCall_Switch: setCall_Switch,
      _isCall_Switch: _isCall_Switch,
    });
  }, [props._isRefrash]);

  useEffect(() => {
    array = [];
    for (var i = 0; i < Geo.callKeys.length; i++) {
      call_Location({
        keys: Geo.callKeys[i],
        array: array,
      }).then(() => {
        setArrayAll(array);
      });
    }
    //console.log(arrayAll);
  }, [_isCall_Switch]);

  const Item2 = ({item, onPress}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          marginBottom: 10,
          width: '80%',
        }}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{
              paddingBottom: 5,
              fontSize: 20,
              color: 'white',
              fontFamily: 'Jua-Regular',
            }}>
            {item.item['desc']}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {item.item['desc'] == Geo.Geo_Array_Temp['desc'] ? (
          <View>
            <Text
              style={{
                paddingBottom: 5,
                color: 'white',
                fontFamily: 'Jua-Regular',
                fontSize: 12,
              }}>
              현 위치
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              removeValue({key: item.item['desc']});
              props.setRefrash(!props._isRefrash);
            }}>
            <Text
              style={{
                paddingBottom: 5,
                color: 'white',
                fontFamily: 'Jua-Regular',
                fontSize: 12,
              }}>
              [X]
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (_isCall_Switch !== '') {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={arrayAll}
        keyExtractor={(item) => item.desc}
        extraData={props._isRefrash}
        renderItem={
          (item) => {
            return (
              <Item2
                item={item}
                onPress={() => {
                  Keyboard.dismiss;
                  var x = item['item']['lat'];
                  var y = item['item']['lon'];
                  var w = item['item']['desc'];
                  var z = Geo.Geo_Array_Temp;
                  z['lat'] = x;
                  z['lon'] = y;
                  z['desc'] = w;
                  setGeo_Array_Temp({Geo_Array_Temp: z});
                  today_Axios({
                    Geo_Array: z,
                    setToday: setToday,
                    setTodayHourly_Two: setTodayHourly_Two,
                    callKeys: z['desc'],
                    todayHourly_Two: Geo.todayHourly_Two,
                    setCurrentLocationAsync: setCurrentLocationAsync,
                    setSeasons: setSeasons,
                    setTempDif: setTempDif,
                  });
                  today_past_Axios({
                    Geo_Array: z,
                    callKeys: z['desc'],
                    setTodayHourly: setTodayHourly,
                    todayHourly: Geo.todayHourly,
                  });
                  yesterday_Axios({
                    Geo_Array: z,
                    callKeys: z['desc'],
                    setYesterdayHourly: setYesterdayHourly,
                    setBottomMent: setBottomMent,
                    yesterdayHourly: Geo.yesterdayHourly,
                  });
                  yesterday_Two_Axios({
                    Geo_Array: z,
                    callKeys: z['desc'],
                    setYesterdayHourly_Two: setYesterdayHourly_Two,
                    yesterdayHourly_Two: Geo.yesterdayHourly_Two,
                  });

                  props.setRefrash(!props._isRefrash);
                }}
              />
            );
          }
          /* (item) => {return <Text>{JSON.stringify(item.item['latlon'])}</Text> }*/
        }
      />
    );
  } else {
    return <Text>불러오는 중</Text>;
  }
};

async function call_Location(props) {
  var name = props.keys;
  try {
    var value = await AsyncStorage.getItem(name);
    if (value !== null) {
      //alert('위치 = ' + value);
      props.array.push(JSON.parse(value));
    } else {
      console.log('값이 없어요!');
    }
    return props.array;
  } catch (e) {
    console.log('에러예요!', e);
  }
}
