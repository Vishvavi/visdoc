import { FlatList, StyleSheet, Text, TouchableOpacity, View ,TextInput,RefreshControl} from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import Octicons from 'react-native-vector-icons/Octicons'


import moment from 'moment';

//import TextInput from 'react-native-paper/lib/module/components/TextInput/TextInput';
import Theme from "../Components/fontTheme";
import { AppDimensions } from '../Components/Dimensions';

import useProgressViewOffset from "../Components/ProgressViewOffset";
import { responsiveWidth,useDimensionsChange } from 'react-native-responsive-dimensions';
import URL from '../Components/URL';





const Provider = ({navigation,route}) => {
    const{ID,LocationTypeId,ReasonForReferral,Scribe,FacilityId,VisitTypeId,patient,ReferringProvider,specialty,AssignedDate,AssignedTime}=route.params;

  
    const ToProceed = () => {
        if((selectedProvider!=0)&&(VisitTypeId==='1001')&&(PriorAuth===false)){
        navigation.navigate('FacilityProceed',{ID,ReasonForReferral,Scribe,VisitTypeId,LocationTypeId,FacilityId,cout,patient,specialty,ReferringProvider,AssignedDate,AssignedTime,selectedProvider,PriorAuth})
    }
    else if((selectedProvider!=0)&&(VisitTypeId!='1001')&&(PriorAuth===false)){
        navigation.navigate('Proceed',{ID,ReasonForReferral,Scribe,VisitTypeId,LocationTypeId,FacilityId,cout,patient,specialty,ReferringProvider,AssignedDate,AssignedTime,selectedProvider,PriorAuth})
    }
    else if((selectedProvider!=0)&&(PriorAuth===true)){
      navigation.navigate('PriorAuthProceed',{ID,ReasonForReferral,Scribe,VisitTypeId,LocationTypeId,FacilityId,cout,patient,specialty,ReferringProvider,AssignedDate,AssignedTime,selectedProvider,PriorAuth})
    }

    }

   
    const[Provider,setProvider]=useState([]);
    const[selectedProvider,setselectedProvider]=useState(Provider||null)
    const[cout,setcount]=useState(false);
    const[input,setInput]=useState("");
    const[Allprovider,setAllProvider]=useState(0);
    const[checks,setChecks]=useState(Provider);
    const[providerList,setProviderList]=useState([])
    const progressViewOffset = useProgressViewOffset();
    const [refreshing, setRefreshing] = useState(false);
    const[PriorAuth,setPriorAuth]=useState(false);

  
    useEffect(()=>{
      ProviderList();
      priorAuthNeed();
  },[])

   
      
      const selectAll=()=>{
        const AllIds=Provider.map((item)=>item.ProviderId);

        setselectedProvider(AllIds)
        setProviderList(AllIds);
        
      };
      const deselectAll=()=>{
        setselectedProvider([]);
        setProviderList([]);
      };

      useDimensionsChange(
        useCallback(({ window, screen }) => {
        
         // setchangeWidth(window.width)
         // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }, [])  
      );    

      const priorAuthNeed=async()=>{

        const data={
          
          
            PatientId: `${patient}`,
            SpecialtyTypeId: `${specialty}`,
            AppointmentDate: `${AssignedDate}`
              
      
        }
      try{
        const url=URL.PriorAuthCheck;
       fetch(url,{
         method: 'POST',
       headers: { 
          
          'Content-Type': 'application/json' 
          },
       body:JSON.stringify(data)
      
      }).then(response=>response.json()).then(json=>{
      console.log(json);
      if(json.Status==="PriorAuth Not Needed"){
      setPriorAuth(false);
      }else{
        setPriorAuth(true);
      }
      })
      }
      catch(e){
        console.log(e);
      }
      
      
      }

    const renderProvider = ({ item, index }) => {
    
       const { ProviderId , ProviderName } = item;
       
       console.log(selectedProvider)
       console.log(selectedProvider.length)
       console.log(Provider.length)
   if(selectedProvider?.length===Provider.length){
    setAllProvider(1);
   }
   else{
    setAllProvider(0);
   }
       setcount(selectedProvider?.length)
      
        const isSelected = selectedProvider?.filter((i) => i === ProviderId ).length > 0; // checking if the item is already selected
      if(input===""){ 
        return (

          <View>
         
            <View style={{marginLeft:responsiveWidth(5)}}>
                 
                 <View style={[styles.container,{width:responsiveWidth(26.5)}]}>
          <TouchableOpacity
            onPress={() => {
              if (isSelected) {
                setselectedProvider((prev) => prev.filter((i) => i !== ProviderId ));
            } else {
                setselectedProvider((prev) => [...prev, ProviderId])
               }
            }}>  
          {isSelected ? (<Octicons style={{ color:'green', marginLeft: 10, marginTop: 10, position: 'absolute' }} name='check' size={22} />):null}
                  <View style={{ borderTopWidth: 0.5, borderColor: '#333333', marginTop: 95 }}>
                
                        <Text style={{ color: '#333333', fontSize: 12, marginLeft:8 ,fontFamily: 'SpaceGrotesk-Regular'}}>{ProviderName}</Text>
                        </View>
          
          </TouchableOpacity>
          </View>
           
          </View>
        
          </View>
        
        );
      }
      if(ProviderName.toLowerCase().includes(input.toLowerCase())){
        return(
            <View>
          
           <View style={{paddingHorizontal:16}}>
                
                <View style={styles.container}>
         <TouchableOpacity
           onPress={() => {
             if (isSelected) {
               setselectedProvider((prev) => prev.filter((i) => i !== ProviderId ));
               
               } 
               else {
               setselectedProvider(prev => [...prev, ProviderId])
              
             }
           }}>  
         {isSelected ? (<Octicons style={{ color:'green', marginLeft: 5, marginTop: 5, position: 'absolute' }} name='check' size={20} />):null}
                 <View style={{ borderTopWidth: 0.5, borderColor: '#333333', marginTop: 95 }}>
               
                       <Text style={{ color: '#333333', fontSize: 12, marginLeft:8 ,fontFamily: 'SpaceGrotesk-Regular'}}>{ProviderName}</Text>
                       </View>
         
         </TouchableOpacity>
         </View>
          
         </View>
         
         </View>
           

        )
      };
    }
    
const onRefresh=()=>{
  ProviderList();
}

    const ProviderList=async()=>{

        const data={
            VisitTypeId: `${VisitTypeId}`,
            SpecialityTypeId: `${specialty}`,
            AppointmentTime: `${AssignedTime}`,
            AppointmentDate: `${AssignedDate}`
        }
        console.log(data)
        
          const url=URL.ProviderList;
           fetch(url,{
        
            method: 'POST',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);
         // setProvider(json?.Providers);
          const filterData=json?.Providers.filter((item)=>item.ProviderId!=ID)
          setProvider(filterData);
        console.log(filterData)

      }).catch(e=>{
          console.log("e",e)
        })}



   
//560
    return (
        <View style={{ flex: 1, backgroundColor: '#11266c' }}>
           
           <View style={{height:AppDimensions.FULL_HEIGHT-50-110,borderWidth:0}}>  
             <View style={{ height: 50,alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0 }}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402', marginLeft: responsiveWidth(5),  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea',  marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Add Provider</Text>
            </View>
           
            <View style={{}}>
                <TextInput
                style={{height:40,color:'#333333',backgroundColor:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular',marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5),borderRadius:8,paddingLeft:10}}
               placeholderTextColor={'#333333'}
               placeholder='Search'
                onChangeText={(text)=>setInput(text)}
                />
            </View>

       <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
   
            <FlatList
             refreshControl={
              <RefreshControl
            
              
                progressViewOffset={progressViewOffset}
               
             
               refreshing={refreshing} onRefresh={()=>onRefresh()} />
             }
             data={Provider}
             keyExtractor={item => item.ProviderId}
             numColumns={3}
             renderItem={renderProvider}
            />
        </View>
        </View>
        
            <View style={{borderWidth:0}}>
              
                <View style={{ borderTopWidth: 1,paddingTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center' }}>
               <View>
                <TouchableOpacity onPress={()=>{
                    if(Allprovider===0){
                    setAllProvider(1)
                    selectAll()
                  }
                
                      else {
                        setAllProvider(0);
                        deselectAll();
                    }
                }}>
                 
                 <View style={{flexDirection:'row',alignItems:'center'}}>  
                <View style={{height:20,width:20,borderWidth:1,backgroundColor:'white',marginLeft:responsiveWidth(5)}}>
                <Octicons style={{ color: Allprovider?'green':'transparent', alignSelf: 'center', }} name='check' size={17} />
               
                </View>
                <Text style={{fontSize:12,marginLeft:12,fontFamily:'SpaceGrotesk-Regular',color:'white'}}>All Provider</Text>
                </View> 
                </TouchableOpacity>
                
                <Text style={{ color: '#eaeaea',marginTop:5, fontSize: 12, marginLeft: responsiveWidth(5) ,fontFamily: 'SpaceGrotesk-Regular'}}> {cout} Provider(s) Selected</Text>
                </View>
                <TouchableOpacity onPress={()=>ToProceed()} style={{ backgroundColor: 'green', width:120, height: 40,alignItems:'center',justifyContent:'center',  borderRadius: 8,marginRight:responsiveWidth(5)}}>
                    <Text style={{ color: '#eaeaea', fontSize: 22, textAlign: 'center', marginTop: 0,fontFamily: 'SpaceGrotesk-Regular' }}>Next</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View> 
       )
}

export default Provider;

const styles = StyleSheet.create({
    container: {
        width: 113,
        height: 152,
        backgroundColor: '#eaeaea',
        borderColor: '#333333',
        borderWidth: 1,
        borderRadius: 5,
     
       
        
        marginTop: 25,
    }
})