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
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';

function Topics({store, navigation, route}: any) {
  const {category} = store;
  const {categories} = category;

  const {category_id, chapter_id} = route.params;

  const categoryById = categories.find((cat: any) => cat.id === category_id);
  const chapterById = categoryById?.chapters.find(
    (chap: any) => chap.id === chapter_id,
  );

  navigation.setOptions({title: chapterById.name});

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1}}>
          <View style={{marginVertical: 20, marginLeft: 10}}>
            <Text style={{color: '#fff', textTransform: 'uppercase'}}>
              Topics
            </Text>
          </View>

          <View style={{marginHorizontal: 10}}>
            {!chapterById.topics?.length && (
              <View>
                <Text style={{color: '#fff', fontSize: 14}}>
                  No Topics added
                </Text>
              </View>
            )}

            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={chapterById.topics}
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
                      navigation.push(screens.Videos, {
                        category_id,
                        chapter_id,
                        topic_id: item.id,
                      });
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
                          {item.name}
                        </Text>
                        <Text
                          style={{fontSize: 14, fontWeight: 'normal'}}
                          numberOfLines={1}>
                          {item.description}
                        </Text>
                      </View>

                      <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {item.videos?.length}
                        </Text>
                        <Text style={{fontSize: 14, fontWeight: 'normal'}}>
                          {item.videos?.length > 1 ? 'Videos' : 'Video'}
                        </Text>
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

export default inject('store')(observer(Topics));
