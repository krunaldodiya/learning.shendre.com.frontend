import {inject, observer} from 'mobx-react';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';

function Videos({store, navigation, route}: any) {
  const {category} = store;
  const {categories} = category;

  const {category_id, chapter_id, topic_id} = route.params;

  const categoryById = categories.find((cat: any) => cat.id === category_id);
  const chapterById = categoryById?.chapters.find(
    (chap: any) => chap.id === chapter_id,
  );
  const topicById = chapterById?.topics.find((top: any) => top.id === topic_id);

  navigation.setOptions({title: topicById.name});

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1}}>
          <View style={{marginVertical: 20, marginLeft: 10}}>
            <Text style={{color: '#fff', textTransform: 'uppercase'}}>
              Videos
            </Text>
          </View>

          <View style={{marginHorizontal: 10}}>
            {!topicById.videos?.length && (
              <View>
                <Text style={{color: '#fff', fontSize: 14}}>
                  No Videos added
                </Text>
              </View>
            )}

            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={topicById.videos}
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
                      navigation.push(screens.Player, {video: item});
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
                            uri: `https://api.shendre.com/${item.image}`,
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
                          name="play-circle-filled"
                          size={40}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default inject('store')(observer(Videos));
