import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
function Setting() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.Settingtext}>Avatar</Text>
          <View style={styles.btntworow}>
            <TouchableOpacity style={styles.btnimagepick}>
              <Text style={styles.picktext}>Image Pick</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnimagepick}>
              <Text style={styles.picktext}>Image Pick</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnimagepick1}>
            <Text style={styles.picktext}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('2'),
  },
  textWrapper22: {
    width: '100%', // 80% of width device screen
  },
  Settingtext: {
    fontSize: hp('3'),
    color: '#000',
    marginTop: hp('1'),
    marginBottom: hp('1'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  btnimagepick: {
    backgroundColor: '#EA1F2C',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 5,
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  btnimagepick1: {
    backgroundColor: '#EA1F2C',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 5,
    marginTop: hp('2'),
    marginBottom: hp('2'),
    alignSelf: 'center',
  },
  btntworow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picktext: {
    color: 'white',
  },
});
export default Setting;
