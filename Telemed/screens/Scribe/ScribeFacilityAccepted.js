import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity,RefreshControl,Animated, View,LayoutAnimation } from 'react-native'
import React, { useState ,useEffect, useCallback} from 'react'

import Octicons from 'react-native-vector-icons/Octicons'

import Header from '../Components/Header'

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';

import useProgressViewOffset from '../Components/ProgressViewOffset'
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import List from '../Styles/List';
import CheckBox from '../Styles/CheckBox';
import TabStyle from '../Styles/TabStyle'
import URL from '../Components/URL';

 





const ScribeFacilityAccepted = ({navigation,route}) => {
const{Tab,ID,selectedDate,Scribe,AppointmentId,Redirect}=route.params;
//const[Accepted,setAccepted]=useState(route.params.Accepted);
  

    const [selectedTabs, setSelectedTabs] = useState(1);
    
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Accepted,setAccepted]=useState([]);
    const[Rowcount,setRowcount]=useState(false);
    const[LocationType,setLocationType]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const progressViewOffset = useProgressViewOffset();

    const[redirect,setredirect]=useState(Redirect);
    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");

    const selecteddata=redirect===true?Accepted.find((item)=>item.AppointmentId===AppointmentId):Accepted
   
    const onRefresh =()=> {
  
        setRefreshing(true);
      AcceptedReferalList();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      };

      useDimensionsChange(
        useCallback(({ window, screen }) => {
        
        
        }, [])  
      ); 
      let tomorrow = new Date();
      tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
   
 //    const changeHandler = e => {
   //     setAllValues( prevValues => {
    //    return { ...prevValues,[e.target.name]: e.target.value}
    // })
    // }

     const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };
  
    useEffect(()=>{
        AcceptedReferalList();
        console.log(Tab)
    },[])

    const callback=React.useCallback(async(tab)=>{
        AcceptedReferalList(tab)
        console.log(`f=${Facility}`)
        console.log(`hh${HomeHealth}`)
        console.log(`clinic=${Clinic}`)
        })


    const AcceptedReferalList = async()=>{
        if(Tab===0){
            
            const url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
           
        }
       
  else if(Tab===1){
           
       const url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/AllReferrals/AcceptedReferrals/FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/AllReferrals/AcceptedReferrals/${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`;
       console.log(url)
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
     
       
        }
        else if(Tab===2){
            
    
            const url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
           
        }
       
    
     else if(Tab===3) {
       
        const url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
       
    }
   
     


else if(Tab===4){
try{
   const url=Scribe==="FacilityHomehealthScribe"?URL.FacAcceptedUrl+`FacilityScribe/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`:URL.FacAcceptedUrl+`${Scribe}/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`;
    let result=await fetch(url);
    result=await result.json();
  
   setAccepted(result?.ListOfRefferals);
    console.log(result)
}catch(e){
  console.log(e);
}
}



    }

    const sortedData=Accepted?.sort((a,b)=>{
      const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
      if(dataCompare!==0){
          return dataCompare;
      }
      return a.AppointmentTime.localeCompare(b.AppointmentTime);
  });

    const slideout=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsOpen(!isOpen);
        }

  

    const SlotView = ({ item }) => {
        return (
          <View style={{  backgroundColor:item.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}}>
            <View style={[styles.Itemcontainer,{flex:1,marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
               
                <TouchableOpacity onPress={()=>navigation.navigate('DetailView',{item,Scribe,ID,VisitTypeId:"1001"})}>
                <View style={[List.TopLabel,{width:responsiveWidth(60)}]}>
                {item?.LocationTypeName==='Facility'&&(
                    <Text style={List.TopLabelText}>{item?.LocationTypeName}-{item?.FacilityName}</Text>
                    )}
                    {item?.LocationTypeName==='Home Health'&&(
                      <Text style={List.TopLabelText}>{item?.LocationTypeName}-{item?.HomeHealthCompanyName}</Text>
                    )}
                       {item?.LocationTypeName==='Taurus Clinic'&&(
                      <Text style={List.TopLabelText}>{item?.LocationTypeName}</Text>
                    )}
                   </View>
                   <View style={List.Contentview}>
                    <View style={List.AccheckBox}>
                     <Octicons style={{ color:'green',alignSelf:'center' }} name='check' size={22} />
                    </View>
                   <View>
                   <View style={{flexDirection:'row'}}>
                    <Text style={[List.Text,{width:responsiveWidth(30)}]}>{moment(item.AppointmentTime,"HH:mm:ss").format('hh:mm A')}</Text>
                     <Text style={[List.Text1,{width:responsiveWidth(60)}]}>{item.SpecialtyType}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[List.Text2,{width:responsiveWidth(30)}]}>{item.AppointmentDate}</Text>
                    <Text style={[List.Text3,{ width:responsiveWidth(60)}]}>{item.PatientName}</Text>
                    </View>
                    </View>
                    </View>
                </TouchableOpacity>
                <View style={{borderBottomWidth:1,borderBottomColor:'#808080',marginTop:20}}/>
            </View>
            </View>
        )
    }

  return (
    <MenuProvider>
    
    <View style={{flex:1,backgroundColor:'#11266c'}}>
    <Header
     onPress={()=>navigation.goBack()}
    createAppointment={()=>{
      if(Scribe==='FacilityScribe'||Scribe==='Scribe'){
        navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe})
      }
      else{
      navigation.navigate('ScribeCreateAppointment',{ID,Scribe})
    }
    }}
    TabName={'Accepted'}
    notification={()=>navigation.navigate('ScribeNotification',{ID:ID,Scribe})}
    Scribe={Scribe}
    ID={ID}
     
     />
               
               <View style={{flexDirection:'row',  marginTop: 20}}>
               <Text style={{ color: '#eaeaea',
                marginLeft: responsiveWidth(5),
                 fontSize: 17,

                  fontFamily: 'SpaceGrotesk-Regular' }}>Appointments</Text>

                  
         {Tab=== 0 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(firstday,"YYYY-MM-DD").format('MMM DD')}</Text>
                 )}
                  {Tab=== 1 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize:17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(tomorrow,"YYYY-MM-DD").format('MMM DD')}</Text>
                 )}
                  {Tab=== 2 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(firstday,'YYYY-MM-DD').format('MMM DD')}-{moment(lastday,'YYYY-MM-DD').format('MMM DD')}</Text>
                 )}
                  {Tab=== 4 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(selectedDate).format('MMM DD')}</Text>
                 )}

                 </View>
                 <View style={[TabStyle.TabContainer,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5),marginTop:10,marginBottom:15}]}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity  style={[TabStyle.Tab,{ backgroundColor: selectedTabs == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe'))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
            <Text style={TabStyle.TabText}>Facility</Text>
        </TouchableOpacity>
            )}
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe'))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 2 ? '#eaeaea' : '#e6c402'}] }>
            <Text style={TabStyle.TabText}>TCM</Text>
        </TouchableOpacity>
            )}
{((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Scribe==='HomehealthScribe'))&&(
           <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
           <Text style={TabStyle.TabText}>OP</Text>
       </TouchableOpacity>
)}

          { // <TouchableOpacity onPress={() => { setSelectedTabs(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
            //    <Text style={styles.TabText}>All</Text>
           // </TouchableOpacity>
          }
         </View>

       
            
           </View>
             
            
            <View style={{backgroundColor:'#eaeaea',borderRadius:8,marginTop:0,flex:1}}>
             
            <FlatList
             refreshControl={

              
                <RefreshControl 
              
                progressViewOffset={progressViewOffset}
              
                refreshing={refreshing} onRefresh={()=>onRefresh()} />
              }
              contentContainerStyle={{paddingBottom:160}}
                data={sortedData}
                renderItem={SlotView}
                keyExtractor={item => item.AppointmentId}
            />
            {((!selecteddata)&&(Rowcount!=false))&&(
          <Animated.View  style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily:'SpaceGrotesk-Bold',fontSize:12}}>Rescheduled/Cancelled</Text>
          </Animated.View>
       )}
            </View>
    </View>
    </MenuProvider>
  )
}

export default ScribeFacilityAccepted;

const styles = StyleSheet.create({
   
})