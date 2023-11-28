import { StyleSheet, Text, TouchableOpacity, View,Image,Dimensions } from 'react-native'
import React, { useEffect ,useState,useCallback} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { SvgXml } from 'react-native-svg/src/xml';
import FacilitySvg from '../Components/FacilitySvg';
import HomehealthSvg from '../Components/HomehealthSvg';
import ClinicSvg from '../Components/ClinicSvg';
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';

const ScribeLocationType = ({navigation,route}) => {
    const{ID,LocationTypeId,Scribe,Header,VisitTypeId}=route.params;
    const[changeWidth,setchangeWidth]=useState(Dimensions.get('window').width);

   

    useDimensionsChange(
        useCallback(({ window, screen }) => {
            setchangeWidth(window.width)
         
        }, [])  
      ); 
    useEffect(()=>{
        console.log(ID)
    })

    return (
        <View style={{ flex: 1, backgroundColor: '#11266c' }}>
           <View style={{ height: 50,alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: 20,  }} name='arrow-left' size={24} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>{Header}</Text>
            </View>
            <View style={{ flex: 1, justifyContent:'center'}}>
             
                <View style={styles.container}>
                {((Scribe==='FacilityScribe')||(Scribe==='FacilityHomehealthScribe'))&&(
                    <TouchableOpacity onPress={()=>navigation.navigate('Facility',{ID,LocationTypeId:"1001",VisitTypeId,TabName:"Facility",Scribe})} style={{alignItems:'center'}}>
                       <SvgXml
                 xml={FacilitySvg}
                 width={changeWidth>500?80:50}
                 height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,marginTop:10,fontFamily: 'SpaceGrotesk-Regular'}}>Facility</Text>
                        </TouchableOpacity>  
                        )}
                        {Scribe==='FacilityHomehealthScribe'&&(
                        <View style={{alignSelf:'center',paddingLeft:0,paddingRight:40,borderWidth:0,alignItems:'center'}}>
                        <View style={{height:100,borderWidth:1,marginLeft:60,borderColor:'#eaeaea'}}/>
                        </View>
                        )}
                        {((Scribe==='HomehealthScribe')||(Scribe==='FacilityHomehealthScribe'))&&(
                    <TouchableOpacity onPress={()=>navigation.navigate('Facility',{ID,LocationTypeId:"1002",VisitTypeId,TabName:"Home Health",Scribe})} style={{alignItems:'center'}}>
                         <SvgXml
                 xml={HomehealthSvg}
                 width={changeWidth>500?80:50}
                 height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',marginTop:10}}>Home Health</Text>
                        </TouchableOpacity> 
                        )}
                     {//  <Text style={{height:verticalScale(100),borderRightWidth:1,borderRightColor:'#eaeaea',marginTop:15}}/>
}
                        {Scribe==='Scribe'&&(
                    <TouchableOpacity onPress={()=>navigation.navigate('PatientDetailClinic',{ID,LocationTypeId:"1000",VisitTypeId,TabName:"Clinic",Scribe})} style={{alignItems:'center'}}>
                         <SvgXml
                 xml={ClinicSvg}
                 width={changeWidth>500?80:50}
                 height={changeWidth>500?80:50}/>
                        <Text style={{ color: '#e6c402', fontSize: 17,fontFamily: 'SpaceGrotesk-Regular',marginTop:10}}>Clinic</Text>
                    </TouchableOpacity>
                        )}
                </View>
            </View>
        </View>
    )
}

export default ScribeLocationType;

const styles = StyleSheet.create({
    container: {
       // justifyContent:'space-evenly',
        marginTop:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
})