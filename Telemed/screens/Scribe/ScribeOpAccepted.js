import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity,RefreshControl, View,LayoutAnimation } from 'react-native'
import React, { useState ,useEffect, useCallback} from 'react'

import Octicons from 'react-native-vector-icons/Octicons'



import moment from 'moment';
import useProgressViewOffset from '../Components/ProgressViewOffset'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';
import Header from '../Components/Header'
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import List from '../Styles/List';
import CheckBox from '../Styles/CheckBox';
import TabStyle from '../Styles/TabStyle'
import URL from '../Components/URL';

 





const ScribeOpAccepted = ({navigation,route}) => {
const{Tab,ID,selectedDate,Scribe}=route.params;
//const[Accepted,setAccepted]=useState(route.params.Accepted);
  

    const [selectedTabs, setSelectedTabs] = useState(3);
   
   
   
   
    const [refreshing, setRefreshing] = useState(false);
   
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
   

      useDimensionsChange(
        useCallback(({ window, screen }) => {
        
        
        }, [])  
      ); 
    
   useEffect(()=>{
     OPReferralList();
       
    },[])

    const callbackOP=React.useCallback(async()=>{
        OPReferralList();
      })

    const OPReferralList=async()=>{
      try{
        const url=URL.OPList+`${ID}`;
        let result=await fetch(url);
        result=await result.json();
     
        console.log(result)
      if(result?.ListOfRefferals.code==="EINVALIDSTATE"){
      callbackOP();
      }
      else{
      
      setOPList(result?.ListOfRefferals);
     //  setOPRowcount(result?.Rowcount);
      }
    }catch(e){
      console.log(e);
    }
      }
        
     
 const SlotView = ({ item }) => {
return(
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
            <Text style={[List.Text,{width:responsiveWidth(35)}]}>Specialty Type</Text>
             <Text style={[List.Text1,{width:responsiveWidth(60)}]}>Patient Name</Text>
            </View>
         
            <View style={{flexDirection:'row',marginTop:5}}>
            <Text style={[List.Text2,{width:responsiveWidth(35)}]}>{item?.SpecialtyType}</Text>
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
     onPress={()=>navigation.goBack()}
    createAppointment={()=>{
      if(Scribe==='FacilityScribe'||Scribe==='Scribe'){
        navigation.navigate('ScribeCreateAppointmentOS',{ID,Scribe})
      }
      else{
      navigation.navigate('ScribeCreateAppointment',{ID,Scribe})
    }
    }}
    TabName={'Accepted'}
    notification={()=>navigation.navigate('ScribeNotification',{ID:ID,Scribe})}
    Scribe={Scribe}
    ID={ID}
     
     />
               
               <View style={{flexDirection:'row',  marginTop: 20}}>
               <Text style={{ color: '#eaeaea',
                marginLeft:responsiveWidth(5),
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
            {((Scribe==='FacilityScribe')||(Scribe==='Scribe')||(Scribe==="FacilityHomehealthScribe"))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 1 ? '#eaeaea' : '#e6c402'}] }>
            <Text style={TabStyle.TabText}>Facility</Text>
        </TouchableOpacity>
            )}
               {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe'))&&(
           <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTabs == 2 ? '#eaeaea' : '#e6c402'}] }>
           <Text style={TabStyle.TabText}>TCM</Text>
       </TouchableOpacity>
               )}
            {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe')||(Scribe==='Scribe')||(Scribe==='HomehealthScribe'))&&(
            <TouchableOpacity  style={[TabStyle.Tab,{ marginLeft:16,backgroundColor: selectedTabs == 3 ? '#eaeaea' : '#e6c402'}] }>
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
                data={OPList}
                renderItem={SlotView}
                keyExtractor={item => item.AppointmentId}
            />
            </View>
    </View>
    </MenuProvider>
  )
}

export default ScribeOpAccepted;

const styles = StyleSheet.create({
  

})