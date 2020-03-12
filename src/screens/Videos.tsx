import {inject, observer} from 'mobx-react';
import React, {useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Orientation from 'react-native-orientation-locker';
import {theme} from '../libs/theme';
import Player from './Player';

function Videos({store, navigation, route}: any) {
  const {category, auth} = store;
  const {settings} = auth;
  const {categories} = category;

  const {category_id, chapter_id, topic_id} = route.params;

  const categoryById = categories.find((cat: any) => cat.id === category_id);
  const chapterById = categoryById?.chapters.find(
    (chap: any) => chap.id === chapter_id,
  );
  const topicById = chapterById?.topics.find((top: any) => top.id === topic_id);

  navigation.setOptions({title: topicById.name});

  const [currentVideo, setCurrentVideo] = useState(topicById.videos[0]);
  const [fullScreen, setFullScreen] = useState(false);
  const [hiddenStatusBar, setHiddenStatusBar] = useState(true);

  const toggleFullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };

  const onBackPress = () => {
    Orientation.lockToPortrait();
    setHiddenStatusBar(false);
  };

  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  return (
    <>
      <StatusBar
        hidden={hiddenStatusBar}
        barStyle="light-content"
        backgroundColor={theme.primary}
      />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1}}>
          {topicById.videos?.length && (
            <Player
              settings={settings}
              current_video={currentVideo}
              fullScreen={fullScreen}
              toggleFullScreen={toggleFullScreen}
            />
          )}

          <View style={{backgroundColor: 'white'}}>
            {!topicById.videos?.length && (
              <View>
                <Text style={{color: '#fff', fontSize: 14}}>
                  No Videos added
                </Text>
              </View>
            )}

            {!fullScreen && (
              <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={topicById.videos}
                style={{margin: 10}}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#fff',
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 5,
                      }}
                      activeOpacity={0.7}
                      onPress={() => {
                        setCurrentVideo(item);
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{
                              uri: `${settings.video_url}/${item.thumbnail}`,
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 40,
                              backgroundColor: theme.primary,
                            }}
                          />
                        </View>
                        <View style={{flex: 1, marginHorizontal: 10}}>
                          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                            {item.title}
                          </Text>
                          <Text
                            style={{fontSize: 14, fontWeight: 'normal'}}
                            numberOfLines={1}>
                            {item.description}
                          </Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                          <Icon
                            type="MaterialIcons"
                            name={
                              item.id === currentVideo.id
                                ? 'pause-circle-filled'
                                : 'play-circle-filled'
                            }
                            size={40}
                            color={
                              item.id === currentVideo.id ? 'green' : 'gray'
                            }
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default inject('store')(observer(Videos));
