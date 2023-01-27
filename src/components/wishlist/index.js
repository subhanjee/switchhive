import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import data from '../../helper/data.json';
import WishListCards from '../wishlistcards';
import {wishlist} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
function WishList() {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token_access');
      const user = await AsyncStorage.getItem('user');
      console.log(token, 'TOKEN');
      getWishlist(token, user.id);
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };
  const getWishlist = (token, id) => {
    // dispatch(clearWishlist());
    wishlist({
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        createdBy: id,
      },
    })
      .then(res => {
        // logger(res.data, 'data');
        setWishlistData(res.data.results);
        console.log(res.data.results);
      })
      .catch(error => {
        console.log(error, 'wsih');
        // logger(error.response.data.message);
        // logger(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const removeFromWishlist = item => {
    wishlist(`/${item.productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        // Get user and Token
        getToken();
      })
      .catch(err => {
        console.log(err, 'wishlist error');
        // logger(err, "error removing from Wishlist");
      });
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>WishList Cards</Text>
          <SafeAreaView>
            <FlatList
              data={wishlistData}
              keyExtractor={data => data.id}
              renderItem={({item}) => (
                <WishListCards onDelete={removeFromWishlist} item={item} />
              )}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2'),
  },

  textWrapper22: {
    height: hp('80%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginBottom: hp('2'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp('2'),
  },
  topuptext1: {
    fontSize: hp('2.5'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default WishList;
