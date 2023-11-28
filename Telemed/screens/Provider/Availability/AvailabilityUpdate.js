import React,{useEffect, useState} from "react";
import {Text,View,Alert,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

import Octicons from 'react-native-vector-icons/Octicons';
import { Root, Popup ,Toast} from 'popup-ui';
import { responsiveWidth } from "react-native-responsive-dimensions";



const AvailabilityUpdate=({navigation,route})=>{
const{updateDate,startTime,endTime,Tab,ID}=route.params;
const [date, setDate] = useState(new Date());
const[SelectedDate,setSelectedDate]=useState(updateDate);
const [dstarttime, setdStarttime] = useState(new Date());
const [dendtime, setdEndtime] = useState(new Date());
const [starttime, setStarttime] = useState(startTime);
const [endtime, setEndtime] = useState(endTime);
const [Dateopen, setDateOpen] = useState(false);
const[STimeopen,setSTimeopen]=useState(false);
const[ETimeopen,setETimeopen]=useState(false);

const popupshow=()=>{
   
     
  Popup.show({
    type: 'Success',
    title: 'Availability',
    button: true,
    button2:false,
    textBody: 'Updated successfully done',
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
    button2:false,
    title: 'Alert',
    button: true,
    textBody: 'Select valid time and date',
    buttonText: 'Ok',
    callback: () => {Popup.hide()
},
  
callback2:()=>{
    Popup.hide()
    console.log('hide')}
  })
}

// add availability and update availability

const Submit = () => {
    console.log('start time',starttime)
    if((Tab===1)&&(starttime<endtime)&&((SelectedDate===(moment(new Date()).format('YYYY-MM-DD')))&&(starttime>(moment(new Date()).format('HH:mm:ss')))||   ((starttime<endtime)&&((SelectedDate>moment(new Date()).format('YYYY-MM-DD')&&((starttime>=moment(new Date()).format('HH:mm:ss'))||(starttime<=moment(new Date()).format('HH:mm:ss')))))))){
        console.log('teb1')

    const data={
      
       providerId: `${ID}`,
        Date: `${SelectedDate}`,
        StartTime: `${starttime}`,
        EndTime: `${endtime}`
      
 }
 console.log(SelectedDate)
console.log(data)
    const url = "https://visdocapidev.azurewebsites.net/api/ProviderAvailability/Date/Update"
    fetch(url, {

        method: 'PUT',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }).then(response => response.json()).then(json => {
        console.log(json);
       popupshow();
    }).catch(e => {
        console.log("e", e)
    })
    }
  
    else if((Tab===0)&&(starttime<endtime)&&((SelectedDate===(moment(new Date()).format('YYYY-MM-DD')))&&(starttime>=(moment(new Date()).format('HH:mm:ss')))||((starttime<endtime)&&((SelectedDate>moment(new Date()).format('YYYY-MM-DD')&&((starttime>=moment(new Date()).format('HH:mm:ss'))||(starttime<=moment(new Date()).format('HH:mm:ss')))))))){
        data={
            providerId: `${ID}`,
            Date: `${SelectedDate}`,
            StartTime: `${starttime}`,
             EndTime: `${endtime}`
              }
              
         console.log(data)
        
            const url = "https://visdocapidev.azurewebsites.net/api/ProviderAvailability/Date/"
            fetch(url, {
        
                method: 'POST',
                headers: {
        
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        
            }).then(response => response.json()).then(json => {
                console.log(json);
              popupshow()
                
            }).catch(e => {
                console.log("e", e)
            })

    }
    else{
        console.log('error')
       popupAlertshow();
    }
}

useEffect(()=>{
    console.log(starttime)
    console.log(endtime)
    console.log(ID)
},[])

    return(
        <Root>
        <View style={{flex:1}}>
          
              <View style={{ height: 50,borderWidth:0,backgroundColor:'#11266c',flexDirection:'row',alignItems:'center' }}>
             <View style={{ height: 50,width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0 }}>
            <View style={{flexDirection:'row',alignItems:'center',borderWidth:0}}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5), }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Availability</Text>
                </View>
              
            </View>
            </View>
            <View style={{padding:30}}>
            <Text style={{fontFamily: 'SpaceGrotesk-Medium',fontSize:12,color:"#808080"}}>
            Select Date
            </Text>
            <TouchableOpacity onPress={()=>setDateOpen(true)}>
            <View style={{height:50,borderWidth:1,borderRadius:8,justifyContent:'center'}}>

                <Text style={{position:'absolute',marginLeft:20,fontSize:17,color:'black',fontFamily: 'SpaceGrotesk-Regular'}}>{SelectedDate}</Text>
              
                    <DatePicker
                        mode='date'
                        modal
                        open={Dateopen}
                        date={date}
                        minimumDate={new Date()}
                       // maximumDate={new Date(2023, 10, 20)} 
                        onConfirm={value => {
                            setDateOpen(false)
                            setDate(value)
                            setSelectedDate(moment(value).format("YYYY-MM-DD"))
                        }}
                        onCancel={() => {
                            setDateOpen(false)
                        }}
                    />

                  

                <Feather name="calendar" color={'#e6c402'} size={30} style={{alignSelf:'flex-end',marginRight:5}}/>
              

            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSTimeopen(true)}>
            <Text style={{marginTop:20,fontFamily: 'SpaceGrotesk-Medium',fontSize:12,color:"#808080"}}>Start Time</Text>
            <View style={{height:50,borderWidth:1,justifyContent:'center',borderRadius:8}}>
                <Text style={{position:'absolute',marginLeft:20,fontSize:17,color:'black',fontFamily: 'SpaceGrotesk-Regular'}}>{moment(starttime,"HH:mm:ss").format('hh:mm A')}</Text>

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
   style={{height:40,alignItems:'center',justifyContent:'center',marginTop:60,borderRadius:8,paddingLeft:20,paddingRight:20,backgroundColor:'green',alignSelf:'flex-end',marginRight:responsiveWidth(5)}}>
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

export default AvailabilityUpdate;