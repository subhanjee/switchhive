import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function RedeemCoupon({item}) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.ReedemWrapper22}>
        <TouchableOpacity style={styles.Redeembgcolor22}>
          <View style={styles.Redeemcard}>
            <View style={styles.Redeemmarginleft}>
              <Text style={styles.Redeemgreycolor}>Redeem Coupon</Text>
              <Text style={styles.Redeemgreycolor1}>
                Redeem your Coupon here.
              </Text>
              <Text style={styles.Redeemgreycolor1}>Coupon Code</Text>
              <View>
                <TextInput style={styles.textInput} keyboardType="text" />
              </View>
              <Text style={styles.Redeemgreycolor2}>
                Enter your Code here, to redeem your SwitcHive Gift Card.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bgbtnred} onPress={toggleModal}>
            <Text style={styles.redbtntext}>Redeem</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('2'),
  },
  ReedemWrapper22: {
    height: hp('70%'),
    width: '100%', // 80% of width device screen
  },
  Redeemcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },

  Redeembgcolor22: {
    backgroundColor: 'white',
    padding: hp('1'),
    elevation: 5,
    borderRadius: 5,
  },
  Redeemgreycolor: {
    color: '#000',
    fontSize: hp('3'),
    fontWeight: '800',
  },
  Redeemgreycolor1: {
    color: '#4A524E',
    fontSize: hp('2.5'),
    fontWeight: '600',
    marginTop: hp('1'),
    marginBottom: hp('2'),
  },
  Redeemgreycolor2: {
    color: '#4A524E',
    fontSize: hp('2'),
    fontWeight: '600',
    marginTop: hp('1'),
    marginBottom: hp('2'),
  },
  Redeemmarginleft: {
    marginLeft: wp('3'),
  },
  bgbtnred: {
    backgroundColor: '#EC2027',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    alignItems: 'center',
    borderRadius: 5,
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  redbtntext: {
    color: 'white',
    fontSize: hp('3'),
  },
  textInput: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('86%'),
    borderRadius: 3,
  },
});
export default RedeemCoupon;
