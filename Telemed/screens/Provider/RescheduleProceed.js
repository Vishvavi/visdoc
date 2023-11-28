import { StyleSheet, Text, View ,Alert,TouchableOpacity} from 'react-native'
import React, { useEffect,useState } from 'react'

import moment from 'moment';
import { Root, Popup ,Toast} from '../Components/popup-ui';
import URL from '../Components/URL';
import Octicons from 'react-native-vector-icons/Octicons';


const RescheduleProceed = ({navigation,route}) => {
  const{ID,item,AssignedTime,Scribe,cout,VisitTypeId,AssignedDate,selectedProvider}=route.params;
  const[FacilityName,setFacilityName]=useState([]);
  const[PatientName,setPatientName]=useState([]);
  const[SpecialityName,setSpecialityName]=useState([]);
  const[HomehealthName,setHomehealthName]=useState([]);

  const ToSignup = () =>{
  //  navigation.navigate('Appointments',{ID})
  PostReferral();
  }
  useEffect(()=>{
   // moment(`${Hour.hour}:${Minutes.min} ${Am}`,'hh:mm A').format("HH:mm:ss")
 
    //FacilityApi();
    //PatientNameApi();
    //SpecialityApi();
    console.log(ID)
    console.log(Scribe)


  },[])
  const popupshow=()=>{
    return(
     
  Popup.show({
    type: 'Success',
    title: 'Appointment Requested',
    button: true,
    button2:false,
    textBody: 'Appointment Rescheduled Successfully done',
    buttonText: 'Ok',
    callback: () => {Popup.hide()
    navigation.navigate('Appointments',{ID,Scribe});
    },
    callback2: () => {Popup.hide()
      navigation.navigate('Appointments',{ID,Scribe});
      }
  })
)}
const Scribepopupshow=()=>{
 
   
  Popup.show({
  type: 'Success',
  title: 'Appointment',
  button: true,
  button2:false,
  textBody: 'Appointment Rescheduled Successfully done',
  buttonText: 'Ok',
  callback: () => {Popup.hide()
  navigation.navigate('ScribeAppointments',{ID,Scribe});
  },
    
  callback2:()=>{
    Popup.hide()
    console.log('hide')}
})
}
const Providerpopupshow=()=>{
  
   
Popup.show({
  type: 'Success',
  title: 'Appointment',
  button: true,
  button2:false,
  textBody: 'Appointment Rescheduled Successfully done',
  buttonText: 'Ok',
  callback: () => {Popup.hide()
  navigation.navigate('Appointments',{ID,Scribe});
  },
    
  callback2:()=>{
    Popup.hide()
    console.log('hide')}
})
}

  

        useEffect(()=>{
console.log('userid',ID)
        },[])
        const PostReferral=async()=>{
       

        
          const data={
            VisitTypeId: `${VisitTypeId}`,
            AppointmentId:`${item.AppointmentId}`,
            UserId: `${ID}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${AssignedTime}`,
            ProviderId: `${selectedProvider}`,
          
          }
          console.log(data)
            const url=URL.Reschedule;
             fetch(url,{
          
              method: 'POST',
             headers: { 
                
                'Content-Type': 'application/json' 
                },
             body:JSON.stringify(data)
          
          }).then(response=>response.json()).then(json=>{
            console.log(json);
          if((Scribe==='Hospitalist')||(Scribe==='Provider')){
            Providerpopupshow()
          }
          else{
            Scribepopupshow()
          }
          }).catch(e=>{
            console.log("e",e)
          })
        
        }
        
          
           
        
      
      

  return (
    <Root>
    
  
    <View style={{flex:1,backgroundColor:'#333333',justifyContent:'center'}}>
      <View style={{backgroundColor:'#eaeaea',marginLeft:20,padding:20,marginRight:20,borderRadius:10}}>
      <View style={{ alignItems:'center',flexDirection:'row',backgroundColor: 'transparent',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: 0,  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: '#333333',  marginLeft: 10,fontFamily: 'SpaceGrotesk-Regular' }}>Go Back</Text>
            </View>
       {item?.LocationTypeName==="Facility"&&(
        <View>
         <Text style={styles.title}>Facility</Text>
          <Text style={styles.body}>{item?.FacilityName}</Text>
          </View>
       )}
          {item?.LocationTypeName==='Home Health'&&(
          <View>
         <Text style={styles.title}>HomeHealth</Text>
         <Text style={styles.body}>{item?.HomeHealthCompanyName}</Text>
         </View>
         )}
        
         <Text style={styles.title}>Patient Name</Text>
         <Text style={styles.body}>{item?.PatientName}</Text>
         <Text style={styles.title}>Speciality</Text>
         <Text style={styles.body}>{item?.SpecialtyType} </Text>
         <Text style={styles.title}>Date & Time</Text>
        <Text style={styles.body}>{moment(AssignedTime,'HH:mm:ss').format('hh:mm A')}-{moment(AssignedDate).format("dddd, MMMM.D")}</Text>
         <Text style={styles.title}>Provider</Text>
         <Text style={styles.body}>{cout} Provider(s) Selected</Text>
         <View style={{borderBottomWidth:1,borderColor:'#11266c',marginLeft:0,marginTop:20}} /> 
        <TouchableOpacity onPress={()=>ToSignup()} style={{marginTop:16}}>
         <Text 
         style={{color:'#0071bc',textAlign:'center',fontSize:17,fontFamily: 'SpaceGrotesk-Regular'}}>Request Appoinment</Text>
      </TouchableOpacity>
      </View>
    </View>
    </Root>
  )
}

export default RescheduleProceed;

const styles = StyleSheet.create({
    title:{
        color:'#808080',
        fontSize:12,
        marginTop:10,
        fontFamily: 'SpaceGrotesk-Regular'
    },
    body:{
        color:'#333333',
        fontSize:17,
        fontFamily: 'SpaceGrotesk-Regular'
    }
})