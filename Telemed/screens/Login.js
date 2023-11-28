import { Image, StyleSheet, Text, TouchableOpacity, View,Animated,Dimensions,LayoutAnimation,KeyboardAvoidingView,
PixelRatio,Alert,ActivityIndicator } from 'react-native'
import React,{useState,useEffect,useCallback,useRef} from 'react';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import  { AppDimensions } from './Components/Dimensions';
import TextInput from './Components/react-native-paper/lib/module/components/TextInput/TextInput'
import { ScrollView } from 'react-native-gesture-handler';

import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DeviceInfo, { getDeviceId } from 'react-native-device-info';
import { Platform} from 'react-native'
import PushNotification,{Importance} from 'react-native-push-notification';
import messaging, { firebase }  from "@react-native-firebase/messaging";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions,NavigationActions  } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg/src/xml';
import LoginSvg from './Components/LoginSvg';
import { Root, Popup ,Toast} from '../screens/Components/popup-ui';



import {
  useDimensionsChange,
  useResponsiveHeight,
  useResponsiveWidth,
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import URL from './Components/URL';

const Login = ({navigation}) => {
    const[Visible,setVisible]=useState(true);
    const[Email,setEmail]=useState('');
    const[Password,setPassword]=useState('');
    const[isLoading,setisLoading]=useState(true);
    const[Token,setToken]=useState(false);
    const[SlideInLeft,setSlideInLeft]=useState(new Animated.Value(0))
    const[Enable,setEnable]=useState(true);
    const[alertmessage,setalertmessage]=useState(false);
    const[deviceId,setdeviceId]=useState('');
    const navigation1 = useNavigation();
    const[changeWidth,setchangeWidth]=useState(AppDimensions.FULL_WIDTH)
    const[EmailAlert,setEmailAlert]=useState(false);
    const[PasswordAlert,setPasswordAlert]=useState(false);


   
   useDimensionsChange(
  useCallback(({ window, screen }) => {
  
    setchangeWidth(window.width)
 
  }, [])  
); 

const popupshow=()=>{
  
   
  Popup.show({
    type: 'Warning',
    title: 'Alert',
    button: true,
    button2:false,
    textBody: 'Invalid UserName/Password',
    buttonText: 'Ok',
    callback: () => {Popup.hide()
   
    },
    callback2:()=>{
      Popup.hide()
      console.log('hide')}
  })
  
    
  }
  
    
      useEffect(() => {
      
         
       DeviceInfo.getUniqueId().then((device)=>{  //DeveiceInfo get device information
      //  console.log(device)
        setdeviceId(device);
        
      })
          
      }, [])
      
  
    const ToSignup = () => {
        navigation.navigate('Signin')
    }
    const ToLogin = () => {
   
    // LoginValidate();
    AlertMsg()
  
  }

 
useEffect(()=>{
   
      if(Platform.OS==='ios'){
       // messaging().registerDeviceForRemoteMessages()

        messaging().getToken()
  .then(fcmToken => {

    console.log(fcmToken);
    setToken(fcmToken);
      // DeviceInfo.getDeviceToken().then((deviceToken) => {
      //   // iOS: "a2Jqsd0kanz..."
      //   console.log(deviceToken)
      //  const Token=deviceToken
      //  setToken(Token)
       
      
      // });
    })}
   else{
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
     // console.log("TOKEN:", token.token);
      const Token=token.token
      setToken(Token)
    
        },
      })

   }
     
    },[])


 


const AlertMsg=()=>{

  if(!Email.trim()){
    setEmailAlert(true);
  }
   if(!Password.trim()){
    setPasswordAlert(true);
  }
else if(Email.length!=0 && Password.length!=0){
  LoginValidate();
}

}

  
       

  const LoginValidate=async()=>{

   // setspinner(true)
     const data={
      Username: `${Email}`,
      Password: `${Password}`,
      DeviceId: `${deviceId}`,
      DeviceToken: `${Token}`,
      DeviceType: `${Platform.OS}`
    }
    console.log(data)
    const url=URL.Login;
    fetch(url,{
    
     method: 'POST',
    headers: { 
       
       'Content-Type': 'application/json' 
       },
    body:JSON.stringify(data)
    
    }).then(response=>response.json()).then(json=>{
    console.log(json)
    //setspinner(false)
    if((json.User==="Invalid Username/Password")||(json.User==="Invalid get/Password")){
      console.log("error")
      popupshow()
    //  Alert.alert(json.User)
   // setalertmessage(true)
    }
    else{
      
    const role=json.User
    
    AsyncStorage.setItem('Login', JSON.stringify(role));
    if(role.Rolename==="Facility Scribe"){
      const Scribe="FacilityScribe"
      navigation.dispatch(StackActions.replace('DrawerNavigator',{ID:role.UserId,Scribe}));
    }
    else if(role.Rolename==="HomeHealth Scribe"){
      const Scribe="HomehealthScribe"
      navigation.dispatch(StackActions.replace('DrawerNavigator',{ID:role.UserId,Scribe}));
    }
    else if(role.Rolename==="Scribe"){
      const Scribe="Scribe"
      navigation.dispatch(StackActions.replace('DrawerNavigator',{ID:role.UserId,Scribe}));
    }
   else if(role.Rolename==="Facility HomeHealth Scribe"){
      const Scribe="FacilityHomehealthScribe"
      navigation.dispatch(StackActions.replace('DrawerNavigator',{ID:role.UserId,Scribe}));
    }
   else if(role.Rolename==="Provider"){
      const Scribe="Provider"
      navigation.dispatch(StackActions.replace('DrawerNavigator',{ID:role.UserId,Scribe}));
     // navigation.navigate('Appointments',{ID:role.UserId,Scribe})
    }
    else if(role.Rolename==="Hospitalist"){
      const Scribe="Hospitalist"
      navigation.dispatch(StackActions.replace('DrawerNavigator',{ID:role.UserId,Scribe}));
     
     // navigation.navigate('Appointments',{ID:role.UserId,Scribe})
    }
  
  }})}

    const fontConfig = {
        default: {
          regular: {
            fontFamily: 'SpaceGrotesk-Regular',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'SpaceGrotesk-Regular',
            fontWeight: 'normal',
          },
          light: {
            fontFamily: 'SpaceGrotesk-Regular',
            fontWeight: 'normal',
          },
          thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal',
          },
        },
      };

      const theme = {
        ...DefaultTheme,
        fonts: configureFonts(fontConfig),
      };
   
    

    const animatedValue = new Animated.Value(0)

    const animatedValueInterpolateScale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.95]
    })
    useEffect(()=>{
      Animated.timing(SlideInLeft, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }).start();
  },[]);
  

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
                 height:responsiveWidth(200),
                width:responsiveWidth(200),
                backgroundColor:'#eaeaea',
                borderRadius:8,
                position:'absolute',
               top:160,
               left:responsiveWidth(-76),
               transform:[{
               rotate:'45deg'
                 }]
            }}>

   

            </Animated.View>
            </Animated.View>
        )
    }
    const ref_input2 = useRef();
    const ref_Login=useRef();

    return (
      <Root>
      
        <ScrollView  bounces={false} style={{flex:1,backgroundColor:'#EAEAEA'}}>
        <KeyboardAvoidingView behavior={'position' }>
       
            <PaperProvider theme={theme}>
        <View style={{ flex: 1, backgroundColor: '#11266c' }}>
       <View style={{borderWidth:0,marginTop: responsiveHeight(7),width:"100%"}}>
            <Text style={{ color: '#eaeaea', fontFamily: 'SpaceGrotesk-Regular' ,aspectRatio:4/1, 
            fontSize: 36, textAlign: 'center' }}><Text style={{ fontStyle:'italic'}}>Vis<Text style={{ fontWeight: 'bold',fontStyle:'italic'}}>Doc</Text></Text></Text>
            </View>
        
           <Square/>
          
           {Visible&&(
            <View >
           <View style={{marginTop:responsiveHeight(10),paddingLeft:changeWidth>500?responsiveWidth(15):responsiveWidth(6),paddingRight:changeWidth>500?responsiveWidth(25):responsiveWidth(6)}}>
            <View style={{}}>
                <View style={{top:-20,marginLeft:10}}>
                  <View style={{marginLeft:25,marginTop:10}}>
                <SvgXml
                
            xml={LoginSvg}
            width={60}
            height={60}/>
            </View>
        <Text style={{ color: '#11266c', fontSize: 36,  marginLeft:0 ,marginTop:20, fontFamily: 'SpaceGrotesk-Regular', }}>Login</Text>
        <Text style={{ color: '#11266c', fontSize: 12,marginLeft:0, fontFamily: 'SpaceGrotesk-Regular', marginTop: 10, top: 0, left: 0 }}>to schedule or view status 
        </Text><Text style={{ color: '#11266c', fontSize: 12,marginLeft:0, fontFamily: 'SpaceGrotesk-Regular'}}>of appointments</Text>
    </View>
    </View>
    <View style={{height:55,borderWidth:0,justifyContent:'center',marginTop:responsiveHeight(6)}}>
            <TextInput 
            theme={theme}
            onSubmitEditing={() => ref_input2.current.focus()}
            mode='flat'
            backgroundColor='transparent'
            autoCompleteType="off"
            importantForAutofill="no"
            labelStyle={{
                color:'black',
                fontFamily: 'SpaceGrotesk-Regular'
              }}
              onChangeText={(text)=>{setEmail(text)
                setEmailAlert(false)}
              }
              Value={Email}
           underlineColor='#11266C'
           activeUnderlineColor="#11266C"
           label={"Email"}
            placeholderTextColor={'#808080'} keyboardType='email-address'
                    style={{ borderBottomWidth: 0,backgroundColor:'transparent', borderBottomColor: '#11266C',fontFamily: 'SpaceGrotesk-Regular', color: '#333333', fontSize: 17 }}
                /> 
              
                </View>
               {EmailAlert&&(
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Ionicons name='warning'color={'#e6c402'} size={14}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular',left:5}}>Email is required</Text>
                </View>
               )}
               
               
                <View style={{height:55,marginTop:15,borderWidth:0,justifyContent:'center'}}>
               
                  <TextInput 
                   theme={theme}
                   ref={ref_input2}
                    mode='flat'
                  //  returnKeyType = {"next"}
                    backgroundColor='transparent'
                   // onSubmitEditing={() =>ToLogin() }
                    
                    label={"Password"}
                    labelStyle={{
                        color:'black',
                        fontFamily: 'SpaceGrotesk-Regular'
                    }}
                   onChangeText={(text)=>{setPassword(text)
                  setPasswordAlert(false)
                  }}
                   Value={Password}
                    underlineColorAndroid={'tranaparent'}
                    underlineColor='#11266C'
                    autoCompleteType="off"
                     importantForAutofill="no"
                    secureTextEntry={Enable}
                    activeUnderlineColor="#11266C"
                    placeholderTextColor={'#808080'} 
                    style={{ borderWidth: 0,backgroundColor:'transparent',fontFamily: 'SpaceGrotesk-Regular', color: '#333333', fontSize: 17 }}
                /> 
                 <TouchableOpacity onPress={()=>setEnable(!Enable)} style={{position:'absolute',alignSelf:'flex-end',right:10}}>
  {Enable?(
<Feather name="eye-off" color={'black'} size={20} />
):(
<Feather name="eye" color={'black'} size={20} />
)}
</TouchableOpacity>
                </View>
                {PasswordAlert&&(
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                <Ionicons name='warning'color={'#e6c402'} size={16}/>
                <Text style={{fontSize:12,color:'red',fontFamily: 'SpaceGrotesk-Regular',left:5}}>Password is required</Text>
                </View>
                )}
                  <View style={{flexDirection:'row',marginTop:responsiveHeight(6),justifyContent:"space-between"}}>
                    <View>
                    <Text style={{ color: '#808080', fontSize: 12,top:-5,  marginLeft: 15,fontFamily: 'SpaceGrotesk-Regular' }}>Not a member ?</Text>
                    <TouchableOpacity onPress={()=>ToSignup()}>
                    <Text style={{ color: '#0071bc', fontSize:12,top:-5,  marginLeft: 15,fontFamily: 'SpaceGrotesk-Regular', }}>Sign Up</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={2} onPress={()=>ToLogin()}onPressIn={pressOutHandler} onPressOut={pressInHandler} 
                   ref={ref_Login}
                  >
                  <Animated.View
                 
                  style={{ width: 120, height: 40,justifyContent:'center', backgroundColor: 'green',transform: [{ scaleX: animatedValueInterpolateScale }, { scaleY: animatedValueInterpolateScale }],marginTop:0, borderRadius: 8 }}>
                        <Text style={{ color: '#eaeaea', fontSize: 22, textAlign: 'center',fontFamily: 'SpaceGrotesk-Regular'}}>Log in</Text>
                  </Animated.View>
                   
                    </TouchableOpacity>
                   
                    </View>
                     {/*

                    <Text style={{ color: '#0071bc', fontSize: scale(12), marginLeft: scale(10),fontFamily: 'SpaceGrotesk-Regular',marginTop:scale(10),marginBottom:scale(20) }}>Forgot Password ?</Text>
                 */
              }
                    </View>
            
                </View>
               )} 
        </View>
        </PaperProvider>
        </KeyboardAvoidingView>
        </ScrollView>
        </Root>
    )
}
export default Login;

const styles = StyleSheet.create({})
