import React, {useEffect, useState} from 'react';
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
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../config/constant';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {users} from '../../api';
import {setUser} from '../../redux/user';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import Loader from '../../components/Loader';
// import Profile from '../../assets/images/person-profile-image-icon.webp';
// import { users, orders, wishlist, redeem, wallet, auth } from "../../api";
const APPURL =
  Config.REACT_APP_ENV === 'dev'
    ? Config.REACT_APP_URL
    : Config.REACT_APP_PRODUCTION_URL;
const countriesWithFlags = [{title: 'EUR'}, {title: 'USD'}, {title: 'GBP'}];
function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const {user} = useSelector(state => state.user);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  async function storeCoin(coin) {
    try {
      await AsyncStorage.setItem('coin', coin);
    } catch (error) {
      console.log(error, 'Storing coin failed');
    }
  }
  const copyToClipboard = text => {
    Toast.show({
      type: 'success',
      text1: 'Text copied to clipboard',
      text2: text,
      topOffset: 5,
    });
    Clipboard.setString(text);
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token_access');
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      console.log(user.id, 'uswreorder');
      console.log(token, 'TOKEN');
      getUserByID(token, user.id);
      setToken(token);
    } catch (error) {
      console.log(error);
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
        getCurrencyValue(res.data, currency);
        console.log(res.data, 'GET USER');
      })
      .catch(error => {
        // messageApi.error(error.response.data.message);
        // dispatch(setLoginState(false));
        console.log(error);
      });
  }
  function addpoints() {
    let add = user?.loyaltyPoints + user?.referralPoints;
    return add;
  }
  function getCurrencyValue(user, coin) {
    const value = user?.balance.map(currency => {
      return currency[coin];
    });
    let data = value.filter(element => {
      return element !== undefined;
    });
    setBalance(data[0]);
  }

  const updateSHP = () => {
    users(`${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        loyaltyPoints: 0,
        referralPoints: 0,
      },
    })
      .then(response => {
        console.log(response.data);
        getUserByID(token, user.id);
      })
      .catch(error => {
        console.log(error);
      });
  };
  function onRedeemSHP(coin) {
    storeCoin(coin);
    if (addpoints().toFixed(2) > 0) {
      addBalance(coin);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Not Enough SHP to redeem',
        text2: 'Buy something to add SHP to your account',
        topOffset: 5,
      });
      toggleModal();
    }
  }

  const addBalance = coin => {
    const updateBalance = () => {
      let arr = [...user.balance];
      console.log(arr);
      arr.map((currency, index) => {
        Object.entries(currency).find(([key, value]) => {
          if (coin === key) {
            arr[index] = {
              [key]:
                arr[index][key] +
                (user.referralPoints + user.loyaltyPoints) / 100,
            };
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
          Authorization: `Bearer ${token}`,
        },
        data: {
          balance: updateBalance(),
        },
      })
        .then(response => {
          console.log(response.data, 'This is ADD Balance response');

          updateSHP();
          // message.success('SHP are added successfully are added in USD');
          // createOrder(data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          Toast.show({
            type: 'success',
            text1: 'SHP are added successfully are added',
            topOffset: 5,
          });
          setRedeeming(false);
          toggleModal();
        });
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  console.log(token, 'TOKEN');
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <LinearGradient
          colors={['rgba(236, 32, 39, 1)', 'rgba(33, 65, 146, 1)']}
          style={styles.linearGradient}>
          <View>
            <SelectDropdown
              data={countriesWithFlags}
              onSelect={(selectedItem, index) => {
                setCurrency(selectedItem.title);
                getCurrencyValue(user, selectedItem.title);
              }}
              defaultButtonText={currency}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown4BtnStyle44}
              buttonTextStyle={styles.dropdown4BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'white'}
                    size={10}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown4DropdownStyle}
              rowStyle={styles.dropdown4RowStyle}
              rowTextStyle={styles.dropdown4RowTxtStyle}
            />
            <Text style={styles.greycolor2}>Choose Currency</Text>
          </View>
          <View style={styles.textWrapper22}>
            <View>
              {/* <Image source={Profile} style={styles.profileimg} /> */}
            </View>
            <View style={styles.rowtext}>
              <Text style={styles.name}>Name:</Text>
              <Text style={styles.greycolor}>{user?.name}</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Email:</Text>
              <Text style={styles.greycolor}>{user?.email}</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Account Balance:</Text>
              <Text style={styles.greycolor}>
                {balance.toFixed(2)} {currency}
              </Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Loyalty Points:</Text>
              <Text style={styles.greycolor}>{user?.loyaltyPoints} SHP</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Referral Points:</Text>
              <Text style={styles.greycolor}>{user?.referralPoints} SHP</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Total SHP:</Text>
              <Text style={styles.greycolor}>{addpoints()} SHP</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.redbtncopy} onPress={toggleModal}>
                <Text style={styles.colorwhite}>Redeem SHP</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.name1}>Referral Code:</Text>
            <Text style={styles.greycolor1}>
              {APPURL}/signup/{user?.id}
            </Text>
            <View>
              <TouchableOpacity
                style={styles.redbtncopy}
                onPress={() => copyToClipboard(`${APPURL}/signup/${user?.id}`)}>
                <Text style={styles.colorwhite}>Copy Referral Link</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Toast />
        </LinearGradient>
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        {redeeming ? (
          <View>
            <Loader />
          </View>
        ) : (
          <View style={styles.container22}>
            {user?.balance?.map(currency => {
              return Object.entries(currency).map(([key, value]) => {
                return (
                  <TouchableOpacity onPress={() => onRedeemSHP(key)}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'red',
                        paddingVertical: hp(3),
                        borderRadius: wp(3),
                        marginTop: hp(1),
                      }}>
                      <Text>{key + ' ' + value.toFixed(3)}</Text>
                    </View>
                  </TouchableOpacity>
                );
              });
            })}

            <TouchableOpacity onPress={toggleModal} style={styles.modelbtn23}>
              <Text style={styles.textBlack}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container22: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    backgroundColor: 'white',
    borderRadius: wp(1),
  },
  linearGradient: {
    paddingHorizontal: wp('2'),
  },
  hairline1: {
    backgroundColor: '#B8B5B5',
    height: 1,
    width: wp('96%'),
    marginTop: hp('1'),
  },
  profileimg: {
    height: 120,
    width: 120,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  textWrapper22: {
    // height: hp('70%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  rowtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modelbtn23: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: hp('1'),
    paddingBottom: hp('1'),
    alignSelf: 'flex-end',
    marginTop: hp('3'),
    marginBottom: hp('3'),
    borderRadius: 3,
  },
  textBlack: {
    color: COLORS.BLACK,
  },
  name: {
    fontSize: hp('3'),
    color: 'white',
    marginTop: hp('2'),
  },
  name1: {
    fontSize: hp('3'),
    color: 'white',
    marginTop: hp('2'),
    textAlign: 'center',
  },
  greycolor: {
    color: '#B8B5B5',
    fontSize: hp('2'),
    fontWeight: '500',
    marginTop: hp('3'),
  },
  greycolor1: {
    color: '#B8B5B5',
    fontSize: hp('2'),
    fontWeight: '500',
    marginTop: hp('3'),
    textAlign: 'center',
  },
  greycolor2: {
    color: '#B8B5B5',
    fontSize: hp('2'),
    fontWeight: '500',
    marginTop: hp('3'),
    textAlign: 'right',
  },
  centerview: {
    alignSelf: 'center',
  },
  redbtncopy: {
    backgroundColor: '#EC2027',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: hp('4'),
    marginBottom: hp('2'),
  },
  colorwhite: {
    color: COLORS.WHITE,
  },
  dropdown4BtnStyle44: {
    width: wp('30%'),
    height: hp('6'),
    borderRadius: 5,
    marginRight: hp('2'),
    marginTop: hp('2'),
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
  },
  dropdown4BtnTxtStyle: {color: 'white', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default ProfileScreen;
