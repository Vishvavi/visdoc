import { FlatList, StyleSheet, Text, TouchableOpacity, View ,StatusBar,Image,Alert} from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import DatePicker from 'react-native-date-picker'
import Feather from 'react-native-vector-icons/Feather'

import Calendar1 from '../Components/Calendar1';

import moment from 'moment'

import { ScrollView } from 'react-native-gesture-handler'
import { Root, Popup ,Toast} from '../Components/popup-ui';
import { responsiveHeight, responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions'

const Hours = [
    {
        id: 1,
        hour: "12",
        selected: false
    },
    {
        id: 2,
        hour: "01",
        selected: false
    },
    {
        id: 3,
        hour: "02",
        selected: false
    },
    {
        id: 4,
        hour: "03",
        selected: false
    },
    {
        id: 5,
        hour: "04",
        selected: false
    },
    {
        id: 6,
        hour: "05",
        selected: false
    },
    {
        id: 7,
        hour: "06",
        selected: false
    },
    {
        id: 8,
        hour: "07",
        selected: false
    },
    {
        id: 9,
        hour: "08",
        selected: false
    },
    {
        id: 10,
        hour: "09",
        selected: false
    },
    {
        id: 11,
        hour: "10",
        selected: false
    },
    {
        id: 12,
        hour: "11",
        selected: false
    },
]

const Minute = [
    {
        id: 1,
        min: "00",
        selected: false
    },
    {
        id: 2,
        min: "15",
        selected: false
    },
    {
        id: 3,
        min: "30",
        selected: false
    },
    {
        id: 4,
        min: "45",
        selected: false
    },
]




const Calendar = ({ navigation,route }) => {
    const{ID,LocationTypeId,ReasonForReferral,Scribe,FacilityId,VisitTypeId,patient,specialty,TabName,ReferringProvider}=route.params;

    


 
    const ToProvider = () => {
       
            if((selectDate1!=false)&&(selectedDate===null)){
                const AssignedDate=selectDate1
                const AssignedTime=time1
               if(AssignedDate!=null&&(AssignedDate==moment(new Date()).format("YYYY-MM-DD"))&&(AssignedTime>moment(new Date()).format("HH:mm:ss"))){
              
                navigation.navigate('Provider',{ID,Scribe,ReasonForReferral,LocationTypeId,FacilityId,patient,specialty,AssignedDate,VisitTypeId,AssignedTime,TabName,ReferringProvider})
                //  setselectDate1(false)   
            }
            else if(AssignedDate&&AssignedTime&&(AssignedDate>moment(new Date()).format("YYYY-MM-DD"))&&((AssignedTime>=moment(new Date()).format("HH:mm:ss"))||(AssignedTime<=moment(new Date()).format("HH:mm:ss")))){
                navigation.navigate('Provider',{ID,Scribe,ReasonForReferral,LocationTypeId,FacilityId,patient,specialty,AssignedDate,VisitTypeId,AssignedTime,TabName,ReferringProvider})
            }
                else{
                    console.log('false')
                   popupAlertshow()
                }
            }
                else if(selectedDate!=null){
                    const AssignedDate=selectedDate
                    const Assigned=`${Hour.hour}:${Minutes.min} ${Am}`
                   const AssignedTime= moment(Assigned,'hh:mm A').format("HH:mm:ss")
                    if(AssignedDate&&Hour&&Minutes&&Am!=null&&(AssignedDate==moment(new Date()).format("YYYY-MM-DD"))&&(AssignedTime>moment(new Date()).format("HH:mm:ss"))){
                    navigation.navigate('Provider',{ID,Scribe,ReasonForReferral,LocationTypeId,FacilityId,patient,specialty,TabName,VisitTypeId,AssignedDate,AssignedTime,ReferringProvider})
                }
                else if(AssignedDate&&Hour&&Minutes&&Am!=null&&(AssignedDate>moment(new Date()).format("YYYY-MM-DD"))&&((AssignedTime>=moment(new Date()).format("HH:mm:ss"))||(AssignedTime<=moment(new Date()).format("HH:mm:ss")))){
                navigation.navigate('Provider',{ID,Scribe,ReasonForReferral,LocationTypeId,FacilityId,patient,specialty,TabName,VisitTypeId,AssignedDate,AssignedTime,ReferringProvider})
                }
                else
                {
                    console.log('false')  
                    console.log(AssignedDate)
                    console.log(AssignedTime)
                   
                    console.log(AssignedDate>moment(new Date()).format("YYYY-MM-DD"))
                   popupAlertshow();
                }
             
        
    }
    else{
        popupAlertshow();
                
    }
    
   

}



    const [selectDate, setselectDate] = useState(new Date());
    const[selectDate1,setselectDate1]=useState(false);
    const [time, setTime] = useState(new Date());
    const [time1, setTime1] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [selectedTab, setSelectedTab] = useState(0);
    const [select, setSelect] = useState(Hours);
    const [selects, setSelects] = useState(Minute);
    const [selectedDate, setSelectedDate] = useState(null);
    const[Hour,setHour]=useState(false);
    const[Minutes,setMinutes]=useState(false);
    const[Am,setAm]=useState('AM');
    const[Visible,setVisible]=useState(false);
    const[Visible1,setVisible1]=useState(false);

    const handleOnpress = (item) => {
        setHour(item.hour)
     
        console.log(item.hour)
       
        
     // setSelect(newItem)
    }
    useDimensionsChange(
        useCallback(({ window, screen }) => {
        
        
        }, [])  
      );      
    const popupAlertshow=()=>{
      
         
      Popup.show({
        type: 'Warning',
        title: 'Alert',
        button: true,
        button2:false,
        textBody: 'Enter valid date and time',
        buttonText: 'Ok',
        callback: () => {Popup.hide()
       
        },
          
        callback2:()=>{
            Popup.hide()
            console.log('hide')}
      })
        }
    
    const listhour=()=>{
      let num=0
        for(nu=0;nu<12;nu++){
            num=nu+1
            console.log(num)
        }
    }
  useEffect(()=>{
 // listhour();
},[])
    


    // const DayView = ({ item }) => {
    // return (
    // <TouchableOpacity >
    // <View style={{ width: 50, borderRadius: 5, marginTop: 5, height: 68, backgroundColor: '#e6c402', borderWidth: 0.5, borderColor: '#808080', marginLeft: 15 }}>
    // <Text style={{ color: '#808080', textAlign: 'center', fontSize: 14, fontFamily: 'SpaceGrotesk-Regular' }}>{item.day}</Text>
    // <Text style={{ color: '#808080', textAlign: 'center', fontSize: 12, marginTop: 5, fontFamily: 'SpaceGrotesk-Regular' }}>{item.month}</Text>
    // <Text style={{ color: '#808080', textAlign: 'center', fontSize: 17, fontFamily: 'SpaceGrotesk-Regular' }}>{item.date}</Text>
    // </View>
    // </TouchableOpacity>
    // )
    // }
      
    

    const TimeView = ({ item }) => {
        console.log(Hour)
        return (

            <TouchableOpacity onPress={()=>{setHour(item) }} style={{ width: 50,alignItems:'center',justifyContent:'center', borderRadius: 5, height: 50, backgroundColor:item=== Hour? '#eaeaea':'#e6c402', borderWidth: 0.5, borderColor: '#808080', marginHorizontal: 5 }}>
                <Text style={{color:item.selected ? '#808080':'#11266c', textAlign: 'center', fontSize: 17, fontFamily: 'SpaceGrotesk-Regular' }}>{item.hour}</Text>
            </TouchableOpacity>
        )
    }

    const MinuteView = ({ item }) => {
        console.log(Minutes)
        return (
            <TouchableOpacity onPress={() => { setMinutes(item),
                setselectDate1(false)   
            }} style={{ width: 50,alignItems:'center',justifyContent:'center', borderRadius: 5, height: 50, backgroundColor: item===Minutes ? '#eaeaea':'#e6c402', borderWidth: 0.5, borderColor: '#808080', marginHorizontal: 5}}>
                    <Text style={{ color:item.selected ? '#808080':'#11266c', textAlign: 'center', fontSize: 17, fontFamily: 'SpaceGrotesk-Regular' }}>{item.min}</Text>
            </TouchableOpacity>
        )
    }
 
    return (
        <Root>
            
        <View style={{ flex: 1, backgroundColor: '#eaeaea',borderRadius:8 }}>
           <View style={{ height: 50,width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0 }}>
            <View style={{flexDirection:'row',alignItems:'center',borderWidth:0}}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: 20, }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Date and Time</Text>
                </View>
             
          </View>
          <ScrollView>
          <View style={{marginRight:responsiveWidth(5),height:1,backgroundColor:'#333333',marginTop:30,marginLeft:responsiveWidth(5)}}>
        <View style={[styles.Round]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(-2),fontFamily: 'SpaceGrotesk-Regular'}}>{TabName}</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(20)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(18),fontFamily: 'SpaceGrotesk-Regular'}}>Patient</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(40),backgroundColor:'white'}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(36),fontFamily: 'SpaceGrotesk-Regular'}}>Date & Time</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(63)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(61),fontFamily: 'SpaceGrotesk-Regular'}}>Provider</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(90)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,left:responsiveWidth(85),fontFamily: 'SpaceGrotesk-Regular'}}>Submit</Text>
        </View>
              
    
          { // <CalendarStrip

//style={{ height: 90, paddingTop: 10, paddingBottom: 10 }}

//calendarHeaderStyle={{ color: 'transparent', }}

//calendarColor={'transparent'}
//marking={[new Date()]}
//enabled={true}
//selected={true}
//numDaysInWeek={5}
//showMonth={true}
//dateNumberStyle={{ color: '#11266c',fontFamily: 'SpaceGrotesk-Regular' }}
//dateNameStyle={{ color: '#11266c',fontFamily: 'SpaceGrotesk-Regular'}}
//highlightDateNumberStyle={{ color: '#dcdcdc' }}
//highlightDateNameStyle={{ color: '#dcdcdc' }}
//disabledDateNameStyle={{ color: 'black' }}
//disabledDateNumberStyle={{ color: 'black' }}
//dayContainerStyle={{borderRadius:10,height:70,borderWidth:0,backgroundColor:'#E6C402'}}
//highlightDateNumberContainerStyle={{color:'#dcdcdc'}}
//highlightDateContainerStyle={{backgroundColor:'white'}}

//startingDate={new Date()}
///>
          }
          
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:responsiveHeight(10)}}>
<Text style={{ fontSize: 17, color: '#333333', marginLeft: responsiveWidth(5), fontFamily: 'SpaceGrotesk-Regular' }}>Date</Text>
<TouchableOpacity style={{marginRight:responsiveWidth(5)}}onPress={() => { setOpen1(true); }}>
                    <Feather style={{ color: '#e6c402', marginTop: 0, }} name='calendar' size={30} />
                    <DatePicker
                        mode='date'
                        modal
                      
                        open={open1}
                        date={selectDate}
                        minimumDate={new Date()}
                        onConfirm={value => {
                            setOpen1(false)
                            setOpen(true)
                            setselectDate(value)
                            setVisible(true)
                            setSelectedDate(null)
                            setselectDate1(moment(value).format("YYYY-MM-DD"))
                        }}
                        onCancel={() => {
                            setOpen1(false)
                            setOpen(false)
                        }}
                    />
                    <DatePicker
                        mode='time'
                        modal
                        open={open}
                        date={time}
                      
                      
                        onConfirm={value => {
                            setOpen(false)
                            setTime(value)
                            setVisible(true)
                            setHour(false)
                            setMinutes(false)
                           // setOpen1(true)
                           
                       setSelectedDate(null)
                       console.log(value)
                            setTime1(moment(value).format("HH:mm:ss"))
                        }}
                        onCancel={() => {
                           setOpen(false)
                            setOpen1(false)
                        }}
                    />
                </TouchableOpacity>
                </View>
               
<Calendar1 onSelectDate={setSelectedDate} 

selected={selectedDate} 

/>     
 
  

<View style={{}}>
    <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',paddingLeft:responsiveWidth(5),paddingRight:responsiveWidth(5),borderWidth:0,marginTop:20}}>
    <Text style={{ fontSize: 17, color: '#333333', fontFamily: 'SpaceGrotesk-Regular' }}>Hours</Text>
       <View style={{ backgroundColor: 'white', marginLeft: 0, borderRadius: 10, borderColor:"#eaeaea",borderWidth:0.5}}>
        <View style={{ flexDirection: 'row',alignItems:'center',borderRadius:10,justifyContent:'center',borderWidth:0}}>
                        <TouchableOpacity onPress={() => { setSelectedTab(0)
                        setAm('AM') }} style={{ backgroundColor: selectedTab == 0 ? 'green' : 'white', borderRadius: 8,height:25, width: 38,justifyContent:'center', }}><Text style={{ color: selectedTab == 0 ? '#eaeaea' : '#11266c', fontSize: 12, textAlign: 'center', fontFamily: 'SpaceGrotesk-Regular' }}>AM</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { setSelectedTab(1)
                        setAm('PM')
                        }} style={{ backgroundColor: selectedTab == 1 ? 'green' : 'white', borderRadius: 8,height:25, width: 38,justifyContent:'center', }}><Text style={{ color: selectedTab == 1 ? '#eaeaea' : '#11266c', fontSize: 12, textAlign: 'center', fontFamily: 'SpaceGrotesk-Regular' }}>PM</Text></TouchableOpacity>
                    </View>
                </View> 
                </View> 
    <View style={{marginTop:0,padding:responsiveWidth(5),marginLeft:0}}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                    data={select}
                    renderItem={TimeView}
                    horizontal
                />
                </View>
            </View>
            <View style={{ }}>
                <Text style={{ fontSize: 17,marginTop:20, color: '#333333', marginLeft:responsiveWidth(5), fontFamily: 'SpaceGrotesk-Regular' }}>Minutes</Text>
                <View style={{padding:responsiveWidth(5)}}>
                <FlatList
                showsHorizontalScrollIndicator={false}
                    data={selects}
                    renderItem={MinuteView}
                    horizontal
                />
                </View>
            </View>
            <View style={{ marginTop: 60,padding:0,borderWidth:0,flexDirection:'row' }}>
             
                <View style={{marginLeft: responsiveWidth(5),height:40}}>
              {selectedDate !=null?(
                    <View>
                {selectedDate&&Hours&&Minutes!=false&&(
                <Text style={{ fontSize: 17, color: '#333333' , fontFamily: 'SpaceGrotesk-Regular' }}>{`${Hour.hour}:${Minutes.min} ${Am}`}</Text>
                )}
                 {selectedDate&&Hours&&Minutes!=false&&(
                <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'SpaceGrotesk-Regular' }}>{moment(selectedDate).format("MMMM D, dddd")}</Text>
                )}
                </View>
                ):(
             
                <View>
                 {selectDate1!=false&&(
                <Text style={{ fontSize: 17, color: '#333333' , fontFamily: 'SpaceGrotesk-Regular' }}>{moment(time1,'HH:mm:ss').format('hh:mm A')}</Text>
                )}
                  {time1!=false&&(
                <Text style={{ fontSize: 12, color: '#333333', fontFamily: 'SpaceGrotesk-Regular' }}>{moment(selectDate1,'YYYY-MM-DD').format("MMMM D, dddd")}</Text>
                )}
                </View>
                )}
                </View>
             
            </View>
            <TouchableOpacity onPress={() => ToProvider()} 
                style={{ width: 120, height: 40,alignItems:'center',alignSelf:'flex-end',justifyContent:'center',top:-40,marginRight:responsiveWidth(5), backgroundColor: 'green', borderRadius: 10,borderWidth:0 }}>
                    <Text style={{ fontSize: 22, color: '#eaeaea', fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
                </TouchableOpacity>
                </ScrollView>
        </View>
        </Root>
    )
}

export default Calendar;

const styles = StyleSheet.create({

    Round:{
        width:8,
        height:8,
        borderRadius:20,
        borderColor:'#11266c',
        borderWidth:1,
        marginTop:-4,
        backgroundColor:'#11266c',
        position:'absolute'
      },
})