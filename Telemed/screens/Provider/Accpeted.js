import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity,Animated,RefreshControl, View,LayoutAnimation } from 'react-native'
import React, { useState ,useEffect,useCallback} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppDimensions } from '../Dimensions'

import moment from 'moment';
import Header from '../Components/Header';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';

import useProgressViewOffset from '../Components/ProgressViewOffset'
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import TabStyle from '../Styles/TabStyle'
import CheckBox from '../Styles/CheckBox'
import List from '../Styles/List'
import URL from '../Components/URL'
 





const Accepted = ({navigation,route}) => {
const{Tab,ID,selectedDate,Scribe,AppointmentId,usercreated,Redirect}=route.params;
//const[Accepted,setAccepted]=useState(route.params.Accepted);
    const ToSignup = () => {
        navigation.navigate('Signup')
      }

    const [selectedTabs, setSelectedTabs] = useState(0);
    const [showInfo, SetShowInfo] = useState(false);
    const [showContact, SetShowContact] = useState(false);
    const [showSpecial, setShowSpecial] = useState(false);
    const [showAvail, setShowAvail] = useState(false);
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Accepted,setAccepted]=useState([]);
    const[Rowcount,setRowcount]=useState(false);
    const[LocationType,setLocationType]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const[UserCreated,setUserCreated]=useState(usercreated||false);
    const progressViewOffset = useProgressViewOffset();
    const[redirect,setredirect]=useState(Redirect);
    
   
    var curr = new Date; // get current date
    var first = curr.getDate()  // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
  
    let tomorrow = new Date();
   tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
   
    setTimeout(()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     setredirect(false)
     },10000
     )
  
    const selecteddata=redirect===true?Accepted.find((item)=>item.AppointmentId===AppointmentId):Accepted

    
    useDimensionsChange(
        useCallback(({ window, screen }) => {
        
         // setchangeWidth(window.width)
         // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }, [])  
      ); 
    const onRefresh =()=> {
  
        setRefreshing(true);
      AcceptedReferalList();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      };


     
 

const Tab0Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
const Tab1Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const Tab2Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
const Tab3Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${firstday}`
const Tab4Url=URL.AcceptedUrl+`Provider/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`

     const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };
  
      useEffect(()=>{
       
        
        const focusHandler = navigation.addListener('focus', () => {
           AcceptedReferalList();
            console.log(ID)
        });
        return focusHandler;
        }, [navigation,UserCreated]);

   

        

    const AcceptedReferalList = async(tab)=>{
        if(Tab===0){
           
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
                try{
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
                console.log('clinc')

            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
                }catch(e){
                    console.log(e);
                }
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
            try{
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }


        }
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
            try{
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }


        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
            try{
            console.log('fac&cli')
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }


        }
        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
            try{
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }


        }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
            try{
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
             setAccepted(result?.ListOfRefferals);
            console.log(result)
          
            }catch(e){
                console.log(e);
            }

        }
        else {
            try{
            const url=Tab0Url;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){console.log(e);}
        }
    }

        else if(Tab===1){
         
          if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
            try{
            const LocationTypes='&locationtype=Clinic'
             
            console.log('clinc')

        const url=Tab1Url+`${LocationTypes}`;
       console.log(url)
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
            }catch(e){
                console.log(e);
            }
       
    }
    else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
        try{
      const LocationTypes='&locationtype=Facility'
        console.log('facility')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
       
        }catch(e){
            console.log(e);
        }

    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
        try{
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }


    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
        try{
        console.log('fac&cli')
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
       
        }catch(e){
            console.log(e);
        }
    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
        try{
        const LocationTypes='locationtype=Facility&locationtype=Home%20Health'
        const url=Tab1Url+`&${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }

    }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
        try{
        const LocationTypes='&locationtype=Clinc&locationtype=Home%20Health'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
         setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }


    }
    else{
        try{
        const url=Tab1Url;
      console.log(url)
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }
        catch(e){
            console.log(e);
        }

    }
        }
        else if(Tab===2){
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
                try{
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
                console.log('clinc')
    
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
                }catch(e){
                    console.log(e);
                }
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
            try{
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }
    
    
        }
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
            try{
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }
          
    
    
        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
          try{
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }
    
        }
        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
            try{
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }
    
        }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
            try{
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
             setAccepted(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
                console.log(e);
            }
    
        }
        else{
           try{
            const url=Tab2Url;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
           }catch(e){
            console.log(e);
           }
        }
    }
     else if(Tab===3) {

        if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
        try{
            const LocationTypes='locationtype=Taurus%20Clinic'
             
            console.log('clinc')

        const url=Tab3Url+`&${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }
    }
    else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
        try{
      const LocationTypes='locationtype=Facility'
        console.log('facility')
        const url=Tab3Url+`&${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }
    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
        try{
        const LocationTypes='locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab3Url+`&${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }


    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
        try{
      
        const LocationTypes='locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab3Url+`&${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }


    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
        try{
        const LocationTypes='locationtype=Facility&locationtype=Home%20Health'
        const url=Tab3Url+`&${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }


    }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
        try{
        const LocationTypes='locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab3Url+`&${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
         setAccepted(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
            console.log(e);
        }


    }
    else {
        try{
        const url=Tab3Url;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
        console.log("tab3")
        }catch(e){
            console.log(e);
        }

    }
        
     
}

else if(Tab===4){

    if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
        try{
        const LocationTypes='&locationtype=Taurus%20Clinic'
         
        console.log('clinc')

    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
        }catch(e){
            console.log(e);
        }
}
else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
    try{
    
  const LocationTypes='&locationtype=Facility'
    console.log('facility')
    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
    }catch(e){
        console.log(e);
    }


}
else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
    try{
    const LocationTypes='&locationtype=Home%20Health'
    console.log('homehealth')
    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
    }catch(e){
        console.log(e);
    }
}
else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
    try{
    const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
    }catch(e){
        console.log(e);
    }


}
else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
    try{
    const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
    }catch(e){
        console.log(e);
    }


}
else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
    try{
    const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
     setAccepted(result?.ListOfRefferals);
    console.log(result)
    }catch(e){
        console.log(e);
    }


}
else{
   try{
    const url=Tab4Url;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
    console.log("tab1")
  
    console.log(selectedDate)
   }catch(e){
    console.log(e);
   }
}
    

}
    }

    const sortedData=Accepted?.sort((a,b)=>{
        const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);//The localeCompare() method compares two strings in the current locale.
        if(dataCompare!==0){
            return dataCompare;
        }
        return a.AppointmentTime.localeCompare(b.AppointmentTime);
    });
  

    const slideout=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsOpen(!isOpen);
        }

    function tConvert (time) {
        // Check correct time format and split into components
        var ts = time;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
      }

    const SlotView = ({ item }) => {
        return (
            <View  style={{
                backgroundColor:item.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}}
                >
            <View style={[styles.Itemcontainer,{flex:1,marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
              
                <TouchableOpacity onPress={()=>navigation.navigate('DetailView',{item,ID:ID,VisitTypeId:"1000",Scribe,Usercreated:UserCreated})}>
                <View style={[styles.TopLabel,{width:responsiveWidth(60)}]}>
                {item?.LocationTypeName==='Facility'&&(
                    <Text style={{ color: '#333333',
                    paddingLeft:5,
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize:12}}>{item?.LocationTypeName}-{item?.FacilityName}</Text>
                    )}
                    {item?.LocationTypeName==='Home Health'&&(
                      <Text style={{ color: '#333333',
                      paddingLeft:5,
                      fontFamily: 'SpaceGrotesk-Medium',
                      fontSize:12}}>{item?.LocationTypeName}-{item?.HomeHealthCompanyName}</Text>
                    )}
                       {item?.LocationTypeName==='Taurus Clinic'&&(
                      <Text style={{ color: '#333333',
                      paddingLeft:5,
                      fontFamily: 'SpaceGrotesk-Medium',
                      fontSize:12}}>{item?.LocationTypeName}</Text>
                    )}
                   </View>
                   <View style={List.Contentview}>
                    <View style={List.AccheckBox}>
                     <Octicons style={{ color:'green',alignSelf:'center' }} name='check' size={22} />
                    </View>
                   <View>
                   <View style={{flexDirection:'row'}}>
                    <Text style={[List.Text,{width:responsiveWidth(30)}]}>{moment(item.AppointmentTime,'HH:mm:ss').format('hh:mm A')}</Text>
                     <Text style={[List.Text1,{width:responsiveWidth(60)}]}>{item.SpecialtyType}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[List.Text2,{width:responsiveWidth(30) }]}>{item.AppointmentDate}</Text>
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
    createAppointment={()=>navigation.navigate('CreateAppointment',{ID:ID,Scribe})}
    TabName={'Accepted'}
    notification={()=>navigation.navigate('ProviderNotification',{ID:ID,Scribe})}
    
    Scribe={Scribe}
    ID={ID}
     
     />
             <View style={{flexDirection:'row',  marginTop:20}}>
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
               
                 fontSize: 17,
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
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
            {Scribe==="Provider"&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>TCM</Text>
            </TouchableOpacity>
          )}
      {Scribe==="Provider"&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 2 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>OP</Text>
            </TouchableOpacity>
          )}
          { // <TouchableOpacity  style={[styles.Tab,{backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
            //    <Text style={styles.TabText}>All</Text>
           // </TouchableOpacity>
          }
         </View>

         <Menu opened={isOpen}>
                <MenuTrigger>
                    <TouchableOpacity onPress={()=>slideout()}>
                    <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={28} /></Text>
                    </TouchableOpacity>
                    </MenuTrigger> 
                <MenuOptions optionsContainerStyle={CheckBox.MenuPopup}>
                  <MenuOption disableTouchable={true}
                  disabled={true}
                  >
                    
                  <TouchableOpacity onPress={() => {
                    if(AllLocation===true){
                    setAllLocation(false);
                    setHomeHealth(false);
                    setFacility(false);
                    setClinic(false);
                }
                    else{
                      setAllLocation(true);
                      setHomeHealth(true);
                      setFacility(true);
                      setClinic(true);
                     }
            }
                }>
                    <View style={[CheckBox.boxcontainer,{marginTop:10}]}>
                   <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: AllLocation?'green':'transparent', alignSelf: 'center', }} name='check' size={22} /></View>
                   <Text style={CheckBox.Text}>All Location</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                  <MenuOption>
                  <TouchableOpacity onPress={() => { 
                  if(Clinic===false){
                    setClinic(true)
                    const tab=true
                 //   callback(Clinic)
                }
                else{
                    setClinic(false)
                    const tab=false
                      //  callback(Clinic)
                    }
                }
               
             }>
                    <View style={CheckBox.boxcontainer}>
                    <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: Clinic?'green':'transparent', alignSelf: 'center',}} name='check' size={22} /></View>
                    <Text style={CheckBox.Text}>Clinic</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                  <MenuOption>
                  <TouchableOpacity onPress={() => {
                      if(Facility===false){
                        setFacility(true)
                        const tab1=true
                      //  callback(Facility)
                    }
                    else{
                        setFacility(false)
                        const tab1=false
                        //    callback(Facility)
                        }
                    

                }}>
                  <View style={CheckBox.boxcontainer}>
                  <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: Facility?'green':'transparent', alignSelf: 'center', }} name='check' size={22} /></View>
                    <Text style={CheckBox.Text}>Facility</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                  
                  <MenuOption>
                  <TouchableOpacity onPress={() => { 
                      if(HomeHealth===false){
                        setHomeHealth(true)
                        const tab2=true
                      //  callback(tab2)
                    }
                    else{
                        setHomeHealth(false)
                        const tab2=false
                        //    callback(tab2)
                        }
                    
                }}>
                  <View style={CheckBox.boxcontainer}>
                  <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: HomeHealth ?'green':'transparent', alignSelf: 'center', }} name='check' size={22} /></View>
                    <Text style={CheckBox.Text}>Home Health</Text>
                   </View>
                   </TouchableOpacity>
                   </MenuOption>
                  
                   <TouchableOpacity style={{marginTop:10,alignSelf:'center',marginRight:10,marginBottom:10}} onPress={()=>{AcceptedReferalList()
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:12}}>OK</Text>
                   </TouchableOpacity>
                 
                </MenuOptions>
              </Menu>

             {//   <TouchableOpacity onPress={() => { setSelectedTab(4)
              
               // }}>
               //     <Entypo style={{  color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='list' size={scale(25)} />
                //</TouchableOpacity>
             }
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
                {((!selecteddata)&&(Rowcount!==false))&&(
          <Animated.View   style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily: 'SpaceGrotesk-Bold',fontSize:12}}>Rescheduled/Cancelled</Text>
          </Animated.View>
       )}
            </View>
    </View>
    </MenuProvider>
  )
}

export default Accepted;

const styles = StyleSheet.create({
 
      TabContainer:{
        flexDirection:'row',
        borderWidth:0,
       justifyContent:'space-between',
       
        alignItems:'center' 
    },
    Popupcheckbox:{
        width:20,height:20,borderColor:'#dcdcdc',borderWidth:1
    },
    CheckBoxcontainer:{
        flexDirection:'row',paddingLeft:5,marginTop:5,alignItems:'center'
    },
    Tab:{
        paddingHorizontal:12,
        alignItems:'center',
        justifyContent:'center',
         borderColor: 'gray',
          borderWidth: 0.5,
           height:32,
            borderRadius: 5 
        },
    TabText:{
        color: '#11266c', 
        fontSize: 15,
       
        textAlign: 'center',
        fontFamily: 'SpaceGrotesk-Regular'

    },
    Text:{
        borderWidth:0,
       
        color: '#333333',
        fontFamily: 'SpaceGrotesk-SemiBold',
         fontSize: 15,
          marginTop: 0,
           marginLeft: 20
    },
    Text1:{
    color: '#333333',
   
    borderWidth:0,
    fontFamily: 'SpaceGrotesk-SemiBold',
     fontSize: 15,
      marginTop: 0,
       marginLeft: 0,
       
    },
    Itemcontainer:{
        marginLeft:16,
        marginRight:16,
        
    },
    TopLabel:{
        
        padding:4,
        borderWidth:0,
        backgroundColor:'white',
         textAlign: 'center',
          marginLeft: 40,
           borderRadius: 5
    },
    CheckBox:{
        width:30,
        height:30,
        borderColor:'#808080',
        alignItems:'center',
        borderWidth:1,
        borderRadius:5,
        marginTop: 0

    },

    Contentview:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'center'
    },
   Header:{
        borderWidth:0,
        alignItems:'center',
        flexDirection:"row",
        justifyContent:'space-between',
        width:"100%"
       },

    HeaderInnerLeft:{
        flexDirection:'row',
        height:50,
        borderWidth:0,
        alignItems:'center',
        
        paddingHorizontal:16

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
        marginRight:16

    },

})