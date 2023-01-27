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
import MyOrderCards from '../myOrdersCards';
import {orders} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MyOrder() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token_access');
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      console.log(user.id, 'uswreorder');
      console.log(token, 'TOKEN');
      getOrders(token, user.id);
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = (token, id) => {
    // setLoading(true);
    console.log(id, 'oreeid');
    orders({
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        createdBy: id,
        limit: 100,
      },
    })
      .then(res => {
        // logger(res.data, "data");
        setData(res.data.results);
        console.log(res.data.results, 'order');
      })
      .catch(error => {
        // logger(error.response.data.message);
        // logger(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const removeOrder = item => {
    orders(`/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token-access')}`,
      },
    })
      .then(res => {
        // logger("removed", res.data);
        getOrders(user.id);
      })
      .catch(err => {
        console.log(err);
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
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.id}
              renderItem={({item}) => <MyOrderCards item={item} />}
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
    // height: hp('80%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  wallettext: {
    fontSize: hp('2.5'),
    color: '#000',
    marginBottom: hp('1'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp('2'),
  },
});
export default MyOrder;
