import React, { useContext } from 'react';
import { Text } from 'react-native';

import TempContext from '../../CONTEXT/Temp';
import Yesterday from '../../JSON/YesterdayWeather';
import Forward from '../../JSON/ForwardWeather';

const UnixTimeChange = (timestamp) => {
    var time = new Date(timestamp*1000);

    // const yyyy = time.getFullYear()
    // const mm = ('0' + (time.getMonth() + 1)).slice(-2)
    // const dd = ('0' + time.getDate()).slice(-2)
    const hh = time.getHours()

    return hh
}


const yesterday = (Temp) => {
    let ScreenMent = null;

    console.log(Yesterday[Temp.seasons])
    console.log('오늘 - 어제 >>> '+Temp.tempDif);
    if (parseInt(Temp.tempDif) > 3) {
        ScreenMent = Yesterday[Temp.seasons]['up'];
    } else if (parseInt(Temp.tempDif) < -3) {
        ScreenMent = Yesterday[Temp.seasons]['down'];
    }   else if ( -3 <= parseInt(Temp.tempDif) && parseInt(Temp.tempDif) <= 3) {
        ScreenMent = Yesterday[Temp.seasons]['similar'];
    }
    console.log('ScreenMent >>> '+ScreenMent)

    return ScreenMent
}


const getTimes = (hour) => {
    let getTimes = null;
    let getHours = [];

    if (0 <= hour && hour <= 5) {
        getTimes = 'night'
        getHours = [6,9]
    } else if (6 <= hour && hour <= 11) {
        getTimes = 'morn'
        getHours = [12,15,18,21]
    } else if (12 <= hour && hour <= 17) {
        getTimes = 'day'
        getHours = [18,21]
    } else if (18 <= hour && hour <= 23) {
        getTimes = 'eve'
        getHours = [0,3,6,9]
    } else {
        getTimes = 'error'
        getHours = ['error']
    }

    return [getTimes, getHours];
}



const forward = (Temp) => {
    var today = new Date();
    const nowHours = today.getHours();

    console.log('지금은 ??? '+nowHours)
    const nowTimesResult = getTimes(nowHours)
    console.log('시간대는 ??? '+nowTimesResult[0])

    let continuing = true;
    let eventHours = null;
    let eventMain = null;
    let eventDescription = null;
    let ScreenMent2 = null;

    const nowWeater = Temp.today.weather[0]['main'];
    console.log('현재날씨 > ',nowWeater+' / '+Temp.today.weather[0]['description'])

    Temp.todayHourly_Two[Temp.Geo_Array_Temp['desc']].some(element => {
        const hours = UnixTimeChange(element['time'])

        if (nowTimesResult[1].includes(hours)) {
            console.log(hours+' > '+element['weather']+' / '+element['description'])
            
            if (nowWeater != element['weather']) {
                console.log(hours+' 시 변화 '+nowWeater+' -> '+element['weather']);
                continuing = false;
                eventHours = hours;
                eventMain = element['weather'];
                eventDescription = element['description'];
                return true
            }
        }
        
    });

    if (continuing == true) {
        console.log('지속!!')
        ScreenMent2 = Forward[nowTimesResult[0]]['continuing'][nowWeater]
    } else if (continuing == false) {
        console.log('이벤트~!~!')
        console.log('nowTimes > '+nowTimesResult[0])
        console.log('eventHours > '+eventHours)
        const eventTimesResult = getTimes(eventHours)
        console.log('eventTimes > '+eventTimesResult[0])
        console.log('eventMain > '+eventMain)
        console.log('eventDescription > '+eventDescription)
        ScreenMent2 = Forward[nowTimesResult[0]]['event'][eventTimesResult[0]][eventMain][eventDescription];
    }

    return ScreenMent2
}


const Comment = (props) => {

    const yMent = yesterday(props.Temp);
    const fMent = forward(props.Temp)

    console.log('yMent >>> ',yMent);
    console.log('fMent >>> ',fMent);

    
    return [yMent, fMent];
};

export default Comment;
