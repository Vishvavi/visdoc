import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useEffect ,useState,useCallback} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { FlatList, ScrollView } from 'react-native-gesture-handler'

import moment from 'moment'
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'




const DeclinedDetailView = ({route,navigation}) => {
    const{item,ID,VisitTypeId,Scribe,Usercreated}=route.params;
    const[Reasonforvisit,setReasonforvisit]=useState('');
    useDimensionsChange(
      useCallback(({ window, screen }) => {
      
       // setchangeWidth(window.width)
       // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }, [])  
    ); 


useEffect(()=>{
 
    console.log(ID)
    console.log(Scribe);
    console.log(Usercreated)
},[])

const ProviderAccept=async()=>{
    console.log(item.AppointmentId) 
if(VisitTypeId==="1000"){
    const data1={
        UserId: `${ID}`,
        AppointmentId: item.AppointmentId,
        Status: "Accept"
    }
    
      const url="https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateStatus"
       fetch(url,{
    
        method: 'PUT',
       headers: { 
          
          'Content-Type': 'application/json' 
          },
       body:JSON.stringify(data1)
    
    }).then(response=>response.json()).then(json=>{
      console.log(json);
      navigation.goBack();
   
    }).catch(e=>{
      console.log("e",e)
    })
}
else if(VisitTypeId==="1001"){
    const data1={
        UserId: `${ID}`,
        AppointmentId: item.AppointmentId,
        Status: "Accept"
    }
    
      const url="https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/UpdateStatus"
       fetch(url,{
    
        method: 'PUT',
       headers: { 
          
          'Content-Type': 'application/json' 
          },
       body:JSON.stringify(data1)
    
    }).then(response=>response.json()).then(json=>{
      console.log(json);
    
      navigation.goBack();
    }).catch(e=>{
      console.log("e",e)
    })
}

}

const ProviderDecline=async()=>{
    if(VisitTypeId==="1000"){
    console.log(item.AppointmentId) 

    const data1={
        UserId: `${ID}`,
        AppointmentId: item.AppointmentId,
        Status: "Decline"
    }
    
      const url="https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateStatus"
       fetch(url,{
    
        method: 'PUT',
       headers: { 
          
          'Content-Type': 'application/json' 
          },
       body:JSON.stringify(data1)
    
    }).then(response=>response.json()).then(json=>{
      console.log(json);
     // PendingReferalList();
     navigation.goBack();
     // setProvider(json.Providers);
    }).catch(e=>{
      console.log("e",e)
    })
    }
    else if(VisitTypeId==="1001"){
        const data1={
            UserId: `${ID}`,
            AppointmentId: item.AppointmentId,
            Status: "Decline"
        }
        
          const url="https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/UpdateStatus"
           fetch(url,{
        
            method: 'PUT',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data1)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);
          navigation.goBack();
         // PendingReferalList();
         // setProvider(json.Providers);
        }).catch(e=>{
          console.log("e",e)
        })

    }
}

    const Reason=async()=>{
        if(VisitTypeId==="1000"){
            try{
    const Url=`https://visdocapidev.azurewebsites.net/api/TelemedReferral/ViewPending/${item.AppointmentId}`;
    let result=await fetch(Url);
    result=await result.json();
    console.log(result)
    setReasonforvisit(result.Referral[0].ReasonforVisit)
    console.log(result.Referral[0].ReasonforVisit)
            }catch(e){
                console.log(e);
            }
        }
        else if(VisitTypeId==="1001"){
            try{
    const Url=`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/ViewPending/${item.AppointmentId}`;
    let result=await fetch(Url);
    result=await result.json();
    console.log(result)
    setReasonforvisit(result.Referral[0].ReasonforVisit)
    console.log(result.Referral[0].ReasonforVisit)
            }catch(e){
                console.log(e);
            }
    }
    else{
        console.log('error')
    }
    }
    
    const ItemView= (item) => {
        return(
           <View style={{  borderWidth:1,padding:responsiveWidth(5),margin:responsiveWidth(5),backgroundColor:'#eaeaea',borderRadius: 8, borderWidth: 3, borderColor: '#dcdcdc' }}>
       
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{width:50,height:50,backgroundColor:'#808080',borderRadius:8,}}></View>
            <View style={{marginLeft:10}}>
            <Text style={{fontSize:22,width:responsiveWidth(55),borderWidth:0,color:'#333333',marginTop:3,fontFamily: 'SpaceGrotesk-Medium'}}>{item.PatientName}</Text>
            {item.LocationTypeName==='Facility'?(
            <Text style={{fontSize:12,color:'#333333',width:responsiveWidth(55),fontFamily: 'SpaceGrotesk-Regular'}}>{item.LocationTypeName}-{item.FacilityName}</Text>
            ):(
   <Text style={{fontSize:12,color:'#333333',width:responsiveWidth(55),fontFamily: 'SpaceGrotesk-Regular'}}>{item.LocationTypeName}-{item.HomeHealthCompanyName}</Text>
   
            )}
            </View>
           </View>
           <View style={{marginTop:responsiveHeight(5)}}>
            {VisitTypeId==="1000"?(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>Telemed-{item.SpecialtyType}</Text>
            ):(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>Facility-{item.SpecialtyType}</Text>
            )}
            <Text style={{fontSize:12,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>{moment(item.AppointmentDate).format("MMM' D.YYYY")} | {moment(item.AppointmentTime,'HH:mm:ss').format('hh:mm A')}</Text>
          
           </View>
           <View style={{}}>
          {// <Text style={{fontFamily: 'SpaceGrotesk-Regular',color:'#333333',fontSize:scale(12)}}>Referred by:</Text>
    }
           </View>
           <View style={{marginTop:responsiveHeight(5)}}>
            {((Scribe==='FacilityScribe')||(Scribe==='HomehealthScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe'))&&(
            <TouchableOpacity >
            {//onPress={()=>navigation.navigate('Reschedule',{item,ID,VisitTypeId,Scribe})}>
           //</View> <Text style={{color:'#0071bc',fontSize:scale(12),fontFamily: 'SpaceGrotesk-Regular'}}>Reschedule</Text>
            }
           </TouchableOpacity>
            )}
           
             {((Scribe==="Provider")||((Scribe==="Hospitalist")&&(Usercreated===false)))&&(
             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
            onPress={ProviderAccept}>
           { //style={{width:scale(120),height:scale(40),alignItems:'center',top:scale(-25),alignSelf:'flex-end',justifyContent:'center',backgroundColor:'green',borderRadius:scale(8)}}>
    }
        
         <Text  style={{color:'#0071bc',fontSize:15,marginLeft:0,fontFamily: 'SpaceGrotesk-Regular'}}>Accept</Text>
            </TouchableOpacity>
            </View>
             )}
           </View>
        </View>
       )
   }


    const ProviderCancel=async()=>{
        console.log(item.AppointmentId) 
    
        const data1={
            UserId: `${ID}`,
            AppointmentId:item.AppointmentId,
            Status: "Cancel"
           
           
        }
        
          const url="https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateStatus"
           fetch(url,{
        
            method: 'PUT',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data1)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);

if(json.Result==="Cancelled Successfully"){
    navigation.goBack()
}
        
        }).catch(e=>{
          console.log("e",e)
        })}


        function tConvert (time) {
            var ts = time;
            var H = +ts.substr(0, 2);
            var h = (H % 12) || 12;
            h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
            var ampm = H < 12 ? " AM" : " PM";
            ts = h + ts.substr(2, 3) + ampm;
            return ts;
          }


    return (
        <View style={{ flex: 1}}>
            <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft:responsiveWidth(5)}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular'}}>Patient Details</Text>
            </View>
            <ScrollView>
            <View style={{borderWidth:0}}>
           
              
             
             {ItemView(item)}
         
              </View>
              
           <View style={{}}>
         {//   <Text style={{fontSize:scale(12),color:'#808080',marginTop:scale(20),marginLeft:0,fontFamily: 'SpaceGrotesk-Regular'}}>Report</Text>
           // <View style={{flexDirection:'row',marginTop:10,}}>
             //   <TouchableOpacity style={{backgroundColor:'#dcdcdc',borderRadius:scale(8),height:scale(25),width:scale(60),alignItems:'center',justifyContent:'center'}}>
             //       <Text style={{fontSize:scale(12),color:'#808080',fontFamily: 'SpaceGrotesk-Regular',}}>No Show</Text>
             //   </TouchableOpacity>
              //  <TouchableOpacity style={{backgroundColor:'#dcdcdc',borderRadius:8,marginLeft:0,marginLeft:scale(10),height:scale(25),width:scale(60),alignItems:'center',justifyContent:'center'}}>
              //      <Text style={{fontSize:scale(12),color:'#808080',fontFamily: 'SpaceGrotesk-Regular'}}>Here</Text>
              //  </TouchableOpacity>
              //  <TouchableOpacity style={{backgroundColor:'#dcdcdc',width:scale(70),marginLeft:scale(10),height:scale(25),alignItems:'center',justifyContent:'center',borderRadius:8}}>
              //      <Text style={{fontSize:scale(12),color:'#808080',fontFamily: 'SpaceGrotesk-Regular'}}>Room No</Text>
             //   </TouchableOpacity>
              //  <TouchableOpacity style={{backgroundColor:'#dcdcdc',width:scale(90),marginLeft:scale(10),height:scale(25),alignItems:'center',justifyContent:'center',borderRadius:8}}>
              //      <Text style={{fontSize:scale(12),color:'#808080',fontFamily: 'SpaceGrotesk-Regular'}}>Completed</Text>
              //  </TouchableOpacity>
            //</View>
         }
            <View style={{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}}>
            { //   <View style={{flexDirection:'row',alignItems:'center',marginTop:30}}>
              //      <Text style={{color:'#808080',fontSize:scale(12),marginLeft:0,fontFamily: 'SpaceGrotesk-Regular'}}>Supporting Documents</Text>
               //     <Text style={{color:'#0071bc',marginLeft:20,fontSize:scale(12),fontFamily: 'SpaceGrotesk-Regular'}}>4 - uploaded</Text>
                //    <FontAwesome5 style={{marginLeft:scale(300),position:'absolute' }} name='chevron-right' color={'#808080'} size={13} />
               // </View>
            }
         
              {  //<View style={{flexDirection:'row',marginTop:verticalScale(30),alignItems:'center',justifyContent:'space-between'}}>
                //    <Text style={{color:'#808080',fontSize:scale(12),marginLeft:0,fontFamily: 'SpaceGrotesk-Regular'}}>Cancel Schedule</Text>
                  //  <FontAwesome5 style={{marginLeft:scale(300),position:'absolute' }} name='chevron-right' color={'#808080'} size={scale(13)} />
               // </View>
              }
{
             // <Text style={{color:'black',fontSize:14,fontFamily: 'SpaceGrotesk-Regular'}}>Reason For Visit</Text>
             // <Text style={{color:'#808080',fontSize:12,marginTop:20,fontFamily: 'SpaceGrotesk-Regular'}}>{Reasonforvisit}</Text>
           }
            </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default DeclinedDetailView;

const styles = StyleSheet.create({})