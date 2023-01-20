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
import WishListCards from '../wishlistcards';
function WishList() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.topuptext}>WishList Cards</Text>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.id}
              renderItem={({item}) => <WishListCards item={item} />}
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
    width: '100%', // 80% of width device screen
  },
  topuptext: {
    fontSize: hp('3'),
    color: '#000',
    marginBottom: hp('2'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: hp('2'),
  },
  topuptext1: {
    fontSize: hp('2.5'),
    color: '#8B8B8B',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default WishList;
