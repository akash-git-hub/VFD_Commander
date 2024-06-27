import './App.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from './commonpages/Login';
import { CreateAccountPage } from './company_owner/Account_Module/createAccount/CreateAccountPage';
import { EditAccount } from './company_owner/Account_Module/editAccount/EditAccount';
import { CreatePlan } from './company_owner/Subscriptions_Plan/createPlans/CreatePlan';
import { ListViewPlan } from './company_owner/Subscriptions_Plan/viewPlans/ListViewPlan';
import Auth from './api_services/Auth';
import { Accountmodule } from './company_owner/Account_Module/Accountmodule';
import { Accountdetails } from './company_owner/Account_Module/accountDetail/Accountdetails';
import { createContext, useState } from 'react';
import { RoleAdminstrator } from './platform_owner/Role_Module/RoleAdminstrator';
import { RoleList } from './platform_owner/Role_Module/RoleList';
import { AdminstratorProfileList } from './platform_owner/User_Profile_Adminstrator/AdminstratorProfileList';
import { ProfileAdminstrator } from './platform_owner/User_Profile_Adminstrator/User_Profile/ProfileAdminstrator';
import { Training } from './platform_owner/Training_Module/Training';
import { TrainingList } from './platform_owner/Training_Module/TrainingList';
import { InventoryModule } from './platform_owner/Inventory_Module/InventoryModule';
import { InventoryModuleList } from './platform_owner/Inventory_Module/InventoryModuleList';
import { UnavailabilityModule } from './platform_owner/Unavailability_Module/UnavailabilityModule';
import { QualificationAdminstrator } from './platform_owner/Qualification_Module/QualificationAdminstrator';
import { QualificationModuleList } from './platform_owner/Qualification_Module/QualificationModuleList';
import { MyProfile } from './platform_owner/My_Profile/MyProfile';
import ClientAuth from './api_services/ClientAuth';
import { EditProfileAdminstrator } from './platform_owner/User_Profile_Adminstrator/Edit_Profile/EditProfileAdminstrator';
import { TrainingDetail } from './platform_owner/Training_Module/TrainingDetail';
import { UserTrainingDetail } from './platform_owner/Training_Module/UserTrainingDetail';
import { UserUnavailabilityDetail } from './platform_owner/Unavailability_Module/UserUnavailabilityDetail';
import { GearInformationForm } from './platform_owner/Inventory_Module/Gear_Information/GearInformationForm';
import { ApparatusInformationForm } from './platform_owner/Inventory_Module/Apparatus_Information/ApparatusInformationForm';
import { CreateGareType } from './platform_owner/Inventory_Module/Gear_Information/CreateGareType';
import TraningListDetail from './platform_owner/Training_Module/TraningListDetail';
import GearListDetail from './platform_owner/Inventory_Module/Gear_Information/GearListDetail';
import { QualificationListDetail } from './platform_owner/Qualification_Module/QualificationListDetail';
import { QualificationDetail } from './platform_owner/Qualification_Module/QualificationDetail';
import { RoleListDetail } from './platform_owner/Role_Module/RoleListDetail';

const Mycontext = createContext();

function App() {

  const [pdata, setPdata] = useState(localStorage.getItem("mydata"));

  const contaxtHandler = (data) => {
    if (data) {
      localStorage.setItem("mydata", JSON.stringify(data));
    }
    setPdata(JSON.stringify(data))
  }


  return (
    <>

      <HashRouter>
        <Mycontext.Provider value={{ pdata: pdata, contaxtHandler: contaxtHandler }}>
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route element={<Auth />} >
              <Route path="/accountmodule" element={<Accountmodule />} />
              <Route path="/accountdetail" element={<Accountdetails />} />
              <Route path="/createaccount" element={<CreateAccountPage />} />
              <Route path="/editaccount" element={<EditAccount />} />
              <Route path="/subscriptionplan" element={<CreatePlan />} />
              <Route path="/subscriptionview" element={<ListViewPlan />} />
            </Route>

            {/* Clinet Code */}
            <Route element={<ClientAuth />} >
              <Route path="/roleadminstrator" element={<RoleAdminstrator />} />
              <Route path="/roleadminstratorlist" element={<RoleList />} />
              <Route path="/rolelistdetail" element={<RoleListDetail />} />
              <Route path="/adminstratorprofilelist" element={<AdminstratorProfileList />} />
              <Route path="/profileadminstrator" element={<ProfileAdminstrator />} />
              <Route path="/editprofileadminstrator" element={<EditProfileAdminstrator />} />
              <Route path="/training" element={<Training />} />
              <Route path="/traininglist" element={<TrainingList />} />
              <Route path="/usertrainingdetail" element={<UserTrainingDetail />} />
              <Route path="/inventorymodule" element={<InventoryModule />} />
              <Route path="/CreateGear" element={<GearInformationForm/>} />
              <Route path="/CreateApparatus" element={<ApparatusInformationForm />} />
              <Route path="/createGeareType" element={<CreateGareType />} />
              <Route path='/TraningListDetail' element={<TraningListDetail />} />
              <Route path='/GearListDetail' element={<GearListDetail />} />

              <Route path="/inventorymodulelist" element={<InventoryModuleList />} />
              <Route path="/unavailability" element={<UnavailabilityModule />} />
              <Route path="/userunavailability" element={<UserUnavailabilityDetail />} />
              <Route path="/qualification" element={<QualificationAdminstrator />} />
              <Route path="/qualificationlist" element={<QualificationModuleList />} />
              <Route path="/qualificationdetail" element={<QualificationDetail />} />
              <Route path="/myprofile" element={<MyProfile />} />
            </Route>

          </Routes>
        </Mycontext.Provider>
      </HashRouter>

    </>
  );
}
export default App;
export { Mycontext };
