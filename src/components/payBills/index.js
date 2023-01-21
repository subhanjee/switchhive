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
  FlatList,
  TextInput,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const USD = [{title: 'Usd'}, {title: 'Ustd'}];
function PayBills() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <Text style={styles.bills}>Pay Utilities</Text>
        <Text style={styles.bills1}>
          Pay Utilities Bills with Bitcoin, Ether, Tether, and more.
        </Text>
        <SelectDropdown
          data={USD}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={'Usd'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={styles.dropdown4BtnStyle2}
          buttonTextStyle={styles.dropdown4BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={10}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown4DropdownStyle}
          rowStyle={styles.dropdown4RowStyle}
          rowTextStyle={styles.dropdown4RowTxtStyle}
        />
        <View style={styles.inrowinput}>
          <Text>Account Number</Text>
          <TextInput
            style={styles.inputstyle}
            keyboardType="text"
            placeholder="input"
          />
          <Text>Amounts</Text>
          <TextInput
            style={styles.inputstyle}
            keyboardType="text"
            placeholder="input"
          />
        </View>
        <TouchableOpacity style={styles.submitbtn}>
          <Text style={styles.color}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4'),
  },
  textWrapper22: {
    height: hp('70%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  bills: {
    fontSize: hp('4'),
    color: 'black',
    textAlign: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  bills1: {
    fontSize: hp('2'),
    textAlign: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  dropdown4BtnStyle2: {
    width: '100%',
    height: hp('6'),
    borderRadius: 5,
    marginTop: hp('1'),
    marginBottom: hp('4'),
    borderWidth: 1,
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
  inputstyle: {
    padding: hp('2'),
    borderWidth: 1,
    marginTop: hp('5'),
    marginBottom: hp('2'),
    borderRadius: 5,
  },
  submitbtn: {
    backgroundColor: '#EA1F2C',
    alignSelf: 'flex-end',
    paddingRight: wp('6'),
    paddingLeft: wp('6'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 5,
  },
  color: {
    color: 'white',
  },
});
export default PayBills;
