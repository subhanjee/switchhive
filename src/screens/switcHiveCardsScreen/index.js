import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import COLORS from '../../config/constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import {
  authenticationReloadly,
  cards,
  crypto,
  currencyRate,
  topup,
} from '../../api';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import {addItem} from '../../redux/cart';
import {useDispatch} from 'react-redux';

const countriesWithFlags = [
  {title: 'Egypt'},
  {title: 'Canada'},
  {title: 'Australia'},
  {title: 'Ireland'},
  {title: 'Brazil'},
  {title: 'England'},
  {title: 'Dubai'},
];

function SwitchiveCardScreen({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {id} = route.params;
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [usdtrate, setusdtrate] = useState(0);
  const [errormessage, seterrormessage] = useState(false);
  const [value, setvalue] = useState(0);
  const [optionsforPackage, setoptionsforPackage] = useState([]);
  const [packagestatus, setpackagestatus] = useState('');
  const [topupToken, setTopUpToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencyRates, setCurrencyRates] = useState([]);
  const [phone, setPhone] = useState('');
  const [estimatedRate, setEstimatedRate] = useState({
    symbol: 'USD',
    title: 'USD',
    price: 1,
  });
  const [coins, setCoins] = useState([]);

  const getCoins = () => {
    crypto({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => {
        setCoins([...convertToArray(res.data.data)]);
      })
      .catch(err => {
        console.log(err, 'Coins get failed');
      });
  };
  const convertToArray = obj => {
    let arr = Object.keys(obj).map(key => {
      return {
        label: obj[key].symbol,
        value: obj[key].price,
        title: obj[key].name,
      };
    });
    return arr;
  };
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token_access');
      console.log(token, 'TOKEN');
      getData(token);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = token => {
    setLoading(true);
    cards(`/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getCurrencyValue = coin => {
    const value = currencyRates.map(currency => {
      if (currency[coin]) {
        return currency[coin];
      }
    });
    let data = value.filter(element => {
      return element !== undefined;
    });
    return data[0];
  };
  const getCurrencyRates = () => {
    setLoading(true);
    currencyRate({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': Config.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'currencyscoop.p.rapidapi.com',
      },
    })
      .then(res => {
        let rates = res.data.response.rates;
        let ratesArray = [{USD: rates.USD}, {GBP: rates.GBP}, {EUR: rates.EUR}];
        setCurrencyRates(ratesArray);
      })
      .catch(err => {
        console.log(err);
      });
  };
  function addToCart() {
    dispatch(
      addItem({
        id: data.id,
        name: data.name,
        logoUrls: data.avatar,
        currency: data.currency,
        amount: Number(value / getCurrencyValue(data.currency)),
        totalAmount: Number(value / getCurrencyValue(data.currency)),
        currencyAmount: Number(value),
        email: 'talal@gmail.com',
        type: 'switch-hive-card',
      }),
    );
    // dispatch(setUSDAmount(value));
    // dispatch(setCryptoAmount((value / estimatedRate.price).toFixed(8)));

    navigation.navigate('Cart');
  }
  useEffect(() => {
    if (value !== undefined) {
      if (value < data?.minAmount || value > data?.maxAmount) {
        seterrormessage(true);
        setusdtrate(0);
      } else {
        seterrormessage(false);
        let num = value * data?.fx?.rate;
        setusdtrate((Math.round(num * 100) / 100).toFixed(2));
      }
    }
  }, [value, estimatedRate]);

  useEffect(() => {
    getCoins();
    getCurrencyRates();
    getToken();
    setLoading(true);
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}>
          <View style={styles.textWrapper22}>
            <View style={styles.imgView}>
              {data && (
                <Image source={{uri: data?.avatar}} style={styles.sizeImage} />
              )}
            </View>
            <Text style={styles.color}>{data?.name}</Text>
            <Text style={styles.color1}>
              Pay on Jazz Pakistan with Crypto. Buy Jazz Pakistan top up with
              Bitcoin, Lightning, Ethereum, Binance Pay, USDT, USDC, Dogecoin,
              Litecoin, Dash. Instant email, delivery. No account required.
              Start living on crypto!
            </Text>
            <View style={styles.row}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={COLORS.BORDER}
                placeholder={`${data?.minAmount} ${data?.currency} - ${data?.maxAmount} ${data?.currency}`}
                onChangeText={e => setvalue(e)}
                value={value}
                keyboardType="numeric"
                maxLength={10} //setting limit of input
              />
              <View>
                <Text
                  style={{color: 'green', width: wp(40), marginLeft: wp(2)}}>
                  Delivered Amount in USD{' '}
                  {value
                    ? (value / getCurrencyValue(data.currency)).toFixed(3)
                    : '0'}
                </Text>
              </View>
            </View>
            <View>
              <SelectDropdown
                data={coins}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setEstimatedRate(selectedItem);
                }}
                defaultButtonText={`${
                  value
                    ? (value / getCurrencyValue(data.currency)).toFixed(3)
                    : '0'
                } USD Estimated price`}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return (
                    <Text>
                      {value / selectedItem.value
                        ? String(
                            value /
                              getCurrencyValue(data.currency) /
                              selectedItem.value,
                          ).split('.')[1] > 0
                          ? (
                              value /
                              getCurrencyValue(data.currency) /
                              selectedItem.value
                            ).toFixed(8)
                          : String(
                              value /
                                getCurrencyValue(data.currency) /
                                selectedItem.value,
                            ).split('.')[0]
                        : 0}{' '}
                      {selectedItem.label}
                    </Text>
                  );
                }}
                rowTextForSelection={(item, index) => {
                  return item.title;
                }}
                buttonStyle={styles.dropdown4BtnStyle}
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
            </View>
          </View>
          <View style={styles.twobtninrow}>
            <TouchableOpacity style={styles.redbtn}>
              <Text style={styles.whitetext} onPress={addToCart}>
                Add to Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whitebtn}>
              <Text style={styles.color1}>Purchase as gift</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hairline} />
          <Text style={styles.color1}>Description</Text>
          <View style={styles.hairline} />
          <Text style={styles.color1}>
            Nufferton was founded in 2016 on one simple idea: to create a
            contemporary version of the nearly forgotten, but amazing pyjamas,
            made for the sheets... and the streets. The loungewear label was
            dreamed up in Stockholm, and perhaps it’s not a coincidence. Swedes
            spend more time at home than anyone in the world.
          </Text>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: wp('2'),
    paddingRight: wp('2'),
  },
  textWrapper22: {
    // height: hp('90%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  hairline: {
    backgroundColor: COLORS.BLACK,
    height: 1,
    width: wp('100%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: hp('3'),
  },
  color1: {
    color: '#6A716E',
    fontSize: hp('2'),
    marginTop: hp('1'),
    marginBottom: hp('1'),
    fontWeight: '400',
  },
  color2: {
    color: COLORS.BLACK,
    fontSize: hp('2'),
    marginTop: hp('2'),
    fontWeight: '400',
  },

  imgView: {
    paddingHorizontal: wp('3'),
    paddingVertical: hp('6'),
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    marginTop: hp('1'),
  },
  sizeImage: {
    width: wp('40%'),
    height: hp('20%'),
  },
  textInput: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('55%'),
    padding: hp('1'),
    borderRadius: 2,
    color: COLORS.BLACK,
  },
  textInputphone: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('70%'),
    padding: hp('1'),
    borderRadius: 2,
    color: COLORS.BLACK,
  },
  phonetext: {
    marginTop: hp('2'),
    marginBottom: hp('1'),
    color: COLORS.BLACK,
  },

  redboxrow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: hp('1'),
    marginBottom: hp('1'),

    flexWrap: 'wrap',
  },
  redbox: {
    backgroundColor: '#EA1F2C',
    // display: 'flex',
    marginTop: hp('0.4'),
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,

    marginLeft: wp('1'),
    borderRadius: 5,
  },
  twobtninrow: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  redbtn: {
    backgroundColor: '#EA1F2C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2'),
    borderRadius: 25,
  },
  whitetext: {
    color: COLORS.WHITE,
  },
  whitebtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2'),
    borderRadius: 25,
    marginTop: hp(2),
    backgroundColor: '#ECEFED',
  },
  dropdown4BtnStyle: {
    width: '90%',
    height: hp('6'),
    borderRadius: 5,
    marginTop: hp('1'),
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default SwitchiveCardScreen;
