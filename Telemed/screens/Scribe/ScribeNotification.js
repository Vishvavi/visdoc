
import React ,{useState,useCallback}from 'react';
import {Text,View,StyleSheet,FlatList,TouchableOpacity,RefreshControl} from 'react-native';

import Header from '../Components/Header';

import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useProgressViewOffset from '../Components/ProgressViewOffset';
import moment from 'moment';
import { responsiveWidth,responsiveHeight,useDimensionsChange } from 'react-native-responsive-dimensions';
import { useNotes } from '../NoteProvider';
import URL from '../Components/URL';

const ScribeNotification=({navigation,route})=>{
    useDimensionsChange(
        useCallback(({ window, screen }) => {
         
        }, [])  
      ); 

   const{Scribe,ID}=route.params;

   // const[Notification,setNotification]=useState([]);
    const[refreshing,setRefreshing]=useState(false);
    const progressViewOffset = useProgressViewOffset();
    const[count,setcount]=useState(0);
    const{Notification}=useNotes()


    
useEffect(()=>{
    const focus=navigation.addListener('focus',()=>{
  // NotificationLog();
  
    })
    return focus;
},[navigation])


const NotificationLog=async()=>{
    try{
   const url=URL.NotificationLog+`${ID}`;
   let result=await fetch(url);
   result=await result.json();
   //setNotification(result.NotificationList);
   console.log(result.NotificationList.length)
   const unReadcount=result.NotificationList.reduce((count,item)=>count+(item.MessageStatus==="UnRead"?1:0),0);
   setcount(unReadcount)
   console.log(unReadcount);
   console.log(result)
    }
    catch(e){
        console.log(e);
    }
 }

 const NotificationStatus=async(LogId)=>{
    const data={
    PushNotificationLogId:`${LogId}`,
    UserId: ID,
    MessageStatus: "Read"

    }
    const url=URL.UpdateLogStatus;
  fetch (url,{
  method:'PUT',
headers:{
    'Content-Type':'application/json'
},

body:JSON.stringify(data)
}).then(response=>response.json()).then(json=>{
    console.log(json)
})

 }
const Redirect=true;
 const onRefresh =() => {
setRefreshing(true)

    NotificationLog();
    setTimeout(()=>{
        setRefreshing(false);
    },2000);
 }



    return(
        <View style={{flex:1,backgroundColor:'#dcdcdc'}}>
            <Header
            TabName='Notification'
            onPress={()=>navigation.goBack()}
            />
          <FlatList
            data={Notification}
            refreshControl={
                <RefreshControl
              
                  progressViewOffset={progressViewOffset}
              
              
                
                 refreshing={refreshing} onRefresh={()=>onRefresh()} />
              }
              
            keyExtractor={(item,index)=>item.PushNotificationLogId.toString()}
            renderItem={({item,index})=>{
                return(
                    <TouchableOpacity style={{backgroundColor:'white',marginTop:1,}}onPress={()=>{
                        if(item.MessageTypeId===1){
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                        navigation.navigate('ScribePending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                        
                        else if(item.MessageTypeId===2){
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                            navigation.navigate('ScribeAccepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}

                            else if(item.MessageTypeId===4){
                                const LogId=item.PushNotificationLogId
                                NotificationStatus(LogId)
                                navigation.navigate('ScribeProposedData',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                            else if(item.MessageTypeId===5){
                                const LogId=item.PushNotificationLogId
                                NotificationStatus(LogId)
                                navigation.navigate('ScribePending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                            else if(item.MessageTypeId===6){
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('ScribePending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                            else if(item.MessageTypeId===7){
                                        const LogId=item.PushNotificationLogId
                                        NotificationStatus(LogId)
                                        navigation.navigate('ScribeAccepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
                                    }
                           else if(item.MessageTypeId===9){
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                          navigation.navigate('ScribeProposedData',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                          else if(item.MessageTypeId===10){
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                            navigation.navigate('ScribePending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                            else if(item.MessageTypeId===11){
                                const LogId=item.PushNotificationLogId
                                NotificationStatus(LogId)
                                navigation.navigate('ScribeFacilityPending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                        else if(item.MessageTypeId===12){
                        const LogId=item.PushNotificationLogId
                        NotificationStatus(LogId)
                       navigation.navigate('ScribeFacilityAccepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                       else if(item.MessageTypeId===14){
                        const LogId=item.PushNotificationLogId
                        NotificationStatus(LogId)
                        navigation.navigate('ScribeFacilityProposed',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                        else if(item.MessageTypeId===15){
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                            navigation.navigate('ScribeFacilityPending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                            else if(item.MessageTypeId===16){
                                const LogId=item.PushNotificationLogId
                                NotificationStatus(LogId)
                                navigation.navigate('ScribeFacilityPending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                else if(item.MessageTypeId===17){
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('ScribeFacilityAccepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                    else if(item.MessageTypeId===18){
                                        const LogId=item.PushNotificationLogId
                                        NotificationStatus(LogId)
                                        navigation.navigate('ScribeFacDeclined',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                    else if(item.MessageTypeId===19){
                                        const LogId=item.PushNotificationLogId
                                        NotificationStatus(LogId)
                                        navigation.navigate('ScribeFacilityProposed',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                        else if(item.MessageTypeId===20){
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('ScribeFacilityPending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                            else if(item.MessageTypeId===21){
                                                const LogId=item.PushNotificationLogId
                                                NotificationStatus(LogId)
                                                navigation.navigate('ScribeAccepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                                else if(item.MessageTypeId===23){
                                                    const LogId=item.PushNotificationLogId
                                                    NotificationStatus(LogId)
                                                    navigation.navigate('ScribeFacilityAccepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                                    else if(item.MessageTypeId===25){
                                                        const LogId=item.PushNotificationLogId
                                                        NotificationStatus(LogId)
                                                        navigation.navigate('ScribePending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                                        else if(item.MessageTypeId===26){
                                                            const LogId=item.PushNotificationLogId
                                                            NotificationStatus(LogId)
                                                            navigation.navigate('ScribeFacilityPending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                           
                   }}>
               <View style={[styles.Itemcontainer,{marginLeft:responsiveWidth(5),paddingRight:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>

<View style={styles.Contentview}>
                        <Ionicons name='notifications-circle' color={'#808080'} size={30}/>
                        <View>
                    <Text style={{fontSize:12,fontFamily:item.MessageStatus==='UnRead'?'SpaceGrotesk-Bold':'SpaceGrotesk-Regular',paddingLeft:10,color:'black'}}>{item.MessageContent}</Text>
                    <Text style={{fontSize:12,marginLeft:10,color:"#808080",fontFamily:'SpaceGrotesk-Regular'}}>{moment.utc(item.NotificationDate,'YYYY-MM-DD').local().format('DD MMM')}  {moment.utc(item.NotificationTime,'HH:mm:ss').local().format('hh:mm A')}</Text>
                  </View>   
                    </View>
                 
                  
                    </View>
                    </TouchableOpacity>
                    
                
    )}}/>

            

        </View>
    )
};
export default ScribeNotification;
const styles=StyleSheet.create({
  Itemcontainer:{
   
   // padding:10,
    paddingTop:20,
    paddingBottom:20
       
       // backgroundColor:'white',
      //  elevation:5
        
    },
    Contentview:{
        flexDirection:'row',
        

     //  marginTop:verticalScale(40),
        alignItems:'center'
    },

})
