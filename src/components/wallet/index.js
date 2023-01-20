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
import WalletCards from '../walletCards';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const countriesWithFlags = [
  {title: '1 Week'},
  {title: ' Month'},
  {title: 'Off'},
];
function Wallet() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.wallettext}>
            Items will automatically be deleted in
          </Text>
          <View>
            <SelectDropdown
              data={countriesWithFlags}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={'1 Week'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown4BtnStyle44}
              buttonTextStyle={styles.dropdown4BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'white'}
                    size={10}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown4DropdownStyle}
              rowStyle={styles.dropdown4RowStyle}
              rowTextStyle={styles.dropdown4RowTxtStyle}
            />
          </View>
          <SafeAreaView>
            <FlatList
              data={data}
              keyExtractor={data => data.id}
              renderItem={({item}) => <WalletCards item={item} />}
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
export default Wallet;
