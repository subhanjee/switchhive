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
import MyRerralsCards from '../myReferralsCards';
function MyReferrals() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.id}
              renderItem={({item}) => <MyRerralsCards item={item} />}
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
  dropdown4BtnStyle44: {
    width: wp('30%'),
    height: hp('6'),
    borderRadius: 5,
    marginLeft: hp('1'),
    marginTop: hp('2'),
    backgroundColor: 'red',
    alignSelf: 'flex-end',
  },
  dropdown4BtnTxtStyle: {color: 'white', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default MyReferrals;
