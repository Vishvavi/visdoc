import { FlatList, Image, ScrollView, StyleSheet,SafeAreaView,ToastAndroid, Text,RefreshControl, TouchableOpacity,TouchableHighlight,Animated,Easing,LayoutAnimation, View, Alert } from 'react-native'
import React, { useState ,useEffect,useRef,useCallback} from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'



import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/Header';
import { useIsFocused,useRoute } from '@react-navigation/native'
import { useNotes } from '../NoteProvider'
import URL from '../Components/URL'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import useProgressViewOffset from '../Components/ProgressViewOffset'
import List from '../Styles/List'
import { responsiveWidth ,useDimensionsChange,responsiveHeight} from 'react-native-responsive-dimensions'
import TabStyle from '../Styles/TabStyle'
import CheckBox from '../Styles/CheckBox'
import { Root, Popup ,Toast} from 'popup-ui';






const Pending = ({navigation,route}) => {
 

  const{Tab,ID,selectedDate,Scribe,AppointmentId,usercreated,Redirect,}=route.params;
   



    const [selectedTab, setSelectedTab] = useState(0);
    
   
    const[Pending,setPending]=useState([]);
    const[isOpen,setIsOpen]=useState(false);
    const[AllLocation,setAllLocation]=useState(false);
    const[Clinic,setClinic]=useState(false);
    const[Facility,setFacility]=useState(false);
    const[HomeHealth,setHomeHealth]=useState(false);
    const[Visible,setVisible]=useState(true);
    const [refreshing, setRefreshing] = useState(false);
   const[UserCreated,setUserCreated]=useState(usercreated||false);
   const[redirect,setredirect]=useState(Redirect);
   const[Detailflow,setDetailflow]=useState([]);
   const[Disable,setDisable]=useState(false);
   const[Rowcount,setRowcount]=useState(false);
   const{count,setcount,NotificationLog,TimerList,TimerReferralList,ListRowcount}=useNotes()
    
    const progressViewOffset = useProgressViewOffset();
   

    useDimensionsChange(
      useCallback(({ window, screen }) => {
      
     
      }, [])  
    ); 

    

    
    var curr = new Date; // get current date
    var first = curr.getDate() ; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    const firstday =moment(new Date(curr.setDate(first))).format("YYYY-MM-DD");
    const lastday = moment(new Date(curr.setDate(last))).format("YYYY-MM-DD");

    const ToastShow=()=>{
      Toast.show({
        type:'Warning',
        title:'Already Accepted',
        color:'yellow'
        
      })
    }

   
   
    const Alert=()=>{

   
      Popup.show({
        type: 'Warning',
        title: 'Expired',
        button: true,
        button2:false,
        textBody: 'Time Expired',
        buttonText: 'Ok',
        callback: () => {Popup.hide()
      
        },
          
        callback2:()=>{
          Popup.hide()
          console.log('hide')}
      })
      }
  
    useEffect(()=>{
     
    const focus=navigation.addListener('focus',()=>{

        
        console.log(Tab)
        console.log(Scribe)
        console.log(ID)
        console.log('usecreates:',UserCreated)
        console.log('noti',usercreated)
        console.log('Redirect',Redirect)
       
      console.log(Tab3Url)
   //  const UserCreated=usercreated
    //setUserCreated(true)
     
        PendingReferalList(UserCreated);
      });
     return focus
   
    
     
      
    },[navigation,route.params,UserCreated])

    setTimeout(()=>{
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   setredirect(false)
   },10000
   )

const selecteddata=redirect===true?Pending.find((item)=>item.AppointmentId===AppointmentId):Pending

    let tomorrow = new Date();
    tomorrow = moment(tomorrow).add(1, 'day').format('YYYY-MM-DD');


   
    
     useEffect(()=>{

      console.log('currenttime',CurrentTime)
      console.log('currenttime',(new Date().getMinutes()))

     },[])
     
const CurrentTime=`${moment(new Date()).format('HH:mm:ss')}`

    const ProviderAccept=async(data)=>{
      const data1={
        UserId: `${ID}`,
        AppointmentId: data.item.AppointmentId,
        Status: "Accept"
    };
      console.log(data.item.AppointmentId) 
      const newdate=moment(new Date()).format('YYYY-MM-DD')
    if((data.item.AppointmentTime<CurrentTime)&&(data.item.AppointmentDate===newdate)){
      console.log('expired')
      Alert()
   
}
else{
 
console.log(data1)

  const url=URL.TelemedUpdateStatus;
   fetch(url,{

    method: 'PUT',
   headers: { 
      
      'Content-Type': 'application/json' 
      },
   body:JSON.stringify(data1)

}).then(response=>response?.json()).then(json=>{
  console.log(json);
  PendingReferalList();
  TimerReferralList()
 // setProvider(json.Providers);
}).catch(e=>{
  console.log("e",e)
  
})
 
}
    }
      
      const ProviderDecline=async(data)=>{
        console.log(data.item.AppointmentId) 
  
        const data1={
            UserId: `${ID}`,
            AppointmentId: data.item.AppointmentId,
            Status: "Decline"
        }
        
          const url=URL.TelemedUpdateStatus;
           fetch(url,{
        
            method: 'PUT',
           headers: { 
              
              'Content-Type': 'application/json' 
              },
           body:JSON.stringify(data1)
        
        }).then(response=>response.json()).then(json=>{
          console.log(json);
          PendingReferalList();
         // setProvider(json.Providers);
        }).catch(e=>{
          console.log("e",e)
        })}

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };



      
      const Tab0Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${firstday}`
     const Tab1Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${tomorrow}&enddate=${tomorrow}`
     const Tab2Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${firstday}&enddate=${lastday}`

     const Tab3Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${firstday}`
     const Tab4Url=URL.PendingTabUrl+`Provider/${ID}?startdate=${selectedDate}&enddate=${selectedDate}`
    
 
  
  const PendingReferalList = async(UserCreated)=>{
   

        if(Tab===0){
         
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
              try{
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
                console.log('clinc')

            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
            }catch(e){
              console.log(e);
            }
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
            try{
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result);
            }catch(e){
              console.log(e);
            }}
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
          try{
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setPending(result?.ListOfRefferals);
            console.log(result)
            console.log('homehealth')
          }catch(e){
            console.log(e);
          }


        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
          try{
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setPending(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }


        }
        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
      try{
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
          
           setPending(result?.ListOfRefferals);
            console.log(result)
      }catch(e){
        console.log(e);
      }


        }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
          try{
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab0Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
             setPending(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }

        }
        else{
          try{
            const url=Tab0Url;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }

        }
    }

        else if(Tab===1){
         
           
          if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
            try{
            const LocationTypes='&locationtype=Taurus%20Clinic'
             
            console.log('clinc')

            const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
      
       setPending(result?.ListOfRefferals);
        console.log(result)
             } catch(e){
              console.log(e);

       }
    }
    else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
      try{
        
      const LocationTypes='&locationtype=Facility'
        console.log('facility')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }


    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
      try{
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
      
       setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }
    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
       try{
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
       }catch(e){
        console.log(e);
       }

    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
      try{
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
            }


    }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
      try{
        const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab1Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
         setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }
      }
    else{
      try{
        const url=Tab1Url
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }

    }
        }
        else if(Tab===2){
            if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
              try{
                const LocationTypes='&locationtype=Taurus%20Clinic'
                 
              
    
                const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
        
           setPending(result?.ListOfRefferals);
              }catch(e){
                console.log(e);
              }
           
        }
        else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
          try{
            
          const LocationTypes='&locationtype=Facility'
            console.log('facility')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }
    
        }
        else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
          try{
            const LocationTypes='&locationtype=Home%20Health'
            console.log('homehealth')
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }
    
    
        }
        else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
           try{
            const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            
           setPending(result?.ListOfRefferals);
            console.log(result)
           }catch(e){
            console.log(e);
           }
    
    
        }
        else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
          try{
            const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
            setRowcount(result?.Rowcount);
           setPending(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }
    
        }
        else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
          try{
            const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
            const url=Tab2Url+`${LocationTypes}`;
            let result=await fetch(url);
            result=await result.json();
           
             setPending(result?.ListOfRefferals);
            console.log(result)
          }catch(e){
            console.log(e);
          }
    
    
        }
        else{
           try{
            const url=Tab2Url;
            let result=await fetch(url);
            result=await result.json();
           
           setPending(result?.ListOfRefferals);
            console.log(result)
           }catch(e){
            console.log(e);
           }
        }
    }
     else if(Tab===3){
        if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
          try{
            const LocationTypes='&locationtype=Taurus%20Clinic'
             
            

            const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
      
       setPending(result?.ListOfRefferals);
        console.log(result)
          }catch(e){
            console.log(e);
          }
    }
    else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
        try{
      const LocationTypes='&locationtype=Facility'
        console.log('facility')
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
    
       setPending(result?.ListOfRefferals);
        console.log(result)
        }catch(e){
          console.log(e);
        }


    }
    else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
      try{
        const LocationTypes='&locationtype=Home%20Health'
        console.log('homehealth')
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }
    }
    else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
      try{
        const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }


    }
    else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
      try{
        const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
       
       setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }
      


    }
    else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
      try{
        const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
        const url=Tab3Url+`${LocationTypes}`;
        let result=await fetch(url);
        result=await result.json();
        setRowcount(result?.Rowcount);
         setPending(result?.ListOfRefferals);
        console.log(result)
      }catch(e){
        console.log(e);
      }
      


    }
    else{
      try{
        const url=Tab3Url;
       console.log(url)
        let result=await fetch(url);
        result=await result.json();
       
       // const filterData=result?.ListOfRefferals.filter((item)=>item.AppointmentId===AppointmentId)
       //setPending(filterData);
     //  console.log('filterdata',filterData)
        //}
      //  else{
       
          setPending(result?.ListOfRefferals)
          setRowcount(result?.Rowcount);
          const lis=result.ListOfRefferals
          lis.forEach((item)=>
          {
            if((item.AppointmentId===AppointmentId)){
       // ToastShow()
      //ToastAndroid.show('Accepted/Declined',ToastAndroid.CENTER)
            }}
          )
    

      
      }catch(e){
        console.log(e);
      }

    }
        
     
}

else if(Tab===4){

  if((Clinic===true)&&(Facility!=true)&&(HomeHealth!=true)){
    try{
      const LocationTypes='&locationtype=Taurus%20Clinic'
       const url=Tab4Url+`${LocationTypes}`;
     let result=await fetch(url);
     result=await result.json();
  
   setPending(result?.ListOfRefferals);
   console.log(result)
    }catch(e){
      console.log(e);
    }
}
else if((Facility===true)&&(HomeHealth!=true)&&(Clinic!=true)){
  try{
    const LocationTypes='&locationtype=Facility'
   console.log('facility')
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
  
 setPending(result?.ListOfRefferals);
  console.log(result)
  }catch(e){
    console.log(e);
  }


}
else if((HomeHealth===true)&&(Facility!=true)&&(Clinic!=true)){
  try{
  const LocationTypes='&locationtype=Home%20Health'
  console.log('homehealth')
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
 setPending(result?.ListOfRefferals);
  console.log(result)
  }catch(e){
    console.log(e);
  }


}
else if((Facility===true)&&(Clinic===true)&&(HomeHealth!=true)){
 try{
  const LocationTypes='&locationtype=Facility&locationtype=Taurus%20Clinic'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
  
 setPending(result?.ListOfRefferals);
  console.log(result)
 }catch(e){
  console.log(e);
 }

}
else if((Facility===true)&&(HomeHealth===true)&&(Clinic!=true)){
  try{
  const LocationTypes='&locationtype=Facility&locationtype=Home%20Health'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
 setPending(result?.ListOfRefferals);
  console.log(result)
  }catch(e){
    console.log(e);
  }


}
else if((Clinic===true)&&(HomeHealth===true)&&(Facility!=true)){
  try{
  const LocationTypes='&locationtype=Taurus%20Clinc&locationtype=Home%20Health'
  const url=Tab4Url+`${LocationTypes}`;
  let result=await fetch(url);
  result=await result.json();
 
   setPending(result?.ListOfRefferals);
  console.log(result)
  }catch(e){
    console.log(e);  }


}
else{
 try{
  const url=Tab4Url;
  let result=await fetch(url);
  result=await result.json();
 
 setPending(result?.ListOfRefferals);
  console.log(result)
 }catch(e){
  console.log(e);
}
}
  

}

}
const scrollRef = useRef();

function scrollToTop() {
  scrollRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true
  })
}

//setTimeout(() => {
 // setspinner(false)
//}, 10000);

const onRefresh =() => {
  
  setRefreshing(true);
  PendingReferalList();
  setTimeout(() => {
    setRefreshing(false);
  }, 5000);
};   

const onRefresh1=()=>{
  setUserCreated(usercreated)
  PendingReferalList(UserCreated)
  console.log(usercreated)
  console.log(UserCreated)
}

const xOffset = new Animated.Value(0);

const ProviderCancel=async(data)=>{
  

  const data1={
      UserId: `${ID}`,
      AppointmentId:data.item.AppointmentId,
      Status: "Cancel"
     
     
  }
  
    const url="https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateStatus"
     fetch(url,{
  
      method: 'PUT',
     headers: { 
        
        'Content-Type': 'application/json' 
        },
     body:JSON.stringify(data1)
  
  }).then(response=>response.json()).then(json=>{
    console.log(json);

   if(json.Result==="Cancelled Successfully"){
   PendingReferalList(UserCreated)
    }
  
  }).catch(e=>{
    console.log("e",e)
  })}



  const sortedData=Pending?.sort((a,b)=>{
    const dataCompare=a.AppointmentDate.localeCompare(b.AppointmentDate);
    if(dataCompare!==0){
        return dataCompare;
    }
    return a.AppointmentTime.localeCompare(b.AppointmentTime);
});



    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
      };

    const renderHiddenItem = (data, rowMap) => (
        <Animated.View style={[styles.rowBack,{

        flex:1
        }]}>

         
           <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => {
              ProviderDecline(data)

              closeRow(rowMap, data.item.AppointmentId)}}
          >
            
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Decline</Text>
          </TouchableOpacity>
          
        
          <TouchableOpacity   disabled={Disable} onPress={()=>{ProviderAccept(data)
          closeRow(rowMap,data.item.AppointmentId)
          setDisable(true);
         }
           }
            style={[styles.backRightBtn, styles.backRightBtnRight]}
         
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Accept</Text>
          </TouchableOpacity>
        
          <TouchableOpacity 
        
          onPress={()=>{  
            navigation.navigate("ProposeTime",{ID,AppointmentId:data.item.AppointmentId,Detailflow,Scribe,VisitTypeId:"1000",item:data.item})
          closeRow(rowMap,data.item.AppointmentId)}
           }
            style={[styles.backRightBtn,styles.backRightBtnRight, {right:75,width:75,borderRightWidth:1,borderRightColor:'white',backgroundColor:"#808080"}]}
         
          >
            <Text style={{color:'white',fontSize:12,fontFamily:'SpaceGrotesk-Regular'}}>Propose</Text>
          </TouchableOpacity>
        
        
        </Animated.View>
      );


      const slideout=()=>{
  
      //  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(!isOpen);
         
        }

       
          
        
         
    
    const SlotView = ({item} ) => {

     

        return (

        
      
            <TouchableHighlight
            onPress={() => navigation.navigate('PendingDetailView',{ID,Scribe,item,VisitTypeId:"1000",Usercreated:UserCreated
            })}
            style={{ 
              
              backgroundColor:item.AppointmentId===AppointmentId?'#A9A9A9':'#dcdcdc'}}
            underlayColor={'#AAA'}
            >
      
            <View style={{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}}>
                
                <View style={[List.TopLabel,{width:responsiveWidth(60)}]}>
                  {item?.LocationTypeName==='Facility'&&(
                    <Text style={List.TopLabelText}>{item?.LocationTypeName}-{item?.FacilityName}</Text>
                    )}
                    {item?.LocationTypeName==='Home Health'&&(
                      <Text style={List.TopLabelText}>{item?.LocationTypeName}-{item?.HomeHealthCompanyName}</Text>
                    )}
                       {item?.LocationTypeName==='Taurus Clinic'&&(
                      <Text style={List.TopLabelText}>{item?.LocationTypeName}</Text>
                    )}
                   </View>
                  
                   <View style={List.Contentview}>
                    <View style={List.PcheckBox}>
                    {// <Octicons style={{ color:'green',alignSelf:'center' }} name='check' size={scale(22)} />
    }
        <Text style={{color:'white',fontFamily:'SpaceGrotesk-Regular',fontSize:12}}>P</Text>
                    </View>
                   <View>
                   <View style={{flexDirection:'row'}}>
                    <Text style={[List.Text,{width:responsiveWidth(30)}]}>{moment(item.AppointmentTime,"HH:mm:ss").format('hh:mm A')}</Text>
                     <Text style={[List.Text,{width:responsiveWidth(40)}]}>{item.SpecialtyType}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                    <Text style={[List.Text2,{width:responsiveWidth(30)}]}>{item.AppointmentDate}</Text>
                    <Text style={[List.Text2,{width:responsiveWidth(40)}]}>{item.PatientName}</Text>
                    </View>
                    </View>
                    </View>
               
                <View style={{borderBottomWidth:1,borderBottomColor:'#808080',marginTop:10}}/>
            </View>
      
       
          
            </TouchableHighlight>
        )
    }
   

  return (
    <Root>
    <MenuProvider>
    <View style={{flex:1,backgroundColor:'#11266c'}}>
    <Header
     onPress={()=>navigation.goBack({selectedTab:Tab})}
    createAppointment={()=>navigation.navigate('CreateAppointment',{ID:ID,Scribe})}
    TabName={'Pending'}
    notification={()=>navigation.navigate('ProviderNotification',{ID:ID,Scribe})}
   
    Scribe={Scribe}
    ID={ID}
     
     />
               
               <View style={{flexDirection:'row',  marginTop:20}}>
               <Text style={{ color: '#eaeaea',
                 marginLeft: responsiveWidth(5),
                 fontSize: 17,

                  fontFamily: 'SpaceGrotesk-Regular' }}>Appointments</Text>

                  
{Tab=== 0 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(firstday,"YYYY-MM-DD").format('MMM DD')}</Text>
                 )}
                  {Tab=== 1 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(tomorrow,"YYYY-MM-DD").format('MMM DD')}</Text>
                 )}
                  {Tab=== 2 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(firstday,'YYYY-MM-DD').format('MMM DD')}-{moment(lastday,'YYYY-MM-DD').format('MMM DD')}</Text>
                 )}
                  {Tab=== 4 &&(
                 <Text style={{ color: '#eaeaea', 
               
                 fontSize: 17,
                 marginTop: 0,
                 fontFamily: 'SpaceGrotesk-Regular' }}> | {moment(selectedDate).format('MMM DD')}</Text>
                 )}

                 </View>
        
        <View style={[TabStyle.TabContainer,{marginLeft:responsiveWidth(5),marginRight:responsiveWidth(5)}]}>
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity style={[TabStyle.Tab,{ backgroundColor: selectedTab == 0 ? '#eaeaea' : '#e6c402',marginLeft:0}] }>
                <Text style={TabStyle.TabText}>Telemed</Text>
            </TouchableOpacity>
            
            <TouchableOpacity  style={[TabStyle.Tab,{marginLeft:16, backgroundColor: selectedTab == 1 ? '#eaeaea' : '#e6c402'}] }>
                <Text style={TabStyle.TabText}>Facility</Text>
            </TouchableOpacity>
          
      
         </View>

         <Menu opened={isOpen}>
                <MenuTrigger>
                    <TouchableOpacity onPress={()=>slideout()}>
                    <Text> <Entypo style={{  color: '#e6c402' }} name='list' size={30} /></Text>
                    </TouchableOpacity>
                    </MenuTrigger> 
                <MenuOptions optionsContainerStyle={CheckBox.MenuPopup}>
                  <MenuOption disableTouchable={true}
                  disabled={true}
                  >
                    
                  <TouchableOpacity onPress={() => {
                    if(AllLocation===true){
                    setAllLocation(false)
                    setHomeHealth(false)
                    setFacility(false)
                    setClinic(false)
                   
                    }
                    else{
                      setAllLocation(true)
                      setHomeHealth(true)
                      setFacility(true)
                      setClinic(true)
                    

                    }
            }
                }>
                    <View style={CheckBox.boxcontainer}>
                   <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: AllLocation?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
                   <Text style={CheckBox.Text}>All Location</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                  <MenuOption>
                  <TouchableOpacity onPress={() => { 
                  if(Clinic===false){
                    setClinic(true)
                    const tab=true
                 //   callback(Clinic)
                }
                else{
                    setClinic(false)
                    const tab=false
                      //  callback(Clinic)
                    }
                }
               
             }>
                    <View style={CheckBox.boxcontainer}>
                    <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: Clinic?'green':'transparent', alignSelf: 'center',}} name='check' size={17} /></View>
                    <Text style={CheckBox.Text}>Clinic</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                  <MenuOption>
                  <TouchableOpacity onPress={() => {
                      if(Facility===false){
                        setFacility(true)
                        const tab1=true
                      //  callback(Facility)
                    }
                    else{
                        setFacility(false)
                        const tab1=false
                        //    callback(Facility)
                        }
                    

                }}>
                  <View style={CheckBox.boxcontainer}>
                  <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: Facility?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
                    <Text style={CheckBox.Text}>Facility</Text>
                   </View>
                   </TouchableOpacity>
                  </MenuOption>
                  <MenuOption>
                  <TouchableOpacity onPress={() => { 
                      if(HomeHealth===false){
                        setHomeHealth(true)
                        const tab2=true
                      //  callback(tab2)
                    }
                    else{
                        setHomeHealth(false)
                        const tab2=false
                        //    callback(tab2)
                        }
                    
                }}>
                  <View style={CheckBox.boxcontainer}>
                  <View style={CheckBox.checkboxsize}>
                    <Octicons style={{ color: HomeHealth ?'green':'transparent', alignSelf: 'center', }} name='check' size={17} /></View>
                    <Text style={CheckBox.Text}>Home Health</Text>
                   </View>
                   </TouchableOpacity>
                   </MenuOption>
                
                   <TouchableOpacity style={{marginTop:8,alignSelf:'center',marginRight:10,marginBottom:10}} onPress={()=>{PendingReferalList(UserCreated)
                setIsOpen(false);
                }}>
                    <Text style={{color:'black',fontFamily: 'SpaceGrotesk-Regular',fontSize:12}}>OK</Text>
                   </TouchableOpacity>
                 
                </MenuOptions>
              </Menu>

             {//   <TouchableOpacity onPress={() => { setSelectedTab(4)
              
               // }}>
               //     <Entypo style={{  color: selectedTab == 4 ?  '#eaeaea' : '#e6c402'}} name='list' size={scale(25)} />
                //</TouchableOpacity>
             }
           </View>
            
            <SafeAreaView style={{backgroundColor:'#eaeaea',borderRadius:0,marginTop:0,flex:1,}}>
       
     
            <SwipeListView
            ref={scrollToTop}
           
              refreshControl={
                
                <RefreshControl
           
                progressViewOffset={progressViewOffset}
               
             
              
                refreshing={refreshing} onRefresh={()=>onRefresh()} />
              }
            keyExtractor={(item,index)=>item.AppointmentId.toString()}
            showsVerticalScrollIndicator={false}
          data={sortedData}
          renderItem={SlotView}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
         previewOpenDelay={3000}
        

          //onSwipeValueChange={}
          onRowDidOpen={onRowDidOpen}
        />
      
          {//  <FlatList
            //  contentContainerStyle={{paddingBottom:verticalScale(160)}}
              //  data={Pending}
               // renderItem={SlotView}
               // keyExtractor={item => item.AppointmentId}
            ///>
        }
       {((!selecteddata)&&(Rowcount!==false))&&(
          <Animated.View   style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:'#e6c402'}}>
          <Text  style={{color:'red',fontFamily: 'SpaceGrotesk-Bold',fontSize:12}}>Already Accepted/Cancelled</Text>
          </Animated.View>
       )}

            </SafeAreaView>
    </View>
    </MenuProvider>
    </Root>
  )
}

export default Pending;

const styles = StyleSheet.create({
   
   
    Itemcontainer:{
      
        marginRight:16,
        
    },
   
    rowFront: {
        paddingLeft:16,
        //alignItems: 'center',
        backgroundColor: '#dcdcdc',
      //  justifyContent: 'center',
       // flex: 1,
        //borderRadius:8
      },
      rowBack: {
       // alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'space-between',
        paddingLeft:0,
      },
      backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        
      },
      backRightBtnLeft: {
        backgroundColor: '#808080',
        left: 0,
        borderRadius: 0,
       
      },
      backRightBtnRight: {
        backgroundColor: 'green',
        right: 0,
        borderRadius:0,
        width:75
      },
    Contentview:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'center'
    },
  

})