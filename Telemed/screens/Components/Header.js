import React,{useCallback} from "react";
import {Text,View,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useState } from "react";
import { useEffect } from "react";
import {
  useDimensionsChange,
  useResponsiveHeight,
  useResponsiveWidth,
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import {useNotes} from "../NoteProvider";


const Header=(props)=>{

  //const[count,setcount]=useState(0);
  const{onPress,createAppointment,TabName,Scribe,notification,ID}=props;
  const{count,setcount,NotificationLog}=useNotes()

useEffect(()=>{
  NotificationLog();
},[])


useDimensionsChange(
  useCallback(({ window, screen }) => {
    console.log(window);
    console.log(screen);
  //  setchangeWidth(window.width)
   // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [])  
); 
  {/*const NotificationLog=async()=>{
    if(ID){
    const url=`https://visdocapidev.azurewebsites.net/api/PushNotification/ViewLogStatus/${ID}`;
    let result=await fetch(url);
    result=await result.json();
   // setNotification(result.NotificationStatus);
    console.log(result.NotificationList.length)
    const unReadcount=result.NotificationList.reduce((count,item)=>count+(item.MessageStatus==="UnRead"?1:0),0);
    setcount(unReadcount)
   // console.log(unReadcount);
    //console.log(result)
    }
  }
*/}
  

    return(

    <View style={[styles.Header,]}>
    <View style={[styles.HeaderInnerLeft,{marginLeft:responsiveWidth(5)}]}>
      
        <TouchableOpacity style={{borderRadius:10}} onPress={onPress}>
    <Octicons name='arrow-left' color={'#e6c402'} size={22} style={{top:3}} />
    </TouchableOpacity>
         
            <Text  style={styles.HeaderText}>{TabName}</Text>
            </View>

          <View style={[styles.HeaderInnerRight,{marginRight:responsiveWidth(5)}]}>
            {TabName!='Notification'&&(
                <TouchableOpacity onPress={notification} style={{ marginLeft:responsiveWidth(5),flexDirection:'row',marginRight:responsiveWidth(5)}}>
            
                       
             <MaterialIcons  name='notifications-none' color={'#e6c402'} size={22}/>
             {count!=0&&(  
               <View style={{borderRadius:10,height:16,backgroundColor:'red',left:-5,top:-8,alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:10,color:'white',paddingHorizontal:5}}>{count}</Text>
             </View>
             )}  
             </TouchableOpacity>
           
          
            )}
            
            
          {//  <Fontisto style={{ paddingHorizontal:moderateScale(16)}}
           //  name='search' color={'#e6c402'} size={scale(18)} />
          }
          {((Scribe!="Provider")&& (TabName!="Notification"))&&(
            <TouchableOpacity onPress={createAppointment}>
            <View style={{height:50,width:50,backgroundColor:'green',marginTop:8,alignItems:'center',justifyContent:'center',borderRadius:8}}>
              <Image source={require('../../images/png2.png')}
                style={{height:30,width:30,tintColor:'white'}}
              />
              </View>
            </TouchableOpacity>
            )}
           
            </View>
           </View>
    )
}

export default Header;

const styles=StyleSheet.create({
    Header:{
        borderWidth:0,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:'space-between',
        width:"100%",
      backgroundColor:'#11266c'
       },

    HeaderInnerLeft:{
        flexDirection:'row',
        height:50,
        borderWidth:0,
        alignItems:'center',
        
        //paddingHorizontal:16

    },
    HeaderText:{
        color: '#eaeaea',
         fontFamily: 'SpaceGrotesk-Regular', 
         fontSize:22,
         paddingLeft:16
    },
    HeaderInnerRight:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0,
        

    },

})