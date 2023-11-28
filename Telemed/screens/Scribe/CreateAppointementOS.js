import { StyleSheet, Text, View,TouchableOpacity, Image ,Dimensions} from 'react-native'
import React, { useEffect,useCallback,useState } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { SvgXml } from 'react-native-svg';


import TelemedSvg from '../Components/TelemedSvg';
import OpSvg from '../Components/OpSvg';
import TcmSvg from '../Components/TcmSvg';
import FacilityVisitSvg from '../Components/FacilityVisitSvg';
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';


const ScribeCreateAppointmentOS = ({navigation,route}) => {
const{ID,Scribe}=route.params;
const[changeWidth,setchangeWidth]=useState(Dimensions.get('window').width);
    const ToTelemed = () => {
        if((Scribe==="Provider")||(Scribe==="Hospitalist")||(Scribe==="Scribe")){
        navigation.navigate('Telemed1',{VisitTypeId:"1000",ID,Header:"Telemed",Scribe})
        }
        else {
            navigation.navigate('ScribeLocationType',{VisitTypeId:"1000",ID,Header:"Telemed",Scribe})

        }
    }
    
    const ToOutPatient = () => { 
      if((Scribe==="Hospitalist")){   
        navigation.navigate('OpLocationType',{VisitTypeId:"1002",ID:ID,Header:"Out Patient",Scribe})
     }
        else{
            navigation.navigate('ScribeOpLocationType',{VisitTypeId:"1002",ID,Header:"Out Patient",Scribe})

        
    }
}
    const ToTcm = () => {
        navigation.navigate('Facility',{LocationTypeId:"1001",TabName:"Facility",VisitTypeId:"1003",ID,Header:"Tcm",Scribe})
    }
    const ToFacilityVisit = () => {
        navigation.navigate('Facility',{LocationTypeId:"1001",TabName:"Facility Visit",VisitTypeId:"1001",ID,Scribe})
    }

    useEffect(()=>{
        console.log(ID)
    })

    useDimensionsChange(
        useCallback(({ window, screen }) => {
            setchangeWidth(window.width)
         
        }, [])  
      ); 
    return (
        <View style={{ flex: 1, backgroundColor: '#11266c' }}>
            <View style={{ height: 50,alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5),top:3  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Create Appoinment</Text>
            </View>
            <View style={{ flex: 1,justifyContent:'center'}}>
                <View style={[styles.container,{alignItems:'center',marginLeft:20}]}>
                    <TouchableOpacity onPress={()=>ToTelemed()} style={{top:5}}>
                    <SvgXml
             xml={TelemedSvg}
             width={changeWidth>500?80:60}
             height={changeWidth>500?80:60}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',marginTop:5}}>Telemed</Text>
                        </TouchableOpacity>  

                      
                      {((Scribe==="FacilityScribe")||(Scribe==="Scribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                    <TouchableOpacity  onPress={ToFacilityVisit}  style={{marginLeft:90,alignItems:'center'}}>
                           <SvgXml
            xml={FacilityVisitSvg}
            width={changeWidth>500?80:60}
            height={changeWidth>500?80:60}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',alignSelf:'center',marginTop:10}}>Facility Visit</Text>
                    </TouchableOpacity>
                    )}
                    </View>
                    <View style={styles.container}>
                 <View style={{marginTop:50,borderBottomWidth:1,width:100,borderColor:'#eaeaea',}}/>
                        </View>
                        <View style={styles.container}>
                 <View style={{marginTop:-50,borderLeftWidth:1,height:100,borderColor:'#eaeaea',}}/>
                        </View>
                   <View style={[styles.container,{marginTop:-20}]}>
                        
                     
            <TouchableOpacity onPress={ToOutPatient}>
                    <SvgXml
            xml={OpSvg}
            width={changeWidth>500?80:60}
            height={changeWidth>500?80:60}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',alignSelf:'center',marginTop:10}}>OP</Text>
                        </TouchableOpacity> 
                      
            {((Scribe==="FacilityScribe")||(Scribe==="Scribe")||(Scribe==="FacilityHomehealthScribe"))&&(
                    <TouchableOpacity  onPress={ToTcm} style={{marginLeft:95}}>
                         <SvgXml
            xml={TcmSvg}
            width={changeWidth>500?80:60}
            height={changeWidth>500?80:60}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',alignSelf:'center',marginTop:10}}>TCM</Text>
                    </TouchableOpacity>
                    )}
                      
                    
                    
                </View>
            </View>
        </View>
    )
}

export default ScribeCreateAppointmentOS;

const styles = StyleSheet.create({
    container: {
        justifyContent:'space-evenly',
        marginTop:0,
        flexDirection:'row',
    }
})