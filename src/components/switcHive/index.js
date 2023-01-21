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
import data from '../../helper/data.json';
import SwitchiveCard from '../switchiveCards';
function Switchive() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>SwitcHiveCard</Text>
          <Text style={styles.topuptext1}>
            Purchase the Switchive gift card for instant checkout while
            shopping, balance top up or gift your loved ones to shop for their
            desired products on the switchive website.
          </Text>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.name}
              renderItem={({item}) => <SwitchiveCard item={item} />}
            />
          </SafeAreaView>
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
    height: hp('80%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginBottom: hp('3'),
    color: 'black',
    fontWeight: '500',
    marginBottom: hp('2'),
    textAlign: 'center',
  },
  topuptext1: {
    fontSize: hp('2.3'),
    marginBottom: hp('3'),
    fontWeight: '500',
    marginBottom: hp('2'),
    textAlign: 'center',
    paddingHorizontal: wp('4'),
  },
});
export default Switchive;
