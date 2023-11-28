import { StyleSheet, Text, View ,Alert,TouchableOpacity} from 'react-native'
import React, { useEffect,useState } from 'react'

import moment from 'moment';
import { Root, Popup ,Toast} from '../../Components/popup-ui';
import URL from '../../Components/URL';
import Octicons from 'react-native-vector-icons/Octicons'
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions';


const OutPatientProceed = ({navigation,route}) => {
  const{ID,Scribe,ReasonForReferral,LocationTypeId,cout,VisitTypeId,FacilityId,ReferringProvider,patient,specialty,selectedProvider}=route.params;
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
 console.log(ReferringProvider)
    FacilityApi();
    PatientNameApi();
    SpecialityApi();
    console.log(ID)


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
    },
      
    callback2:()=>{
      Popup.hide()
      console.log('hide')}
  })
}

const Scribepopupshow=()=>{

   
Popup.show({
  type: 'Success',
  title: 'Appointment',
  button: true,
  button2:false,
  textBody: 'Appointment Requested Successfully done',
  buttonText: 'Ok',
  callback: () => {Popup.hide()
  navigation.navigate('ScribeAppointments',{ID,Scribe});
  },
    
  callback2:()=>{
    Popup.hide()
    console.log('hide')}
})
}

  const FacilityApi=async()=>{
    if(LocationTypeId==="1001"){
    const url=URL.FacilityList+`${FacilityId}`;
    let result=await fetch(url);
    result=await result.json();
    
  
    setFacilityName(result?.Facility[0])
  
    console.log(result)
    }
    else if(LocationTypeId==="1002"){
      const url=URL.HomehealthList+`${FacilityId}`;
      let result=await fetch(url);
      result=await result.json();
    
      setHomehealthName(result?.HomeHealthCompany[0])
    
      console.log(result)
    }
  
      }
      const PatientNameApi=async()=>{
        const url=URL.PatientList+`${patient}`;
        let result=await fetch(url);
        result=await result.json();
    
        setPatientName(result.PatientDetails[0])
      }
          const SpecialityApi=async()=>{
            const url=URL.SpecialityList+`${specialty}`;
            let result=await fetch(url);
            result=await result.json();
           setSpecialityName(result.Specialities[0])
            console.log(result)
        }

        const PostReferral=async(PL)=>{
       
        
    if(LocationTypeId==="1000"){
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            PatientId: `${patient}`,
            SpecialtyTypeId: `${specialty}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0,
            ReasonForReferral: `${ReasonForReferral}`,
            ReferringClinician:`${ReferringProvider}`,
          }
          console.log(data)
          
            const url=URL.PostClinicRef;
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
          })
        }else{

          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            LocationTypeDetailId: `${FacilityId}`,
            PatientId: `${patient}`,
            SpecialtyTypeId: `${specialty}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0,
            ReasonForReferral: `${ReasonForReferral}`,
            ReferringClinician:`${ReferringProvider}`,
          }
          console.log(data)
          
            const url=URL.PostClinicRef;
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
          })

        }
    
        }
          
        

  return (
    <Root>
  
   
    <View style={{flex:1,backgroundColor:'#333333',justifyContent:'center'}}>
      <View style={{backgroundColor:'#eaeaea',marginLeft:20,padding:20,marginRight:20,borderRadius:10}}>
      <View style={{ alignItems:'center',flexDirection:'row',backgroundColor: 'transparent',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402',  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: '#333333',  marginLeft: 10,fontFamily: 'SpaceGrotesk-Regular' }}>Go Back</Text>
            </View>
       {LocationTypeId==="1001"&&(
        <View>
         <Text style={styles.title}>Facility</Text>
         
        
         <Text style={styles.body}>{FacilityName.FacilityName}</Text>
          
          </View>
       )}
          {LocationTypeId==='1002'&&(
          <View>
         <Text style={styles.title}>HomeHealth</Text>
         <Text style={styles.body}>{HomehealthName.HomeHealthCompanyName}</Text>
         </View>
         )}
        
         <Text style={styles.title}>Patient Name</Text>
         <Text style={styles.body}>{PatientName.PatientName}</Text>
         <Text style={styles.title}>Speciality</Text>
         <Text style={styles.body}>{SpecialityName.Speciality} </Text>
       
         <Text style={styles.title}>Provider</Text>
         <Text style={styles.body}>{cout} Provider(s) Selected</Text>
         <View style={{borderBottomWidth:1,borderColor:'#11266c',marginLeft:0,marginTop:20}} /> 
        <TouchableOpacity onPress={()=>ToSignup()}>
         <Text  
         style={{color:'#0071bc',textAlign:'center',marginTop:16,fontSize:17,fontFamily: 'SpaceGrotesk-Regular'}}>Appointment Request</Text>
     </TouchableOpacity>
      </View>
    </View>
    </Root>
  )
}

export default OutPatientProceed;

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