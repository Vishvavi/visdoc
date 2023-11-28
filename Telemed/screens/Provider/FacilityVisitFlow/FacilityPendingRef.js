import { FlatList, Image, ScrollView, StyleSheet, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState ,useEffect,useCallback,useRef} from 'react'
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
import Header from '../../Components/Header';
import TabStyle from '../../Styles/TabStyle';


import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import CheckBox from '../../Styles/CheckBox'
import List from '../../Styles/List'
import { Root, Popup ,Toast} from '../../Components/popup-ui';
import URL from '../../Components/URL'






const FacilityPendingRef = ({navigation,route}) => {

  const{Tab,ID,selectedDate,Scribe,usercreated,AppointmentId,Redirect}=route.params;
    const ToSignup = () => {
        navigation.navigate('Signup')
      }
      const dataref=useRef(usercreated);

    const [selectedTab, setSelectedTab] = useState(1);
    
    const[Accepted,setAccepted]=useState([]);
    const[Pending,setPending]=useState([]);
    const[isOpen,setIsOpen]=useState(false);
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Visible,setVisible]=useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const progressViewOffset = useProgressViewOffset();
    const[UserCreated,setUserCreated]=useState(usercreated||false);
    const[redirect,setredirect]=useState(Redirect);
    const[Rowcount,setRowcount]=useState(false);
    
   
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
   
    useDimensionsChange(
      useCallback(({ window, screen }) => {
        
       // setchangeWidth(window.width)
       // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }, [])  
    );
    console.log('usercreated',UserCreated)
        console.log('noti',usercreated)
        console.log('redirect',Redirect)
        console.log('Tab',Tab)
        dataref.current=usercreated
        console.log('dataref',dataref)
      

    useEffect(()=>{
   
      const focus=navigation.addListener('focus',()=>{
       
      
        //const Usercreated= usercreated
        PendingReferalList(UserCreated);
      
      });
      return focus
   
},[navigation,UserCreated,usercreated])

    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');
    const CurrentTime=`${moment(new Date()).format('HH:mm:ss')}`

    const Alert=()=>{
  
     
        Popup.show({
          type: 'Warning',
          title: 'Expired',
          button: true,
          button2:false,
          textBody: 'Time Expired',
          buttonText: 'Ok',
          callback: () => {Popup.hide()
        
          },
            
          callback2:()=>{
            Popup.hide()
            console.log('hide')}
        })
        }






    const ProviderAccept=async(data)=>{
      console.log(data.item.AppointmentId) 
      const data1={
        UserId: `${ID}`,
        AppointmentId: data.item.AppointmentId,
        Status: "Accept"
    };
     
      const newdate=moment(new Date()).format('YYYY-MM-DD')
    if((data.item.AppointmentTime<CurrentTime)&&(data.item.AppointmentDate===newdate)){
      console.log('expired')
      Alert()
   
}
else{

     
      
        const url=URL.FacilityvisitUpdateStatus;
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
      })}}

      const ProviderDecline=async(data)=>{
        console.log(data.item.AppointmentId) 
  
        const data1={
            UserId: `${ID}`,
            AppointmentId: data.item.AppointmentId,
            Status: "Decline"
        }
        
          const url=URL.FacilityvisitUpdateStatus;
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

      const Tab0Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
      const Tab1Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
      const Tab2Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`
      const Tab3Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${firstday}`
      const Tab4Url=URL.FacPendingTabUrl+`Provider/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`

     
      const PendingReferalList = async(Usercreated)=>{
        if(Tab===0){
             try{

                const url=Tab0Url;
                console.log(url);
                let result=await fetch(url);
                result=await result.json();
                setPending(result?.ListOfRefferals);
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
            setPending(result?.ListOfRefferals);
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
      
        setPending(result?.ListOfRefferals);
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
          setPending(result?.ListOfRefferals);
          setRowcount(result?.Rowcount);
          console.log(result)
         }catch(e){
          console.log(e);
         }
        
      
     
}

else if(Tab===4){

  try{
    const url=Tab4Url;
    let result=await fetch(url);
    result=await result.json();
   
   setPending(result?.ListOfRefferals);
    console.log(result)
}catch(e){
  console.log(e);
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


      const sortedData=Pending?.sort((a,b)=>{
        const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
        if(dataCompare!==0){
            return dataCompare;
        }
        return a.AppointmentTime.localeCompare(b.AppointmentTime);
    });

    const renderHiddenItem = (data, rowMap) => (
    
        <Animated.View style={[styles.rowBack,{
              flex:1
        }]}>

          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => {
              ProviderDecline(data)
              closeRow(rowMap, data.item.AppointmentId)}}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Decline</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{ProviderAccept(data)
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn, styles.backRightBtnRight]}
          // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Accept</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{
            navigation.navigate("ProposeTime",{ID,Scribe,AppointmentId:data.item.AppointmentId,VisitTypeId:"1001",item:data.item})
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn,styles.backRightBtnRight, {right:75,width:75,borderRightWidth:1,borderRightColor:'white',backgroundColor:"#808080"}]}
          // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Propose</Text>
          </TouchableOpacity>

        </Animated.View>
       
      );


      function tConvert (time) {
        var ts = time;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
      }
      const slideout=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setIsOpen(!isOpen);
         
        }
     
    const SlotView = ({ item }) => {
        return (
           
          <TouchableHighlight
            onPress={()=>navigation.navigate('PendingDetailView',{item,Scribe,ID,VisitTypeId:"1001",Usercreated:UserCreated})}
            style={{
              backgroundColor:item?.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}}
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
        <Text style={{color:'white',fontFamily:'SpaceGrotesk-Regular',fontSize:12}}>P</Text>
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
    <Root>
    <MenuProvider>
    <View style={{flex:1,backgroundColor:'#11266c'}}>
    <Header
     onPress={()=>navigation.goBack({selectedTab:Tab})}
    createAppointment={()=>navigation.navigate('CreateAppointment',{ID:ID,Scribe})}
    TabName={'Pending'}
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

            <TouchableOpacity 
            disabled={true}
            style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            disabled={true}
            style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
           
          {//  <TouchableOpacity onPress={() => { setSelectedTab(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTab == 3 ? '#eaeaea' : '#e6c402'}] }>
           //     <Text style={styles.TabText}>All</Text>
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
                   PendingReferalList(Usercreated);
                   setIsOpen(false);
                    }
                    else{
                      const Usercreated=true;
                    setUserCreated(true)
                    PendingReferalList(Usercreated)
                    setIsOpen(false)
                    }
            }
                }>
                    <View style={CheckBox.boxcontainer}>
                   <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: UserCreated?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
                   <Text style={CheckBox.Text}>You Created</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                 
                 {/*  <TouchableOpacity style={{marginTop:verticalScale(8),alignSelf:'center',marginRight:10}} onPress={()=>{PendingReferalList()
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:scale(12)}}>OK</Text>
                   </TouchableOpacity>
              */
                  }
                 
                </MenuOptions>
              </Menu>

             {//   <TouchableOpacity onPress={() => { setSelectedTab(4)
              
               // }}>
               //     <Entypo style={{  color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='list' size={scale(25)} />
                //</TouchableOpacity>
             }
           </View>
            
            <View style={{backgroundColor:'#eaeaea',flex:1}}>
          
            <SwipeListView
           // bounces={false}
            
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
          
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
         previewOpenDelay={3000}
        

          //onSwipeValueChange={}
          onRowDidOpen={onRowDidOpen}
        />
               {((!selecteddata)&&(Rowcount!==false))&&(
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
    </Root>
  )
}

export default FacilityPendingRef;

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
        borderRadius: 0,
       
      },
      backRightBtnRight: {
        backgroundColor: 'green',
        right: 0,
        borderRadius:0,
        width:75
      },
    
 

})