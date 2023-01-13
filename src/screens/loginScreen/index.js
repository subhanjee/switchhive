import React from 'react';
import {View, StyleSheet} from 'react-native';
import Login from '../../components/login';

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default LoginScreen;
