import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import TopUp from '../../components/topUp';
import GiftCard from '../../components/giftsCard';
import SwitchHiveCards from '../../components/switchHiveCard';
import Promotions from '../../components/promotions';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Top Up">
        <Drawer.Screen name="Top Up" component={TopUp} />
        <Drawer.Screen name="Gift Cards" component={GiftCard} />
        <Drawer.Screen name="Switch Hive Cards" component={SwitchHiveCards} />
        <Drawer.Screen name="Promotions" component={Promotions} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
