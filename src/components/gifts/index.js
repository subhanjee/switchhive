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
import GiftsCard from '../giftsCards';
function Gifts() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>GiftCards</Text>
          <Text style={styles.topuptext1}>
            Ready to use online or in-store. Buy Gift Cards with Bitcoin, Ether,
            Tether, and more.
          </Text>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.name}
              renderItem={({item}) => <GiftsCard item={item} />}
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
    fontSize: hp('3'),
    color: '#000',
    marginTop: hp('1'),
    marginBottom: hp('1'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  topuptext1: {
    fontSize: hp('2.5'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default Gifts;
