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

import PromotionsCard from '../promotionsCards';
function Promotions() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>Promotions</Text>
          <Text style={styles.topuptext1}>
            Don’t miss out on exclusive operator discounts, promotions and
            special offers.
          </Text>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.name}
              renderItem={({item}) => <PromotionsCard item={item} />}
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
    height: hp('70%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginBottom: 10,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  topuptext1: {
    fontSize: hp('2'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default Promotions;
