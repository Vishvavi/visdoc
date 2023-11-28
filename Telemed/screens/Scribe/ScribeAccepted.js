import { FlatList, Image, ScrollView, StyleSheet,Animated, Text, TouchableOpacity,RefreshControl, View,LayoutAnimation } from 'react-native'
import React, { useState ,useEffect, useCallback} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import Octicons from 'react-native-vector-icons/Octicons'



import moment from 'moment';
import Header from '../Components/Header';
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';

import useProgressViewOffset from '../Components/ProgressViewOffset'
import List from '../Styles/List'
import TabStyle from '../Styles/TabStyle'
import CheckBox from '../Styles/CheckBox'
import URL from '../Components/URL';
 





const ScribeAccepted = ({navigation,route}) => {
const{Tab,ID,selectedDate,Scribe,AppointmentId,Redirect}=route.params;
//const[Accepted,setAccepted]=useState(route.params.Accepted);
   
      const progressViewOffset = useProgressViewOffset();
    const [selectedTabs, setSelectedTabs] = useState(0);
   
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Accepted,setAccepted]=useState([]);
    const[Rowcount,setRowcount]=useState(false);
    const[LocationType,setLocationType]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const[UserCreated,setUserCreated]=useState(false);
    const[redirect,setredirect]=useState(Redirect);
    
   
    var curr = new Date; // get current date
    var first = curr.getDate(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
    useDimensionsChange(
      useCallback(({ window, screen }) => {
      
      
      }, [])  
    ); 
   
    setTimeout(()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   setredirect(false)
   },10000
   )
   const selecteddata=redirect===true?Accepted.find((item)=>item.AppointmentId===AppointmentId):Accepted
    const onRefresh =()=> {
  
        setRefreshing(true);
      AcceptedReferalList();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      };


      let tomorrow = new Date();
   tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');


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
        }, [navigation]);

  //Previous Screen Tabs based Urls

const Tab0Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
const Tab1Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
const Tab2Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
const Tab3Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${firstday}`
const Tab4Url=URL.AcceptedUrl+`${Scribe}/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`


const AcceptedReferalList = async(tab)=>{
        if(Tab===0){
           
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
              try{
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
             const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setAccepted(result?.ListOfRefferals);
            console.log(result)
               } catch(e){
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
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
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
      }catch(e){
        console.log(e);
      }

    }
        }
        else if(Tab===2){
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
              try{ 
              const LocationTypes='&locationtype=Taurus%20Clinic'
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
          }}

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
            console.log(e);          }
    
    
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
            const LocationTypes='&locationtype=Taurus%20Clinic'
             const url=Tab3Url+`${LocationTypes}`;
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
        const url=Tab3Url+`${LocationTypes}`;
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
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
      


    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
        console.log('fac&cli')
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
       


    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
        console.log(result)
       
    }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
        const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       // setRowcount(result?.Rowcount);
         setAccepted(result?.ListOfRefferals);
        console.log(result)
        }
    else {
        const url=Tab3Url;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
       setAccepted(result?.ListOfRefferals);
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
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
   
}
else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
    
  const LocationTypes='&locationtype=Facility'
    console.log('facility')
    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
   


}
else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
    const LocationTypes='&locationtype=Home%20Health'
    console.log('homehealth')
    const url=Tab4Url+`${LocationTypes}`;
    let result=await fetch(url);
    result=await result.json();
    setRowcount(result?.Rowcount);
   setAccepted(result?.ListOfRefferals);
    console.log(result)
 

}
else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
  try{
    console.log('fac&cli')
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
  }}

else{
   try{
    const url=Tab4Url;
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

   
const SlotView = ({ item }) => {
        return (
          <View  style={{
            backgroundColor:item.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}}
            >
        <View style={[styles.Itemcontainer,{flex:1,marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
          
            <TouchableOpacity onPress={()=>navigation.navigate('DetailView',{item,ID:ID,VisitTypeId:"1000",Scribe})}>
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
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Scribe==='HomehealthScribe'))&&(
          <TouchableOpacity  style={[TabStyle.Tab,{ backgroundColor: selectedTabs == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
          <Text style={TabStyle.TabText}>Telemed</Text>
      </TouchableOpacity>
            )}
            {((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==="FacilityHomehealthScribe"))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
            <Text style={TabStyle.TabText}>Facility</Text>
        </TouchableOpacity>
            )}
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe'))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
            <Text style={TabStyle.TabText}>TCM</Text>
        </TouchableOpacity>
            )}
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Scribe==='HomehealthScribe'))&&(
           <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 2 ? '#eaeaea' : '#e6c402'}] }>
           <Text style={TabStyle.TabText}>OP</Text>
       </TouchableOpacity>
            )}

          { // <TouchableOpacity onPress={() => { setSelectedTabs(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
           //     <Text style={styles.TabText}>All</Text>
           // </TouchableOpacity>
          }
         </View>

         <Menu opened={isOpen}>
                <MenuTrigger>
                  {(Scribe!="FacilityScribe")&&(Scribe!="HomehealthScribe")&&(
                   <TouchableOpacity onPress={()=>slideout()}>
                    <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={28} /></Text>
                   </TouchableOpacity>
                )}
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
                   <TouchableOpacity style={{marginTop:8,alignSelf:'center',marginRight:10}} onPress={()=>{AcceptedReferalList()
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:12,marginBottom:10}}>OK</Text>
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
             
     
            </View>
            {((!selecteddata)&&((Rowcount!==false)))&&(
          <Animated.View  style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily:'SpaceGrotesk-Bold',fontSize:12}}>Rescheduled/Cancelled</Text>
          </Animated.View>
       )}
    </View>
    </MenuProvider>
  )
}

export default ScribeAccepted;

const styles = StyleSheet.create({
    
     
  
  
   

})