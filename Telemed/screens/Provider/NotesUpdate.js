import { StyleSheet, Text, View ,TouchableOpacity,TextInput, Keyboard} from 'react-native'
import React,{useEffect,useState,useCallback,useRef} from 'react'
import Octicons from 'react-native-vector-icons/Octicons'

import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions'
import URL from '../Components/URL'




const NotesUpdate = ({route,navigation}) => {

    const{item,ID,VisitTypeId,Scribe}=route.params;
  
const[Notes,setNotes]=useState(false);
const[editable,seteditable]=useState(true);

useEffect(()=>{
  getNotes();
if(Scribe==="FacilityScribe"||Scribe==="HomehealthScribe"||Scribe==="Scribe"||Scribe==="FacilityHomehealthScribe"){
  seteditable(false);
}
else{
  seteditable(true);
}

},[])
useDimensionsChange(
  useCallback(({ window, screen }) => {
  
   
  }, [])  
); 


const getNotes=async()=>{
  const url=URL.TelemedViewAccepted+`${item.AppointmentId}`
  let result=await fetch(url);
 result=await result.json();
 console.log(result);
  setNotes(result.ViewReferral[0].TelemedNotes);

}


const ProviderNotesUpdate=async(data)=>{
   
    

    const data1={
        UserId: `${ID}`,
        AppointmentId: item.AppointmentId,
        TelemedNotes: `${Notes}`
    }
    console.log(data1)
      const url=URL.TelemedUpdateDetail;
      
       fetch(url,{
    
        method: 'PUT',
       headers: { 
          
          'Content-Type': 'application/json' 
          },
       body:JSON.stringify(data1)
    
    }).then(response=>response.json()).then(json=>{
      console.log(json.UpdatedNotes);
      if(json.UpdatedNotes==="updated sucessfully"){
        navigation.goBack()
        getNotes();
      }
      else{
        console.log('error');
      }
      
    }).catch(e=>{
      console.log("e",e)
    })}



    const ref_input2 = useRef();


   

    return (
        <View style={{ flex: 1}}>
            <View style={{ height: 50,borderWidth:0,flexDirection:'row',alignItems:'center',backgroundColor:'#11266c' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{borderWidth:0,marginLeft: responsiveWidth(5)}}>
                <Octicons style={{ color: '#e6c402', marginTop: 0  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular'}}>Notes Update</Text>
            </View>
      <ScrollView>
            
<View style={{padding:responsiveWidth(5)}}>
<Text style={{fontFamily: 'SpaceGrotesk-Regular',fontSize: 12,color:'#808080',marginLeft:0,marginTop:25}}>Notes </Text>
            <TextInput 
          multiline={true}
          //returnKeyType = {"next"}
         onSubmitEditing={() => Keyboard.dismiss()}
          editable={editable}
          onChangeText={(text)=>setNotes(text)}
          value={Notes}
            style={{height:400,
                fontFamily: 'SpaceGrotesk-Regular',
                fontSize:17,
               textAlignVertical:'top',
               width:'100%',
                borderWidth:1,
                padding:20,
           color:'black',
                borderRadius:8,
                backgroundColor:'transparent'}}/>
</View>
{((Scribe==="Provider")||(Scribe==="Hospitalist"))&&(
<TouchableOpacity ref={ref_input2} onPress={ProviderNotesUpdate } style={{alignSelf:'flex-end',marginRight:responsiveWidth(5)}}>
            <View style={{height:40,width:120,marginBottom:20,alignItems:'center',justifyContent:'center',backgroundColor:'green',borderRadius:8,}}>
<Text style={{fontSize:22,color:'white'}}>Update</Text>
            </View>
            </TouchableOpacity>  
    )}
            </ScrollView>   
        </View>
    )
}

export default NotesUpdate;

const styles = StyleSheet.create({})