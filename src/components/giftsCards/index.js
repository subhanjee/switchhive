import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import Jazz from '../../assets/images/jazz.png';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function GiftsCard(item) {
  console.log(item.item);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bgcolor}
        onPress={() => navigation.navigate('GiftCards', {id: item.operatorId})}>
        <TouchableOpacity>
          <Icon name="heart" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.topupcard}>
          <Image source={{uri: item.item?.logoUrls[0]}} style={styles.star} />
          <View style={styles.marginleft}>
            <Text style={styles.greycolor}>{item.item?.productName}</Text>
            <Text
              style={
                styles.greycolor1
              }>{`Variation type ${item.item?.denominationType}`}</Text>
            {item.item?.denominationType === 'FIXED' ? (
              <Text style={styles.greycolor2}>{`${
                item.item?.senderCurrencyCode
              } ${item.item?.fixedRecipientDenominations?.[0]} - ${
                item.item?.fixedRecipientDenominations?.[
                  item.item?.fixedRecipientDenominations?.length - 1
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
  },
  topupcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('-3'),
  },
  star: {
    width: 100,
    height: 100,
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
