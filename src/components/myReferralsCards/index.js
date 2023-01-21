import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// import Profile1 from '../../assets/images/person-profile-image-icon.webp';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function MyRerralsCards({item}) {
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
        <View style={styles.referralcard}>
          {/* <Image source={Profile1} style={styles.pubg} /> */}
          <View style={styles.referralmarginleft}>
            <Text style={styles.referralgreycolor}>GUEST</Text>
            <Text style={styles.referralgreycolor1}>guest@gmail.com</Text>
          </View>
        </View>
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
  referralcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  pubg: {
    width: 60,
    height: 60,
  },
  bgcolor22: {
    backgroundColor: 'white',
    padding: hp('1'),
    elevation: 5,
    borderRadius: 5,
  },
  referralgreycolor: {
    color: '#000',
    fontSize: hp('2.5'),
    fontWeight: '800',
  },
  referralgreycolor1: {
    color: '#4A524E',
    fontSize: hp('2'),
    fontWeight: '600',
  },
  referralmarginleft: {
    marginLeft: wp('3'),
  },
});
export default MyRerralsCards;
