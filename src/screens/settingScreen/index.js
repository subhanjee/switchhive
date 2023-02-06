import React, {useState} from 'react';
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
  PermissionsAndroid,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
function Setting() {
  const navigation = useNavigation();
  const [imageLoading, setImageLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const pickImage = async () => {
    const result = await launchImageLibrary({
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    });

    if (!result.cancelled) {
      setAvatar(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pickImage();
      } else {
        setHasCameraPermission(false);
        console.log('first');
      }
    } catch (err) {
      console.error(err);
    }
  };
  // const handleImageChange = async image => {
  //   setImageLoading(true);
  //   const avatarDocument = firebase.storage().ref(`images/${user.name}`);
  //   const response = await fetch(image.uri);
  //   const blob = await response.blob();
  //   const uploadTask = avatarDocument.put(blob);

  //   uploadTask
  //     .then(() => {
  //       avatarDocument
  //         .getDownloadURL()
  //         .then(Url => {
  //           setUrl(Url);
  //         })
  //         .catch(error => {
  //           console.log(error.message, 'error getting the avatar url');
  //         });
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     })
  //     .finally(() => {
  //       setImageLoading(false);
  //     });

  //   uploadTask.on('state_changed', snapshot => {
  //     const percent = Math.round(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
  //     );
  //   });
  // };
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper22}>
        <View>
          <Text style={styles.Settingtext}>Avatar</Text>
          {/* <View style={styles.btntworow}> */}

          <TouchableOpacity
            style={styles.btnimagepick}
            onPress={requestCameraPermission}>
            <Text style={styles.picktext}>Image Pick</Text>
          </TouchableOpacity>
          {/* </View> */}
          {imageLoading && <Text>Loading...</Text>}
          <TouchableOpacity style={styles.btnimagepick1}>
            <Text style={styles.picktext}>Change Password</Text>
          </TouchableOpacity>
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
    width: '100%', // 80% of width device screen
  },
  Settingtext: {
    fontSize: hp('3'),
    color: '#000',
    marginTop: hp('1'),
    marginBottom: hp('1'),
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
  btnimagepick: {
    backgroundColor: '#EA1F2C',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 5,
    marginTop: hp('2'),
    marginBottom: hp('2'),
  },
  btnimagepick1: {
    backgroundColor: '#EA1F2C',
    paddingLeft: wp('5'),
    paddingRight: wp('5'),
    paddingTop: hp('2'),
    paddingBottom: hp('2'),
    borderRadius: 5,
    marginTop: hp('2'),
    marginBottom: hp('2'),
    alignSelf: 'center',
  },
  btntworow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picktext: {
    color: 'white',
  },
});
export default Setting;
