import { View, Text } from 'react-native'
import React ,{useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Profile from '../screens/Profile';

import Appointments from '../screens/Provider/Appointments';
import Login from '../screens/Login';

import Signin from '../screens/Signin';


import EditPersonalInfo from '../screens/EditProfile/EditPersonalInfo';
import Accepted from '../screens/Provider/Accpeted';
import CreateAppointment from '../screens/Provider/CreateAppointment';
import Telemed1 from '../screens/Provider/LocationType';
import Facility from '../screens/Provider/Facility';
import PatientDetails from '../screens/Provider/PatientDetails';
import Calendar from '../screens/Provider/Calendar';
import Provider from '../screens/Provider/Provider';
import Proceed from '../screens/Provider/Proceed';
import Pending from '../screens/Provider/Pending';
import ProposedData from '../screens/Provider/ProposedData';
import DetailView from '../screens/Provider/DetailView';
import PatientDetailClinic from '../screens/Provider/PatientDetailClinic';
import NotesUpdate from '../screens/Provider/NotesUpdate';

import Contact from '../screens/EditProfile/Contact';
import TcmPatientDetail from '../screens/Provider/TcmPatientDetail';
import Dischargedate from '../screens/Provider/Dischargedate';
import TcmProceed from '../screens/Provider/TcmProceed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
import TransitionalList from '../screens/Provider/TransitionalList';
import OutPatientProceed from '../screens/Provider/OutPatientFlow/OutPatientProceed';
import OutPatientProvider from '../screens/Provider/OutPatientFlow/OutpatientProvider';
import OpLocationType from '../screens/Provider/OutPatientFlow/OpLocationType';
import ProposeTime from '../screens/Provider/ProposeTime';
import Availability from '../screens/Provider/Availability/Availability';
import AvailabilityUpdate from '../screens/Provider/Availability/AvailabilityUpdate';
import OutpatientReferralList from '../screens/Provider/OutPatientFlow/OutPatientReferralList';
import Reschedule from '../screens/Provider/Reschedule';
import RescheduleProvider from '../screens/Provider/RescheduleProvider';
import RescheduleProceed from '../screens/Provider/RescheduleProceed';
import OpFacility from '../screens/Provider/OutPatientFlow/OpFacility';
import OpPatientDetail from '../screens/Provider/OutPatientFlow/OpPatientDetail';
import EditAddress from '../screens/EditProfile/EditAddress';
import WeekDay from '../screens/Provider/Availability/WeekDay';
import WeekDayUpdate from '../screens/Provider/Availability/WeekDayUpdate';
import FacilityAcceptedRef from '../screens/Provider/FacilityVisitFlow/FacilityAcceptedRef';
import FacilityPendingRef from '../screens/Provider/FacilityVisitFlow/FacilityPendingRef';
import FacilityProposeRef from '../screens/Provider/FacilityVisitFlow/FacilityProposeRef';
import FacilityPropose from '../screens/Provider/FacilityVisitFlow/FacilityPropose';
import ScribeAppointments from '../screens/Scribe/ScribeAppointments';
import ScribeAccepted from '../screens/Scribe/ScribeAccepted';
import ScribePending from '../screens/Scribe/ScribePending';
import ScribeProposedData from '../screens/Scribe/ScribeProposed';
import ScribeLocationType from '../screens/Scribe/ScribeLocationType';
import ScribeCreateAppointment from '../screens/Scribe/ScribeCreateAppointment';
import ScribeOpAccepted from '../screens/Scribe/ScribeOpAccepted';
import ScribeFacilityAccepted from '../screens/Scribe/ScribeFacilityAccepted';
import ScribeFacilityPending from '../screens/Scribe/ScribeFacilityPending';
import ScribeFacilityProposed from '../screens/Scribe/ScribeFacilityProposed';

import ScribeOpLocationType from '../screens/Scribe/ScribeOpLocationType';
import ScribeTcmAccepted from '../screens/Scribe/ScribeTcmAccepted';
import ScribeNotification from '../screens/Scribe/ScribeNotification';
import DeclinedList from '../screens/Provider/DeclinedList';

import FacilityDeclinedRef from '../screens/Provider/FacilityVisitFlow/FacilityDeclinedRef';
import FacilityProceed from '../screens/Provider/FacilityProceed';
import ScribeDeclined from '../screens/Scribe/ScribeDeclined';
import ScribeFacDeclined from '../screens/Scribe/ScribeFacDeclined';
import ProviderNotification from '../screens/Provider/ProviderNotification';
import PushNotification from 'react-native-push-notification'; 

import ScribeCreateAppointmentOS from '../screens/Scribe/CreateAppointementOS';
import PendingDetailView from '../screens/Provider/PendingDetailView';
import ProposedDetailView from '../screens/Provider/ProposedDetailView';
import OpDetailView from '../screens/Provider/OutPatientFlow/OpDetailView';
import TcmDetailView from '../screens/Provider/TcmDetailView';
import DeclinedDetailView from '../screens/Provider/DeclinedDetailView';
import PriorAuthProceed from '../screens/Provider/PriorAuthProceed';
import ProceedPropose from '../screens/Provider/ProceedPropose';
import NoteProvider from '../screens/NoteProvider';
import Acceptedforcreated from '../screens/Provider/ProviderCreated/Accepted';
import Pendingforcreated from '../screens/Provider/ProviderCreated/Pending';
import Proposedforcreated from '../screens/Provider/ProviderCreated/Proposed';
import PendingforFcreated from '../screens/Provider/ProviderCreatedFacility/Pending';
import AcceptedforFcreated from '../screens/Provider/ProviderCreatedFacility/Accepted';
import ProposedforFcreated from '../screens/Provider/ProviderCreatedFacility/Proposed';

import CreatedFacilityDeclinedRef from '../screens/Provider/ProviderCreatedFacility/Declined';
import CreatedDeclinedList from '../screens/Provider/ProviderCreated/Declined';

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from './CustomDrawer';

import IonIcons from 'react-native-vector-icons/Ionicons'






const Drawer = createDrawerNavigator();
function DrawerNavigator({route, navigation}) {
  console.log('params', route.params);
  const{ID,Scribe}=route.params;
    return (
    <NoteProvider>
    <Drawer.Navigator 
    
    drawerContent={props=><CustomDrawer {...props}/>
   
   } 
    screenOptions={{headerShown: false, 
  
    }}>  
    {(Scribe==='Provider'||Scribe==='Hospitalist')?(  
    <Drawer.Screen name="Appointment" initialParams={{ID,Scribe}}options ={{drawerIcon:()=> <IonIcons name= 'home-outline'color={"#e6c402"} size={22}/>
    
 //,drawerLabel :()=>null, drawerItemStyle: { display: 'none' }
 ,
  
  drawerLabelStyle:{marginLeft:-20,fontFamily:'SpaceGrotesk-SemiBold',fontSize:15}}}component={AppointmentDashboard} 
    
    />
    ):(
    <Drawer.Screen name="Appointment" initialParams={{ID,Scribe}}options ={{drawerIcon:()=> <IonIcons name= 'home-outline'color={"#e6c402"} size={22}/>
    
    //,drawerLabel :()=>null, drawerItemStyle: { display: 'none' }
    ,
     
     drawerLabelStyle:{marginLeft:-20,fontFamily:'SpaceGrotesk-SemiBold',fontSize:15}}}component={ScribeAppointmentDashboard} 
       
       />
    )}
    <Drawer.Screen name="Profiles" options ={{drawerIcon:()=><IonIcons name='person-outline' size={23} color={"#e6c402"}/>,drawerLabel : "Profile",
    drawerLabelStyle:{fontFamily:'SpaceGrotesk-SemiBold',fontSize:15,color:'#333333',marginLeft: -20}}}component={ProfileDashboard} />
    </Drawer.Navigator>
    </NoteProvider>
  );
}



const Stack = createNativeStackNavigator();

const LoginNavigator=()=>{
  return(
  <NoteProvider>
    <Stack.Navigator
    initialRouteName='Loader'
    screenOptions={{orientation: 'portrait' }}
    >
        <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />
            <Stack.Screen
                    name='Loader'
                    component={Loader}
                    options={{ headerShown: false}}
                />
                  <Stack.Screen
            name='Signin'
            component={Signin}
            options={{ headerShown: false,animation:'fade_from_bottom'}}
        />
                <Stack.Screen
                    name='DrawerNavigator'
                    component={DrawerNavigator}
                    options={{ headerShown: false}}
                />
      </Stack.Navigator>
      </NoteProvider>
  )
}


const ProfileDashboard=()=>{
  return(
    <Stack.Navigator
    initialRouteName='Profile'
    screenOptions={{orientation: 'portrait' }}
    >
              <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{ headerShown: false,animation:'slide_from_left' }}
                /> 
              <Stack.Screen
               name='EditAddress'
               component={EditAddress}
  
           options={{ headerShown: false,animation:'slide_from_right' }}
               />
              <Stack.Screen  
                    name='WeekDayUpdate'
                    component={WeekDayUpdate}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='WeekDay'
                    component={WeekDay}
                   
                    
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name='AvailabilityUpdate'
                    component={AvailabilityUpdate}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='Availability'
                    component={Availability}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='EditPersonalInfo'
                    component={EditPersonalInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Contact'
                    component={Contact}
                    options={{ headerShown: false }}
                />
</Stack.Navigator>
  )
  
}

const ScribeAppointmentDashboard=({route,navigation})=>{
  const{ID,Scribe}=route.params;
  return (
       
    
    <Stack.Navigator
   
    initialRouteName='ScribeAppointments'
screenOptions={{orientation: 'portrait' }}
    >
        
  
         
         <Stack.Screen
            name='ProceedPropose'
            component={ProceedPropose}
           
            
            options={{ headerShown: false }}
        />
           <Stack.Screen
            name='TransitionalList'
            component={TransitionalList}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          
         <Stack.Screen
            name='PendingDetailView'
            component={PendingDetailView}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='ProposedDetailView'
            component={ProposedDetailView}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='PriorAuthProceed'
            component={PriorAuthProceed}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='DeclinedDetailView'
            component={DeclinedDetailView}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='createdDeclinedList'
            component={CreatedDeclinedList}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='createdFacilityDeclinedRef'
            component={CreatedFacilityDeclinedRef}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
           <Stack.Screen
            name='TcmDetailView'
            component={TcmDetailView}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='OpDetailView'
            component={OpDetailView}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='ScribeAccepted'
            component={ScribeAccepted}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='ScribePending'
            component={ScribePending}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ScribeTcmAccepted'
            component={ScribeTcmAccepted}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='ScribeNotification'
            component={ScribeNotification}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />

         <Stack.Screen
            name='DeclinedList'
            component={DeclinedList}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        <Stack.Screen
            name='FacilityDeclinedRef'
            component={FacilityDeclinedRef}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='ScribeProposedData'
            component={ScribeProposedData}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        <Stack.Screen
            name='FacilityProceed'
            component={FacilityProceed}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        <Stack.Screen
            name='ScribeDeclined'
            component={ScribeDeclined}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        <Stack.Screen
            name='ScribeFacDeclined'
            component={ScribeFacDeclined}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ProviderNotification'
            component={ProviderNotification}
            
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name='ScribeFacilityAccepted'
            component={ScribeFacilityAccepted}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ScribeFacilityPending'
            component={ScribeFacilityPending}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ScribeFacilityProposed'
            component={ScribeFacilityProposed}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ScribeOpLocationType'
            component={ScribeOpLocationType}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         
        <Stack.Screen
            name='ScribeOpAccepted'
            component={ScribeOpAccepted }
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='ScribeCreateAppointment'
            component={ScribeCreateAppointment}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ScribeLocationType'
            component={ScribeLocationType}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='FacilityAcceptedRef'
            component={FacilityAcceptedRef}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='ScribeAppointments'
            component={ScribeAppointments}
            initialParams={{ID,Scribe}}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ScribeCreateAppointmentOS'
            component={ScribeCreateAppointmentOS}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='FacilityPendingRef'
            component={FacilityPendingRef}
            
            options={{ headerShown: false,animation:'slide_from_right' }} 
        />
         <Stack.Screen
            name='Acceptedforcreated'
            component={Acceptedforcreated}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='Pendingforcreated'
            component={Pendingforcreated}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='Proposedforcreated'
            component={Proposedforcreated}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='PendingforFcreated'
            component={PendingforFcreated}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='AcceptedforFcreated'
            component={AcceptedforFcreated}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ProposedforFcreated'
            component={ProposedforFcreated}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='FacilityProposeRef'
            component={FacilityProposeRef}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='OpPatientDetail'
            component={OpPatientDetail}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        
          <Stack.Screen
            name='OpFacility'
            component={OpFacility}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='OutPatientReferralList'
            component={OutpatientReferralList}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        
          <Stack.Screen
            name='Reschedule'
            component={Reschedule}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='RescheduleProceed'
            component={RescheduleProceed}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='RescheduleProvider'
            component={RescheduleProvider}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        
         
          <Stack.Screen
            name='OutPatientProceed'
            component={OutPatientProceed}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='OpLocationType'
            component={OpLocationType}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
          <Stack.Screen
            name='OutPatientProvider'
            component={OutPatientProvider}
            
            options={{ headerShown: false,animation:'slide_from_right' }}
        />


       
         
            <Stack.Screen
            name='Dischargedate'
            component={Dischargedate}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='TcmPatientDetail'
            component={TcmPatientDetail}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        
          <Stack.Screen
            name='DetailView'
            component={DetailView}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ProposedData'
            component={ProposedData}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
         <Stack.Screen
            name='ProposeTime'
            component={ProposeTime}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        
       
        
         {/* <Stack.Screen
            name='Profile'
            component={Profile}
            options={{ headerShown: false,animation:'slide_from_left' }}
        /> */}
          <Stack.Screen
            name='NotesUpdate'
            component={NotesUpdate}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
           <Stack.Screen
            name='TcmProceed'
            component={TcmProceed}
            options={{ headerShown: false,animation:'slide_from_right' }}
        />
        
         <Stack.Screen
         initialParams={{ ID,Scribe }}
            name='Appointments'
            component={Appointments}
            options={{ headerShown: false }}
        />
          <Stack.Screen
            name='FacilityPropose'
            component={FacilityPropose}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name='Accepted'
            component={Accepted}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name='CreateAppointment'
            component={CreateAppointment}
            options={{ headerShown: false }}
        />
          <Stack.Screen
            name='Pending'
            component={Pending}
            options={{ headerShown: false }}
        />
         
         <Stack.Screen
            name='PatientDetailClinic'
            component={PatientDetailClinic}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name='Telemed1'
            component={Telemed1}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name='Facility'
            component={Facility}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name='PatientDetails'
            component={PatientDetails}
            options={{ headerShown: false }}
        />
         <Stack.Screen
            name='Calendar'
            component={Calendar}
            options={{ headerShown: false ,animation:'slide_from_right'}}
        />

         <Stack.Screen
            name='Provider'
            component={Provider}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='Proceed'
            component={Proceed}
            options={{ headerShown: false }}
        />
        </Stack.Navigator>
  )
}


const AppointmentDashboard  = ({route, navigation}) => {
const{ID,Scribe}=route.params;

        return (
       
    
            <Stack.Navigator
           
            initialRouteName='Appointments'
       screenOptions={{orientation: 'portrait' }}
            >
                
          
                 
                 <Stack.Screen
                    name='ProceedPropose'
                    component={ProceedPropose}
                   
                    
                    options={{ headerShown: false }}
                />
                   <Stack.Screen
                    name='TransitionalList'
                    component={TransitionalList}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 
                 <Stack.Screen
                    name='PendingDetailView'
                    component={PendingDetailView}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='ProposedDetailView'
                    component={ProposedDetailView}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='PriorAuthProceed'
                    component={PriorAuthProceed}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='DeclinedDetailView'
                    component={DeclinedDetailView}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='createdDeclinedList'
                    component={CreatedDeclinedList}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='createdFacilityDeclinedRef'
                    component={CreatedFacilityDeclinedRef}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                   <Stack.Screen
                    name='TcmDetailView'
                    component={TcmDetailView}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='OpDetailView'
                    component={OpDetailView}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='ScribeAccepted'
                    component={ScribeAccepted}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='ScribePending'
                    component={ScribePending}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ScribeTcmAccepted'
                    component={ScribeTcmAccepted}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='ScribeNotification'
                    component={ScribeNotification}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />

                 <Stack.Screen
                    name='DeclinedList'
                    component={DeclinedList}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                <Stack.Screen
                    name='FacilityDeclinedRef'
                    component={FacilityDeclinedRef}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='ScribeProposedData'
                    component={ScribeProposedData}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                <Stack.Screen
                    name='FacilityProceed'
                    component={FacilityProceed}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                <Stack.Screen
                    name='ScribeDeclined'
                    component={ScribeDeclined}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                <Stack.Screen
                    name='ScribeFacDeclined'
                    component={ScribeFacDeclined}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ProviderNotification'
                    component={ProviderNotification}
                    
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='ScribeFacilityAccepted'
                    component={ScribeFacilityAccepted}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ScribeFacilityPending'
                    component={ScribeFacilityPending}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ScribeFacilityProposed'
                    component={ScribeFacilityProposed}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ScribeOpLocationType'
                    component={ScribeOpLocationType}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 
                <Stack.Screen
                    name='ScribeOpAccepted'
                    component={ScribeOpAccepted }
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='ScribeCreateAppointment'
                    component={ScribeCreateAppointment}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ScribeLocationType'
                    component={ScribeLocationType}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='FacilityAcceptedRef'
                    component={FacilityAcceptedRef}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                  initialParams={{ID,Scribe}}
                    name='ScribeAppointments'
                    component={ScribeAppointments}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ScribeCreateAppointmentOS'
                    component={ScribeCreateAppointmentOS}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='FacilityPendingRef'
                    component={FacilityPendingRef}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }} 
                />
                 <Stack.Screen
                    name='Acceptedforcreated'
                    component={Acceptedforcreated}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='Pendingforcreated'
                    component={Pendingforcreated}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='Proposedforcreated'
                    component={Proposedforcreated}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='PendingforFcreated'
                    component={PendingforFcreated}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='AcceptedforFcreated'
                    component={AcceptedforFcreated}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ProposedforFcreated'
                    component={ProposedforFcreated}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='FacilityProposeRef'
                    component={FacilityProposeRef}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='OpPatientDetail'
                    component={OpPatientDetail}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                
                  <Stack.Screen
                    name='OpFacility'
                    component={OpFacility}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='OutPatientReferralList'
                    component={OutpatientReferralList}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                
                  <Stack.Screen
                    name='Reschedule'
                    component={Reschedule}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='RescheduleProceed'
                    component={RescheduleProceed}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='RescheduleProvider'
                    component={RescheduleProvider}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                
                 
                  <Stack.Screen
                    name='OutPatientProceed'
                    component={OutPatientProceed}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='OpLocationType'
                    component={OpLocationType}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                  <Stack.Screen
                    name='OutPatientProvider'
                    component={OutPatientProvider}
                    
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />


               
                 
                    <Stack.Screen
                    name='Dischargedate'
                    component={Dischargedate}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='TcmPatientDetail'
                    component={TcmPatientDetail}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                
                  <Stack.Screen
                    name='DetailView'
                    component={DetailView}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ProposedData'
                    component={ProposedData}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                 <Stack.Screen
                    name='ProposeTime'
                    component={ProposeTime}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                
                 <Stack.Screen
                    name='Signin'
                    component={Signin}
                    options={{ headerShown: false,animation:'fade_from_bottom'}}
                />
                
                 {/* <Stack.Screen
                    name='Profile'
                    component={Profile}
                    options={{ headerShown: false,animation:'slide_from_left' }}
                /> */}
                  <Stack.Screen
                    name='NotesUpdate'
                    component={NotesUpdate}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                   <Stack.Screen
                    name='TcmProceed'
                    component={TcmProceed}
                    options={{ headerShown: false,animation:'slide_from_right' }}
                />
                
                 <Stack.Screen
                 initialParams={{ ID,Scribe }}
                    name='Appointments'
                    component={Appointments}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name='FacilityPropose'
                    component={FacilityPropose}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='Accepted'
                    component={Accepted}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='CreateAppointment'
                    component={CreateAppointment}
                    options={{ headerShown: false }}
                />
                  <Stack.Screen
                    name='Pending'
                    component={Pending}
                    options={{ headerShown: false }}
                />
                 
                 <Stack.Screen
                    name='PatientDetailClinic'
                    component={PatientDetailClinic}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='Telemed1'
                    component={Telemed1}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='Facility'
                    component={Facility}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='PatientDetails'
                    component={PatientDetails}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name='Calendar'
                    component={Calendar}
                    options={{ headerShown: false ,animation:'slide_from_right'}}
                />

                 <Stack.Screen
                    name='Provider'
                    component={Provider}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Proceed'
                    component={Proceed}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
         
            
       
    )
}



export default LoginNavigator;