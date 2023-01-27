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
import PromotionsCard from '../promotionsCards';
// import { authenticationReloadly, topup } from "../../api";
// import { useSelector, useDispatch } from "react-redux";
// import { setTopUpToken } from "../../redux/user";
// import Config from 'react-native-config';
function Promotions() {
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  // const navigate = useNavigate();
  // let location = useSelector((state) => state.user.location);
  // let topuptoken = useSelector((state) => state.user.topupToken);

  // const [loading, setLoading] = useState(false);
  // const [promotionData, setPromotionData] = useState([]);
  // const [coutries, setcoutries] = useState([]);
  // const [countrycode, setcountrycode] = useState("pk");
  // const [locate, setlocate] = useState(location);

  // const getPromotions = (token) => {
  //   setLoading(true);
  //   topup(`promotions/country-codes/${"pk"}`, {
  //     method: "get",
  //     headers: {
  //       Accept: "application/com.reloadly.topups-v1+json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       // setproducts(res.data);
  //       setPromotionData(res.data);
  //       logger(res.data);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       message.error("failed to get Promotions");
  //     });
  // };
  // useEffect(() => {
  //   setLoading(true);
  //   let values = {
  //     client_id: Config.REACT_APP_RELOADLY_CLIENT_ID,
  //     client_secret: Config.REACT_APP_RELOADLY_API_CLIENT_SECRET,
  //     grant_type: "client_credentials",
  //     audience: Config.REACT_APP_TOPUP_RELOADLY,
  //   };

  //   authenticationReloadly({
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },

  //     data: values,
  //   })
  //     .then((res) => {
  //       // getCountries(res.data.access_token);
  //       dispatch(setTopUpToken(res.data.access_token));
  //       // localStorage.setItem("topUpToken", res.data.access_token);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       // message.error("Token Expire");
  //     });
  // }, []);
  // useEffect(() => {
  //   setLoading(true);
  //   let values = {
  //     client_id: Config.REACT_APP_RELOADLY_CLIENT_ID,
  //     client_secret: Config.REACT_APP_RELOADLY_API_CLIENT_SECRET,
  //     grant_type: "client_credentials",
  //     audience: Config.REACT_APP_TOPUP_RELOADLY,
  //   };

  //   authenticationReloadly({
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },

  //     data: values,
  //   })
  //     .then((res) => {
  //       location?.country_code && getPromotions(res.data.access_token);
  //       dispatch(setTopUpToken(res.data.access_token));
  //       // localStorage.setItem("topUpToken", res.data.access_token);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       // message.error("Token Expire");
  //     });
  // }, [location]);
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>Promotions</Text>
          <Text style={styles.topuptext1}>
            Don’t miss out on exclusive operator discounts, promotions and
            special offers.
          </Text>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.name}
              renderItem={({item}) => <PromotionsCard item={item} />}
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
    paddingHorizontal: wp('2'),
  },

  textWrapper22: {
    height: hp('70%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginBottom: 10,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  topuptext1: {
    fontSize: hp('2'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default Promotions;
