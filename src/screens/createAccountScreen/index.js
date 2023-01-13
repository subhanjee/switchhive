import React from 'react';
import {View, StyleSheet} from 'react-native';
import CreateAccount from '../../components/createAccount';

function LoginScreen() {
  return (
    <View style={styles.container}>
      <CreateAccount />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default LoginScreen;
