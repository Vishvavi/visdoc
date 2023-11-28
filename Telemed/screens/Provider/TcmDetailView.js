import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useEffect ,useState,useCallback} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import moment from 'moment'
import { responsiveHeight, responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import URL from '../Components/URL'



const TcmDetailView = ({route,navigation}) => {
    const{item,ID,VisitTypeId,Scribe,Usercreated}=route.params;
    const[Reasonforvisit,setReasonforvisit]=useState('');

useEffect(()=>{
    Reason();
    console.log(ID)
    console.log(Scribe);
    console.log(Usercreated)
},[])
useDimensionsChange(
    useCallback(({ window, screen }) => {
    
   
    }, [])  
  ); 






    const Reason=async()=>{
       
            try{
    const Url=URL.ViewClinicReferral+`${item.AppointmentId}`;
    let result=await fetch(Url);
    result=await result.json();
    console.log(result)
    setReasonforvisit(result.ViewReferral.Referral[0].ReasonforVisit)
    console.log(result.ViewReferral.Referral[0].ReasonforVisit)
            }catch(e){
                console.log(e);
            }
    }
       
 
    
    
    const ItemView= (item) => {
        return(
           <View style={{ borderWidth:1,padding:10,margin:responsiveWidth(5),padding:responsiveWidth(5),backgroundColor:'#eaeaea',borderRadius: 8, borderWidth: 3, borderColor: '#dcdcdc' }}>
       
           <View style={{flexDirection:'row'}}>
            <View style={{width:50,height:50,backgroundColor:'#808080',borderRadius:8}}></View>
            <View style={{}}>
            <Text style={{fontSize:22,width:responsiveWidth(65),borderWidth:0,color:'#333333',marginTop:0,fontFamily: 'SpaceGrotesk-Medium',marginLeft:10}}>{item.PatientName}</Text>
            {item.LocationTypeName==='Facility'?(
            <Text style={{fontSize:12,color:'#333333',fontFamily: 'SpaceGrotesk-Regular',marginLeft:10}}>{item.LocationTypeName}-{item.FacilityName}</Text>
            ):(
         <Text style={{fontSize:12,color:'#333333',fontFamily:'SpaceGrotesk-Regular',marginLeft:10}}>{item.LocationTypeName}-{item.HomeHealthCompanyName}</Text>
   
            )}
            </View>
           </View>
           <View style={{}}>
            {VisitTypeId==="1000"?(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}></Text>
            ):(
            <Text style={{fontSize:17,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}></Text>
            )}
            <Text style={{fontSize:14,color:'#333333',fontFamily: 'SpaceGrotesk-Regular'}}>Discharge Date : {moment(item.DischargeDate).format("MMM' D.YYYY")} </Text>
          
           </View>
           <View style={{}}>
          {// <Text style={{fontFamily: 'SpaceGrotesk-Regular',color:'#333333',fontSize:scale(12)}}>Referred by:</Text>
    }
           </View>
           <View style={{marginTop:60}}>
          
        
          
           
           </View>
        </View>
       )
   }


  

    return (
        <View style={{ flex: 1}}>
            <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft:responsiveWidth(5)}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginTop: 0, marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular'}}>Patient Details</Text>
            </View>
            <ScrollView>
            <View style={{borderWidth:0}}>
           
              
             
             {ItemView(item)}
         
              </View>
              
           <View style={{padding:20}}>
       
            <View style={{marginVertical:0}}>
        

            </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default TcmDetailView;

const styles = StyleSheet.create({})