import { FlatList, Image, ScrollView, StyleSheet, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState ,useEffect} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import useProgressViewOffset from '../../Components/ProgressViewOffset';
import Header from '../../Components/Header'


import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import { responsiveWidth } from 'react-native-responsive-dimensions'
import TabStyle from '../../Styles/TabStyle'
import CheckBox from '../../Styles/CheckBox'
import List from '../../Styles/List'
import URL from '../../Components/URL'






const FacilityDeclinedRef = ({navigation,route}) => {

  const{Tab,ID,selectedDate,Scribe}=route.params;
    const ToSignup = () => {
        navigation.navigate('Signup')
      }

    const [selectedTab, setSelectedTab] = useState(1);
    const [showInfo, SetShowInfo] = useState(false);
    const [showContact, SetShowContact] = useState(false);
    const [showSpecial, setShowSpecial] = useState(false);
    const [showAvail, setShowAvail] = useState(false);
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
    const[UserCreated,setUserCreated]=useState(false);
    
   
    

    

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

   
    const Tab0Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
    const Tab1Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
    const Tab2Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
    const Tab3Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${firstday}`
    const Tab4Url=URL.FacDeclinedTabUrl+`Provider/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`

   

      const DeclinedReferalList = async()=>{
        if(Tab===0){
         try{
               const url=Tab0Url;
                console.log(url);
                let result=await fetch(url);
                result=await result.json();
                setDeclined(result?.ListOfRefferals);
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
            setDeclined(result?.ListOfRefferals);
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
      
        setDeclined(result?.ListOfRefferals);
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
          setDeclined(result?.ListOfRefferals);
          console.log(result)
         }catch(e){
          console.log(e);
         }}

    else if(Tab===4){
  
  try{
    const url=Tab4Url;
    let result=await fetch(url);
    result=await result.json();
   
   setDeclined(result?.ListOfRefferals);
    console.log(result)
}catch(e){
  console.log(e);
}} }
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





 


      
      const slideout=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setIsOpen(!isOpen);
         
        }
     
    const SlotView = ({ item }) => {
        return (
            <TouchableHighlight
            onPress={() =>navigation.navigate('DeclinedDetailView',{ID,Scribe,VisitTypeId:'1001',item,Usercreated:UserCreated})}
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
                     <Text style={[List.Text1,{width:responsiveWidth(60)}]}>{item.SpecialtyType}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[List.Text2,{width:responsiveWidth(30)}]}>{item.AppointmentDate}</Text>
                    <Text style={[List.Text3,{width:responsiveWidth(60)}]}>{item.PatientName}</Text>
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
     onPress={()=>navigation.goBack({selectedTab:Tab})}
    createAppointment={()=>navigation.navigate('CreateAppointment',{ID:ID,Scribe})}
    TabName={'Declined'}
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

            <TouchableOpacity style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
         
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
                   DeclinedReferalList(Usercreated);
                   setIsOpen(false);
                    }
                    else{
                      const Usercreated=true;
                    setUserCreated(true)
                    DeclinedReferalList(Usercreated)
                    setIsOpen(false)
                    }
            }
                }>
                    <View style={[CheckBox.boxcontainer]}>
                   <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: UserCreated?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
                   <Text style={CheckBox.Text}>You Created</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                  </MenuOptions>
              </Menu>
       

             {//   <TouchableOpacity onPress={() => { setSelectedTab(4)
              
               // }}>
               //     <Entypo style={{  color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='list' size={scale(25)} />
                //</TouchableOpacity>
             }
           </View>
            
            <View style={{backgroundColor:'#eaeaea',borderRadius:0,marginTop:0,flex:1,}}>
           
           <FlatList
             contentContainerStyle={{paddingBottom:160}}
              data={Declined}
                renderItem={SlotView}
                keyExtractor={item => item.AppointmentId}
                refreshControl={
                
                    <RefreshControl
                 progressViewOffset={progressViewOffset}
                   
                    refreshing={refreshing} onRefresh={()=>onRefresh()} />
                  }
            />
        
            </View>
    </View>
    </MenuProvider>
  )
}

export default FacilityDeclinedRef;

const styles = StyleSheet.create({
   
     
   
    Text:{
        color: '#333333',
         fontFamily: 'SpaceGrotesk-SemiBold',
         fontSize: 12,
          marginTop: 0,
          // marginLeft: scale(20)
    },
    Text1:{
    color: '#333333',
   

    fontFamily: 'SpaceGrotesk-SemiBold',
     fontSize: scale(12),
      marginTop: 0,
       marginLeft: 0,
      // position:'absolute' 
    },
    Itemcontainer:{
        marginLeft:scale(0),
        marginRight:scale(16),
        
    },
    TopLabel:{
        width: scale(250),
        padding:scale(4),
        borderWidth:0,
        backgroundColor:'white',
         textAlign: 'center',
          marginLeft: scale(40),
           borderRadius: scale(5)
    },
    CheckBox:{
        width:scale(25),
        height:scale(25),
        borderColor:'#808080',
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:scale(5),
        marginTop: 0

    },
    rowFront: {
      
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
        width: scale(75),
        
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
        width:scale(75)
      },
    Contentview:{
        flexDirection:'row',
        marginTop:verticalScale(20),
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
        height:verticalScale(50),
        borderWidth:0,
        alignItems:'center',
        
        paddingHorizontal:moderateScale(16)

    },
    HeaderText:{
        color: '#eaeaea',
         fontFamily: 'SpaceGrotesk-Regular', 
         fontSize:scale(22),
         paddingLeft:moderateScale(16)
    },
    HeaderInnerRight:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:0,
        marginRight:moderateScale(16)

    },

})