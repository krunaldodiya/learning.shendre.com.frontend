import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import AppStore from '../mst/store/appStore';
import Categories from './Categories';
import Chapters from './Chapters';
import DrawerMenu from './DrawerMenu';

function DrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName={screens.Categories}
      drawerContent={({navigation}: any) => (
        <DrawerMenu navigation={navigation} />
      )}>
      <Drawer.Screen name={screens.Categories} component={Categories} />
    </Drawer.Navigator>
  );
}

function Home(props: any) {
  const {auth} = AppStore;
  const {authUser, getAuthUser} = auth;

  props.navigation.setOptions({title: authUser?.name});

  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{header: () => null}}
      />

      <Stack.Screen
        name={screens.Chapters}
        component={Chapters}
        options={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.primary,
            elevation: 0,
          },
          headerTitleStyle: {
            color: '#fff',
            textTransform: 'uppercase',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Home;
