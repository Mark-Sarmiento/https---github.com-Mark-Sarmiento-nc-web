import React,{useState, useEffect} from "react";
import {database} from '../firebase';
import FirebaseData from '../components/FirebaseData';
import { UserAuth } from '../context/AuthContext';
import { ref, onValue, off, update } from "firebase/database";
import emailjs from "emailjs-com";
import spinach from '../assets/spinach.jpeg';
import petchay from '../assets/petchay.jpg';
import PopupForm from '../context/PopupForm';

emailjs.init("kTo0FMoCg9hTzN5Hn");


const Dashboard = () => {

  const { user } = UserAuth();
  const [showPopupForm, setShowPopupForm] = useState(localStorage.getItem('showPopupForm') || '');
  const [selectedPlant, setSelectedPlant] = useState(localStorage.getItem('selectedPlant') || '');
 

  const setPetchay = () => {
    const postPetchay = {
      slctdParam: 'Petchay',
      RHmin: 50,
      RHmax: 100,
      ECmin: 10,
      ECmax: 100,
      Tempmin: 50,
      Tempmax: 100,
      PHmin: 50,
      PHmax: 100,
      WTmin: 50,
      WTmax: 100,
      PHupmin: 50,
      PHupmax: 100,
      PHdownmin: 50,
      PHdownmax: 100,
      NSmin: 50,
      NSmax: 100,
      WRmin: 50,
      WRmax: 100,
      RSRVRmin: 50,
      RSRVRmax: 100,
      WFstate: true,
    };
    const updates = {};
    updates[`/Users/${user?.uid}/ESP1/Params`] = postPetchay;
    setSelectedPlant('Petchay');
    localStorage.setItem('selectedPlant', 'Petchay');
    setShowPopupForm(false);
    return update(ref(database), updates);
  };

  const setSpinach = () => {
    const postSpinach = {
      slctdParam: 'Spinach',
      RHmin: 50,
      RHmax: 100,
      ECmin: 50,
      ECmax: 100,
      Tempmin: 50,
      Tempmax: 100,
      PHmin: 50,
      PHmax: 100,
      WTmin: 50,
      WTmax: 100,
      PHupmin: 50,
      PHupmax: 100,
      PHdownmin: 50,
      PHdownmax: 100,
      NSmin: 50,
      NSmax: 100,
      WRmin: 50,
      WRmax: 100,
      RSRVRmin: 50,
      RSRVRmax: 100,
      WFstate: false,
    };
    const updates = {};
    updates[`/Users/${user?.uid}/ESP1/Params`] = postSpinach;
    setSelectedPlant('Spinach');
    localStorage.setItem('selectedPlant', 'Spinach');
    setShowPopupForm(false);
    return update(ref(database), updates);
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (selectedPlant === 'Spinach') {
      body.style.backgroundImage = `url(${spinach})`;
      body.style.backgroundSize = 'cover';
    } else if (selectedPlant === 'Petchay') {
      body.style.backgroundImage = `url(${petchay})`;
      body.style.backgroundSize = 'cover';
    } else {
      body.style.backgroundImage = '';
    }
  }, [selectedPlant]);

  // Start EC current
  const [ecdata, setecData] = useState([]);
  const [ecmin, setecmin] = useState();
  const [eccolor, seteccolor] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/EC`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/ECmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const ECmin = snapshot.val();
        setecmin(ECmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              value: firebaseData[key].Value,
            });
          }
        }
  
        setecData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > ecmin) {
          seteccolor('bg-green-700');
        } else {
          seteccolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, ecmin]);
  // End EC current

  // Start RH current
  const [rhdata, setrhData] = useState([]);
  const [rhmin, setrhmin] = useState();
  const [rhcolor, setrhcolor] = useState();
  useEffect(() => {
        const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/RH`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/RHmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const RHmin = snapshot.val();
        setrhmin(RHmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              value: firebaseData[key].Value,
            });
          }
        }
  
        setrhData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > rhmin) {
          setrhcolor('bg-green-700');
        } else {
          setrhcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, rhmin]);
  // End RH current

  // Start Temp current
  const [tempdata, settempData] = useState([]);
  const [tempmin, settempmin] = useState();
  const [tempcolor, settempcolor] = useState();
   useEffect(() => {
        const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/Temp`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/Tempmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const TEMPmin = snapshot.val();
        settempmin(TEMPmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              value: firebaseData[key].Value,
            });
          }
        }
  
        settempData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > tempmin) {
          settempcolor('bg-green-700');
        } else {
          settempcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, tempmin]);
  // End Temp current

  // Start PH current 
  const [phdata, setphData] = useState([]);
  const [phmin, setphmin] = useState();
  const [phcolor, setphcolor] = useState();
   useEffect(() => {
        const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/PH`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/PHmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const PHmin = snapshot.val();
        setphmin(PHmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              value: firebaseData[key].Value,
            });
          }
        }
  
        setphData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > phmin) {
          setphcolor('bg-green-700');
        } else {
          setphcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, phmin]);
  // End PH current

  // Start Water Temperature
  const [wtdata, setwtData] = useState([]);
  const [wtmin, setwtmin] = useState();
  const [wtcolor, setwtcolor] = useState();
   useEffect(() => {
      const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/WT`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/WTmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const WTmin = snapshot.val();
        setwtmin(WTmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        const chartData = [];
  
        for (let key in firebaseData) {
          if (firebaseData.hasOwnProperty(key)) {
            chartData.push({
              value: firebaseData[key].Value,
            });
          }
        }
  
        setwtData(chartData);
        const currentValue = chartData[chartData.length - 1]?.value;
  
        if (currentValue > wtmin) {
          setwtcolor('bg-green-700');
        } else {
          setwtcolor('bg-rose-700');
        }
      });
  
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, wtmin]);
  // End Water Temperature

  // Start IRPHUP current
  const [phupdata, setphupData] = useState(); 
  const [phupmin, setphupmin] = useState();
  const [phupcolor, setphupcolor] = useState();
  const [phupEmailSent, setPhupEmailSent] = useState(false);
  //Send warning message for pH up level 
  const SWEphuplowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: pH UP Level ",
      body: `The pH UP level is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRPHUP/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/PHupmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const PHUPmin = snapshot.val();
        setphupmin(PHUPmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setphupData(firebaseData);
      });

        if (phupdata > phupmin) {
          setphupcolor('bg-green-700');
          if (phupEmailSent === true){
            setPhupEmailSent(false);
          }
        } else {
          setphupcolor('bg-rose-700');
          if (phupEmailSent === false){
            //SWEphuplowlevel();
            setPhupEmailSent(true);
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, phupmin, phupdata, phupEmailSent]);
  // End IRPHUP current

  // Start IRPHDOWN current
  const [phdowndata, setphdownData] = useState(null); 
  const [phdownmin, setphdownmin] = useState();
  const [phdowncolor, setphdowncolor] = useState();
  const [phdownEmailSent, setphdownEmailSent] = useState(false);
  //Send warning message for pH down level 
  const SWEphdownlowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: pH down Level ",
      body: `The pH down level is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRPHDOWN/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/PHdownmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const PHDOWNmin = snapshot.val();
        setphdownmin(PHDOWNmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setphdownData(firebaseData);
      });

        if (phdowndata > phdownmin) {
          setphdowncolor('bg-green-700');
          if (phdownEmailSent === true){
            setphdownEmailSent(false);
          }
        } else {
          setphdowncolor('bg-rose-700');
          if (phdownEmailSent === false){
            //SWEphdownlowlevel();
            setphdownEmailSent(true);
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, phdownmin, phdowndata, phdownEmailSent]);
  // End IRPHDOWN current

  // Start Nutrient Solution Current
  const [nsdata, setnsData] = useState(null); 
  const [nsmin, setnsmin] = useState();
  const [nscolor, setnscolor] = useState();
  const [nsEmailSent, setnsEmailSent] = useState(false);
    //Send warning message for Nutrient Solution level 
    const SWEnslowlevel = async () => {
      const templateParams = {
        to_email: `${user?.email}`,
        from_name: "Nutriculture team",
        to_name: `${user?.displayName}`,
        subject: "Warning: Nutrient Solution Level ",
        body: `The Nutrient Solution level is running low. \n Please refill your container quickly! \n \n Thank you `,
      };

      try {
        await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };
    useEffect(() => {
      const fetchData = async () => {
        const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRFERTILIZER/Value`);
        const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/NSmin`);
    
        const dbconfCallback = onValue(dbconf, (snapshot) => {
          const NSmin = snapshot.val();
          setnsmin(NSmin);
        });
    
        const dbRefCallback = onValue(dbRef, (snapshot) => {
          const firebaseData = snapshot.val();
          setnsData(firebaseData);
        });

          if (nsdata > nsmin) {
            setnscolor('bg-green-700');
            if (nsEmailSent === true){
              setnsEmailSent(false);
            }
          } else {
            setnscolor('bg-rose-700');
            if (nsEmailSent === false){
              //SWEnslowlevel();
              setnsEmailSent(true);
            }
          }
        // Clean up the listeners when component unmounts or when user?.uid changes
        return () => {
          off(dbconf, 'value', dbconfCallback);
          off(dbRef, 'value', dbRefCallback);
        };
      };
    
      if (user?.uid) {
        fetchData();
      }
    }, [user?.uid, nsmin, nsdata, nsEmailSent]);
  // End Nutrient Solution Current

// Start Water Refill current
const [wrdata, setwrData] = useState(null); 
const [wrmin, setwrmin] = useState();
const [wrcolor, setwrcolor] = useState();
const [wrEmailSent, setwrEmailSent] = useState(false)
//Send warning message for Water Refill level 
  const SWEwrlowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: Water Refill Level ",
      body: `The water refill level is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRWATERUP/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/WRmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const WRmin = snapshot.val();
        setwrmin(WRmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setwrData(firebaseData);
      });

        if (wrdata > wrmin) {
          setwrcolor('bg-green-700');
          if (wrEmailSent === true){
            setwrEmailSent(false);
          }
        } else {
          setwrcolor('bg-rose-700');
          if (wrEmailSent === false){
            //SWEwrlowlevel();
            setwrEmailSent(true);
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, wrmin, wrdata, wrEmailSent]);
// End Water Refill current

// Start Reservoir current
const [rsrvrdata, setrsrvrData] = useState(null); 
const [rsrvrmin, setrsrvrmin] = useState();
const [rsrvrcolor, setrsrvrcolor] = useState();
const [rsrvrEmailSent, setrsrvrEmailSent] = useState(false);
  //Send warning message for Reservoir level 
  const SWErsrvrlowlevel = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: Reservoir Level ",
      body: `The Reservoir is running low. \n Please refill your container quickly! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/IRWATER/Value`);
      const dbconf = ref(database, `Users/${user?.uid}/ESP1/Params/RSRVRmin`);
  
      const dbconfCallback = onValue(dbconf, (snapshot) => {
        const RSRVRmin = snapshot.val();
        setrsrvrmin(RSRVRmin);
      });
  
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setrsrvrData(firebaseData);
      });

        if (rsrvrdata > rsrvrmin) {
          setrsrvrcolor('bg-green-700');
          if (rsrvrEmailSent === true){
            setrsrvrEmailSent(false);
          }
        } else {
          setrsrvrcolor('bg-rose-700');
          if (rsrvrEmailSent === false){
            //SWErsrvrlowlevel();
            setrsrvrEmailSent(true);
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbconf, 'value', dbconfCallback);
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, rsrvrmin, rsrvrdata, rsrvrEmailSent]);
// End Reservoir current

// Water Flow
const [wfdata, setwfData] = useState(); 
const [wfstate, setwfstate] = useState(); 
const [wfcolor, setwfcolor] = useState()
const [wfEmailSent, setwfEmailSent] = useState (false)
//Send warning message for Reservoir level 
  const SWEwffalse = async () => {
    const templateParams = {
      to_email: `${user?.email}`,
      from_name: "Nutriculture team",
      to_name: `${user?.displayName}`,
      subject: "Warning: Water Flow  ",
      body: `The Water Flow state is closed. \n Please check the Prototype immediately! \n \n Thank you `,
    };

    try {
      await emailjs.send("service_bi2u2dw", "template_e9yzocj", templateParams);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, `Users/${user?.uid}/ESP1/data/WF/Value`);
      
      const dbRefCallback = onValue(dbRef, (snapshot) => {
        const firebaseData = snapshot.val();
        setwfstate(firebaseData);
      });

        if (wfstate === true ) {
          setwfcolor('bg-green-700');
          setwfData("Active")
          if (wfEmailSent === true){
            setwfEmailSent(false);
          }
        } else {
          setwfcolor('bg-rose-700');
          setwfData("Inactive")
          if (wfEmailSent === false){
            //SWEwffalse();
            setwfEmailSent(true);
          }
        }
      // Clean up the listeners when component unmounts or when user?.uid changes
      return () => {
        off(dbRef, 'value', dbRefCallback);
      };
    };
  
    if (user?.uid) {
      fetchData();
    }
  }, [user?.uid, wfdata, wfstate, wfEmailSent]);

  const ECcurrent = ecdata.length > 0 ? ecdata[ecdata.length - 1].value : null;
  const RHcurrent = rhdata.length > 0 ? rhdata[rhdata.length - 1].value : null;
  const Tempcurrent = tempdata.length > 0 ? tempdata[tempdata.length - 1].value : null;
  const PHcurrent = phdata.length > 0 ? phdata[phdata.length - 1].value : null;
  const WTcurrent = wtdata.length > 0 ? wtdata[wtdata.length - 1].value : null;

  const [gridColumns, setGridColumns] = useState("grid-cols-5");

  // START Function to update the grid columns based on the screen size
  const updateGridColumns = () => {
    if (window.innerWidth < 768) {
      setGridColumns("grid-cols-1");
    } else if (window.innerWidth < 1024) {
      setGridColumns("grid-cols-2 ");
    } else if (window.innerWidth < 1200) {
      setGridColumns("grid-cols-3 ");
    }else {
      setGridColumns("grid-cols-5");
    }
  };

  useEffect(() => {
    // Update grid columns when the component mounts
    updateGridColumns();
    // Event listener to update grid columns on window resize
    window.addEventListener("resize", updateGridColumns);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateGridColumns);
    };
  }, []);
  // END Function to update the grid columns based on the screen size
  return (
    <>
      {showPopupForm && <PopupForm onPetchay={setPetchay} onSpinach={setSpinach} />}
      <div className="p-8">
        
        <div className="bg-gray-200 bg-opacity-50 ">
          <h1 className=" p-8 text-white">Dashboard</h1>
        </div>
        <div className="m-auto  flex pt-10  ">
          <div className={`overflow-y-auto grid ${gridColumns} gap-8 mx-auto justify-center bg-white bg-opacity-50 p-4 border-2 border-black`} >
            <div className={`${eccolor} text-white p-4 rounded-2xl flex-grow`}>
              <h3 className="text-center px-4">Electric Conductivity: </h3>
              <p className="text-center px-4">{ECcurrent}</p>
            </div>
            <div className={`${rhcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">Relative Humidity: </h3>
              <p className="text-center px-4">{RHcurrent}</p>
            </div>
            <div className={`${tempcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">Temperature: </h3>
              <p className="text-center px-4">{Tempcurrent}</p>
            </div>
            <div className={`${phcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">PH Level: </h3>
              <p className="text-center px-4">{PHcurrent}</p>
            </div>
            <div className={`${wtcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">Water Temperature: </h3>
              <p className="text-center px-4">{WTcurrent}</p>
            </div>
            <div className={`${phupcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">PH Up Level: </h3>
              <p className="text-center px-4 py-2">{phupdata}</p>
            </div>
            <div className={`${phdowncolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">PH Down Level: </h3>
              <p className="text-center px-4">{phdowndata}</p>
            </div>
            <div className={`${nscolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">Nutrient Soln Level: </h3>
              <p className="text-center px-4">{nsdata}</p>
            </div>
            <div className={`${wrcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">Water Refill Level: </h3>
              <p className="text-center px-4"> {wrdata}</p>
            </div>
            <div className={`${rsrvrcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">Reservoir Level: </h3>
              <p className="text-center px-4">{rsrvrdata}</p>  
            </div>
            <div className={`${wfcolor} text-white p-4 rounded-2xl  flex-grow`}>
              <h3 className="text-center px-4">Water Flow: </h3>
              <p className="text-center px-4">{wfdata}</p>
            </div>
          </div>
        </div>
        <FirebaseData/>
      </div>

    </>
    );
    };
 
export default Dashboard;
