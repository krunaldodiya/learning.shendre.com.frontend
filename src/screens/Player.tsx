import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Video from 'react-native-video';

const Player = ({settings, current_video, onFullScreen}: any) => {
  return (
    <View style={{flex: 1}}>
      <Video
        source={{
          uri: `${settings.video_url}/${current_video.url}`,
        }}
        style={styles.video}
        muted={false}
        controls={false}
        paused={false}
        posterResizeMode="cover"
        resizeMode="cover"
        repeat
      />

      <Icon
        name="fullscreen"
        size={26}
        color="#fff"
        onPress={onFullScreen}
        style={{
          position: 'absolute',
          right: 10,
          bottom: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

export default Player;
