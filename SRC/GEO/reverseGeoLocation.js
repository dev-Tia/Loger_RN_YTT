import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { View, Text } from "react-native";
import TempContext from "../CONTEXT/Temp";

const ReverseGeoSearch = () => {
  console.log("혜림 ReverseGeoSearch 입장!!");
  const geo = useContext(TempContext);

  const rLat = geo.geoArray[0];
  const rLon = geo.geoArray[1];
  const reverseUrl =
    "http://logerdocker.cafe24.com:3000/reversegeo?lat=" + rLat + "&lon=" + rLon;
  const [reverseAddress, setReverseAddress] = useState("");

  useEffect(() => {
    axios
      .get(reverseUrl)
      .then((response) => {
        //console.log("reverseGeo response >>> ", response.data);
        setReverseAddress(response.data);
      })
      .catch((error) => {
        console.log("----- reverseGeo error -----");
        console.log(error);
      });
  }, [reverseAddress]);

  // return reverseAddress
  return (
    <>
      <Text>{reverseAddress}</Text>
    </>
  );
};

export default ReverseGeoSearch;
