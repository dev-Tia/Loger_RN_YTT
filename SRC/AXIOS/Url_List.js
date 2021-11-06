import {getUrl} from '../ASYNC/Url_Async';
import axios from 'axios';

const Url = async () => {
  var url = '';
  const Url_Async = async () => {
    var value = await new getUrl();
    return value;
  };
  url = await new Url_Async();
  return {
    Url_Now: 'https://heronoah.github.io/Loger_JSON/JSON/ytt/server.json',
    open_onecall: 'https://api.openweathermap.org/data/2.5/onecall?lat=',
    open_timemachine:
      'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=',
    reverse_geo: url.CurrentServer + 'reversegeo?lat=',
    reverse_geo_addr: url.CurrentServer + 'geo?addr=',
  };
};

const Axios_Url = async () => {
  var data = '';
  await axios
    .get((await Url()).Url_Now)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (e) {
      data = 'error';
    });
  return data;
};

export {Url, Axios_Url};
