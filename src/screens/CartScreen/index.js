import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import CacheImage from '../../components/CacheImage';
import COLORS from '../../config/constant';

const CartScreen = () => {
  //   const [cartItems, setCartItems] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const {cartItems, totalPrice} = useSelector(state => state.cart);

  const addToCart = item => {
    // Add item to cartItems and update totalPrice
  };

  const removeFromCart = item => {
    // Remove item from cartItems and update totalPrice
  };

  return (
    <View>
      <Text style={styles.heading}>Cart</Text>
      <ScrollView style={{height: hp(65)}}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItemContainer}>
            <CacheImage imageUrl={item.logoUrls} />
            {/* <> */}
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Quantity: {item.quantity}</Text>
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(item)}>
                  <Text style={styles.text}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* </> */}
            <Text style={styles.text}>Price: {item.price}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.text}>Total Price: {totalPrice}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    color: COLORS.BLACK,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  cartItemContainer: {
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp(3),
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  totalPriceContainer: {
    color: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginVertical: hp(2),
  },
  text: {
    color: COLORS.BLACK,
  },
});

export default CartScreen;
