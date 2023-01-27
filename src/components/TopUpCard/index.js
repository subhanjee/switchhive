import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CacheImage from '../CacheImage';
function TopUpCard({item}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bgcolor}
        onPress={() =>
          navigation.navigate('TopUpCards', {id: item.operatorId})
        }>
        <TouchableOpacity>
          <Icon name="heart" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.topupcard}>
          {/* <Image
            source={{uri: item.logoUrls[0]}}
            style={{width: 100, height: 100, resizeMode: 'contain'}}
          /> */}
          <CacheImage imageUrl={item.logoUrls[0]} />
          <View style={styles.marginleft}>
            <Text style={styles.greycolor}>{item.name}</Text>
            <Text
              style={
                styles.greycolor1
              }>{`Variation type ${item?.denominationType}`}</Text>
            {item?.denominationType === 'FIXED' ? (
              <Text style={styles.greycolor2}>{`${
                item?.destinationCurrencyCode
              } ${(item?.fixedAmounts[0] * item?.fx?.rate).toFixed(2)} - ${(
                item?.fixedAmounts[item?.fixedAmounts.length - 1] *
                item?.fx?.rate
              ).toFixed(2)} `}</Text>
            ) : (
              <Text style={styles.greycolor2}>{`${
                item?.destinationCurrencyCode
              } ${(item?.minAmount * item?.fx?.rate).toFixed(2)} - ${(
                item?.maxAmount * item?.fx?.rate
              ).toFixed(2)} `}</Text>
            )}
            <Text style={styles.redcolor}>Featured</Text>
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
    borderRadius: wp('4'),
    paddingVertical: hp('1'),
  },
  topupcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('-3'),
  },
  bgcolor: {
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: wp('4'),
    padding: hp('2'),
  },
  icon: {
    color: '#EC2027',
    alignSelf: 'flex-end',
    fontSize: hp('3'),
  },
  greycolor: {
    color: '#000',
    fontSize: hp('2.5'),
    fontWeight: '700',
    width: wp(50),
  },
  greycolor1: {
    color: '#000',
    fontSize: hp('2'),
    fontWeight: '500',
  },
  marginleft: {
    marginLeft: wp('3'),
  },
  greycolor2: {
    color: '#8d8c8c',
    fontSize: hp('1.8'),
    fontWeight: '500',
  },
  redcolor: {
    color: '#ec2027',
    fontSize: hp('2'),
    fontWeight: '600',
  },
});
export default TopUpCard;
