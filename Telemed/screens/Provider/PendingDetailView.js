import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useEffect ,useState,useCallback} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import moment from 'moment'
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import { Root, Popup ,Toast} from '../Components/popup-ui';
import URL from '../Components/URL'




const PendingDetailView = ({route,navigation}) => {
    const{item,ID,VisitTypeId,Scribe,Usercreated}=route.params;
    const[Reasonforvisit,setReasonforvisit]=useState('');
    const[Disable,setDisable]=useState(false);
const[Detailflow,setDetailflow]=useState([]);

    useDimensionsChange(
      useCallback(({ window, screen }) => {
      
    
      }, [])  
    ); 


useEffect(()=>{
   
    console.log(ID)
    console.log(Scribe);
    console.log(Usercreated)
    DetailInfo();
},[])
const DetailInfo=async()=>{
  if(VisitTypeId==="1000"){
  try{
const Url=URL.TelemedViewPending+`${item.AppointmentId}`
let result=await fetch(Url);
result= await result.json();
//console.log(result.Referral[0].CreatedUser)
setDetailflow(result?.Referral[0])

  }catch(e){
      console.log(e);
  }
 }
 else{
  try{
  const Url=URL.FacilityVisitViewPending+`${item.AppointmentId}`
  let result=await fetch(Url);
  result= await result.json();
  console.log(result)
  if(result.ViewReferral.Referral.code==="ENVALIDSTATE"){
    DetailInfo()
  }
  else{
  setDetailflow(result?.ViewReferral.Referral[0])
  console.log(result?.ViewReferral.Referral[0])
  
  }
      }catch(e){
          console.log(e);
      }
     }
 }

 const CurrentTime=`${moment(new Date()).format('HH:mm:ss')}`
 
const ProviderAccept=async()=>{
  setDisable(true);
    console.log(item.AppointmentId) 
if(VisitTypeId==="1000"){
    const data1={
        UserId: `${ID}`,
        AppointmentId: item.AppointmentId,
        Status: "Accept"
    }
    const newdate=moment(new Date()).format('YYYY-MM-DD')
    if((item.AppointmentTime<CurrentTime)&&(item.AppointmentDate===newdate)){
      console.log('expired')
      Alert()
   
}
else{
    
      const url=URL.TelemedUpdateStatus;
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
else if(VisitTypeId==="1001"){
    const data1={
        UserId: `${ID}`,
        AppointmentId: item.AppointmentId,
        Status: "Accept"
    }
    const newdate=moment(new Date()).format('YYYY-MM-DD')
    if((item.AppointmentTime<CurrentTime)&&(item.AppointmentDate===newdate)){
      console.log('expired')
      Alert()
   
}
else{
    
      const url=URL.FacilityvisitUpdateStatus;
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
}}

}

const ProviderDecline=async()=>{
    if(VisitTypeId==="1000"){
    console.log(item.AppointmentId) 

    const data1={
        UserId: `${ID}`,
        AppointmentId: item.AppointmentId,
        Status: "Decline"
    }
    
      const url=URL.TelemedUpdateStatus;
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
    
        
          const url=URL.FacilityvisitUpdateStatus;
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
const Alert=()=>{

   
  Popup.show({
    type: 'Warning',
    title: 'Expired',
    button: true,
    button2:false,
    textBody: 'Time Expired',
    buttonText: 'Ok',
    callback: () => {Popup.hide()
  
    },
      
    callback2:()=>{
      Popup.hide()
      console.log('hide')}
  })
  }
   
    
    const ItemView= (item) => {
        return(
           <View style={{  borderWidth:1,padding:10,margin:responsiveWidth(5),padding:responsiveWidth(5),backgroundColor:'#eaeaea',borderRadius: 8, borderWidth: 3, borderColor: '#dcdcdc' }}>
       
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{width:50,height:50,backgroundColor:'#808080',borderRadius:8,}}></View>
            <View style={{}}>
            <Text style={{fontSize:22,width:responsiveWidth(50),marginLeft:10,borderWidth:0,color:'#333333',marginTop:3,fontFamily: 'SpaceGrotesk-Medium'}}>{item.PatientName}</Text>
            {item.LocationTypeName==='Facility'?(
            <Text style={{fontSize:12,color:'#333333',marginLeft:10,fontFamily: 'SpaceGrotesk-Regular',width:responsiveWidth(50)}}>{item.LocationTypeName}-{item.FacilityName}</Text>
            ):(
   <Text style={{fontSize:12,color:'#333333',fontFamily: 'SpaceGrotesk-Regular',marginLeft:10,width:responsiveWidth(50)}}>{item.LocationTypeName}-{item.HomeHealthCompanyName}</Text>
   
            )}
            </View>
           </View>
           <View style={{marginTop:responsiveHeight(5)}}>
            {VisitTypeId==="1000"?(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>Telemed-{item.SpecialtyType}</Text>
            ):(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>Facility-{item.SpecialtyType}</Text>
            )}
            <Text style={{fontSize:14,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>{moment(item.AppointmentDate).format("MMM' D.YYYY")} | {moment(item.AppointmentTime,'HH:mm:ss').format('hh:mm A')}</Text>
          
           </View>
           <View style={{}}>
           <Text style={{fontFamily: 'SpaceGrotesk-Regular',color:'#333333',fontSize:17,marginTop:20,width:responsiveWidth(70),borderWidth:0}}>Created by:{Detailflow?.CreatedUser}</Text>
    
           </View>
           <View style={{marginTop:60}}>
          
             {((Scribe==='FacilityScribe')||(Scribe==='HomehealthScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Usercreated===true))&&(
            <TouchableOpacity
            onPress={ProviderCancel}>
          
         <Text  style={{color:'#0071bc',fontSize:15,fontFamily: 'SpaceGrotesk-Regular'}}>Cancel</Text>
            </TouchableOpacity>
             )}
             {((Scribe==="Provider")||(Scribe==="Hospitalist"&&Usercreated===false))&&(
             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
              disabled={Disable}
            onPress={ProviderAccept}>
         
         <Text  style={{color:'#0071bc',fontSize:15,fontFamily: 'SpaceGrotesk-Regular'}}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
          
            onPress={ProviderDecline}>
         
         <Text  style={{color:'#0071bc',fontSize:15,marginLeft:20,fontFamily: 'SpaceGrotesk-Regular'}}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>  navigation.navigate("ProposeTime",{ID,AppointmentId:item.AppointmentId,VisitTypeId,Scribe,Detailflow,item})}>
        
         <Text  style={{color:'#0071bc',fontSize:15,marginLeft:20,fontFamily: 'SpaceGrotesk-Regular'}}>Propose</Text>
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
        
          const url=URL.TelemedUpdateStatus;
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


      


    return (
      <Root>
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

              <Text style={{color:'black',fontSize:14,fontFamily: 'SpaceGrotesk-Regular'}}>Reason For Visit</Text>
              <Text style={{color:'#808080',fontSize:12,marginTop:20,fontFamily: 'SpaceGrotesk-Regular'}}>{Detailflow?.ReasonforVisit}</Text>
            </View>
            </View>
            </ScrollView>
        </View>
        </Root>
    )
}

export default PendingDetailView;

const styles = StyleSheet.create({})