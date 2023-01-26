import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import COLOR from '../../config/constant';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setLoginState, setUser} from '../../redux/user';
import {auth} from '../../api';
import {setUser, setLoginState} from '../../redux/user';

function LoginTwo() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const storeUser = async value => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value.user));
      await AsyncStorage.setItem('token_access', value?.tokens?.access?.token);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setUser(value.user);
      setLoginState(true);
    } catch (error) {
      console.log(error);
    }
  };
  // const [messageApi, contextHolder] = message.useMessage();
  const setLoadingFalse = () => {
    setLoading(false);
  };
  const onFinish = values => {
    setLoading(true);
    auth('login', {
      method: 'post',
      data: {email: email, password: password},
    })
      .then(res => {
        console.log('text');
        if (res.data.user.role === 'blogWriter') {
          console.log("You can't access this with Writer Account");
        } else {
          storeUser(res.data);
          // localStorage.setItem(
          //   'token-access',
          //   res?.data?.tokens?.access?.token,
          // );
          // localStorage.setItem("user", JSON.stringify(res?.data?.user));
          // localStorage.setItem("email", res?.data?.user?.email);
          // dispatch(setLoginState(true));
          // dispatch(setUser(res.data.user));
          setLoadingFalse();
          navigation.navigate('App');
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoadingFalse();
        setEmail('');
        setPassword('');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <View>
          <Text style={styles.logintext}>Welcome back!</Text>
          <Text style={styles.logintext1}>
            Log in below to access your Switchive Account
          </Text>
          <View>
            <TextInput
              onChangeText={e => setEmail(e)}
              style={styles.input}
              placeholder="Email"
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              onChangeText={e => setPassword(e)}
              value={password}
            />
            <Text style={styles.forgettext}>Forget your Password</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logincir} onPress={onFinish}>
          <Text style={styles.blackcolor}>Login</Text>
        </TouchableOpacity>
        <View style={styles.dontview}>
          <Text style={styles.logintext33}>
            No account? You can
            <Text style={styles.logintext44}> create one here</Text>
          </Text>
        </View>
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
    color: COLOR.BLACK,
    fontWeight: '700',
  },
  blackcolor: {
    fontSize: hp('2.5'),
    color: COLOR.BLACK,
    textAlign: 'center',
    fontWeight: '600',
  },
  forgettext: {
    fontSize: hp('2.3'),
    color: COLOR.BLACK,
    textAlign: 'right',
    fontWeight: '600',
    marginTop: hp('.5'),
  },
  logintext1: {
    fontSize: hp('3'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
  logincir: {
    borderRadius: 50,
    backgroundColor: '#FBCC0E',
    paddingLeft: wp('15'),
    paddingRight: wp('15'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    marginTop: hp('4'),
    marginBottom: hp('2'),
  },
  logintext33: {
    fontSize: hp('2'),
    color: '#222222',
    textAlign: 'center',
    fontWeight: '500',
  },
  logintext44: {
    fontSize: hp('2'),
    color: '#F6762D',
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    fontSize: hp('3'),
    backgroundColor: '#F0F2F5',
    marginTop: hp('2'),
  },
});
export default LoginTwo;
