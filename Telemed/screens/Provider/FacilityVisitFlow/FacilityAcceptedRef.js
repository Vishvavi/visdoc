import { FlatList, Image, ScrollView, StyleSheet,Animated, Text, TouchableOpacity,RefreshControl, View,LayoutAnimation } from 'react-native'
import React, { useState ,useEffect, useCallback} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';
import useProgressViewOffset from '../../Components/ProgressViewOffset'

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import moment from 'moment';
import Header from '../../Components/Header';
import TabStyle from '../../Styles/TabStyle';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';
import { call } from 'react-native-reanimated'
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import List from '../../Styles/List'
import CheckBox from '../../Styles/CheckBox'
import URL from '../../Components/URL'
 





const FacilityAcceptedRef = ({navigation,route}) => {
const{Tab,ID,selectedDate,Scribe,usercreated,AppointmentId,Redirect}=route.params;
//const[Accepted,setAccepted]=useState(route.params.Accepted);
    

    const [selectedTabs, setSelectedTabs] = useState(1);
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
    const progressViewOffset = useProgressViewOffset();
    const[UserCreated,setUserCreated]=useState(usercreated||false);
    
    const[redirect,setredirect]=useState(Redirect);
   
    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
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
      
        AcceptedReferalList(UserCreated);
        console.log(Tab)
    },[])

    const callback=React.useCallback(async(tab)=>{
        AcceptedReferalList(tab)
        console.log(`f=${Facility}`)
        console.log(`hh${HomeHealth}`)
        console.log(`clinic=${Clinic}`)
        })

        const Tab0Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
        const Tab1Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
        const Tab2Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
        const Tab3Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${firstday}`
        const Tab4Url=URL.FacAcceptedUrl+`Provider/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`

        

        const AcceptedReferalList = async(Usercreated)=>{
        if(Tab===0){
         
              try{

                const url=Tab0Url;
                console.log(url);
                let result=await fetch(url);
                result=await result.json();
                setRowcount(result?.Rowcount);
               setAccepted(result?.ListOfRefferals);
                console.log(result)
                console.log("tab0")
               } catch(e){
                  console.log(e);
                }

            
          
        }
      

        else if(Tab===1){

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
        else if(Tab===2){
     
      try{
        const url=Tab2Url;
        let result=await fetch(url);
        result=await result.json();
      
       setAccepted(result?.ListOfRefferals);
        console.log(result)
}catch(e){
  console.log(e);
}  

    }
     else if(Tab===3) {
     
        try{

          const url=Tab3Url;
          let result=await fetch(url);
          result=await result.json();
          setRowcount(result?.Rowcount);
         setAccepted(result?.ListOfRefferals);
          console.log(result)
         }catch(e){
          console.log(e);
         }}

else if(Tab===4){

  try{
    const url=Tab4Url;
    let result=await fetch(url);
    result=await result.json();
   
   setAccepted(result?.ListOfRefferals);
    console.log(result)
  }catch(e){
  console.log(e);
  }
  }
    }

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


      const sortedData=Accepted?.sort((a,b)=>{
        const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
        if(dataCompare!==0){
            return dataCompare;
        }
        return a.AppointmentTime.localeCompare(b.AppointmentTime);
    });

    const SlotView = ({ item }) => {
        return (
          <View style={{  backgroundColor:item.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}}>
            <View style={[styles.Itemcontainer,{flex:1,marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
               
                <TouchableOpacity onPress={()=>navigation.navigate('DetailView',{item,Scribe,ID,VisitTypeId:"1001",Usercreated:UserCreated})}>
                <View style={[styles.TopLabel,{width:responsiveWidth(60)}]}>
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
    createAppointment={()=>navigation.navigate('CreateAppointment',{ID:ID,Scribe})}
    TabName={'Accepted'}
    notification={()=>navigation.navigate('ProviderNotification',{ID:ID,Scribe})}
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

            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
            {Scribe==="Provider"&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 2 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>TCM</Text>
            </TouchableOpacity>
            )}
            {Scribe==="Provider"&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>OP</Text>
            </TouchableOpacity>
            )}

          { // <TouchableOpacity onPress={() => { setSelectedTabs(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
            //    <Text style={styles.TabText}>All</Text>
           // </TouchableOpacity>
          }
         </View>

         <Menu opened={isOpen}>
                <MenuTrigger>
                  {/* {Scribe==="Hospitalist"&&(
                    <TouchableOpacity onPress={()=>slideout()}>
                    <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={30} /></Text>
                    </TouchableOpacity>
                    )} */}

                    </MenuTrigger> 
                <MenuOptions optionsContainerStyle={CheckBox.MenuPopup}>
                  <MenuOption disableTouchable={true}
                  disabled={true}
                  >
                    
                  <TouchableOpacity onPress={() => {
                    if(UserCreated===true){
                      const Usercreated=false;
                   setUserCreated(false);
                   AcceptedReferalList(Usercreated);
                  setIsOpen(false)
                    }
                    else{
                      const Usercreated=true
                     setUserCreated(true);
                     AcceptedReferalList(Usercreated);
                     setIsOpen(false)

                    }
            }
                }>
                    <View style={{flexDirection:'row',paddingLeft:5,marginTop:5,alignItems:'center',marginBottom:5}}>
                   <View style={{width:15,height:15,borderColor:'#dcdcdc',borderWidth:1}}>
                    <Octicons style={{ color: UserCreated?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:12,marginLeft:10 }}>You Created</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                 
                 {/*  <TouchableOpacity style={{marginTop:verticalScale(8),alignSelf:'center',marginRight:10}} onPress={()=>{AcceptedReferalList()
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:scale(12)}}>OK</Text>
                   </TouchableOpacity>
              */}
                 
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
              
                refreshing={refreshing} 
                onRefresh={()=>onRefresh()} />
              }
                contentContainerStyle={{paddingBottom:responsiveHeight(2)}}
                data={sortedData}
                renderItem={SlotView}
                keyExtractor={item => item.AppointmentId}
            />

      {((!selecteddata)&&(Rowcount!==false))&&(
          <Animated.View  style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily:'SpaceGrotesk-Bold',fontSize:12}}>Rescheduled/Cancelled</Text>
          </Animated.View>
       )}
            </View>
    </View>
    </MenuProvider>
  )
}

export default FacilityAcceptedRef;

const styles = StyleSheet.create({
    PlusButton:{
        height:45,
        width:50,
        backgroundColor:'green',
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
      },
      TabContainer:{
        flexDirection:'row',
        borderWidth:0,
       justifyContent:'space-between',
       alignItems:'center' 
    },
    Popupcheckbox:{
        width:20,height:20,borderColor:'#dcdcdc',borderWidth:1
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
         fontSize:28,
         paddingLeft:16
    },
    HeaderInnerRight:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0,
        marginRight:16

    },

})