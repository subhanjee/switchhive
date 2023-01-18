import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function PromotionsCard() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bgcolor}>
        <View style={styles.topupcard}>
          <Text style={styles.greycolor}>
            Get up to 400% Bonus Credit + 5GB Free Data!
          </Text>
          <Text style={styles.greycolor1}>
            1:This promotion is carried out by Jazz Pakistan.
          </Text>
          <View style={styles.procard}>
            <Text style={styles.greycolor1}>Start Time:</Text>
            <Text style={styles.greycolor1}>2022-04-04</Text>
          </View>
          <View style={styles.procard}>
            <Text style={styles.greycolor1}>Start Time:</Text>
            <Text style={styles.greycolor1}>2022-04-04</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
  },
  topupcard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('5'),
    elevation: 3,
  },
  procard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: wp('100%'),
    marginTop: hp('1'),
  },
  bgcolor: {
    backgroundColor: 'white',
  },
  greycolor: {
    color: '#000',
    fontSize: hp('2'),
    fontWeight: '500',
    marginBottom: hp('1'),
  },
  greycolor1: {
    color: '#000',
    fontSize: hp('2'),
    fontWeight: '400',
  },
});
export default PromotionsCard;
