import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import Jazz from '../../assets/images/jazz.png';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CacheImage from '../CacheImage';
function GiftsCard({item}) {
  console.log(item);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bgcolor}
        onPress={() => navigation.navigate('GiftCards', {id: item.productId})}>
        <TouchableOpacity>
          <Icon name="heart" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.topupcard}>
          <CacheImage imageUrl={item?.logoUrls[0]} />
          <View style={styles.marginleft}>
            <Text style={styles.greycolor}>{item?.productName}</Text>
            <Text
              style={
                styles.greycolor1
              }>{`Variation type ${item?.denominationType}`}</Text>
            {item?.denominationType === 'FIXED' ? (
              <Text style={styles.greycolor2}>{`${item?.senderCurrencyCode} ${
                item?.fixedRecipientDenominations?.[0]
              } - ${
                item?.fixedRecipientDenominations?.[
                  item?.fixedRecipientDenominations?.length - 1
                ]
              }`}</Text>
            ) : (
              <Text style={styles.greycolor2}>asa</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('1'),
    paddingVertical: hp('1'),
    width: '100%',
  },
  topupcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('-3'),
  },
  star: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bgcolor: {
    backgroundColor: 'white',
    elevation: 3,
    padding: hp('2'),
    marginTop: hp('1'),
  },
  icon: {
    color: '#EC2027',
    alignSelf: 'flex-end',
    fontSize: hp('2.5'),
  },
  greycolor: {
    color: '#000',
    width: wp('50%'),
    fontSize: hp('2.2'),
    fontWeight: '700',
  },
  greycolor1: {
    color: '#000',
    fontSize: hp('2'),
    fontWeight: '500',
  },
  marginleft: {
    marginLeft: wp('3'),
    width: '100%',
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
export default GiftsCard;
