import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity,RefreshControl, View,LayoutAnimation } from 'react-native'
import React, { useState ,useEffect, useCallback} from 'react'

import Octicons from 'react-native-vector-icons/Octicons'



import moment from 'moment';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';

import useProgressViewOffset from '../../Components/ProgressViewOffset'
import Header from '../../Components/Header'
import List from '../../Styles/List'
import TabStyle from '../../Styles/TabStyle'
import CheckBox from '../../Styles/CheckBox'
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import URL from '../../Components/URL';
 





const OutpatientReferralList = ({navigation,route}) => {
const{Tab,ID,selectedDate,Scribe}=route.params;
//const[Accepted,setAccepted]=useState(route.params.Accepted);
  
    const [selectedTabs, setSelectedTabs] = useState(3);
   
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Accepted,setAccepted]=useState([]);
    const[Rowcount,setRowcount]=useState(false);
    const[LocationType,setLocationType]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const[TransitionalRowcount,setTransitionalRowcount]=useState(false);
    const[TransitionalList,setTransitionalList]=useState([]);
    const[OPList,setOPList]=useState([]);
    const progressViewOffset = useProgressViewOffset();
   
    var curr = new Date; // get current date
    var first = curr.getDate(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
   
    const onRefresh =() => {
  
        setRefreshing(true);
   OPReferralList();
        setTimeout(() => {
          setRefreshing(false);
        }, 5000);
      };   
   
 //    const changeHandler = e => {
   //     setAllValues( prevValues => {
    //    return { ...prevValues,[e.target.name]: e.target.value}
    // })
    // }

    useDimensionsChange(
      useCallback(({ window, screen }) => {
        console.log(window);
        console.log(screen);
       // setchangeWidth(window.width)
       // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }, [])  
    );

     const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };
  
  
    useEffect(()=>{
     OPReferralList();
       
    },[])

    const callbackOP=React.useCallback(async()=>{
        OPReferralList();
      })

    const OPReferralList=async()=>{
        const url=URL.ProviderOPList+`${ID}`;
        let result=await fetch(url);
        result=await result.json();
     
        console.log(result)
      if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
      callbackOP();
      }
      else{
      
      setOPList(result?.ListOfRefferals);
     //  setOPRowcount(result?.Rowcount);
      }
      
      }
        
     


    
    
  

    const slideout=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsOpen(!isOpen);
        }

   

    const SlotView = ({ item }) => {
        return (
            <View style={{flex:1,marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}}>
               
                <TouchableOpacity onPress={()=>navigation.navigate('OpDetailView',{ID,Scribe,VisitTypeId:'1002',item})}>
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
                    <Text style={[List.Text,{width:responsiveWidth(30)}]}>Specialty Type</Text>
                     <Text style={[List.Text1,{width:responsiveWidth(60)}]}>Patient Name</Text>
                    </View>
                 
                    <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[List.Text2,{width:responsiveWidth(30)}]}>{item?.SpecialtyType}</Text>
                    <Text style={[List.Text3,{width:responsiveWidth(60)}]}>{item?.PatientName}</Text>
                    </View>
                    </View>
                    </View>
                </TouchableOpacity>
                <View style={{borderBottomWidth:1,borderBottomColor:'#808080',marginTop:20}}/>
            </View>
        )
    }

  return (
    <MenuProvider>
    
    <View style={{flex:1,backgroundColor:'#11266c'}}>
    <Header
     onPress={()=>navigation.goBack({selectedTab:Tab})}
    createAppointment={()=>navigation.navigate('CreateAppointment',{ID:ID,Scribe})}
    TabName={'Accepted'}
    Scribe={Scribe}
    ID={ID}
    notification={()=>navigation.navigate('ProviderNotification',{ID:ID,Scribe})}
   />
               
               <Text style={{ color: '#eaeaea',
              marginLeft:responsiveWidth(5),
                 fontSize: 17,
                 marginTop:20,
                  fontFamily: 'SpaceGrotesk-Regular' }}>Appointments</Text>
          <View style={[TabStyle.TabContainer,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity  style={[TabStyle.Tab,{ backgroundColor: selectedTabs == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
               <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[TabStyle.Tab,{marginHorizontal:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[TabStyle.Tab,{ backgroundColor: selectedTabs == 2 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>TCM</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[TabStyle.Tab,{ marginLeft:16,backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>OP</Text>
            </TouchableOpacity>
         </View>
         
       

         <Menu opened={isOpen}>
                <MenuTrigger>
                  
                { //   <TouchableOpacity >
                  //  <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={25} /></Text>
                  //  </TouchableOpacity>
                }
                  </MenuTrigger> 

                <MenuOptions optionsContainerStyle={CheckBox.MenuPopup}>
                  <MenuOption disableTouchable={true}
                  disabled={true}
                  >
                    
                  <TouchableOpacity onPress={() => {
                  //  setAllLocation(!AllLocation)
                   // setHomeHealth(!HomeHealth)
                   // setFacility(!Facility)
                    //setClinic(!Clinic)
            }
                }>
                    <View style={[CheckBox.boxcontainer,{marginTop:10}]}>
                   <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: AllLocation?'green':'white', alignSelf: 'center', }} name='check' size={17} /></View>
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
                    <Octicons style={{ color: Clinic?'green':'white', alignSelf: 'center',}} name='check' size={17} /></View>
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
                    <Octicons style={{ color: Facility?'green':'white', alignSelf: 'center', }} name='check' size={17} /></View>
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
                    <Octicons style={{ color: HomeHealth ?'green':'white', alignSelf: 'center', }} name='check' size={17} /></View>
                    <Text style={CheckBox.Text}>Home Health</Text>
                   </View>
                   </TouchableOpacity>
                   </MenuOption>
                   <TouchableOpacity style={{marginTop:8,alignSelf:'center',marginRight:10}} onPress={()=>{AcceptedReferalList()
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:15}}>OK</Text>
                   </TouchableOpacity>
                 
                </MenuOptions>
              </Menu>

          
           </View>
             
            
            <View style={{backgroundColor:'#eaeaea',borderRadius:8,marginTop:0,flex:1}}>
            <FlatList
             refreshControl={
                <RefreshControl 
             
                progressViewOffset={progressViewOffset}
             
                
                refreshing={refreshing} onRefresh={()=>onRefresh()} />
              }
              contentContainerStyle={{paddingBottom:160}}
              showsVerticalScrollIndicator={false}
                data={OPList}
                renderItem={SlotView}
                keyExtractor={item => item.AppointmentId}
            />
            </View>
    </View>
    </MenuProvider>
  )
}

export default OutpatientReferralList;

const styles = StyleSheet.create({
   
  

})