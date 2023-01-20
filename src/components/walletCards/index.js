import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PUBG from '../../assets/images/pubg.jpg';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
function WalletCards({item}) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bgcolor22}
        onPress={() =>
          navigation.navigate('TopUpCards', {id: item.operatorId})
        }>
        <View style={styles.pubgcard}>
          <Image source={PUBG} style={styles.pubg} />
          <View style={styles.punbgmarginleft}>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>Name:</Text>
              <Text style={styles.walletgreycolor1}>Euro Card</Text>
            </View>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>Transaction Id:</Text>
              <Text style={styles.walletgreycolor1}>paid with balance:</Text>
            </View>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>purchase Amount:</Text>
              <Text style={styles.walletgreycolor1}>2 EUR</Text>
            </View>
            <View style={styles.rowwalletcards}>
              <Text style={styles.walletgreycolor}>Paid Amount :</Text>
              <Text style={styles.walletgreycolor1}>2.17 USD</Text>
            </View>
          </View>
        </View>
        <View style={styles.inrowwalletbtn}>
          <TouchableOpacity style={styles.bgbtnred}>
            <Text style={styles.redbtntext}>Copy Coupon Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bgbtnred}>
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
            <Text style={styles.greycolor1}>Close</Text>
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
    fontSize: hp('2'),
    fontWeight: '400',
    marginLeft: wp('2'),
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
  },
});
export default WalletCards;
