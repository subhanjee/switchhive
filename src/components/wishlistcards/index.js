import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import PUBG from '../../assets/images/pubg.jpg';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CacheImage from '../CacheImage';
function WishListCards({item, onDelete}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bgcolor22}
        onPress={
          () => console.log('TO WISHLIST')
          // navigation.navigate('TopUpCards', {id: item.operatorId})
        }>
        <TouchableOpacity onPress={() => onDelete(item)}>
          <Icon name="close" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.pubgcard}>
          {/* <Image source={{uri: item.image}} style={styles.pubg} /> */}
          <CacheImage imageUrl={item.image} />
          <View style={styles.punbgmarginleft}>
            <Text style={styles.pubggreycolor}>{item.name}</Text>
          </View>
        </View>
        <Text style={styles.pubggreycolor1}>
          ${item.minAmount} - ${item.maxAmount}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
  },
  pubgcard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  icon: {
    color: '#EC2027',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 5,
    fontSize: 20,
  },
  pubggreycolor: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    width: wp(51),
  },
  pubggreycolor1: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'right',
    marginBottom: hp('1'),
  },
  punbgmarginleft: {
    marginLeft: wp('3'),
  },
  greycolor2: {
    color: '#8d8c8c',
    fontSize: 12,
    fontWeight: '500',
  },
  redcolor: {
    color: '#ec2027',
    fontSize: 12,
    fontWeight: '500',
  },
});
export default WishListCards;
