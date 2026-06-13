import  Home  from '../Pages/Home.jsx';
import { Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login.jsx';
import TollStaff from '../Pages/TollStaff.jsx';
import AdminDashboard from '../Pages/AdminDashboard.jsx';

function Router() {

    return (
        <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/toll-staff' element={<TollStaff/>} />
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
            </Routes>
        </>
    )
}
export default Router