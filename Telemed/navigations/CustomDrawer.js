import React, { useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,Image,Alert, ScrollView} from 'react-native';
import { Root, Popup } from '../screens/Components/popup-ui';
import { DrawerContentScrollView, DrawerItemList , DrawerItem } from '@react-navigation/drawer';
import { useNotes } from '../screens/NoteProvider';
import DeviceInfo, { getDeviceId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions,CommonActions, useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const CustomDrawer = (props) => {    
  const navigation = useNavigation()
    const {ID, ProfileInfo,Scribe} = useNotes();
    const[deviceid,setdeviceid]=useState(false);
    
    useEffect(()=>{
        DeviceInfo.getUniqueId().then((device)=>{
          console.log(device)
          console.log(ID)
          setdeviceid(device);
         })  
         },[])

         const ToggleOff=()=>{
          if(Scribe==="Provider"|| Scribe==="Hospitalist"){
          const data={
            ProviderId:`${ID}`,
            Status: "Off"
          }
          
            const Url=`https://visdocapidev.azurewebsites.net/api/CurrentAvailability/ToggleOff`;
          fetch(Url,{
            method:'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
          }).then(response=>response.json()).then(json=>{
            console.log(json);
          })
        }else{
          console.log('Not a provider')
        }
          
          }

          const Inactivateaccount=()=>{
            const url=`https://visdocapidev.azurewebsites.net/api/Users/Inactive/${ID}`
            fetch(url,{
              method:'PUT',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify(),
            }).then(response=>response.json()).then(json=>{
              console.log(json);
              if(json.Result==='Success'){
                clearAll();
                ToggleOff();
                console.log('Logout done')
              }
            })
          }

    const Logout=async()=>{
         const data={
           UserId:`${ID}`,
           DeviceId:`${deviceid}`        
         }
         console.log(data)
         const url="https://visdocapidev.azurewebsites.net/api/Logout"
         fetch(url,{         
          method: 'POST',
         headers: {             
            'Content-Type': 'application/json' 
            },
         body:JSON.stringify(data),
         
         }).then(response=>response.json()).then((json)=>{
         console.log(json);
         if(json.Result==="LogOut Successsfully"){          
          clearAll(); 
          ToggleOff();
            console.log('Logout done');
         }
         else{
            console.log('error');
         }
         }) 
        }

        //Asynchronous storage clear function

        const clearAll = async () => {
            try {
            await AsyncStorage.clear();
            console.log('Done');
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Login' }           
              ],
            })
          );
          props.navigation.closeDrawer();
            } catch (error) {
            console.log(error);
            }
            };
    
        const popuperrorshow=(error)=>{              
            Popup.show({
              type: 'Warning',
              title: 'Logout',
              button: true,
              button2:true,
              textBody: `Are You Sure Logout!`,
              buttonText: 'Yes',
              button2Text:'No Thanks',
              callback: () => {Popup.hide()
                Logout();             
              },                
              callback2:()=>{
                Popup.hide()
                console.log('hide');
              },
            });
              };
              const removeaccountpopup=(error)=>{              
                Popup.show({
                  type: 'Warning',
                  title: 'Remove',
                  button: true,
                  button2:true,
                  textBody: `Are You Sure Remove Account!`,
                  buttonText: 'Yes',
                  button2Text:'No Thanks',
                  callback: () => {Popup.hide()
                   Inactivateaccount();             
                  },                
                  callback2:()=>{
                    Popup.hide()
                    console.log('hide');
                  },
                });
                  };

  return (
   
    <View style={{flex:1}}>
   
        <View style={{ backgroundColor: '#11266c', height: 100, }}>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
        <Image style={{height:80,width:80}} source={require('../screens/vd.png')}/>
        <View>
        <Text style={{marginLeft:15,color:'#fff',fontFamily: 'SpaceGrotesk-Regular',fontSize:16}}>{ProfileInfo?.DisplayName}</Text>            
        {((ProfileInfo?.RoleName ==="Provider")||(ProfileInfo?.RoleName ==="Hospitalist"))&&(
                        <Text style={{marginLeft:15,marginTop: 10,color:'#fff',fontFamily: 'SpaceGrotesk-Regular',fontSize:16}}>NPI : {ProfileInfo?.NPI}</Text>
                        )}  
                        </View>
                        </View>          
        </View>
    <DrawerContentScrollView {...props} bounces={false}  contentContainerStyle={{ padding:20}}>            
            <View style={{ backgroundColor: '#fff', marginTop: -40, overflow: 'scroll' }}>
          <DrawerItemList {...props}
                   /> 


                   {/* <DrawerItem  
                   //activeBackgroundColor='blue'
                  // activeTintColor='blue'
                  pressColor="#e6c402"
                  // focused={true}
                  
                   label="Appointment" onPress={()=>navigation.navigate('Appointment')}
                  labelStyle={{fontFamily:'SpaceGrotesk-SemiBold',fontSize:16,color:'black',marginLeft:-20}}
                  icon={({

                   })=>(
                    <IonIcons name= 'home-outline'color={"#e6c402"} size={22}/>
                   )}
                   />
                  
                   <TouchableOpacity>
                   <DrawerItem  
                 //  activeBackgroundColor='blue'
                  // activeTintColor='blue'
                   pressColor="#e6c402"
                  // focused={true}
                  
                   label="Profile" onPress={()=>props.navigation.navigate('Profile')}
                  labelStyle={{fontFamily:'SpaceGrotesk-SemiBold',fontSize:16,color:'black',marginLeft:-20}}
                  icon={({

                   })=>(
                    <IonIcons name='person-outline' size={23} color={"#e6c402"}/>
                   )}
                   />
                   </TouchableOpacity>
                   */}
        </View>
        </DrawerContentScrollView>
        <View style={{borderBottomWidth:1,borderColor:'#808080'}}></View>
        <TouchableOpacity style={{}}>
        <DrawerItem  label="Logout" onPress={()=>popuperrorshow()}
                  labelStyle={{fontFamily:'SpaceGrotesk-SemiBold',marginLeft:-20,fontSize:15,color:'#333333'}}
                  
                  icon={({

                   })=>(
                    <Entypo name='log-out' color='#e6c402'size={21}/>
                   )}
                   />
               </TouchableOpacity>   
               <TouchableOpacity style={{marginBottom:40}}>
             <DrawerItem  label="Remove Account" onPress={()=>removeaccountpopup()}
                  labelStyle={{fontFamily:'SpaceGrotesk-SemiBold',marginLeft:-20,fontSize:15,color:'#333333'}}
                  
                  icon={({

                   })=>(
                    <IonIcons name='person-outline' color='#e6c402'size={22}/>
                   )}
                   />
               </TouchableOpacity>   
        {/* <TouchableOpacity onPress={()=> popuperrorshow()}
                   style={[styles.detailflow,{marginTop:10,marginBottom:30,marginLeft:20}]}>
           
                <View style={{borderWidth:0,marginLeft:0,flexDirection:'row',alignItems:'center',borderRadius:8}}>                
                 <Text style={{marginLeft:15,marginTop: 10,color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:13}}>Logout</Text>
               </View>
              </TouchableOpacity> */}
        </View>
       
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    navigationContainer: {
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      padding: 16,
      fontSize: 15,
      textAlign: 'center',
    },
    header: {
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

export default CustomDrawer;