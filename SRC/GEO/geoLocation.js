import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';



const GeoSearch = () => {
    console.log('혜림 GeoSearch 입장!!')

    const geoAddress = '쌍촌동'
    const geoUrl = 'http://logerdocker.cafe24.com:3000/geo?addr='+geoAddress
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')

    useEffect(() => {
        axios.get(geoUrl)
        .then(response => {
            console.log('geo response >>> ',response.data)
            setLat(response.data.lat)
            setLon(response.data.lon)
        })
        .catch(error => {
            console.log('----- geo error -----')
            console.log(error)
        })
    }, [lat, lon])

    // return [lat, lon]
    return (
        <>
            <Text>{lat} / {lon}</Text>
        </>
    )

}


export default GeoSearch;
