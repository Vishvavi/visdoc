import React,{useState,useEffect} from "react";

import { Text,View,StyleSheet ,RefreshControl} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import { AppDimensions } from "./Dimensions";

import { ScrollView } from "react-native-gesture-handler";
import useProgressViewOffset from "./ProgressViewOffset";

const ConnectionMessgeScreen=()=>{
    const[isConnected,setIsConnected]=useState(true);
    const progressViewOffset = useProgressViewOffset();
    const [refreshing, setRefreshing] = useState(false);


    useEffect(()=>{
const unScbscribe=NetInfo.addEventListener((state)=>{
    setIsConnected(state.isConnected);
});
return unScbscribe;
    },[]);
    if(isConnected){
        return null;
    }

    const onRefresh=()=>{
     console.log('Refresh')
     setRefreshing(true);

    }

    return(
        <ScrollView 
        refreshControl={
            <RefreshControl
             progressViewOffset={progressViewOffset}
             refreshing={refreshing} onRefresh={()=>onRefresh()} />
          }>
        <View style={{height:AppDimensions.FULL_HEIGHT,alignItems:'center',justifyContent:'center'}}>
         
          
            <Text style={{ fontSize: 17,color:'black',
                
                 fontFamily: 'SpaceGrotesk-Bold'}}>No Internet Connection</Text>
            <Text style={{ fontFamily: 'SpaceGrotesk-Regular',fontSize:12}}>Plase check your internet connection and try again</Text>
           
        </View>
        </ScrollView>
    )

}
export default ConnectionMessgeScreen;