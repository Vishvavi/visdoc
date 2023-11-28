import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{Component, useEffect}from 'react'
import { useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'



import Dropdown from 'react-native-element-dropdown/lib/commonjs/components/Dropdown';


import Theme from '../Components/fontTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import URL from '../Components/URL';




const TcmPatientDetail = ({navigation,route}) => {
   

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
 
 const[PatientAlert,setPatientAlert]=useState(false);

   const{ID,LocationTypeId,Scribe,FacilityId,TabName,HomeHealthId}=route.params;

    const ToCalendar = () =>{
      Alertmsg();
    if(((patient!=false))){
    navigation.navigate('Dischargedate',{ID,Scribe,LocationTypeId,FacilityId,patient,TabName})
    }
    else{
      console.log('error')
    }
}
const Alertmsg=()=>{
  if(patient===false){
    setPatientAlert(true);
  }}



       
       const ReferringProviderList=async()=>{
        const url=URL.RefferingProviderList;
        let result=await fetch(url);
        result=await result.json();
        setProviderList(result?.ProvidersList)
        console.log(result)
      
             }


       const PatientListApi=async()=>{
       
        const url=URL.FacilitypatientList+`${FacilityId}`;
        let result=await fetch(url);
        result=await result.json();
        setPatientList(result?.Facility)
        console.log(result)
      
             

        
              }

       useEffect(()=>{
       // SpecialtyList()
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
    <View style={{ height: 50,alignItems:'center',flexDirection:'row',backgroundColor: '#11266c'}}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5),  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Patient Details</Text>
            </View>
            <ScrollView>
            <View style={{marginRight:30,height:1,backgroundColor:'#333333',marginTop:20,marginLeft:30}}>
<View style={[styles.Round,{backgroundColor:"#11266c"}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(-2),fontFamily: 'SpaceGrotesk-Regular'}}>{TabName}</Text>
<View style={[styles.Round,{marginLeft:responsiveWidth(23),backgroundColor:'white'}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(20),fontFamily: 'SpaceGrotesk-Regular'}}>Patient</Text>
<View style={[styles.Round,{marginLeft:responsiveWidth(55)}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(45),fontFamily: 'SpaceGrotesk-Regular'}}>Discharge Date</Text>


<View style={[styles.Round,{marginLeft:responsiveWidth(85)}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,left:responsiveWidth(80),fontFamily: 'SpaceGrotesk-Regular'}}>Submit</Text>
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


    <View style={{backgroundColor: 'transparent',marginTop:150, padding: 20,height:70, borderRadius: 15}}>
            {renderpatientLabel()}
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
             selectedTextStyle={styles.selectedTextStyle}
             inputSearchStyle={styles.inputSearchStyle}
             itemContainerStyle={{borderBottomWidth:1,borderBottomColor:'#808080'}}
             containerStyle={{paddingLeft:12,paddingRight:15}}
             itemTextStyle={{fontSize:12,color:'#808080'}}
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
              setPatientAlert(false);
              console.log(item.value)
              let data=item.value;
             
              
            }}
           
        />
            
            </View> 
            {PatientAlert&&(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:responsiveWidth(5)}}>
                <Ionicons name='warning'color={'#e6c402'} size={14} style={{right:5}}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular'}}>Select Patient !</Text>
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
  
   { //<SearchFilterPatient data={words} input={input} setInput={setInput} />
}
    
    <TouchableOpacity onPress={()=>ToCalendar()} style={{ backgroundColor: 'green',
    alignItems:'center',
    justifyContent:'center',
    width: 120,
    height: 40, 
    borderRadius: 8, 
    alignSelf:'flex-end',
    marginRight:responsiveWidth(5),
    marginTop:responsiveHeight(10) }}>
        <Text style={{ color: '#eaeaea', fontSize: 22,fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
    </TouchableOpacity>

  
    </ScrollView>
    </View>


  )
}

export default TcmPatientDetail;

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
        height: 50,
       // borderColor: 'black',
        borderBottomWidth: 1,
        backgroundColor:'transparent',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
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
        //left: 20,
        top: 8,
        zIndex: 999,
        paddingHorizontal:28,
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
        color:'black'
      },
    

})