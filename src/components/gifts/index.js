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
import {useNavigation} from '@react-navigation/native';
import data from '../../helper/data.json';
import GiftsCard from '../giftsCards';
import {authenticationReloadly, giftcards} from '../../api';
import Config from 'react-native-config';
import {useSelector, useDispatch} from 'react-redux';
import {loadPartialConfig} from '@babel/core';
import Loader from '../Loader';
import axios from 'axios';
function Gifts() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let location = useSelector(state => state.user.location);
  let giftcardToken = useSelector(state => state.user.giftcardToken);
  const controller = new AbortController();
  const {signal} = controller;
  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [coutries, setcoutries] = useState([]);
  const [countrycode, setcountrycode] = useState('pk');
  const [locate, setlocate] = useState('pk');

  const getGiftCards = token => {
    giftcards(`countries/${'pk'}/products`, {
      method: 'get',
      headers: {
        Accept: 'application/com.reloadly.giftcards-v1+json',
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
      .then(res => {
        setproducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        getGiftCards(res.data.access_token);
      })
      .catch(() => {
        setLoading(false);
      });
    return () => controller.abort();
  }, [countrycode]);
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>GiftCards</Text>
          <Text style={styles.topuptext1}>
            Ready to use online or in-store. Buy Gift Cards with Bitcoin, Ether,
            Tether, and more.
          </Text>
          {loading ? (
            <Loader />
          ) : (
            <SafeAreaView>
              <FlatList
                data={products}
                keyExtractor={data => data.id}
                renderItem={({item}) => <GiftsCard item={item} />}
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
    paddingHorizontal: wp('2'),
  },
  textWrapper22: {
    height: hp('80%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginTop: hp('1'),
    marginBottom: hp('1'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  topuptext1: {
    fontSize: hp('2.5'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default Gifts;
