import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PUBG from '../../assets/images/pubg.jpg';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
function WalletCards({item}) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const getProductById = (token) => {
  //   giftcards(`products/${productId}`, {
  //     method: "GET",

  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       logger(res.data, "Data");
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       // message.error("Gift Card get failed");
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setDeleteCheck(true);
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   setLoading(true);

  //     let values = {
  //       client_id: Config.REACT_APP_RELOADLY_CLIENT_ID,
  //       client_secret: Config.REACT_APP_RELOADLY_API_CLIENT_SECRET,
  //       grant_type: "client_credentials",
  //       audience: Config.REACT_APP_GIFTCARD_RELOADLY,
  //     };

  //     authenticationReloadly({
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       data: values,
  //     })
  //       .then((res) => {
  //         getProductById(res.data.access_token);
  //         console.log(res.data.access_token);
  //         // dispatch(setgiftcardToken(res.data.access_token));
  //       })
  //       .catch((error) => {
  //         //   message.error("Token Expire");
  //         // logger(error);
  //         console.log(error);
  //       });

  // }, []);

  const copyRedeemCode = code => {
    Clipboard.setString(code);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bgcolor22}
        onPress={() =>
          navigation.navigate('TopUpCards', {id: item.operatorId})
        }>
        <View style={styles.pubgcard}>
          <Image source={{uri: item.card[0].avatar}} style={styles.pubg} />
          <View style={styles.punbgmarginleft}>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>Name:</Text>
              <Text style={styles.walletgreycolor1}>{item.card[0].name}</Text>
            </View>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>Transaction Id:</Text>
              <Text style={styles.walletgreycolor1}>{item.transactionId}</Text>
            </View>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>purchase Amount:</Text>
              <Text style={styles.walletgreycolor1}>
                {' '}
                {item.purchaseAmount} {item.currency}
              </Text>
            </View>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>Paid Amount :</Text>
              <Text style={styles.walletgreycolor1}>
                {' '}
                {item.paidAmount.toFixed(2)} USD
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.inrowwalletbtn}>
          <TouchableOpacity style={styles.bgbtnred}>
            <Text style={styles.redbtntext}>Copy Coupon Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bgbtnred}
            onPress={() => copyRedeemCode(item?._id)}>
            <Text style={styles.redbtntext}>Copy RedeemCodelink</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bgbtnred} onPress={toggleModal}>
          <Text style={styles.redbtntext}>MoreInfo</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.container22}>
          <Text style={styles.lineheight}>
            1. This promotion is carried out by Jazz Pakistan. 2. This promotion
            starts on April 4 and is an ongoing without a specified end date. 3.
            Recharge 100 PKR TO 199.99 PKR and get 100% bonus credit + 500 MB
            data, bonus amounts valid for 7 Days. 4. Recharge 200 PKR TO 399.99
            PKR and get 200% bonus credit + 2GB data, bonus amounts valid for 10
            days. 5. Recharge 400 PKR and above and get 400% bonus credit + 5GB
            data, bonus amounts valid for 15 days.:
          </Text>
          <TouchableOpacity onPress={toggleModal} style={styles.modelbtn}>
            <Text style={styles.lineheight}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
  },
  container22: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('2'),
    backgroundColor: 'white',
  },
  rowwalletcards: {
    flexDirection: 'row',
  },
  lineheight: {
    color: 'black',
  },
  inrowwalletbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pubgcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  pubg: {
    width: 120,
    height: 80,
  },
  bgcolor22: {
    backgroundColor: 'white',
    padding: hp('1'),
    elevation: 5,
    borderRadius: 5,
  },

  walletgreycolor: {
    color: '#000',
    fontSize: hp('2'),
    fontWeight: '500',
  },
  walletgreycolor1: {
    color: '#4A524E',
    fontSize: hp('1.8'),
    fontWeight: '400',
    marginLeft: wp('1'),
    marginTop: hp('.3'),
  },
  punbgmarginleft: {
    marginLeft: wp('3'),
  },
  bgbtnred: {
    backgroundColor: '#EC2027',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    borderRadius: 5,
    marginTop: hp('2'),
    marginBottom: hp('2'),
    alignSelf: 'center',
  },
  redbtntext: {
    color: 'white',
  },
  modelbtn: {
    borderWidth: 1,
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    alignSelf: 'flex-end',
    marginTop: hp('2'),
    borderRadius: 3,
  },
});
export default WalletCards;
