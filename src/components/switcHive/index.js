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
import data from '../../helper/data.json';
import SwitchiveCard from '../switchiveCards';
function Switchive() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>SwitchiveCard</Text>
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
  },

  textWrapper22: {
    height: hp('80%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  topuptext: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
    color: 'black',
    fontWeight: '500',
    marginLeft: 5,
  },
  topuptext1: {
    fontSize: 15,
    color: '#8B8B8B',
    fontWeight: '500',
    marginLeft: 5,
  },
});
export default Switchive;
