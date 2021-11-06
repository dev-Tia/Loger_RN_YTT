import axios from 'axios';
import {Url} from '../AXIOS/Url_List';
export default GeoSearch = async (props) => {
  console.log(props.text);
  const geoAddress = props.text;
  var lat = '';
  var lon = '';
  var data = '';
  await axios
    .get((await Url()).reverse_geo_addr + geoAddress)
    .then((response) => {
      console.log('geo response >>> ', response.data);
      lat = response.data.lat;
      lon = response.data.lon;
      data = response.data;
      if (data[0] == undefined) {
        var x = [data];
        props.setSearchValue(x);
      } else {
        props.setSearchValue(data);
      }
    })
    .catch((error) => {
      console.log('----- geo error -----');
      console.log(error);
    });
};
