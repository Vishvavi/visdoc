
 

import { StyleSheet, Text, TextInput, TouchableOpacity, View ,ToastAndroid} from 'react-native'
import React, { useEffect,useCallback } from 'react'
import { useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'

//import { Dropdown,MultiSelect } from 'react-native-element-dropdown';
import Dropdown from 'react-native-element-dropdown/lib/commonjs/components/Dropdown';

import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'

const Facility = ({navigation,route}) => {
    const{LocationTypeId,ID,TabName,Scribe,VisitTypeId}=route.params;
    const[ facility,setfacility]=useState(false);
    const[FacilityList,setFacilityList]=useState([]);
    const[HomeHealtList,setHomeHealthList]=useState([]);
    const[selectedHom,setSelectedHom]=useState(false);
    const[isFocus1,setIsFocus1]=useState(false);
    const[alertmessage,setalertmessage]=useState(false);


   
useDimensionsChange(
  useCallback(({ window, screen }) => {
  
   
  }, [])  
); 
    
    const FacilityApi=async()=>{
      if((LocationTypeId==="1001")&&((Scribe==="Hospitalist")||(Scribe==="Provider")||(Scribe==='Scribe'))){
   try{
        const url="https://visdocapidev.azurewebsites.net/api/facility/";
   let result=await fetch(url);
   result=await result.json();
   if(result?.Facility){
   setFacilityList(result?.Facility)
   console.log(ID)
        }}catch(e){
          console.log(e);
        }
    
      }
else if((LocationTypeId==="1001")&&((Scribe==="FacilityScribe")||(Scribe==='FacilityHomehealthScribe'))){
  try{
  const url=`https://visdocapidev.azurewebsites.net/api/UserFacility/${ID}`;
  let result=await fetch(url);
  result=await result.json();
  if(result?.Facilities){
  setFacilityList(result?.Facilities)
  console.log(ID)
       }
 
      }catch(e){
        console.log(e);
      }

}

  else if((LocationTypeId==="1002")&&((Scribe==="Hospitalist")||(Scribe==="Provider")||(Scribe==='Scribe'))){
    try{  
    const url="https://visdocapidev.azurewebsites.net/api/homehealth/";
      let result=await fetch(url);
      result=await result.json();
     if(result?.HomeHealthCompany){
      setHomeHealthList(result?.HomeHealthCompany)
     }
      console.log(result)
        
    }catch(e){
      console.log(e);
    }}
        else if((LocationTypeId==="1002")&&((Scribe==='FacilityHomehealthScribe')||(Scribe==='HomehealthScribe'))){
          try{
          const url=`https://visdocapidev.azurewebsites.net/api/UserHomeHealth/${ID}`;
          let result=await fetch(url);
          result=await result.json();
         if(result?.HomeHealthCompanies){
          setHomeHealthList(result?.HomeHealthCompanies)
         }
          console.log(result)
            }catch(e){
              console.log(e);
            }
          }
          
        }

    useEffect(()=>{
      FacilityApi();
    },[])

   
    const renderfacilityLabel = () => {
      if(facility||isFocus1){
      
          return (
            <Text style={[styles.label,isFocus1 &&{ color: 'gray' }]}>
               Facility Name
            </Text>
          );
      }
      return null;
      };


      const renderHomehealthLabel = () => {
        if(facility||isFocus1){
        return (
          <Text style={[styles.label,isFocus1&&{ color: 'gray' }]}>
             Home Health Name
          </Text>
        );
        }
        return null;
    
    };
 

    const ToPatientDetails = () =>{
      if((facility!=false)&&(VisitTypeId==="1003")) {
        navigation.navigate('TcmPatientDetail',{ID,TabName,Scribe,LocationTypeId,VisitTypeId,FacilityId:facility,HomeHealthId:selectedHom})
      }
     else if((facility!=false)&&((LocationTypeId==="1001")||(LocationTypeId==="1002"))){
        navigation.navigate('PatientDetails',{ID,TabName,Scribe,LocationTypeId,VisitTypeId,FacilityId:facility,HomeHealthId:selectedHom})
    }
    else{


     setalertmessage(true);

                  }
  }
    

    return (
        <View style={{ flex:1, backgroundColor: '#dcdcdc' }}>
          <ScrollView bounces={false}>
            <View style={{ height: 50,alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft:responsiveWidth(5),top:3  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>{TabName}</Text>
            </View>
          {VisitTypeId==="1003"?(

<View style={{marginRight:30,height:1,backgroundColor:'#333333',marginTop:20,marginLeft:30}}>
<View style={[styles.Round,{backgroundColor:"white"}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(-2),fontFamily: 'SpaceGrotesk-Regular'}}>{TabName}</Text>
<View style={[styles.Round,{marginLeft:responsiveWidth(23)}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(20),fontFamily: 'SpaceGrotesk-Regular'}}>Patient</Text>
<View style={[styles.Round,{marginLeft:responsiveWidth(55)}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(45),fontFamily: 'SpaceGrotesk-Regular'}}>Discharge Date</Text>


<View style={[styles.Round,{marginLeft:responsiveWidth(85)}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,left:responsiveWidth(80),fontFamily: 'SpaceGrotesk-Regular'}}>Submit</Text>
</View>

          ):(
            <View style={{marginRight:responsiveWidth(10),height:1,backgroundColor:'#333333',marginTop:30,marginLeft:responsiveWidth(5)}}>
        <View style={[styles.Round,{backgroundColor:"white"}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(-2),fontFamily: 'SpaceGrotesk-Regular'}}>{TabName}</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(20)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(18),fontFamily: 'SpaceGrotesk-Regular'}}>Patient</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(40)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(36),fontFamily: 'SpaceGrotesk-Regular'}}>Date & Time</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(63)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(61),fontFamily: 'SpaceGrotesk-Regular'}}>Provider</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(85)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,left:responsiveWidth(83),fontFamily: 'SpaceGrotesk-Regular'}}>Submit</Text>
        </View>
        )}
          {//  <Text style={{ color: '#808080', fontSize: 13, marginLeft: 40, marginTop: 140, fontFamily: 'SpaceGrotesk-Regular' }}>Facility Name</Text>
           // <View style={{ flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center', marginTop: 10, marginLeft: 40, marginRight: 40 }}>
             //   <TextInput style={{ fontSize: 15, color: '#333333', backgroundColor: '#dcdcdc', width: '100%', fontFamily: 'SpaceGrotesk-Regular' }}
              //      placeholder='Search'
               //     placeholderTextColor={'#808080'}
                //    value={input}
                 //   onChangeText={(text) => setInput(text)}
               // />
            //</View>
          }
          <View style={{padding:responsiveWidth(2)}}>
          {LocationTypeId==="1001"&&(
          <View style={{backgroundColor: 'transparent', padding: 20,height:70, borderRadius: 15,marginTop:140}}>
            {renderfacilityLabel()}
            <Dropdown
             style={[styles.dropdown]}
             placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemContainerStyle={{borderBottomWidth:1,borderBottomColor:'#808080'}}
            containerStyle={{paddingLeft:12,paddingRight:12}}
            itemTextStyle={{fontSize:12,color:'#808080',fontFamily: 'SpaceGrotesk-Regular'}}
            iconStyle={styles.iconStyle}
            data={FacilityList?.map((item,index)=>{
              return{
              key:item.FacilityId,label:item.FacilityName,value:item.FacilityId}})
}
            search
            mode='flat'
            maxHeight={responsiveHeight(40)}
            labelField="label"
            valueField="value"
            placeholder={ 'Select Facility'}
            searchPlaceholder="Search..."

           value={facility}
            onChange={item => {
              setfacility(item.value);
              setalertmessage(false);
              console.log(item.value)
              let data=item.value;
             
              
            }}
           
        />
            {alertmessage&&(
            <View style={{flexDirection:'row',marginLeft:16,alignItems:'center'}}>
             <Ionicons name='warning'color={'#e6c402'} size={15}/> 
            <Text style={{fontSize:12,color:'red',fontFamily:'SpaceGrotesk-Regular' }}>Select Facility</Text>
            </View>
            )}
            </View> 
            )}

          {LocationTypeId==="1002"&&(
            <View style={{backgroundColor: 'transparent', padding: 20,height:70, borderRadius: 15,marginTop:140}}>
            {renderHomehealthLabel()}
            <Dropdown
             style={[styles.dropdown,{borderWidth:0}]}
             placeholderStyle={[styles.placeholderStyle,{borderWidth:0}]}
            selectedTextStyle={[styles.selectedTextStyle,{borderWidth:0,}]}
            inputSearchStyle={[styles.inputSearchStyle,{borderWidth:0}]}
            itemContainerStyle={{borderBottomWidth:1,borderBottomColor:'#808080'}}
            containerStyle={{paddingLeft:12,paddingRight:12}}
            itemTextStyle={{fontSize:12,color:'#808080',fontFamily: 'SpaceGrotesk-Regular'}}
            iconStyle={styles.iconStyle}
            data={HomeHealtList?.map((item,index)=>{
              return{
              key:item.HomeHealthCompanyId,label:item.HomeHealthCompanyName,value:item.HomeHealthCompanyId}})
}
            search
          
            mode="flat"
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={ 'Select Home Health'}
            searchPlaceholder="Search..."
           value={facility}
            onChange={item => {
              setfacility(item.value);
              setalertmessage(false);
              console.log(item.value)
              let data=item.value;
             
              
            }}
           
        />
        {alertmessage&&(
            <View style={{flexDirection:'row',marginLeft:16,alignItems:'center'}}>
             <Ionicons name='warning'color={'#e6c402'} size={12}/> 
            <Text style={{fontSize:12,color:'red',fontFamily:'SpaceGrotesk-Regular' }}>Select Home Health</Text>
            </View>
            )}
            
            </View> 
            )}
           
        </View>
            <TouchableOpacity onPress={()=>ToPatientDetails()} style={{ backgroundColor: 'green',alignItems:'center',justifyContent:'center', width: 120, height: 40,marginTop:responsiveHeight(40), borderRadius: 10,alignSelf:'flex-end',marginRight:responsiveWidth(5) }}>
                <Text style={{ color: '#eaeaea', fontSize: 22, fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Facility

const styles = StyleSheet.create({

    dropdown: {
        height:50,
        borderColor: 'black',
        borderBottomWidth: 1,
        backgroundColor:'transparent',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 0,
        borderBottomColor:'#11266c'
       
      },
      Round:{
        width:8,
        height:8,
        borderRadius:20,
        borderColor:'#11266c',
        borderWidth:1,
        marginTop:-4,
        backgroundColor:'#808080',
        position:'absolute'
      },
      selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 0,
      },
      textSelectedStyle: {
        marginRight: 5,
        fontSize: 22,
        fontFamily: 'SpaceGrotesk-Regular'
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        fontFamily: 'SpaceGrotesk-Regular',
      //  left: scale(25),
       // top: verticalScale(8),
        zIndex: 999,
        paddingHorizontal: 28,
        fontSize: 12,
        color:'#808080'
      },
      placeholderStyle: {
        fontSize: 12,
        color:'black',
        fontFamily: 'SpaceGrotesk-Regular'
      },
      selectedTextStyle: {
        fontSize: 17,
       // height:20,
        borderWidth:0,
        color:'black',
        fontFamily: 'SpaceGrotesk-Regular'
      
      },
      
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 50,
        fontSize: 12,
        color:'black',
        fontFamily:'SpaceGrotesk-Regular'
      },
    

})
