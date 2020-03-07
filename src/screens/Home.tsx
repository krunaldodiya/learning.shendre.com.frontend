import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {screens} from '../libs/screens';
import {loadCategories} from '../store/actions/load_categories';

function Home(props: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity
            onPress={() => props.navigation.push(screens.EditProfile)}>
            <Text>edit profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;
