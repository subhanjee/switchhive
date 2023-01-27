import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import CreateAccount from '../../components/createAccount';
import GiftCardsScreen from '../../screens/giftCardsScreen';
import LoginScreen from '../../screens/loginScreen';
import SwitHiveCardsScreen from '../../screens/switcHiveCardsScreen';
import TopUpCardsScreen from '../../screens/topupCardScreen';
import AppStack from '../drawerNavigation';
import Loader from '../../components/Loader';
import CartScreen from '../../screens/CartScreen';
// import DrawerNavigation from '../drawerNavigation';
const Stack = createStackNavigator();

function OnboardingStack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const checkLoginState = async () => {
      const loginState = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(JSON.parse(loginState));
      setAppLoading(false);
    };
    checkLoginState();
  }, []);

  return (
    <>
      {appLoading ? (
        <Loader />
      ) : (
        <Stack.Navigator
          screenOptions={{
            mode: 'card',
          }}>
          {!isLoggedIn && (
            <Stack.Screen
              options={{headerShown: false}}
              name="createAccount"
              component={CreateAccount}
            />
          )}
          {!isLoggedIn && (
            <Stack.Screen
              options={{headerShown: false}}
              name="main"
              component={LoginScreen}
            />
          )}
          <Stack.Screen
            options={{headerShown: false}}
            name="App"
            component={AppStack}
          />
          <Stack.Screen name="TopUpCards" component={TopUpCardsScreen} />
          <Stack.Screen name="GiftCards" component={GiftCardsScreen} />
          <Stack.Screen name="SwitHiveCards" component={SwitHiveCardsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      )}
    </>
  );
}
export default OnboardingStack;
