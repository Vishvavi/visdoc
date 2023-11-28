import { StyleSheet, Text, View ,TouchableOpacity,Linking} from 'react-native'
import React, { useEffect,useCallback,useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'

import moment from 'moment'
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import { useNotes } from '../NoteProvider';


const DetailView = ({route,navigation}) => {
    const{item,ID,VisitTypeId,Scribe,Usercreated}=route.params;
  const[Detailflow,setDetailflow]=useState([]);
  const{TimerList,ListRowcount,TimerReferralList}=useNotes();


useEffect(()=>{
    console.log(ID)
    console.log(Scribe);
    DetailInfo();
},[])

useDimensionsChange(
    useCallback(({ window, screen }) => {
     
    
    }, [])  
  ); 




  const DetailInfo=async()=>{
    if(VisitTypeId==="1000"){
    try{
const Url=`https://visdocapidev.azurewebsites.net/api/TelemedReferral/ViewAccepted/${item.AppointmentId}`
let result=await fetch(Url);
result= await result.json();
console.log(result)
setDetailflow(result?.ViewReferral[0])
    }catch(e){
        console.log(e);
    }
   }
   else{
    try{
    const Url=`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/ViewAccepted/${item.AppointmentId}`
    let result=await fetch(Url);
    result= await result.json();
    console.log(result)
    setDetailflow(result?.ViewReferral[0])
        }catch(e){
            console.log(e);
        }
       }
   }
   

    const ProviderCancel=async()=>{
        console.log(item.AppointmentId) 
    
        const data1={
            VisitTypeId:`${VisitTypeId}`,
            AppointmentId:`${item.AppointmentId}`,
            UserId:`${ID}`,
           }
        
          const url="https://visdocapidev.azurewebsites.net/api/CancelSchedule/"
           fetch(url,{
        
            method: 'Post',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data1)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);

if(json.Result==="Cancelled Successfully"){
    TimerReferralList()
    navigation.goBack()
   
}
        
        }).catch(e=>{
          console.log("e",e)
        })}


      

    const ItemView= (item) => {
        return(
           <View style={{  borderWidth:1,margin:responsiveWidth(5),padding:responsiveWidth(5),backgroundColor:'#eaeaea',borderRadius: 8, borderWidth: 3, borderColor: '#dcdcdc' }}>
       
           <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{width:50,height:50,backgroundColor:'#808080',borderRadius:8}}></View>
            <View style={{marginLeft:10}}>
            <Text style={{fontSize:22,width:responsiveWidth(60),borderWidth:0,color:'#333333',marginTop:3,fontFamily: 'SpaceGrotesk-Medium'}}>{item.PatientName}</Text>
            {item.LocationTypeName==='Facility'?(
            <Text style={{fontSize:12,color:'#333333',width:responsiveWidth(60),fontFamily: 'SpaceGrotesk-Regular'}}>{item.LocationTypeName}-{item.FacilityName}</Text>
            ):(
   <Text style={{fontSize:12,color:'#333333',width:responsiveWidth(60),fontFamily: 'SpaceGrotesk-Regular'}}>{item.LocationTypeName}-{item.HomeHealthCompanyName}</Text>
   
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
           {((Usercreated===true)||(Scribe==='FacilityScribe')||(Scribe==='HomehealthScribe')||(Scribe==='Scribe')||(Scribe==='FacilityHomehealthScribe'))?(
           <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular',marginTop:20,borderWidth:0,width:responsiveWidth(60)}}>Provider : {Detailflow?.ProviderName}</Text>
           ):(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular',marginTop:20,borderWidth:0,width:responsiveWidth(60)}}>Referred by : {Detailflow?.CreatedUser}</Text>
           )}
           <View style={{marginTop:responsiveHeight(5)}}>
          {// <Text style={{fontFamily: 'SpaceGrotesk-Regular',color:'#333333',fontSize:scale(12)}}>Referred by:</Text>
    }
           </View>
          
            <View style={{justifyContent:'center',borderWidth:0}}>

            {((Scribe==='FacilityScribe')||(Scribe==='HomehealthScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Usercreated===true))?(
                  <TouchableOpacity  onPress={()=>navigation.navigate('Reschedule',{item,ID,VisitTypeId,Scribe,Detailflow})}>
                  <Text style={{ fontSize: 12, color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular',alignSelf:'flex-start' }}>Reschedule</Text>
                  </TouchableOpacity>
            ):(
                <TouchableOpacity  style={{borderWidth:0,width:100}} onPress={()=> {
                    if(Detailflow.PatientLink!=null){
                    Linking.openURL(Detailflow.PatientLink)} 
                    
                    else{
                        console.log('onpress')
                    }}
                }>
                <Text style={{ fontSize: 12, color: '#0071bc',fontFamily: 'SpaceGrotesk-Regular',alignSelf:'flex-start' }}>Patient Chart</Text>
                </TouchableOpacity>

            )}

            {VisitTypeId==="1000"&&(
                  <TouchableOpacity style={{alignSelf:'center',position:'absolute',backgroundColor:'green',borderRadius:5}}
                  onPress={()=> {
                    if(item.MeetingLink!=null){
                    Linking.openURL(item.MeetingLink)} 
                    
                    else{
                        console.log('onpress')
                    }}
                }>
                
                    <Text  style={{paddingLeft:12,paddingRight:12,paddingTop:5,paddingBottom:5,borderRadius:5, fontSize: 12, color: 'white', borderColor: '#333333',fontFamily: 'SpaceGrotesk-Regular' }}>Join</Text>
                  </TouchableOpacity>
            )}
                 <TouchableOpacity style={{ alignSelf:'flex-end',position:'absolute',borderWidth:0,fontFamily: 'SpaceGrotesk-Regular' }} onPress={ProviderCancel}>
                  <Text style={{fontSize: 12, color: '#0071bc'}} >Cancel</Text>
                  </TouchableOpacity>
        
           </View>
        </View>
       )
   }

  


    return (
        <View style={{ flex: 1}}>
            <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft: responsiveWidth(5)}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular'}}>Patient Details</Text>
            </View>
            <ScrollView>
            <View style={{borderWidth:0}}>
           
              
             
             {ItemView(item)}
         
              </View>
              
           <View style={{marginLeft:responsiveWidth(5),marginTop:responsiveHeight(2)}}>
        
            <View style={{marginVertical:0}}>
           
            {(VisitTypeId==="1000")&&(
                <TouchableOpacity onPress={()=>navigation.navigate('NotesUpdate',{item,ID,VisitTypeId,Scribe})}>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:30}}>
                    <Text style={{color:'#808080',fontSize:14,marginLeft:0,fontFamily: 'SpaceGrotesk-Regular'}}>Telemed Notes</Text>
                    <Entypo style={{position:'absolute',  marginLeft: responsiveWidth(75) }} name='chevron-right' color={'#808080'} size={13} />
                </View>
                </TouchableOpacity>
                )}
               
            </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default DetailView;

const styles = StyleSheet.create({})