import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {theme} from '../libs/theme';
import {loadCategories} from '../store/actions/load_categories';

function Categories(props: any) {
  const categoriesState = useSelector((state: any) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const MainHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.primary,
          padding: 15,
          alignItems: 'center',
        }}>
        <View style={{}}>
          <Icon
            type="SimpleLineIcons"
            name="menu"
            color="#fff"
            size={18}
            style={{marginRight: 10}}
            onPress={() => props.navigation.openDrawer()}
          />
        </View>

        <View style={{}}>
          <Text
            style={{color: '#fff', fontSize: 18, textTransform: 'uppercase'}}>
            Home
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1}}>
        <MainHeader />

        <View style={{flex: 1, padding: 10}}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={Object.keys(categoriesState.data).map(
              id => categoriesState.data[id],
            )}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => props.navigation.push('Chapters')}>
                  <View>
                    <Text>{item.name}</Text>
                  </View>
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
