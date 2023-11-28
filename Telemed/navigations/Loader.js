import { Image, StyleSheet, Text, TouchableOpacity, View,Animated,
  PixelRatio,Alert,ActivityIndicator } from 'react-native'
  import React,{useState,useEffect} from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { StackActions } from '@react-navigation/native';
  import { useNavigation } from '@react-navigation/native';
  import { CommonActions } from '@react-navigation/native';
  import { useNotes } from '../screens/NoteProvider';

  const Loader=({navigation})=>{
  const{ID,setID,Scribe,setScribe}=useNotes();

      const navigation1 = useNavigation();

      useEffect(()=>{
          LoginValidate();
      
        },[])


        //Loginvalidate to check already logined or not
       
        const LoginValidate=async()=>{
               
                
          let result= await AsyncStorage.getItem('Login')
        console.log(result)
      
           notes=[]
            notes=(JSON.parse(result));
      
            if((notes?.Status==="success")&&(notes?.Rolename==="Provider")){
            
              navigation.dispatch(                     //The reset action allows to reset the navigation state to the given state.
                CommonActions.reset({
                  index: 1,
                 
                  routes: [
                    { name: 'DrawerNavigator' ,
                    params: { ID:notes.UserId,Scribe:"Provider" }
                   
                   
                  },

                   
                  ],
                })
              
              );
              
             
           //  navigation.dispatch(StackActions.replace('Appointments',{ID:notes?.UserId}));
            // navigation.dispatch(StackActions.replace('Profile',{ID:notes?.UserId}));
             // setisLogged(true)
              //setLoading(false)
          //  navigation.navigate('Appointments',{ID:notes.UserId})
           
          }
          else if((notes?.Status==="success")&&(notes?.Rolename==="Hospitalist")){
            
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
               
                routes: [
                  { name: 'DrawerNavigator' ,
                  params: { ID:notes.UserId,Scribe:"Hospitalist" }
                 
                },

                 
                ],
              })
            
            );
             }
          else if((notes?.Status==="success")&&(notes?.Rolename==="Facility Scribe")){
            setID(notes.UserId)
            setScribe('FacilityScribe')
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
               
                routes: [
                  { name: 'DrawerNavigator' ,
                  params: { ID:notes.UserId,Scribe:"FacilityScribe" }
             

                },

                 
                ],
              })
            
            );
             }
             else if((notes?.Status==="success")&&(notes?.Rolename==="HomeHealth Scribe")){
            
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                 
                  routes: [
                    { name: 'DrawerNavigator',
                    params: { ID:notes.UserId,Scribe:"HomehealthScribe" }
                   
                  },],
                })
              
              );
               }
               else if((notes?.Status==="success")&&(notes?.Rolename==="Facility HomeHealth Scribe")){
            
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                   
                    routes: [
                      { name: 'DrawerNavigator' ,
                      params: { ID:notes.UserId,Scribe:"FacilityHomehealthScribe" }
                     
                    },
  
                     
                    ],
                  })
                
                );
                 }
                 else if((notes?.Status==="success")&&(notes?.Rolename==="Scribe")){
            
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                     
                      routes: [
                        { name: 'DrawerNavigator' ,
                        params: { ID:notes.UserId,Scribe:"Scribe" }
                       
                      },
    
                       
                      ],
                    })
                  
                  );
                   }
          else{
           // navigation1.dispatch(StackActions.replace('Login')); 
          //  setisLoading(false)

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Login' ,
               
               
              },
               
              ],
            })
          );
          }
        
      }

      return(

      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../screens/vd.png')} style={{height:100,width:100}}/>
          
      </View>
      )
  };
  export default Loader;