import React from 'react';
import {Route,Routes} from "react-router-dom";
import Layout from '../layout/Layout';
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";


const PrivateRouting = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout /> }>
                <Route path='' element={<Home/>}/>
                {/* <Route path='findfriends' element={<Friends/>}/>
                <Route path='myprofile' element={<MyProfile/>}/> */}
                {/* <Route path='notifications' element={<Notifications/>}/> */}
                {/* <Route path='requests' element={<Request/>}/>
                <Route path='photos' element={<Photos/>}/> */}
                <Route path='*' element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default PrivateRouting;