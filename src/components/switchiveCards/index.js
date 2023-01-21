import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import Jazz from '../../assets/images/jazz.png';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function SwitchiveCard(item) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.switchbgcolor}
        onPress={() =>
          navigation.navigate('SwitHiveCards', {id: item.operatorId})
        }>
        <TouchableOpacity>
          <Icon name="heart" style={styles.switchicon} />
        </TouchableOpacity>
        <View style={styles.switchcard}>
          {/* <Image source={Jazz} style={styles.star} /> */}
          <View style={styles.switchmarginleft}>
            <Text style={styles.switchgreycolor}>Jazz Pakistan</Text>
            <Text style={styles.switchgreycolor1}>Variation type RANGE</Text>
            <Text style={styles.switchgreycolor2}>PKR 165.00 - 4950.00</Text>
            <Text style={styles.switchredcolor}>Featured</Text>
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
  switchcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('-3'),
  },
  switchbgcolor: {
    backgroundColor: 'white',
    elevation: 3,
    padding: hp('2'),
    marginTop: hp('2'),
  },
  switchicon: {
    color: '#EC2027',
    alignSelf: 'flex-end',
    fontSize: hp('3'),
  },
  switchgreycolor: {
    color: '#000',
    fontSize: hp('2.5'),
    fontWeight: '700',
  },
  switchgreycolor1: {
    color: '#000',
    fontSize: hp('2'),
    fontWeight: '500',
  },
  switchmarginleft: {
    marginLeft: wp('3'),
  },
  switchgreycolor2: {
    color: '#8d8c8c',
    fontSize: hp('1.8'),
    fontWeight: '500',
  },
  switchredcolor: {
    color: '#ec2027',
    fontSize: hp('2'),
    fontWeight: '600',
  },
});
export default SwitchiveCard;
