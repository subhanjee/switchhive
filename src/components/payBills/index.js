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
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../config/constant';
import {authenticationReloadly, utilities} from '../../api';
import Config from 'react-native-config';
import {addItem} from '../../redux/cart';
import {useDispatch} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Loader from '../Loader';
import {useNavigation} from '@react-navigation/native';
function PayBills() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [billers, setBillers] = useState([]);
  const [billerName, setBillerName] = useState('');
  const [billerId, setBillerId] = useState(null);
  const [billAmount, setBillAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState(0);

  function getUtilitiesBillers(token) {
    utilities(`billers?size=${100}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setBillers(res.data.content);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function addToCart() {
    {
      billerId
        ? dispatch(
            addItem({
              id: billerId,
              name: billers[billerId - 1].name,
              amount: Number(billAmount),
              totalAmount: Number(billAmount),
              accountNumber: accountNumber,
              type: 'utility-payment',
            }),
          )
        : message.error('Select Biller Name');
    }
    billerId &&
      Toast.show({
        type: 'success',
        text1: 'Added To cart',
        topOffset: 7,
      });
    billerId && navigation.navigate('Cart');
    setAccountNumber('');
    setBillAmount('');
    setBillerId('');
    setBillerName('biller');
  }

  const countryExists = code => {
    const result = billers.find(item => item.countryCode === code)
      ? true
      : false;
    return result;
  };
  console.log(billerId, 'BILLING');
  useEffect(() => {
    setLoading(true);
    let values = {
      client_id: Config.REACT_APP_RELOADLY_CLIENT_ID,
      client_secret: Config.REACT_APP_RELOADLY_API_CLIENT_SECRET,
      grant_type: 'client_credentials',
      audience: Config.REACT_APP_UTILITY_RELOADLY,
    };

    authenticationReloadly({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: values,
    })
      .then(res => {
        console.log(res.data, 'UTITITty');
        getUtilitiesBillers(res.data.access_token);
      })
      .catch(err => {
        console.log(err, 'AUTH UTILITY ERROR');
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <Text style={styles.bills}>Pay Utilities</Text>
        <Text style={styles.bills1}>
          Pay Utilities Bills with Bitcoin, Ether, Tether, and more.
        </Text>

        {loading ? (
          <View style={{marginTop: hp(10)}}>
            <Loader />
          </View>
        ) : (
          <>
            <SelectDropdown
              data={billers.map(item => {
                return {title: item.name};
              })}
              onSelect={(selectedItem, index) => {
                setBillerId(index);
                setBillerName(selectedItem.title);
              }}
              defaultButtonText={'Select Biller'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return billerName;
              }}
              rowTextForSelection={(item, index) => {
                return billerName;
              }}
              defaultValue={billerName}
              buttonStyle={styles.dropdown4BtnStyle2}
              buttonTextStyle={styles.dropdown4BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={10}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown4DropdownStyle}
              rowStyle={styles.dropdown4RowStyle}
              rowTextStyle={styles.dropdown4RowTxtStyle}
            />
            <KeyboardAvoidingView>
              {billerId ? (
                <>
                  <View style={styles.inrowinput}>
                    <Text style={styles.textBlack}>Account Number</Text>
                    <TextInput
                      style={styles.inputstyle}
                      keyboardType="text"
                      placeholderTextColor={COLORS.BLACK}
                      placeholder="Enter Account Number"
                      value={accountNumber}
                      onChangeText={e => setAccountNumber(e)}
                    />

                    <Text style={styles.textBlack}>Amounts</Text>
                    <TextInput
                      style={styles.inputstyle}
                      keyboardType="text"
                      placeholder="Enter Bill Amount"
                      onChangeText={e => setBillAmount(e)}
                      value={billAmount}
                      placeholderTextColor={COLORS.BLACK}
                    />
                    <Text style={[styles.textBlack, {textAlign: 'right'}]}>
                      Delivered Amount in{' '}
                      {billers[billerId]?.localTransactionFeeCurrencyCode}{' '}
                      {(billAmount * billers[billerId]?.fx?.rate).toFixed(2)}
                    </Text>
                    {billAmount.length > 0 &&
                    (billAmount >
                      billers[billerId - 1].maxInternationalTransactionAmount ||
                      billAmount <
                        billers[billerId - 1]
                          .minInternationalTransactionAmount) ? (
                      <Text style={{color: 'red', textAlign: 'right'}}>
                        Enter Valid Amount
                      </Text>
                    ) : (
                      <>
                        <Text style={[styles.textBlack, {textAlign: 'right'}]}>
                          Min Amount{' '}
                          {
                            billers[billerId - 1]
                              .minInternationalTransactionAmount
                          }{' '}
                          USD
                        </Text>
                        <Text style={[styles.textBlack, {textAlign: 'right'}]}>
                          Max Amount :{' '}
                          {
                            billers[billerId - 1]
                              .maxInternationalTransactionAmount
                          }{' '}
                          USD
                        </Text>
                      </>
                    )}
                  </View>
                  {billAmount > 0 && accountNumber.length > 0 && (
                    <TouchableOpacity
                      style={styles.submitbtn}
                      onPress={addToCart}>
                      <Text style={styles.color}>Submit</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Text style={styles.bills}>Select Biller First</Text>
              )}
            </KeyboardAvoidingView>
          </>
        )}
      </View>
      <Toast />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4'),
  },
  textWrapper22: {
    height: hp('70%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  bills: {
    fontSize: hp('4'),
    color: 'black',
    textAlign: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  bills1: {
    color: COLORS.BLACK,
    fontSize: hp('2'),
    textAlign: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  dropdown4BtnStyle2: {
    width: '100%',
    height: hp('6'),
    borderRadius: 5,
    marginTop: hp('1'),
    marginBottom: hp('4'),
    borderWidth: 1,
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
  inputstyle: {
    padding: hp('2'),
    borderWidth: 1,
    marginTop: hp('2'),
    marginBottom: hp('2'),
    borderRadius: 5,
    color: COLORS.BLACK,
  },
  submitbtn: {
    backgroundColor: '#EA1F2C',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('6'),
    paddingVertical: hp('2'),
    borderRadius: 5,
    marginTop: hp('4'),
  },
  color: {
    color: 'white',
  },
  textBlack: {
    color: COLORS.BLACK,
    fontSize: hp(2),
  },
});
export default PayBills;
