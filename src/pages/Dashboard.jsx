import React, { useState, useEffect } from "react";
//import {db} from '../firebase';
//import {Firestore, collection, getDocs, onSnapshot} from 'firebase/firestore';
import FirebaseData from '../components/FirebaseData';
//import FirestoreData from '../components/FirestoreData';
import RHplot from "../components/content/RHplot.js";
import Tempplot from "../components/content/Tempplot";
//import { UserAuth } from '../context/AuthContext';


const Dashboard = () => {


  return (
    <>
    <h1>Dashboard</h1>
        <FirebaseData/>
            <RHplot/>
      
        <br></br>
        <Tempplot/>
    </>
    );
    };
 
export default Dashboard;
