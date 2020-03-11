import {inject, observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getMediaFile} from '../libs/media';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import MainHeader from './MainHeader';

const {width} = Dimensions.get('window');

function Categories({store, navigation}: any) {
  const {category, auth} = store;
  const {settings} = auth;
  const {loadCategories, categories} = category;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const columns = categories.length < 6 ? 1 : 2;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <MainHeader navigation={navigation} />

        <View style={{flex: 1, padding: 2}}>
          <FlatList
            key={columns}
            numColumns={columns}
            keyExtractor={(_, index) => index.toString()}
            data={categories}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{backgroundColor: theme.primary, margin: 2}}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.push(screens.Chapters, {category_id: item.id})
                  }>
                  <ImageBackground
                    source={{
                      uri: `${settings.video_url}/${item.image}`,
                    }}
                    imageStyle={{opacity: 0.1}}
                    style={{
                      height: width / columns - 6,
                      width: width / columns - 6,
                      justifyContent: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 22,
                          textAlign: 'center',
                        }}>
                        {item.name}
                      </Text>

                      <Text
                        style={{
                          color: '#ffff00',
                          fontSize: 18,
                          textAlign: 'center',
                          marginTop: 20,
                        }}>
                        {item.chapters?.length}
                        {item.chapters?.length > 1 ? ' Chapters' : ' Chapter'}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default inject('store')(observer(Categories));
