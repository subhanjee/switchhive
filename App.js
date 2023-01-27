import React, {useState, useEffect} from 'react';
import {Alert, PermissionsAndroid} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/stackNavigation';
import {enableScreens} from 'react-native-screens';
import {Provider, useDispatch} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addCart, clearCart} from './src/redux/cart';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
enableScreens();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'white',
  },
};
const App = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({});
  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');

  let i = 0;
  async function getDataFromStorage() {
    const stateCartItems = (await AsyncStorage.getItem('state'))
      ? JSON.parse(await AsyncStorage.getItem('state')).cartItems
      : [];
    if (stateCartItems.length > 0) {
      dispatch(clearCart());
      for (let i = 0; i < stateCartItems.length; i++) {
        dispatch(addCart(stateCartItems[i]));
      }
    }
    i++;
    console.log('Function is Called', i, 'TIMES');
    stateCartItems &&
      console.log(stateCartItems, stateCartItems.length, 'FROM STORAGE');
    const stateTotalPrice = (await AsyncStorage.getItem('state')?.totalPrice)
      ? JSON.parse(await AsyncStorage.getItem('state')).totalPrice
      : 0;
    const stateTotalItems = (await AsyncStorage.getItem('state')?.totalItems)
      ? JSON.parse(await AsyncStorage.getItem('state')).totalItems
      : 0;
    const stateWishlist = (await AsyncStorage.getItem('state')?.wishlist)
      ? JSON.parse(await AsyncStorage.getItem('state')).wishlist
      : [];
  }
  getDataFromStorage();
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
            // setCountryName(data.country_name);
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
    getDataFromStorage();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
