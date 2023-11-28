import { FlatList, Image, ScrollView, StyleSheet, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState ,useEffect,useCallback} from 'react'


import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import useProgressViewOffset from '../Components/ProgressViewOffset';
import Header from '../Components/Header'

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
import URL from '../Components/URL';







const ScribeFacilityPending = ({navigation,route}) => {

  const{Tab,ID,selectedDate,Scribe,AppointmentId,Redirect}=route.params;
   
      const progressViewOffset = useProgressViewOffset();
    const [selectedTab, setSelectedTab] = useState(1);
   
   
    const[Pending,setPending]=useState([]);
    const[Rowcount,setRowcount]=useState(false);
   
   
    const [refreshing, setRefreshing] = useState(false);
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
   

    useDimensionsChange(
      useCallback(({ window, screen }) => {
      
      
      }, [])  
    ); 
    useEffect(()=>{
      const focus=navigation.addListener('focus',()=>{
      PendingReferalList();
    });
    return focus
 
},[navigation])

    let tomorrow = new Date();
   tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');

    const ProviderCancel=async(data)=>{
      console.log(data.item.AppointmentId) 

      const data1={
          UserId: `${ID}`,
          AppointmentId: data.item.AppointmentId,
          Status: "Cancel"
      }
      
        const url=URL.FacilityvisitUpdateStatus
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

      const PendingReferalList = async()=>{
        if(Tab===0){
          const url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
          
        }
       
    

        else if(Tab===1){
           
         

        const url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`;
        let result=await fetch(url);
        result=await result.json();
      
       setPending(result?.ListOfRefferals);
        console.log(result)
       
       }

       else if(Tab===2){
           
            const url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`;
            let result=await fetch(url);
            result=await result.json();
        
           setPending(result?.ListOfRefferals);
            console.log(result)
           
        }
     
     else if(Tab===3){
        
        const url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${firstday}`;
        let result=await fetch(url);
        result=await result.json();
      setRowcount(result?.Rowcount)
       setPending(result?.ListOfRefferals);
        console.log(result)
       }

else if(Tab===4){

 const url=Scribe==="FacilityHomehealthScribe"?URL.FacPendingTabUrl+`FacilityScribe/${ID}?startdate=${selectedDate}&startdate=${selectedDate}`:URL.FacPendingTabUrl+`${Scribe}/${ID}?startdate=${selectedDate}&startdate=${selectedDate}`;
  let result=await fetch(url);
  result=await result.json();
  
 setPending(result?.ListOfRefferals);
  console.log(result)
  
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





    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
      };

    const renderHiddenItem = (data, rowMap) => (
        <Animated.View style={[styles.rowBack,{

        flex:1
        }]}>

         
          <TouchableOpacity onPress={()=>{ProviderCancel(data)
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn, styles.backRightBtnRight]}
          // onPress={() => closeRow(rowMap, data.item.AppointmentId)}
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Cancel</Text>
          </TouchableOpacity>
         
        
        </Animated.View>
      );


      
      

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
          onPress={()=>navigation.navigate('PendingDetailView',{item,Scribe,ID,VisitTypeId:"1001"})}
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
      <Text style={{color:'white',fontFamily:'SpaceGrotesk-Regular',fontSize:15}}>P</Text>
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
     onPress={()=>navigation.goBack()}
    createAppointment={()=>{
      if(Scribe==='FacilityScribe'||Scribe==='Scribe'){
        navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe})
      }
      else{
      navigation.navigate('ScribeCreateAppointment',{ID,Scribe})
    }}
    }
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
           // </TouchableOpacity>
          }
         </View>

        
             {//   <TouchableOpacity onPress={() => { setSelectedTab(4)
              
               // }}>
               //     <Entypo style={{  color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='list' size={scale(25)} />
                //</TouchableOpacity>
             }
           </View>
            
            <View style={{backgroundColor:'#eaeaea',borderRadius:0,marginTop:0,flex:1,}}>
             
            <SwipeListView
            bounces={false}
            
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
         // leftOpenValue={scale(75)}
          
          rightOpenValue={-75}
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
  )
}

export default ScribeFacilityPending;

const styles = StyleSheet.create({
    rowFront: {
        paddingLeft:16,
      
        backgroundColor: '#dcdcdc',
     
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
        backgroundColor: '#808080',
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