import { StyleSheet, Text, TouchableOpacity, View ,Alert} from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native-gesture-handler';
import { Root, Popup ,Toast} from 'popup-ui';
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import { useNotes } from '../NoteProvider';
import Theme from '../Components/fontTheme';
import TextInput from '../Components/react-native-paper/lib/module/components/TextInput/TextInput';

const EditAddress = ({navigation,route}) => {
    
  useDimensionsChange(
    useCallback(({ window, screen }) => {
     
    }, [])  
  );
  const {fetchID} = useNotes();
    const[Address,setAddress]=useState('');
    const[City,setCity]=useState('');
    const[Country,setCountry]=useState('');
    const[Zip,setZip]=useState('');
   const[SuiteNumber,setSuiteNumber]=useState('');

const{ProfileInfo,ID}=route.params
    const ToProfile = () => {
      ProfileUpdate();
      }
      const popupshow=(json)=>{
       
         
      Popup.show({
        type: 'Success',
        title: 'Address',
        button: true,
        button2:false,
        textBody: `${json?.Profile||'Updated successfully done'}`,
        buttonText: 'Ok',
        callback: () => {Popup.hide()
        navigation.goBack();
        
        },
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
    
      },
      button2Text:'cancel',
      
      callback2:()=>{
        Popup.hide()
        console.log('hide')}
      
    })
    
  }
      const handleOnChangeText = (text, valueFor) => {
        if(valueFor==='Address') setAddress(text);
        if(valueFor==='City') setCity(text);
        if(valueFor==='Country') setCountry(text);
        if(valueFor==='Zip') setZip(text);
       
      }
      const handleOnChangeSuite=(text,valueFor)=>{
        if(valueFor==='SuiteNumber' && text===""){ setSuiteNumber(null);
       
        }
        else{
          setSuiteNumber(text)
        }

      }

useEffect(()=>{
    setAddress(ProfileInfo.Address1);
    setCity(ProfileInfo.City);
    setCountry(ProfileInfo.Country);
    setZip(ProfileInfo.Zip);
    if(ProfileInfo.SuiteNumber===null){
    setSuiteNumber(ProfileInfo.SuiteNumber);
    }
    else{
      setSuiteNumber(`${ProfileInfo.SuiteNumber}`);
    }
  
},[]);



const ProfileUpdate=async()=>{
   
    
            const data={
        UserId: `${ID}`,
      FirstName:`${ProfileInfo.FirstName}`,
      LastName:`${ProfileInfo.LastName}`,
       DisplayName:`${ProfileInfo.DisplayName}`,
      Address1: `${Address}`,
      City: `${City}`,
      Country: `${Country}`,
      Zip:`${Zip}`,
      SuiteNumber:SuiteNumber
      
    
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
            fetchID();
             }
             else {
               const error=json.error
               popupAlertshow(error);
   
             }
           
         }).catch(e=>{
          
           console.log("e",e)
         })}

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
         
           Alert.alert(  json.Profile||json.error,
       [
        {text:'ok',onPress:()=>console.log('ok')},
        {text:'cancel',onPress:()=>console.log('cancel')}
        ],
       
        )}).catch(e=>{
          
           console.log("e",e)
         })}


    return (
      <Root>
       
        <View style={{ flex: 1, backgroundColor:'#eaeaea' }}>
           <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft: 20}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 60, position: 'absolute',fontFamily: 'SpaceGrotesk-Regular'}}>Edit Address</Text>
            </View>
            <ScrollView>
            <View style={{flex:1,backgroundColor:'#eaeaea',margin:responsiveWidth(5)}}>
               
                <TextInput style={styles.body}  
                  theme={Theme}
                  mode='flat'
                  backgroundColor='transparent'
                  autoCompleteType="off"
                  importantForAutofill="no"
                  label={"Address"}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
             placeholderTextColor={'#808080'}
                value={Address}
                onChangeText={text=>{handleOnChangeText(text,'Address')
              
              }}
                />
                
                <TextInput style={styles.body} 
                  theme={Theme}
                  mode='flat'
                  backgroundColor='transparent'
                  autoCompleteType="off"
                  importantForAutofill="no"
                  label={"City"}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
             placeholderTextColor={'#808080'}
                value={City}
                onChangeText={text=>handleOnChangeText(text,'City')}
                />
               
                <TextInput style={styles.body} 
                  theme={Theme}
                  mode='flat'
                  backgroundColor='transparent'
                  autoCompleteType="off"
                  importantForAutofill="no"
                  label={"Country"}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
             placeholderTextColor={'#808080'}
                value={Country}
                onChangeText={text=>handleOnChangeText(text,'Country')}
                />
              
                <TextInput style={styles.body} 
                  theme={Theme}
                  mode='flat'
                  backgroundColor='transparent'
                  autoCompleteType="off"
                  importantForAutofill="no"
                  label={"Zip"}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
             placeholderTextColor={'#808080'}
              
                value={Zip}
                onChangeText={text=>handleOnChangeText(text,'Zip')}
                keyboardType='numeric'/>
              
                <TextInput style={styles.body}  
                  theme={Theme}
                  mode='flat'
                  backgroundColor='transparent'
                  autoCompleteType="off"
                  importantForAutofill="no"
                  label={"Suite Number"}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
             placeholderTextColor={'#808080'}
             
                value={SuiteNumber}
                onChangeText={text=>handleOnChangeSuite(text,'SuiteNumber')}
                keyboardType='numeric'/>
  
              
                <TouchableOpacity onPress={()=>ToProfile()} style={{paddingLeft:20,paddingRight:20,marginBottom:20,justifyContent:'center',alignSelf:'flex-end',height:40,backgroundColor:'green',borderRadius:8,marginTop:30,alignItems:'center',marginRight:responsiveWidth(5)}}>
                    <Text style={{color:'#eaeaea',fontSize:22,marginTop:0,fontFamily: 'SpaceGrotesk-Regular'}}>Update</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        </Root>
    )
}

export default EditAddress

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