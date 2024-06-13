import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const Mycontext = createContext();

function App() {  
  const [predata, setPredata] = useState('');

  const contaxtHandler = (data) =>{if(data){setPredata(data);}}
  

  return (
    <>   
      <BrowserRouter>
      <Mycontext.Provider value={{ pdata:predata, contaxtHandler:contaxtHandler }}>
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
          <Route path="/roleadminstrator" element={<RoleAdminstrator/>} />
          <Route path="/roleadminstratorlist" element={<RoleList/>} />
        </Routes>
        </Mycontext.Provider>
      </BrowserRouter>   
    </>
  );
}
export default App;
export  { Mycontext };
