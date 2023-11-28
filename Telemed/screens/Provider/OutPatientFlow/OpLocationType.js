import { StyleSheet, Text, TouchableOpacity, View,Image,Dimensions } from 'react-native'
import React, { useEffect ,useCallback,useState} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { SvgXml } from 'react-native-svg/src/xml';
import FacilitySvg from '../../Components/FacilitySvg';
import HomehealthSvg from '../../Components/HomehealthSvg';
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';


const OpLocationType = ({navigation,route}) => {
    const{ID,Scribe,LocationTypeId,VisitTypeId}=route.params;
    const[changeWidth,setchangeWidth]=useState(Dimensions.get('window').width);

    useDimensionsChange(
        useCallback(({ window, screen }) => {
            setchangeWidth(window.width)
         
        }, [])  
      ); 

 

    useEffect(()=>{
        console.log('ID',ID)
    },[])

    return (
        <View style={{ flex: 1, backgroundColor: '#11266c' }}>
           <View style={{ height: 50,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5),  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Out Patient</Text>
            </View>
            <View style={{ flex: 1,flexDirection:'row',alignItems:'center',}}>
               
                    <TouchableOpacity onPress={()=>navigation.navigate('OpFacility',{ID,LocationTypeId:"1001",VisitTypeId,TabName:"Facility",TimeTab:"Dischargedate",Scribe})} style={{alignItems:'center',marginLeft:60}}>
                    <SvgXml
                 xml={FacilitySvg}
                 width={changeWidth>500?80:50}
                 height={changeWidth>500?80:50}/>

                        <Text style={{ color: '#e6c402', fontSize: 17,marginTop:10,fontFamily: 'SpaceGrotesk-Regular',}}>Facility</Text>
                        </TouchableOpacity>  
                        <View style={{alignSelf:'center',marginLeft:50,borderWidth:0,alignItems:'center'}}>
                        <View style={{height:100,borderRightWidth:1,borderRightColor:'#eaeaea'}}/>
                        </View>
                    <TouchableOpacity onPress={()=>navigation.navigate('OpFacility',{ID,LocationTypeId:"1002",VisitTypeId,TabName:"Home Health",Scribe})} style={{alignItems:'center',marginLeft:30}}>
                    <SvgXml
                 xml={HomehealthSvg}
                 width={changeWidth>500?80:50}
                 height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',marginTop:10}}>Home Health</Text>
                        </TouchableOpacity> 
                   <View style={{height:100,borderRightWidth:1,borderRightColor:'#eaeaea',marginTop:15}}/>

                   <TouchableOpacity onPress={()=>navigation.navigate('PatientDetailClinic',{ID,LocationTypeId:"1000",VisitTypeId,TabName:"Clinic"})} style={{alignItems:'center'}}>
                      
                       <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',marginTop:10}}>Clinic</Text>
                    </TouchableOpacity>
               
                    
              
            </View>
        </View>
    )
}

export default OpLocationType;

const styles = StyleSheet.create({
    container: {
       // justifyContent:'space-evenly',
        marginTop:0,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center'
    }
})