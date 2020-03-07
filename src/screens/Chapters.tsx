import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {theme} from '../libs/theme';
import {useSelector} from 'react-redux';

function Chapters(props: any) {
  const {category_id} = props.route.params;

  const categoriesState = useSelector((state: any) => state.categories);
  const chaptersState = useSelector((state: any) => state.chapters);

  const category = categoriesState.data[category_id];
  props.navigation.setOptions({title: category.name});

  const chapters = category.chapters.map(
    (chapter_id: any) => chaptersState.data[chapter_id],
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1}}>
          <View style={{backgroundColor: '#fff'}}>
            <View
              style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#000'}}>Subscription</Text>
              <Text style={{color: '#000'}}>Active</Text>
            </View>

            <View
              style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#000'}}>Expiry Date</Text>
              <Text style={{color: '#000'}}>10/08/2020</Text>
            </View>
          </View>

          <View style={{marginVertical: 20, marginLeft: 10}}>
            <Text style={{color: '#fff', textTransform: 'uppercase'}}>
              Chapters
            </Text>
          </View>

          <View style={{marginHorizontal: 10}}>
            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={chapters}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      borderRadius: 5,
                    }}
                    activeOpacity={0.7}
                    onPress={() => props.navigation.push('Chapters')}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 10,
                        }}>
                        <Image
                          source={{uri: theme.image}}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            backgroundColor: theme.primary,
                          }}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {item.name}
                        </Text>
                        <Text style={{fontSize: 14, fontWeight: 'normal'}}>
                          {item.description}
                        </Text>
                      </View>

                      <View style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {item.topics.length}
                        </Text>
                        <Text style={{fontSize: 14, fontWeight: 'normal'}}>
                          {item.topics.length > 1 ? 'Topics' : 'Topic'}
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

export default Chapters;
