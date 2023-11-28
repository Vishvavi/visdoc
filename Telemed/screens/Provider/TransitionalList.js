import { FlatList, Image, ScrollView, StyleSheet,Dimensions, Text,Animated, TouchableOpacity,RefreshControl, View,LayoutAnimation } from 'react-native'
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


import useProgressViewOffset from '../Components/ProgressViewOffset';
import Header from '../Components/Header'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import List from '../Styles/List'
import TabStyle from '../Styles/TabStyle'
import URL from '../Components/URL';
 



  

const TransitionalList = ({navigation,route}) => {
const{Tab,ID,selectedDate,Scribe}=route.params;
//const[Accepted,setAccepted]=useState(route.params.Accepted);
  
      const progressViewOffset = useProgressViewOffset();
    const [selectedTabs, setSelectedTabs] = useState(2);
   
    
    const[isOpen,setIsOpen]=useState(false);
    const[refreshing, setRefreshing]=useState(false);
    const[TransitionalRowcount,setTransitionalRowcount]=useState(false);
    const[TransitionalList,setTransitionalList]=useState([]);
    const[Sliding,setSliding]=useState(new Animated.Value(0));
  
    
  const animatedValue= new Animated.Value(0) 
    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");

    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');

   const animation=React.useRef(null);
useEffect(()=>{
  Animated.timing(Sliding, {
    toValue: 1,
   
    useNativeDriver: true, // Add this line
  }).start();
})
   
    const onRefresh =() => {
  
        setRefreshing(true);
     TransitionalReferralList();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      };   
   
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
  
      const callbacktransition=React.useCallback(async()=>{
        TransitionalReferralList();
       
      })
    useEffect(()=>{
        TransitionalReferralList()
       
    },[])

   

    const TcmAcceptedTab0Url=URL.TcmAcceptedUrl+`startdate=${firstday}&enddate=${firstday}`
const TcmAcceptedTab1Url=URL.TcmAcceptedUrl+`startdate=${tomorrow}&enddate=${tomorrow}`
const TcmAcceptedTab2Url=URL.TcmAcceptedUrl+`startdate=${firstday}&enddate=${lastday}`
const TcmAcceptedTab3Url=URL.TcmAcceptedUrl+`startdate=${firstday}`
const TcmAcceptedTab4Url=URL.TcmAcceptedUrl


    const TransitionalReferralList=async()=>{
      if(Tab===0){
      const url=TcmAcceptedTab0Url;
      let result=await fetch(url);
      result=await result.json();
     
    if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
    callbacktransition();
    }
    else{
      setTransitionalList(result?.ListOfRefferals);
    }
      }
      else if(Tab===1){
        const url=TcmAcceptedTab1Url;
        let result=await fetch(url);
        result=await result.json();
       
      if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
      callbacktransition();
      }
      else{
        setTransitionalList(result?.ListOfRefferals);
      }
      }
      else if(Tab===2){
        const url=TcmAcceptedTab2Url;
        let result=await fetch(url);
        result=await result.json();
       
      if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
      callbacktransition();
      }
      else{
        setTransitionalList(result?.ListOfRefferals);
      }
    }
      else if(Tab===3){
        const url=TcmAcceptedTab3Url;
        let result=await fetch(url);
        result=await result.json();
       
      if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
      callbacktransition();
      }
      else{
        setTransitionalList(result?.ListOfRefferals);
      }
      
      }
    
      else if(Tab===4){
        const url=TcmAcceptedTab4Url+`startdate=${selectedDate}&enddate=${selectedDate}`;
        let result=await fetch(url);
        result=await result.json();
       
      if(result?.ListOfRefferals?.code==="EINVALIDSTATE"){
      callbacktransition();
      }
      else{
       setTransitionalList(result?.ListOfRefferals);
      }
    
      }
      }
    


     
    
  

    
    

    const SlotView = ({ item }) => {
        return (
            <View style={{flex:1,backgroundColor:'#dcdcdc'}}>
               
                <TouchableOpacity style={{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}}onPress={()=>navigation.navigate('TcmDetailView',{ID,Scribe,VisitTypeId:'1003',item})}>
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
                  <Text style={[List.Text,{width:responsiveWidth(30)}]}>Discharge Date</Text>
                     <Text style={[List.Text1,{width:responsiveWidth(60)}]}>Patient Name</Text>
                    </View>
                 
                    <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[List.Text2,{width:responsiveWidth(30)}]}>{item.DischargeDate}</Text>
                    <Text style={[List.Text3,{width:responsiveWidth(60)}]}>{item.PatientName}</Text>
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

           

            <TouchableOpacity  style={[TabStyle.Tab,{ backgroundColor: selectedTabs == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>

            {((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==='Provider')||(Scribe==='Hospitalist'))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
            )}
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Scribe==='Provider')||(Scribe==='Hospitalist'))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 2 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>TCM</Text>
            </TouchableOpacity>
            )}
{((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Scribe==='HomehealthScribe')||(Scribe==='Provider')||(Scribe==='Hospitalist'))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>OP</Text>
            </TouchableOpacity>
)}
         
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
        

             data={TransitionalList}
             renderItem={SlotView}
             keyExtractor={item => item.AppointmentId}
         />
      
           
            </View>
    </View>
    </MenuProvider>
  )
}

export default TransitionalList;

const styles = StyleSheet.create({
  
   

})