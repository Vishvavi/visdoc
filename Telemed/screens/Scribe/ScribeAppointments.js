import { FlatList, Image, ScrollView, SafeAreaView,StyleSheet, Text,RefreshControl,LayoutAnimation,Easing,Linking,ToastAndroid,addEventListener,Alert, TouchableOpacity, View,Animated, } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Feather from 'react-native-vector-icons/Feather'

import { CountdownCircleTimer,useCountdown} from 'react-native-countdown-circle-timer';
import moment, { duration } from 'moment';
import DatePicker from 'react-native-date-picker'
import * as Animatable from 'react-native-animatable';
import { AppDimensions } from '../Components/Dimensions'
import {scale,  verticalScale, moderateScale } from 'react-native-size-matters';
import NetInfo from "@react-native-community/netinfo";

import Spinner from 'react-native-loading-spinner-overlay';
import { useNotes } from '../NoteProvider';
import URL from '../Components/URL';



import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'



import ConnectionMessgeScreen from '../Components/ConnectionMessageScreen';




import { Dimensions, Platform, PixelRatio } from 'react-native';
import PushNotification,{Importance} from 'react-native-push-notification';
import messaging from "@react-native-firebase/messaging";
import useProgressViewOffset1 from '../Components/ProgressViewOffsetlo';


import {
  useDimensionsChange,
  useResponsiveHeight,
  useResponsiveWidth,
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import LocalNotificationBuilder from '../LocalNotificationBuilder';




const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


//NetInfo.isConnected.addEventListener('connectionChange', (hasInternetConnection) = console.debug(`hasInternetConnection:`, hasInternetConnection));

const ScribeAppointments = ({navigation,route}) => {
const{ID,Scribe}=route.params;


    const[Accepted,setAccepted]=useState([]);
    const[Pending,setPending]=useState([]);
    const[Rowcount,setRowcount]=useState(0);
    const[PendingRowcount,setPendingRowcount]=useState(0);
    const[Proposed,setProposed]=useState([]);
    const[ProposedRowcount,setProposeRowcount]=useState(0);
    const[spinner,setspinner]=useState(true);
    const [date, setDate] = useState(new Date());
    const[date1,setDate1]=useState(false);
    const [time, setTime] = useState(new Date());
    const [open, setOpen] = useState(false); 
    const [selectedTab, setSelectedTab] = useState(0);
    const [showInfo, SetShowInfo] = useState(false);
    const [showContact, SetShowContact] = useState(false);
    const [showSpecial, setShowSpecial] = useState(false);
    const [showAvail, setShowAvail] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const[TransitionalList,setTransitionalList]=useState([]);
    const[TransitionalRowcount,setTransitionalRowcount]=useState(0);
    const[OPRowcount,setOPRowcount]=useState(0);
    const[FacilityRowcount,setFacilityRowcount]=useState(0);
    const[FaciPenRowcount,setFaciPenRowcount]=useState(0);
    const[FaciProposeRowcount,setFaciProposeRowcount]=useState(0);
   const[connected,setconnected]=useState(true);
   const[TimerRowcount,setTimerRowcount]=useState(0);
   const[SlideOutdown,setSlideOutdown]=useState(new Animated.Value(0));
   const[animatedValue,setanimatedValue]=useState(new Animated.Value(0));
   const[selectedId,setselectedId]=useState(false);
   const[DeclinedRowcount,setDeclinedRowcount]=useState(0);
    const[FaciDecRowcount,setFaciDecRowcount]=useState(0);
    const[showDeclined,setShowDeclined]=useState(false);
    const[count,setcount]=useState(0);
    const[SelectedToggle,setSelectedToggle]=useState(false);
    const[timerkey,settimerKey]=useState(0);
    const[currentIndex,setCurrendIndex]=useState(0);
    const[showResponse,setshowResponse]=useState(false);

    const{TimerList,ListRowcount,TimerReferralList,fetchID}=useNotes();

   const progressViewOffset = useProgressViewOffset1();
  
   useDimensionsChange(
    useCallback(({ window, screen }) => {
    
     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [])  
  ); 
  

PushNotification.configure({
  onNotification: (notification) =>{
  // console.log( 'NOTIFICATION:', notification );
  // notification.badge=10
  if(notification.userInteraction || notification.remote){
   navigation.navigate('ScribeNotification',{ID:ID,Scribe:Scribe})
  }
 
   
 }})
 

useEffect(()=>{
  const focus=navigation.addListener('focus',()=>{
    TimerReferralList();
  NotificationLog();
  fetchID();
  console.log(ID)
  console.log(Scribe);
  });
return focus
},[navigation]);

const onComplete=()=>{
  settimerKey(timerkey+1);
};

const NotificationLog=async()=>{
  try{
  const url=URL.NotificationLog+`${ID}`;
  let result=await fetch(url);
  result=await result.json();
  
  console.log(result.NotificationList.length)
  const unReadcount=result.NotificationList.reduce((count,item)=>count+(item.MessageStatus==="UnRead"?1:0),0);
  setcount(unReadcount)
  console.log(unReadcount);
  
  }catch(e){
    console.log(e);
  }

}




   // Profile navigation   

  const menu=()=>{
   
   navigation.openDrawer()
 //navigation.navigate('Profile',{ID,Scribe})
 
  }
  useEffect(()=>{
    const unScbscribe=NetInfo.addEventListener((state)=>{
        setconnected(state.isConnected);
        console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
        
    });
    return unScbscribe;
  },[]);
 
  
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
    //     PushNotification.localNotificationSchedule({
    //      id:item.AppointmentId,
    //       message:`You have a Schudule with ${item.PatientName} at ${moment(item.AppointmentTime,"HH:mm:ss").format("hh:mm A")}`,
    //   date:notificationTime,  
    //   autoCancel:true,
    
    //  allowWhileIdle:false,
    //   channelId: "channel-id-2"
    //     })
      }
   // PushNotification.cancelLocalNotification({id:1})
  }
  Accepted.forEach((item)=>{
    const[hours,minutes]=item.AppointmentTime.split(':')

 //const ApTime= moment(AppointmentTime,'HH:mm:ss').format("HH")
 //const ApMin= moment(AppointmentTime,"HH:mm:ss").format('mm')
 const date=new Date();
 date.setHours(hours)
 date.setMinutes(minutes)
 date.setSeconds(0);
//   if(date>new Date()){
 
  scheduleNotification(item);
// }


  });


},[Accepted])


let opacity = new Animated.Value(0);

  // const animate = easing => {
  //   opacity.setValue(0);
  //   Animated.timing(opacity, {
  //     toValue: 1,
  //     duration: 1200,
  //     easing,
  //     useNativeDriver: true,
  //   }).start();
  // };
  // const size1 = opacity.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, 80],
  // });

   
    var curr = new Date; // get current date
    var first = curr.getDate() //- curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
  

    const ToAccepted = () => {
        navigation.navigate('ScribeAccepted',{ID,Accepted:Accepted,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD"),Scribe})
      }
      const ToPending = () => {
        navigation.navigate('ScribePending',{ID,Pending:Pending,Tab:selectedTab,selectedDate:moment(date).format('YYYY-MM-DD'),Scribe})
      }
      const ToProposed = () => {
        navigation.navigate('ScribeProposedData',{ID,Proposed:Proposed,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD"),Scribe})
      }
      const FacilityAccepted=()=>{
        navigation.navigate('ScribeFacilityAccepted',{ID,Accepted:Accepted,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD"),Scribe})
        }

      const FacilityPending=()=>{
        navigation.navigate('ScribeFacilityPending',{ID,Scribe,Pending:Pending,Tab:selectedTab,selectedDate:moment(date).format('YYYY-MM-DD')})

      }
      const FacilityProposed=()=>{
        navigation.navigate('ScribeFacilityProposed',{ID,Scribe,Proposed:Proposed,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})
      }
     const ToDeclined=()=>{
        navigation.navigate('ScribeDeclined',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format("YYYY-MM-DD")})

      }
      const ToFacilityDeclined=()=>{
        navigation.navigate('ScribeFacDeclined',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format('YYYY-MM-DD')})

      }

      const ToTcmaccepted=()=>{
        navigation.navigate('ScribeTcmAccepted',{ID,Scribe,Tab:selectedTab,selectedDate:moment(date).format('YYYY-MM-DD')})

      }

     
   let tomorrow = new Date();
   tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
 
    function addZ(n){return n<10? '0'+n:''+n;
    }
  
      useEffect(()=>{
   

     const Tab=selectedTab
     const value1=date1;
  
     const focusHandler=navigation.addListener('focus',()=>{
      
     if((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==="FacilityHomehealthScribe")){
      
   
        FacilityAcceptedReferalList(Tab,value1);
        FacilityPendingReferalList(Tab,value1);
        FacilityProposedReferalList(Tab,value1);
        FacilityDeclinedReferalList(Tab,value1)
     }
   
     else{
      console.log('notfacility')
     }
     AcceptedReferalList(Tab,value1);
        PendingReferalList(Tab,date1);
        ProposedReferalList(Tab,value1);
       
        OPReferralList();
        DeclinedReferralList(Tab,value1);
    
        if((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==='FacilityHomehealthScribe')){
          TransitionalReferralList(Tab,value1); 
          }
        })
        return focusHandler;

      
      },[navigation,selectedTab,date1,Scribe]);
    
    
      const callback1=async(Tab,value1)=>{
    
      AcceptedReferalList(Tab,value1);
      //console.log(selectedTab)
     
      }
      const callback3=async(Tab,value1)=>{
      //value1=date1
      // var Tab=selectedTab
        PendingReferalList(Tab,value1);
       
        }
        const callback2=async(Tab,value1)=>{
          //value1=date1
         // var Tab=selectedTab
          ProposedReferalList(Tab,value1);
         
        }
        const callbacktransition=async(Tab,value1)=>{
          
          TransitionalReferralList(Tab,value1);
         
        }
const callbackFaciAccepted=async(Tab,value1)=>{
  FacilityAcceptedReferalList(Tab,value1);

}
const callbackFaciProposed=async(Tab,value1)=>{
  FacilityProposedReferalList(Tab,value1);

}
  const callbackFaciPending=async(Tab,value1)=>{
     FacilityPendingReferalList(Tab,value1)
    }

const callbackOP=async()=>{
  OPReferralList();
}
const callbackDeclined=async(Tab,value1)=>{
  DeclinedReferralList(Tab,value1);
}
const callbackFaciDeclined=async(Tab,value1)=>{
  FacilityDeclinedReferalList(Tab,value1);
}

//AcceptedReferralcount URL

const AcceptedTab0Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const AcceptedTab1Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const AcceptedTab2Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const AcceptedTab3Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}`
const AcceptedTab4Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=`

//FacilityAcceptedReferralcount URL

const FacAcceptedTab0Url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacAcceptedTab1Url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacAcceptedTab2Url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacAcceptedTab3Url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}`
const FacAcceptedTab4Url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=`


//ProposedReferralcount URL

const ProposedTab0Url=URL.ProposedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const ProposedTab1Url=URL.ProposedUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const ProposedTab2Url=URL.ProposedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const ProposedTab3Url=URL.ProposedUrl+`${Scribe}/${ID}?startdate=${firstday}`
const ProposedTab4Url=URL.ProposedUrl+`${Scribe}/${ID}?startdate=`

//FacilityProposedReferralcount URL

const FacProposedTab0Url=Scribe==="FacilityHomehealthScribe"? URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacProposedTab1Url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacProposedTab2Url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacProposedTab3Url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${firstday}`
const FacProposedTab4Url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=`

//PendingReferralcount URL

const PendingTab0Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const PendingTab1Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const PendingTab2Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const PendingTab3Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}`
const PendingTab4Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=`

//FacilityPendingReferralcount


const FacPendingTab0Url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacPendingTab1Url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacPendingTab2Url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacPendingTab3Url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}`
const FacPendingTab4Url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=`


//Declined Referral count

const DeclinedTab0Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const DeclinedTab1Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const DeclinedTab2Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const DeclinedTab3Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}`
const DeclinedTab4Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=`

// Declined Referral count

const FacDeclinedTab0Url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const FacDeclinedTab1Url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const FacDeclinedTab2Url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const FacDeclinedTab3Url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}`
const FacDeclinedTab4Url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=`
  

   const TcmAcceptedTab0Url=URL.TcmAcceptedUrl1+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`
    const TcmAcceptedTab1Url=URL.TcmAcceptedUrl1+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
    const TcmAcceptedTab2Url=URL.TcmAcceptedUrl1+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`
    const TcmAcceptedTab3Url=URL.TcmAcceptedUrl1+`FacilityScribe/${ID}?startdate=${firstday}`
    const TcmAcceptedTab4Url=URL.TcmAcceptedUrl1+`FacilityScribe/${ID}?`

const TcmAccScribeTab0Url=URL.TcmAcceptedUrl+`startdate=${firstday}&enddate=${firstday}`
const TcmAccScribeTab1Url=URL.TcmAcceptedUrl+`startdate=${tomorrow}&enddate=${tomorrow}`
const TcmAccScribeTab2Url=URL.TcmAcceptedUrl+`startdate=${firstday}&enddate=${lastday}`
const TcmAccScribeTab3Url=URL.TcmAcceptedUrl+`startdate=${firstday}`
const TcmAccScribeTab4Url=URL.TcmAcceptedUrl

const TransitionalReferralList=async(Tab,value1)=>{

  if((Scribe==="FacilityScribe")||(Scribe==="FacilityHomehealthScribe")){
    if(Tab===0){
    try{
  const url=TcmAcceptedTab0Url;
  let result=await fetch(url);
  result=await result?.json();
 
if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
callbacktransition(Tab);
}
else{
 setTransitionalRowcount(result?.Rowcount);
 console.log('Tcmtab0Rc',result.Rowcount);
}   
  }catch(e){
    console.log(e);
  }
}
else if(Tab===1){
  try{
    const url=TcmAcceptedTab1Url;
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab1Rc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }

}
else if(Tab===2){
  try{
    const url=TcmAcceptedTab2Url;
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab2Rc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }
  }

else if(Tab===3){
  try{
    const url=TcmAcceptedTab3Url;
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab3Rc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }
}
else if(Tab===4){
  try{
    const url=value1===false?TcmAcceptedTab4Url+`startdate=${firstday}&enddate=${firstday}`:TcmAcceptedTab4Url+`startdate=${value1}&enddate=${value1}`;
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab,value1);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab4Rc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }
}
}
else if(Scribe==="Scribe"){
  if(Tab===0){
    try{
  const url=TcmAccScribeTab0Url;
  let result=await fetch(url);
  result=await result?.json();
 
if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
callbacktransition(Tab);
}
else{
 setTransitionalRowcount(result?.Rowcount);
 console.log('Tcmtab0SRc',result.Rowcount);
}   
  }catch(e){
    console.log(e);
  }
}
else if(Tab===1){
  try{
    const url=TcmAccScribeTab1Url;
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab1SRc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }

}
else if(Tab===2){
  try{
    const url=TcmAccScribeTab2Url;
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab2sRc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }

}
else if(Tab===3){
  try{
    const url=TcmAccScribeTab3Url;
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab3sRc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }
}
else if(Tab===4){
  try{
    const url=value1===false?TcmAccScribeTab4Url+`startdate=${firstday}&enddate=${firstday}`:TcmAccScribeTab4Url+`startdate=${value1}&enddate=${value1}`;
  console.log(url)
    let result=await fetch(url);
    result=await result?.json();
   
  if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
  callbacktransition(Tab,value1);
  }
  else{
   setTransitionalRowcount(result?.Rowcount);
   console.log('Tcmtab4sRc',result.Rowcount);
  }   
    }catch(e){
      console.log(e);
    }
}

}
else{
  console.log('error')
}

}

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
  }



const OPReferralList=async()=>{
 
  const url=URL.OPList+`${ID}`;
 
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
  console.log('OpRc',data?.Rowcount);
  }
}).catch(e=>{
    console.log(e);
  
})
  }


      const AcceptedReferalList = async(Tab,value1)=>{

        if(Tab===0){
        
            const url=AcceptedTab0Url;
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
              callback1
             }
             else{
              setRowcount(data?.Rowcount);
              setTimerRowcount(data.Rowcount)
              setAccepted(data.ListOfRefferals)
              setspinner(false)
              console.log('AccTab0',data.Rowcount)
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }
      
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
              callback1
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
              callback1
             }
             else{
              setRowcount(data?.Rowcount);
              console.log('AccTab2',data.Rowcount)
             
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              
      }
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
              callback1
             }
             else{
              setRowcount(data?.Rowcount);
              console.log('AccTab3',data.Rowcount);
             
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              
        }
     else if(Tab===4){
        
        const url=value1===false?AcceptedTab4Url+`${firstday}&enddate=${firstday}`:AcceptedTab4Url+`${value1}&enddate=${value1}`;
       
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
          callback1(Tab,value1);
         }
         else{
          setRowcount(data?.Rowcount);
          console.log('AccTab4',data.Rowcount)
         
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }}
     const FacilityAcceptedReferalList = async(Tab,value1)=>{

  if(Tab===0){
  
           const url=FacAcceptedTab0Url;
       
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
           
           }
            
          }).catch(e=>{
              console.log(e);
            
          })
            }
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
        console.log('FacAccTab2',data.Rowcount)
       
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
       console.log('FacAccTab3',data.Rowcount);
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
else if(Tab===4){
  
  const url=value1===false?FacAcceptedTab4Url+`${firstday}&enddate=${firstday}`:FacAcceptedTab4Url+`${value1}&enddate=${value1}`;
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
    callbackFaciAccepted(Tab,value1)
   }
   else{
    setFacilityRowcount(data?.Rowcount);
    console.log('FacAccTab4',data.Rowcount);
   
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }}
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
          console.log('PrposedTab0',data.Rowcount);
         
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
        console.log('PrposedTab1',data.Rowcount);
       
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
          console.log('PrposedTab2',data.Rowcount);
         
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
      console.log('PrposedTab3',data.Rowcount);
     
     }
      
    }).catch(e=>{
        console.log(e);
      
    })
      }

else if(Tab===4){
  
  const url=value1===false?ProposedTab4Url+`${firstday}&enddate=${firstday}`:ProposedTab4Url+`${value1}&enddate=${value1}`;
 
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
    console.log('PrposedTab0',data.Rowcount);
   
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }}

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
      console.log('FaciPrposedTab0',data.Rowcount);
     
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
      console.log('FaciPrposedTab1',data.Rowcount);
     
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
        console.log('FaciPrposedTab2',data.Rowcount);
       
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
    console.log('FaciPrposedTab3',data.Rowcount);
   
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    }
  
else if(Tab===4){
  
const url=value1===false?FacProposedTab4Url+`${firstday}&enddate=${firstday}`:FacProposedTab4Url+`${value1}&enddate=${value1}`;

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
  console.log('FaciPrposedTab4',data.Rowcount);
 
 }
  
}).catch(e=>{
    console.log(e);
  
})
  }
}
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
          console.log('PendingTab0',data.Rowcount);
         
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
              console.log('PendingTab1',data.Rowcount);
             
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
              console.log('PendingTab2',data.Rowcount);
             
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
          console.log('PendingTab0',data.Rowcount);
         
         }
          
        }).catch(e=>{
            console.log(e);
          
        })
          }

 else if(Tab===4) {
 
const url=value1===false?PendingTab4Url+`${firstday}&enddate=${firstday}`:PendingTab4Url+`${value1}&enddate=${value1}`;
//const url=value1===false?FacProposedTab4Url+`${firstday}&enddate=${firstday}`:FacProposedTab4Url+`${value1}&enddate=${value1}`;
     console.log('url:',url)
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
  console.log('PendingTab4',data.Rowcount);
 
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
          callbackFaciPending(Tab);
         }
         else{
          setFaciPenRowcount(data?.Rowcount);
          console.log('FacPendingTab0',data.Rowcount);
         
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
        callbackFaciPending(Tab);
       }
       else{
        setFaciPenRowcount(data?.Rowcount);
        console.log('FacPendingTab1',data.Rowcount);
       
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
        callbackFaciPending(Tab);
       }
       else{
        setFaciPenRowcount(data?.Rowcount);
        console.log('FacPendingTab2',data.Rowcount);
       
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
        callbackFaciPending(Tab);
       }
       else{
        setFaciPenRowcount(data?.Rowcount);
        console.log('FacPendingTab3',data.Rowcount);
       
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }    

     

else if(Tab===4){
  
  const url=value1===false?FacPendingTab4Url+`${firstday}&enddate=${firstday}`:FacPendingTab4Url+`${value1}&enddate=${value1}`;
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
    console.log('FacPendingTab4',data.Rowcount);
   
   }
    
  }).catch(e=>{
      console.log(e);
    
  })
    
}


}

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
        callbackDeclined(Tab);
       }
       else{
        setDeclinedRowcount(data?.Rowcount);
        console.log('DecTab0',data.Rowcount);
       
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
            callbackDeclined(Tab);
           }
           else{
            setDeclinedRowcount(data?.Rowcount);
            console.log('DecTab1',data.Rowcount);
           
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
            callbackDeclined(Tab);
           }
           else{
            setDeclinedRowcount(data?.Rowcount);
            console.log('DecTab2',data.Rowcount);
           
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
        callbackDeclined(Tab);
       }
       else{
        setDeclinedRowcount(data?.Rowcount);
        console.log('DecTab3',data.Rowcount);
       
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }
    
      
    else if(Tab===4) {
    
      const url=value1===false?DeclinedTab4Url+`${firstday}&enddate=${firstday}`:DeclinedTab4Url+`${value1}&enddate=${value1}`;
     
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
        console.log('DecTab4',data.Rowcount);
       
       }
        
      }).catch(e=>{
          console.log(e);
        
      })
        }}
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
                callbackFaciDeclined(Tab);
               }
               else{
                setFaciDecRowcount(data?.Rowcount);
                console.log('FacDecTab0',data.Rowcount);
               
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
                callbackFaciDeclined(Tab);
               }
               else{
                setFaciDecRowcount(data?.Rowcount);
                console.log('FacDecTab1',data.Rowcount);
               
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
                  callbackFaciDeclined(Tab);
                 }
                 else{
                  setFaciDecRowcount(data?.Rowcount);
                  console.log('FacDecTab2',data.Rowcount);
                 
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
              callbackFaciDeclined(Tab);
             }
             else{
              setFaciDecRowcount(data?.Rowcount);
              console.log('FacDecTab3',data.Rowcount);
             
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }
               
          else if(Tab===4) {
          
            const url=value1===undefined?FacDeclinedTab4Url+`${firstday}&enddate${firstday}`:FacDeclinedTab4Url+`${value1}&enddate=${value1}`;
            console.log('Facdeclined',url)
           
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
              console.log('FacDecTab4',data.Rowcount);
             
             }
              
            }).catch(e=>{
                console.log(e);
              
            })
              }}

const TabRowcount=(Tab)=>{
  if((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==='FacilityHomehealthScribe')){
    TransitionalReferralList(Tab); 
    }
  AcceptedReferalList(Tab)
 
  ProposedReferalList(Tab)
  PendingReferalList(Tab)
  if((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==="FacilityHomehealthScribe")){
    FacilityAcceptedReferalList(Tab)
    FacilityPendingReferalList(Tab)
    FacilityProposedReferalList(Tab)
    FacilityDeclinedReferalList(Tab)
  }
  setSelectedTab(Tab)
  DeclinedReferralList(Tab)
  
  


}


const onUpdate=(elapsedTime)=>{
  if(elapsedTime<0){
    return 0;
  }
  return elapsedTime;
};


const rotateTransform=(index)=> {
  return {
    transform: [{
      rotate: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH, 
          index * SCREEN_WIDTH, 
          (index + 1) * SCREEN_WIDTH
        ],
        outputRange: ['30deg', '0deg', '-30deg'],
      })
    }]
  };
}
//const focusHandler=navigation.addEventListener('focus',()=>{

//});



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
   

    const width= Math.round(Dimensions.get('window').width)

   

    setTimeout(() => {
      setspinner(false)
    }, 1000);

    const onRefresh =() => {
      const Tab=selectedTab
      const value1=date1
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setconnected(state.isConnected)
      })
      TimerReferralList()
      OPReferralList();
      setRefreshing(true);
    AcceptedReferalList(Tab,value1);
    PendingReferalList(Tab,value1);
    ProposedReferalList(Tab,value1);
    if((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==='FacilityHomehealthScribe')){
      TransitionalReferralList(Tab,value1); 
      }
    NotificationLog();
    DeclinedReferralList(Tab,value1)
    if((Scribe==='FacilityScribe')||(Scribe==="Scribe")||(Scribe==="FacilityHomehealthScribe")){
    FacilityAcceptedReferalList(Tab,value1);
    FacilityPendingReferalList(Tab,value1);
    FacilityProposedReferalList(Tab,value1);
    FacilityDeclinedReferalList(Tab,value1)
    }
   
   
      setTimeout(() => {
        setRefreshing(false);
      }, 5000);
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



    
    const ItemView = ( item,index,dur,isCurrentItem)  => {
     

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
                    <Text style={{ fontSize:12, color: '#333333',alignSelf:'flex-end',position:'absolute',fontFamily: 'SpaceGrotesk-Regular' }}>{moment(item?.AppointmentTime,'HH:mm:ss').format('hh:mm A')}</Text>
                </View>
                <View style={{  marginTop:30,justifyContent:'center',alignItems:'center' }}>
              
            
                 <CountdownCircleTimer
                 //  key={index}
                    isPlaying
                      size={110}
                       duration={dur}
                      
                     
                     colors={[
                          ["#e6c402", 0.0],
                          ["#ff0000", 0.20],
                          ['#990e17',0.60]
                         
                        ]}
                        isLinearGradient={true}

                      
                    >
                        {({ remainingTime }) => {
                            const hours = Math.floor(remainingTime / 3600)
                            const minutes = Math.floor((remainingTime % 3600) / 60)
                            const seconds = remainingTime % 60

                            const Time2=`${hours}:${minutes}:${seconds}`
                            const Time=`${moment(hours,'H').format('HH')}:${moment(minutes,'m').format('mm')}`
                 
             
                            const Time1=`${moment(minutes,'m').format('mm')}:${moment(seconds,'ss').format('ss')}`

                           // return (<Text style={{ color: '#333333', fontSize: scale(20),fontFamily: 'SpaceGrotesk-Regular' }}>{moment(remainingTime).format(hours + ":" + minutes + ":" + seconds)}</Text>)
                           if(hours===0){
                            return  (
                              
                           <View>
                            
                            <Text style={{ color: '#333333', fontSize: 20,fontFamily: 'SpaceGrotesk-Regular' }}>{Time1}</Text>
                           <Text style={{fontSize: 12,color:'#808080',alignSelf:'center',fontFamily: 'SpaceGrotesk-Regular'}}>Minutes</Text>
                            </View>
                            )
                         }
                  else{
                  return  (
                              
                  <View>
       
            <Text style={{ color: '#333333', fontSize: 20,fontFamily: 'SpaceGrotesk-Regular' }}>{Time}</Text>
         <Text style={{fontSize: 12,color:'#808080',alignSelf:'center',fontFamily: 'SpaceGrotesk-Regular'}}>Hours</Text>
        </View>
                     )}
                  }}
                    </CountdownCircleTimer>
                     
                   
                    <Text style={{ color: '#333333', alignSelf: 'center', fontSize: 22, marginTop:10,left:0 ,fontFamily: 'SpaceGrotesk-Regular'}}>{item?.LocationTypeName}</Text>
                </View>
                <View style={{marginTop:16,marginBottom:16,justifyContent:'center'}}>
                <TouchableOpacity style={{borderWidth:0,width:80}} onPress={()=>navigation.navigate('Reschedule',{item,ID,VisitTypeId:"1000",Scribe})}>
                
                <Text style={{ fontSize: 12, color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular'}}>Reschedule</Text>
               
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setselectedId(index)
                ImReady(item)}
                } style={{alignSelf:'center',position:'absolute'}}>
                    <View >
                    <Text  style={{paddingLeft:12,paddingRight:12,paddingTop:5,paddingBottom:5,borderRadius:5, fontSize: 12, color:selectedId===index?"white": '#11266c', backgroundColor: selectedId===index?"green":'#e6c402', borderColor: '#333333',fontFamily: 'SpaceGrotesk-Regular' }}>I'm Ready</Text>
                    </View>
                    </TouchableOpacity>
                    {selectedId===index&&(
                    <TouchableOpacity onPress={()=>{
                      if(item.MeetingLink!=null){
                        Linking.openURL(item.MeetingLink)} 
                        
                        else{
                            console.log('onpress')
                        }}}
                    
                   style={{alignSelf:'center',position:'absolute',top:35}}>
                    <View >
                    <Text  style={{paddingLeft:30,paddingRight:30,paddingTop:5,paddingBottom:5,borderRadius:5, fontSize: 12, color: '#11266c', backgroundColor: '#e6c402', borderColor: '#333333',fontFamily: 'SpaceGrotesk-Regular' }}>Join</Text>
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
    
      //console.log(item?.AppointmentTime)
     
         //console.log(addgivhour)
         //console.log(minsplit)
        // console.log(addcurmin)
        //console.log(dur)
       
     
      return (


        



      
        <Animatable.View 
        
        style={[styles.scrollPage,{backgroundColor:'transparent',borderWidth:0,width:responsiveWidth(100),padding:responsiveWidth(5)}]}
        >
                
              <View style={{backgroundColor:'white',padding:responsiveWidth(5),borderRadius:8,borderWidth:0}}>
              <View>
                  <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'SpaceGrotesk-Regular',width:220,borderWidth:0}}>Next:</Text>
                  <Text style={{ fontSize: 12, color: '#333333',alignSelf:'flex-end',position:'absolute',fontFamily: 'SpaceGrotesk-Regular' }}></Text>
              </View>
              <View style={{  marginTop:30,justifyContent:'center',alignItems:'center' }}>
             
           
                  <CountdownCircleTimer
                      isPlaying
                      size={110}
                      duration={0}
                     colors={[
                        ["#e6c402", 0.05],
                        ["#ff0000", 0.20],
                        ['#990e17',0.60],
                       
                      ]}
                      isLinearGradient={true}
                      
                    >
                      {({ remainingTime }) => {
                          const hours = Math.floor(remainingTime / 3600)
                          const minutes = Math.floor((remainingTime % 3600) / 60)
                          const seconds = remainingTime % 60
            
                          const Time=`${moment(hours,'H').format('HH')}:${moment(minutes,'m').format('mm')}`
                 
             
                            const Time1=`${moment(minutes,'m').format('mm')}:${moment(seconds,'ss').format('ss')}`
        

            if(hours===0){
                          return  (
                            
                         <View>
                          
                          <Text style={{ color: '#333333', fontSize: 20,fontFamily: 'SpaceGrotesk-Regular' }}>{Time1}</Text>
                         <Text style={{fontSize: 12,alignSelf:'center',fontFamily: 'SpaceGrotesk-Regular'}}>Hours</Text>
                          </View>
                          )

}
else{
  return  (
                            
    <View>
     
     <Text style={{ color: '#333333', fontSize: 20,fontFamily: 'SpaceGrotesk-Regular' }}>{Time}</Text>
    <Text style={{fontSize: 12,alignSelf:'center',fontFamily: 'SpaceGrotesk-Regular'}}>Hours</Text>
     </View>
     )

}
                         
                      }}
                  </CountdownCircleTimer>
              

                  <Text style={{ color: '#333333', alignSelf: 'center', fontSize: 22, marginTop:10,left:0 ,fontFamily: 'SpaceGrotesk-Regular'}}></Text>
              </View>
              <View style={{marginTop:16,width:"100%",marginBottom:16,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{ fontSize: 12, color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular',alignSelf:'flex-start' }}>Reschedule</Text>
                  <View style={{alignSelf:'center',position:'absolute'}}>
                  <Text  style={{paddingLeft:12,paddingRight:12,paddingTop:5,paddingBottom:5,borderRadius:5, fontSize: 12, color: '#11266c', backgroundColor: '#e6c402', borderColor: '#333333',fontFamily: 'SpaceGrotesk-Regular' }}>I'm Ready</Text>
                  </View>
                 
                  <Text style={{ fontSize: 12,alignSelf:'flex-end',position:'absolute', color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular' }}>Particulars</Text>
              </View>
              </View>
          </Animatable.View>
         
      )
  }
  
 

  function toggleHandle() {
    if(SelectedToggle===false){
    setSelectedToggle(true)
    ToastAndroid.show('Activeted',ToastAndroid.CENTER)
    }
    else{
      setSelectedToggle(false)
      ToastAndroid.show('In Activated',ToastAndroid.CENTER)

    }
    
  }
  Animated.timing(
    animatedValue,
    {
      toValue: SelectedToggle ? 32 : 0,
      duration: 250,         // in milliseconds, default is 500
      easing: Easing.bounce, // Easing function, default is Easing.inOut(Easing.ease)
      delay: 0,  
      useNativeDriver:true            // in milliseconds, default is 0
    }
  ).start()

  const slideout=()=>{
  
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
  return (
    <View style={{flex:1}}>
    <ConnectionMessgeScreen/>
 
 <SafeAreaView style={{flex:1,backgroundColor:'#11266c'}}>
   
    <View style={[styles.Header,{paddingLeft:responsiveWidth(5),paddingRight:responsiveWidth(5)}]}>
    <Spinner
       visible={spinner}
       textContent={'Loading...'}
       textStyle={{color:'white'}}
     /> 
     <View style={styles.HeaderInnerLeft}>
    
       <TouchableOpacity onPress={()=>menu()}>
             <Entypo style={{ }} name='menu' color={'#e6c402'} size={22} />
             </TouchableOpacity>
             <Text style={[styles.HeaderText]}><Text style={{ fontStyle: 'italic'}}>Vis<Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Doc</Text></Text></Text>
             </View>
           <View style={styles.HeaderInnerRight}>
          
          
           <TouchableOpacity onPress={()=>navigation.navigate('ScribeNotification',{ID,Scribe})} style={{ marginLeft:responsiveWidth(5),flexDirection:'row',marginRight:responsiveWidth(5)}}>
           <MaterialIcons  name='notifications-none' color={'#e6c402'} size={22}/>
          {count!=0&&(  
            <View style={{borderRadius:10,height:16,backgroundColor:'red',left:-5,top:-8,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:10,color:'white',paddingHorizontal:5}}>{count}</Text>
          </View>
          )}  
          </TouchableOpacity>
         
          
             <TouchableOpacity  onPress={
                  ()=>{
                    if(Scribe==='FacilityScribe'||Scribe==='Scribe'||Scribe==="FacilityHomehealthScribe"){
                      navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe,selectedTab})
                    }
                    else{
                    navigation.navigate('ScribeCreateAppointment',{ID,Scribe,selectedTab})}}
                }>
               <View style={{height:50,width:50,backgroundColor:'green',marginTop:8,alignItems:'center',justifyContent:'center',borderRadius:8}}>
               <Image source={require('../../images/png2.png')}
               style={{height:30,width:30,tintColor:'white'}}
               />
               </View>
           
             </TouchableOpacity>
            
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
                    <Feather style={{ color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='calendar' size={30} />
                    <DatePicker
                    style={{  fontFamily: 'SpaceGrotesk-Regular',}}
                        mode='date'
                        modal
                        minimumDate={new Date()}
                        open={open}
                        date={date}
                        cancelText={''}
                        accessibilityViewIsModal
                      
                        onConfirm={value => {
                            setOpen(false)
                            setDate(value)
                            setDate1(moment(value).format("YYYY-MM-DD"))
                            const Tab=4
                            const value1=moment(value).format("YYYY-MM-DD")
                            AcceptedReferalList(Tab,value1);
                            PendingReferalList(Tab,value1);
                            ProposedReferalList(Tab,value1);
                            FacilityPendingReferalList(Tab,value1);
                            FacilityAcceptedReferalList(Tab,value1);
                           TransitionalReferralList(Tab,value1);
                            FacilityProposedReferalList(Tab,value1);
                            FacilityDeclinedReferalList(Tab,value1);
                            DeclinedReferralList(Tab,value1);
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                  
                </TouchableOpacity>
                </View>
            

           
            <ScrollView
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
               progressViewOffset={progressViewOffset}
               refreshing={refreshing} onRefresh={()=>onRefresh()} />
            }>
            <View style={{backgroundColor:'#dcdcdc',borderRadius:8,flex:1,marginTop:150,borderWidth:0}}>
            <View style={{borderWidth:0,marginTop:-165,borderWidth:0,flex:1}}>
          
       
       
          <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
        
          scrollEventThrottle={1}
          snapToInterval={width}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset} } }],
            { useNativeDriver: true }
          )}
          horizontal
          pagingEnabled
          >
          
          { TimerList?.sort((a,b)=> a.AppointmentTime > b.AppointmentTime ? 1 : -1)
       
          .map((item,index)=>{
          

          

             let time1=item?.AppointmentTime
             let time=time1
             const split=time.split('')

             const apptime=moment(time,"HH:mm:ss").format('HH')
             const appmin=moment(time,"HH:mm:ss").format('mm')
             console.log(apptime)
            // console.log(`${split[0]}${split[1]}`)
           //  console.log(split[1])
           
             const current=new Date().getHours()
             const min=new Date().getMinutes()
            // const addcurmin=(Math.abs(minsplit-min))*60
          //   const housplit=`${split[0]}${split[1]}`
            // const minsplit=`${split[3]}${split[4]}`
             const addgivhour=((apptime-current))*3600
             let dur1=(addgivhour+((appmin-min)*60))
            const dur=dur1<0?0:dur1
         //   dur = dur < 0 ? 0 : dur;

           //  const newdate=moment(new Date().)
         // console.log(dur)
          // console.log(value)

            return(
            
             
              <Animated.View  key={item.AppointmentId} >
                
                   {TimerList?ItemView(item,index,dur,):null}
                                
                    </Animated.View>
                   )   })}

            {ListRowcount===0 &&(    
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
            
                <TouchableOpacity  onPress={()=>{slideout()}} style={[styles.detailflow,{marginTop:20}]}>
                    {showInfo?(
                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )}
                    <View style={[styles.content,{width:responsiveWidth(50)}]}>
                     <Text style={styles.ContentTitle}>Accepted</Text>
                     </View>
                     {!showInfo&&(
                      <Text style={{ color: '#333333',fontSize:17,fontFamily: 'SpaceGrotesk-Regular'}}>{Rowcount+TransitionalRowcount+OPRowcount+FacilityRowcount}</Text>
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
                             {((Scribe==="FacilityScribe")||(Scribe==="Scribe")||(Scribe==='FacilityHomehealthScribe'))&&(
                             <TouchableOpacity onPress={()=>FacilityAccepted()}>
                             <View style={styles.innercontent}>
                                <Text style={styles.InnercontentText1}>Facility Visit</Text>
                                
                            <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FacilityRowcount} </Text>  
                            
                             <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                             </View>
                             </TouchableOpacity>
                             )}
                               {((Scribe==="FacilityScribe")||(Scribe==="Scribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                            <TouchableOpacity onPress={()=>ToTcmaccepted()}>
                            <Animated.View style={styles.innercontent}>
                                <Text style={styles.InnercontentText1}>TCM</Text>
                            <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{TransitionalRowcount}</Text>
                                 <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                                 </Animated.View>
                               </TouchableOpacity>   
                               )}
                             <TouchableOpacity onPress={()=>navigation.navigate("ScribeOpAccepted",{ID,Scribe})}>   
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
                    <Text style={[styles.ContentTitle]}>Proposed</Text>
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
                            {((Scribe==="FacilityScribe")||(Scribe==="Scribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                         <TouchableOpacity onPress={()=>FacilityProposed()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Facility Visit</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciProposeRowcount}</Text>
                                <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                                </View>
                                </TouchableOpacity>
                            )}
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
                <View style={styles.Line}/>
                )}
                {
                    showSpecial ? (
                       
                        <View style={{  }}>
                            <TouchableOpacity onPress={()=>ToPending()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Telemed</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{PendingRowcount}  </Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            {((Scribe==="FacilityScribe")||(Scribe==="Scribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                            <TouchableOpacity onPress={()=>FacilityPending()}>
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Facility Visit</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciPenRowcount}</Text>
                                <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                                </View>
                                </TouchableOpacity>
                            )}
                           
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
                <View style={[styles.Line,{marginBottom:60}]}/>
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
                            {((Scribe==="FacilityScribe")||(Scribe==="Scribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                            <TouchableOpacity onPress={()=>ToFacilityDeclined()}>    
                           <View style={styles.innercontent}>
                               <Text style={styles.InnercontentText1}>Facility Visit</Text>
                           <Text style={[styles.InnercontentText2,{marginLeft:responsiveWidth(50)}]}>{FaciDecRowcount}</Text>  
                            <Feather style={{ color: 'black'}} name='chevron-right' size={17}/>
                            </View>
                            </TouchableOpacity>
                            )}
                           
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

export default ScribeAppointments

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

  },
    time: {
      display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     position: 'absolute',
     left: 0,
     top: 0,
     width: '100%',
     height: '100%'
   }
})