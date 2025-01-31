import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {inject, observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';
import Categories from './Categories';
import Chapters from './Chapters';
import DrawerMenu from './DrawerMenu';
import EditProfile from './EditProfile';
import Topics from './Topics';
import Videos from './Videos';

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

function Home({store, navigation}: any) {
  const {auth} = store;
  const {authUser, getAuthUser} = auth;

  navigation.setOptions({title: authUser.institute.name});

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

      <Stack.Screen
        name={screens.Topics}
        component={Topics}
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

      <Stack.Screen
        name={screens.EditProfile}
        component={EditProfile}
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
          title: 'Update Profile',
        }}
      />
    </Stack.Navigator>
  );
}

export default inject('store')(observer(Home));
