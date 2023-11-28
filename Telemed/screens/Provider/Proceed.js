import { StyleSheet, Text, View ,Alert,  TouchableOpacity} from 'react-native'
import React, { useEffect,useState ,useCallback} from 'react'

import moment from 'moment';
import { Root, Popup ,Toast} from '../Components/popup-ui';
import { useDimensionsChange } from 'react-native-responsive-dimensions';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNotes } from '../NoteProvider';
import URL from '../Components/URL';


const Proceed = ({navigation,route}) => {
  const{ID,LocationTypeId,ReasonForReferral,Scribe,VisitTypeId,AssignedTime,FacilityId,ReferringProvider,cout,patient,specialty,AssignedDate,Hour,Minutes,Am,selectedProvider}=route.params;
  const[FacilityName,setFacilityName]=useState([]);
  const[PatientName,setPatientName]=useState([]);
  const[SpecialityName,setSpecialityName]=useState([]);
  const[HomehealthName,setHomehealthName]=useState([]);
  const[disabled,setdisabled]=useState(false);
  const[sendMsg,setSendMsg]=useState(0);
  const{NotificationLog}=useNotes();


  const ToSignup = () =>{
  //  navigation.navigate('Appointments',{ID})
  PostReferral();
  //popupshow();
  }
  useEffect(()=>{
   // moment(`${Hour.hour}:${Minutes.min} ${Am}`,'hh:mm A').format("HH:mm:ss")

ApiFunctions();

  },[])

  const ApiFunctions=()=>{
     console.log(ReferringProvider)
    FacilityApi();
    PatientNameApi();
    SpecialityApi();
    console.log(ReasonForReferral)

  }


  const popupshow=()=>{
    
     
    Popup.show({
    type: 'Success',
    title: 'Appointment',
    button: true,
    button2:false,
    textBody: 'Appointment Requested Successfully done',
    buttonText: 'Ok',
    callback: () => {Popup.hide()
      NotificationLog()
    navigation.navigate('Appointments',{ID,Scribe});
    },
    callback2: () => {Popup.hide()
      navigation.navigate('Appointments',{ID,Scribe});
      }
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
      try{
    const url= URL.FacilityList+`${FacilityId}`;
    let result=await fetch(url);
    result=await result.json();
    console.log(moment(AssignedTime,'hh:mm A').format("HH:mm:ss"))
    console.log(AssignedDate)
    setFacilityName(result?.Facility[0])
  
    console.log(result)
      }catch(e){
        console.log(e);
      }
    }
    else if(LocationTypeId==="1002"){
      try{
      const url=URL.HomehealthList+`${FacilityId}`;
      let result=await fetch(url);
      result=await result.json();
    
      setHomehealthName(result?.HomeHealthCompany[0])
    
      console.log(result)
      }catch(e){
        console.log(e);
      }
    }
  
      }




      const PatientNameApi=async()=>{
        try{
        const url=URL.PatientList+`${patient}`;
        let result=await fetch(url);
        result=await result.json();
    
        setPatientName(result.PatientDetails[0])
        }catch(e){
          console.log(e);
        }
      }
          const SpecialityApi=async()=>{
            try{
            const url=URL.Speciality+`${specialty}`;
            let result=await fetch(url);
            result=await result.json();
           setSpecialityName(result.Specialities[0])
            console.log(result)
            }catch(e){
              console.log(e);
            }
        }

        useEffect(()=>{
console.log(ID)
        },[])
        const PostReferral=async(PL)=>{
          setdisabled(true);
       
if((LocationTypeId==="1000")&& (ReasonForReferral!=false)&&(specialty!=1006)){
 
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
            ReferringProviderId:`${ReferringProvider}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0,
            ReasonForReferral:`${ReasonForReferral}`
          }
        
          console.log(data)
            const url=URL.PostTelemedRef
             fetch(url,{
          
              method: 'POST',
             headers: { 
                
                'Content-Type': 'application/json' 
                },
             body:JSON.stringify(data)
          
          }).then(response=>response.json()).then(json=>{
            console.log(json);
            if((Scribe==="Provider")||(Scribe==="Hospitalist")){
            popupshow()
            }
          else{
           Scribepopupshow()
          }
        
          }).catch(e=>{
            console.log("e",e)
          })
        
        }
      else if((LocationTypeId==="1000")&& (ReasonForReferral!=false)&&(specialty===1006)){
 
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0,
            IsSendPatientSMS:`${sendMsg}`,
            ReasonForReferral: `${ReasonForReferral}`
           
          }
        
          console.log(data)
            const url=URL.PostTelemedRef
             fetch(url,{
          
              method: 'POST',
             headers: { 
                
                'Content-Type': 'application/json' 
                },
             body:JSON.stringify(data)
          
          }).then(response=>response.json()).then(json=>{
            console.log(json);
            if((Scribe==="Provider")||(Scribe==="Hospitalist")){
          popupshow()
           
          }
          else{
           Scribepopupshow();
          }
        
          }).catch(e=>{
            console.log("e",e)
          })
        
        }
      else if((LocationTypeId==="1000")&& (ReasonForReferral===false)&&(specialty!=1006)){
 
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
            ReferringProviderId:`${ReferringProvider}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0,
            IsSendPatientSMS:`${sendMsg}`
          
          }
        
          console.log(data)
            const url=URL.PostTelemedRef;
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
        else if((LocationTypeId==="1000")&& (ReasonForReferral===false)&&(specialty===1006)){
 
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
            IsSendPatientSMS:`${sendMsg}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0
          
          }
        
          console.log(data)
            const url=URL.PostTelemedRef;
             fetch(url,{
          
              method: 'POST',
             headers: { 
                
                'Content-Type': 'application/json' 
                },
             body:JSON.stringify(data)
          
          }).then(response=>response.json()).then(json=>{
            console.log(json);
            if((Scribe==="Provider")||(Scribe==="Hospitalist")){
          popupshow()
          }
          else{
           Scribepopupshow();
          }
        
          }).catch(e=>{
            console.log("e",e)
          })
        }
        else if((LocationTypeId!="1000")&& (ReasonForReferral!=false)&&(specialty!=1006)){
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            LocationTypeDetailId: `${FacilityId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
            ReferringProviderId:`${ReferringProvider}`,
            ProviderId: `${selectedProvider}`,
            IsSendPatientSMS:`${sendMsg}`,
            IsAllProviders: 0,
            ReasonForReferral: `${ReasonForReferral}`
          }
          console.log(data)
            const url=URL.PostTelemedRef;
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
        else if((LocationTypeId!="1000")&& (ReasonForReferral!=false)&&(specialty===1006)){
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            LocationTypeDetailId: `${FacilityId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
            IsSendPatientSMS:`${sendMsg}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0,
            ReasonForReferral: `${ReasonForReferral}`
          }
          console.log(data)
            const url=URL.PostTelemedRef;
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
        else if((LocationTypeId!="1000")&& (ReasonForReferral===false)&&(specialty!=1006)){
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            LocationTypeDetailId: `${FacilityId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
            ReferringProviderId:`${ReferringProvider}`,
            IsSendPatientSMS:`${sendMsg}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0
           
          }
          console.log(data)
            const url=URL.PostTelemedRef;
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
        else if((LocationTypeId!="1000")&& (ReasonForReferral===false)&&(specialty===1006)){
          const data={
            UserId: `${ID}`,
            LocationTypeId: `${LocationTypeId}`,
            LocationTypeDetailId: `${FacilityId}`,
            PatientId: `${patient}`,
            AppointmentDate: `${AssignedDate}`,
            AppointmentTime: `${moment(AssignedTime,'hh:mm A').format("HH:mm:ss")}`,
            SpecialtyTypeId: `${specialty}`,
           IsSendPatientSMS:`${sendMsg}`,
            ProviderId: `${selectedProvider}`,
            IsAllProviders: 0
           
          }
          console.log(data)
            const url=URL.PostTelemedRef;
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
        else{
          console.log('error')
        }
      
      }
          
      useDimensionsChange(
        useCallback(({ window, screen }) => {
        
       
        }, [])  
      );      
        

   

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
       {LocationTypeId==="1001"&&(
        <View>
         <Text style={styles.title}>Facility</Text>
          <Text style={styles.body}>{FacilityName?.FacilityName}</Text>
          
          </View>
       )}
          {LocationTypeId==='1002'&&(
          <View>
         <Text style={styles.title}>Home Health</Text>
         <Text style={styles.body}>{HomehealthName?.HomeHealthCompanyName}</Text>
         </View>
         )}
        
         <Text style={styles.title}>Patient Name</Text>
         <Text style={styles.body}>{PatientName?.PatientName}</Text>
         <Text style={styles.title}>Speciality</Text>
         <Text style={styles.body}>{SpecialityName?.Speciality} </Text>
         <Text style={styles.title}>Date & Time</Text>
         <Text style={styles.body}> {moment(AssignedTime,'HH:mm:ss').format('hh:mm A')}-{moment(AssignedDate).format("dddd, MMMM.D")} </Text>
         <Text style={styles.title}>Provider</Text>
         <Text style={styles.body}>{cout} Provider(s) Selected</Text>
        
         <View style={{borderBottomWidth:1,borderColor:'#11266c',marginLeft:0,marginRight:0,marginTop:20}} /> 
         {VisitTypeId==='1000'&&(
      <Text style={{fontSize:10,fontFamily:'SpaceGrotesk-Regular',color:'#0071bc'}}>"click checkbox" text message will be sent to patient</Text>
         )}
      <View style={{flexDirection:'row',marginTop:16,alignItem:'center',justifyContent:'center'}}>
    {VisitTypeId==='1000'&&(
       <TouchableOpacity onPress={()=>{
       if(sendMsg===0){
       setSendMsg(1)
      }
       else{
       setSendMsg(0);
       }}}>
         <View style={{height:20,width:20,borderWidth:1,borderColor:'black'}}>
         <Octicons style={{ color: sendMsg===1?'green':'transparent', alignSelf: 'center'}} name='check' size={17} />
         </View>
       
         </TouchableOpacity>
         
)}

        <TouchableOpacity 
        disabled={disabled}
        onPress={()=>ToSignup()} style={{marginLeft:10,alignSelf:'center'}}>
         <Text 
         style={{color:'#0071bc',textAlign:'center',fontSize:17,fontFamily:'SpaceGrotesk-Regular'}}>Request Appointment</Text>
     </TouchableOpacity>
     </View>
      </View>
    </View>
    </Root>
  )
}

export default Proceed;

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