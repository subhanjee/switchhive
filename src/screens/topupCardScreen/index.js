import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import COLORS from '../../config/constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Jazz from '../../assets/images/jazz.png';
function TopUpCardsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={Jazz} style={styles.sizeImage} />
      </View>
      <Text style={styles.color}>Jazz Pakistan</Text>
      <Text style={styles.color1}>
        Pay on Jazz Pakistan with Crypto. Buy Jazz Pakistan top up with Bitcoin,
        Lightning, Ethereum, Binance Pay, USDT, USDC, Dogecoin, Litecoin, Dash.
        Instant email, delivery. No account required. Start living on crypto!
      </Text>
      <Text style={styles.color1}>Suggested Amounts</Text>
      <View></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  color: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: hp('3'),
  },
  color1: {
    color: '#6A716E',
    textAlign: 'center',
    fontSize: hp('2'),
  },
  textWrapper22: {
    height: hp('80%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  imgView: {
    paddingHorizontal: wp('3'),
    paddingVertical: hp('6'),
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
  },
  sizeImage: {
    width: wp('40%'),
    height: hp('20%'),
  },
});
export default TopUpCardsScreen;
