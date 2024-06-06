import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './commonpages/Login';
import { AccountModule } from './company_owner/Account_Module';
import { AccountDetail } from './company_owner/Account_Module/accountDetail/AccountDetail';
import { CreateAccountPage } from './company_owner/Account_Module/createAccount/CreateAccountPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/accountmodule" element={<AccountModule/>} />
          <Route path="/accountdetail" element={<AccountDetail/>} />
          <Route path="/createaccount" element={<CreateAccountPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
