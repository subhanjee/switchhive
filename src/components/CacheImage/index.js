import FastImage from 'react-native-fast-image';

const CacheImage = ({imageUrl, width = 100, height = 100}) => (
  <FastImage
    style={{width: width, height: height}}
    source={{
      uri: imageUrl,
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

export default CacheImage;
