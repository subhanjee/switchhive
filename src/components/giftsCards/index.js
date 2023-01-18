import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Jazz from '../../assets/images/jazz.png';

function GiftsCard() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bgcolor}>
        <TouchableOpacity>
          <Icon name="heart" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.topupcard}>
          <Image source={Jazz} style={styles.star} />
          <View style={styles.marginleft}>
            <Text style={styles.greycolor}>Jazz Pakistan</Text>
            <Text style={styles.greycolor1}>Variation type RANGE</Text>
            <Text style={styles.greycolor2}>PKR 165.00 - 4950.00</Text>
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
    padding: 10,
  },
  topupcard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    padding: 10,
    elevation: 3,
    marginTop: -15,
  },

  bgcolor: {
    backgroundColor: 'white',
  },
  icon: {
    color: '#EC2027',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 5,
    fontSize: 20,
  },
  greycolor: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  greycolor1: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
  },
  marginleft: {
    marginLeft: 12,
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
export default GiftsCard;
