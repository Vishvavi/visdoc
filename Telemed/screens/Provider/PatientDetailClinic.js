import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{Component, useEffect,useCallback}from 'react'
import { useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'


import TextInput from 'react-native-paper/lib/module/components/TextInput/TextInput';
import MultiSelect from 'react-native-element-dropdown/src/components/MultiSelect'
import Dropdown from 'react-native-element-dropdown/lib/commonjs/components/Dropdown';
import Entypo from 'react-native-vector-icons/Entypo'

import Theme from "../Components/fontTheme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { responsiveHeight, responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import URL from '../Components/URL';



const PatientDetailClinic = ({navigation,route}) => {
   

  const [input, setInput] = useState("");
  const[Specialty,setSpeciality]=useState([]);
  const[specialty,setspeciality]=useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [selected, setSelected] = useState([]);
 const[SpecialityList,setSpecialityList]=useState([]);
 const[PatientList,setPatientList]=useState([]);
 const[patient,setpatient]=useState(false);
 const[ReferringProvider,setReferringProvider]=useState(false);
 const[ProviderList,setProviderList]=useState([]);
 const[ReasonForReferral,setReasonForReferral]=useState(false);
 const[PatientAlert,setPatientAlert]=useState(false);
 const[SpecialityAlert,setSpecialityAlert]=useState(false);
 const[ProviderAlert,setProviderAlert]=useState(false);
 const[NotesAlert,setNotesAlert]=useState(false);

 const{ID,LocationTypeId,FacilityId,TabName,HomeHealthId,VisitTypeId,Scribe}=route.params;

 useDimensionsChange(
  useCallback(({ window, screen }) => {
  
   
  }, [])  
); 

  const ToCalendar = () =>{
    Alertmsg();
     if(((patient!=false)&&(ReasonForReferral!=false)&&(specialty===1006)&&(ReferringProvider===false)&&((VisitTypeId==="1001")||(VisitTypeId==="1000")))){
      navigation.navigate('Calendar',{ID,Scribe,LocationTypeId,ReasonForReferral,VisitTypeId,FacilityId,patient,specialty,TabName,ReferringProvider})
      }
    else if(((patient!=false)&&(ReasonForReferral!=false)&&(ReferringProvider!=false)&&(specialty!=false)&&((VisitTypeId==="1001")||(VisitTypeId==="1000")))){
    navigation.navigate('Calendar',{ID,Scribe,LocationTypeId,ReasonForReferral,VisitTypeId,FacilityId,patient,specialty,TabName,ReferringProvider})
    }
   else if(((patient!=false)&&(specialty!=false)&&(ReasonForReferral!=false)&&(VisitTypeId==="1002"))){
      navigation.navigate('OutPatientProvider',{ID,Scribe,LocationTypeId,ReasonForReferral,VisitTypeId,FacilityId,patient,specialty,TabName,ReferringProvider})
    }
    else{
      console.log('error')
    }
    
}

const Alertmsg=()=>{
  if((patient===false)&&(specialty!=false)&&(ReferringProvider!=false)&&(ReasonForReferral!=false)){
    setPatientAlert(true);
  }
  else if((patient!=false)&&(specialty===false)&&(ReferringProvider!=false)&&(ReasonForReferral!=false)){
    setSpecialityAlert(true);
  }
  else if((patient!=false)&&(specialty!=false)&&(ReferringProvider===false)&&(ReasonForReferral!=false)){
    setProviderAlert(true);
  }
  else if((patient!=false)&&(specialty!=false)&&(ReferringProvider!=false)&&(ReasonForReferral===false)){
    setNotesAlert(true);
  }
  else if((patient!=false)&&(specialty!=false)&&(ReferringProvider===false)&&(ReasonForReferral===false)){
    setNotesAlert(true);
    ProviderAlert(true);
  }
  else if((patient===false)&&(specialty===false)&&(ReferringProvider!=false)&&(ReasonForReferral!=false)){
 setPatientAlert(true);
 setSpecialityAlert(true);

  }
  else if((patient===false)&&(specialty!=false)&&(ReferringProvider===false)&&(ReasonForReferral!=false)){
setPatientAlert(true);
setProviderAlert(true);
  }
  else if((patient===false)&&(specialty!=false)&&(ReferringProvider!=false)&&(ReasonForReferral===false)){
setPatientAlert(true);
setNotesAlert(true);
  }
  else if((patient!=false)&&(specialty===false)&&(ReferringProvider===false)&&(ReasonForReferral!=false)){
setSpecialityAlert(true);
setProviderAlert(true);
  }
  else if((patient!=false)&&(specialty===false)&&(ReferringProvider!=false)){
setSpecialityAlert(true);
setNotesAlert(true);
  }
  else if((patient!=false)&&(specialty!=false)&&(ReferringProvider===false)&&(ReasonForReferral!=false)){
    setProviderAlert(true);
   
      }
      else if((patient===false)&&(specialty===false)&&(ReferringProvider===false)&&(ReasonForReferral===false)){
        setPatientAlert(true)
        setSpecialityAlert(true);
        setProviderAlert(true);
        setNotesAlert(true);
       
          }
          else if((patient===false)&&(specialty!=false)&&(ReferringProvider===false)&&(ReasonForReferral!=false)){
            setPatientAlert(true);
         
            setProviderAlert(true);
           
              }
              else if((patient===false)&&(specialty!=false)&&(ReferringProvider===false)&&(ReasonForReferral===false)){
                setPatientAlert(true);
                setNotesAlert(true);
                setProviderAlert(true);
               
                  }
              else if((patient!=false)&&(specialty===false)&&(ReferringProvider===false)&&(ReasonForReferral!=false)){
             
                setSpecialityAlert(true);
                setProviderAlert(true);
               }
               else if((patient!=false)&&(specialty===false)&&(ReferringProvider===false)&&(ReasonForReferral===false)){
             
                setSpecialityAlert(true);
                setProviderAlert(true);
                setNotesAlert(true);
               }
               else if((patient===false)&&(specialty===false)&&(ReferringProvider!=false)&&(ReasonForReferral===false)){
             
                setSpecialityAlert(true);
               setPatientAlert(true);
                setNotesAlert(true);
               }
               else if((patient===false)&&(specialty===false)&&(ReferringProvider===false)&&(ReasonForReferral!=false)){
             
                setSpecialityAlert(true);
               setPatientAlert(true);
               setProviderAlert(true);
               
               }
                 }


const SpecialtyList=async()=>{
  try{
  const url=URL.SpecialityList;
  let result=await fetch(url);
  result=await result.json();
  setSpecialityList(result?.Specialities)
  console.log(result)
  }catch(e){
    console.log(e);
  }
       }
       const ReferringProviderList=async()=>{
        try{
        const url=URL.RefferingProviderList
        let result=await fetch(url);
        result=await result.json();
        setProviderList(result?.ProvidersList)
        console.log(result)
        }catch(e){
          console.log(e);
        }
             }


       
        const PatientListApi=async()=>{
       try{
          const url=URL.PatientList
          let result=await fetch(url);
          result=await result.json();
          setPatientList(result?.PatientList)
          console.log(result)
       }catch(e){
        console.log(e);
       }
               
              }
      
              

       useEffect(()=>{
        SpecialtyList()
        PatientListApi();
        ReferringProviderList();
       },[]);
const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
const renderspecialityLabel = () => {
    if (specialty || isFocus3) {
      return (
        <Text style={[styles.label, isFocus3 && { color: 'blue' }]}>
          Select Specialty
        </Text>
      );
    }
    return null;
  };
  const renderpatientLabel = () => {
    if ( patient|| isFocus3) {
      return (
        <Text style={[styles.label, isFocus3 && { color: 'blue' }]}>
          Select Patient
        </Text>
      );
    }
    return null;
  };
  const renderProviderLabel = () => {
    if ( ReferringProvider|| isFocus3) {
      return (
        <Text style={[styles.label, isFocus3 && { color: 'blue' }]}>
          Select Referring Provider
        </Text>
      );
    }
    return null;
  };

  return (
   
    <View style={{ flex:1, backgroundColor: '#dcdcdc' }}>
    <View style={{ height: 50,alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5),  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Patient Details</Text>
            </View>
            <ScrollView>
            <View style={{marginRight:responsiveWidth(10),height:1,backgroundColor:'#333333',marginTop:30,marginLeft:responsiveWidth(5)}}>
        <View style={[styles.Round,{}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(-2),fontFamily: 'SpaceGrotesk-Regular'}}>{TabName}</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(20),backgroundColor:"white"}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(18),fontFamily: 'SpaceGrotesk-Regular'}}>Patient</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(40)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(36),fontFamily: 'SpaceGrotesk-Regular'}}>Date & Time</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(63)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,marginLeft:responsiveWidth(61),fontFamily: 'SpaceGrotesk-Regular'}}>Provider</Text>
        <View style={[styles.Round,{marginLeft:responsiveWidth(85)}]}></View>
        <Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:10,left:responsiveWidth(83),fontFamily: 'SpaceGrotesk-Regular'}}>Submit</Text>
        </View>
    
    
           
    {//<View style={{ flexDirection: 'row', borderBottomWidth: 0, alignItems: 'center', marginTop: verticalScale(60), marginLeft: scale(10), marginRight: scale(20) }}>
      //  <TextInput style={{ fontSize: scale(17), color:'#333333', backgroundColor: '#dcdcdc', width: '100%',fontFamily: 'SpaceGrotesk-Regular', }}
       //    label={"Full Name"}
        //    placeholderTextColor={'#808080'}
         //   mode='flat'
          //  backgroundColor='transparent'
           // fontFamily= 'SpaceGrotesk-Regular'
          //  textStyle={{fontFamily:'SpaceGrotesk-Regular'}}
         // theme={Theme}
          //  labelStyle={{
            //    color:'black'
            //}}
    
           
    //        underlineColorAndroid={'tranaparent'}
      //      underlineColor='#11266C'
        //    activeUnderlineColor="#11266C"
           
         //   onChangeText={(text) => setInput(text)}
       // />
    
   // </View>
    }


    <View style={{backgroundColor: 'transparent',marginTop: 60, padding: 20,height:70, borderRadius: 15}}>
            {renderpatientLabel()}
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
             selectedTextStyle={styles.selectedTextStyle}
             inputSearchStyle={styles.inputSearchStyle}
             itemContainerStyle={{borderBottomWidth:1,height:50,borderBottomColor:'#808080'}}
             containerStyle={{paddingLeft:15,paddingRight:15}}
             itemTextStyle={{fontSize:12,color:'#808080',fontFamily:'SpaceGrotesk-Regular'}}
             iconStyle={styles.iconStyle}
            data={PatientList.map((item,index)=>{
              return{
                key:item.PatientId,label:item.PatientName,value:item.PatientId
              }
            })
          }
            search
            mode="flat"
            maxHeight={responsiveHeight(40)}
            labelField="label"
            valueField="value"
            placeholder={ 'Select Patient'}
            searchPlaceholder="Search..."
           value={patient}
            onChange={item => {
              setpatient(item.value);
              console.log(item.value)
              let data=item.value;
              setPatientAlert(false)
             
              
            }}
            
           
        />
            
            </View> 
            {PatientAlert&&(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:25}}>
                <Ionicons name='warning'color={'#e6c402'} size={12} style={{right:5}}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular'}}>Select Patient !</Text>
                </View>
                )}

            <View style={{backgroundColor: 'transparent', padding: 20,height:70,}}>
            {renderspecialityLabel()}
            <Dropdown
             style={[styles.dropdown]}
             placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemContainerStyle={{borderBottomWidth:1,height:50,borderBottomColor:'#808080'}}
            containerStyle={{paddingLeft:15,paddingRight:15}}
            itemTextStyle={{fontSize:12,color:'#808080',fontFamily:'SpaceGrotesk-Regular'}}
            iconStyle={styles.iconStyle}
            data={SpecialityList.map((item,index)=>{
              return{
                key:item.SpecialityId,label:item.Speciality,value:item.SpecialityId
              }
            })
          }
            search
            mode="flat"
            maxHeight={responsiveHeight(40)}
            labelField="label"
            valueField="value"
            placeholder={ 'Select Speciality'}
            searchPlaceholder="Search..."
           value={specialty}
            onChange={item => {
              setspeciality(item.value);
              setSpecialityAlert(false)
              console.log(item.value)
              let data=item.value;
             
              
            }}
           
        />
            
            </View> 
            {SpecialityAlert&&(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:25}}>
                <Ionicons name='warning'color={'#e6c402'} size={12} style={{right:5}}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular'}}>Select Speciality !</Text>
                </View>
                )}
   
   
  { // <View style={styles.container}>
      
     // <MultiSelect
      //  style={styles.dropdown}
       // placeholderStyle={styles.placeholderStyle}
       //selectedTextStyle={styles.selectedStyle}
        //inputSearchStyle={styles.inputSearchStyle}
        //iconStyle={styles.iconStyle}
        //data={
         // SpecialityList.map((item,index)=>{
           // return{
            //  key:item.SpecialityId,label:item.Speciality,value:item.Speciality
           // }
          //})

        //}
        //activeColor='#e6c402'

       // maxHeight={300}
        //labelField="label"
        //valueField="value"
        //placeholder="Specialities"
        //value={selected}
        //search
        //searchPlaceholder="Search..."
        //onChange={item => {
         // setSelected(item);
       // }}
        //renderItem={renderItem}
        //renderSelectedItem={(item, unSelect) => (
         // <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
          //  <View style={styles.selectedStyle}>
            //  <Entypo color='#808080' name="cross" size={scale(18)} />
             // <Text style={styles.textSelectedStyle}>{item.label}</Text>
            //</View>
         // </TouchableOpacity>
        //)}
      ///>
    //</View>
          }
{specialty!=1006 &&(
<View style={{backgroundColor: 'transparent', padding: 20,height:70, borderRadius: 15}}>
            {renderProviderLabel()}
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
             selectedTextStyle={styles.selectedTextStyle}
             inputSearchStyle={styles.inputSearchStyle}
             itemContainerStyle={{borderBottomWidth:1,height:50,borderBottomColor:'#808080'}}
             containerStyle={{paddingLeft:15,paddingRight:15}}
             itemTextStyle={{fontSize:12,color:'#808080',fontFamily:'SpaceGrotesk-Regular'}}
             iconStyle={styles.iconStyle}
            data={ProviderList?.map((item,index)=>{
              return{
                key:index,label:item.ProviderName,value:item.ProviderId
              }
            })
          }
            search
            mode="flat"
            maxHeight={responsiveHeight(40)}
            labelField="label"
            valueField="value"
            placeholder={ 'Select Referring Provider'}
            searchPlaceholder="Search..."
           value={ReferringProvider}
            onChange={item => {
              setReferringProvider(item.value);
              setProviderAlert(false);
              console.log(item.value)
              let data=item.value;
             
              
            }}
           
        />
        </View>
        )}
        {((ProviderAlert )&& (specialty!=1006))&&(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:25}}>
                <Ionicons name='warning'color={'#e6c402'} size={12} style={{right:5}}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular'}}>Select Referring Provider !</Text>
               
                </View>
                )}
    <View style={{  borderBottomWidth:0, alignItems: 'center', marginTop: 10, marginLeft: 15, marginRight: 15 }}>
        <TextInput style={{ fontSize: 17, color:'#333333', backgroundColor: '#dcdcdc', width: '100%',fontFamily: 'SpaceGrotesk-Regular' }}
            mode='flat'
            backgroundColor='transparent'
            theme={Theme}
            label={"Reason for Referral"}
            labelStyle={{
                color:'black'
            }}
           
            underlineColorAndroid={'tranaparent'}
            underlineColor='#11266C'
            activeUnderlineColor="#11266C"
            placeholderTextColor={'#808080'}
            onChangeText={(text) =>{setReasonForReferral(text)
            setNotesAlert(false)
            }}
        />
    </View>
    {NotesAlert&&(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:25}}>
                <Ionicons name='warning'color={'#e6c402'} size={12} style={{right:5}}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular'}}>Enter Reason for Referral !</Text>
                </View>
                )}
    
   { //<SearchFilterPatient data={words} input={input} setInput={setInput} />
}
    
    <TouchableOpacity onPress={()=>ToCalendar()} style={{ backgroundColor: 'green',
    alignItems:'center',
    justifyContent:'center',
    width: 120,
    height: 40, 
    borderRadius: 10, 
    alignSelf:'flex-end',
    marginRight:responsiveWidth(5),
    marginBottom:20,
    marginTop:responsiveHeight(10) }}>
        <Text style={{ color: '#eaeaea', fontSize: 22,fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
    </TouchableOpacity>
    </ScrollView>
    </View>


  )
}

export default PatientDetailClinic;

const styles = StyleSheet.create({
    container: {
      //  marginLeft:scale(20),
       // marginRight:scale(20),
       // marginTop:verticalScale(20),
       
        //borderBottomWidth:1,
        borderBottomColor:'#11266c',
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
      dropdown: {
        height: 40,
       // borderColor: 'black',
        borderBottomWidth: 1,
        backgroundColor:'transparent',
        borderRadius: 8,
        paddingHorizontal:8,
        marginBottom: 10,
        borderBottomColor:'#11266c'
       
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