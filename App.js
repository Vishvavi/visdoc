import { View, Text ,Dimensions,AppState, Platform} from 'react-native'
import React,{useEffect, useState,useRef} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

import  { FirebaseMessagingTypes ,firebase} from '@react-native-firebase/messaging';
import LoginNavigator from './Telemed/navigations/LoginNavigator';
import Loader from './Telemed/navigations/Loader';
import PushNotificationIOS from '@react-native-community/push-notification-ios'; 

import {SafeAreaProvider} from 'react-native-safe-area-context';

import PushNotification from 'react-native-push-notification'; 
import { LogBox } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LocalNotificationBuilder from './Telemed/screens/LocalNotificationBuilder';
import messaging from '@react-native-firebase/messaging';





// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();



   const App = ({navigation}) => {
  
  
 

  {
    /*const setBadge = val => {
    badgeRef.current = val;
    PushNotification.setApplicationIconBadgeNumber(val);
    _setBadge(val);
  }

  const handleBadge = (state) => {
    if (state === 'active') {
      PushNotification.getApplicationIconBadgeNumber(num => {
        setBadge(num);
      });
    }
  }

  useEffect(() => {
    PushNotification.getApplicationIconBadgeNumber(num => {
      setBadge(num);
      //console.log(badge)
    });
    AppState.addEventListener('change', handleBadge);
    return () => {
      AppState.removeEventListener('change', handleBadge);
    }
  }, []);

/
*/}
{/*useEffect(() => {
  console.log('App initialized');
 
  AppDimensions.initialize();
  
  return () => {
   
      AppDimensions.uninitialize();
     
  };
}, []);
*/
}

{  /*useEffect(() => {
        const remove = Dimensions.addEventListener("change", status => {
            console.log(status.window.width)
            setBannerWidth(status.window.width)
        })
        return () => {
            remove.remove()
        }
    }, [])
  
console.log(bannerWidth)
*/
  }
  
  
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();
  
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  
 
//   useEffect(() => { 
    
// checkApplicationPermission();
//     firebase.messaging().onMessage(response => { 
//        //console.log(JSON.stringify(response));
//        if (Platform.OS !='ios') { 
//            showNotification(response.notification); 
//           console.log('notification android',response)

//            return; 
           
//        } 
//        PushNotificationIOS.requestPermissions().then(() => 
      
//            showNotification(response.notification), 
//            console.log(response.notification)
          
//        ); 
//    }); 
//  }, 
//  []
//  ); 
//  useEffect(()=>{
//   PushNotification.configure({

//       onRegister: function (token) {
//         console.log('TOKEN:', token);
//       },

//       onNotification: function (notification) {
//         console.log('NOTIFICATION:', notification);

//       if (notification.foreground) {
//       PushNotification.localNotification({
//         title:notification.title,
//         message:notification.body,
//         actions:[{
//           id:'open',
//           title:'open',
//           options:{foreground:true}
//         }
//         ]
//       });
//       } 
//       },

//       senderID: "your_fcm_sender_id_here",

//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true
//       },

//       popInitialNotification: true,

//       requestPermissions: true,
//     });
// },[]);


useEffect(() => {
  checkApplicationPermission()
     // Usesd to display notification when app is in foreground
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    console.log(remoteMessage)
    if(Platform.OS==='ios'){
    PushNotificationIOS.addNotificationRequest({
      id: remoteMessage.messageId,
      body: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      sound:'default'
    });
  }else{
    PushNotification.localNotification({
      channelId:'channel-id-2'
    })
  }
  });

  return unsubscribe;
}, []);
 

 PushNotification.createChannel(
  {
    channelId: "channel-id-1", // (required)
    channelName: 'My channel',
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
PushNotification.createChannel(
  {
    channelId: "channel-id-2", 
    channelName: 'My channel2',
    playSound: true, 
    soundName: "default", 
    vibrate: true, 
    
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
 const showNotification =  (notification) => { 
  // if (Platform.OS !='ios'){
    LocalNotificationBuilder.builder()
  
   
    .setTitle(notification.title) 
    .setMessage(notification.body)
    .now()

   PushNotification.localNotification({ channelId:'channel-id-1',title: notification.title, message: notification.body}); 
   
  }
  // else{
  //   PushNotificationIOS.addNotificationRequest({ alertTitle: notification.title, alertBody: notification.body,

    
  //   }); 
  // }
  //}; 
 
 


  return (
    <>
   <SafeAreaProvider>
   <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer>
    
       <LoginNavigator/>
 
      </NavigationContainer>
      </GestureHandlerRootView>
      </SafeAreaProvider>
  
      </>
  )
 
}

export default App;