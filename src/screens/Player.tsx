import React, {useEffect, useState} from 'react';
import {BackHandler, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import {theme} from '../libs/theme';

const Player = ({video, navigation}: any) => {
  const [hiddenStatusBar, setHiddenStatusBar] = useState(true);

  useEffect(() => {
    Orientation.lockToLandscape();
    return onBackPress;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
  }, []);

  const onBackPress = () => {
    Orientation.lockToPortrait();
    setHiddenStatusBar(false);
  };

  return (
    <>
      <StatusBar hidden={hiddenStatusBar} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <Video
          source={{
            uri:
              'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={styles.video}
          muted={false}
          controls={true}
          paused={false}
          posterResizeMode="contain"
          resizeMode="contain"
          repeat
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

export default Player;
