import React, {useState, useEffect} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/stackNavigation';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import store from './src/redux/store';

enableScreens();

const App = () => {
  const [location, setLocation] = useState({});
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  async function turnOnLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Switchive Location Permission',
          message: 'Switchive App needs access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        console.log('Permission not granted');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        fetch(`https://geolocation-db.com/json/${latitude},${longitude}`)
          .then(response => response.json())
          .then(data => {
            setLocation(data);
            console.log(data, 'THIS IS THE LOCATION DATAQ');
            setCountryName(data.country_name);
            setCountryCode(data.country_code);
          })
          .catch(error => console.error(error, 'error getting location name'));
      },
      error => console.log(error, 'EROOR LOAC'),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  useEffect(() => {
    turnOnLocation();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
