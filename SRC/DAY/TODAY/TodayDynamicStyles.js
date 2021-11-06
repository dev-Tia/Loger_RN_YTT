import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;

const FlatList_Warpper = (props) => {
  return {
    backgroundColor:
      props.index < 8
        ? '#ff000012'
        : props.index < 16
        ? '#0000ff12'
        : '#00ff0012',
    flex: 1,
    alignItems:
      props.index == 3
        ? 'flex-end'
        : props.index == 4
        ? 'flex-start'
        : props.index == 11
        ? 'flex-end'
        : props.index == 12
        ? 'flex-start'
        : props.index == 19
        ? 'flex-end'
        : props.index == 20
        ? 'flex-start'
        : 'center',
  };
};

let ttt = '#ff000012';
const FlatList_YTT_Line = (props) => {
  return {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    marginBottom: 2,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor:
      props.index < 8 ? ttt : props.index < 16 ? '#0000ff12' : '#00ff0012',
  };
};

const FlatList_YTT_UnderLine = (props) => {
  return {
    height: 2,
    width: '100%',
    backgroundColor:
      props.index < 8 ? '#ff0000' : props.index < 16 ? '#0000ff' : '#00ff00',
    marginBottom: 5,
  };
};
const Bottom_Modal_Icon = (props) => {
  return {
    // fontSize: 5,
    resizeMode: 'contain',
    height: screenWidth * 0.1,
    width: screenWidth * 0.1,
    opacity: 0.8,
    // fontSize: 45,
    //color: props.isModalVisible ? '#000000' : '#4c4c4c',
  };
};
const Bottom_Modal_Icon_Two = (props) => {
  return {
    // fontSize: 5,
    resizeMode: 'contain',
    height: screenWidth * 0.1,
    width: screenWidth * 0.1,
    opacity: 0.8,

    // color: props.isModalVisible_Two ? '#000000' : '#4c4c4c',
  };
};

const All_Wrapper = (props) => {
  return {
    flex: 1,
    /* justifyContent: 'center',
    alignItems: 'center', */
    backgroundColor: props.color,
  };
};
export default {
  FlatList_Warpper,
  FlatList_YTT_Line,
  FlatList_YTT_UnderLine,
  Bottom_Modal_Icon,
  All_Wrapper,
  Bottom_Modal_Icon_Two,
};
