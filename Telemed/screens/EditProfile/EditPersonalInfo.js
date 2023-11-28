import { StyleSheet, Text, TouchableOpacity, View ,Alert,} from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { ScrollView } from 'react-native-gesture-handler';
import { Root, Popup ,Toast} from '../Components/popup-ui';
import { useNotes } from '../NoteProvider';
import Theme from '../Components/fontTheme';
import TextInput from '../Components/react-native-paper/lib/module/components/TextInput/TextInput'
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';



const EditPersonalInfo = ({navigation,route}) => {
  const {fetchID} = useNotes();
    const[FirstName,setFirstName]=useState('');
    const[LastName,setLastName]=useState('');
    const[NickName,setNickName]=useState('');
    const[NPI,setNPI]=useState('');
    const[CMD,setCMD]=useState('');
const{ProfileInfo,ID,Scribe}=route.params
    const ToProfile = () => {
      ProfileUpdate();
      }
      useDimensionsChange(
        useCallback(({ window, screen }) => {
         
       
        }, [])  
      ); 
      const popupshow=(json)=>{
       
         
      Popup.show({
        type: 'Success',
        title: 'Profile Info',
        button: true,
        button2:false,
        textBody: `${json?.Profile||'Updated Successfully done'}`,
        buttonText: 'Ok',
        callback: () => {Popup.hide()
        navigation.goBack();
        },
        button2Text:'cancel',
        
        callback2:()=>{
          Popup.hide()
          console.log('hide')}
        
      })
      
    }
    const popupAlertshow=(error)=>{
    
       
    Popup.show({
      type: 'Warning',
      title: 'Alert',
      button: true,
      button2:false,
      textBody: `${error}`,
      buttonText: 'Ok',
      callback: () => {Popup.hide()
      navigation.goBack();
      },
      button2Text:'cancel',
      
      callback2:()=>{
        Popup.hide()
        console.log('hide')}
      
    })
    
  }
      const handleOnChangeText = (text, valueFor) => {
        if(valueFor==='FirstName') setFirstName(text);
        if(valueFor==='LastName') setLastName(text);
        if(valueFor==='NickName') setNickName(text);
        if(valueFor==='NPI') setNPI(text);
        
      }

      const handleOnChangeCMD=(text,valueFor)=>{
        if(valueFor==='CMD' && text==="") {setCMD(null)
        }
        else{
          setCMD(text)
        }
        
      }

     useEffect(()=>{
    setFirstName(ProfileInfo.FirstName);
    setLastName(ProfileInfo.LastName);
    setNickName(ProfileInfo.DisplayName);
    setNPI(ProfileInfo.NPI);
    if(ProfileInfo.CMDProviderNumber===null){
      setCMD(null)
    }
    else{

    setCMD(`${ProfileInfo.CMDProviderNumber}`);
    }
     },[]);

    const ProfileUpdate=async()=>{
   
      if((Scribe==="Provider"||Scribe==="Hospitalist")){
            const data={
               
      UserId: ID,
      FirstName: `${FirstName}`,
      LastName: `${LastName}`,
      DisplayName: `${NickName}`,
      CMDProviderNumber:CMD
    
            }

            
            console.log(data)
            const url="https://visdocapidev.azurewebsites.net/api/profile"
            fetch(url,{
         
             method: 'PUT',
            headers: { 
               
               'Content-Type': 'application/json' 
               },
            body:JSON.stringify(data)
         
         }).then(response=>response.json()).then(json=>{
           console.log(json);
          if(json?.Profile==="Updated successfully"){
         popupshow(json);
         fetchID()
          }
          else {
            const error=json.error
            popupAlertshow(error);

          }
           
         }).catch(e=>{
          
           console.log("e",e)
         })}
        
        else{
          const data={
               
            UserId: `${ID}`,
            FirstName: `${FirstName}`,
            LastName: `${LastName}`,
            DisplayName: `${NickName}`
          
          
                  }
                  console.log(data)
                  const url="https://visdocapidev.azurewebsites.net/api/profile"
                  fetch(url,{
               
                   method: 'PUT',
                  headers: { 
                     
                     'Content-Type': 'application/json' 
                     },
                  body:JSON.stringify(data)
               
               }).then(response=>response.json()).then(json=>{
                 console.log(json);
                
                
             
              popupshow(json);
              fetchID()
                 
               }).catch(e=>{
                
                 console.log("e",e)
               })

        }
      }
         const ProfileUpdate1=async()=>{
   
      
            const data={
               
      UserId: `${ID}`,
      FirstName: `${FirstName}`,
      LastName: `${LastName}`,
      DisplayName: `${NickName}`,
      Address1: `${ProfileInfo,Address1}`,
      City: `${ProfileInfo.City}`,
      State: `${ProfileInfo.State}`,
      Country: `${ProfileInfo.Country}`,
      Zip:`${ProfileInfo.Zip}`,
      Phone: `${ProfileInfo.Phone}`,
      CMDProviderNumber: `${ProfileInfo.CMDProviderNumber}`,
      IsPhysician: `${ProfileInfo.IsPhysician}`,
      IsSpecialist: `${ProfileInfo.specialty}`,
      Specialities: `${ProfileInfo.specialty}`,
      IsHospitalist: `${ProfileInfo.IsHospitalist}`,
      VisitTypes: `${ProfileInfo.VisitTypes}`,
      TelemedMeet: "https://meet.google.com/req-apje-kve",
      Signature: "In base64",
      IsPA: `${ProfileInfo.IsPA}`,
      IsNP: `${ProfileInfo.IsNP}`,
      IsHomeHealthScribe: `${ProfileInfo.IsHomeHealthScribe}`,
      HomeHealthCompanyId: `${ProfileInfo.HomeHealthCompanyId}`,
      IsFacilityScribe: `${ProfileInfo.IsFacilityScribe}`,
      FacilityId: `${ProfileInfo.FacilityId}`
            }
            const url="https://visdocapidev.azurewebsites.net/api/profile"
            fetch(url,{
         
             method: 'PUT',
            headers: { 
               
               'Content-Type': 'application/json' 
               },
            body:JSON.stringify(data)
         
         }).then(response=>response.json()).then(json=>{
           console.log(json);
         popupshow(json);
           
         }).catch(e=>{
          
           console.log("e",e)
         })}

        
    return (
      <Root>
       
        <View style={{ flex: 1, backgroundColor:'#eaeaea' }}>
           <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft:responsiveWidth(5)}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular'}}>Edit Personal Info</Text>
            </View>
            <ScrollView>
            <View style={{flex:1,backgroundColor:'#eaeaea',margin:responsiveWidth(5)}}>
                {/* <Text style={styles.title}>First Name</Text> */}

                <TextInput  style={styles.body} 
                 theme={Theme}
                 mode='flat'
                 backgroundColor='transparent'
                 autoCompleteType="off"
                 importantForAutofill="no"
                 label={"First Name"}
                 underlineColor='#11266C'
                 activeUnderlineColor="#11266C"
            placeholderTextColor={'#808080'}
                value={FirstName}
                onChangeText={e=>{
                  
                  handleOnChangeText(e,'FirstName')}}
                />
             
                <TextInput style={styles.body} 
                 theme={Theme}
                 mode='flat'
                 backgroundColor='transparent'
                 autoCompleteType="off"
                 importantForAutofill="no"
                 label={"LastName"}
                 underlineColor='#11266C'
                 activeUnderlineColor="#11266C"
            placeholderTextColor={'#808080'}
            value={LastName}
                onChangeText={e=>{
                  
                  handleOnChangeText(e,'LastName')}}
                />
               
                <TextInput style={styles.body}  
                 theme={Theme}
                 mode='flat'
                 backgroundColor='transparent'
                 autoCompleteType="off"
                 importantForAutofill="no"
                 label={"Nick Name"}
                 underlineColor='#11266C'
                 activeUnderlineColor="#11266C"
            placeholderTextColor={'#808080'}
                value={NickName}
                onChangeText={e=>{
                  
                  handleOnChangeText(e,'NickName')}}
                />
{((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <View>
              
                <TextInput style={styles.body} 
                theme={Theme}
                mode='flat'
                backgroundColor='transparent'
                autoCompleteType="off"
                importantForAutofill="no"
                label={"NPI"}
                underlineColor='#11266C'
                activeUnderlineColor="#11266C"
           placeholderTextColor={'#808080'}
                editable={false}
                value={NPI}
                onChangeText={text=>handleOnChangeText(text,'NPI')}
                keyboardType='numeric'/>
              
                <TextInput style={styles.body} 
                theme={Theme}
                mode='flat'
                backgroundColor='transparent'
                autoCompleteType="off"
                importantForAutofill="no"
                label={"CMD"}
                underlineColor='#11266C'
                activeUnderlineColor="#11266C"
           placeholderTextColor={'#808080'}
                onChangeText={text=>handleOnChangeCMD(text,'CMD')}
                value={CMD}
                />
                </View>
)}
                <TouchableOpacity onPress={()=>ToProfile()} style={{width:120,marginBottom:20,justifyContent:'center',alignSelf:'flex-end',height:40,backgroundColor:'green',borderRadius:10,marginTop:60,alignItems:'center',marginRight:responsiveWidth(5)}}>
                    <Text style={{color:'#eaeaea',fontSize:22,marginTop:0,fontFamily: 'SpaceGrotesk-Regular'}}>Update</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        </Root>
    )
}

export default EditPersonalInfo

const styles = StyleSheet.create({
    title:{
        color:'#808080',
        fontSize:12,
        marginLeft:35,
        marginRight:30,
        marginTop:20,
        fontFamily: 'SpaceGrotesk-Regular'
    },
    body:{
       borderBottomWidth: 0,backgroundColor:'transparent', borderBottomColor: '#11266C',fontFamily: 'SpaceGrotesk-Regular', color: '#333333', fontSize: 17 
    },
})