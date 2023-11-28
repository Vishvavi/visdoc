import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useEffect ,useState,useCallback} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { FlatList, ScrollView } from 'react-native-gesture-handler'

import moment from 'moment'
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import URL from '../Components/URL'





const ProposedDetailView = ({route,navigation}) => {
    const{item,ID,VisitTypeId,Scribe,Usercreated}=route.params;
    const[Reasonforvisit,setReasonforvisit]=useState('');
    const[ProposeDate,setProposeDate]=useState('');
    const[ProviderName,setProviderName]=useState('');
    const[ProposeTime,setProposeTime]=useState('');

useEffect(()=>{
    Reason();
    console.log(ID)
    console.log(Scribe);
    console.log(Usercreated)
},[])
useDimensionsChange(
    useCallback(({ window, screen }) => {
    
     // setchangeWidth(window.width)
     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [])  
  ); 


const ProviderAccept=async()=>{
  
if(VisitTypeId==="1000"){
    const data1={
        UserId: `${ID}`,
       ProposedAppointmentId: item.ProposedAppointmentId,
        Status: "Accept"
    }
    
      const url=URL.TelemedProposedUpdateStatus;
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
        ProposedAppointmentId: item.ProposedAppointmentId,
        Status: "Accept"
    }
    
      const url=URL.FacilityvisitProposedUpdateStatus;
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
  

    const data1={
        UserId: `${ID}`,
        ProposedAppointmentId: item.ProposedAppointmentId,
        Status: "Decline"
    }
    
      const url=URL.TelemedProposedUpdateStatus;
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
            ProposedAppointmentId: item.ProposedAppointmentId,
            Status: "Decline"
        }
        
          const url=URL.FacilityvisitProposedUpdateStatus;
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
    const Url=URL.TelemedViewProposed+`${item.ProposedAppointmentId}`;
    let result=await fetch(Url);
    result=await result.json();
    console.log(result)
    setReasonforvisit(result.ViewReferral[0].ReasonforVisit)
    setProviderName(result.ViewReferral[0].ProviderName)
    setProposeDate(result.ViewReferral[0].ProposedDate)
    setProposeTime(result.ViewReferral[0].ProposedTime)
    console.log(result.ViewReferral[0].ReasonforVisit)
            }catch(e){
                console.log(e);
            }
        }
        else if(VisitTypeId==="1001"){
            try{
    const Url=URL.FacilityvisitViewProposed+`${item.ProposedAppointmentId}`;
    let result=await fetch(Url);
    result=await result.json();
    console.log(result)
    setReasonforvisit(result.ViewReferral[0].ReasonforVisit)
    setProviderName(result.ViewReferral[0].ProviderName)
    setProposeDate(result.ViewReferral[0].ProposedDate)
    setProposeTime(result.ViewReferral[0].ProposedTime)
    console.log(result.ViewReferral[0].ReasonforVisit)
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
           <View style={{ borderWidth:1,marginLeft:responsiveWidth(5),padding:responsiveWidth(5),marginRight:responsiveWidth(5), marginTop: 20,backgroundColor:'#eaeaea',borderRadius: 8, borderWidth: 3, borderColor: '#dcdcdc' }}>
       
           <View style={{flexDirection:'row'}}>
            <View style={{width:50,height:50,backgroundColor:'#808080',borderRadius:8}}></View>
            <View style={{}}>
            <Text style={{fontSize:22,width:responsiveWidth(65),borderWidth:0,color:'#333333',marginTop:0,fontFamily: 'SpaceGrotesk-Medium',marginLeft:10}}>{item?.PatientName}</Text>
            {item?.LocationTypeName==='Facility'?(
            <Text style={{fontSize:12,color:'#333333',fontFamily: 'SpaceGrotesk-Regular',marginLeft:10}}>{item?.LocationTypeName}-{item?.FacilityName}</Text>
            ):(
         <Text style={{fontSize:12,color:'#333333',fontFamily:'SpaceGrotesk-Regular',marginLeft:10}}>{item?.LocationTypeName}-{item?.HomeHealthCompanyName}</Text>
   
            )}
            </View>
           </View>
           <View style={{margin:10}}>
            {VisitTypeId==="1000"?(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>Telemed-{item?.SpecialtyType}</Text>
            ):(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>Facility-{item?.SpecialtyType}</Text>
            )}
           {// <Text style={{fontSize:22,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>{moment(item.AppointmentDate).format("MMM' D.YYYY")} | {moment(item.AppointmentTime,'HH:mm:ss').format('hh:mm A')}</Text>
            //
        }
            <Text style={{fontSize:14,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>{moment(ProposeDate).format("MMM' D.YYYY")} | {moment(ProposeTime,'HH:mm:ss').format('hh:mm A')}</Text>     
            <Text style={{fontSize:14,color:'#333333',fontFamily: 'SpaceGrotesk-Regular',marginTop:20}}>Provider Name : {ProviderName}</Text>          
          
           </View>
           <View style={{margin:10}}>
          {// <Text style={{fontFamily: 'SpaceGrotesk-Regular',color:'#333333',fontSize:scale(12)}}>Referred by:</Text>
    }
           </View>
           <View style={{margin:10,marginTop:10}}>
            {((Scribe==='FacilityScribe')||(Scribe==='HomehealthScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe'))&&(
            <TouchableOpacity >
            {//onPress={()=>navigation.navigate('Reschedule',{item,ID,VisitTypeId,Scribe})}>
           //</View> <Text style={{color:'#0071bc',fontSize:scale(12),fontFamily: 'SpaceGrotesk-Regular'}}>Reschedule</Text>
            }
           </TouchableOpacity>
            )}
            {/* {((Scribe==='Provider'&& Usercreated===false)||(Scribe==='Hospitalist'&& Usercreated===false))&&(
            <TouchableOpacity
            onPress={ProviderCancel}>
           { //style={{width:scale(120),height:scale(40),alignItems:'center',top:scale(-25),alignSelf:'flex-end',justifyContent:'center',backgroundColor:'green',borderRadius:scale(8)}}>
    }
         <Text  style={{color:'#0071bc',fontSize:15,fontFamily: 'SpaceGrotesk-Regular'}}>Cancel</Text>
            </TouchableOpacity>
             )}
             */
}
             {((Scribe==='FacilityScribe')||(Scribe==='HomehealthScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Usercreated===true))&&(
             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
            onPress={ProviderAccept}>
           { //style={{width:scale(120),height:scale(40),alignItems:'center',top:scale(-25),alignSelf:'flex-end',justifyContent:'center',backgroundColor:'green',borderRadius:scale(8)}}>
    }
         <Text  style={{color:'#0071bc',fontSize:12,fontFamily: 'SpaceGrotesk-Regular'}}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={ProviderDecline}>
           { //style={{width:scale(120),height:scale(40),alignItems:'center',top:scale(-25),alignSelf:'flex-end',justifyContent:'center',backgroundColor:'green',borderRadius:scale(8)}}>
    }
         <Text  style={{color:'#0071bc',fontSize:12,marginLeft:20,fontFamily: 'SpaceGrotesk-Regular'}}>Decline</Text>
            </TouchableOpacity>
          
            </View>
             )}
           </View>
        </View>
       )
   }


    


    return (
        <View style={{ flex: 1}}>
            <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft:responsiveWidth(5)}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={28} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular'}}>Patient Details</Text>
            </View>
            <ScrollView>
            <View style={{borderWidth:0}}>
           
              
             
             {ItemView(item)}
         
              </View>
              
           <View style={{marginTop:20}}>
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

              <Text style={{color:'black',fontSize:14,fontFamily: 'SpaceGrotesk-Regular'}}>Reason For Visit</Text>
              <Text style={{color:'#808080',fontSize:12,marginTop:20,fontFamily: 'SpaceGrotesk-Regular'}}>{Reasonforvisit}</Text>
            </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default ProposedDetailView;

const styles = StyleSheet.create({})