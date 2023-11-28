
//create appointment Screen for facility Scribe


import { StyleSheet, Text, View,TouchableOpacity, Image ,Dimensions} from 'react-native'
import React, { useEffect,useCallback,useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { SvgXml } from 'react-native-svg';


import TelemedSvg from '../Components/TelemedSvg';
import FacilityVisitSvg from '../Components/FacilityVisitSvg';
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions';



const CreateAppointment = ({navigation,route}) => {
const{ID,Scribe}=route.params;
const[changeWidth,setchangeWidth]=useState(Dimensions.get('window').width);
useDimensionsChange(
    useCallback(({ window, screen }) => {
    
      setchangeWidth(window.width)
     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [])  
  ); 

    const ToTelemed = () => {
        if((Scribe==="Provider")||(Scribe==="Hospitalist")){
        navigation.navigate('Telemed1',{VisitTypeId:"1000",ID,Header:"Telemed",Scribe})
        }
        else if(Scribe==="FacilityScribe"){
            navigation.navigate('ScribeLocationType',{VisitTypeId:"1000",ID,Header:"Telemed",Scribe})

        }
    }
    const ToOutPatient = () => { 
        if((Scribe==="Provider")||(Scribe==="Hospitalist")){   
        navigation.navigate('OpLocationType',{VisitTypeId:"1002",ID:ID,Header:"OutPatient",Scribe})
        }
        else{
            navigation.navigate('ScribeLocationType',{VisitTypeId:"1002",ID,Header:"OutPatient",Scribe})

}
    }
 
    const ToTcm = () => {
        navigation.navigate('Facility',{LocationTypeId:"1001",TabName:"Facility",VisitTypeId:"1003",ID,Header:"Tcm",Scribe})
    }
    const ToFacilityVisit = () => {
        navigation.navigate('Facility',{LocationTypeId:"1001",TabName:"Facility Visit",ID,Scribe,VisitTypeId:'1001'})
    }

    useEffect(()=>{
        console.log(ID)
    })


   
    return (
        <View style={{ flex: 1, backgroundColor: '#11266c' }}>
           
            <View style={{ height: 50,alignItems:'center',flexDirection:'row',}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5),top:3  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Create Appoinment</Text>
            </View>
            <View style={{ flex: 1,justifyContent:'center', }}>
                <View style={[styles.container,{alignItems:'center',}]}>
                    <TouchableOpacity onPress={()=>ToTelemed()} style={{alignItems:'center'}}>
                    <SvgXml
              xml={TelemedSvg}
               width={changeWidth>500?80:50}
                 height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',marginTop:10}}>Telemed</Text>
                        </TouchableOpacity> 

                    
                        <View style={{height:120,
                            borderRightWidth:1,
                            borderRightColor:'#eaeaea',
                           marginLeft:20
                            
                            }}/>
                        
                   

                    <TouchableOpacity onPress={()=>ToFacilityVisit()} style={{alignItems:'center'}}>
                    <SvgXml
            xml={FacilityVisitSvg}
            width={changeWidth>500?80:50}
            height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',alignSelf:'center',marginTop:10}}>Facility Visit</Text>
                        </TouchableOpacity> 

{Scribe==="Provider" &&(
                        <View style={{height:120,borderRightWidth:1,borderRightColor:'#eaeaea',}}/>
)}
{Scribe==="Provider" &&(
                    <TouchableOpacity  onPress={ToTcm}>
                        <Image source={require('../../images/VD_MedicalBed.png')} style={{width:60,height:60,resizeMode:'contain'}} />
                        <Text style={{ color: '#e6c402', fontSize: 22,fontFamily: 'SpaceGrotesk-Regular',alignSelf:'center',marginTop:10}}>TCM</Text>
                    </TouchableOpacity>
)}
                </View>
            </View>
        </View>
    )
}

export default CreateAppointment;

const styles = StyleSheet.create({
    container: {
        justifyContent:'space-evenly',
        marginTop:0,
        flexDirection:'row',
    }
})