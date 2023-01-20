import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import PUBG from '../../assets/images/pubg.jpg';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function WishListCards({item}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bgcolor22}
        onPress={() =>
          navigation.navigate('TopUpCards', {id: item.operatorId})
        }>
        <TouchableOpacity>
          <Icon name="close" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.pubgcard}>
          <Image source={PUBG} style={styles.pubg} />
          <View style={styles.punbgmarginleft}>
            <Text style={styles.pubggreycolor}>PUBG Mobile 60 UC PK</Text>
          </View>
        </View>
        <Text style={styles.pubggreycolor1}>$0.99 - $0.99</Text>
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
