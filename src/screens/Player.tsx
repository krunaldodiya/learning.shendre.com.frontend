import Slider from '@react-native-community/slider';
import {inject, observer} from 'mobx-react';
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';

const Player = ({width, height, store}: any) => {
  const {auth, player} = store;
  const {settings} = auth;

  const {
    currentVideo,
    nextVideo,
    previousVideo,
    progress,
    duration,
    setProgress,
    setDuration,
    isPaused,
    isFinished,
    setIsPaused,
    setIsFinished,
    showOverlay,
    setShowOverlay,
    setVideo,
    isFullScreen,
    setIsFullScreen,
    rate,
    quality,
    setShowModal,
  } = player;

  const playerRef = useRef(null);

  const secondsToHms = d => {
    return moment.utc(d * 1000).format('mm:ss');
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      Orientation.lockToPortrait();
      setIsFullScreen(false);
    } else {
      Orientation.lockToLandscape();
      setIsFullScreen(true);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFullScreen) {
        toggleFullScreen();
        return true;
      } else {
        return false;
      }
    });
  }, [toggleFullScreen, isFullScreen]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setTimeout(() => {
            setShowOverlay(false);
          }, 3000);

          setShowOverlay(true);
        }}
        style={{width, height}}>
        <Video
          ref={playerRef}
          rate={rate}
          source={{
            uri: `${settings?.video_url}/${currentVideo?.url}`,
          }}
          style={{...styles.overlaySet}}
          muted={false}
          controls={false}
          repeat={false}
          paused={isPaused}
          posterResizeMode="cover"
          resizeMode="cover"
          onProgress={data => {
            setProgress(data.currentTime);
          }}
          onLoad={data => {
            setProgress(data.currentTime);
            setDuration(data.duration);
          }}
          onEnd={() => {
            setIsFinished(true);
          }}
        />

        <View style={styles.overlay}>
          {showOverlay && (
            <View style={{...styles.overlaySet, backgroundColor: '#0009'}}>
              <View style={{position: 'absolute', top: 5, right: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="MaterialIcons"
                    name="more-vert"
                    size={26}
                    color="#fff"
                    style={styles.icon}
                    onPress={() => setShowModal(true, true)}
                  />
                </View>
              </View>

              <View
                style={{
                  position: 'absolute',
                  top: height / 2 - 20,
                  left: 0,
                  right: 0,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="AntDesign"
                    name="stepbackward"
                    size={26}
                    color={previousVideo ? '#fff' : '#ccc'}
                    style={styles.icon}
                    onPress={() => setVideo(previousVideo)}
                  />
                  <Icon
                    type="MaterialCommunityIcons"
                    name={isFinished ? 'replay' : isPaused ? 'play' : 'pause'}
                    size={36}
                    color="#fff"
                    style={styles.icon}
                    onPress={() => {
                      if (isFinished) {
                        setVideo(currentVideo);
                      } else {
                        setIsPaused(!isPaused);
                      }
                    }}
                  />
                  <Icon
                    type="AntDesign"
                    name="stepforward"
                    size={26}
                    color={nextVideo ? '#fff' : '#ccc'}
                    style={styles.icon}
                    onPress={() => setVideo(nextVideo)}
                  />
                </View>
              </View>

              <View style={{position: 'absolute', bottom: 0}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: 110,
                      alignItems: 'center',
                      justifyContent: 'center',
                      bottom: 5,
                    }}>
                    <Text style={{color: '#fff'}}>
                      {secondsToHms(progress)} / {secondsToHms(duration)}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: Dimensions.get('window').width - 150,
                    }}>
                    <Slider
                      minimumValue={0}
                      maximumValue={duration}
                      value={progress}
                      minimumTrackTintColor="#fff"
                      maximumTrackTintColor="#bbb"
                      onValueChange={data => {
                        playerRef.current.seek(data);
                      }}
                      thumbTintColor="white"
                    />
                  </View>

                  <View style={{width: 40, alignItems: 'center', bottom: 5}}>
                    <Icon
                      type="MaterialIcons"
                      name={isFullScreen ? 'fullscreen-exit' : 'fullscreen'}
                      size={26}
                      color="#fff"
                      onPress={toggleFullScreen}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});

export default inject('store')(observer(Player));
