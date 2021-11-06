import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
  BackHandler,
  Alert,
  InteractionManager,
} from 'react-native';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  BannerAdSize,
  TestIds,
} from '@react-native-firebase/admob';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TabColorContext from '../../CONTEXT/TabColors';
import TempContext from '../../CONTEXT/Temp';
import GeoSearch from '../../GEO/GeoSearch';
import Save_Location from '../../ASYNC/Save_Location';
import font from '../../Forecast';
import {bottom_buttons} from '../../ForecastCss';
import Skyimage from '../../JSON/Skyimage';
import styles from './TodayStyle';
import Dstyles from './TodayDynamicStyles';
import KeyList from './TodayKeyList';
import ToDay from './Today';
import setId from './setUnitID';
import setId2 from './setUnitID';
import {GetNotice, SetNotice} from '../../ASYNC/Notice_Async';
import NativeAdView, {
  CallToActionView,
  IconView,
  HeadlineView,
  TaglineView,
  AdvertiserView,
  AdBadge,
} from 'react-native-admob-native-ads';
import {BlurView, VibrancyView} from '@react-native-community/blur';

// # Interstitial
InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

// # Rewarded
RewardedAd.createForAdRequest(TestIds.REWARDED);

const {width, height} = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;
_loadData = async () => {
  try {
    const data = await AsyncStorage.getItem('obj');
    alert(JSON.parse(data)['location']);
  } catch (error) {
    alert(error);
  }
};

const TodayAll = ({navigation}) => {
  const value = useContext(TabColorContext);

  const {setAllLocation} = useContext(TempContext);

  const Temp = useContext(TempContext);

  const [isModalVisible, setVisible] = useState(false);

  const [isModalVisible_Two, setVisible_Two] = useState(false);

  const [isVisible_Three, setVisible_Three] = useState(false);

  const [isSelectVisible, setSelectVisible] = useState(false);

  const [selectValue, setSelectValue] = useState(''); //<- FlatList 선택 값

  const [switchButton, setButton] = useState('temp');

  const [textValue, onChangeTextValue] = useState(''); //<- TextInput 값

  const [searchValue, setSearchValue] = useState([]);

  const [keys, setKeys] = useState('');

  const [isKeys, setIsKeys] = useState(false);

  const [valueArray, setValueArray] = useState([]);

  const [_isRefrash, setRefrash] = useState(false);

  const [Hourly_data, setHourly_data] = useState('');

  const [NoticeValue, setNoticeValue] = useState('');

  const [NoticeBackground, setNoticeBackground] = useState(0);

  const handleChange = (text) => {
    onChangeTextValue(text);
  };

  useEffect(() => {
    Temp.yesterdayHourly_Two[Temp.Geo_Array_Temp['desc']] == undefined
      ? setHourly_data([0, 1, 2, 3])
      : setHourly_data(
          Temp.yesterdayHourly_Two[Temp.Geo_Array_Temp['desc']]
            .concat(Temp.yesterdayHourly[Temp.Geo_Array_Temp['desc']])
            .concat(Temp.todayHourly[Temp.Geo_Array_Temp['desc']])
            .concat(Temp.todayHourly_Two[Temp.Geo_Array_Temp['desc']]),
        );
  }, [isModalVisible]);

  const switchVisible = () => {
    setVisible(!isModalVisible);
  };

  const switchVisible_Two = () => {
    setVisible_Two(!isModalVisible_Two);
  };

  const switchVisible_Three = () => {
    setVisible_Three(!isVisible_Three);
  };

  const switcSelectVisible = () => {
    setSelectVisible(!isSelectVisible);
  };

  async function reCallNotice() {
    var result = '';
    async function Get() {
      result = JSON.parse(await GetNotice());
      console.log('result  ==', result);
      setNoticeValue(result);
    }
    Get();
  }

  useEffect(() => {
    var result = '';
    async function Get() {
      result = JSON.parse(await GetNotice());
      console.log('result  ==', result);
      setNoticeValue(result);
    }
    Get();
  }, []);
  const BottomButton = React.memo(() => {
    return (
      <View style={bottom_buttons.All_Wrapper}>
        <View style={bottom_buttons.Bottom_Button_Wrapper}>
          <View
            style={{
              flexDirection: 'column-reverse',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}></View>
          <TouchableOpacity
            style={{
              height: '110%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            underlayColor="none"
            onPress={() => {
              switchVisible_Two();
              setVisible(false);
            }}>
            <Image
              marginLeft={5}
              resizeMode={'cover'}
              source={
                isModalVisible_Two
                  ? require('../../../assets/more_sam_gr.png')
                  : require('../../../assets/more_sam_wh_1.png')
              }
              name="chatbubble-ellipses-outline"
              style={Dstyles.Bottom_Modal_Icon_Two({
                isModalVisible_Two: isModalVisible_Two,
              })}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Jua-Regular',
                color: '#4c4c4c',
                marginTop: 10,
              }}>
              다른동네{'\n'}날씨보기
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginRight: screenWidth * 0.12,
              height: '110%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            underlayColor="none"
            onPress={() => {
              switchVisible();
              setVisible_Two(false);
            }}>
            <Image
              resizeMode={'cover'}
              source={
                isModalVisible
                  ? require('../../../assets/clock_sam_gr.png')
                  : require('../../../assets/clock_sam_wh_1.png')
              }
              name="add-circle-outline"
              style={Dstyles.Bottom_Modal_Icon({
                isModalVisible: isModalVisible,
              })}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Jua-Regular',
                color: '#4c4c4c',
                marginTop: 10,
              }}>
              시간대별{'\n'}날씨보기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  const getAllKeys = async () => {
    try {
      setKeys(await AsyncStorage.getAllKeys());
      setAllLocation({allLocation: keys});
      for (var i = 0; i < keys.length; i++) {
        callItem({item: keys[i]});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const callItem = async (props) => {
    try {
      const value = await AsyncStorage.getItem(props.item);
      if (value !== null) {
        var jsonValue = JSON.parse(value);
        var array = valueArray;
        array.push(jsonValue);
        setValueArray(array);
        setIsKeys(!isKeys);
      } else {
        console.log('값이 없어요!');
        return 'null';
      }
    } catch (e) {
      console.log('에러예요!', e);
      return 'error';
    }
  };

  useEffect(() => {
    getAllKeys();
    let cnt = 0;
    const backAction = () => {
      setVisible(false);
      setVisible_Two(false);
      cnt = cnt + 1;
      //console.log('cnt == ', cnt);
      if (cnt == 1) {
        setTimeout(() => {
          cnt = 0;
        }, 1000);
      }
      if (cnt == 2) {
        Alert.alert('', '앱을 종료하시겠습니까?', [
          {
            text: '아니오',
            onPress: () => (cnt = 0),
            style: 'cancel',
          },
          {text: '네', onPress: () => BackHandler.exitApp()},
        ]);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const Modal_Ytt_Title = (props) => {
    return (
      <View
        style={{
          marginTop: '2%',
          borderColor: 'white',
          borderWidth: 2,
          paddingTop: '1%',
          paddingBottom: '1%',
          paddingLeft: '10%',
          paddingRight: '10%',
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: 15,
        }}>
        <Text style={styles.Modal_Title}>{props.ment}</Text>
      </View>
    );
  };

  const Modal_Ytt_FlatList = (props) => {
    return (
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: 'rgba(172, 209, 201,0.7)',
          width: '90%',
          height: '25%',
          borderRadius: 15,
          borderColor: 'white',
          borderWidth: 1,
          padding: '1%',
          marginTop: '2%',
        }}
        data={Hourly_data.slice(props.start, props.end)}
        keyExtractor={(item) => item.index}
        numColumns={4}
        renderItem={(item) => {
          return (
            <View
              style={{
                width: '25%',
                height: screenHeight * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: '40%',
                  height: '40%',
                  alignItems: 'center',
                }}
                source={Skyimage['sky'][item.item['weather']]}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Jua-Regular',
                  marginTop: '10%',
                }}>
                {switchButton == 'temp'
                  ? parseInt(item.item.temp) + 'º'
                  : item.item['humidity'] + '%'}
              </Text>
            </View>
          );
        }}></FlatList>
    );
  };

  return (
    <View style={Dstyles.All_Wrapper({color: '#acd1c9'})}>
      <View style={{flex: 1}}>
        <View style={{flex: 8}}>
          <ToDay />
        </View>
        {NoticeValue !== null && (
          <FlatList
            data={NoticeValue[1]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(notice, index) => index.toString()}
            renderItem={(notice) => {
              //console.log('====================', NoticeValue);
              var i = 0;
              i = i + 1;
              return (
                <Modal
                  style={{
                    backgroundColor: 'rgba(0,0,0,1)',
                    width: screenWidth,
                    height: screenHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0,
                  }}
                  onModalShow={() => {
                    setNoticeBackground(NoticeBackground + 1);
                  }}
                  onBackButtonPress={() => {
                    var TempNotice = NoticeValue[1];
                    TempNotice[[notice.index]].view = false;
                    SetNotice({notice: TempNotice});
                    setNoticeBackground(NoticeBackground - 1);

                    reCallNotice();
                  }}
                  animationIn="slideInUp"
                  animationOut="slideOutDown"
                  animationInTiming={0.2}
                  animationOutTiming={0.2}
                  coverScreen={true}
                  hasBackdrop={true}
                  backdropOpacity={
                    NoticeBackground ? 0.5 / NoticeBackground : 0.5
                  }
                  isVisible={NoticeValue[1][notice.index].view}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      width: screenWidth * 0.64,
                      height: screenHeight * 0.4,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255,1)',
                      borderRadius: 15,
                      elevation: 15,
                      opacity: 1,
                    }}>
                    <View
                      style={{
                        paddingLeft: screenWidth * 0.03,
                        paddingRight: screenWidth * 0.03,
                      }}>
                      <Text
                        style={{
                          marginTop: screenWidth * 0.05,
                          marginBottom: screenWidth * 0.05,
                          fontSize: screenWidth * 0.05,
                          color: 'black',
                          fontFamily: 'Jua-Regular',
                        }}>
                        {notice.item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingLeft: screenWidth * 0.03,
                        paddingRight: screenWidth * 0.03,
                      }}>
                      <Text
                        style={{
                          fontSize: screenWidth * 0.035,
                          color: 'black',
                          fontFamily: 'Jua-Regular',
                          textAlign: 'center',
                        }}>
                        {notice.item.discription}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: screenWidth * 0.6,
                      paddingTop: screenWidth * 0.04,
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: screenWidth * 0.3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        var TempNotice = NoticeValue[1];
                        TempNotice[[notice.index]].view = false;
                        SetNotice({notice: TempNotice});
                        setNoticeBackground(NoticeBackground - 1);
                        reCallNotice();
                      }}>
                      <Text
                        style={{
                          fontSize: screenWidth * 0.03,
                          color: 'white',
                          fontFamily: 'Jua-Regular',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}>
                        닫기
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: screenWidth * 0.04,
                        color: 'white',
                        fontFamily: 'Jua-Regular',
                        textAlign: 'center',
                      }}>
                      |
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: screenWidth * 0.3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        var TempNotice = NoticeValue[1];
                        TempNotice[[notice.index]].view = false;
                        TempNotice[[notice.index]].will_view = false;
                        SetNotice({notice: TempNotice});
                        setNoticeBackground(NoticeBackground - 1);
                        reCallNotice();
                      }}>
                      <Text
                        style={{
                          fontSize: screenWidth * 0.03,
                          color: 'white',
                          fontFamily: 'Jua-Regular',
                          textAlign: 'center',
                        }}>
                        오늘 다시 보지 않기
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              );
            }}
          />
        )}

        <Modal
          onBackdropPress={() => {
            setVisible(false);
          }}
          animationIn="slideInUp"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={300}
          coverScreen={false}
          hasBackdrop={true}
          backdropOpacity={0}
          isVisible={isModalVisible}>
          <View style={{width: '100%', height: '80%'}}>
            <View style={styles.Modal_Wrapper}>
              <View style={{width: '90%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}>
                  <Text
                    style={{
                      marginLeft: '3%',
                      marginTop: '3%',
                      fontSize: 25,
                      color: 'white',
                      fontFamily: 'Jua-Regular',
                    }}>
                    x
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={
                  ([font.tabFontBox, font.basicB],
                  {
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '5%',
                    marginBottom: '2%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingBottom: '0.5%',
                  })
                }>
                <Text style={styles.Modal_Title}>새벽</Text>
                <Text style={styles.Modal_Title}>오전</Text>
                <Text style={styles.Modal_Title}>오후</Text>
                <Text style={styles.Modal_Title}>저녁</Text>
              </View>
              <View
                style={{
                  width: '80%',
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                }}></View>
              <Modal_Ytt_Title ment="어제" />
              <Modal_Ytt_FlatList start={0} end={4} />
              <Modal_Ytt_Title ment="오늘" />
              <Modal_Ytt_FlatList start={3} end={7} />
              <Modal_Ytt_Title ment="내일" />
              <Modal_Ytt_FlatList start={7} end={11} />

              <View
                style={{
                  flexDirection: 'row',
                  height: screenHeight * 0.06,
                  width: screenWidth,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: -screenWidth * 0.1,
                  margin: '2%',
                }}>
                <Button
                  title="  날 씨  "
                  onPress={() => {
                    setButton('temp');
                  }}
                />
                <Button
                  title="  습 도  "
                  onPress={() => {
                    setButton('humidity');
                  }}
                />
              </View>
              <View
                style={{
                  height: screenHeight * 0.14,
                  marginTop: screenHeight * 0.005,
                  marginBottom: screenHeight * 0.015,
                }}>
                {isModalVisible ? <AD_1 /> : <></>}
              </View>
            </View>
          </View>
          <View height={screenHeight * 0.12}></View>
        </Modal>
        <Modal
          onBackdropPress={() => {
            setVisible_Two(false);
          }}
          animationIn="slideInUp"
          animationOut="zoomOut"
          animationInTiming={300}
          animationOutTiming={300}
          coverScreen={false}
          hasBackdrop={true}
          backdropOpacity={0}
          isVisible={isModalVisible_Two}>
          <View style={{height: '90%'}}>
            <View style={styles.Modal_Wrapper}>
              <View style={{width: '90%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible_Two(false);
                  }}>
                  <Text
                    style={{
                      marginLeft: '3%',
                      marginTop: '7%',
                      fontSize: 25,
                      color: 'white',
                      fontFamily: 'Jua-Regular',
                    }}>
                    x
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  fontSize: 20,
                  alignItems: 'center',
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <Image
                  resizeMode={'cover'}
                  source={require('../../../assets/pin_sam.png')}
                  name="chatbubble-ellipses-outline"
                  style={{
                    marginLeft: 20,
                    resizeMode: 'contain',
                    height: 35,
                    width: 35,
                    opacity: 0.8,
                  }}
                />
                <Text
                  style={{
                    fontSize: 25,
                    color: 'white',
                    fontFamily: 'Jua-Regular',
                    /*  borderBottomWidth: 2,
                    borderBottomColor: 'white', */
                  }}>
                  다른동네 추가하기
                </Text>
                <View style={{marginRight: 55}}>
                  <Text>&nbsp;</Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: '16%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '5%',
                  }}>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      //backgroundColor: '#00000022',
                      width: '70%',
                      fontSize: 20,
                      fontFamily: 'Jua-Regular',
                      borderBottomColor: 'rgb(255,255,255)',
                      borderBottomWidth: 2,
                      color: 'white',
                    }}
                    selectionColor={'transparent'}
                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                    placeholder="지역을 입력해 주세요"
                    onChangeText={(text) => handleChange(text)}
                    value={textValue}
                    onSubmitEditing={() => {
                      GeoSearch({
                        setSearchValue: setSearchValue,
                        text: textValue,
                      });
                      setVisible_Three(true);

                      Keyboard.dismiss();
                    }}></TextInput>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    fontSize: 20,
                    alignItems: 'center',
                    marginBottom: 20,
                    marginTop: 20,
                  }}>
                  <Image
                    resizeMode={'cover'}
                    source={require('../../../assets/favo_sam_wh.png')}
                    name="chatbubble-ellipses-outline"
                    style={{
                      marginLeft: 30,
                      resizeMode: 'contain',
                      height: 35,
                      width: 35,
                      opacity: 0.8,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      color: 'white',
                      fontFamily: 'Jua-Regular',
                      /*  borderBottomWidth: 2,
                      borderBottomColor: 'white', */
                    }}>
                    {isVisible_Three ? '다른동네 추가하기' : '내가 저장한 동네'}
                  </Text>
                  <View style={{marginRight: 55}}>
                    <Text>&nbsp;</Text>
                  </View>
                </View>
                <View style={{height: '50%', backgroundColor: 'transparent'}}>
                  {isVisible_Three ? (
                    <View
                      style={{
                        margin: 20,
                        alignItems: 'center',
                      }}>
                      <FlatList
                        style={{
                          marginBottom: '10%',
                          width: '80%',
                        }}
                        showsVerticalScrollIndicator={false}
                        data={searchValue}
                        keyExtractor={(index) => index.toString()}
                        extraData={_isRefrash}
                        renderItem={(item) => {
                          return (
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectValue(item.item);
                                  setSelectVisible(!isSelectVisible);
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'left',
                                    paddingBottom: 10,
                                    fontSize: 20,
                                    color: 'white',
                                    fontFamily: 'Jua-Regular',
                                  }}>
                                  {item.item['display_name']}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          switchVisible_Three();
                        }}>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              padding: 5,
                              backgroundColor: '#00000044',
                              padding: 10,
                              fontSize: 20,
                              color: 'white',
                              fontFamily: 'Jua-Regular',
                              borderRadius: 10,
                            }}>
                            검색 취소
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: '100%',
                        width: '80%',
                        alignItems: 'center',
                        paddingLeft: '10%',
                        margin: 20,
                      }}>
                      <KeyList
                        _isRefrash={_isRefrash}
                        setRefrash={setRefrash}></KeyList>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationInTiming={300}
          animationOutTiming={300}
          isVisible={isSelectVisible}>
          <View
            style={{
              backgroundColor: '#acd1c9',
              padding: '5%',
              paddingLeft: '8%',
              paddingRight: '8%',
              width: '100%',
              height: '28%',
              borderRadius: 15,
              borderWidth: 3,
              borderColor: '#ffffff',
            }}>
            <View flex={1}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Jua-Regular',
                }}>
                &nbsp;위치명 {'\n\n'} [{selectValue['display_name']}]
                추가하시겠습니까?
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Save_Location({
                    selectValue: selectValue,
                    setRefrash: setRefrash,
                    _isRefrash: _isRefrash,
                  });

                  switcSelectVisible(!isSelectVisible);
                  setRefrash(!_isRefrash);
                  switchVisible_Three();
                }}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      padding: 5,
                      paddingLeft: '8%',
                      paddingRight: '8%',
                      backgroundColor: '#00000044',
                      padding: 10,
                      fontSize: 20,
                      color: 'white',
                      fontFamily: 'Jua-Regular',
                      borderRadius: 10,
                    }}>
                    &nbsp;&nbsp;&nbsp;네&nbsp;&nbsp;&nbsp;
                  </Text>
                </View>
              </TouchableOpacity>
              <View width={'10%'}></View>
              <TouchableOpacity
                onPress={() => {
                  switcSelectVisible(!isSelectVisible);
                  switchVisible_Three();
                }}>
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <Text
                    style={{
                      padding: 5,
                      paddingLeft: '8%',
                      paddingRight: '8%',
                      backgroundColor: '#00000044',
                      padding: 10,
                      fontSize: 20,
                      color: 'white',
                      fontFamily: 'Jua-Regular',
                      borderRadius: 10,
                    }}>
                    아니오
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <AD_2 />
                <View style={{width: screenWidth *0.05}}></View>    
          <BottomButton />
        </View>
      </View>
    </View>
  );
};
export default TodayAll;

const AD_1 = () => {
  const [adID, setadID] = useState('');
  useEffect(() => {
    let mounted = true;

    setadID(setId());
    return () => (mounted = false);
  }, []);

  return (
    <View
      style={{
        height: screenHeight * 0.13,
        margin: screenHeight * 0.01,
      }}>
      <NativeAdView
        style={{
          width: '100%',
          alignSelf: 'center',
          height: screenHeight * 0.12,
        }}
        adUnitID={adID} // TEST adUnitID
      >
        <View
          style={{
            height: screenHeight * 0.12,
            width: '100%',
          }}>
          <View
            style={{
              height: screenHeight * 0.12,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#ffffff22',
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <AdBadge
              style={{
                width: 15,
                height: 15,
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              textStyle={{
                fontSize: 8,
                color: 'black',
                justifyContent: 'center',
              }}
            />
            <IconView
              style={{
                width: screenHeight * 0.075,
                height: screenHeight * 0.075,
              }}
            />
            <View
              style={{
                width: screenWidth * 0.5,
                maxWidth: screenWidth * 0.6,
                paddingHorizontal: 6,
                backgroundColor: '#33333322',
              }}>
              <HeadlineView
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  backgroundColor: '#33333355',
                }}
              />
              <TaglineView
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  backgroundColor: '#33333377',
                }}
              />
              <AdvertiserView
                style={{
                  fontSize: 10,
                  color: 'white',
                  backgroundColor: '#33333399',
                }}
              />
            </View>

            <CallToActionView
              style={{
                height: 45,
                width: screenWidth*0.1,
                paddingHorizontal: 12,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                elevation: 10,
              }}
              textStyle={{color: 'white', fontSize: 14}}
            />
          </View>
        </View>
      </NativeAdView>
    </View>
  );
};

const AD_2 = React.memo(() => {
  const [adID, setadID] = useState('');
  useEffect(() => {
    let mounted = true;
    setadID(setId());
    return () => (mounted = false);
  }, []);

  return adID == '' ? (
    <View
      style={{
        backgroundColor:'black',
        //marginTop: screenHeight * 0.05,
        marginLeft: screenWidth * 0.02,
        height: screenHeight * 0.07,
        width: screenWidth * 0.4,
        //marginBottom: screenWidth * 0.1,
      }}
    />
  ) : (
    <View
      style={{
        //marginTop: screenHeight * 0.05,
        marginLeft: screenWidth * 0.02,
        height: screenHeight * 0.07,
        width: screenWidth * 0.4,
        //marginBottom: screenWidth * 0.1,
      }}>
      <NativeAdView
        style={{
          width: screenWidth * 0.4,
          alignSelf: 'center',
          height: screenHeight * 0.07,
        }}
        adUnitID={adID} // TEST adUnitID
      >
        <View
          style={{
            justifyContent: 'space-between',
            height: screenHeight * 0.07,
            width: screenWidth * 0.4,
          }}>
          <View
            style={{
              height: screenHeight * 0.07,
              width: screenWidth * 0.4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              //backgroundColor: '#ffffff',
              alignItems: 'center',
            }}>
            <IconView
              style={{
                width: screenHeight * 0.05,
                height: screenHeight * 0.05,
              }}
            />

            <View
              style={{
                justifyContent: 'center',
                width: screenWidth * 0.4,
                height: '100%',
                maxWidth: screenWidth * 0.4,
                paddingHorizontal: 6,
                backgroundColor: '#33333322',
              }}>
              <HeadlineView
                style={{
                  fontWeight: 'bold',
                  fontSize: screenHeight * 0.012,
                  backgroundColor: '#33333355',
                }}
              />
              <TaglineView
                numberOfLines={2}
                style={{
                  fontSize: screenHeight * 0.009,
                  backgroundColor: '#33333377',
                }}
              />
                {/* <AdvertiserView
              style={{
                fontSize: 10,
                color: 'white',
                backgroundColor: '#33333399',
              }}
            />   */}
            </View>
            <AdBadge
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: screenWidth * 0.035,
                width: screenWidth * 0.035,
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              textStyle={{
                fontSize: screenWidth * 0.017,
                color: 'white',
                justifyContent: 'center',
              }}
            />
          </View>
        </View>
      </NativeAdView>
    </View>
  );
});
