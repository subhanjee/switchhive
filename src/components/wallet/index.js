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
import WalletCards from '../walletCards';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {giftcards, authenticationReloadly, redeem, wallet} from '../../api';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const countriesWithFlags = [
  {title: '1 Week'},
  {title: ' Month'},
  {title: 'Off'},
];

function Wallet() {
  const [redeemables, setRedeemables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState([]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token_access');
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      console.log(user.id, 'uswreorder');
      console.log(token, 'TOKEN');
      // getWallets(token, user.id);
      getRedeemables(token, user.id);
    } catch (error) {
      console.log(error);
    }
  };
  // const getWallets = (token, id) => {
  //   // setLoading(true);
  //   wallet({
  //     method: 'get',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       createdBy: id,
  //     },
  //   })
  //     .then(res => {
  //       // logger(res.data, "data");
  //       setWalletData(res.data.results);
  //       console.log(res.data.results);
  //     })
  //     .catch(error => {
  //       // logger(error.response.data.message);
  //       // logger(error);
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  // const deleteWalletItem = id => {
  //   wallet(`${id}`, {
  //     method: 'Delete',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token-access')}`,
  //     },
  //   })
  //     .then(res => {
  //       console.log(res.data, 'REMOVE ');
  //       getWallets();
  //     })
  //     .catch(err => console.log(err));
  // };

  const getRedeemables = (token, id) => {
    // setLoading(true);
    redeem('/ByCard', {
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
        setRedeemables(res.data.results);
        console.log(res.data.results);
      })
      .catch(error => {
        //logger(error.response.data.message);
        // logger(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  // const checkDeleteDay = (itemDate) => {
  //   const date = parseISO(itemDate);
  //   const newDate = add(date, { days: delelteInDays });
  //   if (isBefore(newDate, new Date())) {
  //     onDelete(id);
  //     console.log(isBefore(newDate, new Date()));
  //     console.log(newDate, "new Date New");
  //   }
  //   console.log(newDate, "new Date New");
  // };

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.wallettext}>
            Items will automatically be deleted in
          </Text>
          <View>
            <SelectDropdown
              data={countriesWithFlags}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={'1 Week'}
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
          </View>
          <SafeAreaView>
            <FlatList
              data={redeemables}
              keyExtractor={data => data.id}
              renderItem={({item}) => <WalletCards item={item} />}
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
    paddingHorizontal: wp('1'),
  },
  textWrapper22: {
    height: hp('58%'), // 70% of height device screen
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
  dropdown4BtnStyle44: {
    width: wp('30%'),
    height: hp('6'),
    borderRadius: 5,
    marginLeft: hp('1'),
    marginTop: hp('2'),
    backgroundColor: 'red',
    alignSelf: 'flex-end',
  },
  dropdown4BtnTxtStyle: {color: 'white', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default Wallet;
