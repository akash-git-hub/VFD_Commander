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

const Mycontext = createContext();

function App() {
  
  const [pdata, setPdata] = useState();

  const contaxtHandler = (data) =>{setPdata(data)}
  


  return (
    <>
   
      <BrowserRouter>
      <Mycontext.Provider value={{ pdata:pdata, contaxtHandler:contaxtHandler }}>
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
        </Routes>
        </Mycontext.Provider>
      </BrowserRouter>
   
    </>
  );
}
export default App;
export  { Mycontext };
