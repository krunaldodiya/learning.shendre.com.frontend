import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

function Avatar(props: any) {
  const {size, source, onUploadSuccess, onUploadFail, token, uploadUrl} = props;

  const uploadAvatar = async () => {
    const file: any = await ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
    });

    const downloadTask = RNFetchBlob.fetch(
      'POST',
      uploadUrl,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'avatar',
          filename: file.path.split('/').pop(),
          type: file.mime,
          data: RNFetchBlob.wrap(file.path.replace('file://', '')),
        },
      ],
    );

    downloadTask
      .then(response => onUploadSuccess(response))
      .catch(error => onUploadFail(error));
  };

  return (
    <TouchableOpacity
      onPress={uploadAvatar}
      style={{
        width: size + 2,
        height: size + 2,
        borderRadius: size,
        backgroundColor: '#bbb',
        padding: 1,
      }}>
      <Image
        source={{uri: source}}
        width={size}
        height={size}
        resizeMode="cover"
        style={{
          borderRadius: size,
          width: size,
          height: size,
        }}
      />
    </TouchableOpacity>
  );
}

export default Avatar;
