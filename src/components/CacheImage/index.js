import FastImage from 'react-native-fast-image';
import {Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
const CacheImage = ({imageUrl, width = 100, height = 100}) => (
  <Image
    style={{
      width: width,
      height: height,
      resizeMode: 'contain',
    }}
    source={{
      uri: imageUrl,
    }}
  />
);

export default CacheImage;
