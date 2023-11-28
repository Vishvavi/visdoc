


const URL={

 TcmAcceptedUrl:`https://visdocapidev.azurewebsites.net/api/TCMReferral/AllReferrals/ScheduledReferrals/?`,
 TcmAcceptedUrl1:`https://visdocapidev.azurewebsites.net/api/TCMReferral/AllReferrals/ScheduledReferrals/`,
 
 
 
 //Telemed accepted Url
 AcceptedUrl:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/AllReferrals/AcceptedReferrals/`,
//Facility accepted Url
 FacAcceptedUrl:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/AllReferrals/AcceptedReferrals/`,
// Telemed Proposed Url
 ProposedUrl:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/AllReferrals/ProposedReferrals/`,
 //Facility Proposed Url
 FacProposedTabUrl:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/AllReferrals/ProposedReferrals/`,
 //Telemed Pending Url
 PendingTabUrl:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/AllReferrals/PendingReferrals/`,
 
//Facility Pending Url
 FacPendingTabUrl:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/AllReferrals/PendingReferrals/`,
 //Telemed Declined Url
 DeclinedTabUrl:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/AllReferrals/DeclinedReferrals/`,
 //Facility Declined Url
 FacDeclinedTabUrl:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/AllReferrals/DeclinedReferrals/`,
//User created Accepted Url
 createdAcceptedUrl:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/AcceptedReferrals/CreatedProvider/`,
//User created Pending Url
 createdPendingUrl:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/PendingReferrals/CreatedProvider/`,
 
 createdProposedUrl: `https://visdocapidev.azurewebsites.net/api/TelemedReferral/ProposedReferrals/CreatedProvider/`,

 createdFAcceptedUrl: `https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/AcceptedReferrals/CreatedProvider/`,
 createdFPendingUrl:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/PendingReferrals/CreatedProvider/`,
 createdFProposedUrl: `https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/ProposedReferrals/CreatedProvider/`,
 createdDeclinedUrl:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/DeclinedReferrals/CreatedProvider/`,
 createdFDeclinedUrl:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/DeclinedReferrals/CreatedProvider/`,
 
 OPList:`https://visdocapidev.azurewebsites.net/api/ClinicReferral/UserReferral/`,
 ProviderOPList:`https://visdocapidev.azurewebsites.net/api/ClinicReferral/AllReferrals/Provider/`,
 
 
 OPProviderList:"https://visdocapidev.azurewebsites.net/api/Clinicprovider/",
 //Login

 Login:"https://visdocapidev.azurewebsites.net/api/Login/LoginMobileDevice",
 Register:"https://visdocapidev.azurewebsites.net/api/RegisterUser",
 SpecialityList:"https://visdocapidev.azurewebsites.net/api/specialities/",
 NotificationLog:"https://visdocapidev.azurewebsites.net/api/PushNotification/ViewLogStatus/",
 UpdateLogStatus:`https://visdocapidev.azurewebsites.net/api/PushNotification/UpdateLogStatus`,
 Profile:`https://visdocapidev.azurewebsites.net/api/profile/`,



ImReady:`https://visdocapidev.azurewebsites.net/api/PushNotification/ReadyNotification`,
ToggleCheck:`https://visdocapidev.azurewebsites.net/api/GetAvailableProviders/`,
ToggleOn:`https://visdocapidev.azurewebsites.net/api/CurrentAvailability/ToggleOn`,
ToggleOff:`https://visdocapidev.azurewebsites.net/api/CurrentAvailability/ToggleOff`,

//Update Refferal
FacilityvisitUpdateStatus:"https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/UpdateStatus",
TelemedUpdateStatus:"https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateStatus",
TelemedProposedUpdateStatus:"https://visdocapidev.azurewebsites.net/api/TelemedReferral/Proposed/UpdateStatus",
FacilityvisitProposedUpdateStatus:"https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/Proposed/UpdateStatus",

//PriorAuthCheck and Request
PriorAuthCheck:`https://visdocapidev.azurewebsites.net/api/PriorAuth/`,
PriorAuthRequest:"https://visdocapidev.azurewebsites.net/api/PriorAuthRequest/",

ProviderList:"https://visdocapidev.azurewebsites.net/api/availableprovider/",
Reschedule:`https://visdocapidev.azurewebsites.net/api/Reschedule`,

FacilityList:`https://visdocapidev.azurewebsites.net/api/facility/`,
HomehealthList:'https://visdocapidev.azurewebsites.net/api/homehealth/',

PatientList:`https://visdocapidev.azurewebsites.net/api/patients/`,
Speciality:`https://visdocapidev.azurewebsites.net/api/specialities/`,

FacilitypatientList:`https://visdocapidev.azurewebsites.net/api/patients/facility/`,
homehealthPatientList:`https://visdocapidev.azurewebsites.net/api/patients/homehealth/`,


RefferingProviderList:"https://visdocapidev.azurewebsites.net/api/providerslist/",

//Post Refferals

PostTcmRef:"https://visdocapidev.azurewebsites.net/api/TCMReferral/",
PostTelemedRef:"https://visdocapidev.azurewebsites.net/api/TelemedReferral/",
PostFacilityVisitRef:"https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/",
PostClinicRef:"https://visdocapidev.azurewebsites.net/api/ClinicReferral/",

//View Refferals 

ViewClinicReferral:"https://visdocapidev.azurewebsites.net/api/ClinicReferral/ViewReferral/",
TelemedViewProposed:"https://visdocapidev.azurewebsites.net/api/TelemedReferral/ViewProposed/",
FacilityvisitViewProposed:'https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/ViewProposed/',
TelemedViewPending:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/ViewPending/`,
FacilityVisitViewPending:`https://visdocapidev.azurewebsites.net/api/FacilityVisitReferral/ViewPending/`,
TelemedViewAccepted:`https://visdocapidev.azurewebsites.net/api/TelemedReferral/ViewAccepted/`,

//Update Notes
TelemedUpdateDetail:"https://visdocapidev.azurewebsites.net/api/TelemedReferral/UpdateDetails",
}
export default URL;