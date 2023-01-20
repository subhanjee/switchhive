import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

function PromotionsCard() {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bgcolor} onPress={toggleModal}>
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
      <Modal isVisible={isModalVisible}>
        <View style={styles.container22}>
          <Text style={styles.greycolor99}>Title:</Text>
          <Text>Get up to 400% Bonus Credit + 5GB Free Data!</Text>
          <Text style={styles.greycolor99}>Description:</Text>
          <Text style={styles.lineheight}>
            1. This promotion is carried out by Jazz Pakistan. 2. This promotion
            starts on April 4 and is an ongoing without a specified end date. 3.
            Recharge 100 PKR TO 199.99 PKR and get 100% bonus credit + 500 MB
            data, bonus amounts valid for 7 Days. 4. Recharge 200 PKR TO 399.99
            PKR and get 200% bonus credit + 2GB data, bonus amounts valid for 10
            days. 5. Recharge 400 PKR and above and get 400% bonus credit + 5GB
            data, bonus amounts valid for 15 days.:
          </Text>
          <Text style={styles.greycolor99}>Timing:</Text>
          <View style={styles.procard}>
            <Text style={styles.greycolor1}>Start Time:</Text>
            <Text style={styles.greycolor1}>2022-04-04</Text>
          </View>
          <View style={styles.procard}>
            <Text style={styles.greycolor1}>Start Time:</Text>
            <Text style={styles.greycolor1}>2022-04-04</Text>
          </View>
          <Text style={styles.greycolor99}>Price Range in USD:</Text>
          <View style={styles.procard1}>
            <Text style={styles.greycolor1}>Min amount : USD 0.46</Text>
            <Text style={styles.greycolor1}>Max amount : USD 0.92</Text>
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.modelbtn}>
            <Text style={styles.greycolor1}>Avail This promotion</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
  },
  container22: {
    flex: 1,
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    backgroundColor: 'white',
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
  procard1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: wp('80%'),
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
  greycolor99: {
    color: '#000',
    fontSize: hp('3'),
    fontWeight: '500',
    marginBottom: hp('2'),
    marginTop: hp('2'),
  },
  greycolor1: {
    color: '#000',
    fontSize: hp('2'),
    fontWeight: '400',
  },
  lineheight: {
    fontSize: hp('2'),
    fontWeight: '400',
    lineHeight: 20,
  },
  modelbtn: {
    borderWidth: 1,
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    alignSelf: 'flex-end',
    marginTop: hp('2'),
  },
});
export default PromotionsCard;
