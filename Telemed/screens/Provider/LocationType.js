import { StyleSheet, Text, TouchableOpacity, View,Image ,Dimensions} from 'react-native'
import React, { useEffect ,useCallback,useState} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import FacilitySvg from '../Components/FacilitySvg';
import HomehealthSvg from '../Components/HomehealthSvg';
import ClinicSvg from '../Components/ClinicSvg';
import { SvgXml } from 'react-native-svg/src/xml';
import { responsiveHeight, responsiveScreenWidth ,useDimensionsChange, useResponsiveWidth} from 'react-native-responsive-dimensions';


const Telemed1 = ({navigation,route}) => {
    const{ID,LocationTypeId,Scribe,VisitTypeId}=route.params;
    const[changeWidth,setchangeWidth]=useState(Dimensions.get('window').width);

   
    useEffect(()=>{
        console.log(ID)
    })
    useDimensionsChange(
        useCallback(({ window, screen }) => {
        
          setchangeWidth(window.width)
         // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }, [])  
      ); 
    return (
        <View style={{ flex: 1, backgroundColor: '#11266c' }}>
           <View style={{ height: 60,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: useResponsiveWidth(5), top:3 }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Telemed</Text>
            </View>
            <View style={{ flex: 1, justifyContent:'center'}}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Facility',{ID,LocationTypeId:"1001",VisitTypeId,TabName:"Facility",Scribe})} style={{alignItems:'center'}}>
                    <SvgXml
            xml={FacilitySvg}
            width={changeWidth>500?80:50}
            height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,marginTop:10,fontFamily: 'SpaceGrotesk-Regular'}}>Facility</Text>
                        </TouchableOpacity>  
                        <View style={{height:100,borderRightWidth:1,borderRightColor:'#eaeaea'}}/>

                    <TouchableOpacity onPress={()=>navigation.navigate('Facility',{ID,LocationTypeId:"1002",VisitTypeId,TabName:"Home Health",Scribe})} style={{alignItems:'center'}}>
                    <SvgXml
            xml={HomehealthSvg}
            width={changeWidth>500?80:50}
            height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',marginTop:10}}>Home Health</Text>
                        </TouchableOpacity> 
                        <View style={{height:100,borderRightWidth:1,borderRightColor:'#eaeaea',marginTop:15}}/>

                    <TouchableOpacity onPress={()=>navigation.navigate('PatientDetailClinic',{ID,LocationTypeId:"1000",VisitTypeId,TabName:"Clinic",Scribe})} style={{alignItems:'center'}}>
                    <SvgXml
            xml={ClinicSvg}
            width={changeWidth>500?80:50}
            height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize:17,fontFamily: 'SpaceGrotesk-Regular',marginTop:10}}>Clinic</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}

export default Telemed1;

const styles = StyleSheet.create({
    container: {
        justifyContent:'space-evenly',
        marginTop:0,
        flexDirection:'row',
        alignItems:'center'
    }
})