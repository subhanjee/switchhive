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
  ScrollView,
} from 'react-native';
import data from '../../helper/data.json';
import {useNavigation} from '@react-navigation/native';
import SwitchiveCard from '../switchiveCards';
import {cards} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import COLORS from '../../config/constant';
import Loader from '../Loader';

const controller = new AbortController();
const {signal} = controller;
function Switchive() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let location = useSelector(state => state.user.location);
  let giftcardToken = useSelector(state => state.user.giftcardToken);

  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [coutries, setcoutries] = useState([]);
  const [countrycode, setcountrycode] = useState('pk');
  const [locate, setlocate] = useState('pk');

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token_access');
      console.log(token, 'TOKEN');
      getSwitchHiveCards(token);
    } catch (error) {
      console.log(error);
    }
  };
  const getSwitchHiveCards = token => {
    setLoading(true);
    cards({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
      .then(res => {
        setproducts(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getToken();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>SwitcHiveCard</Text>
          <Text style={styles.topuptext1}>
            Purchase the Switchive gift card for instant checkout while
            shopping, balance top up or gift your loved ones to shop for their
            desired products on the switchive website.
          </Text>
          {loading ? (
            <View style={{marginTop: hp(10)}}>
              <Loader />
            </View>
          ) : (
            <SafeAreaView>
              <FlatList
                data={products}
                keyExtractor={data => data.id}
                renderItem={({item}) => <SwitchiveCard item={item} />}
              />
            </SafeAreaView>
          )}
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
    height: hp('50%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginBottom: hp('3'),
    color: 'black',
    fontWeight: '500',
    marginTop: hp('2'),
    textAlign: 'center',
  },
  topuptext1: {
    color: '#808080',
    fontSize: hp('2'),
    marginBottom: hp('3'),
    fontWeight: '400',
    marginBottom: hp('2'),
    textAlign: 'center',
    paddingHorizontal: wp('4'),
  },
});
export default Switchive;
