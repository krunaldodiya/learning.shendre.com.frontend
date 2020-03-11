import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {BackHandler, SafeAreaView, StatusBar} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {theme} from '../libs/theme';
import Player from './Player';

const FullScreenPlayer = ({store, route}: any) => {
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
        <Player
          settings={settings}
          current_video={current_video}
          onFullScreen={() => null}
        />
      </SafeAreaView>
    </>
  );
};

export default inject('store')(observer(FullScreenPlayer));
