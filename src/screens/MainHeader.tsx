import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {screens} from '../libs/screens';
import {theme} from '../libs/theme';

function MainHeader(props: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.primary,
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <Icon
          type="MaterialCommunity"
          name="menu"
          color="#fff"
          size={22}
          onPress={() => props.navigation.openDrawer()}
        />
      </View>

      <View>
        <Text style={{color: '#fff', fontSize: 18, textTransform: 'uppercase'}}>
          Home
        </Text>
      </View>

      <View>
        <Icon
          type="MaterialCommunity"
          name="person"
          color="#fff"
          size={22}
          onPress={() => props.navigation.push(screens.EditProfile)}
        />
      </View>
    </View>
  );
}

export default MainHeader;
