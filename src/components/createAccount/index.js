import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import COLOR from '../../config/constant';

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <View>
          <Text style={styles.logintext}>Create a Switchive account</Text>
          <Text style={styles.logintext1}>
            Get rewards on every purchase and much more!
          </Text>
          <View>
            <TextInput style={styles.createinput} placeholder="Name" />
            <TextInput style={styles.createinput} placeholder="Email" />
            <TextInput
              style={styles.createinput}
              placeholder="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />
            <TextInput style={styles.createinput} placeholder="Referral Code" />
          </View>
        </View>
        <TouchableOpacity
          style={styles.createbtn}
          onPress={() => navigation.navigate('main')}>
          <Text style={styles.whitecolor}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapper: {
    height: hp('90%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintext: {
    fontSize: hp('4'),
    color: '#222222',
    marginBottom: hp('2'),
    textAlign: 'center',
    fontWeight: '700',
  },
  whitecolor: {
    fontSize: hp('2.5'),
    color: COLOR.WHITE,
    textAlign: 'center',
    fontWeight: '800',
  },
  logintext1: {
    fontSize: 16,
    color: '#8B8B8B',
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
  },
  createbtn: {
    borderRadius: 50,
    backgroundColor: '#EC2027',
    paddingLeft: wp('15'),
    paddingRight: wp('15'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    marginTop: hp('4'),
    marginBottom: hp('2'),
  },
  createinput: {
    fontSize: hp('3'),
    backgroundColor: '#F0F2F5',
    marginTop: hp('2'),
  },
});
export default CreateAccount;
