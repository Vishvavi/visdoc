import { FlatList, Image, ScrollView, StyleSheet, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState ,useEffect,useCallback} from 'react'

import Octicons from 'react-native-vector-icons/Octicons'



import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import useProgressViewOffset from '../Components/ProgressViewOffset'
import Header from '../Components/Header';
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import List from '../Styles/List';
import CheckBox from '../Styles/CheckBox';
import TabStyle from '../Styles/TabStyle';
import URL from '../Components/URL';






const ScribeFacilityProposed = ({navigation,route}) => {

  const{Tab,ID,selectedDate,Scribe,AppointmentId,Redirect}=route.params;
  const [refreshing, setRefreshing] = useState(false);
   

    const [selectedTab, setSelectedTab] = useState(1);
    
    const[isOpen,setIsOpen]=useState(false);
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Proposed,setProposed]=useState([]);
    const progressViewOffset = useProgressViewOffset();
    const[redirect,setredirect]=useState(Redirect);
    const[Rowcount,setRowcount]=useState(false);
    
   
   

    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");

    setTimeout(()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     setredirect(false)
      },10000
      )

    const selecteddata=redirect===true?Proposed.find((item)=>item.AppointmentId===AppointmentId):Proposed
   
    let tomorrow = new Date();
   tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');

   useDimensionsChange(
    useCallback(({ window, screen }) => {
    
    
    }, [])  
  ); 
   
    const ProviderDecline=async(data)=>{
        console.log(data.item.AppointmentId) 
  
        const data1={
            UserId: `${ID}`,
            ProposedAppointmentId: data.item.ProposedAppointmentId,
            Status: "Decline"
        }
        
          const url=URL.FacilityvisitProposedUpdateStatus;
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
            
              const url=URL.FacilityvisitProposedUpdateStatus;
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
   

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };

      useEffect(()=>{
        ProposedReferalList()
       },[])
      
       const ProposedReferalList = async(tab)=>{
        
         if(Tab===0){
          
   try{
             const url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`;
             let result=await fetch(url);
             result=await result.json();
            
            setProposed(result?.ListOfRefferals);
             console.log(result)
   }catch(e){
    console.log(e);
   }    
         }
        
         else if(Tab===1){
         try{
   
         const url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`;
         let result=await fetch(url);
         result=await result.json();
       
        setProposed(result?.ListOfRefferals);
         console.log(result)
         }catch(e){
          console.log(e);
         }
        
     }
    
         else if(Tab===2){
            
     try{
             const url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`;
             let result=await fetch(url);
             result=await result.json();
         
            setProposed(result?.ListOfRefferals);
             console.log(result)
            
     }catch(e){
      console.log(e);
     }  
         }
        
      else if(Tab===3){
        
   try{
         const url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${firstday}`;
         let result=await fetch(url);
         result=await result.json();
       setRowcount(result?.Rowcount);
        setProposed(result?.ListOfRefferals);
         console.log(result)
       
   }catch(e){
    console.log(e);   }
         
      
   }
   else if(Tab===4){
try{
    const url=Scribe==="FacilityHomehealthScribe"?URL.FacProposedTabUrl+`FacilityScribe/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`:URL.FacProposedTabUrl+`${Scribe}/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`;
    let result=await fetch(url);
    result=await result.json();
  
   setProposed(result?.ListOfRefferals);
    console.log(result)
}catch(e){
  console.log(e);
}
}

   }
   
 




    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
      };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => {
             
              ProviderDecline(data)
              closeRow(rowMap, data.item.AppointmentId)}}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'paceGrotesk-Regular'}}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            ProviderAccept(data)
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn, styles.backRightBtnRight,{backgroundColor:'green'}]}
          // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'paceGrotesk-Regular'}}>Accept</Text>
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

    
      const sortedData=Proposed?.sort((a,b)=>{
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
          <TouchableHighlight
          onPress={() => navigation.navigate('ProposedDetailView',{ID,Scribe,item,VisitTypeId:"1001"})}
          style={[styles.rowFront,{backgroundColor:item.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}]}
          underlayColor={'#AAA'}
             >

          <View style={{flex:1,marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}}>
              
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
                  <Text style={[List.Text,{width:responsiveWidth(30),borderWidth:0}]}>{moment(item.AppointmentTime,"HH:mm:ss").format('hh:mm A')}</Text>
                   <Text style={[List.Text1,{width:responsiveWidth(60)}]}>{item.SpecialtyType}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginTop:5}}>
                  <Text style={[List.Text2,{width:responsiveWidth(30),borderWidth:0}]}>{item.AppointmentDate}</Text>
                  <Text style={[List.Text3,{width:responsiveWidth(60),borderWidth:0}]}>{item.PatientName}</Text>
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
     onPress={()=>navigation.goBack()}
    createAppointment={()=>{ if(Scribe==='FacilityScribe'||Scribe==='Scribe'){
      navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe})
    }
    else{
    navigation.navigate('ScribeCreateAppointment',{ID,Scribe})
  }}}
    TabName={'Proposed'}
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

            <TouchableOpacity 
            disabled={true}
            style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe'))&&(
            <TouchableOpacity 
            disabled={true}
            style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
            )}
           

          {//  <TouchableOpacity onPress={() => { setSelectedTab(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTab == 3 ? '#eaeaea' : '#e6c402'}] }>
           //     <Text style={styles.TabText}>All</Text>
          //  </TouchableOpacity>
}
         </View>
          

         <Menu opened={isOpen}>
                <MenuTrigger>
                    {
                   // <TouchableOpacity onPress={()=>slideout()}>
                   // <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={scale(25)} /></Text>
                   // </TouchableOpacity>
                    }
                    </MenuTrigger> 
                <MenuOptions optionsContainerStyle={{marginTop:-90,marginLeft:-40,width:120,height:140,}}>
                  <MenuOption 
                  disableTouchable={true}
                  disabled={true}

                  >
                    
                  <TouchableOpacity onPress={() =>{ setAllLocation(!AllLocation) 
                   setHomeHealth(!HomeHealth)
                   setFacility(!Facility)
                   setClinic(!Clinic)
                  }}>
                    <View style={{flexDirection:'row',paddingLeft:5,marginTop:5,alignItems:'center'}}>
                   <View style={{width:15,height:15,borderColor:'#dcdcdc',borderWidth:1}}>
                    <Octicons style={{ color: AllLocation?'green':'white', alignSelf: 'center', }} name='check' size={17} /></View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:12,marginLeft:10 }}>All Location</Text>
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
                    <View style={{flexDirection:'row',paddingLeft:5,alignItems:'center'}}>
                    <View style={{width:15,height:15,borderColor:'#dcdcdc',borderWidth:1}}>
                    <Octicons style={{ color: Clinic?'green':'white', alignSelf: 'center',}} name='check' size={17} /></View>
                    <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:12,marginLeft:10 }}>Clinic</Text>
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
                  <View style={{flexDirection:'row',paddingLeft:5,alignItems:'center'}}>
                  <View style={{width:15,height:15,borderColor:'#dcdcdc',borderWidth:1}}>
                    <Octicons style={{ color: Facility?'green':'white', alignSelf: 'center', }} name='check' size={17} /></View>
                    <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:12,marginLeft:10 }}>Facility</Text>
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
                  <View style={{flexDirection:'row',paddingLeft:5,alignItems:'center'}}>
                  <View style={{width:15,height:15,borderColor:'#dcdcdc',borderWidth:1}}>
                    <Octicons style={{ color: HomeHealth ?'green':'white', alignSelf: 'center', }} name='check' size={17} /></View>
                    <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:12,marginLeft:10 }}>Home Health</Text>
                   </View>
                   </TouchableOpacity>
                   </MenuOption>
                   <TouchableOpacity style={{marginTop:8,alignSelf:'center',}} onPress={()=>{ProposedReferalList()
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:12}}>OK</Text>
                   </TouchableOpacity>
                  
                </MenuOptions>
              </Menu>
            </View>
            
            <View style={{backgroundColor:'#eaeaea',flex:1}}>
             
           <SwipeListView
           keyExtractor={(item,index)=>item.AppointmentId.toString()}
            showsVerticalScrollIndicator={false}
          data={sortedData}
          renderItem={SlotView}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
           previewOpenDelay={3000}
         refreshControl={
            <RefreshControl 
          
            progressViewOffset={progressViewOffset}
           
            refreshing={refreshing} onRefresh={()=>onRefresh()} />
          }
         

         
          onRowDidOpen={onRowDidOpen}
        />
              {((!selecteddata)&&(Rowcount!=false))&&(
          <Animated.View  style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily:'SpaceGrotesk-Bold',fontSize:12}}>Accepted/Declined</Text>
          </Animated.View>
       )}
          
         { //  <FlatList
           // contentContainerStyle={{paddingBottom:verticalScale(160)}}
           // data={Proposed}
           // renderItem={SlotView}
           // keyExtractor={(item,index) => index}
          ///>
}
            </View>
    </View>
    </MenuProvider>
  )
}

export default ScribeFacilityProposed;

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
        borderRadius: 0
      },
      backRightBtnRight: {
        backgroundColor: '#808080',
        right: 0,
        borderRadius:0
      },
    Contentview:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'center'
    },
  
})