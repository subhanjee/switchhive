import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import COLORS from '../../config/constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Jazz from '../../assets/images/jazz.png';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const countriesWithFlags = [
  {title: 'Egypt'},
  {title: 'Canada'},
  {title: 'Australia'},
  {title: 'Ireland'},
  {title: 'Brazil'},
  {title: 'England'},
  {title: 'Dubai'},
];
const USD = [{title: 'Usd'}, {title: 'Ustd'}];
function GiftCardsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <View style={styles.textWrapper22}>
          <View style={styles.imgView}>
            {/* <Image source={Jazz} style={styles.sizeImage} /> */}
          </View>
          <Text style={styles.color}>Jazz Pakistan</Text>
          <Text style={styles.color1}>
            Pay on Jazz Pakistan with Crypto. Buy Jazz Pakistan top up with
            Bitcoin, Lightning, Ethereum, Binance Pay, USDT, USDC, Dogecoin,
            Litecoin, Dash. Instant email, delivery. No account required. Start
            living on crypto!
          </Text>
          <Text style={styles.color2}>Select Package</Text>
          <View style={styles.row}>
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

            <SelectDropdown
              data={countriesWithFlags}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText={'0 USD Estimated price'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown4BtnStyle}
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
          </View>
          <Text style={styles.phonetext}>The phone number to refill</Text>
          <TextInput
            style={styles.textInputphone}
            keyboardType="numeric"
            maxLength={10} //setting limit of input
          />
        </View>
        <View style={styles.twobtninrow}>
          <TouchableOpacity style={styles.redbtn}>
            <Text style={styles.whitetext}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whitebtn}>
            <Text>Purchase as gift</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hairline} />
        <Text style={styles.color1}>
          Redeem the Free Fire code online at https://shop.garena.sg/app
        </Text>
        <View style={styles.hairline} />
        <Text style={styles.color1}>Description</Text>
        <Text style={styles.color1}>
          Nufferton was founded in 2016 on one simple idea: to create a
          contemporary version of the nearly forgotten, but amazing pyjamas,
          made for the sheets... and the streets. The loungewear label was
          dreamed up in Stockholm, and perhaps it’s not a coincidence. Swedes
          spend more time at home than anyone in the world.
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: wp('2'),
    paddingRight: wp('2'),
  },
  textWrapper22: {
    // height: hp('90%'), // 70% of height device screen
    width: wp('100%'), // 80% of width device screen
  },
  hairline: {
    backgroundColor: COLORS.BLACK,
    height: 1,
    width: wp('100%'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: hp('3'),
  },
  color1: {
    color: '#6A716E',
    fontSize: hp('2'),
    marginTop: hp('1'),
    marginBottom: hp('1'),
    fontWeight: '400',
  },
  color2: {
    color: COLORS.BLACK,
    fontSize: hp('2'),
    marginTop: hp('2'),
    fontWeight: '400',
  },

  imgView: {
    paddingHorizontal: wp('3'),
    paddingVertical: hp('6'),
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    marginTop: hp('1'),
  },
  sizeImage: {
    width: wp('40%'),
    height: hp('20%'),
  },
  textInput: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('55%'),
    padding: hp('1'),
    borderRadius: 2,
  },
  textInputphone: {
    borderWidth: 1,
    marginTop: hp('1'),
    width: wp('70%'),
    padding: hp('1'),
    borderRadius: 2,
  },
  phonetext: {
    marginTop: hp('2'),
    marginBottom: hp('1'),
  },

  redboxrow: {
    flexDirection: 'row',
    marginTop: hp('1'),
    marginBottom: hp('1'),
  },
  redbox: {
    backgroundColor: '#EA1F2C',
    alignSelf: 'center',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    marginLeft: wp('1'),
    borderRadius: 5,
  },
  twobtninrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  redbtn: {
    backgroundColor: '#EA1F2C',
    paddingLeft: wp('13'),
    paddingRight: wp('13'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 25,
  },
  whitetext: {
    color: COLORS.WHITE,
  },
  whitebtn: {
    paddingLeft: wp('13'),
    paddingRight: wp('13'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 25,
    backgroundColor: '#ECEFED',
  },
  dropdown4BtnStyle: {
    width: wp('40%'),
    height: hp('6'),
    borderRadius: 5,
    marginRight: hp('2'),
    marginTop: hp('1'),
  },
  dropdown4BtnStyle2: {
    width: wp('40%'),
    height: hp('6'),
    borderRadius: 5,
    marginRight: hp('2'),
    marginTop: hp('1'),
    borderWidth: 1,
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default GiftCardsScreen;
