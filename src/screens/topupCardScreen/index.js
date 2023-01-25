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
import {authenticationReloadly, crypto, topup} from '../../api';
import {useNavigation} from '@react-navigation/native';

const countriesWithFlags = [
  {title: 'Egypt'},
  {title: 'Canada'},
  {title: 'Australia'},
  {title: 'Ireland'},
  {title: 'Brazil'},
  {title: 'England'},
  {title: 'Dubai'},
];

function TopUpCardsScreen({route}) {
  const navigation = useNavigation();
  const {id} = route.params;
  console.log(id);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({});
  const [usdtrate, setusdtrate] = useState(0);
  const [errormessage, seterrormessage] = useState(false);
  const [value, setvalue] = useState(0);
  const [optionsforPackage, setoptionsforPackage] = useState([]);
  const [packagestatus, setpackagestatus] = useState('');
  const [topupToken, setTopUpToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [estimatedRate, setEstimatedRate] = useState({
    symbol: 'USD',
    title: 'USD',
    price: 1,
  });
  const [coins, setCoins] = useState([]);

  const validatePhone = phone => {
    if (7 <= phone.length && phone.length <= 14) {
      const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
      console.log(phone.length);
      return !(!phone || regex.test(phone) === false);
    } else {
      return false;
    }
  };
  const getPakcages = data => {
    let opt = [];

    for (let i = 0; i < data?.fixedAmounts?.length; i++) {
      opt.push({
        label: `${data?.senderCurrencyCode} ${data?.fixedAmounts[i]}`,
        value: data?.fixedAmounts[i],
      });
    }
    setoptionsforPackage(opt);
  };

  const getTopUpById = token => {
    topup(`operators/${id}`, {
      method: 'get',
      headers: {
        Accept: 'application/com.reloadly.topups-v1+json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res.data, 'data');
        setdata(res.data);
        if (res.data?.denominationType === 'FIXED') {
          getPakcages(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  };
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
    items = arr;
    return arr;
  };
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
    setloading(true);
    console.log('first');
    if (topupToken === '') {
      console.log('TREU');
      let values = {
        client_id: Config.REACT_APP_RELOADLY_CLIENT_ID,
        client_secret: Config.REACT_APP_RELOADLY_API_CLIENT_SECRET,
        grant_type: 'client_credentials',
        audience: Config.REACT_APP_TOPUP_RELOADLY,
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
          getTopUpById(res.data.access_token);
          // dispatch(setTopUpToken(res.data.access_token));
        })
        .catch(err => {
          console.log(err);
          setloading(false);
        });
    } else {
      console.log('FALSE');
      getTopUpById(topupToken);
    }
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>loading...</Text>
      ) : (
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
            <Text style={styles.color}>{data?.name}</Text>
            <Text style={styles.color1}>
              Pay on Jazz Pakistan with Crypto. Buy Jazz Pakistan top up with
              Bitcoin, Lightning, Ethereum, Binance Pay, USDT, USDC, Dogecoin,
              Litecoin, Dash. Instant email, delivery. No account required.
              Start living on crypto!
            </Text>
            <Text style={styles.color2}>Suggested Amounts</Text>
            <View style={styles.redboxrow}>
              {data?.suggestedAmounts?.map(item => (
                <TouchableOpacity
                  style={styles.redbox}
                  onPress={() => setvalue(item)}>
                  <Text style={styles.whitetext}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.textInput}
                onChangeText={e => setvalue(e)}
                value={value}
                keyboardType="numeric"
                maxLength={10} //setting limit of input
              />
              <View>
                <Text
                  style={{color: 'green', width: wp(40), marginLeft: wp(2)}}>
                  Delivered Amount in {data?.destinationCurrencyCode}{' '}
                  {(value * data?.fx?.rate).toFixed(2)}
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
            <Text style={styles.phonetext}>The phone number to refill</Text>
            <TextInput
              style={styles.textInputphone}
              onChangeText={e => setPhone(e)}
              keyboardType="numeric"
              maxLength={11} //setting limit of input
            />
          </View>
          <View style={styles.twobtninrow}>
            <TouchableOpacity
              style={styles.redbtn}
              onPress={() =>
                console.log({
                  id: data?.id,
                  name: data?.name,
                  package: packagestatus,
                  logoUrls: data?.logoUrls?.[1],
                  amount: Number(value),
                  totalAmount: Number(value),
                  localAmount: (value * data?.fx?.rate).toFixed(2),
                  localCurrency: data?.destinationCurrencyCode,
                  operatorId: id,
                  country: data?.country?.isoName,
                  email: 'talal@gmail.com',
                  phone: phone,
                  type: 'topup',
                })
              }>
              <Text style={styles.whitetext}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whitebtn}>
              <Text>Purchase as gift</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  redbtn: {
    backgroundColor: '#EA1F2C',
    paddingLeft: wp('13'),
    paddingRight: wp('13'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 25,
  },
  whitetext: {
    color: COLORS.WHITE,
  },
  whitebtn: {
    paddingLeft: wp('13'),
    paddingRight: wp('13'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 25,
    backgroundColor: '#ECEFED',
  },
  dropdown4BtnStyle: {
    width: '100%',
    height: hp('6'),
    borderRadius: 5,
    marginRight: hp('2'),
    marginTop: hp('1'),
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default TopUpCardsScreen;
