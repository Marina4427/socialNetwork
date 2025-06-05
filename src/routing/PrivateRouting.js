import React from 'react';
import {Route,Routes} from "react-router-dom";
import Layout from '../layout/Layout';
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import MyProfile from '../pages/MyProfile/MyProfile';
import Friends from '../pages/Friends/Friends';
import Notifications from '../pages/Notifications/Notifications';
import Photos from '../pages/Photos/Photos';
import Requests from '../pages/Requests/Requests';
import EditProfile from '../pages/EditProfile/EditProfile';

const PrivateRouting = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout /> }>
                <Route path='myprofile' element={<MyProfile/>}/>
                <Route path='friends' element={<Friends/>} />
                <Route path='notifications' element={<Notifications/>} />
                <Route path='photos' element={<Photos/>}/>
                <Route path='' element={<Home/>}/>
                <Route path='requests' element={<Requests/>}/>
                <Route path='editprofile' element={<EditProfile/>}/>
                <Route path='*' element={<NotFound/>}/>

            </Route>
        </Routes>
    );
};

export default PrivateRouting;