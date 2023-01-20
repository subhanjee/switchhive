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
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../config/constant';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Profile from '../../assets/images/person-profile-image-icon.webp';

const countriesWithFlags = [{title: 'EUR'}, {title: 'USD'}, {title: 'GBP'}];
function ProfileScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}>
        <LinearGradient
          colors={['rgba(236, 32, 39, 1)', 'rgba(33, 65, 146, 1)']}
          style={styles.linearGradient}>
          <View style={styles.textWrapper22}>
            <View>
              <SelectDropdown
                data={countriesWithFlags}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                defaultButtonText={'USD'}
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
              <Text style={styles.greycolor2}>Choose Currency</Text>
            </View>
            <View>
              <Image source={Profile} style={styles.profileimg} />
            </View>
            <View style={styles.rowtext}>
              <Text style={styles.name}>Name:</Text>
              <Text style={styles.greycolor}>Talal Numan</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Email:</Text>
              <Text style={styles.greycolor}>talal@gmail.com</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Account Balance:</Text>
              <Text style={styles.greycolor}>5.33 USD</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Loyalty Points:</Text>
              <Text style={styles.greycolor}>0.50 SHP</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Referral Points:</Text>
              <Text style={styles.greycolor}>0 SHP</Text>
            </View>
            <View style={styles.hairline1} />
            <View style={styles.rowtext}>
              <Text style={styles.name}>Total SHP:</Text>
              <Text style={styles.greycolor}>0.50 SHP</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.redbtncopy}>
                <Text style={styles.colorwhite}>Redeem SHP</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.name1}>Referral Code:</Text>
            <Text style={styles.greycolor1}>
              https://switchive.vercel.app /signup/63b7f9221562170d98533ba6
            </Text>
            <View>
              <TouchableOpacity style={styles.redbtncopy}>
                <Text style={styles.colorwhite}>Copy Referral Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: wp('2'),
    paddingRight: wp('2'),
  },
  hairline1: {
    backgroundColor: '#B8B5B5',
    height: 1,
    width: wp('96%'),
    marginTop: hp('1'),
  },
  profileimg: {
    height: 120,
    width: 120,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  textWrapper22: {
    // height: hp('70%'), // 70% of height device screen
    width: '100%', // 80% of width device screen
  },
  rowtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: hp('3'),
    color: 'white',
    marginTop: hp('2'),
  },
  name1: {
    fontSize: hp('3'),
    color: 'white',
    marginTop: hp('2'),
    textAlign: 'center',
  },
  greycolor: {
    color: '#B8B5B5',
    fontSize: hp('2'),
    fontWeight: '500',
    marginTop: hp('3'),
  },
  greycolor1: {
    color: '#B8B5B5',
    fontSize: hp('2'),
    fontWeight: '500',
    marginTop: hp('3'),
    textAlign: 'center',
  },
  greycolor2: {
    color: '#B8B5B5',
    fontSize: hp('2'),
    fontWeight: '500',
    marginTop: hp('3'),
    textAlign: 'right',
  },
  centerview: {
    alignSelf: 'center',
  },
  redbtncopy: {
    backgroundColor: '#EC2027',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: wp('2'),
    paddingBottom: wp('2'),
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: hp('4'),
    marginBottom: hp('2'),
  },
  colorwhite: {
    color: COLORS.WHITE,
  },
  dropdown4BtnStyle44: {
    width: wp('30%'),
    height: hp('6'),
    borderRadius: 5,
    marginRight: hp('2'),
    marginTop: hp('2'),
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
  },
  dropdown4BtnTxtStyle: {color: 'white', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
});
export default ProfileScreen;
