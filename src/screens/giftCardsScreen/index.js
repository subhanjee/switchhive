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
// import Jazz from '../../assets/images/jazz.png';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import {setgiftcardToken} from '../../redux/user';
import {useNavigation} from '@react-navigation/native';
import {authenticationReloadly, crypto, giftcards} from '../../api';
import Loader from '../../components/Loader';
import {useDispatch} from 'react-redux';
import {addItem} from '../../redux/cart';

const countriesWithFlags = [
  {title: 'Egypt'},
  {title: 'Canada'},
  {title: 'Australia'},
  {title: 'Ireland'},
  {title: 'Brazil'},
  {title: 'England'},
  {title: 'Dubai'},
];
const USD = [{title: 'Usd'}, {title: 'Ustd'}];
function GiftCardsScreen({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {id} = route.params;
  console.log(id, 'ID');
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState({});
  const [value, setvalue] = useState(0);

  const [errormessage, seterrormessage] = useState(false);
  const [optionsforPackage, setoptionsforPackage] = useState([]);
  const [estimatedRate, setEstimatedRate] = useState({
    symbol: 'USD',
    title: 'USD',
    price: 1,
  });
  const [coins, setCoins] = useState([]);

  const getPackages = data => {
    let opt = [];

    for (let i = 0; i < data?.fixedRecipientDenominations?.length; i++) {
      opt.push({
        title: `${data?.senderCurrencyCode} ${data?.fixedRecipientDenominations[i]}`,
        value: data?.fixedRecipientDenominations[i],
      });
    }
    console.log(opt, 'OPT');
    setoptionsforPackage(opt);
  };
  const getProductById = token => {
    giftcards(`products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setdata(res.data);
        console.log(res.data);
        getPackages(res.data);
        setvalue(res.data?.fixedRecipientDenominations[0]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  function addToCart() {
    dispatch(
      addItem({
        id: data?.productId,
        name: data?.productName,
        logoUrls: data?.logoUrls?.[0],
        amount: Number(value),
        totalAmount: Number(value),
        country: data?.country?.isoName,
        email: 'talal@gmail.com',
        phone: '03005645283',
        instructions: `${
          data.redeemInstruction.concise + ' ' + data.redeemInstruction.verbose
        }`,
        type: 'gift-card',
      }),
    );
    // dispatch(setUSDAmount(value));
    // dispatch(setCountryCode(data?.country?.isoName));
    navigation.navigate('Cart');
  }
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
      .catch(() => {
        message.error('Coins get failed');
      });
  };
  // * Converting nested Objects to Array
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
  useEffect(() => {
    getCoins();
    if (value !== undefined) {
      if (value < data?.minAmount || value > data?.maxAmount) {
        seterrormessage(true);
      } else {
        seterrormessage(false);
      }
    }
  }, [value, estimatedRate]);

  useEffect(() => {
    let values = {
      client_id: Config.REACT_APP_RELOADLY_CLIENT_ID,
      client_secret: Config.REACT_APP_RELOADLY_API_CLIENT_SECRET,
      grant_type: 'client_credentials',
      audience: Config.REACT_APP_GIFTCARD_RELOADLY,
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
        getProductById(res.data.access_token);
        dispatch(setgiftcardToken(res.data.access_token));
      })
      .catch(err => {
        setLoading(false);
        console.log(err, 'ERROR');
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}>
            <View style={styles.textWrapper22}>
              <View style={styles.imgView}>
                <Image
                  source={{uri: data?.logoUrls[0]}}
                  style={styles.sizeImage}
                />
              </View>
              <Text style={styles.color}>Jazz Pakistan</Text>
              <Text style={styles.color1}>
                Pay on Jazz Pakistan with Crypto. Buy Jazz Pakistan top up with
                Bitcoin, Lightning, Ethereum, Binance Pay, USDT, USDC, Dogecoin,
                Litecoin, Dash. Instant email, delivery. No account required.
                Start living on crypto!
              </Text>
              <Text style={styles.color2}>Select Package</Text>
              <View style={styles.row}>
                <SelectDropdown
                  data={optionsforPackage}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setvalue(selectedItem.value);
                  }}
                  defaultButtonText={value}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.title;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.title;
                  }}
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
              </View>
              <View>
                <Text style={styles.color2}>Estimated Ampount in Crypto</Text>
                <SelectDropdown
                  data={coins}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setEstimatedRate(selectedItem);
                  }}
                  defaultButtonText={`${value} USD Estimated price`}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return (
                      <Text>
                        {value / selectedItem.value
                          ? String(value / selectedItem.value).split('.')[1] > 0
                            ? (value / selectedItem.value).toFixed(8)
                            : String(value / selectedItem.value).split('.')[0]
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
              <TouchableOpacity style={styles.redbtn} onPress={addToCart}>
                <Text style={styles.whitetext}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.whitebtn}>
                <Text>Purchase as gift</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hairline} />
            <Text style={styles.color1}>
              {data?.redeemInstruction?.concise}
            </Text>
            <View style={styles.hairline} />
            <Text style={styles.color1}>Description</Text>
            <Text style={styles.color1}>
              {data?.redeemInstruction?.verbose}
            </Text>
          </ScrollView>
        </View>
      )}
    </>
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
    width: wp('100%'),
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
    resizeMode: 'contain',
  },
  textInput: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('55%'),
    padding: hp('1'),
    borderRadius: 2,
  },
  textInputphone: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('70%'),
    padding: hp('1'),
    borderRadius: 2,
  },
  phonetext: {
    marginTop: hp('2'),
    marginBottom: hp('1'),
  },

  redboxrow: {
    flexDirection: 'row',
    marginTop: hp('1'),
    marginBottom: hp('1'),
  },
  redbox: {
    backgroundColor: '#EA1F2C',
    alignSelf: 'center',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    marginLeft: wp('1'),
    borderRadius: 5,
  },
  twobtninrow: {
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  redbtn: {
    paddingVertical: hp('2'),
    width: '100%',
    marginTop: hp('2'),
    backgroundColor: '#EA1F2C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  whitetext: {
    color: COLORS.WHITE,
  },
  whitebtn: {
    paddingVertical: hp('2'),
    width: '100%',
    marginTop: hp('2'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BORDER,
    borderRadius: 25,
  },
  dropdown4BtnStyle: {
    width: '90%',
    height: hp('6'),
    borderRadius: 5,
    marginTop: hp('1'),
  },
  dropdown4BtnStyle2: {
    width: '90%',
    height: hp('6'),
    borderRadius: 5,
    marginTop: hp('1'),
    borderWidth: 1,
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    width: '100%',
  },
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default GiftCardsScreen;
