import moment from 'moment';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import {getMediaFile} from '../libs/media';
import {theme} from '../libs/theme';
import {baseUrl} from '../libs/vars';
import {SUBSCRIPTION_PURCHASED} from '../store/constants/auth';

function Chapters(props: any) {
  const dispatch = useDispatch();
  const {category_id} = props.route.params;

  const authState = useSelector((state: any) => state.auth);
  const categoriesState = useSelector((state: any) => state.categories);
  const chaptersState = useSelector((state: any) => state.chapters);

  const category = categoriesState.data[category_id];
  props.navigation.setOptions({title: category.name});

  const chapters = category.chapters.map(
    (chapter_id: any) => chaptersState.data[chapter_id],
  );

  const current_subscription = authState.user.subscriptions.filter(
    (plan: any) => plan.category_id === category.id,
  )[0];

  const plan_info = authState.user.institute.plans.filter(
    (plan: any) => plan.category_id === category.id,
  )[0];

  const checkSubscription = (current_subscription: any) => {
    if (current_subscription) {
      if (current_subscription.expires_at > moment()) {
        return 'Subscribed';
      }

      return 'Expired';
    }

    return 'Not Subscribed';
  };

  const handleSubscription = (plan_info_meta: any) => {
    var options = {
      description: plan_info_meta.description,
      image: `${baseUrl}/storage/${plan_info_meta.image}`,
      currency: 'INR',
      key: 'rzp_live_9zLV5vOpZrYX0u',
      // amount: plan_info_meta.price * 100,
      amount: 100,
      name: plan_info_meta.name,
      prefill: {
        email: authState.user.email,
        contact: authState.user.mobile,
        name: authState.user.name,
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then((data: any) => {
        dispatch({
          type: SUBSCRIPTION_PURCHASED,
          payload: {
            payment_id: data.razorpay_payment_id,
            plan_id: plan_info.id,
          },
        });
      })
      .catch((error: any) => {
        Alert.alert('Oops', error.description);
      });
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.primary} />

      <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}}>
        <View style={{flex: 1}}>
          <View style={{backgroundColor: '#fff'}}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18}}>
                {checkSubscription(current_subscription)}
              </Text>

              {checkSubscription(current_subscription) !== 'Subscribed' && (
                <TouchableOpacity
                  onPress={() => handleSubscription(plan_info)}
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 5,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {current_subscription && (
              <View
                style={{
                  padding: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{color: '#000'}}>Expiry Date</Text>
                  <Text style={{color: '#000'}}>
                    {moment(current_subscription.expires_at).format(
                      'DD-MM-YYYY',
                    )}
                  </Text>
                </View>
              </View>
            )}
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
                          source={{uri: getMediaFile('chapter', item.image)}}
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
