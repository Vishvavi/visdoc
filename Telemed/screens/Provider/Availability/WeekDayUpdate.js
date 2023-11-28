import React,{useEffect, useState} from "react";
import {Text,View,Alert,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import{scale,verticalScale} from 'react-native-size-matters';
import Octicons from 'react-native-vector-icons/Octicons';
import Weekdaycalendar from "./Weekdaycalendar";
import { Root, Popup ,Toast} from 'popup-ui';
import { responsiveWidth } from "react-native-responsive-dimensions";


const WeekDayUpdate=({navigation,route})=>{
const{startTime,selectedDates,endTime,Tab,ID}=route.params;


const [dstarttime, setdStarttime] = useState(new Date());
const [dendtime, setdEndtime] = useState(new Date());
const [starttime, setStarttime] = useState(startTime);
const [endtime, setEndtime] = useState(endTime);

const[STimeopen,setSTimeopen]=useState(false);
const[ETimeopen,setETimeopen]=useState(false);
const [selectedDate, setSelectedDate] = useState(selectedDates);


const popupshow=(json)=>{
   
     
  Popup.show({
    type: 'Success',
    title: 'Availability',
    button: true,
    button2:false,
    textBody: `${json.Result}`,
    buttonText: 'Ok',
    callback: () => {Popup.hide()
    navigation.goBack();
    },
      
    callback2:()=>{
        Popup.hide()
        console.log('hide')}
  })
}
const popupAlertshow=()=>{
  
     
  Popup.show({
    type: 'Warning',
    title: 'Alert',
    button: true,
    button2:false,
    textBody: 'Select valid day and time',
    buttonText: 'Ok',
    callback: () => {Popup.hide()
   
    },
      
    callback2:()=>{
        Popup.hide()
        console.log('hide')}
  })
}

// provider availability update api

   const Submit = () => {
    if((Tab===1) && (starttime<endtime)&&(selectedDate)){
        console.log('teb1')
   const data={
       UserId: `${ID}`,
        Days: `${selectedDate}`,
        StartTime: `${starttime}`,
        EndTime: `${endtime}`
     }
 console.log( selectedDate)
console.log(data)
    const url = "https://visdocapidev.azurewebsites.net/api/ProviderAvailability/Weekly/Update"
    fetch(url, {

        method: 'PUT',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }).then(response => response.json()).then(json => {
        console.log(json);
      popupshow(json)
    }).catch(e => {
        console.log("e", e)
    })
    }
    else if((Tab===0)&&(starttime<endtime)&&(selectedDate)){
        data={
                UserId: `${ID}`,
                Days: `${selectedDate}`,
                StartTime: `${starttime}`,
                EndTime: `${endtime}`
            
         }
        
            const url = "https://visdocapidev.azurewebsites.net/api/ProviderAvailability/Weekly/"
            fetch(url, {
        
                method: 'POST',
                headers: {
        
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        
            }).then(response => response.json()).then(json => {
                console.log(json);
              popupshow(json)
                
            }).catch(e => {
                console.log("e", e)
            })
           

    }
    else{
      popupAlertshow();
    }
}



    return(
        <Root>
           
        <View style={{flex:1}}>
              <View style={{ height: 50,borderWidth:0,backgroundColor:'#11266c',flexDirection:'row',alignItems:'center' }}>
             <View style={{ height: 50,width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0 }}>
            <View style={{flexDirection:'row',alignItems:'center',borderWidth:0}}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft:responsiveWidth(5), }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Week Availability</Text>
                </View>
              
            </View>
            </View>

            <Weekdaycalendar onSelectDate={setSelectedDate} 

          selected={selectedDate} 

/>     
            <View style={{padding:responsiveWidth(5)}}>
          
           
            <TouchableOpacity onPress={()=>setSTimeopen(true)}>
            <Text style={{marginTop:20,fontFamily: 'SpaceGrotesk-Medium',fontSize:12,color:"#808080"}}>Start Time</Text>
            <View style={{height:50,borderWidth:1,justifyContent:'center',borderRadius:8}}>
                <Text style={{position:'absolute',marginLeft:20,fontSize:17,color:'black',fontFamily: 'SpaceGrotesk-Regular'}}>{moment(starttime,'HH:mm:ss').format('hh:mm A')}</Text>

                <DatePicker
                        mode='time'
                        modal
                        open={STimeopen}
                        date={dstarttime}
                        onConfirm={value => {
                            setdStarttime(value)
                            setSTimeopen(false)
                            setStarttime(moment(value).format("HH:mm:ss"))
                            console.log(value)
                        }}
                        onCancel={() => {
                            setSTimeopen(false)
                        }}
                    />

                   

            </View>
            </TouchableOpacity>
            <Text style={{marginTop:20,fontFamily: 'SpaceGrotesk-Medium',fontSize:12,color:"#808080"}}>End Time</Text>
            <TouchableOpacity onPress={()=>setETimeopen(true)}>
            <DatePicker
                        mode='time'
                        modal
                        open={ETimeopen}
                        date={dendtime}
                        onConfirm={value => {
                         //   setOpen(false)
                         setdEndtime(value)
                            setETimeopen(false)
                            setEndtime(moment(value).format("HH:mm:ss"))
                        }}
                        onCancel={() => {
                            setETimeopen(false)
                        }}
                    />
            <View style={{height:50,borderWidth:1,justifyContent:'center',borderRadius:8}}>
                <Text style={{position:'absolute',marginLeft:20,fontSize:17,color:'black',fontFamily: 'SpaceGrotesk-Regular'}}>{moment(endtime,'HH:mm:ss').format('hh:mm A')}</Text>

               

            </View>
            </TouchableOpacity>
            </View>

            <TouchableOpacity 
            onPress={Submit}
            style={{height:50,alignItems:'center',justifyContent:'center',borderRadius:10,paddingLeft:20,paddingRight:20,backgroundColor:'green',alignSelf:'flex-end',marginTop:60,marginRight:responsiveWidth(5)}}>

{Tab===0?(
<Text style={{fontSize:22,color:'white',fontFamily:'SpaceGrotesk-Regular'}}>Add</Text>
):(
    <Text style={{fontSize:22,color:'white',fontFamily:'SpaceGrotesk-Regular'}}>Update</Text>
)}
            </TouchableOpacity>
        </View>
        </Root>
    )
};

export default WeekDayUpdate;