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
import MyOrderCards from '../myOrdersCards';
function MyOrder() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.id}
              renderItem={({item}) => <MyOrderCards item={item} />}
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
    // height: hp('80%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  wallettext: {
    fontSize: hp('2.5'),
    color: '#000',
    marginBottom: hp('1'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp('2'),
  },
});
export default MyOrder;
