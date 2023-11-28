import { FlatList, Image, ScrollView, StyleSheet, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState ,useEffect,useCallback} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import Octicons from 'react-native-vector-icons/Octicons'



import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import Header from '../../Components/Header'
import URL from '../../Components/URL';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import useProgressViewOffset from '../../Components/ProgressViewOffset';
import List from '../../Styles/List';
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import TabStyle from '../../Styles/TabStyle'
import CheckBox from '../../Styles/CheckBox'





const Proposedforcreated = ({navigation,route}) => {

  const{Tab,ID,selectedDate,Scribe,AppointmentId,usercreated,Redirect}=route.params;
  const [refreshing, setRefreshing] = useState(false);

  useDimensionsChange(
    useCallback(({ window, screen }) => {
    
     
    }, [])  
  ); 
   

    const [selectedTab, setSelectedTab] = useState(0);
    
    
    const[isOpen,setIsOpen]=useState(false);
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Proposed,setProposed]=useState([]);
    const[UserCreated,setUserCreated]=useState(usercreated||false);
    const progressViewOffset = useProgressViewOffset();
    const[redirect,setredirect]=useState(Redirect);
    const[Rowcount,setRowcount]=useState(false);
    
   
    
    setTimeout(()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   setredirect(false)
   },10000
   )

    const selecteddata=redirect===true?Proposed.find((item)=>item.AppointmentId===AppointmentId):Proposed

    var curr = new Date; // get current date
    var first = curr.getDate(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
   
 
    let tomorrow = new Date();
   tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
   

   

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };

      useEffect(()=>{
     
        const focus=navigation.addListener('focus',()=>{
          ProposedReferalList();
        });
        return focus
     
  },[navigation,UserCreated])

       const Tab0Url=URL.createdProposedUrl+`${ID}?startdate=${moment(new Date()).format("YYYY-MM-DD")}&enddate=${moment(new Date()).format("YYYY-MM-DD")}`
      const Tab1Url=URL.createdProposedUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
      const Tab2Url=URL.createdProposedUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
      const Tab3Url=URL.createdProposedUrl+`${ID}?startdate=${firstday}`
      const Tab4Url=URL.createdProposedUrl+`${ID}?startdate=${selectedDate}&enddate=${selectedDate}`
      
       const ProposedReferalList = async(tab)=>{
        
         if(Tab===0){
           
           
             if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
              try{
                 const LocationTypes='locationtype=Taurus%20Clinic'
                  
                 console.log('clinc')
   
             const url=Tab0Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
            
            setProposed(result?.ListOfRefferals);
             console.log(result)
             console.log("tab0")
              }catch(e){
                console.log(e);
              }
         }
         else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
          try{
             
           const LocationTypes='locationtype=Facility'
             console.log('facility')
             const url=Tab0Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
            
            setProposed(result?.ListOfRefferals);
             console.log(result)
             console.log("tab0")
          }catch(e){
            console.log(e);
          }
   
   
         }
         else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
          try{
             const LocationTypes='locationtype=Home%20Health'
             console.log('homehealth')
             const url=Tab0Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
           
            setProposed(result?.ListOfRefferals);
             console.log(result)
           
          }catch(e){
            console.log(e);
          }
   
         }
         else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
           try{
             const LocationTypes='locationtype=Facility&locationtype=Taurus%20Clinic'
             const url=Tab0Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
          setProposed(result?.ListOfRefferals);
             console.log(result)
           }catch(e){
            console.log(e);
           }}
           
         else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
          try{
             const LocationTypes='locationtype=Facility&locationtype=Home%20Health'
             const url=Tab0Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
           
            setProposed(result?.ListOfRefferals);
             console.log(result)
          }catch(e){
            console.log(e);
          }
   
   
         }
         else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
          try{
             const LocationTypes='locationtype=Taurus%20Clinc&locationtype=Home%20Health'
             const url=Tab0Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
            
              setProposed(result?.ListOfRefferals);
             console.log(result)
          }catch(e){
            console.log(e);
          }
   
   
         }
         else{
          try{
             const url=Tab0Url;
             let result=await fetch(url);
             result=await result.json();
            
            setProposed(result?.ListOfRefferals);
             console.log(result)
          }catch(e){
            console.log(e);
          }
   
         }
     }
   
         else if(Tab===1){
            
           if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
             const LocationTypes='locationtype=Taurus%20Clinic'
            const url=Tab1Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
       
        setProposed(result?.ListOfRefferals);
         console.log(result)
         console.log("tab0")
        // console.log(moment(new Date()).format("YYYY-MM-DD"))
     }
     else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
         
       const LocationTypes='locationtype=Facility'
         console.log('facility')
         const url=Tab1Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
         console.log(result)
        
   
   
     }
     else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
         const LocationTypes='locationtype=Home%20Health'
        
         const url=Tab1Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
       
        setProposed(result?.ListOfRefferals);
         console.log(result)
       
   
   
     }
     else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
         console.log('fac&cli')
         const LocationTypes='locationtype=Facility&locationtype=Taurus%20Clinic'
   
         const url=Tab1Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
         console.log(result)
        
   
   
     }
     else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
         const LocationTypes='locationtype=Facility&locationtype=Home%20Health'
         const url=Tab1Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
         console.log(result)
      
   
     }
     else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
         const LocationTypes='locationtype=Taurus%20Clinc&locationtype=Home%20Health'
         const url=Tab1Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
        
          setProposed(result?.ListOfRefferals);
        
   
   
     }
     else{
         const url=Tab1Url;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
        
   
     }
         }
         else if(Tab===2){
             if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
                 const LocationTypes='locationtype=Taurus%20Clinic'
                  
                 console.log('clinc')
     
             const url=Tab2Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
         
            setProposed(result?.ListOfRefferals);
             console.log(result)
            
          
         }
         else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
             
           const LocationTypes='locationtype=Facility'
             console.log('facility')
             const url=Tab2Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
            
            setProposed(result?.ListOfRefferals);
             console.log(result)
          
     
     
         }
         else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
             const LocationTypes='locationtype=Home%20Health'
             console.log('homehealth')
             const url=Tab2Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
            
            setProposed(result?.ListOfRefferals);
             console.log(result)
           
     
     
         }
         else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
             console.log('fac&cli')
             const LocationTypes='locationtype=Facility&locationtype=Taurus%20Clinic'
             const url=Tab2Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
             
            setProposed(result?.ListOfRefferals);
             console.log(result)
           
     
         }
         else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
             const LocationTypes='locationtype=Facility&locationtype=Home%20Health'
             const url=Tab2Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
          
            setProposed(result?.ListOfRefferals);
             console.log(result)
            
     
     
         }
         else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
             const LocationTypes='locationtype=Taurus%20Clinc&locationtype=Home%20Health'
             const url=Tab2Url+`&${LocationTypes}`;
             let result=await fetch(url);
             result=await result.json();
            
              setProposed(result?.ListOfRefferals);
             console.log(result)
          
     
         }
         else{
            
             const url=Tab2Url;
             let result=await fetch(url);
             result=await result.json();
            
            setProposed(result?.ListOfRefferals);
             console.log(result)

         }
     }
      else if(Tab===3){
         if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
             const LocationTypes='locationtype=Taurus%20Clinic'
              
           
   
         const url=Tab3Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
       
        setProposed(result?.ListOfRefferals);
         console.log(result)
      
     }
     else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
         
       const LocationTypes='locationtype=Facility'
         console.log('facility')
         const url=Tab3Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
     
        setProposed(result?.ListOfRefferals);
         console.log(result)
       
   
     }
     else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
         const LocationTypes='locationtype=Home%20Health'
         console.log('homehealth')
         const url=Tab3Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
         console.log(result)
        
   
   
     }
     else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
         console.log('fac&cli')
         const LocationTypes='locationtype=Facility&locationtype=Taurus%20Clinic'
         const url=Tab3Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
         console.log(result)
       
   
     }
     else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
         const LocationTypes='locationtype=Facility&locationtype=Home%20Health'
         const url=Tab3Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
         console.log(result)
       
       
   
   
     }
     else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
         const LocationTypes='locationtype=Taurus%20Clinc&locationtype=Home%20Health'
         const url=Tab3Url+`&${LocationTypes}`;
         let result=await fetch(url);
         result=await result.json();
       
          setProposed(result?.ListOfRefferals);
         console.log(result)
         
   
   
     }
     else{
         const url=Tab3Url;
         let result=await fetch(url);
         result=await result.json();
        
        setProposed(result?.ListOfRefferals);
        setRowcount(result?.Rowcount);
         console.log(result)
       
        
   
     }
         
      
   }
   else if(Tab===4){

    if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
        const LocationTypes='locationtype=Taurus%20Clinic'
         
        console.log('clinc')

    const url=Tab4Url+`&${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
  
   setProposed(result?.ListOfRefferals);
    console.log(result)
  
}
else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
    
  const LocationTypes='locationtype=Facility'
    console.log('facility')
    const url=Tab4Url+`&${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
 
   setProposed(result?.ListOfRefferals);
    console.log(result)
 


}
else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
    const LocationTypes='locationtype=Home%20Health'
    console.log('homehealth')
    const url=Tab4Url+`&${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
   
   setProposed(result?.ListOfRefferals);
    console.log(result)
   


}
else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
    console.log('fac&cli')
    const LocationTypes='locationtype=Facility&locationtype=Taurus%20Clinic'
    const url=Tab4Url+`&${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
 
   setProposed(result?.ListOfRefferals);
    console.log(result)
   


}
else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
    const LocationTypes='locationtype=Facility&locationtype=Home%20Health'
    const url=Tab4Url+`&${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
   
   setProposed(result?.ListOfRefferals);
    console.log(result)
  }

else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
    const LocationTypes='locationtype=Taurus%20Clinc&locationtype=Home%20Health'
    const url=Tab4Url+`&${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
   
     setProposed(result?.ListOfRefferals);
    console.log(result)
   


}
else{
   
    const url=Tab4Url;
    let result=await fetch(url);
    result=await result.json();
  setProposed(result?.ListOfRefferals);
    console.log(result)
}

}

   }
   
   const sortedData=Proposed?.sort((a,b)=>{
    const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
    if(dataCompare!==0){
        return dataCompare;
    }
    return a.AppointmentTime.localeCompare(b.AppointmentTime);
});

const ProviderDecline=async(data)=>{
  console.log(data.item.AppointmentId) 

  const data1={
      UserId: `${ID}`,
      ProposedAppointmentId: data.item.ProposedAppointmentId,
      Status: "Decline"
  }
  
  const url=URL.TelemedProposedUpdateStatus;
     fetch(url,{
  
      method: 'PUT',
      headers: { 
        
        'Content-Type': 'application/json' 
        },
     body:JSON.stringify(data1)
  
  }).then(response=>response.json()).then(json=>{
    console.log(json);
    ProposedReferalList()
   // setProvider(json.Providers);
  }).catch(e=>{
    console.log("e",e)
  })}

const ProviderAccept=async(data)=>{
  console.log(data.item.AppointmentId) 

  const data1={
      UserId: `${ID}`,
      ProposedAppointmentId: data.item.ProposedAppointmentId,
      Status: "Accept"
  }
  console.log(data1)
  
  const url=URL.TelemedProposedUpdateStatus;
     fetch(url,{
  
      method: 'PUT',
     headers: { 
        
        'Content-Type': 'application/json' 
        },
     body:JSON.stringify(data1)
  
  }).then(response=>response.json()).then(json=>{
    console.log(json);
    ProposedReferalList(); 
   // setProvider(json.Providers);
  }).catch(e=>{
    console.log("e",e)
  })}




    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
      };

    const renderHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
         
           ProviderDecline(data);
          closeRow(rowMap, data.item.AppointmentId)}}
      >
        <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Decline</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        ProviderAccept(data)
      closeRow(rowMap,data.item.AppointmentId)}
       }
        style={[styles.backRightBtn, styles.backRightBtnRight,{backgroundColor:'green'}]}
      // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
      >
        <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Accept</Text>
      </TouchableOpacity>
    
    
    </View>
      );
      const onRefresh =() => {
  
        setRefreshing(true);
      ProposedReferalList();
        setTimeout(() => {
          setRefreshing(false);
        }, 5000);
      };   

    
      
      const slideout=()=>{
  
       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsOpen(!isOpen);
        }
     
    const SlotView = ({ item }) => {
        return (
            <TouchableHighlight
            onPress={() => navigation.navigate('ProposedDetailView',{ID,Scribe,item,VisitTypeId:'1000',Usercreated:true})}
            style={{ 
              
              backgroundColor:item.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}}
              underlayColor={'#AAA'}
          >

            <View style={{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}}>
                
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
    <Text style={{color:'white',fontFamily:'SpaceGrotesk-Regular',fontSize:12}}>PR</Text>
                    </View>
                   <View>
                   <View style={{flexDirection:'row'}}>
                    <Text style={[List.Text,{width:responsiveWidth(30)}]}>{moment(item.AppointmentTime,"HH:mm:ss").format('hh:mm A')}</Text>
                     <Text style={[List.Text,{width:responsiveWidth(40)}]}>{item.SpecialtyType}</Text>
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
    {  // <View style={{ height: 50, }}>
         //       <Octicons style={{ marginLeft: 20, marginTop: 10 }} name='arrow-left' color={'#e6c402'} size={30} />
           //     <Text onPress={()=>ToSignup()} style={{ color: '#eaeaea', fontFamily: 'SpaceGrotesk-Regular', fontSize: 25,marginLeft:60, textAlign: 'center', marginTop: 5,position:'absolute' }}>Accepted</Text>
            //    <MaterialIcons style={{ marginLeft: 225, marginTop: 10, position: 'absolute' }} name='notifications-none' color={'#e6c402'} size={25} />
             //   <Fontisto style={{ marginLeft: 270, marginTop: 12, position: 'absolute' }} name='search' color={'#e6c402'} size={20} />
              //  <Image source={require('../images/add.png')} style={{marginLeft: 300, position: 'absolute',width:55,height:55}}/>
            //</View>
    }
     <Header
     onPress={()=>navigation.goBack({selectedTab:Tab})}
    createAppointment={()=>navigation.navigate('CreateAppointment',{ID:ID,Scribe})}
    TabName={'Proposed'}
    notification={()=>navigation.navigate('ProviderNotification',{ID:ID,Scribe})}
    ID={ID}
    Scribe={Scribe}
     
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
        
           <View style={[TabStyle.TabContainer,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity  style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
          

        { //   <TouchableOpacity onPress={() => { setSelectedTab(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTab == 3 ? '#eaeaea' : '#e6c402'}] }>
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
                  <MenuOption 
                  disableTouchable={true}
                  disabled={true}

                  >
                    
                  <TouchableOpacity onPress={() =>{ 
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
                     
                  }}>
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
                 
                   <TouchableOpacity style={{marginTop:8,alignSelf:'center',marginBottom:10}} onPress={()=>{ProposedReferalList()
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:12}}>OK</Text>
                   </TouchableOpacity>
                  
                </MenuOptions>
              </Menu>
            </View>
            
            <View style={{backgroundColor:'#eaeaea',borderRadius:0,marginTop:0,flex:1,}}>
          
           <SwipeListView
            refreshControl={
              <RefreshControl 
            
              progressViewOffset={progressViewOffset}
            
            
              refreshing={refreshing} onRefresh={()=>onRefresh()} />
            }
           keyExtractor={(item,index)=>item.AppointmentId.toString()}
           showsVerticalScrollIndicator={false}
          data={sortedData}
         renderItem={SlotView}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-70}
          previewRowKey={'0'}
          previewOpenValue={-40}
         previewOpenDelay={3000}

         
         onRowDidOpen={onRowDidOpen}
        />
        {((!selecteddata)&&(Rowcount!=false))&&(
            <Animated.View   style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
            <Text  style={{color:'red',fontFamily: 'SpaceGrotesk-Bold',fontSize:12}}>Accepted/Declined</Text>
            </Animated.View>
         )}
          {/* {selecteddata?(
            <FlatList
              refreshControl={
                <RefreshControl 
              
                progressViewOffset={progressViewOffset}
              
              
                refreshing={refreshing} onRefresh={()=>onRefresh()} />
              }
              contentContainerStyle={{paddingBottom:responsiveHeight(3)}}
                data={sortedData}
                renderItem={SlotView}
                keyExtractor={(item,index) => index}
              />
              ):(
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:12}}>Accepted/Declined</Text>
              </View>
              )} */}
            </View>
    </View>
    </MenuProvider>
  )
}

export default Proposedforcreated;

const styles = StyleSheet.create({
   
   
    
   
    
    rowFront: {
        paddingLeft:16,
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
        borderRadius: 0
      },
      backRightBtnRight: {
        backgroundColor: '#808080',
        right: 0,
        borderRadius:0
      },
    });