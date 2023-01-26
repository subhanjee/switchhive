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
} from 'react-native';
import data from '../../helper/data.json';
import TopUpCard from '../TopUpCard';
import Config from 'react-native-config';
import {authenticationReloadly, topup} from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../Loader';
import {set} from 'react-native-reanimated';
import {setTopUpToken} from '../../redux/user';

const controller = new AbortController();
const {signal} = controller;

function TopUp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // let location = useSelector(state => state.user.location);
  let {topupToken} = useSelector(state => state.user);

  const [products, setproducts] = useState([]);
  const [coutries, setcoutries] = useState([]);
  const [countrycode, setcountrycode] = useState('pk');
  const [locate, setlocate] = useState('pk');

  const getTopups = topuptoken => {
    topup(`operators/countries/${'pk'}`, {
      method: 'get',
      headers: {
        Accept: 'application/com.reloadly.topups-v1+json',
        Authorization: `Bearer ${topuptoken}`,
      },
    })
      .then(res => {
        setproducts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);

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
        getTopups(res.data.access_token);
        setTopUpToken(res.data.access_token);
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
          <Text style={styles.topuptext}>Top Up Cards</Text>
          <Text style={styles.topuptext1}>
            Ready to use online or in-store. Buy Top Up with Bitcoin, Ether,
            Tether, and more.
          </Text>
          {loading ? (
            <Loader />
          ) : (
            <SafeAreaView>
              <FlatList
                data={products}
                keyExtractor={data => data.id}
                renderItem={({item}) => <TopUpCard item={item} />}
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
    // flex: 1,
    paddingHorizontal: wp('1'),
  },
  textWrapper22: {
    height: hp('80%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginBottom: hp('2'),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp('2'),
  },
  topuptext1: {
    fontSize: hp('2.5'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default TopUp;
