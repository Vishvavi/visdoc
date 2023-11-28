import { FlatList, StyleSheet, Text, TouchableOpacity, View,ScrollView ,StatusBar,Image, Alert} from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import DatePicker from 'react-native-date-picker'
import Feather from 'react-native-vector-icons/Feather'

import Calendar1 from '../Components/Calendar1';

import moment from 'moment'

import { Root, Popup ,Toast} from '../Components/popup-ui';
import { responsiveWidth,responsiveHeight,useDimensionsChange } from 'react-native-responsive-dimensions'

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




const ProposeTime = ({ navigation,route }) => {
    const{ID,AppointmentId,VisitTypeId,Scribe,item,Detailflow}=route.params;

    useEffect(()=>{
       console.log(AppointmentId)

    },[])

   
 



useDimensionsChange(
    useCallback(({ window, screen }) => {
    
    
    }, [])  
  );      
 
    const ToProvider = () => {
       
        if(selectDate1!=false){
            const AssignedDate=selectDate1
            const AssignedTime=time1
            
          
            if((((AssignedDate==moment(new Date()).format("YYYY-MM-DD"))&&(AssignedTime>moment(new Date()).format("HH:mm:ss")))||(AssignedDate>moment(new Date()).format("YYYY-MM-DD"))&&((AssignedTime>=moment(new Date()).format("HH:mm:ss"))||(AssignedTime<=moment(new Date()).format("HH:mm:ss"))))){

            
              
            navigation.navigate('ProceedPropose',{ID,AssignedDate,Scribe,VisitTypeId,AssignedTime,Detailflow,item})
            setselectDate1(false)   
            }
                else{
                    popupAlertshow()
                }
            }
                else{
                    const AssignedDate=selectedDate
                const Assigned=`${Hour.hour}:${Minutes.min} ${Am}`
                const AssignedTime= moment(Assigned,'hh:mm A').format("HH:mm:ss")
                console.log(AssignedTime)
                if(AssignedDate&&Hour&&Minutes&&Am!=null&&(((AssignedDate==moment(new Date()).format("YYYY-MM-DD"))&&(AssignedTime>moment(new Date()).format("HH:mm:ss")))||(AssignedDate>moment(new Date()).format("YYYY-MM-DD"))&&((AssignedTime>=moment(new Date()).format("HH:mm:ss"))||(AssignedTime<=moment(new Date()).format("HH:mm:ss"))))){
             
                    navigation.navigate('ProceedPropose',{ID,AssignedDate,Detailflow,Scribe,VisitTypeId,AssignedTime,item})
                }
                else
                {
                    popupAlertshow() 
                }
        
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
        const popupshow=()=>{
            
             
          Popup.show({
            type: 'Success',
            title: 'Appointment Created',
            button: true,
            button2:false,
            textBody: 'Congrats! Appointment Proposed Successfully done',
            buttonText: 'Ok',
            callback: () => {Popup.hide()
            navigation.navigate('Appointments',{ID,Scribe});
            },
              
            callback2:()=>{
              Popup.hide()
              console.log('hide')}
          })
          }

          const priorAuthNeed=async()=>{

            const data={
              
              
                PatientId: `${item.PatientId}`,
                SpecialtyTypeId: `${item.SpecialityTypeId}`,
                AppointmentDate: `${AssignedDate}`
                  
          
            }
            console.log(data)
          try{
            const url=`https://visdocapidev.azurewebsites.net/api/PriorAuth/`;
           fetch(url,{
             method: 'POST',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data)
          
          }).then(response=>response.json()).then(json=>{
          console.log(json);
          if(json.Status==="PriorAuth Not Needed"){
          setPriorAuth(false);
          ProviderPropose();
          }else{
            setPriorAuth(true);
            console.log("PriorAuth Needed")
          }
          })
          }
          catch(e){
            console.log(e);
          }
          
          
          }




          const Proposeurl=VisitTypeId==="1000"?"https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateStatus":"https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/UpdateStatus"

       const ProviderPropose=async()=>{


        if(selectDate1!=false){
            const AssignedDate=selectDate1
            const AssignedTime=time1
          
            if((((AssignedDate==moment(new Date()).format("YYYY-MM-DD"))&&(AssignedTime>moment(new Date()).format("HH:mm:ss")))||(AssignedDate>moment(new Date()).format("YYYY-MM-DD"))&&((AssignedTime>=moment(new Date()).format("HH:mm:ss"))||(AssignedTime<=moment(new Date()).format("HH:mm:ss"))))){

            
          
           // navigation.navigate('Provider',{ID,LocationTypeId,FacilityId,patient,specialty,AssignedDate,VisitTypeId,AssignedTime,TabName,ReferringProvider})
       
    const data1={
            UserId: `${ID}`,
            AppointmentId: `${AppointmentId}`,
            Status: "Propose",
            ProposedDate: `${AssignedDate}`,
            ProposedTime: `${AssignedTime}`,
        }
        
          const url=Proposeurl
           fetch(url,{
        
            method: 'PUT',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data1)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);
         popupshow();
         setselectDate1(false) 
         setTime1(false);
       
        }).catch(e=>{
          console.log("e",e)
        })
    }
    else{

        popupAlertshow()
       // Alert.alert('Not Allowed')
    }
        
        }
            else{
                const AssignedDate=selectedDate
                const Assigned=`${Hour.hour}:${Minutes.min} ${Am}`
                const AssignedTime= moment(Assigned,'hh:mm A').format("HH:mm:ss")
                console.log(AssignedTime)
                if(AssignedDate&&Hour&&Minutes&&Am!=null&&(((AssignedDate==moment(new Date()).format("YYYY-MM-DD"))&&(AssignedTime>moment(new Date()).format("HH:mm:ss")))||(AssignedDate>moment(new Date()).format("YYYY-MM-DD"))&&((AssignedTime>=moment(new Date()).format("HH:mm:ss"))||(AssignedTime<=moment(new Date()).format("HH:mm:ss"))))){
                //navigation.navigate('Provider',{ID,Scribe,ReasonForReferral,LocationTypeId,FacilityId,patient,specialty,TabName,VisitTypeId,AssignedDate,AssignedTime,ReferringProvider})
            
              
           

      //  console.log(data.item.AppointmentId) 
  
        const data1={
            UserId: `${ID}`,
            AppointmentId: `${AppointmentId}`,
            Status: "Propose",
            ProposedDate: `${AssignedDate}`,
            ProposedTime: `${AssignedTime}`,
        }
        
          const url="https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateStatus"
           fetch(url,{
        
            method: 'PUT',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data1)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);
          popupshow();
         // setselectDate1(false) 
          //setTime1(false);
         
        }).catch(e=>{
          console.log("e",e)
        })
    
    }
    else{
       popupAlertshow()
    }
    }

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };

    }
    const listhour=()=>{
      let num=0
        for(nu=0;nu<12;nu++){
            num=nu+1
            console.log(num)
        }
    }
  useEffect(()=>{
  listhour();
},[])
  


   
    

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
<TouchableOpacity style={{marginRight:20}}onPress={() => { setOpen1(true); }}>
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
                           setOpen(false);
                            setOpen1(false);
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
              {selectedDate?(
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
            
            <TouchableOpacity onPress={ToProvider} 
                style={{ width: 120, height: 40,alignItems:'center',alignSelf:'flex-end',justifyContent:'center',top:-40,marginRight:responsiveWidth(5), backgroundColor: 'green', borderRadius: 10,borderWidth:0 }}>
                    <Text style={{ fontSize: 22, color: '#eaeaea', fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
                </TouchableOpacity>
                </ScrollView>
        </View>
        </Root>
    )
}

export default ProposeTime;

const styles = StyleSheet.create({

  
})