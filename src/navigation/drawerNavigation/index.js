import {Animated, Dimensions, Easing} from 'react-native';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStack from '../stackNavigation/homeStack';
const {width} = Dimensions.get('screen');

const Drawer = createDrawerNavigator();

export default function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      // drawerContent={props => <CustomDrawerContent {...props} />}
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
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
