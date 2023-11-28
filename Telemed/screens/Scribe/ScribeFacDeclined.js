import { FlatList, Image, ScrollView, StyleSheet, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View } from 'react-native'
import React, { useState ,useEffect} from 'react'



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
import List from '../Styles/List';
import { responsiveWidth } from 'react-native-responsive-dimensions'
import TabStyle from '../Styles/TabStyle'
import CheckBox from '../Styles/CheckBox'
import URL from '../Components/URL';







const ScribeFacDeclined = ({navigation,route}) => {

  const{Tab,ID,selectedDate,Scribe}=route.params;
   

    const [selectedTab, setSelectedTab] = useState(1);
    
   
    const[Declined,setDeclined]=useState([]);
    const[isOpen,setIsOpen]=useState(false);
   
    const [refreshing, setRefreshing] = useState(false);
    const progressViewOffset = useProgressViewOffset();
    
   
   
    

    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");
   
    useEffect(()=>{
       DeclinedReferalList();
    },[])

    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');

   
      

      const DeclinedReferalList = async()=>{
        if(Tab===0){
        

            const url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${firstday}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${firstday}`;
            let result=await fetch(url);
            result=await result.json();
           
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           
        }
       
    

        else if(Tab===1){
       
        const url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`;
        let result=await fetch(url);
        result=await result.json();
      
       setDeclined(result?.ListOfRefferals);
        console.log(result)
       
        }
        else if(Tab===2){
           
    
            const url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}&enddate=${lastday}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}&enddate=${lastday}`;
            let result=await fetch(url);
            result=await result.json();
        
           setDeclined(result?.ListOfRefferals);
            console.log(result)
           
    }
     else if(Tab===3){
       
        const url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${firstday}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${firstday}`;
        let result=await fetch(url);
        result=await result.json();
      
       setDeclined(result?.ListOfRefferals);
        console.log(result)
      
        }

else if(Tab===4){

  const url=Scribe==="FacilityHomehealthScribe"?URL.FacDeclinedTabUrl+`FacilityScribe/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`:URL.FacDeclinedTabUrl+`${Scribe}/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`;
  let result=await fetch(url);
  result=await result.json();
  
 setDeclined(result?.ListOfRefferals);
  console.log(result)
}

}


const onRefresh =() => {
  
  setRefreshing(true);
  DeclinedReferalList();
  setTimeout(() => {
    setRefreshing(false);
  }, 5000);
};   





 


     
        const sortedData=Declined?.sort((a,b)=>{
          const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
          if(dataCompare!==0){
              return dataCompare;
          }
          return a.AppointmentTime.localeCompare(b.AppointmentTime);
      });
     
    const SlotView = ({ item }) => {
        return (
          <TouchableHighlight
          onPress={() =>navigation.navigate('DeclinedDetailView',{ID,Scribe,VisitTypeId:'1001',item})}
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
     onPress={()=>navigation.goBack()}
    createAppointment={()=>{
      if(Scribe==='FacilityScribe'||Scribe==='Scribe'){
        navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe})
      }
      else{
      navigation.navigate('ScribeCreateAppointment',{ID,Scribe})
    }}
  }
    TabName={'Declined'}
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
            {((Scribe==="FacilityScribe")||(Scribe==="FacilityHomehealthScribe")||(Scribe==="Scribe"))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
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
           
           <FlatList
             contentContainerStyle={{paddingBottom:160}}
              data={sortedData}
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

export default ScribeFacDeclined;

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
        borderRadius: 0,
       
      },
      backRightBtnRight: {
        backgroundColor: 'green',
        right: 0,
        borderRadius:0,
        width:75
      },
  
  

})