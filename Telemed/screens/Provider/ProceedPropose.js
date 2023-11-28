import { StyleSheet, Text, View ,Alert,  TouchableOpacity} from 'react-native'
import React, { useEffect,useState ,useCallback} from 'react'

import moment from 'moment';
import { Root, Popup ,Toast} from '../Components/popup-ui';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDimensionsChange } from 'react-native-responsive-dimensions';
import URL from '../Components/URL';

const ProceedPropose = ({navigation,route}) => {
  const{ID,AppointmentId,VisitTypeId,AssignedDate,Detailflow,AssignedTime,Scribe,item}=route.params;
  const[FacilityName,setFacilityName]=useState([]);
  const[PatientName,setPatientName]=useState([]);
  const[SpecialityName,setSpecialityName]=useState([]);
  const[HomehealthName,setHomehealthName]=useState([]);
  const[disabled,setdisabled]=useState(false);
  const[PriorAuth,setPriorAuth]=useState(PriorAuth);


  const ToProceed = () =>{
 
   if(PriorAuth===false){

    ProviderPropose();
     console.log('false')
    }
 else{
  console.log('true')
 }
  }

  


  const popupshow=(Result)=>{
  
     
  Popup.show({
    type: 'Success',
    title: 'Appointment',
    button: true,
    button2:false,
    textBody: `${Result}`,
    buttonText: 'Ok',
    callback: () => {Popup.hide()
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
  title: 'Appointment Proposed',
  button: true,
  button2:false,
  textBody: 'Appointment Proposed Successfully done',
  buttonText: 'Ok',
  callback: () => {Popup.hide()
  navigation.navigate('ScribeAppointments',{ID,Scribe});
  },
    
  callback2:()=>{
    Popup.hide()
    console.log('hide')}
})
}

 




      
        useEffect(()=>{
          console.log(Detailflow)
console.log(ID)
priorAuthNeed();
        },[])

        const priorAuthNeed=async()=>{

          const data={
              PatientId: `${item.PatientId}`,
              SpecialtyTypeId: `${item.SpecialtyTypeId}`,
              AppointmentDate: `${AssignedDate}`
                
        
          }
          console.log('data',data)
          console.log(Detailflow)
        try{
          const url=URL.PriorAuthCheck;
         fetch(url,{
           method: 'POST',
         headers: { 
            
            'Content-Type': 'application/json' 
            },
         body:JSON.stringify(data)
        
        }).then(response=>response.json()).then(json=>{
        console.log(json);
        if(json.Status==="PriorAuth Not Needed"){
        setPriorAuth(false);
       
        }else{
          setPriorAuth(true);
          console.log("PriorAuth Needed")
        }
        })
        }
        catch(e){
          console.log(e);
        }
        
        
        }


        const Proposeurl=VisitTypeId==="1000"?URL.TelemedUpdateStatus:URL.FacilityvisitUpdateStatus


        const ProviderPropose=async()=>{
    
   // navigation.navigate('Provider',{ID,LocationTypeId,FacilityId,patient,specialty,AssignedDate,VisitTypeId,AssignedTime,TabName,ReferringProvider})
      
        const data1={
                UserId: `${ID}`,
                AppointmentId: `${item.AppointmentId}`,
                Status: "Propose",
                ProposedDate: `${AssignedDate}`,
                ProposedTime: `${AssignedTime}`,
            }
            console.log(data1)
            
              const url=Proposeurl
               fetch(url,{
            
                method: 'PUT',
               headers: { 
                  
                  'Content-Type': 'application/json' 
                  },
               body:JSON.stringify(data1)
            
            }).then(response=>response.json()).then(json=>{
              console.log(json);
             popupshow(json.Result);
            
           
            }).catch(e=>{
              console.log("e",e)
            })
        
      
            
            }
               
       
      useDimensionsChange(
        useCallback(({ window, screen }) => {
        
         // setchangeWidth(window.width)
         // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }, [])  
      );      
        
return (
  <Root>
{PriorAuth?(
<View style={{flex:1,backgroundColor:'#333333',justifyContent:'center'}}>

  
  <View style={{backgroundColor:'#eaeaea',marginLeft:20,padding:20,marginRight:20,borderRadius:10}}>
  <View style={{ alignItems:'center',flexDirection:'row',backgroundColor: 'transparent',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: 0,  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: '#333333',  marginLeft: 10,fontFamily: 'SpaceGrotesk-Regular' }}>Go Back</Text>
            </View>
  <Text style={{fontSize:12,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>PriorAuth Need,Please select another date and time.</Text>
    <TouchableOpacity 
    disabled={disabled}
   style={{marginTop:16}}>
    {// <Text 
     //style={{color:'#0071bc',textAlign:'center',fontSize:17,fontFamily: 'SpaceGrotesk-Regular'}}>PriorAuth Need</Text>
     
     }
 </TouchableOpacity>
  </View>
</View>
):(
    <View style={{flex:1,backgroundColor:'#333333',justifyContent:'center'}}>
      
   
      <View style={{backgroundColor:'#eaeaea',marginLeft:20,padding:20,marginRight:20,borderRadius:10}}>
      <View style={{ alignItems:'center',flexDirection:'row',backgroundColor: 'transparent',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: 0,  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: '#333333',  marginLeft: 10,fontFamily: 'SpaceGrotesk-Regular' }}>Go Back</Text>
            </View>
       {item.LocationTypeName==="Facility"&&(
        <View>
         <Text style={styles.title}>Facility</Text>
          <Text style={styles.body}>{item?.FacilityName}</Text>
          
          </View>
       )}
          {item.LocationTypeName==='Homehealth'&&(
          <View>
         <Text style={styles.title}>Home Health</Text>
         <Text style={styles.body}>{item?.HomeHealthCompanyName}</Text>
         </View>
         )}
        
         <Text style={styles.title}>Patient Name</Text>
         <Text style={styles.body}>{item?.PatientName}</Text>
         <Text style={styles.title}>Speciality</Text>
         <Text style={styles.body}>{item?.SpecialtyType} </Text>
         <Text style={styles.title}>Date & Time</Text>
         <Text style={styles.body}> {moment(AssignedTime,'HH:mm:ss').format('hh:mm A')}-{moment(AssignedDate).format("dddd, MMMM.D")} </Text>
        
         <Text style={{borderBottomWidth:1,borderColor:'#11266c',marginLeft:0,marginRight:0}} /> 
        <TouchableOpacity 
        disabled={disabled}
        onPress={()=>ToProceed()} style={{marginTop:16}}>
         <Text 
         style={{color:'#0071bc',textAlign:'center',fontSize:17,fontFamily: 'SpaceGrotesk-Regular'}}>Request Appointment</Text>
     </TouchableOpacity>
      </View>
    </View>
    
)}
    </Root>
  )
}

export default ProceedPropose;

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