/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Platform,
  PermissionsAndroid
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import Loading from "./Loading";

export default class App extends React.Component {
  state = {
    isLoading: true,
    latitude: null,
    longitude: null
  }
  getLocation = async () => {
    /*LOCATION : */
    //Grant the permission for Location
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
          'title': 'ReactNativeCode Location Permission',
          'message': 'ReactNativeCode App needs access to your location '
      })

  if (granted) {
      Geolocation.getCurrentPosition(
          (position) => {
              console.log("My current location", JSON.stringify(position));
              this.setState({
                  location: position.coords.latitude.toString() + "," + position.coords.longitude.toString(),
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                })
              console.log("STATE CHECK: ",this.state.latitude,this.state.longitude);
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
              Alert.alert("")
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
          
      // this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      // this.setState({lastPosition});
      // });
  }
  //----LOCATION END----//
  }
  componentDidMount() {
    this.getLocation();
}

  render() {
    return <Loading></Loading>
  }
}
