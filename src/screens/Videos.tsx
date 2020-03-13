import {inject, observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {theme} from '../libs/theme';
import Player from './Player';
import PlayerModal from './PlayerModal';

const {width} = Dimensions.get('window');

function Videos({store, navigation, route}: any) {
  const {category, auth, player} = store;
  const {settings} = auth;
  const {categories} = category;
  const {setVideos, setVideo, currentVideo, isFullScreen, videoList} = player;

  const {category_id, chapter_id, topic_id} = route.params;
  const categoryById = categories.find((cat: any) => cat.id === category_id);
  const chapterById = categoryById?.chapters.find(
    (chap: any) => chap.id === chapter_id,
  );

  const topicById = chapterById?.topics.find((top: any) => top.id === topic_id);
  navigation.setOptions({title: topicById.name});

  useEffect(() => {
    setVideos(topicById?.videos);
    setVideo(topicById?.videos[0]);
  }, []);

  return (
    <>
      <StatusBar
        hidden={isFullScreen}
        barStyle="light-content"
        backgroundColor={theme.primary}
      />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1}}>
          {topicById.videos?.length && (
            <>
              <Player
                width={isFullScreen ? '100%' : width}
                height={isFullScreen ? width : (width * 9) / 16}
              />

              <PlayerModal
                qualities={[480, 720]}
                speeds={[0.25, 0.5, 1.0, 1.5, 2.0]}
              />
            </>
          )}

          <View style={{backgroundColor: 'transparent'}}>
            {!topicById.videos?.length && (
              <View>
                <Text style={{color: '#fff', fontSize: 14}}>
                  No Videos added
                </Text>
              </View>
            )}

            {!isFullScreen && (
              <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={videoList}
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
                      onPress={() => setVideo(item)}>
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
