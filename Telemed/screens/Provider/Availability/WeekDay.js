import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image,RefreshControl, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/Feather';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Octicons from 'react-native-vector-icons/Octicons';
import useProgressViewOffset from '../../Components/ProgressViewOffset';
import { Root, Popup ,Toast} from '../../Components/popup-ui';
import { responsiveWidth ,useDimensionsChange} from 'react-native-responsive-dimensions';


const WeekDay = ({navigation,route}) => {
    const{ID}=route.params;

    const [refreshing, setRefreshing] = useState(false);
    const progressViewOffset = useProgressViewOffset();

    const [list, setList] = useState([])
    const onRefresh=()=>{
        setRefreshing(true)
        getListAvailability(ID);
        setTimeout(() => {
            setRefreshing(false);
          }, 3000);
    }
    useDimensionsChange(
        useCallback(({ window, screen }) => {
         
        }, [])  
      );
    const popupshow=()=>{
     
         
      Popup.show({
        type: 'Success',
        title: 'In Activated',
        button: true,
        button2:false,
        textBody: 'In Activated successfully done',
        buttonText: 'Ok',
        callback: () => {Popup.hide()
      
        },
          
        callback2:()=>{
            Popup.hide()
            console.log('hide')}
      })
    }
    
  
    useEffect(()=>{
       
        
        const focusHandler = navigation.addListener('focus', () => {
            getListAvailability(ID);
        });
        return focusHandler;
        }, [navigation]);

        const callback=()=>{
            getListAvailability();
        }

        
    const getListAvailability = async(ID) => {
        try{
        const url=`https://visdocapidev.azurewebsites.net/api/ProviderAvailability/weekly/${ID}`
        let result= await fetch(url);
        result=await result.json();
    if(result?.Availability.code==='EINVALIDSTATE'){
         callback()

        }
        else{
            setList(result?.Availability)
            console.log(result)
        }}
        catch(err) {
                console.log(err)
            }
    }

        
   

   
   
   
const Inactivedate=(inactivedate,inAstime,inAetime)=>{
  
 const data=
    {
        UserId: `${ID}`,
      
          
            Days: `${inactivedate}`,
            StartTime:`${inAstime}`,
            EndTime:`${inAetime}`
        
      }
      console.log(data)

    const url = "https://visdocapidev.azurewebsites.net/api/ProviderAvailability/Weekly/Inactive"
    fetch(url, {

        method: 'PUT',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }).then(response => response.json()).then(json => {
        console.log(json);
        if(json.Result==="Inactivated Successfully"){
      popupshow();
        getListAvailability(ID);
        }
        else{
            console.log('err')
        }
    }).catch(e => {
        console.log("e", e)
    })

}


    const Render = ({ item,index }) => {
        return (
            <View style={[styles.pad,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
             <View style={{flexDirection:'row',padding:20,justifyContent:'space-between'}}>

                  <View style={{}}>
              
                <View style={{flexDirection:'row'}}>
                <Text style={{ color: 'black', fontFamily:'SpaceGrotesk-Medium',fontSize:12,width:responsiveWidth(20),borderWidth:0  }}>Day </Text>
                <Text style={{fontSize:15,color: 'black',}}>{item.Days}</Text>
                </View>
                
                   <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{ color: 'black', fontFamily:'SpaceGrotesk-Medium',fontSize:12,width:responsiveWidth(20), }}>Start Time  </Text>
                <Text style={{fontSize:15,color: 'black',}}>{moment(item.StartTime,"HH:mm:ss").format('hh:mm A')}</Text>
            </View>


                <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{ color: 'black',fontFamily:'SpaceGrotesk-Medium', fontSize:12,width:responsiveWidth(20)}}>End Time </Text>
                <Text style={{fontSize:15,color: 'black',}}>{moment(item.EndTime,"HH:mm:ss").format('hh:mm A')}</Text>
                </View>
                </View>
                <View style={{justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {
         var updateDate=item.Days;
         var startTimes=item.StartTime;
         var endTime=item.EndTime
         navigation.navigate("WeekDayUpdate",{selectedDates:updateDate,ID,startTime:startTimes,Tab:1,endTime:endTime})

                }} style={{ marginTop: 0, marginLeft:20, width: 100,alignItems:'center',justifyContent:'center', height: 40, backgroundColor: 'green', borderRadius: 8 }}>
                    <Text style={{ fontSize: 17, textAlign: 'center',fontFamily:'SpaceGrotesk-Regular',color:'white' }}>Update</Text>
                    

                   

                  
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    var inactivedate=item.Days
                    var inAstime=item.StartTime
                    var InAetime=item.EndTime
                    Inactivedate(inactivedate,inAstime,InAetime)}}
                 style={{ marginTop: 10,marginLeft:20,alignItemsa:'center',justifyContent:'center', width: 100, height: 40, backgroundColor: '#EAEAEA', borderRadius: 8 }}>
                    <Text style={{ fontSize: 17,fontFamily:'SpaceGrotesk-Regular', textAlign: 'center',color:'black' }}>Delete</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }

    return (
        <Root>
           
      
        <SafeAreaView style={styles.container}>
             <View style={{ height: 50,borderWidth:0,backgroundColor:'#11266c',flexDirection:'row',alignItems:'center' }}>
             <View style={{ width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',backgroundColor: '#11266c',borderWidth:0,paddingLeft:responsiveWidth(5),paddingRight:responsiveWidth(5) }}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Octicons style={{ color: '#e6c402',  }} name='arrow-left' size={22} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: '#eaeaea', marginLeft: 20,fontFamily: 'SpaceGrotesk-Regular' }}>Week Availability</Text>
                </View>
                <TouchableOpacity style={{}}onPress={()=>navigation.navigate('WeekDayUpdate',{updateDate:'',startTime:`${moment(new Date()).format('HH:mm:ss')}`,endTime:`${moment(new Date()).format('HH:mm:ss')}`,ID,Tab:0}) }>
                <View style={{height:40,width:40,backgroundColor:'green',alignItems:'center',justifyContent:'center',borderRadius:8}}>
                  <Image source={require('../../../images/png2.png')}
                  style={{height:25,width:25,tintColor:'white'}}
                  />
                  </View>
           
               </TouchableOpacity>
            </View>

          
                
            </View>
         

            <FlatList
             refreshControl={
                <RefreshControl
               
               progressViewOffset={progressViewOffset}
               
               
                 refreshing={refreshing} onRefresh={()=>onRefresh()} />
              }
                data={list}
                renderItem={Render}
                keyExtractor={(item,index)=>index}
            />

        </SafeAreaView>
        </Root>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
    },

    header: {
        height: 50,
        backgroundColor: '#b0c4de'
    },

    thead: {
        fontSize: 20,
        textAlign: 'center',
        top: 10,
        color: '#483d8b',
        fontWeight: 'bold'
    },

    pad: {
        
       
        backgroundColor: 'white',
        marginTop:10,
        borderRadius: 8,
        elevation: 5
    }
})

export default WeekDay;