import { Image, StyleSheet, Text, TouchableOpacity, View ,Animated,Keyboard,KeyboardAvoidingView, ScrollView,TouchableWithoutFeedback, Alert} from 'react-native'
import React, { useEffect,useState,useCallback ,useRef} from 'react'
import { AppDimensions } from './Components/Dimensions'
import TextInput from './Components/react-native-paper/lib/module/components/TextInput/TextInput'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Theme from './Components/fontTheme';
import MultiSelect from 'react-native-element-dropdown/src/components/MultiSelect';
import Entypo from 'react-native-vector-icons/Entypo';
import SignUpSvg from './Components/SignUpSvg';
import { SvgXml } from 'react-native-svg/src/xml';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NeedySvg from './Components/NeedySvg';
import { Root, Popup ,Toast} from 'popup-ui';
import {
  useDimensionsChange,
  useResponsiveHeight,
  useResponsiveWidth,
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import URL from './Components/URL';



const Signin = ({ navigation }) => {
    const[SlideInLeft,setSlideInLeft]=useState(new Animated.Value(0))
   
    const [selected, setSelected] = useState([]);
   const[SpecialityList,setSpecialityList]=useState([]);
   const[FirstName,setFirstName]=useState('');
   const[LastName,setLastName]=useState('');
   const[Email,setEmail]=useState('');
   const[NPI,setNPI]=useState('');
   const[Phoneno,setPhoneno]=useState('');
   const[changeWidth,setchangeWidth]=useState(AppDimensions.FULL_WIDTH)
   const[firstnameAlert,setfirstnameAlert]=useState(false);
   const[lastnameAlert,setlastnameAlert]=useState(false);
   const[EmailAlert,setEmailAlert]=useState(false);
 
   const[NpiAlert,setNpiAlert]=useState(false);
   const[PhoneAlert,setPhoneAlert]=useState(false);



const AlertMsg=()=>{
  if(!FirstName.trim()){
    setfirstnameAlert(true); // trim() removes whitespace from both ends of a string
    //it will check a string emty or not
  }
  if(!LastName.trim()){
    setlastnameAlert(true);
  }
  if(!Email.trim()){
    setEmailAlert(true);
  }
  if(!NPI.trim()){
    setNpiAlert(true);
  }
  if(Phoneno.length==0){
    setPhoneAlert(true);
  }
  else if(FirstName.length!=0&&LastName.length!=0&&Email.length!=0&&NPI.length!=0&&Phoneno.length!=0){
    Signup()
  }
}

    useDimensionsChange(
      useCallback(({ window, screen }) => {
       
        setchangeWidth(window.width)
       // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }, [])  
    ); 


//Phonenumber format function

    const phoneFormat = (phNumber) => {

      var match = phNumber.match(/(\d{3})(\d{3})(\d{4})$/)
  
      if (match) {
  
        number = [ match[1], '-' , match[2], '-', match[3]].join('');
  
        setPhoneno(number);
  
        return;
      }
  
      setPhoneno(phNumber);
    }
    const Signup=async()=>{

       
         const data={
            FirstName: `${FirstName}`,
            LastName: `${LastName}`,
            Email: `${Email}`,
            Phone: `${Phoneno}`,
            NPI: `${NPI}`,
            SpecialtyTypeId: `${selected}`
         }
         console.log(data)
         const url=URL.Register;
         fetch(url,{
         
          method: 'POST',
         headers: { 
            
            'Content-Type': 'application/json' 
            },
         body:JSON.stringify(data)
         
         }).then(response=>response.json()).then(json=>{
         console.log(json)
        
         if(json.Profile==="User Registered Successfully"){
        popupshow(); 
        
         }
         else{
          //  Alert.alert(json.error)
          const error=`${json.Profile||json.error}`
          console.log(json)

          popuperrorshow(error);
         }
        
         })}

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
      
             useEffect(()=>{
              SpecialtyList()
             
            
             },[]);
      const renderItem = item => {
          return (
            <View style={styles.item}>
              <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
          );
        }; 

   

    const animatedValue = new Animated.Value(0)

    const animatedValueInterpolateScale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95]
    })
   
// Signup button press animation

    const pressInHandler = () => {
        Animated.timing(
            animatedValue,
            {
                toValue: 1,
                duration: 150,
                useNativeDriver:true
            }
        ).start()
    }

    const pressOutHandler = () => {
        Animated.timing(
            animatedValue,
            {
                toValue: 0,
                duration: 150,
                useNativeDriver:true,
            }
        ).start()
    }
    useEffect(()=>{
    Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
},[]);

//popup alert msg function

const popupshow=()=>{
  
   
Popup.show({
  type: 'Success',
  title: 'Registered Complete',
  button: true,
  button2:false,
  textBody: 'Your Registration Successfully done',
  buttonText: 'Ok',
  callback: () => {Popup.hide()
  navigation.navigate('Login')
  },
  callback2:()=>{
    Popup.hide()
    console.log('hide')}
})

  
}
const popuperrorshow=(error)=>{
  return(
   
Popup.show({
  type: 'Warning',
  title: 'Alert',
  button: true,
  button2:false,
  textBody: `${error}`,
  buttonText: 'Ok',
  callback: () => {Popup.hide()
 
  },
    
  callback2:()=>{
    Popup.hide()
    console.log('hide')}
})

  )
}

    const Square=({scrollx})=>{
        return(
            <Animated.View style={{flex:1,transform: [
                {
                  translateY: SlideInLeft.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }
              ],
                 }}>
            <Animated.View
            style={{
                 height:responsiveWidth(250),
                width:responsiveWidth(250),
                backgroundColor:'#eaeaea',
                borderRadius:8,
                position:'absolute',
               top:responsiveHeight(25),
               left:responsiveWidth(-105),
               transform:[{
               rotate:'45deg'
                 }]
            }}>

            </Animated.View>
            </Animated.View>

)}

const ref_input1 = useRef();
    const ref_input2=useRef();
    const ref_input3=useRef();
    const ref_input4=useRef();
    const ref_input5=useRef();
    const ref_input6=useRef();

    return (
      <Root>
        <ScrollView bounces={false} style={{backgroundColor:'#EAEAEA',flex:1,marginBottom:0}}>
          
          
    
<KeyboardAvoidingView behavior='position' keyboardVerticalOffset={FirstName!=null?-200:0}>
        <Animated.View style={{ flex: 1, backgroundColor: '#11266c' }}>
        <View style={{borderWidth:0,marginTop: responsiveHeight(10),width:"100%"}}>
            <Text style={{ color: '#eaeaea', fontFamily: 'SpaceGrotesk-Regular' ,aspectRatio:4/1, 
            fontSize: 36, textAlign: 'center' }}><Text style={{ fontStyle:'italic'}}>Vis<Text style={{  fontWeight: 'bold',fontStyle:'italic'}}>Doc</Text></Text></Text>
            </View>
           {/* <TouchableOpacity style={{top: "15%", alignSelf:'flex-end',marginRight:scale(40),height:scale(50),width:scale(50) }} >
            <SvgXml
                
                xml={NeedySvg}
                width={50}
                height={50}/>
                <Text style={{ color: '#808080',fontSize: scale(13),textAlign:'center', fontFamily: 'SpaceGrotesk-Regular', }}>Needy</Text>
            </TouchableOpacity>
            */
    }
           <Square/>
         
    
    
           
            <View style={{ borderWidth:0,marginTop:responsiveHeight(10),paddingLeft:changeWidth>500?responsiveWidth(15):responsiveWidth(6),paddingRight:changeWidth>500?responsiveWidth(25):responsiveWidth(6)}}>
    
          <View style={{marginLeft:30}}>
            <SvgXml
                
                xml={SignUpSvg}
                width={60}
                height={60}/>
                </View>
               
               
                <Text style={{ color: '#11266c', fontSize: 36, fontFamily: 'SpaceGrotesk-Regular',left:10 }}>Sign up</Text>
                <Text style={{ color: '#11266c', fontSize: 12, textAlign: 'left', fontFamily: 'SpaceGrotesk-Regular',left:10,marginTop: 10, }}>Doctor, to schedule and view </Text>
                <Text style={{ color: '#11266c', fontSize: 12, textAlign: 'left', fontFamily: 'SpaceGrotesk-Regular',left:10}}>the status for your appointments</Text>
              <View style={{height:70,justifyContent:'center',marginTop:30}}>
                <TextInput  placeholderTextColor={'#808080'}
                    mode='flat'
                    theme={Theme}
                    backgroundColor='transparent'
                    onSubmitEditing={()=>ref_input1.current.focus()}
                    label={"First Name"}
                    onChangeText={(text)=>{setFirstName(text)
                    setfirstnameAlert(false);
                    }}
                    value={FirstName}
                    labelStyle={{
                        color:'black'
                    }}
                   underlineColor='#11266C'
                   activeUnderlineColor="#11266C"
                 

                    style={styles.textinput}
                />
                </View>
                {firstnameAlert&&(
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Ionicons name='warning'color={'#e6c402'} size={16}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular',left:5}}>First name is required</Text>
                </View>
                )}
                <View style={{height:70,justifyContent:'center'}}>
                <TextInput
                  mode='flat'
                  theme={Theme}
                  ref={ref_input1}
                  onSubmitEditing={()=>ref_input2.current.focus()}
                  backgroundColor='transparent'
                  label={"Last Name"}
                  onChangeText={(text)=>{setLastName(text)
                  setlastnameAlert(false);
                  }}
                  value={LastName}
                  labelStyle={{
                      color:'black'
                  }}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
                placeholderTextColor={'#808080'} 
                    style={styles.textinput}
                />
                </View>
                {lastnameAlert&&(
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Ionicons name='warning'color={'#e6c402'} size={16}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular',left:5}}>Last name is required</Text>
                </View>
                )}
                <View style={{height:70,justifyContent:'center'}}>
                <TextInput
                  mode='flat'
                  theme={Theme}
                  ref={ref_input2}
                  onSubmitEditing={()=>Keyboard.dismiss()}
                  backgroundColor='transparent'
                  label={"Email"}
                  onChangeText={(text)=>{setEmail(text)
                  setEmailAlert(false);
                  }}
                  value={Email}
                  labelStyle={{
                      color:'black'
                  }}
                  underlineColor='#11266C'
                  activeUnderlineColor="#11266C"
               placeholderTextColor={'#808080'} 
                    style={styles.textinput}
                />
                </View>
                {EmailAlert&&(
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Ionicons name='warning'color={'#e6c402'} size={16}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular',left:5}}>Email is required</Text>
                </View>
                )}
                <View style={{marginTop:20,justifyContent:'center',marginLeft:10,borderWidth:0,marginRight:10}}>
                <View style={styles.container}>
      
      <MultiSelect
      
      dropdownPosition='top'
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
       selectedTextStyle={styles.selectedStyle}
       itemContainerStyle={{borderBottomWidth:1,borderBottomColor:'#808080'}}
       containerStyle={{paddingLeft:12,paddingRight:12}}
       itemTextStyle={{fontSize:12,color:'#808080',fontFamily:'SpaceGrotesk-Regular'}}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={
          SpecialityList?.map((item,index)=>{
            return{
              key:item.SpecialityId,label:item.Speciality,value:item.SpecialityId
            }
          })}
        activeColor='#808080'

       // maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Specialities"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
          
        }}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Entypo color='#808080' name="cross" size={18} />
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    </View>
                <View style={{height:70,marginTop:5,justifyContent:'center',}}>
                 <TextInput 
                   mode='flat'
                   ref={ref_input3}
                   theme={Theme}
                   backgroundColor='transparent'
                   label={"NPI Number"}
                   returnKeyType = {"next"}
                   maxLength={10}
                   onChangeText={(text)=>{setNPI(text)
                    ref_input3.current.focus()
                  setNpiAlert(false);
                  }}
                   value={NPI}
                   labelStyle={{
                       color:'black'
                   }}
                   underlineColor='#11266C'
                   activeUnderlineColor="#11266C"
                 placeholderTextColor={'#808080'} keyboardType='numeric'
                    style={styles.textinput}
                />
                </View>
                {NpiAlert&&(
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Ionicons name='warning'color={'#e6c402'} size={16}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular',left:5}}> NPI is required</Text>
                </View>
                )}
                <View style={{height:70,justifyContent:'center'}}>
                 <TextInput 
                   mode='flat'
                   theme={Theme}
                   backgroundColor='transparent'
                   label={"Phone Number"}
                   onChangeText={phNumber=>{phoneFormat(phNumber)
                  setPhoneAlert(false);
                  }}
                   value={Phoneno}
                   labelStyle={{
                       color:'black'
                   }}
                   underlineColor='#11266C'
                   maxLength={12}
                   activeUnderlineColor="#11266C"
                 placeholderTextColor={'#808080'} keyboardType='numeric'
                    style={styles.textinput}
                />
          </View>
          {PhoneAlert&&(
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Ionicons name='warning'color={'#e6c402'} size={16}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular',left:5}}>Phone number is required</Text>
                </View>
                )}
         
         <View style={{borderWidth:0,flexDirection:'row',marginTop:32,paddingLeft:12,paddingRight:0,justifyContent:"space-between"}} >
            <View>
            <Text style={{ color: '#808080', fontSize: 13,marginTop:0, fontFamily: 'SpaceGrotesk-Regular', }}>Already member ?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={{ color: '#0071bc', fontSize: 13,  marginLeft: 0, fontFamily: 'SpaceGrotesk-Regular', }}>Login</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={2} onPress={AlertMsg} onPressIn={pressOutHandler} onPressOut={pressInHandler}
               >
                
                <Animated.View
               style={{ width: 120,transform: [{ scaleX: animatedValueInterpolateScale }, { scaleY: animatedValueInterpolateScale }], height: 40, 
                 backgroundColor: 'green',justifyContent:'center',
                 borderRadius: 8, }}>
                    <Text style={{ color: '#eaeaea', fontSize: 22, textAlign: 'center', fontFamily: 'SpaceGrotesk-Regular', }}>Sign Up</Text>
                    </Animated.View>
                </TouchableOpacity>
                </View>
                <View style={{marginTop:10,alignSelf:'flex-end',borderWidth:0,marginBottom:30,alignItems:'flex-end'}}>
                <Text style={{ color: '#808080', fontSize: 12, fontFamily: 'SpaceGrotesk-Regular' }}>By submitting you agree</Text>
                <Text style={{ color: '#0071bc',fontSize: 12, fontFamily: 'SpaceGrotesk-Regular',alignSelf:'flex-end' }}><Text style={{ color: '#808080'}}>the</Text> Terms & Conditions</Text>
                </View>
           
                
            </View>
           
            
        </Animated.View>
        </KeyboardAvoidingView>
        </ScrollView>
        </Root>
    )
}
export default Signin;

const styles = StyleSheet.create({
    container: {
      // marginLeft:scale(8),
     
     
        borderBottomWidth:1,
        borderBottomColor:'#11266c',
    },
    textinput:{
        borderBottomWidth: 0,backgroundColor:'transparent',
         borderBottomColor: '#333333', fontFamily: 'SpaceGrotesk-Regular', color: '#333333', fontSize: 17
    },
    dropdown: {
        borderBottomWidth:0,
      height: 35,
      backgroundColor: 'transparent',
      borderRadius: 12,
      
    //  top:moderateScale(-8)
      
    },
  
   
    iconStyle:{
        marginTop:0
         },
      selectedTextStyle: {
      fontSize: 12,
      color:'#333333',
      fontFamily: 'SpaceGrotesk-Regular',
      marginLeft:10,
     
    },
    label: {
        position: 'absolute',
       
        left: 17,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
        color:'#3C8DBC'
      },
      placeholderStyle: {
        fontSize: 12,
        top:-5,
        //left:scale(5),
        color:'#808080',
        fontFamily:'SpaceGrotesk-Regular',
        //marginLeft:10
        
      },
      inputSearchStyle: {
      fontSize: 12,
      fontFamily: 'SpaceGrotesk-Regular',
      color:'#333333',
      height:40

    },
    item: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth:0,
      borderBottomColor:'#333333',
      marginLeft:25,
      marginRight:25
    },
    selectedStyle: {
      flexDirection:'row',
      borderRadius: 8,
      backgroundColor: '#e6c402',
      shadowColor: '#000',
      fontSize:12,
      fontFamily: 'SpaceGrotesk-Regular',
      margin : 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1.2,
      shadowRadius: 1.41,
  
      elevation: 10,
      paddingHorizontal:6,
      paddingVertical:3
    },
    textSelectedStyle: {
      marginRight: 5,
      fontSize: 12,
      fontFamily: 'SpaceGrotesk-Regular',
      color: '#333333',
    },
})
