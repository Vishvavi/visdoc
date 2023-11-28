import { FlatList, Image, ScrollView, StyleSheet,SafeAreaView, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState,useCallback ,useEffect,useRef} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import Octicons from 'react-native-vector-icons/Octicons'



import { SwipeListView } from 'react-native-swipe-list-view';
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
import TabStyle from '../Styles/TabStyle';
import List from '../Styles/List';
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'

import CheckBox from '../Styles/CheckBox'
import URL from '../Components/URL';






const ScribeDeclined = ({navigation,route}) => {

  const{Tab,ID,selectedDate,Scribe}=route.params;
    const ToSignup = () => {
        navigation.navigate('Signup')
      }

    const [selectedTab, setSelectedTab] = useState(0);
   
    const[Accepted,setAccepted]=useState([]);
    const[Declined,setDeclined]=useState([]);
    const[isOpen,setIsOpen]=useState(false);
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Visible,setVisible]=useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    const progressViewOffset = useProgressViewOffset();
   

    useDimensionsChange(
      useCallback(({ window, screen }) => {
      }, [])  
    ); 

    var curr = new Date; // get current date
    var first = curr.getDate(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
   
    useEffect(()=>{
       DeclinedReferalList();
    },[])

    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');

   

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };

      const Tab0Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${moment(new Date()).format("YYYY-MM-DD")}&enddate=${moment(new Date()).format("YYYY-MM-DD")}`
      const Tab1Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
      const Tab2Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
      const Tab3Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}`
      const Tab4Url=URL.DeclinedTabUrl+`${Scribe}/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`


      const DeclinedReferalList = async(tab)=>{
        if(Tab===0){
             console.log('tabbbbb')
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
                console.log('clinc')

            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setDeclined(result?.ListOfRefferals);
            console.log(result)
          
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
            
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setDeclined(result?.ListOfRefferals);
            console.log(result)
          


        }
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           

        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
            console.log('fac&cli')
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setDeclined(result?.ListOfRefferals);
            console.log(result)
          }

        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           


        }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
             setDeclined(result?.ListOfRefferals);
            console.log(result)
         

        }
        else{
          console.log("tab0")

            const url=Tab0Url;
            let result=await fetch(url);
            result=await result.json();
           
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           }
           }

        else if(Tab===1){
           
          if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
            const LocationTypes='&locationtype=Taurus%20Clinic'
             
            console.log('clinc')

        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
      
       setDeclined(result?.ListOfRefferals);
        console.log(result)
       
    }
    else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
        
      const LocationTypes='&locationtype=Facility'
        console.log('facility')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
      


    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
      
       setDeclined(result?.ListOfRefferals);
        console.log(result)
      

    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
        console.log('fac&cli')
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
       


    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
       }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
        const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
         setDeclined(result?.ListOfRefferals);
        console.log(result)
       
}
    else{
        const url=Tab1Url;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
       
    }
        }
        else if(Tab===2){
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
                console.log('clinc')
    
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
        
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
            
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setDeclined(result?.ListOfRefferals);
            console.log(result)
         }
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           
    
    
        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
            console.log('fac&cli')
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           
    
    
        }
        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setDeclined(result?.ListOfRefferals);
            console.log(result)
          
  }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
             setDeclined(result?.ListOfRefferals);
            console.log(result)
        
    }
        else{
           
            const url=Tab2Url;
            let result=await fetch(url);
            result=await result.json();
           
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           
        }
    }
     else if(Tab===3){
        if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
            const LocationTypes='&locationtype=Taurus%20Clinic'
             
            console.log('clinc')

        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
      
       setDeclined(result?.ListOfRefferals);
        console.log(result)
        console.log("tab0")
       // console.log(moment(new Date()).format("YYYY-MM-DD"))
    }
    else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
        
      const LocationTypes='&locationtype=Facility'
        console.log('facility')
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
    
       setDeclined(result?.ListOfRefferals);
        console.log(result)
      


    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
       


    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
        console.log('fac&cli')
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
       


    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
     
      


    }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
        const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
         setAccepted(result?.ListOfRefferals);
        console.log(result)
       
      


    }
    else{
        const url=Tab3Url;
        let result=await fetch(url);
        result=await result.json();
       
       setDeclined(result?.ListOfRefferals);
        console.log(result)
        

    }
        
     
}

else if(Tab===4){

  if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
      const LocationTypes='&locationtype=Taurus%20Clinic'
       
      console.log('clinc')

  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
  
 setDeclined(result?.ListOfRefferals);
  console.log(result)
 
}
else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
  
const LocationTypes='&locationtype=Facility'
  console.log('facility')
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
  
 setDeclined(result?.ListOfRefferals);
  console.log(result)
  


}
else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
  const LocationTypes='&locationtype=Home%20Health'
  console.log('homehealth')
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
 setDeclined(result?.ListOfRefferals);
  console.log(result)
 }

else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
  console.log('fac&cli')
  const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
  
 setDeclined(result?.ListOfRefferals);
  console.log(result)
  


}
else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
  const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
 setDeclined(result?.ListOfRefferals);
  console.log(result)
  


}
else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
  const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
   setDeclined(result?.ListOfRefferals);
  console.log(result)
  


}
else{
 
  const url=Tab4Url;
  let result=await fetch(url);
  result=await result.json();
 
 setDeclined(result?.ListOfRefferals);
  console.log(result)
  
}
  

}

}

const scrollRef = useRef();

function scrollToTop() {
  scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true
  })
}


const sortedData=Declined.sort((a,b)=>{
  const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
  if(dataCompare!==0){
      return dataCompare;
  }
  return a.AppointmentTime.localeCompare(b.AppointmentTime);
});
//setTimeout(() => {
 // setspinner(false)
//}, 10000);

const onRefresh =() => {
  
  setRefreshing(true);
  DeclinedReferalList();
  setTimeout(() => {
    setRefreshing(false);
  }, 5000);
};   


const xOffset = new Animated.Value(0);


    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
      };

    const renderHiddenItem = (data, rowMap) => (
        <Animated.View style={[styles.rowBack,{

        flex:1
        }]}>

          {Visible&&(
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => {
              ProviderDecline(data)

              closeRow(rowMap, data.item.AppointmentId)}}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Decline</Text>
          </TouchableOpacity>
          )}
          <TouchableOpacity onPress={()=>{ProviderAccept(data)
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn, styles.backRightBtnRight]}
          // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("ProposeTime",{ID,AppointmentId:data.item.AppointmentId,Scribe})
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn,styles.backRightBtnRight, {right:75,width:75,borderRightWidth:1,borderRightColor:'white',backgroundColor:"#808080"}]}
          // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Propose</Text>
          </TouchableOpacity>
        
        </Animated.View>
      );


    
      const slideout=()=>{
  
      //  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
         
        }

       
    
    const SlotView = ({ item }) => {
        return (
          <TouchableHighlight
          onPress={() => navigation.navigate('DeclinedDetailView',{ID,Scribe,VisitTypeId:'1000',item})}
          style={styles.rowFront}
          underlayColor={'#AAA'}
          >

          <View style={[{flex:1,marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
              
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
                  <View style={List.PcheckBox}>
                  {// <Octicons style={{ color:'green',alignSelf:'center' }} name='check' size={scale(22)} />
  }
      <Text style={{color:'white',fontFamily:'SpaceGrotesk-Regular',fontSize:12}}>D</Text>
                  </View>
                  <View>
                 <View style={{flexDirection:'row'}}>
                  <Text style={[List.Text,{width:responsiveWidth(30)}]}>{moment(item.AppointmentTime,"HH:mm:ss").format('hh:mm A')}</Text>
                   <Text style={[List.Text1,{width:responsiveWidth(40)}]}>{item.SpecialtyType}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginTop:5}}>
                  <Text style={[List.Text2,{width:responsiveWidth(30)}]}>{item.AppointmentDate}</Text>
                  <Text style={[List.Text3,{width:responsiveWidth(40)}]}>{item.PatientName}</Text>
                  </View>
                  
                  </View>
                  </View>
             
              <View style={{borderBottomWidth:1,borderBottomColor:'#808080',marginTop:20}}/>
          </View>
          </TouchableHighlight>
      )

  }

  return (
    <MenuProvider>
    <View style={{flex:1,backgroundColor:'#11266c'}}>
    <Header
     onPress={()=>navigation.goBack()}
    createAppointment={()=>{ if(Scribe==='FacilityScribe'||Scribe==='Scribe'){
      navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe})
    }
    else{
    navigation.navigate('ScribeCreateAppointment',{ID,Scribe})
  }}
}
    TabName={'Declined'}
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

            <TouchableOpacity style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>
            {((Scribe==="FacilityScribe")||(Scribe==="FacilityHomehealthScribe")||(Scribe==="Scribe"))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
            )}
           

         { //  <TouchableOpacity onPress={() => { setSelectedTab(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTab == 3 ? '#eaeaea' : '#e6c402'}] }>
           //     <Text style={styles.TabText}>All</Text>
           // </TouchableOpacity>
         }
         </View>

         <Menu opened={isOpen}>
                <MenuTrigger>
                    <TouchableOpacity onPress={()=>slideout()}>
                    <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={30} /></Text>
                    </TouchableOpacity>
                    </MenuTrigger> 
                    <MenuOptions optionsContainerStyle={CheckBox.MenuPopup}>
                  <MenuOption disableTouchable={true}
                  disabled={true}
                  >
                    
                  <TouchableOpacity onPress={() => {
                    if(AllLocation===true){
                    setAllLocation(false)
                    setHomeHealth(false)
                    setFacility(false)
                    setClinic(false)
                    }
                    else{
                      setAllLocation(true)
                      setHomeHealth(true)
                      setFacility(true)
                      setClinic(true)

                    }
            }
                }>
                    <View style={[CheckBox.boxcontainer,{marginTop:10}]}>
                   <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: AllLocation?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
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
                    <Octicons style={{ color: Clinic?'green':'transparent', alignSelf: 'center',}} name='check' size={17} /></View>
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
                    <Octicons style={{ color: Facility?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
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
                    <Octicons style={{ color: HomeHealth ?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
                    <Text style={CheckBox.Text}>Home Health</Text>
                   </View>
                   </TouchableOpacity>
                   </MenuOption>
                  
                   <TouchableOpacity style={{marginTop:8,alignSelf:'center',marginRight:10,marginBottom:10}} onPress={()=>{DeclinedReferalList(),
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
            
            <SafeAreaView style={{backgroundColor:'#eaeaea',borderRadius:0,marginTop:0,flex:1,}}>
          {/*  <SwipeListView
            ref={scrollToTop}
           
            keyExtractor={(item,index)=>item.AppointmentId.toString()}
            showsVerticalScrollIndicator={false}
          data={Declined}
          renderItem={SlotView}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={scale(75)}
          
          rightOpenValue={scale(-150)}
          previewRowKey={'0'}
          previewOpenValue={-40}
         previewOpenDelay={3000}
        

          //onSwipeValueChange={}
          onRowDidOpen={onRowDidOpen}
        />
    */       
    }
           <FlatList
         contentContainerStyle={{paddingBottom:160}}
                data={sortedData}
               renderItem={SlotView}
                keyExtractor={item => item.AppointmentId}
                
              refreshControl={
                
                <RefreshControl
           
                progressViewOffset={progressViewOffset}
               
             
              
                refreshing={refreshing} onRefresh={()=>onRefresh()} />
              }
            />
        
            </SafeAreaView>
    </View>
    </MenuProvider>
  )
}

export default ScribeDeclined;

const styles = StyleSheet.create({
  
    rowFront: {
      
        //alignItems: 'center',
        backgroundColor: '#dcdcdc',
      //  justifyContent: 'center',
       // flex: 1,
        //borderRadius:8
      },
      rowBack: {
       // alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        paddingLeft:0,
      },
      backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        
      },
      backRightBtnLeft: {
        backgroundColor: '#808080',
        left: 0,
        borderRadius: 0,
       
      },
      backRightBtnRight: {
        backgroundColor: 'green',
        right: 0,
        borderRadius:0,
        width:75
      },
    Contentview:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'center'
    },
   Header:{
        borderWidth:0,
        flexDirection:"row",
        justifyContent:'space-between',
        width:"100%"
       },

   

})