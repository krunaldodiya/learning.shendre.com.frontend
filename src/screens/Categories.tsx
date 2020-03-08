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
import {useDispatch, useSelector} from 'react-redux';
import {getMediaFile} from '../libs/media';
import {theme} from '../libs/theme';
import {loadCategories} from '../store/actions/load_categories';
import MainHeader from './MainHeader';

const {width} = Dimensions.get('window');

function Categories(props: any) {
  const categoriesState = useSelector((state: any) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const categories = Object.keys(categoriesState.data).map(
    id => categoriesState.data[id],
  );

  const columns = categories.length === 1 ? 1 : 2;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <MainHeader {...props} />

        <View style={{flex: 1, padding: 5}}>
          <FlatList
            key={columns}
            numColumns={columns}
            keyExtractor={(_, index) => index.toString()}
            data={categories}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{backgroundColor: theme.primary}}
                  activeOpacity={0.7}
                  onPress={() =>
                    props.navigation.push('Chapters', {category_id: item.id})
                  }>
                  <ImageBackground
                    source={{uri: getMediaFile('category', item.image)}}
                    imageStyle={{opacity: 0.1}}
                    style={{height: width / columns, justifyContent: 'center'}}>
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
                        {item.chapters.length}
                        {item.chapters.length > 1 ? ' Chapters' : ' Chapter'}
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

export default Categories;
