import { FlatList, Image, ScrollView, StyleSheet,SafeAreaView, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View, Alert } from 'react-native'
import React, { useState ,useEffect,useRef,useCallback} from 'react'

import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';

import Header from '../../Components/Header';

import { useNotes } from '../../NoteProvider'

import {
 
  MenuProvider,
} from 'react-native-popup-menu';
import useProgressViewOffset from '../../Components/ProgressViewOffset'
import List from '../../Styles/List'
import { responsiveWidth ,useDimensionsChange,responsiveHeight} from 'react-native-responsive-dimensions'
import TabStyle from '../../Styles/TabStyle'
import CheckBox from '../../Styles/CheckBox'
import { Root, Popup ,Toast} from '../../Components/popup-ui';
import URL from '../../Components/URL';






const PendingforFcreated = ({navigation,route}) => {
 

  const{Tab,ID,selectedDate,Scribe,AppointmentId,usercreated,Redirect,}=route.params;
   


    const [selectedTab, setSelectedTab] = useState(0);
    
    
    const[Pending,setPending]=useState([]);
    const[isOpen,setIsOpen]=useState(false);
   
    const [refreshing, setRefreshing] = useState(false);
   const[UserCreated,setUserCreated]=useState(usercreated||false);
   const[redirect,setredirect]=useState(Redirect);
   const[Detailflow,setDetailflow]=useState([]);
   const{count,setcount,NotificationLog,TimerList,TimerReferralList,ListRowcount}=useNotes()
   const[Rowcount,setRowcount]=useState(false);
    
    const progressViewOffset = useProgressViewOffset();
   

    useDimensionsChange(
      useCallback(({ window, screen }) => {
      
     
      }, [])  
    ); 

    

    
    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
   
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
  
    useEffect(()=>{
     
    const focus=navigation.addListener('focus',()=>{

        
        console.log(Tab)
        console.log(Scribe)
        console.log(ID)
        console.log('usecreates:',UserCreated)
        console.log('noti',usercreated)
        console.log('Redirect',Redirect)
       
      console.log(Tab3Url)
   //  const UserCreated=usercreated
    //setUserCreated(true)
     
        PendingReferalList(UserCreated);
      });
     return focus
   
    
     
      
    },[navigation,route.params,UserCreated])

    setTimeout(()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   setredirect(false)
   },10000
   )
 

const selecteddata=redirect===true?Pending.find((item)=>item.AppointmentId===AppointmentId):Pending

    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');


   
    
     useEffect(()=>{

      console.log('currenttime',CurrentTime)
      console.log('currenttime',(new Date().getMinutes()))

     },[])
     
const CurrentTime=`${moment(new Date()).format('HH:mm:ss')}`

 
      
    

      const Tab0Url=URL.createdFPendingUrl+`${ID}?startdate=${firstday}&enddate=${firstday}`
      const Tab1Url=URL.createdFPendingUrl+`${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
      const Tab2Url=URL.createdFPendingUrl+`${ID}?startdate=${firstday}&enddate=${lastday}`
      const Tab3Url=URL.createdFPendingUrl+`${ID}?startdate=${firstday}`
      const Tab4Url=URL.createdFPendingUrl+`${ID}?startdate=${selectedDate}&enddate=${selectedDate}`


    
    
  const PendingReferalList = async(UserCreated)=>{
   
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
   setRowcount(result?.Rowcount)
   
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
const scrollRef = useRef();

function scrollToTop() {
  scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true
  })
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

const onRefresh1=()=>{
  setUserCreated(usercreated)
  PendingReferalList(UserCreated)
  console.log(usercreated)
  console.log(UserCreated)
}

const xOffset = new Animated.Value(0);

const ProviderCancel=async(data)=>{
  

  const data1={
      UserId: `${ID}`,
      AppointmentId:data.item.AppointmentId,
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

   if(json.Result==="Cancelled Successfully"){
   PendingReferalList(UserCreated)
    }
  
  }).catch(e=>{
    console.log("e",e)
  })}



  const sortedData=Pending?.sort((a,b)=>{
    const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
    if(dataCompare!==0){
        return dataCompare;
    }
    return a.AppointmentTime.localeCompare(b.AppointmentTime);
});



    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
      };

    const renderHiddenItem = (data, rowMap) => (
        <Animated.View style={[styles.rowBack,{
                          flex:1
        }]}>

         
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => {
              ProviderCancel(data)
             closeRow(rowMap, data.item.AppointmentId)}}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Cancel</Text>
          </TouchableOpacity>
         
        
        
        </Animated.View>
      );


   
      const slideout=()=>{
  
      //  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
         
        }

       
    
    const SlotView = ({item} ) => {

        return (

        
      
            <TouchableHighlight
            onPress={() => navigation.navigate('PendingDetailView',{ID,Scribe,item,VisitTypeId:"1001",Usercreated:true
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
        
        <View style={[TabStyle.TabContainer,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>
            
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
          
         { //  <TouchableOpacity onPress={() => { setSelectedTab(3); }} style={[styles.Tab,{ marginLeft:moderateScale(16),backgroundColor: selectedTab == 3 ? '#eaeaea' : '#e6c402'}] }>
           //     <Text style={styles.TabText}>All</Text>
           // </TouchableOpacity>
         }
         </View>

       
             {//   <TouchableOpacity onPress={() => { setSelectedTab(4)
              
               // }}>
               //     <Entypo style={{  color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='list' size={scale(25)} />
                //</TouchableOpacity>
             }
           </View>
            
            <SafeAreaView style={{backgroundColor:'#eaeaea',borderRadius:0,marginTop:0,flex:1,}}>
       
      
            <SwipeListView
            ref={scrollToTop}
           
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
          
          rightOpenValue={0}
          previewRowKey={'0'}
          previewOpenValue={-40}
         previewOpenDelay={3000}
        

          //onSwipeValueChange={}
          onRowDidOpen={onRowDidOpen}
        />
         {((!selecteddata)&&(Rowcount!==false))&&(
          <Animated.View   style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily: 'SpaceGrotesk-Bold',fontSize:12}}>Already Accepted/Cancelled</Text>
          </Animated.View>
       )}
          {//  <FlatList
            //  contentContainerStyle={{paddingBottom:verticalScale(160)}}
              //  data={Pending}
               // renderItem={SlotView}
               // keyExtractor={item => item.AppointmentId}
            ///>
        }
            </SafeAreaView>
    </View>
    </MenuProvider>
    </Root>
  )
}

export default PendingforFcreated;

const styles = StyleSheet.create({
   
   
    Itemcontainer:{
      
        marginRight:16,
        
    },
   
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
    Contentview:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'center'
    },
  

})