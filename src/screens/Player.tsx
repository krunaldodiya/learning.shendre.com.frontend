import Slider from '@react-native-community/slider';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Video from 'react-native-video';

const {width} = Dimensions.get('window');

const Player = ({
  settings,
  current_video,
  next_video,
  previous_video,
  fullScreen,
  toggleFullScreen,
}: any) => {
  const [progress, setProgress] = useState();
  const [duration, setDuration] = useState(1);
  const [paused, setPaused] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const playerRef = useRef();

  const secondsToHms = d => {
    return moment.utc(d * 1000).format('mm:ss');
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setTimeout(() => {
            setOverlay(false);
          }, 3000);

          setOverlay(true);
        }}
        style={[fullScreen ? styles.fullscreenVideo : styles.video]}>
        <Video
          ref={playerRef}
          source={{
            uri: `${settings.video_url}/${current_video.url}`,
          }}
          style={{...StyleSheet.absoluteFill}}
          muted={false}
          controls={false}
          paused={paused}
          posterResizeMode="cover"
          resizeMode="cover"
          repeat={false}
          onProgress={data => setProgress(data.currentTime)}
          onLoad={data => setDuration(data.duration)}
        />

        <View style={styles.overlay}>
          {overlay && (
            <View style={{...styles.overlaySet, backgroundColor: '#0006'}}>
              <Icon
                type="AntDesign"
                name="stepbackward"
                size={26}
                color="#fff"
                style={styles.icon}
                onPress={() => null}
              />
              <Icon
                type="MaterialCommunityIcons"
                name={paused ? 'play' : 'pause'}
                size={36}
                color="#fff"
                style={styles.icon}
                onPress={() => setPaused(!paused)}
              />
              <Icon
                type="AntDesign"
                name="stepforward"
                size={26}
                color="#fff"
                style={styles.icon}
                onPress={() => null}
              />

              <View style={styles.sliderCont}>
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
                      onValueChange={data => playerRef.current.seek(data)}
                      thumbTintColor="white" // now the slider and the time will work
                    />
                  </View>

                  <View style={{width: 40, alignItems: 'center', bottom: 5}}>
                    <Icon
                      type="MaterialIcons"
                      name={fullScreen ? 'fullscreen-exit' : 'fullscreen'}
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
  sliderCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  video: {width, height: (width * 9) / 16, backgroundColor: 'black'},
  fullscreenVideo: {
    backgroundColor: 'black',
    elevation: 1,
  },
});

export default Player;
