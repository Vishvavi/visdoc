import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{Component, useEffect}from 'react'
import { useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import TextInput from 'react-native-paper/lib/module/components/TextInput/TextInput';
import MultiSelect from 'react-native-element-dropdown/src/components/MultiSelect'
import { Dropdown } from 'react-native-element-dropdown'
import Entypo from 'react-native-vector-icons/Entypo';

import Theme from '../Components/fontTheme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveWidth } from 'react-native-responsive-dimensions';


const Dischargedate = ({navigation,route}) => {
   

  const [input, setInput] = useState("");
  const[Specialty,setSpeciality]=useState([]);
  const[specialty,setspeciality]=useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [selected, setSelected] = useState([]);
 const[SpecialityList,setSpecialityList]=useState([]);
 const[PatientList,setPatientList]=useState([]);

 const[ReferringProvider,setReferringProvider]=useState(false);
 const[ProviderList,setProviderList]=useState([]);
 const [open, setOpen] = useState(false);
 const [selectDate, setselectDate] = useState(new Date());
 const[selectDate1,setselectDate1]=useState(false);
 const[ReasonForTcm,setReasonForTcm]=useState(false);
 const[ReasonAlert,setReasonAlert]=useState(false);

 const{ID,LocationTypeId,Scribe,patient,FacilityId,TabName,HomeHealthId}=route.params;

  const ToCalendar = () =>{
    Alertmsg();
    if(((ReasonForTcm!=false)&&(selectDate!=false))){
    
      navigation.navigate('TcmProceed',{ID,LocationTypeId,Scribe,ReasonForTcm,FacilityId,patient,TabName,DischargeDate:moment(selectDate).format("YYYY-MM-DD")})
    
    }
    else{
      console.log('error')
    }
}

const Alertmsg=()=>{
  if(ReasonForTcm===false&&selectDate!=false){
    setReasonAlert(true);
  }

}

const SpecialtyList=async()=>{
  const url="https://visdocapidev.azurewebsites.net/api/specialities/";
  let result=await fetch(url);
  result=await result.json();
  setSpecialityList(result?.Specialities)
  console.log(result)

       }
       const ReferringProviderList=async()=>{
        const url="https://visdocapidev.azurewebsites.net/api/providerslist/";
        let result=await fetch(url);
        result=await result.json();
        setProviderList(result?.ProvidersList)
        console.log(result)
      
             }


       const PatientListApi=async()=>{
       
        const url=`https://visdocapidev.azurewebsites.net/api/patients/facility/${FacilityId}`;
        let result=await fetch(url);
        result=await result.json();
        setPatientList(result?.Facility)
        console.log(result)
      
            }

       useEffect(()=>{
        console.log(FacilityId)
        console.log(LocationTypeId)
       
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
    <View style={{ height: 50,alignItems:'center',flexDirection:'row',backgroundColor: '#11266c' }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: 20,  }} name='arrow-left' size={24} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Discharge Date</Text>
            </View>
   
            <View style={{marginRight:30,height:1,backgroundColor:'#333333',marginTop:20,marginLeft:30}}>
<View style={[styles.Round,{backgroundColor:"#11266c"}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(-2),fontFamily: 'SpaceGrotesk-Regular'}}>{TabName}</Text>
<View style={[styles.Round,{marginLeft:responsiveWidth(23),backgroundColor:'#11266c'}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(20),fontFamily: 'SpaceGrotesk-Regular'}}>Patient</Text>
<View style={[styles.Round,{marginLeft:responsiveWidth(55),backgroundColor:'white'}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,marginLeft:responsiveWidth(45),fontFamily: 'SpaceGrotesk-Regular'}}>Discharge Date</Text>


<View style={[styles.Round,{marginLeft:responsiveWidth(85)}]}></View>
<Text style={{color:'#11266c',fontSize:10,position:'absolute',marginTop:8,left:responsiveWidth(80),fontFamily: 'SpaceGrotesk-Regular'}}>Submit</Text>
</View>

    
    
            <ScrollView>
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
    <View style={{  borderBottomWidth:0, alignItems: 'center', marginTop: 180, marginLeft:15, marginRight: 25 }}>
        <TextInput style={{ fontSize: 17, color:'#333333', backgroundColor: '#dcdcdc', width: '100%',fontFamily: 'SpaceGrotesk-Regular' }}
            mode='flat'
            backgroundColor='transparent'
            theme={Theme}
            label={"Reason For Tcm"}
            labelStyle={{
                color:'black'
            }}
           value={ReasonForTcm}
            underlineColorAndroid={'tranaparent'}
            underlineColor='#11266C'
            activeUnderlineColor="#11266C"
            placeholderTextColor={'#808080'}
            onChangeText={(text) =>{setReasonForTcm(text)
            setReasonAlert(false);
            }}
        />
         
    </View>
    {ReasonAlert&&(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:25}}>
                <Ionicons name='warning'color={'#e6c402'} size={12} style={{right:5}}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular'}}>Enter Reason !</Text>
                </View>
                )}
    
    
    <DatePicker
                        mode='date'
                        modal
                        open={open}
                        date={selectDate}
                        minimumDate={new Date()}
                        onConfirm={value => {
                            setOpen(false)
                            setselectDate(value)
                            //setselectDate1(moment(value).format("YYYY-MM-DD"))
                            
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                   
    <View style={{borderWidth:0,}}>
    <TouchableOpacity onPress={()=>setOpen(true)} style={{borderWidth:0,alignSelf:'flex-end',right:30,top:40,position:'absolute'}}>
    <AntDesign name='calendar' size={30} color={'#e6c402'} style={{}}/>
    
    </TouchableOpacity>
        <TextInput
        mode="flat"
        label={"Discharge Date"}
      
        theme={Theme}
        backgroundColor='transparent'
         labelStyle={{
            color:'black'
        }}
        value={moment(selectDate).format("YYYY-MM-DD")}
        editable={false}
        underlineColor='#11266C'
        activeUnderlineColor="#11266C"
      placeholderTextColor={'#808080'} 
        style={{margin:15,fontSize:17,marginRight:60,backgroundColor:'transparent'}}

        />
       

</View>

   { //<SearchFilterPatient data={words} input={input} setInput={setInput} />
}
    
    <TouchableOpacity onPress={()=>ToCalendar()} style={{ backgroundColor: 'green',
    alignItems:'center',
    justifyContent:'center',
    width: 120,
    height:40, 
    borderRadius: 8, 
    alignSelf:'flex-end',
    marginRight:20,
    marginBottom:20,
    marginTop:130 }}>
        <Text style={{ color: '#eaeaea', fontSize: 22,fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
    </TouchableOpacity>

  
    </ScrollView>
    </View>


  )
}

export default Dischargedate;

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
        left: 20,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: scale(12),
        color:'#808080'
      },
      placeholderStyle: {
        fontSize:12,
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
        fontSize: 14,
        color:'black'
      },
    

})