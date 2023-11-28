import { StyleSheet, Text, TouchableOpacity, View ,Alert} from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Root, Popup ,Toast} from 'popup-ui';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useNotes } from '../NoteProvider';
import Theme from '../Components/fontTheme';
import TextInput from '../Components/react-native-paper/lib/module/components/TextInput/TextInput';
import { useDimensionsChange } from 'react-native-responsive-dimensions';

const Contact = ({navigation,route}) => {

    const[PhoneNumber,setPhoneNumber]=useState('');
    const[Email,setEmail]=useState('');
    const[WorkFax,setWorkFax]=useState('');
    const {fetchID} = useNotes();
   
    useDimensionsChange(
      useCallback(({ window, screen }) => {
       
     
      }, [])  
    ); 
const{ProfileInfo,ID,Scribe}=route.params
    const ToProfile = () => {
       ProfileUpdate()
      }
      const popupshow=(json)=>{
       
         
      Popup.show({
        type: 'Success',
        title: 'Contact',
        button: true,
        button2:false,
        textBody: `${json?.Profile||`Updated Successfully done`} `,
        buttonText: 'Ok',
      
        
        callback: () => {Popup.hide()
        console.log('hide');
        navigation.goBack();
        },
      
        callback2:()=>{
          Popup.hide()
          console.log('hide')}
      })
    }
      const phoneFormat = (phNumber) => {

        var match = phNumber.match(/(\d{3})(\d{3})(\d{4})$/)
    
        if (match) {
    
          number = [ match[1], '-' , match[2], '-', match[3]].join('');
    
          setPhoneNumber(number);
    
          return;
        }
    
        setPhoneNumber(phNumber);
      }
      const handleOnChangeText = (text, valueFor) => {
        if(valueFor==='Phone Number') setPhoneNumber(text);
        if(valueFor==='Email') setEmail(text);
        if(valueFor==='WorkFax') setWorkFax(text);
       
      }

useEffect(()=>{
    console.log(ProfileInfo.Phone)
    setPhoneNumber(ProfileInfo.Phone);
    setEmail(ProfileInfo.Email);
    setWorkFax(ProfileInfo.WorkFax);
  
},[]);

const popupAlertshow=(error)=>{
    
       
  Popup.show({
    type: 'Warning',
    title: 'Alert',
    button: true,
    button2:false,
    textBody: `${error}`,
    buttonText: 'Ok',
    callback: () => {Popup.hide()
    
    },
    button2Text:'cancel',
    
    callback2:()=>{
      Popup.hide()
      console.log('hide')}
    
  })
  
}

const ProfileUpdate=async()=>{
 if((Scribe==='Provider')||(Scribe==="Hospitalist")){ 
      
    const data={
       
UserId: `${ID}`,
FirstName:`${ProfileInfo.FirstName}`,
LastName:`${ProfileInfo.LastName}`,
DisplayName:`${ProfileInfo.DisplayName}`,
Phone: `${PhoneNumber}`,
WorkFax:`${WorkFax}`




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
 })
}
else{
  const data={
       
    UserId: `${ID}`,
    FirstName:`${ProfileInfo.FirstName}`,
    LastName:`${ProfileInfo.LastName}`,
    DisplayName:`${ProfileInfo.DisplayName}`,
    Phone: `${PhoneNumber}`
   
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
     })
    

}
}
    return (
        <Root>
          
      
        <View style={{ flex: 1, backgroundColor:'#eaeaea' }}>
           <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft: 20}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 60, position: 'absolute',fontFamily: 'SpaceGrotesk-Regular'}}>Edit Contact</Text>
            </View>
            <View style={{flex:1,backgroundColor:'#eaeaea',margin:responsiveWidth(5)}}>
                
                <TextInput style={styles.body}  
                   theme={Theme}
                   mode='flat'
                   backgroundColor='transparent'
                   autoCompleteType="off"
                   importantForAutofill="no"
                   label={"Phone Number"}
                   underlineColor='#11266C'
                   activeUnderlineColor="#11266C"
              placeholderTextColor={'#808080'}
                value={PhoneNumber}
                onChangeText={phNumber=>phoneFormat(phNumber)}
                />
              
                <TextInput style={styles.body}  
                  theme={Theme}
                  mode='flat'
                  backgroundColor='transparent'
                  autoCompleteType="off"
                  importantForAutofill="no"
                  label={"Email"}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
             placeholderTextColor={'#808080'}
                value={Email}
                editable={false}
                onChangeText={text=>handleOnChangeText(text,'Email')}
                />
               
                {((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <TextInput style={styles.body} 
                theme={Theme}
                mode='flat'
                backgroundColor='transparent'
                autoCompleteType="off"
                importantForAutofill="no"
                label={"Work Fax"}
                underlineColor='#11266C'
                activeUnderlineColor="#11266C"
           placeholderTextColor={'#808080'}
                value={WorkFax}
               
                onChangeText={text=>handleOnChangeText(text,'WorkFax')}
                />
                )}
              
                <TouchableOpacity onPress={()=>ToProfile()} style={{width:120,justifyContent:'center',alignSelf:'flex-end',height:40,backgroundColor:'green',borderRadius:10,marginTop:60,alignItems:'center',marginRight:responsiveWidth(5)}}>
                    <Text style={{color:'#eaeaea',fontSize:22,marginTop:0,fontFamily: 'SpaceGrotesk-Regular'}}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
        </Root>
    )
}

export default Contact;

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