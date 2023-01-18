import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TopUp from '../../components/topUp';
import SwitchHiveCard from '../../components/switcHive';
import GiftCard from '../../components/gifts';
import Promotions from '../../components/promotions';
const {width} = Dimensions.get('screen');

const Drawer = createDrawerNavigator();

export default function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="TopUp">
      <Drawer.Screen
        name="TopUp"
        component={TopUp}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="GiftCard"
        component={GiftCard}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="SwitchHiveCard"
        component={SwitchHiveCard}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="Promotions"
        component={Promotions}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Drawer.Navigator>
  );
}
