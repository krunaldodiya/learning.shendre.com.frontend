import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '../components/Avatar';
import {theme} from '../libs/theme';
import {apiUrl} from '../libs/vars';
import {updateProfile} from '../store/actions/auth';
import {SET_USER, UPDATE_PROFILE_SUCCESS} from '../store/constants/auth';

function EditProfile(props: any) {
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);

  const onUploadSuccess = async (response: any) => {
    const {filename} = response.json();

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: {
        user: {...authState.user, avatar: filename},
      },
    });
  };

  const onUploadFail = async (error: any) => {
    console.log(error);
  };

  const processEditProfile = async () => {
    dispatch(updateProfile(authState.user, props.navigation));
  };

  const setUser = async (user: any) => {
    dispatch({type: SET_USER, payload: {user}});
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always">
          <View style={{flex: 1, paddingHorizontal: 50}}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: 20,
                marginBottom: 30,
              }}>
              <Avatar
                source={authState.user.avatar}
                size={120}
                onUploadSuccess={onUploadSuccess}
                onUploadFail={onUploadFail}
                token={authState.token}
                uploadUrl={`${apiUrl}/upload/avatar`}
              />

              <Text style={{fontSize: 18, color: '#fff', marginTop: 20}}>
                Upload Your Photo
              </Text>
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="Full Name"
                value={authState.user.name}
                onChangeText={fullName => {
                  setUser({...authState.user, name: fullName});
                }}
              />

              {authState.errors && authState.errors.errors.name && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {authState.errors.errors.name}
                </Text>
              )}
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="Email Address"
                value={authState.user.email}
                onChangeText={emailAddress => {
                  setUser({...authState.user, email: emailAddress});
                }}
              />

              {authState.errors && authState.errors.errors.email && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {authState.errors.errors.email}
                </Text>
              )}
            </View>

            <View style={{marginBottom: 10}}>
              <TextInputMask
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="Date of Birth (DD/MM/YYYY)"
                type={'datetime'}
                options={{format: 'DD/MM/YYYY'}}
                value={authState.user.dob}
                onChangeText={text => {
                  setUser({...authState.user, dob: text});
                }}
              />

              {authState.errors && authState.errors.errors.dob && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {authState.errors.errors.dob}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderRadius: 50,
                backgroundColor: '#fff',
                marginBottom: 10,
                padding: 2,
              }}>
              <TouchableOpacity
                onPress={() => setUser({...authState.user, gender: 'Male'})}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor:
                    authState.user.gender === 'Male' ? '#ff6347' : '#fff',
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: 14,
                    color: authState.user.gender === 'Male' ? '#fff' : '#000',
                  }}>
                  Male
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUser({...authState.user, gender: 'Female'})}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor:
                    authState.user.gender === 'Female' ? '#ff6347' : '#fff',
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: 14,
                    color: authState.user.gender === 'Female' ? '#fff' : '#000',
                  }}>
                  Female
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="School Name"
                value={authState.user.school}
                onChangeText={schoolName => {
                  setUser({...authState.user, school: schoolName});
                }}
              />

              {authState.errors && authState.errors.errors.school && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {authState.errors.errors.school}
                </Text>
              )}
            </View>

            <View style={{marginBottom: 10}}>
              <TextInput
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingLeft: 20,
                  borderRadius: 50,
                  elevation: 5,
                }}
                placeholder="Class"
                value={authState.user.class}
                onChangeText={className => {
                  setUser({...authState.user, class: className});
                }}
              />

              {authState.errors && authState.errors.errors.class && (
                <Text style={{color: '#ff6347', marginLeft: 5, marginTop: 5}}>
                  {authState.errors.errors.class}
                </Text>
              )}
            </View>

            <View style={{marginTop: 10, marginBottom: 10}}>
              <TouchableOpacity
                onPress={processEditProfile}
                style={{
                  backgroundColor: '#ff6347',
                  padding: 10,
                  borderRadius: 50,
                  elevation: 5,
                }}>
                {authState.loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      color: '#fff',
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 18,
                    }}>
                    submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default EditProfile;
