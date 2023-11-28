import { StyleSheet, Text, View,SafeAreaView, Image, TouchableOpacity,BackHandler,RefreshControl,addEventListener, ScrollView,Animated,Alert,Easing,LayoutAnimation } from 'react-native'
import React, { useEffect, useState ,useCallback} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions,CommonActions } from '@react-navigation/native'

import DeviceInfo, { getDeviceId } from 'react-native-device-info';


import useProgressViewOffset1 from './Components/ProgressViewOffsetlo';
import { Root, Popup ,Toast} from './Components/popup-ui';
import { responsiveHeight, responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions'
import { useNotes } from './NoteProvider'

const Profile = ({route}) => {
//const{ID,Scribe}=route.params;
    const[SlideOutdown,setSlideOutdown]=useState(new Animated.Value(100))
    const [refreshing, setRefreshing] = useState(false);
    const[showScribePro,setshowScribePro]=useState(false);
    const[deviceid,setdeviceid]=useState(false);
   const{ID,Scribe}=useNotes();
   
    useDimensionsChange(
      useCallback(({ window, screen }) => {
       
       // setchangeWidth(window.width)
       // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }, [])  
    ); 
    const ToAppointments = () => {
       navigation.navigate('Appointments')
      }
const slideout=()=>{
  
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      SetShowInfo(!showInfo);
    }


    const slideout1=()=>{
  
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        SetShowContact(!showContact) 
        }
        const Scribeslideout=()=>{
  
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setshowScribePro(!showScribePro) 
            }
        const slideout2=()=>{
    
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShowProf(!showProf)
          }
          const slideout3=()=>{
    
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShowSpecial(!showSpecial)
            }
            const slideout4=()=>{
    
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setShowAvail(!showAvail)
                }
             const slideout5=()=>{
    
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setShowVisitType(!showVisitType)
                    }

         const slideout6=()=>{
    
         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
         setShowAddress(!showAddress)
          }        
          const slideout7=()=>{
    
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShowSpecial(!showSpecial)
            } 



      const ToEditPersonalInfo = () => {
        navigation.navigate('EditPersonalInfo',{ProfileInfo,ID,Scribe})
      }

    const [selectedValue, setSelectedValue] = useState("Active");
    const [showInfo, SetShowInfo] = useState(false);
    const [showContact, SetShowContact] = useState(false);
    const [showSpecial, setShowSpecial] = useState(false);
    const [showAvail, setShowAvail] = useState(false);
    const [showAddress, setShowAddress] = useState(false);

    const {ProfileInfo,fetchID} = useNotes();
    //const[ProfileInfo,setProfileInfo]=useState([]);
    const[showVisitType,setShowVisitType]=useState(false);
  
   
    const[showProf,setShowProf]=useState(false);
  
    const[HomehealthName,setHomehealthName]=useState(ProfileInfo?.HomehealthCompanies);
    const[FacilityName,setFacilityName]=useState(ProfileInfo?.Facilities);
    const progressViewOffset = useProgressViewOffset1();
    const [status, setStatus] = useState('idle');
   

   

    const url=`https://visdocapidev.azurewebsites.net/api/profile/${ID}`
   
   
   
      const popuperrorshow=(error)=>{
      
         
      Popup.show({
        type: 'Warning',
        title: 'Logout',
        button: true,
        button2:true,
        textBody: `Are You Sure Logout!`,
        buttonText: 'Yes',
        button2Text:'No Thanks',
        callback: () => {Popup.hide()
          Logout();
       
        },
          
        callback2:()=>{
          Popup.hide()
          console.log('hide')}
      })
        }

   
     const navigation = useNavigation();
    //  const clearAll = async () => {
    //     try {
    //     await AsyncStorage.clear();
    //     console.log('Done');
    //    // navigation.dispatch(StackActions.replace('Login'));
    //    navigation.dispatch(
    //     CommonActions.reset({
    //       index: 1,
    //       routes: [
    //         { name: 'Login' },
           
    //       ],
    //     })
    //   );
    //     } catch (error) {
    //     console.log(error);
    //     }
    //     };

     

       // BackHandler.addEventListener('hardwareBackPress', onBackPress)

      //  useEffect(()=>{
      // DeviceInfo.getUniqueId().then((device)=>{
      //   console.log(device)
      //   setdeviceid(device);
      //  })

      //  },[])
       
      //  const ToggleOff=()=>{
      //   if(Scribe==="Provider"|| Scribe==="Hospitalist"){
      //   const data={
      //     ProviderId:`${ID}`,
      //     Status: "Off"
      //   }
        
      //     const Url=`https://visdocapidev.azurewebsites.net/api/CurrentAvailability/ToggleOff`;
      //   fetch(Url,{
      //     method:'PUT',
      //     headers:{
      //       'Content-Type':'application/json'
      //     },
      //     body:JSON.stringify(data)
      //   }).then(response=>response.json()).then(json=>{
      //     console.log(json);
      //   })
      // }else{
      //   console.log('Not a provider')
      // }
        
      //   }

      //  const Logout=async()=>{

      //   // setspinner(true)
      //    const data={
      //      UserId:`${ID}`,
      //      DeviceId: `${deviceid}`,
          
      //    }
      //    console.log(data)
      //    const url="https://visdocapidev.azurewebsites.net/api/Logout"
      //    fetch(url,{
         
      //     method: 'POST',
      //    headers: { 
            
      //       'Content-Type': 'application/json' 
      //       },
      //    body:JSON.stringify(data)
         
      //    }).then(response=>response.json()).then(json=>{
      //    console.log(json)
      //    if(json.Result==="LogOut Successsfully"){
      //    clearAll();
      //   ToggleOff();
      //    }
      //    else{
      //       console.log('error')
      //    }
      //    })}



    

    useEffect(()=>{
         console.log(ProfileInfo)
         fetchID()
     }, []);

        const onRefresh=()=>{
            setRefreshing(true)
        
            setTimeout(() => {
                setRefreshing(false);
              }, 3000);
        }
   

    return (
      <Root>
     
        <SafeAreaView style={{ flex: 1, backgroundColor: '#11266c'}}>

         
       
            <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center' }}>
                <TouchableOpacity onPress={()=>  navigation.openDrawer()} style={{borderWidth:0,marginLeft:responsiveWidth(5)}}>
                 <Entypo style={{}} name='menu' color={'#e6c402'} size={22} /> 
                {/* <Octicons style={{ color: '#e6c402', top: 0  }} name='arrow-left' size={22} /> */}
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular'}}>Profile</Text>
            </View>
            <ScrollView 
          
        
      
            refreshControl={
              <RefreshControl
            
             progressViewOffset={progressViewOffset}
             
               refreshing={refreshing} onRefresh={()=>onRefresh()} />
            }
                  contentContainerStyle={{paddingBottom:50}}
                  >
          
            <View style={{ height: "100%", backgroundColor: '#dcdcdc', marginTop: 130, borderRadius: 8 }}>
                <View style={{borderWidth:0, height:responsiveHeight(38),marginLeft:responsiveWidth(5), backgroundColor: '#eaeaea', marginRight: responsiveWidth(5),borderRadius: 8, marginTop: -125 }}>
                    <View style={{padding:20,borderWidth:0}}>
                        <View style={{flexDirection:'row',marginTop:0,borderWidth:0,justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row'}}>
                        <Text style={{ color: '#333333', fontSize:12,fontFamily: 'SpaceGrotesk-Regular'}}>Status :</Text>
                       <Text style={{color:'green',fontFamily: 'SpaceGrotesk-Regular',fontSize:12,paddingLeft:10}}>Active</Text>
                        <MaterialIcons style={{ color: '#333333', marginTop: 0, marginLeft: 0 }} name='arrow-drop-down' size={20} />
                        </View>
                      {/*  <View style={{flexDirection:'row',justifyContent:'flex-end',borderWidth:0}}>
                        <Image source={require('../images/link.png')} style={{ height:scale(15),width:scale(15), marginLeft: 5 }}/>
                        <Image source={require('../images/sms.png')} style={{ height: scale(15),width:scale(15),marginLeft:scale(15) ,borderRadius:scale(3) }} />
                        <Image source={require('../images/whatsapp.png')} style={{ height: scale(15),width:scale(15),marginLeft:scale(15),borderRadius:scale(3) }} />
                        <Image source={require('../images/mail.png')} style={{ height: scale(15),width:scale(15),marginLeft:scale(15),borderRadius:scale(3)}} />
                        </View>
        */}
                        </View>
                        
                        <View style={{ width: 110, height: 115, backgroundColor: '#dcdcdc', alignSelf: 'center',alignItems:'center',justifyContent:'center', marginTop: 20, borderRadius: 5 }}>
                            <Entypo style={{ color: 'white', alignSelf: 'center', }} name='camera' size={30} />
                        </View>
                        <View style={{marginTop: 25,borderWidth:0}}>
                        <Text onPress={()=>ToAppointments()} style={{ color: '#333333', fontSize: 22,  alignSelf: 'center',fontFamily: 'SpaceGrotesk-Regular' }}>{ProfileInfo?.DisplayName||'Name'}</Text>
                        {((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                        <Text style={{ color: '#808080', fontSize: 12, marginTop: 10, alignSelf: 'center',fontFamily: 'SpaceGrotesk-Regular' }}>NPI : {ProfileInfo?.NPI||'NPI'}</Text>
                        )}
                          {(Scribe==="FacilityScribe")&&(
                        <Text style={{ color: '#808080', fontSize: 12, marginTop: 10, alignSelf: 'center',fontFamily: 'SpaceGrotesk-Regular' }}>{ProfileInfo?.Facilities[0]?.FacilityName}</Text>
                        )}
                         {(Scribe==="HomehealthScribe")&&(
                        <Text style={{ color: '#808080', fontSize: 12, marginTop: 10, alignSelf: 'center',fontFamily: 'SpaceGrotesk-Regular' }}>{HomehealthName[0]?.HomeHealthCompanyName}</Text>
                        )}
                        </View>
                    </View>
                </View>
                <View style={{padding:responsiveWidth(5),borderWidth:0}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{marginLeft:0,color:'#11266c',fontFamily: 'SpaceGrotesk-Regular',fontSize:15}}>Profile</Text>
                    <Text style={{marginLeft:0,color:'red',fontFamily: 'SpaceGrotesk-Regular',fontSize:15}}>100%<Text style={{color:'#11266c'}}> Completed</Text></Text>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#808080', alignSelf: 'center' }}>
                   <View style={{width:10,height:10,borderRadius:30,backgroundColor:'white',borderColor:'#11266c',borderWidth:1,position:'absolute',marginTop:-5,left:'100%'}}>
                        
                    </View>
                    </View>
                    <Text style={{marginTop: 5,alignSelf:'flex-end',fontSize:12,fontFamily: 'SpaceGrotesk-Regular',color:'#808080'}}>
                        <Ionicons name='warning'color={'#e6c402'}/> In-completion of profile will affect the schedule</Text>
                </View>
                   
                <View style={{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}}>     
                <TouchableOpacity  style={[]}
                onPress={() => {
                 slideout()}}>
                    <View style={[styles.detailflow]}>
                    {showInfo?(

                    <Text style={styles.Minus}>-</Text>
                    ):(
                    <Text style={styles.Plus}>+</Text>
                    )}
              
                    <Text style={styles.ContentTitle}>Personal info</Text>
                    

                    <Feather style={styles.Feather} name='check' size={28} />
                
               
                    </View> 
                </TouchableOpacity>
                {!showInfo&&(
                <View style={styles.Line}/>
                )}
                {
                    showInfo ? (

                        <Animated.View style={{  marginLeft: 30, marginTop:-10 ,
                      }}>
                            
                            <Text style={styles.InnerContentText1}>First Name</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.FirstName}</Text>
                            <Text style={styles.InnerContentText1}>Last Name</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.LastName}</Text>
                            <Text style={styles.InnerContentText1}>Nick Name</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.DisplayName}</Text>
                          {((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                            <View>
                            <Text style={styles.InnerContentText1}>NPI</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.NPI}</Text>
                           
                            <Text style={styles.InnerContentText1}>CMD Provider Number</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.CMDProviderNumber}</Text>
                            </View>
                            )}
                         <TouchableOpacity onPress={()=>ToEditPersonalInfo()} style={styles.ModifyButton}>
                            <Text  style={styles.Modify}>Modify</Text>
                            </TouchableOpacity>
                        </Animated.View>

                    ) : null
                }

                <TouchableOpacity style={[styles.detailflow,{borderWidth:0}]} onPress={() => {slideout1() }}>
                  
                {showContact?(

           <Text style={styles.Minus}>-</Text>
             ):(
           <Text style={styles.Plus}>+</Text>
            )}
                    
                    <View style={{marginLeft:0}}>
                    <Text style={styles.ContentTitle}>Contact</Text>
                    </View>
                    <Feather style={ styles.Feather} name='check' size={28} />
                </TouchableOpacity>
                {!showContact&&(
                <View style={styles.Line}/>
                )}
                {
                    showContact ? (

                        <Animated.View style={{marginLeft: 30}}>
                           
                            <Text style={styles.InnerContentText1}>Phone Number</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.Phone}</Text>
                            <Text style={styles.InnerContentText1}>Email</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.Email}</Text>
                            {((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                            <View>
                            <Text style={styles.InnerContentText1}>Work Fax</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.WorkFax}</Text>
                        </View>
                            )}
                          <TouchableOpacity style={styles.ModifyButton} onPress={()=>navigation.navigate('Contact',{ProfileInfo,ID,Scribe})} >
                            <Text 
                            style={styles.Modify}>Modify</Text>
                            </TouchableOpacity>
                        </Animated.View>

                    ) : null
 }

 {((Scribe!="Provider")&&(Scribe!="Hospitalist"))&&(
                   <TouchableOpacity style={[styles.detailflow,{borderWidth:0}]} onPress={() => {Scribeslideout() }}>
                  
                  {showScribePro?(
  
             <Text style={styles.Minus}>-</Text>
               ):(
             <Text style={styles.Plus}>+</Text>
              )}
                      
                      <View style={{marginLeft:0}}>
                      <Text style={styles.ContentTitle}>Professional Info</Text>
                      </View>
                      <Feather style={ styles.Feather} name='check' size={28} />
                  </TouchableOpacity>
                  )}
                  {!showScribePro&& ((Scribe!="Provider")&&(Scribe!="Hospitalist"))&&(
                  <View style={styles.Line}/>
                  )}
                  {
                      showScribePro ? (
  
                          <Animated.View style={{marginLeft: 30}}>
                              <TouchableOpacity style={styles.VisitType} 
                            
                           >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                  
                   <Octicons style={{ color:ProfileInfo?.IsHomeHealthScribe===true? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                 
                    </View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Home Health Access</Text>
                   </View>
                   </TouchableOpacity>
                   {((Scribe==="HomehealthScribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Medium',fontSize:17,marginLeft:25,marginTop:10 }}>Home Health Company</Text>
                   )}
                   {ProfileInfo?.HomehealthCompanies?.map((item,index)=>{
                    return(
                       
                    <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:25,marginTop:10 }} key={index}>{item?.HomeHealthCompanyName}</Text>
                    )
                   })}
                   <TouchableOpacity style={styles.VisitType} 
                            >
                              
                     <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                 
                    <Octicons style={{ color: ProfileInfo?.IsFacilityScribe===true?'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                  
                     </View>
                    <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Facility Access</Text>
                    
                    
                    </View>

                    </TouchableOpacity>
                    {((Scribe==="FacilityScribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                    <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Medium',fontSize:17,marginLeft:25,marginTop:10 }}>Facilities</Text>
                    )}
                    {ProfileInfo?.Facilities?.map((item,index)=>{
                    return(
                       
                    <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:25,marginTop:10 }} key={index}>{item.FacilityName}</Text>
                    )
                   })}
                        <TouchableOpacity style={[styles.ModifyButton]}>
                              <Text 
                              style={[styles.Modify,{color:'gray'}]}>Modify</Text>
                              </TouchableOpacity>
                          </Animated.View>
  
                      ) : null
                  }

  {((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
   <TouchableOpacity style={[styles.detailflow,{borderWidth:0}]} onPress={() => { slideout2() }}>
                  
                  {showProf?(
  
           <Text style={styles.Minus}>-</Text>
           ):(
             <Text style={styles.Plus}>+</Text>
              )}
                      
                      <View style={{marginLeft:0}}>
                      <Text style={styles.ContentTitle}>Professional Info</Text>
                      </View>
                      <Feather style={ styles.Feather} name='check' size={28} />
                  </TouchableOpacity>
)}
                  {!showProf &&((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                  <View style={styles.Line}/>
                  )}
                  {
                      showProf ? (
  
                          <Animated.View style={{marginLeft: 30}}>
                             
                             <TouchableOpacity style={styles.VisitType} >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                
                   <Octicons style={{ color:ProfileInfo?.IsPhysician===true? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                 
                    </View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Physician</Text>
                   </View>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.VisitType}
                  >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                  
                   <Octicons style={{ color: ProfileInfo?.IsHospitalist===true?'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                  
                    </View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Hospitalist</Text>
                   </View>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.VisitType}
                   >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                  
                   <Octicons style={{ color:ProfileInfo?.IsNP===true? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                 
                    </View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Nurse Practitioner</Text>
                   </View>
                   </TouchableOpacity>
                   <TouchableOpacity 
                   style={styles.VisitType}
                  >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                 
                   <Octicons style={{ color:ProfileInfo?.IsPA===true? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                  
                    </View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Physician Assistant</Text>
                   </View>
                   </TouchableOpacity>


                   <TouchableOpacity  style={styles.VisitType}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                 
                   <Octicons style={{ color: ProfileInfo?.IsSpecialist===true?'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                  
                    </View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Specialist</Text>
                   </View>
                   </TouchableOpacity>
<TouchableOpacity style={styles.ModifyButton}>
                              <Text 
                              style={[styles.Modify,{color:'gray'}]}>Modify</Text>
                              </TouchableOpacity>
                          </Animated.View>
  
                      ) : null
                  }
  {((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <TouchableOpacity style={styles.detailflow} onPress={() => {slideout3() }}>
                {showSpecial?(

<Text style={styles.Minus}>-</Text>
):(
<Text style={styles.Plus}>+</Text>
)}
                   <View style={{}}>
                    <Text style={styles.ContentTitle}>Specialities</Text>
                    </View>
                    <Feather style={styles.Feather} name='check' size={28} />
                </TouchableOpacity>
                )}

                {!showSpecial&&((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <View style={styles.Line}/>
                )}
                {
                    showSpecial ? (

                        <View style={{marginLeft:30}}>
                           {ProfileInfo?.Specialties?.map((item,index)=>{
                            return(
                            <Text key={index} style={[styles.InnerContentText2,{marginTop:10}]}>{item?.SpecialistName}</Text>
                            )
                        })} 
                           
                         <Text  style={[styles.Modify,styles.ModifyButton,{color:'gray'}]}>Modify</Text>

                        </View>

                    ) : null
                }

{((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <TouchableOpacity style={styles.detailflow} onPress={() => { slideout4() }}>
                {showAvail?(

<Text style={styles.Minus}>-</Text>
):(
<Text style={styles.Plus}>+</Text>
)}
                    <View style={{}}>
                    <Text style={styles.ContentTitle}>Availability</Text>
                    </View>
                    <Feather style={styles.Feather} name='check' size={28} />
                </TouchableOpacity>
)}
                {!showAvail&&((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <View style={styles.Line}/>
                )}
                {
                    showAvail ? (

                        <View style={{marginLeft:30}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                            
                            <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:0 }}>Date</Text>
                            <Text onPress={()=>navigation.navigate('Availability',{ProfileInfo,ID})} style={{color: '#0071bc', fontSize: 15, alignSelf:'flex-end',marginRight:20,fontFamily:'SpaceGrotesk-Regular'}}>Modify</Text>
                           </View>
                          
                           <View style={{flexDirection:'row',marginTop:20,marginBottom:20,justifyContent:'space-between'}}>
                            <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:0 }}>Weekly</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('WeekDay',{ID,ProfileInfo})}>
                          
                            <Text  style={{ color: '#0071bc', fontSize: 15, alignSelf:'flex-end',marginRight:20,fontFamily:'SpaceGrotesk-Regular'}}>Modify</Text>
                            </TouchableOpacity>
                      </View>

                        </View>

                    ) : null
                }

{((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                 <TouchableOpacity style={styles.detailflow} onPress={() => { slideout5() }}>
                {showVisitType?(

<Text style={styles.Minus}>-</Text>
):(
<Text style={styles.Plus}>+</Text>
)}
                    <View style={{}}>
                    <Text style={styles.ContentTitle}>Visit Type</Text>
                    </View>
                    <Feather style={styles.Feather} name='check' size={28} />
                </TouchableOpacity>
)}
                {!showVisitType&&((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <View style={styles.Line}/>
                )}
                {
                    showVisitType? (

                        <View style={{marginLeft:30}}>
                            
                   <TouchableOpacity 
                   style={{marginTop:10}}
                 >
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                   <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                  
                   <Octicons style={{ color:(ProfileInfo?.VisitTypes[0].status==="true")? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                  
                    </View>
                   <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Telemed</Text>
                   </View>
                   </TouchableOpacity>
                 
                            
                            <TouchableOpacity style={styles.VisitType}>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{width:17,height:17,borderColor:'gray',borderWidth:1}}>
                          
                            <Octicons style={{ color:(ProfileInfo?.VisitTypes[1].status==="true")? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                           
                             </View>
                            <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Facility</Text>
                            </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.VisitType} 
                                   >
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{width:17,height:17,borderColor:'gray',borderWidth:1,}}>
                           
                            <Octicons style={{ color:(ProfileInfo?.VisitTypes[2].status==="true")? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                           
                             </View>
                            <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Out Patient</Text>
                            </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.VisitType} 
                                    >
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{width:17,height:17,borderColor:'gray',borderWidth:1,}}>
                           
                            <Octicons style={{ color:(ProfileInfo?.VisitTypes[0].status==="true")? 'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
                           
                             </View>
                            <Text style={{ color: '#333333',fontFamily: 'SpaceGrotesk-Regular',fontSize:17,marginLeft:10 }}>Transitional Care</Text>
                            </View>
                            </TouchableOpacity>

                            
                         <TouchableOpacity   style={styles.ModifyButton}>
                            <Text  style={[styles.Modify,{color:'gray'}]}>Modify</Text>
                            </TouchableOpacity>
                        </View>

                    ) : null
                }

{((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <TouchableOpacity style={styles.detailflow} onPress={() => { slideout6() }}>
                {showAddress?(

<Text style={styles.Minus}>-</Text>
):(
<Text style={styles.Plus}>+</Text>
)}
                   <View style={{}}>
                    <Text style={styles.ContentTitle}>Address</Text>
                    </View>
                    <Feather style={styles.Feather} name='check' size={28} />
                </TouchableOpacity>
)}
                {!showAddress&&((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
                <View style={[styles.Line,{}]}/>
                )}
                {
                    showAddress ? (

                        <View style={{marginLeft:30}}>
                           
                            <Text style={styles.InnerContentText1}>Address</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.Address1}</Text>
                            <Text style={styles.InnerContentText1}>City</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.City}</Text>
                            <Text style={styles.InnerContentText1}>Country</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.Country}</Text>
                            <Text style={styles.InnerContentText1}>Zip</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.Zip}</Text>
                            <Text style={styles.InnerContentText1}>Suite Number</Text>
                            <Text style={styles.InnerContentText2}>{ProfileInfo?.SuiteNumber}</Text>
                          <TouchableOpacity style={styles.ModifyButton} onPress={()=>navigation.navigate('EditAddress',{ProfileInfo,ID})}>
                            <Text  style={styles.Modify}>Modify</Text>
                            </TouchableOpacity>
                        </View>

                    ) : null
                }
             
           {/* <TouchableOpacity onPress={()=> popuperrorshow()}
                  style={[styles.detailflow,{marginTop:10,marginBottom:10}]}>
          
               <View style={{borderWidth:0,marginLeft:0,flexDirection:'row',alignItems:'center',borderRadius:8}}>
               <Entypo name='log-out' color={"#e6c402"} size={22}/>
                <Text style={styles.ContentTitle}>Logout</Text>
              </View>
             </TouchableOpacity> */}
          
             <Text style={[{marginBottom:responsiveHeight(20)}]}/>   
            </View>

            </View> 
            </ScrollView>
       
        </SafeAreaView>
      
        </Root>
    )
}

export default Profile;

const styles = StyleSheet.create({

ModifyButton:
    {marginTop:16,
        marginBottom:16, 
        alignSelf:'flex-end',
        marginRight:20
    },

        VisitType:{
            marginTop:10,

        },

    detailflow:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:5,
        borderWidth:0,
        
        
    },
    Modify:{
        color: '#0071bc', fontSize: 15,fontFamily:'SpaceGrotesk-Regular'
    },
    InnerContentText1:{
        color: '#808080', 
        fontSize: 12,
         marginTop: 10,
          fontFamily: 'SpaceGrotesk-Regular'
    },
    InnerContentText2:{
        color: '#333333', fontSize: 17, marginTop: 0,
       
         fontFamily: 'SpaceGrotesk-Regular'
    },
    Feather:{
        color: 'green', marginTop: 0, marginLeft: 240,position:'absolute'
    },

    Minus:{
        color: '#e6c402', fontSize: 35 ,fontFamily: 'SpaceGrotesk-Regular',top:-2
    },
    Plus:{
        color: '#e6c402', fontSize: 28 ,fontFamily: 'SpaceGrotesk-Regular'
    },
    Line:{
    borderBottomColor:'#333333',
    height:10,
    borderBottomWidth:1,
   // marginTop:verticalScale(-10),
    marginLeft:0,
    marginRight:0,
    },
    ContentTitle:{
        color: '#333333',
        
         fontSize: 17, 
         marginLeft: 10,
         fontFamily: 'SpaceGrotesk-Regular'
    },
    

})