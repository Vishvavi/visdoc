import { height, style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React ,{useState,useCallback}from 'react';
import {Text,View,StyleSheet,FlatList,TouchableOpacity,RefreshControl} from 'react-native';

import Header from '../Components/Header';

import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useProgressViewOffset from '../Components/ProgressViewOffset';
import moment from 'moment';
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import { useNotes } from '../NoteProvider';
import URL from '../Components/URL';


const ProviderNotification=({navigation,route})=>{

   const{Scribe,ID}=route.params;

   // const[Notification,setNotification]=useState([]);
    const[refreshing,setRefreshing]=useState(false);
    const progressViewOffset = useProgressViewOffset();
    const{Notification,NotificationLog}=useNotes()


   
useDimensionsChange(
    useCallback(({ window, screen }) => {
    //  console.log(window);
     // console.log(screen);
     // setchangeWidth(window.width)
     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [])  
  ); 

useEffect(()=>{
NotificationLog();
},[])


const callbackNotification=()=>{
    NotificationLog();
}

  {/* const NotificationLog=async()=>{
    try{
   const url=`https://visdocapidev.azurewebsites.net/api/PushNotification/ViewLogStatus/${ID}`;
   let result=await fetch(url);
   result=await result?.json();
   if(result.NotificationList.code==="EINVALIDSTATE"){
    callbackNotification()
   }
   else{
   setNotification(result?.NotificationList);
  // console.log(result)
   }}catch(e){
    console.log(e);
   }
 }
*/
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

 const onRefresh =() => {
    
    setRefreshing(true)
        NotificationLog();
        setTimeout(()=>{
            setRefreshing(false);
        },1000);
     }
     const Redirect=true;
    return(
        <View style={{flex:1,backgroundColor:'#dcdcdc'}}>
            <Header
            TabName='Notification'
            ID={ID}
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
                       
                        if((item.MessageTypeId===2)&&(item.IsHospitalist!='true')){
                            const usercreated=false
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                        navigation.navigate('Accepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect,usercreated})}
                       
                        else if((item.MessageTypeId===2)&&(item.IsHospitalist==='true')&&(item.CreatedUser!=ID)){
                            const usercreated=false
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                        navigation.navigate('Accepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect,usercreated})}
                        
                        else if((item.MessageTypeId===2)&&(item.IsHospitalist==='true')&&(item.CreatedUser===ID)){
                            const usercreated=false
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                        navigation.navigate('Acceptedforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect,usercreated})}
                        else if((item.MessageTypeId===1)){
                            const usercreated=false
                            const LogId=item.PushNotificationLogId
                            NotificationStatus(LogId)
                            navigation.navigate('Pending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})}
                           
                            else if((item.MessageTypeId===4)&&(item.IsHospitalist === 'true')&&(item.CreatedUser === ID)){
                                // const usercreated=Scribe==="Hospitalist"?true:false
                                     const LogId=item.PushNotificationLogId
                                     NotificationStatus(LogId)
                                     navigation.navigate('Proposedforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
                              }
                              else if((item.MessageTypeId===4)&&(item.IsHospitalist!='true')){
                                     const LogId=item.PushNotificationLogId
                                     NotificationStatus(LogId)
                                     navigation.navigate('ProposedData',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})    
                              }
                              else if((item.MessageTypeId===4)&&(item.IsHospitalist==='true')&&(item.CreatedUser!=ID)){
                                 const LogId=item.PushNotificationLogId
                                 NotificationStatus(LogId)
                                 navigation.navigate('ProposedData',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})    
                          }
                                // else if(item.MessageTypeId===5){
                                //     const LogId=item.PushNotificationLogId
                                //     const usercreated=false
                                //     NotificationStatus(LogId)
                                //     navigation.navigate('Pending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})}
                          
                                else if((item.MessageTypeId===6)&&(Scribe==="Hospitalist") ){
                               
                             
                                const LogId=item.PushNotificationLogId
                                NotificationStatus(LogId)
                                navigation.navigate('Pendingforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                
                                else if((item.MessageTypeId===6)&&(Scribe==="Provider") ){
                               
                                   
                                     const LogId=item.PushNotificationLogId
                                     NotificationStatus(LogId)
                                     navigation.navigate('Pending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})}
                                     
                            
                      
                        //         else if((item.MessageTypeId===7)&&(Scribe==='Hospitalist')){//hospitalist
                        //     const LogId=item.PushNotificationLogId
                        //   //  const usercreated=Scribe==="Hospitalist"?true:false
                        //         NotificationStatus(LogId)
                        //         navigation.navigate('Acceptedforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                            
                        //      }
                             
                        //      else if((item.MessageTypeId===7)&&(Scribe==='Provider')){//hospitalist
                        //         const LogId=item.PushNotificationLogId
                        //       //  const usercreated=Scribe==="Hospitalist"?true:false
                        //             NotificationStatus(LogId)
                        //             navigation.navigate('Accepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
    
                                
                        //          }
                             

                             else if((item.MessageTypeId===9)&&(Scribe==='Hospitalist')){
                               
                               // const usercreated=Scribe==="Hospitalist"?true:false
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('Proposedforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                
                                    
                             }
                             else if((item.MessageTypeId===9)&&(Scribe==="Provider")){
                               
                                
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('ProposedData',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                
                                    
                             }
                             else if((item.MessageTypeId===10)&&(Scribe==='Hospitalist')){
                               
                              
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('Pendingforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                }
                                else if((item.MessageTypeId===10)&&(Scribe==='Provider')){
                               
                              
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('Pending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                }
                             else if(item.MessageTypeId===11){
                                const usercreated=false
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityPendingRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})

                                
                                    
                             }
                             else if((item.MessageTypeId===12)&&(item.IsHospitalist !='true')){
                               
                                const usercreated=false
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityAcceptedRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})

                                  }
                             else if((item.MessageTypeId===12)&&(item.IsHospitalist ==='true')&&(item.CreatedUser !=ID)){
                               
                                const usercreated=false
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityAcceptedRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})

                                  }
                                  else if((item.MessageTypeId===12)&&(item.IsHospitalist === 'true')&&(item.CreatedUser === ID)){
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('AcceptedforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
                                }
                            //  else if(item.MessageTypeId===13){
                               
                            //     const usercreated=false
                            //         const LogId=item.PushNotificationLogId
                            //         NotificationStatus(LogId)
                            //         navigation.navigate('FacilityDeclinedRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})

                            // }
                             else if((item.MessageTypeId===14)&&(item.IsHospitalist!='true')){
                                const usercreated=false
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityProposeRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                   }
                                   else if((item.MessageTypeId===14)&&(item.IsHospitalist === 'true')&&(item.CreatedUser != ID)){
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityProposeRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
                                }  
                                
                                else if((item.MessageTypeId===14)&&(item.IsHospitalist === 'true')&&(item.CreatedUser === ID)){
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('ProposedforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
                                }  
                             else if(item.MessageTypeId===15){
                                const usercreated=false
                                const LogId=item.PushNotificationLogId
                                NotificationStatus(LogId)
                                navigation.navigate('FacilityPendingRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                              }
                              
                             else if((item.MessageTypeId===16)&&(Scribe==="Hospitalist")){
                             
                               
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('PendingforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
                               }
                               else if((item.MessageTypeId===16)&&(Scribe==="Provider")){
                             
                           
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityPendingRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
                               }
                            
                             else if((item.MessageTypeId===17)&&(Scribe==="Hospitalist")){
                               
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('AcceptedforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                }
                                else if((item.MessageTypeId===17)&&(Scribe==="Provider")){
                               
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityAcceptedRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                }
                              

                             else if((item.MessageTypeId===19)&&(Scribe==="Hospitalist")){
                               
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('ProposedforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                }
                                else if((item.MessageTypeId===19)&&(Scribe==="Provider")){
                               
                                    const LogId=item.PushNotificationLogId
                                    NotificationStatus(LogId)
                                    navigation.navigate('FacilityProposeRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})

                                }
                     else if((item.MessageTypeId===20)&&(Scribe==="Hospitalist")){
                       
                                        const LogId=item.PushNotificationLogId
                                        NotificationStatus(LogId)
                                        navigation.navigate('PendingforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
    
                                    
                                    }
                                    else if((item.MessageTypeId===20)&&(Scribe==="Provider")){
                       
                                        const LogId=item.PushNotificationLogId
                                        NotificationStatus(LogId)
                                        navigation.navigate('FacilityPendingRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,Redirect:Redirect})
    
                                    
                                    }
                                    else if((item.MessageTypeId===21)&&(item.IsHospitalist!='true')){
                                        const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('Accepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
        
                                        }
                                        
                                  else if((item.MessageTypeId===21)&&(item.IsHospitalist === 'true')&&(item.CreatedUser === ID)){
                                            const usercreated=false
                                                const LogId=item.PushNotificationLogId
                                                NotificationStatus(LogId)
                                                navigation.navigate('Acceptedforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        }  
                                        else if((item.MessageTypeId===21)&&(item.IsHospitalist === 'true')&&(item.CreatedUser != ID)){
                                            const usercreated=false
                                                const LogId=item.PushNotificationLogId
                                                NotificationStatus(LogId)
                                                navigation.navigate('Accepted',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        }       
                                    else if(item.MessageTypeId===22){
                                        const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('DeclinedList',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
        
                                        
                                    }     
                                    else if((item.MessageTypeId===23)&&(item.IsHospitalist!='true')){
                                        const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('FacilityAcceptedRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
        
                                         }
                                         else if((item.MessageTypeId===23)&&(item.IsHospitalist === 'true')&&(item.CreatedUser === ID)){
                                            const usercreated=false
                                                const LogId=item.PushNotificationLogId
                                                NotificationStatus(LogId)
                                                navigation.navigate('AcceptedforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        } 
                                        else if((item.MessageTypeId===23)&&(item.IsHospitalist === 'true')&&(item.CreatedUser != ID)){
                                            const usercreated=false
                                                const LogId=item.PushNotificationLogId
                                                NotificationStatus(LogId)
                                                navigation.navigate('FacilityAcceptedRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        } 
                                         else if(item.MessageTypeId===24){
                                            const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('FacilityDeclinedRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
        
                                        }        
                                        else if((item.MessageTypeId===25)&&(item.IsHospitalist != 'true')){
                                            const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('Pending',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        }    
                                        else if((item.MessageTypeId===25)&&(Scribe==='Hospitalist')&&(item.IsHospitalist === 'true')&&(item.CreatedUser === ID)){
                                            const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('Pendingforcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        }     
                                        else if((item.MessageTypeId===26)&&(item.IsHospitalist != 'true')){
                                            const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('FacilityPendingRef',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        }  
                                        else if((item.MessageTypeId===26)&&(Scribe==='Hospitalist')&&(item.IsHospitalist === 'true')&&(item.CreatedUser === ID)){
                                            const usercreated=false
                                            const LogId=item.PushNotificationLogId
                                            NotificationStatus(LogId)
                                            navigation.navigate('PendingforFcreated',{ID,Scribe,Tab:3,AppointmentId:item.AppointmentId,usercreated,Redirect:Redirect})
                                        }                    
                        }}>
                            
               <View style={[styles.Itemcontainer,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5),paddingRight:responsiveWidth(5),borderWidth:0}]}>

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
export default ProviderNotification;
const styles=StyleSheet.create({
  Itemcontainer:{
        marginLeft:16,
        marginRight:16,
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
