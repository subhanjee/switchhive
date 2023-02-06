import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {users} from '../../api';
import {setUser} from '../../redux/user';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Loader from '../Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RedeemCoupon({item}) {
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token_access');
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      console.log(user.id, 'uswreorder');
      getUserByID(token, user.id);
      setToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const removeRedeemCard = id => {
    redeem(`${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        isRedeemed: true,
      },
    })
      .then(res => {
        console.log(res.data, 'REMOVE ');
        addBalance(res.data);
      })
      .catch(err => {
        console.log(err.message, 'ERROR');
        code.length > 0 &&
          Toast.show({
            type: 'error',
            text1: 'Coupon Already Redeemed',
          });
        code.length <= 0 &&
          Toast.show({
            type: 'error',
            text1: 'Coupon Already Redeemed',
          });
      });
  };
  const addBalance = data => {
    const updateBalance = () => {
      let arr = [...user.balance];
      console.log(arr);
      arr.map((currency, index) => {
        Object.entries(currency).find(([key, value]) => {
          if (data.currency === key) {
            arr[index] = {[key]: arr[index][key] + data.purchaseAmount};
            console.log(key, value);
          }
        });
      });
      return arr;
    };
    if (user.id) {
      setRedeeming(true);
      users(`${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token-access')}`,
        },
        data: {
          balance: updateBalance(),
        },
      })
        .then(response => {
          logger(response.data, 'This is ADD Balance response');
          console.log(code, 'ID');
          getUser();
          message.success('Coupon is added successfully');
          // createOrder(data);
        })
        .catch(error => {
          logger(error);
        })
        .finally(() => {
          setRedeeming(false);
          setCode('');
        });
    }
  };
  function getUserByID(token, userId) {
    users(`/${userId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        dispatch(setUser(res.data));
        console.log(res.data, 'GET USER');
      })
      .catch(error => {
        // messageApi.error(error.response.data.message);
        // dispatch(setLoginState(false));
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.ReedemWrapper22}>
          <TouchableOpacity style={styles.Redeembgcolor22}>
            <View style={styles.Redeemcard}>
              <View style={styles.Redeemmarginleft}>
                <Text style={styles.Redeemgreycolor}>Redeem Coupon</Text>
                <Text style={styles.Redeemgreycolor1}>
                  Redeem your Coupon here.
                </Text>
                <Text style={styles.Redeemgreycolor1}>Coupon Code</Text>
                <View>
                  <TextInput
                    style={styles.textInput}
                    keyboardType="text"
                    onChangeText={e => setCode(e)}
                    value={code}
                  />
                </View>
                <Text style={styles.Redeemgreycolor2}>
                  Enter your Code here, to redeem your SwitcHive Gift Card.
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bgbtnred} onPress={toggleModal}>
              <Text style={styles.redbtntext}>Redeem</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
      <Toast />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('2'),
  },
  ReedemWrapper22: {
    height: hp('70%'),
    width: '100%', // 80% of width device screen
  },
  Redeemcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },

  Redeembgcolor22: {
    backgroundColor: 'white',
    padding: hp('1'),
    elevation: 5,
    borderRadius: 5,
  },
  Redeemgreycolor: {
    color: '#000',
    fontSize: hp('3'),
    fontWeight: '800',
  },
  Redeemgreycolor1: {
    color: '#4A524E',
    fontSize: hp('2.5'),
    fontWeight: '600',
    marginTop: hp('1'),
    marginBottom: hp('2'),
  },
  Redeemgreycolor2: {
    color: '#4A524E',
    fontSize: hp('2'),
    fontWeight: '600',
    marginTop: hp('1'),
    marginBottom: hp('2'),
  },
  Redeemmarginleft: {
    marginLeft: wp('3'),
  },
  bgbtnred: {
    backgroundColor: '#EC2027',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    alignItems: 'center',
    borderRadius: 5,
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  redbtntext: {
    color: 'white',
    fontSize: hp('3'),
  },
  textInput: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('86%'),
    borderRadius: 3,
  },
});
export default RedeemCoupon;
