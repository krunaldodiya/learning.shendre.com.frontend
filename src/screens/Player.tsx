import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {BackHandler, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import {theme} from '../libs/theme';

const Player = ({store, navigation, route}: any) => {
  const {auth} = store;
  const {settings} = auth;

  const {current_video} = route.params;

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
            uri: `${settings.video_url}/${current_video.url}`,
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

export default inject('store')(observer(Player));
