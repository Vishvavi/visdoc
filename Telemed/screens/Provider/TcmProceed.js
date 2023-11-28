import { StyleSheet, Text, View ,Alert,TouchableOpacity} from 'react-native'
import React, { useEffect,useState } from 'react'

import moment from 'moment';
import { Root, Popup ,Toast} from '../Components/popup-ui';
import URL from '../Components/URL';
import Octicons from 'react-native-vector-icons/Octicons';

const TcmProceed = ({navigation,route}) => {
  const{ID,LocationTypeId,Scribe,ReasonForTcm,FacilityId,patient,TabName,DischargeDate}=route.params;
  const[FacilityName,setFacilityName]=useState([]);
  const[PatientName,setPatientName]=useState([]);
  const[SpecialityName,setSpecialityName]=useState([]);
   const[HomehealthName,setHomehealthName]=useState([]);
   const[disabled,setdisabled]=useState(false);

  const ToSignup = () =>{
  //  navigation.navigate('Appointments',{ID})
    PostReferral();
    }
  useEffect(()=>{
  

    FacilityApi();
    PatientNameApi();
   


  },[])
  const popupshow=()=>{
  
     
  Popup.show({
    type: 'Success',
    title: 'Appointment',
    button: true,
    button2:false,
    textBody: 'Appointment Requested Successfully done',
    buttonText: 'Ok',
    callback: () => {Popup.hide()
    navigation.navigate('Appointments',{ID,Scribe});
    }
  })
}
  const FacilityApi=async()=>{
  
    const url=URL.FacilityList+`${FacilityId}`;
    let result=await fetch(url);
    result=await result.json();
   
    setFacilityName(result?.Facility[0])
  
    console.log(result)
    }
   
    const Scribepopupshow=()=>{
    
       
    Popup.show({
      type: 'Success',
      title: 'Appointment',
      button: true,
      button2:false,
      textBody: ' Appointment Requested Successfully done',
      buttonText: 'Ok',
      callback: () => {Popup.hide()
      navigation.navigate('ScribeAppointments',{ID,Scribe});
      },
        
      callback2:()=>{
        Popup.hide()
        console.log('hide')}
    })
    }
  
      
      const PatientNameApi=async()=>{
        const url=URL.PatientList+`${patient}`;
        let result=await fetch(url);
        result=await result.json();
    
        setPatientName(result?.PatientDetails[0])
      }
         

        const PostReferral=async(PL)=>{
setdisabled(true);
          const data={
            UserId: `${ID}`,
            FacilityId: `${FacilityId}`,
            PatientId: `${patient}`,
            DischargeDate: `${DischargeDate}`,
            ReasonForTCM: `${ReasonForTcm}`
          }
          
            const url=URL.PostTcmRef;
            fetch(url,{
          
            method: 'POST',
              headers: { 
                
                'Content-Type': 'application/json' 
                },
             body:JSON.stringify(data)
          
          }).then(response=>response.json()).then(json=>{
            console.log(json);
            if((Scribe==="Provider")||(Scribe==="Hospitalist")){
            popupshow();
            }
            else{
             Scribepopupshow();
          
          
           
            }  
        
          }).catch(e=>{
            console.log("e",e)
          })}

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
      
        <View>
         <Text style={styles.title}>Facility</Text>
         
        
         <Text style={styles.body}>{FacilityName?.FacilityName}</Text>
          
          </View>
     
        
         <Text style={styles.title}>Patient Name</Text>
         <Text style={styles.body}>{PatientName?.PatientName}</Text>
        
         <Text style={styles.title}>Discharge Date </Text>
         <Text style={styles.body}>{DischargeDate}</Text>
        
         <View style={{borderBottomWidth:1,borderColor:'#11266c',marginLeft:0,marginTop:20}} /> 
      <TouchableOpacity
      disabled={disabled}
      onPress={()=>ToSignup()}>
         <Text
         style={{color:'#0071bc',textAlign:'center',marginTop:16,fontSize:17,fontFamily: 'SpaceGrotesk-Regular'}}>Request Appointment</Text>
     </TouchableOpacity>
      </View>
    </View>
    </Root>
  )
}

export default TcmProceed;

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