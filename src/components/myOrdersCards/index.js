import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
function MyOrderCards({item}) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.orderbgcolor22}>
        <TouchableOpacity>
          <Icon name="delete" style={styles.ordericon} />
        </TouchableOpacity>
        <View style={styles.ordercard}>
          <View style={styles.ordermarginleft}>
            <View style={styles.orderrow}>
              <Text style={styles.ordergreycolor}>Transaction Id:</Text>
              <Text style={styles.ordergreycolor1}>
                63b82f2ecbf37e3a1008368e
              </Text>
            </View>
            <View style={styles.orderrow}>
              <Text style={styles.ordergreycolor}>Amount:</Text>
              <Text style={styles.ordergreycolor1}>1.19 USD</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.details} onPress={toggleModal}>
          <Text style={styles.whitecolorbtn}>Details</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.container22}>
          <Text style={styles.detailsmodal}>Details</Text>
          <View style={styles.procard}>
            <Text style={styles.ordergreycolor}>Order Email:</Text>
            <Text style={styles.ordergreycolor1}>talal@gmail.com</Text>
          </View>
          <View style={styles.procard}>
            <Text style={styles.ordergreycolor}>Paid Coin:</Text>
            <Text style={styles.ordergreycolor1}>TCN</Text>
          </View>
          <View style={styles.procard}>
            <Text style={styles.ordergreycolor}>Products:</Text>
            <Text style={styles.ordergreycolor1}>test 2</Text>
          </View>
          <View style={styles.procard}>
            <Text style={styles.ordergreycolor}>Date:</Text>
            <Text style={styles.ordergreycolor1}>2023-01-06</Text>
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.modelbtn23}>
            <Text style={styles.greycolor1}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('1'),
    paddingVertical: hp('1'),
  },
  container22: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    backgroundColor: 'white',
  },
  orderrow: {
    flexDirection: 'row',
  },
  ordercard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  ordericon: {
    color: '#EC2027',
    alignSelf: 'flex-end',
    marginRight: wp('1'),
    marginTop: hp('1'),
    fontSize: wp('5'),
  },
  orderbgcolor22: {
    backgroundColor: 'white',
    padding: hp('1'),
    elevation: 5,
    borderRadius: 5,
  },
  ordergreycolor: {
    color: '#000',
    fontSize: hp('2.5'),
    fontWeight: '800',
  },
  detailsmodal: {
    color: '#000',
    fontSize: hp('3'),
    fontWeight: '800',
    textAlign: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  ordergreycolor1: {
    color: '#4A524E',
    fontSize: hp('2'),
    fontWeight: '600',
    marginTop: hp('.5'),
    marginLeft: wp('1'),
  },
  ordermarginleft: {
    marginLeft: wp('3'),
  },
  details: {
    backgroundColor: '#EC2027',
    paddingLeft: hp('6'),
    paddingRight: hp('6'),
    paddingTop: hp('1.5'),
    paddingBottom: hp('1.5'),
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: hp('1'),
    marginTop: hp('1'),
  },
  whitecolorbtn: {
    color: 'white',
  },
  modelbtn23: {
    borderWidth: 1,
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    alignSelf: 'flex-end',
    marginTop: hp('3'),
    marginBottom: hp('3'),
    borderRadius: 3,
  },
  procard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1'),
  },
  greycolor1: {
    color: 'black',
  },
});
export default MyOrderCards;
