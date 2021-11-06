import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Modal_Wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(134, 166, 159,0.93)',
    borderRadius: 25,
    paddingBottom: 5,
    elevation: 15,
    opacity: 1,
    marginBottom:'20%'
    /* borderWidth:1,
    borderColor:'#ffffff' */
  },
  Modal_Title: {
    alignItems: 'center',
    fontSize: 13,
    fontFamily: 'Jua-Regular',
    color: '#ffffff',
  },
  Modal_Time_FlatList: {
    flexDirection: 'column',
  },
  Modal_Time_View: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 1,
  },
  Modal_Time_Text: {
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
  },
  Modal_Time_Text_Spaceiong: {
    height: 2,
    width: '100%',
    backgroundColor: '#000000',
    marginBottom: 5,
  },
  Modal_Day_FlatList: {
    flexDirection: 'column',
  },
  Modal_YTT_Text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  Modal_Weather_Icon: {
    height: 25,
    resizeMode: 'contain',
  },
  Modal_Weather_Icon_Text: {
    fontSize: 10,
    marginTop: 5,
    marginBottom: 10,
  },
});
