
 

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'


import Dropdown from 'react-native-element-dropdown/lib/commonjs/components/Dropdown';

import { ScrollView } from 'react-native-gesture-handler';


import { responsiveHeight } from 'react-native-responsive-dimensions';
import { responsiveWidth } from 'react-native-responsive-dimensions/src';

const OpFacility = ({navigation,route}) => {
   const{LocationTypeId,ID,TabName,VisitTypeId,Scribe}=route.params;
    const[ facility,setfacility]=useState(false);
    const[FacilityList,setFacilityList]=useState([]);
    const[HomeHealtList,setHomeHealthList]=useState([]);
    const[selectedHom,setSelectedHom]=useState(false);
    const[alertmessage,setalertmessage]=useState(false);
    
    const FacilityApi=async()=>{
      if((LocationTypeId==="1001")&&((Scribe==="Hospitalist")||(Scribe==="Provider")||(Scribe==='Scribe'))){
   const url="https://visdocapidev.azurewebsites.net/api/facility/";
   let result=await fetch(url);
   result=await result.json();
 
   setFacilityList(result?.Facility)
   console.log(ID)

  console.log(result)
    }
    else if((LocationTypeId==="1001")&&((Scribe==="FacilityScribe")||(Scribe==='FacilityHomehealthScribe'))){
      const url=`https://visdocapidev.azurewebsites.net/api/UserFacility/${ID}`;
      let result=await fetch(url);
      result=await result.json();
      if(result?.Facilities){
      setFacilityList(result?.Facilities)
      console.log(ID)
           }
       console.log(result)
    
    }
    else if((LocationTypeId==="1002")&&((Scribe==="Hospitalist")||(Scribe==="Provider")||(Scribe==='Scribe'))){
      const url="https://visdocapidev.azurewebsites.net/api/homehealth/";
      let result=await fetch(url);
      result=await result.json();
     if(result?.HomeHealthCompany){
      
      setHomeHealthList(result?.HomeHealthCompany)
     }
      console.log(result)
        }
        else if((LocationTypeId==="1002")&&((Scribe==='FacilityHomehealthScribe')||(Scribe==='HomehealthScribe'))){
          const url=`https://visdocapidev.azurewebsites.net/api/UserHomeHealth/${ID}`;
          let result=await fetch(url);
          result=await result.json();
         if(result?.HomeHealthCompanies){
          setHomeHealthList(result?.HomeHealthCompanies)
         }
          console.log(result)
            }
        }

    useEffect(()=>{
      FacilityApi();
    
    },[])

    const renderfacilityLabel = () => {
      if(facility){
          return (
            <Text style={[styles.label,{ color: 'gray' }]}>
               Facility Name
            </Text>
          );
      }
      return null;
      
      
      };
      const renderHomehealthLabel = () => {
        if(facility){
      
        return (
          <Text style={[styles.label,{ color: 'gray' }]}>
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
        navigation.navigate('OpPatientDetail',{ID,TabName,Scribe,LocationTypeId,VisitTypeId,FacilityId:facility,HomeHealthId:selectedHom})
    }
  }
    

    return (
        <View style={{ flex:1, backgroundColor: '#dcdcdc' }}>
            <View style={{ height: 50,alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5),  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft:20,fontFamily: 'SpaceGrotesk-Regular' }}>{TabName}</Text>
            </View>
          <ScrollView>
          <View style={{marginRight:responsiveWidth(10),height:1,backgroundColor:'#333333',marginTop:30,marginLeft:responsiveWidth(5)}}>
        <View style={[styles.Round,{backgroundColor:"white"}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(-2),fontFamily: 'SpaceGrotesk-Regular'}}>{TabName}</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(28)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(25),fontFamily: 'SpaceGrotesk-Regular'}}>Patient</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(55)}]}></View>
       
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(51),fontFamily: 'SpaceGrotesk-Regular'}}>Provider</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(85)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,left:responsiveWidth(78),fontFamily: 'SpaceGrotesk-Regular'}}>Submit</Text>
        </View>
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
            itemTextStyle={{fontSize:12,color:'#808080',fontFamily:'SpaceGrotesk-Regular'}}
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
             <Ionicons name='warning'color={'#e6c402'} size={12}/> 
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
            selectedTextStyle={[styles.selectedTextStyle,{borderWidth:0}]}
            inputSearchStyle={[styles.inputSearchStyle,{borderWidth:0}]}
            itemContainerStyle={{borderBottomWidth:1,borderBottomColor:'#808080'}}
            containerStyle={{paddingLeft:12,paddingRight:12}}
            itemTextStyle={{fontSize:12,color:'#808080',fontFamily:'SpaceGrotesk-Regular'}}
            iconStyle={styles.iconStyle}
            data={HomeHealtList?.map((item,index)=>{
              return{ 
              key:item.HomeHealthCompanyId,label:item.HomeHealthCompanyName,value:item.HomeHealthCompanyId}})
}
            search
          
            mode="flat"
            maxHeight={responsiveHeight(40)}
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
           {// <SearchFilterFacility data={words} input={input} setInput={setInput} />
}
            <TouchableOpacity onPress={()=>ToPatientDetails()} style={{ backgroundColor: 'green',marginBottom:20,alignItems:'center',justifyContent:'center', width: 120, height: 40,marginTop:responsiveHeight(10), borderRadius: 8,alignSelf:'flex-end',marginRight:responsiveWidth(5) }}>
                <Text style={{ color: '#eaeaea', fontSize: 22, fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default OpFacility

const styles = StyleSheet.create({

    dropdown: {
        height: 50,
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
        fontSize: 17,
        fontFamily: 'SpaceGrotesk-Regular'
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        fontFamily: 'SpaceGrotesk-Regular',
       
      
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
        
        color:'black',
        fontFamily: 'SpaceGrotesk-Regular'
      
      },
      
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 12,
        color:'black',
        fontFamily:'SpaceGrotesk-Regular'
      },
    

})
