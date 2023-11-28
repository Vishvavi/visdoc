import { FlatList, Image, ScrollView, StyleSheet, Text,Linking,SafeAreaView,Easing,ToastAndroid,Animated,LayoutAnimation,addEventListener,Alert, TouchableOpacity, View, } from 'react-native'

import React, {  useEffect, useState ,useCallback} from 'react'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Feather from 'react-native-vector-icons/Feather'

import { CountdownCircleTimer ,useCountdown} from 'react-native-countdown-circle-timer';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import * as Animatable from 'react-native-animatable';
import { AppDimensions } from '../Components/Dimensions'
import URL from '../Components/URL';



import NetInfo from "@react-native-community/netinfo";

import Spinner from 'react-native-loading-spinner-overlay';


import { StackActions } from '@react-navigation/native'

import { RefreshControl } from 'react-native-gesture-handler';
import Header from '../Components/Header';

import AsyncStorage from '@react-native-async-storage/async-storage';
//import {scale} from '../Components/Scale';


import { Dimensions, Platform, PixelRatio } from 'react-native';
import PushNotification,{Importance, PushNotificationDeliveredObject} from 'react-native-push-notification';
import messaging from "@react-native-firebase/messaging";
import useProgressViewOffset1 from "../Components/ProgressViewOffsetlo";
import ConnectionMessgeScreen from '../Components/ConnectionMessageScreen';
import  PushNotificationIOS  from '@react-native-community/push-notification-ios';
import { useNotes } from '../NoteProvider';
//import {onHandlerStateChange} from 'reeact-native-gesture-handler'


import  {
  useSharedValue,
  useAnimatedStyle,

  useAnimatedScrollHandler,
  interpolate,
  interpolateColor,
  Extrapolate,
} from "react-native-reanimated";


const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
import {
  useDimensionsChange,
  useResponsiveHeight,
  useResponsiveWidth,
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import LocalNotificationBuilder from '../LocalNotificationBuilder';





 
 



//NetInfo.isConnected.addEventListener('connectionChange', (hasInternetConnection) = console.debug(`hasInternetConnection:`, hasInternetConnection));




  


const Appointments = ({navigation,route}) => {
const{ID,Scribe}=route.params;

    const[Accepted,setAccepted]=useState([]);
    const[Pending,setPending]=useState([]);
    const[Rowcount,setRowcount]=useState(0);
    const[CRowcount,setCRowcount]=useState(0);
    const[PendingRowcount,setPendingRowcount]=useState(0);
    const[PendingCRowcount,setPendingCRowcount]=useState(0);
    
    const[Proposed,setProposed]=useState([]);
    
    const[ProposedRowcount,setProposeRowcount]=useState(0);
    const[ProposedCRowcount,setProposeCRowcount]=useState(0);
    const[spinner,setspinner]=useState(true);
    const [date, setDate] = useState(new Date());
    const[date1,setDate1]=useState(false);
    const [time, setTime] = useState(new Date());
    const [open, setOpen] = useState(false); 
    const [selectedTab, setSelectedTab] = useState(0);
    const [showInfo, SetShowInfo] = useState(false);
    const [showContact, SetShowContact] = useState(false);
    const [showSpecial, setShowSpecial] = useState(false);
    const [showDeclined, setShowDeclined] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const[TransitionalList,setTransitionalList]=useState([]);
    const[TransitionalRowcount,setTransitionalRowcount]=useState(0);
    const[OPRowcount,setOPRowcount]=useState(0);
    const[FacilityRowcount,setFacilityRowcount]=useState(0);
    const[FacilityCRowcount,setFacilityCRowcount]=useState(0);
    const[FaciPenRowcount,setFaciPenRowcount]=useState(0);
    const[FaciPenCRowcount,setFaciPenCRowcount]=useState(0);
    const[FaciProposeRowcount,setFaciProposeRowcount]=useState(0);
    const[FaciProposeCRowcount,setFaciProposeCRowcount]=useState(0);

    const[DeclinedRowcount,setDeclinedRowcount]=useState(0);
   
    const[FaciDecRowcount,setFaciDecRowcount]=useState(0);
    const[DeclinedCRowcount,setDeclinedCRowcount]=useState(0);
    const[FaciDecCRowcount,setFaciDecCRowcount]=useState(0);
   const[connected,setconnected]=useState();
   const[TimerRowcount,setTimerRowcount]=useState(0);
   const[SlideOutdown,setSlideOutdown]=useState(new Animated.Value(100))
   const[animatedValue,setanimatedValue]=useState(new Animated.Value(0));
   const[selectedId,setselectedId]=useState(false);
   const progressViewOffset = useProgressViewOffset1();
   //const[count,setcount]=useState(0);
   const[SelectedToggle,setSelectedToggle]=useState(" ");
   const[timerkey,settimerKey]=useState(0);
   const[showResponse,setshowResponse]=useState(false);
   const[showResponsefacility,setshowResponsefacility]=useState(false);
   const{count,NotificationLog,setcount,TimerList,TimerReferralList,ListRowcount,fetchID}=useNotes()


   const[changeWidth,setchangeWidth]=useState(Dimensions.get('window').width)
 

  
   var curr = new Date; // get current date
   var first = curr.getDate() ; // First day is the day of the month - the day of the week
   var last = first + 6; // last day is the first day + 6

   const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
   const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");

   let tomorrow = new Date();
   tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');

  useDimensionsChange(                      
    useCallback(({ window, screen }) => {//aims to make handling screen/window size changes easier to work with.
     
      setchangeWidth(window.width)
    
    }, [])  
  ); 

  // const NotificationLog=async()=>{
  //   try{
  //   const url=`https://visdocapidev.azurewebsites.net/api/PushNotification/ViewLogStatus/${ID}`;
  //   let result=await fetch(url);
  //   result=await result.json();
    
  //   console.log(result.NotificationList.length)
  //   const unReadcount=result.NotificationList.reduce((count,item)=>count+(item.MessageStatus==="UnRead"?1:0),0);
  //   setcount(unReadcount)
  //   console.log(unReadcount);
    
  //   }catch(e){
  //     console.log(e);
  //   }
  
  // }
 
  PushNotification.configure({
    onNotification: (notification) =>{
    // console.log( 'NOTIFICATION:', notification );
    // notification.badge=10
    if(notification.userInteraction){
     navigation.navigate('ProviderNotification',{ID:ID,Scribe:Scribe})
    }
   //  navigation.navigate('Appointments');
     
   }})
   

//Toggle check function 

function toggleHandle() {
  if(SelectedToggle==="Off"){
  setSelectedToggle("On")
  ToggleOn();
   //A toast provides simple feedback about an operation in a small popup.
  }
  else{
    ToggleOff();
    setSelectedToggle("Off")
    
  }
  
}
Animated.timing(
  animatedValue,
  {
    toValue: SelectedToggle==="On" ? 30 : 0,
    duration: 250,         // in milliseconds, default is 500
    easing: Easing.bounce, // Easing function, default is Easing.inOut(Easing.ease)
    delay: 0,  
    useNativeDriver:true            // in milliseconds, default is 0
  }
).start()
  



 

 useEffect(()=>{
     console.log(URL.TcmAcceptedTab0Url)
  ToggleCheck();
  const focusHandler=navigation.addListener('focus',()=>{ // hook that returns the screen is focused 
   const Tab=selectedTab;
   console.log(Scribe)
   const value1=date1;
   AcceptedReferalList(Tab,value1);
   console.log(selectedTab)
   NotificationLog();
   fetchID();
   TimerReferralList();
   
         FacilityAcceptedReferalList(Tab,value1);
         FacilityPendingReferalList(Tab,value1);
         FacilityProposedReferalList(Tab,value1);
         AcceptedReferalList(Tab,value1);
         PendingReferalList(Tab,value1);
         ProposedReferalList(Tab,value1);
         DeclinedReferralList(Tab,value1);
         FacilityDeclinedReferalList(Tab,value1);
         if(Scribe==="Hospitalist"){
         CreatedAcceptedReferral(Tab,value1);
         FacilityAcceptedcount(Tab,value1);
         PendingReferalcount(Tab,value1);
         FacilityPendingReferalcount(Tab,value1);
         ProposedReferalcount(Tab,value1);
         FacilityProposedReferalcount(Tab,value1);
         DeclinedReferralcount(Tab,value1);
         FacilityCDeclinedReferalList(Tab,value1);
         }
         
       
      TransitionalReferralList(Tab,value1);
         OPReferralList();
         
     
    
       })
       return focusHandler;
       }, [navigation,selectedTab,date1]);

  
     useEffect(()=>{
     NetInfo.fetch().then(state => {     //access information about the device's network state
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    setconnected(state.isConnected)
  });
},[])

useEffect(()=>{

       
  const  scheduleNotification=(item)=>{

     const currentTime=new Date();

    const[hours,minutes]=item.AppointmentTime.split(':')
    const notificationTime=new Date();
    notificationTime.setHours(hours);
    notificationTime.setMinutes(minutes-5);
    notificationTime.setSeconds(0);
    console.log('nt',notificationTime)
    

    if(notificationTime>currentTime){

      LocalNotificationBuilder.builder()
      .setId(item.AppointmentId)
      .setWhen(notificationTime)
      .setTitle('Visdoc') 
      .setMessage(`You have a Schedule with ${item.PatientName} at ${moment(item.AppointmentTime,"HH:mm:ss").format("hh:mm A")}`)
      .schedule();


  //     if(Platform.OS!='ios'){
  //     PushNotification.localNotificationSchedule({
  //      id:item.AppointmentId,
  //       message:`Schudule for ${moment(item.AppointmentTime,"HH:mm:ss").format("hh:mm A")}`,
  //   date:notificationTime,  
  //   autoCancel:true,
  
  //  allowWhileIdle:false,
  //   channelId: "channel-id-2"
  //     })
  //   }
  //   else{
  //     PushNotificationIOS.localNotificationSchedule({
  //       id:item.AppointmentId,
  //        message:`Schudule for ${moment(item.AppointmentTime,"HH:mm:ss").format("hh:mm A")}`,
  //    date:notificationTime,  
  //    autoCancel:true,
   
  //   allowWhileIdle:false,
  //    channelId: "channel-id-2"
  //     })}

    
  }




// PushNotification.cancelLocalNotification({id:1})
}
  Accepted.forEach((item)=>{//forEach method can be used when you need to call a function for every element in an array.
    const[hours,minutes]=item.AppointmentTime.split(':') 

 
 const date=new Date();
 date.setHours(hours)
 date.setMinutes(minutes)
 date.setSeconds(0);
//   if(date>new Date()){
 
  scheduleNotification(item);
// }


  });




},[Accepted])

 // opendrawer function 

const menu=()=>{
  navigation.openDrawer({ID,Scribe})

 }
 

 // Referral List navigation functions
    const ToAccepted = () => {
        navigation.navigate('Accepted',{ID,Scribe,Accepted:Accepted,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
      }
      const ToPending = () => {
        navigation.navigate('Pending',{ID,Scribe,Pending:Pending,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD"),})
      }
      const ToProposed = () => {
        navigation.navigate('ProposedData',{ID,Scribe,Proposed:Proposed,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
      }
      const FacilityAccepted=()=>{
        navigation.navigate('FacilityAcceptedRef',{ID,Scribe,Accepted:Accepted,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

      }
      const FacilityPending=()=>{
        navigation.navigate('FacilityPendingRef',{ID,Scribe,Pending:Pending,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

      }
      const FacilityProposed=()=>{
        navigation.navigate('FacilityProposeRef',{ID,Scribe,Proposed:Proposed,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

      }

      const ToDeclined=()=>{
        navigation.navigate('DeclinedList',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

      }

 const TocreatedAccepted=()=>{
  navigation.navigate('Acceptedforcreated',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

 }   
 const TocreatedFAccepted=()=>{
  navigation.navigate('AcceptedforFcreated',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

 }     
 
 const TocreatedPending=()=>{
  navigation.navigate('Pendingforcreated',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
 }

 const TocreatedFPending=()=>{
  navigation.navigate('PendingforFcreated',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
 }

 const TocreatedFDeclined=()=>{
  navigation.navigate('createdFacilityDeclinedRef',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
 }

 const TocreatedDeclined=()=>{
  navigation.navigate('createdDeclinedList',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
 }

 const TocreatedProposed=()=>{
 navigation.navigate('Proposedforcreated',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
 }

 const TocreatedFProposed=()=>{
  navigation.navigate('ProposedforFcreated',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
  }
      const ToFacilityDeclined=()=>{
        navigation.navigate('FacilityDeclinedRef',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

      }

const TcmAccepted=()=>{
  navigation.navigate('TransitionalList',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
}

    


        const callback1=React.useCallback(async(Tab,value1)=>{ //callback refferallist
    
     AcceptedReferalList(Tab,value1);
     
      });
      const callbackCA=React.useCallback(async(Tab,value1)=>{
    
       CreatedAcceptedReferral(Tab,value1)
        
         });
         const callbackCP=React.useCallback(async(Tab,value1)=>{
    
        PendingReferalcount(Tab,value1);
           
            });
           
      const callback3=React.useCallback(async(Tab,value1)=>{
      
        PendingReferalList(Tab,value1);
       
        });
        const callback2=React.useCallback(async(Tab,value1)=>{
        
          ProposedReferalList(Tab,value1);
         
        });
        const callbackProposed=React.useCallback(async(Tab,value1)=>{
        
          ProposedReferalcount(Tab,value1);
         
        });
        const callbacktransition=React.useCallback(async(Tab,value1)=>{
          
          TransitionalReferralList(Tab,value1);
         
        });
const callbackFaciAccepted=React.useCallback(async(Tab,value1)=>{
  FacilityAcceptedReferalList(Tab,value1);

});
const callbackCFaciAccepted=React.useCallback(async(Tab,value1)=>{
  FacilityAcceptedReferalList(Tab,value1);

});
const callbackFaciProposed=React.useCallback(async(Tab,value1)=>{
  FacilityProposedReferalList(Tab,value1);

});
const callbackFaciCProposed=React.useCallback(async(Tab,value1)=>{
  FacilityProposedReferalcount(Tab,value1);

});
const callbackFaciPending=React.useCallback(async(Tab,value1)=>{

  FacilityPendingReferalList(Tab,value1)
});
const callbackFaciCPending=React.useCallback(async(Tab,value1)=>{

  FacilityPendingReferalcount(Tab,value1)
});

const callbackOP=React.useCallback(async()=>{
  OPReferralList();
});
const callbackDeclined=async(Tab,value1)=>{
  DeclinedReferralList(Tab,value1);
  DeclinedReferralcount(Tab,value1);
};
const callbackFaciDeclined=async(Tab,value1)=>{
  FacilityDeclinedReferalList(Tab,value1);
};
const callbackCFaciDeclined=async(Tab,value1)=>{
  FacilityCDeclinedReferalList(Tab,value1);
};


//ImReady notification  function

const ImReady=async(item)=>{
 
  try{
    const data={
      AppointmentId: `${item.AppointmentId}`,
      Status: "Im Ready"
    }
    const url=URL.ImReady;
    console.log(url)
     fetch(url,{
method:"POST",
headers:{
  'Content-Type':'application/json'
},
body:JSON.stringify(data)

     }).then(response=>response.json()).then(json=>{
console.log(json);
     })
   }catch(e){
      console.log(e);
    
  }
  };

//Toggle check api call

  const ToggleCheck=async()=>{
    try{
 const Url=URL.ToggleCheck+`${ID}`;
let result=await fetch(Url);
result=await result.json();
console.log(result);
setSelectedToggle(result.Status);
    }catch(e){
      console.log(e);
    }

};

//Toggle on api

const ToggleOn=()=>{
const data={
  ProviderId:`${ID}`,
  Status: "On"
}

  const Url=URL.ToggleOn;
fetch(Url,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(data)
}).then(response=>response.json()).then(json=>{
  console.log(json);
})

};

//Toggle off api 

const ToggleOff=()=>{
  const data={
    ProviderId:`${ID}`,
    Status: "Off"
  }
  
    const Url=URL.ToggleOff;
  fetch(Url,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  }).then(response=>response.json()).then(json=>{
    console.log(json);
  })
  
  };


  
  
  
const OPReferralList=async()=>{
  const url=URL.ProviderOPList+`${ID}`;
  console.log(url)
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackOP()
   }
   else{
    setOPRowcount(data?.Rowcount);
  
    console.log('Oprowcount',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    
  
};

//Tcm Accepted referralList count

const TcmAcceptedTab0Url=URL.TcmAcceptedUrl+`startdate=${firstday}&enddate=${firstday}`
const TcmAcceptedTab1Url=URL.TcmAcceptedUrl+`startdate=${tomorrow}&enddate=${tomorrow}`
const TcmAcceptedTab2Url=URL.TcmAcceptedUrl+`startdate=${firstday}&enddate=${lastday}`
const TcmAcceptedTab3Url=URL.TcmAcceptedUrl+`startdate=${firstday}`
const TcmAcceptedTab4Url=URL.TcmAcceptedUrl

//Telemed AcceptedReferralList count

const AcceptedTab0Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const AcceptedTab1Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const AcceptedTab2Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const AcceptedTab3Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${firstday}`
const AcceptedTab4Url=URL.AcceptedUrl+`Provider/${ID}?startdate=`

//Facility Accepted ReferralList count Url

const FacAcceptedTab0Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacAcceptedTab1Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacAcceptedTab2Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacAcceptedTab3Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${firstday}`
const FacAcceptedTab4Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=`

//Telemed Proposed ReferralList count Url

const ProposedTab0Url=URL.ProposedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const ProposedTab1Url=URL.ProposedUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const ProposedTab2Url=URL.ProposedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const ProposedTab3Url=URL.ProposedUrl+`Provider/${ID}?startdate=${firstday}`
const ProposedTab4Url=URL.ProposedUrl+`Provider/${ID}?startdate=`

//Facility Proposed ReferralList count Url

const FacProposedTab0Url=URL.FacProposedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacProposedTab1Url=URL.FacProposedTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacProposedTab2Url=URL.FacProposedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacProposedTab3Url=URL.FacProposedTabUrl+`Provider/${ID}?startdate=${firstday}`
const FacProposedTab4Url=URL.FacProposedTabUrl+`Provider/${ID}?startdate=`

//Telemed Pending ReferralList count Url

const PendingTab0Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const PendingTab1Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const PendingTab2Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const PendingTab3Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${firstday}`
const PendingTab4Url=URL.PendingTabUrl+`Provider/${ID}?startdate=`

//FacilityPending  ReferralList count Url

const FacPendingTab0Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacPendingTab1Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacPendingTab2Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacPendingTab3Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${firstday}`
const FacPendingTab4Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=`


//Telemed Declined Referral count

const DeclinedTab0Url=URL.DeclinedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const DeclinedTab1Url=URL.DeclinedTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const DeclinedTab2Url=URL.DeclinedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const DeclinedTab3Url=URL.DeclinedTabUrl+`Provider/${ID}?startdate=${firstday}`
const DeclinedTab4Url=URL.DeclinedTabUrl+`Provider/${ID}?startdate=`

//facility  Declined Referral count

const FacDeclinedTab0Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacDeclinedTab1Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacDeclinedTab2Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacDeclinedTab3Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${firstday}`
const FacDeclinedTab4Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=`

//Hospitalist (created referrals) Accepted url

const createdAccTab0Url= URL.createdAcceptedUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdAccTab1Url=URL.createdAcceptedUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdAccTab2Url=URL.createdAcceptedUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdAccTab3Url=URL.createdAcceptedUrl+`${ID}?startdate=${firstday}`
const createdAccTab4Url=URL.createdAcceptedUrl+`${ID}?startdate=`

//Hospitalist (created referrals) pending url

const createdPenTab0Url= URL.createdPendingUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdPenTab1Url=URL.createdPendingUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdPenTab2Url=URL.createdPendingUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdPenTab3Url=URL.createdPendingUrl+`${ID}?startdate=${firstday}`
const createdPenTab4Url=URL.createdPendingUrl+`${ID}?startdate=`

//Hospitalist (created referrals) proposed url

const createdProTab0Url=URL.createdProposedUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdProTab1Url=URL.createdProposedUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdProTab2Url=URL.createdProposedUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdProTab3Url=URL.createdProposedUrl+`${ID}?startdate=${firstday}`
const createdProTab4Url=URL.createdProposedUrl+`${ID}?startdate=`

//Hospitalist (created referrals) Accepted url

const createdFAccTab0Url= URL.createdFAcceptedUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdFAccTab1Url=URL.createdFAcceptedUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdFAccTab2Url=URL.createdFAcceptedUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdFAccTab3Url=URL.createdFAcceptedUrl+`${ID}?startdate=${firstday}`
const createdFAccTab4Url=URL.createdFAcceptedUrl+`${ID}?startdate=`

//Hospitalist (created referrals) pending url

const createdFPenTab0Url= URL.createdFPendingUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdFPenTab1Url=URL.createdFPendingUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdFPenTab2Url=URL.createdFPendingUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdFPenTab3Url=URL.createdFPendingUrl+`${ID}?startdate=${firstday}`
const createdFPenTab4Url=URL.createdFPendingUrl+`${ID}?startdate=`

//Hospitalist (created referrals) proposed url

const createdFProTab0Url= URL.createdFProposedUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdFProTab1Url=URL.createdFProposedUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdFProTab2Url=URL.createdFProposedUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdFProTab3Url=URL.createdFProposedUrl+`${ID}?startdate=${firstday}`
const createdFProTab4Url=URL.createdFProposedUrl+`${ID}?startdate=`


const createdDecTab0Url=URL.createdDeclinedUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdDecTab1Url= URL.createdDeclinedUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdDecTab2Url=URL.createdDeclinedUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdDecTab3Url=URL.createdDeclinedUrl+`${ID}?startdate=${firstday}`
const createdDecTab4Url=URL.createdDeclinedUrl+`${ID}?startdate=`

const createdFDecTab0Url=URL.createdFDeclinedUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
const createdFDecTab1Url= URL.createdFDeclinedUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const createdFDecTab2Url=URL.createdFDeclinedUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
const createdFDecTab3Url=URL.createdFDeclinedUrl+`${ID}?startdate=${firstday}`
const createdFDecTab4Url=URL.createdFDeclinedUrl+`${ID}?startdate=`



const TransitionalReferralList=async(Tab,value1)=>{
  if(Tab===0){
    try{
  const url=TcmAcceptedTab0Url;
  let result=await fetch(url);
  if(result.status===200){
  result=await result?.json();
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
    callbacktransition(Tab);
    
    }
    else{
     setTransitionalRowcount(result?.Rowcount);
     console.log('TransTab0Rc',result.Rowcount);
  }}
  else{
    throw new Error('network request failed')
  }

}catch(e){
  console.log(e);
}
  }
  else if(Tab===1){
    try{
    const url=TcmAcceptedTab1Url;
    let result=await fetch(url);
    result=await result.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('TransTab1Rc',result.Rowcount);
  }}catch(e){
    console.log(e);
  }
  }
  else if(Tab===2){
    try{
    const url=TcmAcceptedTab2Url;
    let result=await fetch(url);
    result=await result.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('TransTab2Rc',result.Rowcount);
  }
}catch(e){
  console.log(e);
}
}
  else if(Tab===3){
    try{
    const url=TcmAcceptedTab3Url;
    let result=await fetch(url);
    result=await result.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('TransTab3Rc',result.Rowcount);
  }
}catch(e){
  console.log(e);
}
  }

  else if(Tab===4){
    try{
    const url=value1===false?TcmAcceptedTab4Url+`startdate=${firstday}&enddate=${firstday}`:TcmAcceptedTab4Url+`startdate=${value1}&enddate=${value1}`;
    let result=await fetch(url);
    result=await result.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab,value1);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('TransTab4Rc',result.Rowcount);
  }}catch(e){
    console.log(e);
  }

  }
  };

    
const AcceptedReferalList = async(Tab,value1)=>{


        if(Tab===0){
         // setspinner(true)
      try{
            const url=AcceptedTab0Url;
           const result=await fetch(url);
              if(result.status===200){
                const data=await result.json()
                console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callback1(Tab)
             }
             else{
              setRowcount(data?.Rowcount);
              setTimerRowcount(data.Rowcount)
              setAccepted(data.ListOfRefferals)
              setspinner(false)
              console.log('AccTab0',data.Rowcount)
             }}
              else{
                throw new Error('network request failed')
              }}catch(e){
                console.log(e);
              }}
              
        else if(Tab===1){
          
          const url=AcceptedTab1Url;
          
          fetch(url).then(result=>{
            if(result.status===200){
            return(
               result.json()
            
            )}
            else{
              throw new Error('network request failed')
            }
          }).then(data=>{
            console.log(data)
           if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callback1(Tab)
           }
           else{
            setRowcount(data?.Rowcount);
          
            console.log('AccTab1',data.Rowcount)
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }
        else if(Tab===2){
           
            const url=AcceptedTab2Url;
          
            fetch(url).then(result=>{
              if(result.status===200){
              return(
                 result.json()
              )}
              else{
                throw new Error('network request failed')
              }
            }).then(data=>{
              console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callback1(Tab)
             }
             else{
              setRowcount(data?.Rowcount);
            
              console.log('AccTab2',data.Rowcount)
             }
            }).catch(e=>{
                console.log(e);
              
            })}

        else if(Tab===3){

            const url=AcceptedTab3Url;
          
            fetch(url).then(result=>{
              if(result.status===200){
              return(
                 result.json()
              
              )}
              else{
                throw new Error('network request failed')
              }
            }).then(data=>{
              console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callback1(Tab)
             }
             else{
              setRowcount(data?.Rowcount);
            
              console.log('AccTab3',data.Rowcount)
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }
     else if(Tab===4){
        
        const url=value1===false?AcceptedTab4Url+`startdate=${firstday}&enddate=${firstday}`:AcceptedTab4Url+`${value1}&enddate=${value1}`;
      
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callback1(Tab,value1)
         }
         else{
          setRowcount(data?.Rowcount);
        
          console.log('AccTab1',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
};


//hospitalist (created referrallist)  accepted referral count function

const CreatedAcceptedReferral= async(Tab,value1)=>{

  if(Tab===0){
  try{
      const url=createdAccTab0Url;
     const result=await fetch(url);
        if(result.status===200){
          const data=await result.json()
          console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackCA(Tab)
       }
       else{
        setCRowcount(data?.Rowcount);
       
        console.log('CAccTab0',data.Rowcount)
       }}
        else{
          throw new Error('network request failed')
        }}catch(e){
          console.log(e);
        }}
        
  else if(Tab===1){
    
    const url=createdAccTab1Url;
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackCA(Tab)
     }
     else{
      setCRowcount(data?.Rowcount);
    
      console.log('AccTab1',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===2){
     
      const url=createdAccTab2Url;
    
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackCA(Tab)
       }
       else{
        setCRowcount(data?.Rowcount);
      
        console.log('AccTab2',data.Rowcount)
       }
      }).catch(e=>{
          console.log(e);
        
      })}

  else if(Tab===3){

      const url=createdAccTab3Url;
    
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackCA(Tab)
       }
       else{
        setCRowcount(data?.Rowcount);
      
        console.log('AccTab3',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
else if(Tab===4){
  
  const url=value1===false?createdAccTab0Url+`startdate=${firstday}&enddate=${firstday}`:createdAccTab4Url+`${value1}&enddate=${value1}`;

  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackCA(Tab,value1)
   }
   else{
    setCRowcount(data?.Rowcount);
  
    console.log('AccTab1',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
};

const FacilityAcceptedReferalList = async(Tab,value1)=>{

  if(Tab===0){
   
      const url=FacAcceptedTab0Url;
      try{
      const result=await fetch(url);
     
      if(result.status===200){
            const data=await result.json()
            console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callbackFaciAccepted(Tab)

         }
         else{
          setFacilityRowcount(data?.Rowcount);
        
          console.log('FacAccTab0',data.Rowcount)
         }}
        else{
          throw new Error('network request failed')
        }}catch(e){
          console.log(e);
        }}
      
         
      
        
        
 
    
  
  else if(Tab===1){
    
      const url=FacAcceptedTab1Url;
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackFaciAccepted(Tab)
       }
       else{
        setFacilityRowcount(data?.Rowcount);
      
        console.log('FacAccTab1',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
  else if(Tab===2){
    
     
      const url=FacAcceptedTab2Url;
     
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackFaciAccepted(Tab)
       }
       else{
        setFacilityRowcount(data?.Rowcount);
      
        console.log('FacAccTab1',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
  else if(Tab===3){

     const url=FacAcceptedTab3Url;
     fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackFaciAccepted(Tab)
     }
     else{
      setFacilityRowcount(data?.Rowcount);
    
      console.log('FacAccTab3',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
else if(Tab===4){
  
  const url=value1===false?FacAcceptedTab4Url+`startdate=${firstday}&enddate=${firstday}`:FacAcceptedTab4Url+`${value1}&enddate=${value1}`;
 
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciAccepted(Tab,value1);
   }
   else{
    setFacilityRowcount(data?.Rowcount);
  
    console.log('FacAccTab4',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
};

//Hospitalist (created facility Referral count) function

const FacilityAcceptedcount = async(Tab,value1)=>{

  if(Tab===0){
   
      const url=createdFAccTab0Url;
      try{
        const result=await fetch(url);
     //fetch(url).then(result=>{
        if(result.status===200){
      
          const data=await result.json()
          if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callbackCFaciAccepted(Tab)
           }
           else{
            setFacilityCRowcount(data?.Rowcount);
          
            console.log('FacAccTab0',data.Rowcount)
           }
        
        }
        else{
          throw new Error('network request failed')
        }
      }catch(e){
        console.log(e);
      }}
        
 
    
  
  else if(Tab===1){
    
      const url=createdFAccTab1Url;
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackCFaciAccepted(Tab)
       }
       else{
        setFacilityCRowcount(data?.Rowcount);
      
        console.log('FacAccTab1',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
  else if(Tab===2){
    
     
      const url=createdFAccTab2Url;
     
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackCFaciAccepted(Tab)
       }
       else{
        setFacilityCRowcount(data?.Rowcount);
      
        console.log('FacAccTab1',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
  else if(Tab===3){

     const url=createdFAccTab3Url;
     fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackCFaciAccepted(Tab)
     }
     else{
      setFacilityCRowcount(data?.Rowcount);
    
      console.log('FacAccTab3',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
else if(Tab===4){
  
  const url=value1===false?createdFAccTab4Url+`startdate=${firstday}&enddate=${firstday}`:createdFAccTab4Url+`${value1}&enddate=${value1}`;
 
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciAccepted(Tab,value1);
   }
   else{
    setFacilityCRowcount(data?.Rowcount);
  
    console.log('FacAccTab4',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
};

const ProposedReferalList=async(Tab,value1)=>{
    if(Tab===0){
      
        const url=ProposedTab0Url;
       
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callback2(Tab)
         }
         else{
          setProposeRowcount(data?.Rowcount);
        
          console.log('ProposedTab0',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
    else if(Tab===1){
      const url=ProposedTab1Url;
       fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
         )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callback2(Tab)
       }
       else{
        setProposeRowcount(data?.Rowcount);
         console.log('ProposedTab1',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        })
        }
    else if(Tab===2){
      
        const url=ProposedTab2Url;
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callback2(Tab)
         }
         else{
          setProposeRowcount(data?.Rowcount);
        
          console.log('ProposedTab3',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }

   else if(Tab===3){

    const url=ProposedTab3Url;
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
        )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callback2(Tab)
     }
     else{
      setProposeRowcount(data?.Rowcount);
      console.log('ProposedTab3',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
else if(Tab===4){
  
  const url=value1===false?ProposedTab4Url+`startdate=${firstday}&enddate=${firstday}`:ProposedTab4Url+`${value1}&enddate=${value1}`;
  
  
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callback2(Tab,value1)
   }
   else{
    setProposeRowcount(data?.Rowcount);
  
    console.log('ProposedTab4',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
};

const ProposedReferalcount=async(Tab,value1)=>{
  if(Tab===0){
    
      const url=createdProTab0Url;
     
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackProposed(Tab)
       }
       else{
        setProposeCRowcount(data?.Rowcount);
      
        console.log('CProposedTab0',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
  else if(Tab===1){
    const url=createdProTab1Url;
     fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
       )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackProposed(Tab)
     }
     else{
      setProposeCRowcount(data?.Rowcount);
       console.log('ProposedTab1',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      })
      }
  else if(Tab===2){
    
    const url=createdProTab2Url;
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackProposed(Tab)
       }
       else{
        setProposeCRowcount(data?.Rowcount);
      
        console.log('CProposedTab3',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }

 else if(Tab===3){

  const url=createdProTab3Url;;
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
      )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackProposed(Tab)
   }
   else{
    setProposeCRowcount(data?.Rowcount);
    console.log('ProposedTab3',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
else if(Tab===4){

const url=value1===false?+createdProTab4Url+`startdate=${firstday}&enddate=${firstday}`:createdProTab4Url+`${value1}&enddate=${value1}`;


fetch(url).then(result=>{
  if(result.status===200){
  return(
     result.json()
  
  )}
  else{
    throw new Error('network request failed')
  }
}).then(data=>{
  console.log(data)
 if(data.ListOfRefferals.code==="EINVALIDSTATE"){
  callbackProposed(Tab,value1)
 }
 else{
  setProposeCRowcount(data?.Rowcount);

  console.log('ProposedTab4',data.Rowcount)
 }
  
}).catch(e=>{
    console.log(e);
  
})
  }
};

const FacilityProposedReferalList=async(Tab,value1)=>{
  if(Tab===0){
    
      const url=FacProposedTab0Url;
    fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackFaciProposed(Tab)
       }
       else{
        setFaciProposeRowcount(data?.Rowcount);
      
        console.log('FaciProposedTab0',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
  else if(Tab===1){
    
    const url=FacProposedTab1Url;
   
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackFaciProposed(Tab)
     }
     else{
      setFaciProposeRowcount(data?.Rowcount);
    
      console.log('FaciProposedTab0',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===2){
  
      const url=FacProposedTab2Url;
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackFaciProposed(Tab)
       }
       else{
        setFaciProposeRowcount(data?.Rowcount);
      
        console.log('FaciProposedTab2',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }

else if(Tab===3){
  
  const url=FacProposedTab3Url;
 
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciProposed(Tab)
   }
   else{
    setFaciProposeRowcount(data?.Rowcount);
  
    console.log('FaciProposedTab3',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
else if(Tab===4){
  
const url=value1===false?FacProposedTab4Url+`startdate=${firstday}&enddate=${firstday}`:FacProposedTab4Url+`${value1}&enddate=${value1}`;

fetch(url).then(result=>{
  if(result.status===200){
  return(
     result.json()
  
  )}
  else{
    throw new Error('network request failed')
  }
}).then(data=>{
  console.log(data)
 if(data.ListOfRefferals.code==="EINVALIDSTATE"){
  callbackFaciProposed(Tab,value1)
 }
 else{
  setFaciProposeRowcount(data?.Rowcount);

  console.log('FaciProposedTab4',data.Rowcount)
 }
  
}).catch(e=>{
    console.log(e);
  
})
  }}
  const FacilityProposedReferalcount=async(Tab,value1)=>{
    if(Tab===0){
      
        const url=createdFProTab0Url;
      fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callbackFaciCProposed(Tab)
         }
         else{
          setFaciProposeCRowcount(data?.Rowcount);
        
          console.log('FaciProposedTab0',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
    else if(Tab===1){
      
      const url=createdFProTab1Url;
     
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackFaciCProposed(Tab)
       }
       else{
        setFaciProposeCRowcount(data?.Rowcount);
      
        console.log('FaciProposedTab0',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
    else if(Tab===2){
    
        const url=createdFProTab2Url;
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callbackFaciCProposed(Tab)
         }
         else{
          setFaciProposeCRowcount(data?.Rowcount);
        
          console.log('FaciProposedTab2',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
  
  else if(Tab===3){
    
    const url=createdFProTab3Url;
   
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackFaciCProposed(Tab)
     }
     else{
      setFaciProposeCRowcount(data?.Rowcount);
    
      console.log('FaciProposedTab3',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===4){
    
  const url=value1===false?createdFProTab4Url+`startdate=${firstday}&enddate=${firstday}`:createdFProTab4Url+`${value1}&enddate=${value1}`;
  
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciCProposed(Tab,value1)
   }
   else{
    setFaciProposeCRowcount(data?.Rowcount);
  
    console.log('FaciProposedTab4',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }}

const PendingReferalList = async(Tab,value1)=>{
        if(Tab===0){

            const url=PendingTab0Url;
            fetch(url).then(result=>{
              if(result.status===200){
              return(
                 result.json()
              
              )}
              else{
                throw new Error('network request failed')
              }
            }).then(data=>{
              console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callback3(Tab)
             }
             else{
              setPendingRowcount(data?.Rowcount);
            
              console.log('PendingTab0',data.Rowcount)
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }
        else if(Tab===1){
        
           
          const url=PendingTab1Url;
         fetch(url).then(result=>{
            if(result.status===200){
            return(
               result.json()
            
            )}
            else{
              throw new Error('network request failed')
            }
          }).then(data=>{
            console.log(data)
           if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callback3(Tab)
           }
           else{
            setPendingRowcount(data?.Rowcount);
          
            console.log('PendingTab1',data.Rowcount)
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }

        else if(Tab===2){
         
          
           
            const url=PendingTab2Url;
          
            fetch(url).then(result=>{
              if(result.status===200){
              return(
                 result.json()
              
              )}
              else{
                throw new Error('network request failed')
              }
            }).then(data=>{
              console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callback3(Tab)
             }
             else{
              setPendingRowcount(data?.Rowcount);
            
              console.log('PendingTab2',data.Rowcount)
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }
        else if(Tab===3){
 
        const url=PendingTab3Url;
      
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callback3(Tab)
         }
         else{
          setPendingRowcount(data?.Rowcount);
        
          console.log('PendingTab3',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
      else if(Tab===4) {
 
        const url=value1===false?PendingTab4Url+`startdate=${firstday}&enddate=${firstday}`:PendingTab4Url+`${value1}&enddate=${value1}`;
       
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callback3(Tab,value1)
         }
         else{
          setPendingRowcount(data?.Rowcount);
        
          console.log('PendingTab4',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
        }

        const PendingReferalcount = async(Tab,value1)=>{
          if(Tab===0){
  
              const url=createdPenTab0Url;
              fetch(url).then(result=>{
                if(result.status===200){
                return(
                   result.json()
                
                )}
                else{
                  throw new Error('network request failed')
                }
              }).then(data=>{
                console.log(data)
               if(data.ListOfRefferals.code==="EINVALIDSTATE"){
                callbackCP(Tab)
               }
               else{
                setPendingCRowcount(data?.Rowcount);
              
                console.log('PendingTab0',data.Rowcount)
               }
                
              }).catch(e=>{
                  console.log(e);
                
              })
                }
          else if(Tab===1){
          
             
            const url=createdPenTab1Url;
           fetch(url).then(result=>{
              if(result.status===200){
              return(
                 result.json()
              
              )}
              else{
                throw new Error('network request failed')
              }
            }).then(data=>{
              console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callbackCP(Tab)
             }
             else{
              setPendingCRowcount(data?.Rowcount);
            
              console.log('PendingTab1',data.Rowcount)
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }
  
          else if(Tab===2){
           
            
             
              const url=createdPenTab2Url;
            
              fetch(url).then(result=>{
                if(result.status===200){
                return(
                   result.json()
                
                )}
                else{
                  throw new Error('network request failed')
                }
              }).then(data=>{
                console.log(data)
               if(data.ListOfRefferals.code==="EINVALIDSTATE"){
                callback3(Tab)
               }
               else{
                setPendingCRowcount(data?.Rowcount);
              
                console.log('PendingTab2',data.Rowcount)
               }
                
              }).catch(e=>{
                  console.log(e);
                
              })
                }
          else if(Tab===3){
   
          const url=createdPenTab3Url;
        
          fetch(url).then(result=>{
            if(result.status===200){
            return(
               result.json()
            
            )}
            else{
              throw new Error('network request failed')
            }
          }).then(data=>{
            console.log(data)
           if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callbackCA(Tab)
           }
           else{
            setPendingCRowcount(data?.Rowcount);
          
            console.log('PendingTab3',data.Rowcount)
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }
        else if(Tab===4) {
   
          const url=value1===false?createdPenTab4Url+`startdate=${firstday}&enddate=${firstday}`:createdPenTab4Url+`${value1}&enddate=${value1}`;
         
          fetch(url).then(result=>{
            if(result.status===200){
            return(
               result.json()
            
            )}
            else{
              throw new Error('network request failed')
            }
          }).then(data=>{
            console.log(data)
           if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callbackCA(Tab,value1)
           }
           else{
            setPendingCRowcount(data?.Rowcount);
          
            console.log('PendingTab4',data.Rowcount)
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }
          }

const FacilityPendingReferalList = async(Tab,value1)=>{
  if(Tab===0){
    const url=FacPendingTab0Url;
    fetch(url).then(result=>{
    if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackFaciPending(Tab)
     }
     else{
      setFaciPenRowcount(data?.Rowcount);
    
      console.log('FacPendingTab0',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===1){
  
     const url=FacPendingTab1Url;
     fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackFaciPending(Tab)
     }
     else{
      setFaciPenRowcount(data?.Rowcount);
    
      console.log('FacPendingTab1',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===2){
   
      const url=FacPendingTab2Url;
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackFaciPending(Tab)
       }
       else{
        setFaciPenRowcount(data?.Rowcount);
      
        console.log('FacPendingTab2',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
      
else if(Tab===3){

  const url=FacPendingTab3Url;
 
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciPending(Tab)
   }
   else{
    setFaciPenRowcount(data?.Rowcount);
  
    console.log('FacPendingTab3',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
else if(Tab===4) {

  const url=value1===false?FacPendingTab4Url+`startdate=${firstday}&enddate=${firstday}`:FacPendingTab4Url+`${value1}&enddate=${value1}`;
 
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciPending(Tab,value1);
   }
   else{
    setFaciPenRowcount(data?.Rowcount);
  
    console.log('FacPendingTab4',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
};

const FacilityPendingReferalcount = async(Tab,value1)=>{
  if(Tab===0){

    const url=createdFPenTab0Url;
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackFaciCPending(Tab)
     }
     else{
      setFaciPenCRowcount(data?.Rowcount);
    
      console.log('FacPendingTab0',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===1){
  
     const url=createdFPenTab1Url;
     fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackFaciCPending(Tab)
     }
     else{
      setFaciPenCRowcount(data?.Rowcount);
    
      console.log('FacPendingTab1',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===2){
   
      const url=createdFPenTab2Url;
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackFaciCPending(Tab)
       }
       else{
        setFaciPenCRowcount(data?.Rowcount);
      
        console.log('FacPendingTab2',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
      
else if(Tab===3){

  const url=createdFPenTab3Url;
 
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciCPending(Tab)
   }
   else{
    setFaciPenCRowcount(data?.Rowcount);
  
    console.log('FacPendingTab3',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
else if(Tab===4) {

  const url=value1===false?createdFPenTab4Url+`startdate=${firstday}&enddate=${firstday}`:createdFPenTab4Url+`${value1}&enddate=${value1}`;
 
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackFaciCPending(Tab,value1)
   }
   else{
    setFaciPenCRowcount(data?.Rowcount);
  
    console.log('FacPendingTab4',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
};


const DeclinedReferralList = async(Tab,value1)=>{
  if(Tab===0){
    
  const url=DeclinedTab0Url;
  
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackDeclined(Tab)
   }
   else{
    setDeclinedRowcount(data?.Rowcount);
  
    console.log('DecTab0',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
  
    else if(Tab===1){
    
       const url=DeclinedTab1Url;
       fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackDeclined(Tab)
       }
       else{
        setDeclinedRowcount(data?.Rowcount);
      
        console.log('DecTab1',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
  else if(Tab===2){
    
      const url=DeclinedTab2Url;
    
      fetch(url).then(result=>{
        if(result.status===200){
        return(
           result.json()
        
        )}
        else{
          throw new Error('network request failed')
        }
      }).then(data=>{
        console.log(data)
       if(data.ListOfRefferals.code==="EINVALIDSTATE"){
        callbackDeclined(Tab)
       }
       else{
        setDeclinedRowcount(data?.Rowcount);
      
        console.log('DecTab2',data.Rowcount)
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }

else if(Tab===3){
  const url=DeclinedTab3Url;
  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
       )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackDeclined(Tab)
   }
   else{
    setDeclinedRowcount(data?.Rowcount);
     console.log('DecTab3',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
else if(Tab===4) {

  const url=value1===false?DeclinedTab4Url+`startdate=${firstday}&enddate=${firstday}`:DeclinedTab4Url+`${value1}&enddate=${value1}`;

  fetch(url).then(result=>{
    if(result.status===200){
    return(
       result.json()
    
    )}
    else{
      throw new Error('network request failed')
    }
  }).then(data=>{
    console.log(data)
   if(data.ListOfRefferals.code==="EINVALIDSTATE"){
    callbackDeclined(Tab,value1);
   }
   else{
    setDeclinedRowcount(data?.Rowcount);
  
    console.log('DecTab4',data.Rowcount)
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
  }



  const DeclinedReferralcount = async(Tab,value1)=>{
    if(Tab===0){
      
    const url=createdDecTab0Url;
    
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackDeclined(Tab)
     }
     else{
      setDeclinedCRowcount(data?.Rowcount);
    
      console.log('DecTab0',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
    
      else if(Tab===1){
      
         const url=createdDecTab1Url;
         fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callbackDeclined(Tab)
         }
         else{
          setDeclinedCRowcount(data?.Rowcount);
        
          console.log('DecTab1',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
    else if(Tab===2){
      
        const url=createdDecTab2Url;
      
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callbackDeclined(Tab)
         }
         else{
          setDeclinedCRowcount(data?.Rowcount);
        
          console.log('DecTab2',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
  
  else if(Tab===3){
    const url=createdDecTab3Url;
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
         )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackDeclined(Tab)
     }
     else{
      setDeclinedCRowcount(data?.Rowcount);
       console.log('DecTab3',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
  else if(Tab===4) {
  
    const url=value1===false?createdDecTab4Url+`startdate=${firstday}&enddate=${firstday}`:createdDecTab4Url+`${value1}&enddate=${value1}`;
  
    fetch(url).then(result=>{
      if(result.status===200){
      return(
         result.json()
      
      )}
      else{
        throw new Error('network request failed')
      }
    }).then(data=>{
      console.log(data)
     if(data.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackDeclined(Tab,value1)
     }
     else{
      setDeclinedCRowcount(data?.Rowcount);
    
      console.log('DecTab4',data.Rowcount)
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }
    }
  



      const FacilityDeclinedReferalList = async(Tab,value1)=>{
        if(Tab===0){
          
           const url=FacDeclinedTab0Url;
           
           fetch(url).then(result=>{
            if(result.status===200){
            return(
               result.json()
            
            )}
            else{
              throw new Error('network request failed')
            }
          }).then(data=>{
            console.log(data)
           if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callbackFaciDeclined(Tab)
           }
           else{
            setFaciDecRowcount(data?.Rowcount);
          
            console.log('FaciDecTab0',data.Rowcount)
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }
      
        else if(Tab===1){
         
          const url=FacDeclinedTab1Url;
          fetch(url).then(result=>{
            if(result.status===200){
            return(
               result.json()
            
            )}
            else{
              throw new Error('network request failed')
            }
          }).then(data=>{
            console.log(data)
           if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callbackFaciDeclined(Tab)
           }
           else{
            setFaciDecRowcount(data?.Rowcount);
          
            console.log('FaciDecTab1',data.Rowcount)
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }
      
        else if(Tab===2){
          const url=FacDeclinedTab2Url;
          fetch(url).then(result=>{
            if(result.status===200){
            return(
               result.json()
            
            )}
            else{
              throw new Error('network request failed')
            }
          }).then(data=>{
            console.log(data)
           if(data.ListOfRefferals.code==="EINVALIDSTATE"){
            callbackFaciDeclined(Tab)
           }
           else{
            setFaciDecRowcount(data?.Rowcount);
          
            console.log('FaciDecTab2',data.Rowcount)
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }
      
      else if(Tab===3){
      
        const url=FacDeclinedTab3Url;
       fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callbackFaciDeclined(Tab)
         }
         else{
          setFaciDecRowcount(data?.Rowcount);
         console.log('FaciDecTab3',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }
           
      else if(Tab===4) {
      
        const url=value1===false?FacDeclinedTab4Url+`startdate=${firstday}&enddate=${firstday}`:FacDeclinedTab4Url+`${value1}&enddate=${value1}`;
      
        fetch(url).then(result=>{
          if(result.status===200){
          return(
             result.json()
          
          )}
          else{
            throw new Error('network request failed')
           
          }
        }).then(data=>{
          console.log(data)
         if(data.ListOfRefferals.code==="EINVALIDSTATE"){
          callbackFaciDeclined(Tab,value1);
         }
         else{
          setFaciDecRowcount(data?.Rowcount);
        
          console.log('FaciDecTab4',data.Rowcount)
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }}
          const FacilityCDeclinedReferalList = async(Tab,value1)=>{
            if(Tab===0){
              
               const url=createdFDecTab0Url;
               
               fetch(url).then(result=>{
                if(result.status===200){
                return(
                   result.json()
                
                )}
                else{
                  throw new Error('network request failed')
                }
              }).then(data=>{
                console.log(data)
               if(data.ListOfRefferals.code==="EINVALIDSTATE"){
                callbackCFaciDeclined(Tab)
               }
               else{
                setFaciDecCRowcount(data?.Rowcount);
              
                console.log('FaciDecTab0',data.Rowcount)
               }
                
              }).catch(e=>{
                  console.log(e);
                
              })
                }
          
            else if(Tab===1){
             
              const url=createdFDecTab1Url;
              fetch(url).then(result=>{
                if(result.status===200){
                return(
                   result.json()
                
                )}
                else{
                  throw new Error('network request failed')
                }
              }).then(data=>{
                console.log(data)
               if(data.ListOfRefferals.code==="EINVALIDSTATE"){
                callbackCFaciDeclined(Tab)
               }
               else{
                setFaciDecCRowcount(data?.Rowcount);
              
                console.log('FaciDecTab1',data.Rowcount)
               }
                
              }).catch(e=>{
                  console.log(e);
                
              })
                }
          
            else if(Tab===2){
              const url=createdFDecTab2Url;
              fetch(url).then(result=>{
                if(result.status===200){
                return(
                   result.json()
                
                )}
                else{
                  throw new Error('network request failed')
                }
              }).then(data=>{
                console.log(data)
               if(data.ListOfRefferals.code==="EINVALIDSTATE"){
                callbackCFaciDeclined(Tab)
               }
               else{
                setFaciDecCRowcount(data?.Rowcount);
              
                console.log('FaciDecTab2',data.Rowcount)
               }
                
              }).catch(e=>{
                  console.log(e);
                
              })
                }
          
          else if(Tab===3){
          
            const url=createdFDecTab3Url;
           fetch(url).then(result=>{
              if(result.status===200){
              return(
                 result.json()
              
              )}
              else{
                throw new Error('network request failed')
              }
            }).then(data=>{
              console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callbackCFaciDeclined(Tab)
             }
             else{
              setFaciDecCRowcount(data?.Rowcount);
             console.log('FaciDecTab3',data.Rowcount)
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }
               
          else if(Tab===4) {
          
            const url=value1===false?createdFDecTab4Url+`startdate=${firstday}&enddate=${firstday}`:createdFDecTab4Url+`${value1}&enddate=${value1}`;
          
            fetch(url).then(result=>{
              if(result.status===200){
              return(
                 result.json()
              
              )}
              else{
                throw new Error('network request failed')
               
              }
            }).then(data=>{
              console.log(data)
             if(data.ListOfRefferals.code==="EINVALIDSTATE"){
              callbackFaciDeclined(Tab,value1);
             }
             else{
              setFaciDecRowcount(data?.Rowcount);
            
              console.log('FaciDecTab4',data.Rowcount)
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }}
    
          

const TabRowcount=(Tab)=>{
  AcceptedReferalList(Tab)

  TransitionalReferralList(Tab)
  
  PendingReferalList(Tab)
  ProposedReferalList(Tab)
  FacilityCDeclinedReferalList(Tab)
  DeclinedReferralcount(Tab)
  FacilityAcceptedReferalList(Tab)
  FacilityPendingReferalList(Tab)
  FacilityDeclinedReferalList(Tab)
  FacilityProposedReferalList(Tab)
  setSelectedTab(Tab)
  DeclinedReferralList(Tab)
  
  if(Scribe==="Hospitalist"){
  CreatedAcceptedReferral(Tab);
  FacilityAcceptedcount(Tab);
  ProposedReferalcount(Tab);
  PendingReferalcount(Tab);
  FacilityPendingReferalcount(Tab);
  FacilityProposedReferalcount(Tab);
  DeclinedReferralcount(Tab);
  FacilityCDeclinedReferalList(Tab);  
}

}

      const transitionAnimation = index => {
        return {
          transform: [
            { perspective: 800 },
            {
              scale: xOffset.interpolate({
                inputRange: [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH
                ],
                outputRange: [0, 1, 0]
              })
            },
            {
              rotateX: xOffset.interpolate({
                inputRange: [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH
                ],
                outputRange: ["45deg", "0deg", "45deg"]
              })
            },
            {
              rotateY: xOffset.interpolate({
                inputRange: [
                  (index - 1) * SCREEN_WIDTH,
                  index * SCREEN_WIDTH,
                  (index + 1) * SCREEN_WIDTH
                ],
                outputRange: ["-45deg", "0deg", "45deg"]
              })
            }
          ]
        };
      };
    
      const xOffset = new Animated.Value(0);
      const scrollOffset = useSharedValue(0);
      const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
          scrollOffset.value = event.contentOffset.x;
        },
      });
   

    const width= Math.round(Dimensions.get('window').width)

   

    setTimeout(() => {
      setspinner(false)
    }, 1000);


//pull up referesh indicator function

    const onRefresh =() => {

      TimerReferralList();
      const Tab=selectedTab
     NotificationLog();
      setRefreshing(true);
      const value1=date1
    AcceptedReferalList(Tab,value1);
    PendingReferalList(Tab,value1);
    ProposedReferalList(Tab,value1);
                  
    
    TransitionalReferralList(Tab,value1);
    OPReferralList();
    

    FacilityAcceptedReferalList(Tab,value1);
    FacilityPendingReferalList(Tab,value1);
    FacilityProposedReferalList(Tab,value1);
    FacilityDeclinedReferalList(Tab,value1);
    DeclinedReferralList(Tab,value1);
if(Scribe==="Hospitalist"){
    CreatedAcceptedReferral(Tab,value1);
    PendingReferalcount(Tab,value1);
    ProposedReferalcount(Tab,value1);
    FacilityAcceptedcount(Tab,value1);
    FacilityPendingReferalcount(Tab,value1);
  FacilityProposedReferalcount(Tab,value1); 
    DeclinedReferralcount(Tab,value1);  
    FacilityCDeclinedReferalList(Tab,value1);   
}
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    };   

   
    const navigation1 = useNavigation();

    const clearAll = async () => {
      try {
      await AsyncStorage.clear();
      console.log('Done');
      navigation1.dispatch(StackActions.replace('Login'));
      } catch (error) {
      console.log(error);
      }
      };
    const displayDeleteAlert = () => {
      Alert.alert(
        'Are You Sure!',
        'Logout!',
        [
          {
            text: 'Logout',
            onPress: clearAll,
          },
          {
            text: 'No Thanks',
            onPress: () => console.log('ok'),
          },
        ],
        {
          cancelable: true,
        }
      );
    };


    // const rotateTransform=(index)=> {
    //   return {
    //     transform: [{
    //       rotate: xOffset.interpolate({
    //         inputRange: [
    //           (index - 1) * SCREEN_WIDTH, 
    //           index * SCREEN_WIDTH, 
    //           (index + 1) * SCREEN_WIDTH
    //         ],
    //         outputRange: ['30deg', '0deg', '-30deg'],
    //       })
    //     }]
    //   };
    // }


  
  

   

    const ItemView = ( item,index,dur)  => {
    
    
       
        return (

 <Animated.View 
        
            style={[styles.scrollPage,{backgroundColor:'transparent',borderWidth:0,width:responsiveWidth(100),padding:responsiveWidth(5)}]}
>

     <View style={{backgroundColor:'white',padding:responsiveWidth(5),borderRadius:8,borderWidth:0}}>
                <View>

               {TimerList[index+1]?(
                    <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'SpaceGrotesk-Regular',width:responsiveWidth(70),borderWidth:0}}>Next:Telemed-{Accepted[index+1]?.SpecialtyType}</Text>
                    ):(
                      <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'SpaceGrotesk-Regular',borderWidth:0}}>Next:</Text>
                    )}
                    <Text style={{ fontSize: 12, color: '#333333',alignSelf:'flex-end',position:'absolute',fontFamily: 'SpaceGrotesk-Regular' }}>{moment(item?.AppointmentTime,"HH:mm:ss").format('hh:mm A')}</Text>
                </View>
                <View style={{marginTop:30,justifyContent:'center',alignItems:'center' }}>

                    <CountdownCircleTimer
                  
                        isPlaying
                        size={110}
                        duration={dur}
                        colors={[
                          ["#e6c402", 0.05],
                          ["#ff0000", 0.20],
                          ['#990e17',0.60]
                         
                        ]}
                        
                     isLinearGradient={true}
                        
                    >
                        {({ remainingTime }) => {
                            const hours = Math.floor(remainingTime / 3600)
                            const minutes = Math.floor((remainingTime % 3600) / 60)
                            const seconds = remainingTime % 60

                            const Time=`${moment(hours,'H').format('HH')}:${moment(minutes,'m').format('mm')}`
                 
             
                            const Time1=`${moment(minutes,'m').format('mm')}:${moment(seconds,'ss').format('ss')}`

                           // return (<Text style={{ color: '#333333', fontSize: scale(20),fontFamily: 'SpaceGrotesk-Regular' }}>{moment(remainingTime).format(hours + ":" + minutes + ":" + seconds)}</Text>)
                           if(hours===0){
                            return  (
                              
                           <View>
                            
                            <Text style={{ color: '#333333', fontSize: 22,fontFamily: 'SpaceGrotesk-Regular' }}>{Time1}</Text>
                           <Text style={{fontSize: 12,alignSelf:'center',color:'#808080',fontFamily: 'SpaceGrotesk-Regular'}}>Minutes</Text>
                            </View>
                            )
                         }
                  else{
                  return  (
                              
                  <View>
       
            <Text style={{ color: '#333333', fontSize: 22,fontFamily: 'SpaceGrotesk-Regular' }}>{Time}</Text>
         <Text style={{fontSize: 12,alignSelf:'center',color:'#808080',fontFamily: 'SpaceGrotesk-Regular'}}>Hours</Text>
        </View>
                     )}
                        }}
                    </CountdownCircleTimer>

                    <Text style={{ color: '#333333', alignSelf: 'center', fontSize: 17, marginTop:15,left:0 ,fontFamily: 'SpaceGrotesk-Regular'}}>{item?.LocationTypeName}</Text>
                </View>
                
                <View style={{marginTop:18,marginBottom:18,justifyContent:'center'}}>
<TouchableOpacity style={{borderWidth:0,width:responsiveWidth(25)}} 
onPress={()=> Linking.openURL(item.PatientLink)} >
                    <Text style={{ fontSize: 12, color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular'}}>Patient Chart</Text>
                   
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setselectedId(index)
                    ImReady(item);
                    }} style={{alignSelf:'center',position:'absolute'}}>
                    <View >
                    <Text  style={{paddingLeft:15,paddingRight:15,paddingTop:7,paddingBottom:7,borderRadius:7, fontSize: 12, color:selectedId===index?"white": '#11266c', backgroundColor: selectedId===index?"green":'#e6c402', borderColor: '#333333',fontFamily: 'SpaceGrotesk-Regular' }}>I'm Ready</Text>
                    </View>
                    </TouchableOpacity>
                   {selectedId===index&&(
                    <TouchableOpacity onPress={()=> Linking.openURL(item.MeetingLink)} style={{alignSelf:'center',position:'absolute',top:30}}>
                    <View >
                    <Text  style={{paddingLeft:32,paddingRight:32,paddingTop:7,paddingBottom:7,borderRadius:5, fontSize: 12, color: '#11266c', backgroundColor: '#e6c402', borderColor: '#333333',fontFamily: 'SpaceGrotesk-Regular' }}>Join</Text>
                    </View>
                    </TouchableOpacity>
                    )}
                   <TouchableOpacity style={{alignSelf:'flex-end',position:'absolute',borderWidth:0}} onPress={()=>navigation.navigate('DetailView',{item,ID:ID,VisitTypeId:"1000",Scribe})}>
                    <Text style={{ fontSize: 12, color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular' }}>Particulars</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Animated.View>
        )
    }

    const ItemView1 = ( item,index,dur)  => {
    
     
       
     
      return (

  <Animatable.View 
        
          style={[styles.scrollPage,{backgroundColor:'transparent',borderWidth:0,width:responsiveWidth(100),padding:responsiveWidth(5)}]}
         
              >
                
              <View style={{backgroundColor:'white',padding:responsiveWidth(5),borderRadius:8,borderWidth:0,}}>
              <View>
                  <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'SpaceGrotesk-Regular',width:responsiveWidth(50),borderWidth:0}}>Next:</Text>
                  <Text style={{ fontSize: 12, color: '#333333',alignSelf:'flex-end',position:'absolute',fontFamily: 'SpaceGrotesk-Regular' }}></Text>
              </View>
              <View style={{  marginTop:30,justifyContent:'center',alignItems:'center' }}>

                  <CountdownCircleTimer
                      isPlaying
                      size={110}
                      duration={0}
                      colors={[
                        ['#e6c402', 0.2],
                        ['#ff0000', 0.2],
                        ['#990e17',0.6]]}
                      isLinearGradient={true}
                  >
                      {({ remainingTime }) => {
                          const hours = Math.floor(remainingTime / 3600)
                          const minutes = Math.floor((remainingTime % 3600) / 60)
                          const seconds = remainingTime % 60

                          return (<Text style={{ color: '#333333', fontSize: 22,fontFamily: 'SpaceGrotesk-Regular' }}>0:0:0</Text>)
                      }}
                  </CountdownCircleTimer>

                  <Text style={{ color: '#333333', alignSelf: 'center', fontSize: 22, marginTop:10,left:0 ,fontFamily: 'SpaceGrotesk-Regular'}}></Text>
              </View>
               <View style={{marginTop:16,width:"100%",marginBottom:16,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{ fontSize: 12, color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular',alignSelf:'flex-start' }}>Patient Chart</Text>
                  <View style={{alignSelf:'center',position:'absolute'}}>
                  <Text  style={{paddingLeft:12,paddingRight:12,paddingTop:5,paddingBottom:5,borderRadius:5, fontSize: 12, color: '#11266c', backgroundColor: '#e6c402', borderColor: '#333333',fontFamily: 'SpaceGrotesk-Regular' }}>I'm Ready</Text>
                  </View>
                 
                 
                  <Text style={{ fontSize: 12,alignSelf:'flex-end',position:'absolute', color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular' }}>Particulars</Text>
              </View>
              </View>
          </Animatable.View>
      )
  }

  const slideout=()=>{
  
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); //Automatically animates views 
      SetShowInfo(!showInfo);
    }
    const slideout1=()=>{
  
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      SetShowContact(!showContact) 
      }
      const slideout2=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowSpecial(!showSpecial)
        }
        const slideout3=()=>{
  
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShowDeclined(!showDeclined)
          }
          const slideout4=()=>{
  
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setshowResponse(!showResponse)
            }
            const slideout5=()=>{
  
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setshowResponsefacility(!showResponsefacility)
              }


  return (
    <View style={{flex:1}}>
       <ConnectionMessgeScreen/>
    
    <SafeAreaView style={{flex:1,backgroundColor:'#11266c'}}>
      
       <View style={[styles.Header,{paddingLeft:responsiveWidth(5),paddingRight:responsiveWidth(5)}]}>
       <Spinner
          visible={spinner}
          textContent={'Loading...'}  //Loading spinner
          textStyle={{color:'white'}}
        /> 
        <View style={styles.HeaderInnerLeft}>
       
          <TouchableOpacity   onPress={()=>menu()} style={{}} >
                <Entypo style={{}} name='menu' color={'#e6c402'} size={22} />
                </TouchableOpacity>
                <Text style={[styles.HeaderText]}><Text style={{ fontStyle: 'italic'}}>Vis<Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Doc</Text></Text></Text>
                </View>
              <View style={styles.HeaderInnerRight}>
              <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 60,
            height: 30,
            borderRadius: 30,
            padding: 4,
            backgroundColor: SelectedToggle==='On'
              ? "green"
              : "#808080",
          }}
          onPress={()=>toggleHandle()}
        >
          <Animated.View style={{
            width: 23,
            height: 23,
            backgroundColor:'white',
            borderRadius: 30,
            transform: [{
              translateX: animatedValue
            }]
          }} />
        </TouchableOpacity>
             
              <TouchableOpacity onPress={()=>navigation.navigate('ProviderNotification',{ID,Scribe})} style={{ marginLeft:responsiveWidth(5),flexDirection:'row',marginRight:responsiveWidth(5)}}>
              <MaterialIcons  name='notifications-none' color={'#e6c402'} size={22}/>
             {count!=0&&(  
               <View style={{borderRadius:10,height:16,backgroundColor:'red',left:-5,top:-8,alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:10,color:'white',paddingHorizontal:5}}>{count}</Text>
             </View>
             )}  
             </TouchableOpacity>
                 {Scribe==="Hospitalist"&&(
                <TouchableOpacity onPress={()=>navigation.navigate('CreateAppointment',{ID,Scribe})}>
                  <View style={{height:50,width:50,backgroundColor:'green',marginTop:8,alignItems:'center',justifyContent:'center',borderRadius:8}}>
                  <Image source={require('../../images/png2.png')}
                  style={{height:30,width:30,tintColor:'white'}}
                  />
                  </View>
              
                </TouchableOpacity>
                )}
               
                </View>
               </View>

           <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{ color: '#eaeaea', 
                marginLeft: responsiveWidth(5),
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}>Appointments</Text>
                
                {selectedTab=== 0 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(firstday,"YYYY-MM-DD").format('MMM DD')}</Text>
                 )}
                  {selectedTab=== 1 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(tomorrow,"YYYY-MM-DD").format('MMM DD')}</Text>
                 )}
                  {selectedTab=== 2 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(firstday,'YYYY-MM-DD').format('MMM DD')}-{moment(lastday,'YYYY-MM-DD').format('MMM DD')}</Text>
                 )}
                  {selectedTab=== 4 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(date).format('MMM DD')}</Text>
                 )}

                 </View>
        
            <View style={[styles.TabContainer,{paddingLeft:responsiveWidth(5),paddingRight:responsiveWidth(5)}]}>
                <View style={{flexDirection:'row'}}>

                <TouchableOpacity onPress={() => { 
                const Tab=0
              TabRowcount(Tab)
                }} style={[styles.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                    <Text style={styles.TabText}>Today</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                const Tab=1
              TabRowcount(Tab)
                }} style={[styles.Tab,{marginLeft:12, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                    <Text style={styles.TabText}>Tomorrow</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { 
                const Tab=2
             TabRowcount(Tab)
                }} style={[styles.Tab,{marginLeft:12, backgroundColor: selectedTab == 2 ? '#eaeaea' : '#e6c402'}] }>
                    <Text style={styles.TabText}>Week</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { 
                const Tab=3
                TabRowcount(Tab)
              
                 }} style={[styles.Tab,{ marginLeft:12,backgroundColor: selectedTab == 3 ? '#eaeaea' : '#e6c402'}] }>
                    <Text style={styles.TabText}>All</Text>
                </TouchableOpacity>
             </View>
                <TouchableOpacity onPress={() => { setSelectedTab(4); setOpen(true) }}>
                    <Feather style={{ color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='calendar' size={32} />
                    <DatePicker
                    style={{  fontFamily: 'SpaceGrotesk-Regular',}}
                        mode='date'
                        modal
                        minimumDate={new Date()}
                        open={open}
                        date={date}
                        onConfirm={value => {
                            setOpen(false)
                            setDate(value)
                            setDate1(moment(value).format("YYYY-MM-DD"))
                            const Tab=4
                            var value1=moment(value).format("YYYY-MM-DD")
                            AcceptedReferalList(Tab,value1)
                            PendingReferalList(Tab,value1)
                            ProposedReferalList(Tab,value1)
                            FacilityAcceptedReferalList(Tab,value1)
                            FacilityPendingReferalList(Tab,value1);
                            FacilityProposedReferalList(Tab,value1);
                            FacilityDeclinedReferalList(Tab,value1);
                            DeclinedReferralList(Tab,value1);
                            TransitionalReferralList(Tab,value1);

                            if(Scribe==='Hospitalist'){
                            CreatedAcceptedReferral(Tab,value1);
                            PendingReferalcount(Tab,value1);
                            ProposedReferalcount(Tab,value1);
                            FacilityAcceptedcount(Tab,value1);
                            FacilityPendingReferalcount(Tab,value1);
                            FacilityProposedReferalcount(Tab,value1);
                            DeclinedReferralcount(Tab,value1);
                           DeclinedReferralcount(Tab,value1);
                           FacilityCDeclinedReferalList(Tab,value1); 
                          }

                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                  
                </TouchableOpacity>
                </View>
            

           
            <ScrollView
            showsVerticalScrollIndicator={false}
           
        //  alwaysBounceVertical={false}
        scrollsToTop={true}
            refreshControl={
              <RefreshControl
            
                progressViewOffset={progressViewOffset}
               
             
               refreshing={refreshing} onRefresh={()=>onRefresh()} />
             
            }>

            <View style={{backgroundColor:'#dcdcdc',borderRadius:8,marginTop:150,borderWidth:0}}>
            <View style={{marginTop:-165,borderWidth:0,}}>
          
       
       
          <Animated.ScrollView
          snapToInterval={width}
           scrollEventThrottle={1}
           decelerationRate="fast"

           onScroll={Animated.event(
             [{ nativeEvent:
              
               { 
                //contentInset: {bottom:0, left:0, right:0, top:0},
                contentOffset: { x: xOffset } } }],
             { useNativeDriver: true }
           )}
         
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          >
          
        { TimerList?.sort((a,b)=> a.AppointmentTime > b.AppointmentTime ? 1 : -1)

          .map((item,index)=>{
          

           

             const time1=item?.AppointmentTime
             const time=time1
             const split=time.split('')
            // console.log(`${split[0]}${split[1]}`)
           //  console.log(split[1])
             const apptime=moment(time,"HH:mm:ss").format('HH')
             const appmin=moment(time,"HH:mm:ss").format('mm')
             const current=new Date().getHours()
             const min=new Date().getMinutes()
             const addcurmin=(Math.abs(minsplit-min))*60
             const housplit=`${split[0]}${split[1]}`
             const minsplit=`${split[3]}${split[4]}`
             const addgivhour=((apptime-current))*3600
             let dur1=addgivhour+((appmin-min)*60)
             
             const dur=dur1<0?0:dur1
            return(
            
             
              <Animated.View key={item.AppointmentId} style={{borderWidth:0}} >
                
                   {TimerList ? ItemView(item,index,dur):null}
                                
                    </Animated.View>
                   )   })}

            {(ListRowcount===0)&&(    
              <View>
            {ItemView1()}
          </View>
          )}
          </Animated.ScrollView>
          </View>
         
          
        <View style={{paddingLeft:responsiveWidth(5),
            paddingRight:responsiveWidth(5),
            paddingBottom:responsiveHeight(20),
            
            position:'relative'
            }}>
            
                <TouchableOpacity  onPress={()=>{slideout()}} style={[styles.detailflow,{marginTop:responsiveHeight(2)}]}>
                    {showInfo?(
                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )}
                    <View style={[styles.content,{width:responsiveWidth(50)}]}>
                     <Text style={styles.ContentTitle}>Accepted</Text>
                     </View>
                     {!showInfo&&(
                      <Text style={{ color: '#333333',fontSize:17,fontFamily: 'SpaceGrotesk-Regular'}}>{Rowcount+FacilityRowcount+TransitionalRowcount+OPRowcount}</Text>
                      )}
                </TouchableOpacity>
                {!showInfo&&(
                <View style={styles.Line}/>
                )}
                {
                    showInfo ? (
                        <Animated.View >
                      
                           <TouchableOpacity onPress={()=>ToAccepted()}>
                            <Animated.View style={styles.innercontent}>
                                <Text style={styles.InnercontentText1}>Telemed</Text>
                                
                            <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{Rowcount} </Text>  
                            
                             <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                             </Animated.View>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={()=>FacilityAccepted()}>
                             <View style={styles.innercontent}>
                                <Text style={styles.InnercontentText1}>Facility Visit</Text>
                                
                            <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FacilityRowcount} </Text>  
                            
                             <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                             </View>
                             </TouchableOpacity>
                          
                            <TouchableOpacity onPress={()=>TcmAccepted()}>
                            <Animated.View style={styles.innercontent}>
                                <Text style={styles.InnercontentText1}>TCM</Text>
                            <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{TransitionalRowcount}</Text>
                                 <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                                 </Animated.View>
                                 </TouchableOpacity>   
                           
                             <TouchableOpacity onPress={()=>navigation.navigate("OutPatientReferralList",{ID,Scribe})}>   
                            <View style={styles.innercontent}>
                           <Text style={styles.InnercontentText1}>Out Patient</Text>
                            <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{OPRowcount}</Text>  
                              <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                              </View>
                              </TouchableOpacity> 
                            
                     
                        </Animated.View>

                    ) : null
                }
                <TouchableOpacity style={[styles.detailflow,{marginTop:responsiveHeight(2)}]} onPress={() => { slideout1()}}>
                   {showContact?(
                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )}
                    <View style={[styles.content,{width:responsiveWidth(50)}]}>
                    <Text style={styles.ContentTitle}>Proposed</Text>
                    </View>
                    {!showContact&&(
                    <Text style={{ color: '#333333',fontSize:17,fontFamily: 'SpaceGrotesk-Regular' }}>{ProposedRowcount+FaciProposeRowcount}</Text>
                    )}
                </TouchableOpacity>
                {!showContact&&(
                <View style={styles.Line}/>
                )}
                {
                    showContact ? (
                      
                        <View style={{  }}>
                             <TouchableOpacity onPress={()=>ToProposed()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Telemed</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{ProposedRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                         <TouchableOpacity onPress={()=>FacilityProposed()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Facility Visit</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciProposeRowcount}</Text>
                                <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                                </View>
                                </TouchableOpacity>
                       {  //  <View style={styles.innercontent}>
                         // <Text style={styles.InnercontentText1}>Out Patient</Text>
                          // <Text style={styles.InnercontentText2}>00 </Text>  
                           //  <Feather style={{ color: 'black'}} name='chevron-right' size={scale(17)}/>
                           //  </View>
                       }
                       </View>
                       

                    ) : null
                }
                 <TouchableOpacity style={[styles.detailflow,{marginTop:responsiveHeight(2)}]} onPress={() => {slideout2() }}>
                   {showSpecial?(
                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )}
                   <View style={[styles.content,{width:responsiveWidth(50)}]}>
                    <Text style={styles.ContentTitle}>Pending</Text>
                    </View>
                    {!showSpecial&&(
                    <Text style={{ color: '#333333',fontSize:17,fontFamily: 'SpaceGrotesk-Regular' }}>{PendingRowcount+FaciPenRowcount}</Text>
                    )}
                  </TouchableOpacity>
                {!showSpecial&&(
                <View style={[styles.Line,]}/>
                )}
                {
                    showSpecial ? (
                       
                        <View style={{  }}>
                            <TouchableOpacity onPress={()=>ToPending()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Telemed</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{PendingRowcount} </Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>FacilityPending()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Facility Visit</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciPenRowcount}</Text>
                                <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                                </View>
                                </TouchableOpacity>
                           
                       </View>
                  
                    ) : null
                }
                <TouchableOpacity style={[styles.detailflow,{marginTop:responsiveHeight(2)}]}onPress={() =>{slideout3()} }>
                {showDeclined?(
                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )} 
                  <View style={[styles.content,{width:responsiveWidth(50)}]}>
                    <Text style={styles.ContentTitle}>Declined</Text>
                    </View>
                    {!showDeclined&&(
                    <Text style={{ color: '#333333',fontSize:17,fontFamily: 'SpaceGrotesk-Regular' }}>{DeclinedRowcount+FaciDecRowcount}</Text>
                    )}
                </TouchableOpacity>
                {!showDeclined&&(
                <View style={[styles.Line,{marginBottom:Scribe==='Provider'?50:0}]}/>
                )}
                {
                    showDeclined ? (
                        
                         <View style={{  }}>
                           
                           <TouchableOpacity onPress={()=>ToDeclined()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Telemed</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{DeclinedRowcount} </Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>ToFacilityDeclined()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Facility Visit</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciDecRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                           
                       </View>
                  
                    ) : null
                }
                {Scribe==="Hospitalist"&&(
                   <TouchableOpacity style={[styles.detailflow,{marginTop:responsiveHeight(2)}]}onPress={() =>{slideout4()} }>
                {showResponse?(
                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )} 
                  <View style={[styles.content,{width:responsiveWidth(50)}]}>
                    <Text style={styles.ContentTitle}>Telemed By Me</Text>
                    </View>
                    {!showResponse&&(
                    <Text style={{ color: '#333333',fontSize:17,fontFamily: 'SpaceGrotesk-Regular' }}>{CRowcount+ProposedCRowcount+PendingCRowcount+DeclinedCRowcount}</Text>
                    )}
                </TouchableOpacity>
                )}
                {Scribe==="Hospitalist"&&(
                <View >
                {!showResponse&&(
                <View style={[styles.Line]}/>
                )}
                </View>
                )}
                {
                    showResponse ? (
                        
                         <View style={{  }}>
                           
                           <TouchableOpacity onPress={()=>TocreatedAccepted()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Provider(s) Accepted</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{CRowcount} </Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>TocreatedProposed()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Proposed</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{ProposedCRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>TocreatedPending()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Pending</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{PendingCRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>TocreatedDeclined()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Declined</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{DeclinedCRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                           
                       </View>
                  
                    ) : null
                }
                 
                 {Scribe==="Hospitalist"&&(
                  <TouchableOpacity style={[styles.detailflow,{marginTop:responsiveHeight(2)}]}onPress={() =>{slideout5()} }>
                {showResponsefacility?(
                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )} 
                    
                  <View style={[styles.content,{width:responsiveWidth(50)}]}>
                    <Text style={styles.ContentTitle}>Facility Visit By Me</Text>
                    </View>
                    {!showResponsefacility&&(
                    <Text style={{ color: '#333333',fontSize:17,fontFamily: 'SpaceGrotesk-Regular' }}>{FaciPenCRowcount+FaciProposeCRowcount+FacilityCRowcount+FaciDecCRowcount}</Text>
                    )}
                     
                </TouchableOpacity>
                 )}
                 {Scribe==="Hospitalist"&&(
                 <View >
                  {!showResponsefacility&&(
                <View style={[styles.Line,{marginBottom:60}]}/>
                )}
                </View>
                )}
              
                {
                    showResponsefacility ? (
                        
                         <View style={{  }}>
                           
                           <TouchableOpacity onPress={()=>TocreatedFAccepted()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Provider(s) Accepted</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FacilityCRowcount} </Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>TocreatedFProposed()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Proposed</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciProposeCRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>TocreatedFPending()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Pending</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciPenCRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>TocreatedFDeclined()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Declined</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciDecCRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                           
                       </View>
                  
                    ) : null
                }
              </View>
            </View>
            </ScrollView>
    </SafeAreaView>
    
    </View>
   
  )
}

export default Appointments

const styles = StyleSheet.create({
viewstyle:{
    width:AppDimensions.FULL_WIDTH,marginLeft: 16,marginRight:16,marginTop:16,marginBottom:16,borderWidth:1,backgroundColor:'#eaeaea'
},
ContentTitle:{
    color: '#333333',
     fontSize: 17,
     fontFamily: 'SpaceGrotesk-Regular',
     paddingLeft:0 
},
detailflow:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:5,
    marginBottom:5
    
},
Minus:{
    color: '#e6c402', fontSize: 35 ,fontFamily: 'SpaceGrotesk-Regular',top:-2
},
Plus:{
    color: '#e6c402', fontSize: 35 ,fontFamily: 'SpaceGrotesk-Regular'
},
scrollPage: {
    
    padding: 20,
 
    backgroundColor:'#eaeaea'

  },
  PlusButton:{  
    height:60,
    width:60,
    backgroundColor:'green',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center'
  },
 
    Line:{
        borderBottomColor:'#333333',
        borderBottomWidth:1,
        height:5
    },
    content:{
        width:200,
        paddingLeft:10,
        
        borderWidth:0
      
    },
    innercontent:{
        flexDirection:"row",
        alignItems:'center',
        marginLeft:25,
        marginRight:10,
        borderWidth:0,
        paddingTop:5,
        borderWidth:0,
        paddingBottom:5,
        justifyContent:'space-between'
    },
    TabContainer:{
        flexDirection:'row',
        borderWidth:0,
        
        justifyContent:'space-between',
        padding:16,
        alignItems:'center' 
    },
    Tab:{
       paddingHorizontal:12,
      
        alignItems:'center',
        justifyContent:'center',
         borderColor: 'gray',
          borderWidth: 0.5,
           height:36,
            borderRadius: 8 
        },
    TabText:{
        color: '#11266c', 
        fontSize: 12,
       
        textAlign: 'center',
        fontFamily: 'SpaceGrotesk-Regular'

    },
    Header:{
        alignItems:'center',flexDirection:"row" ,justifyContent:'space-between',width:"100%"

    },
    HeaderInnerLeft:{
        flexDirection:'row',
        height:50,
        borderWidth:0,
        alignItems:'center',
        //paddingHorizontal:moderateScale(16)
      

    },
    HeaderText:{
        color: '#eaeaea',
         fontFamily: 'SpaceGrotesk-Regular', 
         fontSize:22,
         paddingLeft:16
    },
    HeaderInnerRight:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0,
      

    },
    InnercontentText1:{
        color: '#808080', fontSize: 12 ,fontFamily: 'SpaceGrotesk-Regular'

    },
    InnercontentText2:{
        color: '#333333', fontSize: 12,position:'absolute',fontFamily: 'SpaceGrotesk-Regular',marginLeft:responsiveWidth(50)

    }
})