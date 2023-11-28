import { FlatList, Image, ScrollView, StyleSheet, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState ,useEffect} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import Octicons from 'react-native-vector-icons/Octicons'



import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import Header from '../Components/Header'
import useProgressViewOffset from '../Components/ProgressViewOffset'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import List from '../Styles/List';
import CheckBox from '../Styles/CheckBox';
import TabStyle from '../Styles/TabStyle'
import { useNotes } from '../NoteProvider'
import URL from '../Components/URL';







const ScribePending = ({navigation,route}) => {

  const{Tab,ID,Scribe,selectedDate,AppointmentId,Redirect}=route.params;
 

    const [selectedTab, setSelectedTab] = useState(0);
    
   
    const[Pending,setPending]=useState([]);
    const[Rowcount,setRowcount]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Visible,setVisible]=useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const[UserCreated,setUserCreated]=useState(false);
    const progressViewOffset = useProgressViewOffset();
    const[redirect,setredirect]=useState(Redirect);
  
    
    setTimeout(()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     setredirect(false)
      },10000
      )
    

    const selecteddata=redirect===true?Pending.find((item)=>item.AppointmentId===AppointmentId):Pending

    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");

    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
   
    useEffect(()=>{
        const focus=navigation.addListener('focus',()=>{
        PendingReferalList();
      });
      return focus
   
},[navigation])


  
   
      const ProviderCancel=async(data)=>{
        console.log(data.item.AppointmentId) 
  
        const data1={
            UserId: `${ID}`,
            AppointmentId: data.item.AppointmentId,
            Status: "Cancel"
        }
        
          const url=URL.TelemedUpdateStatus;
           fetch(url,{
        
            method: 'PUT',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data1)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);
          PendingReferalList();
         // setProvider(json.Providers);
        }).catch(e=>{
          console.log("e",e)
        })}

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };


      //Tab urls

      const Tab0Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`
      const Tab1Url= URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
      const Tab2Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`
      const Tab3Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}`
      const Tab4Url=URL.PendingTabUrl+`${Scribe}/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`




      const PendingReferalList = async(tab)=>{
        if(Tab===0){
             console.log('tabbbbb')
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
                console.log('clinc')

            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
          
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
            
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
          


        }
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setPending(result?.ListOfRefferals);
            console.log(result)
           

        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
            console.log('fac&cli')
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setPending(result?.ListOfRefferals);
            console.log(result)
          }

        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setPending(result?.ListOfRefferals);
            console.log(result)
           


        }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
             setPending(result?.ListOfRefferals);
            console.log(result)
         

        }
        else{
          console.log("tab0")

            const url=Tab0Url;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
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
      
       setPending(result?.ListOfRefferals);
        console.log(result)
       
    }
    else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
        
      const LocationTypes='&locationtype=Facility'
        console.log('facility')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
      


    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
      
       setPending(result?.ListOfRefferals);
        console.log(result)
      

    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
        console.log('fac&cli')
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
       


    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
       }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
        const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
         setPending(result?.ListOfRefferals);
        console.log(result)
       
}
    else{
        const url=Tab1Url;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
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
        
           setPending(result?.ListOfRefferals);
            console.log(result)
           
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
            
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
         }
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
           
    
    
        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
            console.log('fac&cli')
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            
           setPending(result?.ListOfRefferals);
            console.log(result)
           
    
    
        }
        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setPending(result?.ListOfRefferals);
            console.log(result)
          
  }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
             setPending(result?.ListOfRefferals);
            console.log(result)
        
    }
        else{
           
            const url=Tab2Url;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
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
      
       setPending(result?.ListOfRefferals);
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
    
       setPending(result?.ListOfRefferals);
        console.log(result)
      


    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
       


    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
        console.log('fac&cli')
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
       


    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setPending(result?.ListOfRefferals);
        console.log(result);

     }

    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
        const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
        
        console.log(result)
       }

    else{
        const url=`https://visdocapidev.azurewebsites.net/api/TelemedReferral/AllReferrals/PendingReferrals/${Scribe}/${ID}?startdate=${firstday}`;
        let result=await fetch(url);
        result=await result.json();
        setPending(result?.ListOfRefferals);
        setRowcount(result?.Rowcount);
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
  
 setPending(result?.ListOfRefferals);
  console.log(result)
 
}
else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
  
  const LocationTypes='&locationtype=Facility'
  console.log('facility')
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
  setPending(result?.ListOfRefferals);
  console.log(result)
  }

else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
  const LocationTypes='&locationtype=Home%20Health'
  console.log('homehealth')
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
 setPending(result?.ListOfRefferals);
  console.log(result)
 }

else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
  console.log('fac&cli')
  const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
  
 setPending(result?.ListOfRefferals);
  console.log(result)
  


}
else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
  const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
 setPending(result?.ListOfRefferals);
  console.log(result)
  


}
else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
  const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
   setPending(result?.ListOfRefferals);
   
  console.log(result)
  


}
else{
 
  const url=Tab4Url;
  let result=await fetch(url);
  result=await result.json();
 
 setPending(result?.ListOfRefferals.sort((a,b)=>a.AppointmentDate>b.AppointmentDate? 1:-1));
  console.log(result)
  
}
  

}

}

//setTimeout(() => {
 // setspinner(false)
//}, 10000);

const onRefresh =() => {
  
  setRefreshing(true);
  PendingReferalList();
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
              //ProviderDecline(data)

              closeRow(rowMap, data.item.AppointmentId)}}
          >
            {//<Text style={{color:'black',fontSize:scale(12),fontFamily:'paceGrotesk-Regular'}}>Decline</Text>
}
          </TouchableOpacity>
          )}
          <TouchableOpacity onPress={()=>{ProviderCancel(data)
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn, styles.backRightBtnRight,{backgroundColor:"#808080"}]}
          // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Cancel</Text>
          </TouchableOpacity>
         
        
        </Animated.View>
      );


    
      const slideout=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setIsOpen(!isOpen);
         
        }


        const sortedData=Pending?.sort((a,b)=>{
          const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
          if(dataCompare!==0){
              return dataCompare;
          }
          return a.AppointmentTime.localeCompare(b.AppointmentTime);
      });
     
    const SlotView = ({ item }) => {

     
        return (
          <TouchableHighlight
          onPress={() => navigation.navigate('PendingDetailView',{ID,Scribe,item,VisitTypeId:"1000",Usercreated:UserCreated
          })}
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
      <Text style={{color:'white',fontFamily:'SpaceGrotesk-Regular',fontSize:12}}>P</Text>
                  </View>
                 <View>
                 <View style={{flexDirection:'row'}}>
                  <Text style={[List.Text,{width:responsiveWidth(30)}]}>{moment(item.AppointmentTime,"HH:mm:ss").format('hh:mm A')}</Text>
                   <Text style={[List.Text,{width:responsiveWidth(40)}]}>{item.SpecialtyType}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginTop:5}}>
                  <Text style={[List.Text2,{width:responsiveWidth(30)}]}>{item.AppointmentDate}</Text>
                  <Text style={[List.Text2,{width:responsiveWidth(40)}]}>{item.PatientName}</Text>
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
    createAppointment={()=>{

      if((Scribe==='FacilityScribe')||(Scribe==='Scribe')){
        navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe})
      }
      else{
      navigation.navigate('ScribeCreateAppointment',{ID,Scribe})
    }
    }}
    TabName={'Pending'}
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
        
                 <View style={[TabStyle.TabContainer,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>
            
          

            
            {((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==="FacilityHomehealthScribe"))&&(
             <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
             <Text style={TabStyle.TabText}>Facility</Text>
         </TouchableOpacity>
            )}
{
 //           <TouchableOpacity  style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTab == 4 ? '#eaeaea' : '#e6c402'}] }>
   //             <Text style={styles.TabText}>All</Text>
     //       </TouchableOpacity>
}
         </View>

         <Menu opened={isOpen}>
                <MenuTrigger>
                {(Scribe!="FacilityScribe")&&(Scribe!="HomehealthScribe")&&(
                    <TouchableOpacity onPress={()=>slideout()}>
                    <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={30} /></Text>
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

                  
                   <TouchableOpacity style={{marginTop:8,alignSelf:'center',marginRight:10}} onPress={()=>{PendingReferalList()
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
          //leftOpenValue={scale(75)}
          
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
         previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
            {((!selecteddata)&&((Pending?.length!=0)||(Rowcount===0)))&&(
          <Animated.View  style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily:'SpaceGrotesk-Bold',fontSize:12}}>Already Accepted/Cancelled</Text>
          </Animated.View>
       )}
          {//  <FlatList
            //  contentContainerStyle={{paddingBottom:verticalScale(160)}}
              //  data={Pending}
               // renderItem={SlotView}
               // keyExtractor={item => item.AppointmentId}
            ///>
        }
            </View>
    </View>
    </MenuProvider>
  )
}

export default ScribePending;

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
        backgroundColor: '#EAEAEA',
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

    HeaderInnerLeft:{
        flexDirection:'row',
       // height:verticalScale(50),
        borderWidth:0,
        alignItems:'center',
        
        paddingHorizontal:16

    },
 
    

})