import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

function LoginTwo() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <View>
          <Text style={styles.logintext}>Welcome back!</Text>
          <Text style={styles.logintext1}>
            Log in below to access your Switchive Account
          </Text>
          <View>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />
            <Text style={styles.forgettext}>Forget your Password</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logincir}>
          <Text style={styles.blackcolor}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dontview}>
          <Text style={styles.logintext33}>
            No account? You can
            <Text
              style={styles.logintext44}
              onPress={() => navigation.navigate('createAccount')}>
              {' '}
              create one here
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    height: hp('80%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintext: {
    fontSize: 25,
    color: '#222222',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  blackcolor: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  forgettext: {
    margin: 12,
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
    marginTop: -5,
  },
  logintext1: {
    fontSize: 16,
    color: '#8B8B8B',
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
  },
  logintext22: {
    fontSize: 12,
    color: '#343434',
    fontWeight: 'bold',
  },
  logincir: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '50%',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#FBCC0E',
    marginTop: 20,
    marginBottom: 15,
  },

  logintext33: {
    fontSize: 15,
    color: '#222222',
    textAlign: 'center',
  },
  logintext44: {
    fontSize: 15,
    color: '#F6762D',
    textAlign: 'center',
  },
  input: {
    fontSize: 20,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#F0F2F5',
  },
});
export default LoginTwo;
