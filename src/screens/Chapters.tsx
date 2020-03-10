import {inject, observer} from 'mobx-react';
import moment from 'moment';
import React from 'react';
import {
  ActivityIndicator,
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
import {theme} from '../libs/theme';
import {baseUrl} from '../libs/vars';

function Chapters({store, navigation, route}: any) {
  const {category, auth, user} = store;
  const {authUser} = auth;
  const {categories} = category;
  const {updateSubscription, loading} = user;

  const {category_id} = route.params;

  const categoryById = categories.find((cat: any) => cat.id === category_id);

  navigation.setOptions({title: categoryById.name});

  const subscription = authUser.subscriptions.find(
    (sbs: any) => sbs.plan.category_id === category_id,
  );

  const plan = authUser.institute.plans.find(
    (pl: any) => pl.category_id === category_id,
  );

  const checkSubscription = (subscription_meta: any) => {
    if (subscription_meta) {
      if (moment(subscription_meta.expires_at) > moment()) {
        return 'Subscribed';
      }

      return 'Expired';
    }

    return 'Not Subscribed';
  };

  const handleSubscription = (plan_meta: any) => {
    var options = {
      description: plan_meta.description,
      image: `${baseUrl}/storage/${plan_meta.image}`,
      currency: 'INR',
      key: 'rzp_live_9zLV5vOpZrYX0u',
      amount: plan_meta.price * 100,
      name: plan_meta.name,
      prefill: {
        email: authUser.email,
        contact: authUser.mobile,
        name: authUser.name,
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then((data: any) => {
        updateSubscription({
          payment_id: data.razorpay_payment_id,
          plan_id: plan.id,
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
              <Text style={{fontSize: 18, textTransform: 'uppercase'}}>
                {checkSubscription(subscription)}
              </Text>

              {checkSubscription(subscription) !== 'Subscribed' && (
                <TouchableOpacity
                  onPress={() => handleSubscription(plan)}
                  style={{
                    backgroundColor: '#ff6347',
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    elevation: 5,
                  }}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{
                        textTransform: 'uppercase',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: 12,
                      }}>
                      subscribe now
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>

            {subscription && (
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#000'}}>Expiry Date</Text>
                <Text style={{color: '#000'}}>
                  {moment(subscription.expires_at).format('DD-MM-YYYY')}
                </Text>
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
              data={categoryById.chapters}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      borderRadius: 5,
                      marginBottom: 5,
                    }}
                    activeOpacity={0.7}
                    onPress={() => navigation.push('Chapters')}>
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
                          source={{
                            uri: `https://api.shendre.com/${item.image}`,
                          }}
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
                        <Text
                          style={{fontSize: 14, fontWeight: 'normal'}}
                          numberOfLines={1}>
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

export default inject('store')(observer(Chapters));
