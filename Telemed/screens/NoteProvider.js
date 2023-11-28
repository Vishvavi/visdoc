import React,{createContext, useContext,useEffect,useState} from "react";
import {Text,StyleSheet,View,SafeAreaView} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Root } from "../screens/Components/popup-ui";
import URL from "./Components/URL";


    const NoteContext=createContext();
    const NoteProvider=({children})=>{

    const[ProfileInfo,setProfileInfo]=useState([]);
    const[ID,setID]=useState(null);
    const[Scribe,setScribe]=useState(null);
    const[count,setcount]=useState(0);
    const[Notification,setNotification]=useState([]);
    const[TimerList,setTimerList]=useState([]);
    const[ListRowcount,setListRowcount]=useState(0);
    

// get Profile information

  const fetchID=async()=>{

       let result= await AsyncStorage.getItem('Login')
        console.log(result)
  
         notes=[]
         notes=(JSON.parse(result));
         setID(notes.UserId)
        const url=URL.Profile+`${notes.UserId}`
         try{
           
            let result=await fetch(url);
            result=await result?.json()
           // console.log(result?.Profile[0]);
            setProfileInfo(result?.Profile[0]);
           
          
          }catch(e){
            console.log('end',e)
          }
        }
        const callbackNotification=()=>{
          NotificationLog();
      }
    

      //get Notification

        const NotificationLog=async()=>{
            let result= await AsyncStorage.getItem('Login')
         
             notes=[]
             notes=(JSON.parse(result));
            if(notes.UserId){
              try{
            const url=URL.NotificationLog+`${notes.UserId}`;
            let result=await fetch(url);
            result=await result.json();
            if(result.NotificationList.code==="EINVALIDSTATE"){
              callbackNotification()
             }
             else{
           
           setNotification(result?.NotificationList);
             }
            console.log(result.NotificationList.length)
            const unReadcount=result.NotificationList.reduce((count,item)=>count+(item.MessageStatus==="UnRead"?1:0),0);
          //reduces an array to a single value by calling a callback function in every item of the existing array
            setcount(unReadcount)
          
            }catch(e){
              console.log(e);
            }}
          }

          var curr = new Date; // get current date
          var first = curr.getDate() ;
          const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
          const AcceptedTab0Url= URL.AcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
          
          
          const callback1=React.useCallback(async()=>{
    
            TimerReferralList();
            
             });
          const TimerReferralList = async()=>{

            let result= await AsyncStorage.getItem('Login')
           // console.log(result)
      
             notes=[]
             notes=(JSON.parse(result));
            if((notes.Rolename==="Provider")){
              setScribe("Provider")
              try{
            const url=URL.AcceptedUrl+`Provider/${notes.UserId}?startdate=${firstday}&enddate=${firstday}`;
            let result=await fetch(url);
            result=await result.json();
            if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
          
           callback1()
            }
            else{
              setTimerList(result?.ListOfRefferals);
              setListRowcount(result?.Rowcount);
            }}catch(e){
              console.log(e);
            }
          }
           else if((notes.Rolename==="Hospitalist")){
            setScribe("Hospitalist") 
              try{
            const url=URL.AcceptedUrl+`Provider/${notes.UserId}?startdate=${firstday}&enddate=${firstday}`;
            let result=await fetch(url);
            result=await result.json();
            if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
          
           callback1()
            }
            else{
              setTimerList(result?.ListOfRefferals);
              setListRowcount(result?.Rowcount);
            }
              }catch(e){
              console.log(e);
            }
          }
          else if(
            notes.Rolename==="Facility Scribe"
          ){
            setScribe("FacilityScribe")
            try{
              const url=URL.AcceptedUrl+`FacilityScribe/${notes.UserId}?startdate=${firstday}&enddate=${firstday}`;
              let result=await fetch(url);
              result=await result.json();
              if(result?.ListOfRefferals.code==="EINVALIDSTATE"){
                callback1()
              }
              else{
            
               setTimerList(result?.ListOfRefferals);
               setListRowcount(result?.Rowcount);
              }
                }catch(e){
                console.log(e);
              }

          }
          else if( notes.Rolename==="HomeHealth Scribe")
          {
            setScribe("HomehealthScribe")
            try{
              const url=URL.AcceptedUrl+`HomehealthScribe/${notes.UserId}?startdate=${firstday}&enddate=${firstday}`;
              let result=await fetch(url);
              result=await result.json();
              if(result?.ListOfRefferals.code==="EINVALIDSTATE"){
                callback1()
              }
              else{
            
               setTimerList(result?.ListOfRefferals);
               setListRowcount(result?.Rowcount);
              }
                }catch(e){
                console.log(e);
              }

          }
          else if( notes?.Rolename==="Facility HomeHealth Scribe")
          {
            setScribe("FacilityHomehealthScribe")
            try{
              const url=URL.AcceptedUrl+`FacilityHomehealthScribe/${notes.UserId}?startdate=${firstday}&enddate=${firstday}`;
              let result=await fetch(url);
              result=await result.json();
              if(result?.ListOfRefferals.code==="EINVALIDSTATE"){
                callback1()
              }
              else{
            
               setTimerList(result?.ListOfRefferals);
               setListRowcount(result?.Rowcount);
              }
                }catch(e){
                console.log(e);
              }

          }
          else if( notes?.Rolename==="Scribe")
          {
            setScribe("Scribe")
            try{
              const url=URL.AcceptedUrl+`Scribe/${notes.UserId}?startdate=${firstday}&enddate=${firstday}`;
              let result=await fetch(url);
              result=await result.json();
            console.log(result)
            if(result?.ListOfRefferals.code==="EINVALIDSTATE"){
              callback1()
            }
            else{
               setTimerList(result?.ListOfRefferals);
               setListRowcount(result?.Rowcount);
            }
                }catch(e){
                console.log(e);
              }

          }
        }

    useEffect(() => {
        fetchID()
        NotificationLog()
      TimerReferralList()
   
        
      }, []);
// passed values to children
    return (
        <NoteContext.Provider value={{ProfileInfo,ListRowcount,ID,setID,Scribe,setScribe,setProfileInfo,TimerList,TimerReferralList,Notification,fetchID,setcount,count,NotificationLog}}>
        <Root>
          <SafeAreaView style={{backgroundColor:'#11266c'}} />
          {children}
          <SafeAreaView style={{backgroundColor:'transparent'}} />
          </Root>
        </NoteContext.Provider>
      
      );
    };
    
    export const useNotes=()=> useContext(NoteContext);
    
    export default NoteProvider;


