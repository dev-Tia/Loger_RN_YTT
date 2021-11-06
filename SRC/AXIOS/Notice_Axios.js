import axios from 'axios';
import {SetNotice, GetNotice} from '../ASYNC/Notice_Async';
import {setupCache} from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 0,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

async function NoticeGet() {
  return await GetNotice();
}

const Notice_Axios = async () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  /*   axios.get(
    'https://hero-loger.github.io/Loger_JSON/JSON/ytt/notification.json',
    {
      cancelToken: source.token,
    },
  ); */
  api({
    url: 'https://hero-loger.github.io/Loger_JSON/JSON/ytt/notification.json',
    method: 'get',
    cancelToken: source.token,
  })
    .then(async function (response) {
      var Notice = await NoticeGet();
      Notice = JSON.parse(Notice);
      var now = parseInt(Date.now() / 1000);
      var TempNotice = response.data;
      //! 공지 갯수만큼 for 문
      for (var i = 0; i < response.data.length; i++) {
        //! 기존 async에 값 확인
        //! async에 값이 있을 시
        if (Notice !== null) {
          //! 시간 내에 있을 시
          if (
            new Date(Notice[0]).getDate() !==
            new Date(parseInt(Date.now())).getDate()
          ) {
            TempNotice[i].view =
              parseInt(response.data[i].start_date) < now &&
              now < parseInt(response.data[i].end_date);
            TempNotice[i].will_view =
              parseInt(response.data[i].start_date) < now &&
              now < parseInt(response.data[i].end_date);
            SetNotice({notice: TempNotice});
          } else {
            console.log('업데이트 안함!');
            if (Notice[1][i].will_view == true) {
              Notice[1][i].view = true;
              SetNotice({notice: Notice[1]});
            }
          }
          //! async에 값이 없을 시
        } else if (Notice == null) {
          console.log('첫 실행!');
          TempNotice[i].view =
            parseInt(response.data[i].start_date) < now &&
            now < parseInt(response.data[i].end_date);
          TempNotice[i].will_view =
            parseInt(response.data[i].start_date) < now &&
            now < parseInt(response.data[i].end_date);
          SetNotice({notice: TempNotice});
        }
      }
    })
    .catch(function (error) {
      console.log('Notice_Axios error==', error);
      77;
    });
};

export default Notice_Axios;
