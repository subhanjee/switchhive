import React from 'react';
import {Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TopUp from '../../components/topUp';
import SwitchHiveCard from '../../components/switcHive';
import GiftCard from '../../components/gifts';
import Promotions from '../../components/promotions';
import PayBills from '../../components/payBills';
import ProfileScreen from '../../screens/profileScreen';
import WishList from '../../components/wishlist';
import MyOrders from '../../components/myOrders';
import Wallet from '../../components/wallet';
import RedeemCoupon from '../../components/redeemCoupon';
import MyReferrals from '../../components/myReferrals';
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
      <Drawer.Screen
        name="PayBills"
        component={PayBills}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="WishList"
        component={WishList}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="My Orders"
        component={MyOrders}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="RedeemCoupon"
        component={RedeemCoupon}
        options={
          {
            // headerShown: false,
          }
        }
      />
      <Drawer.Screen
        name="MyReferrals"
        component={MyReferrals}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Drawer.Navigator>
  );
}
