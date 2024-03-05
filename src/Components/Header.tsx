import React,{useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route, redirect, Navigate } from "react-router-dom";
import GyizerLogo from '../assets/gyizerLogo.png'

function Header() {

    const [mobileView, setMobileView]: any = useState<boolean>(
        window.innerWidth <= 768
      );

      useEffect(() => {
        function updateSize() {
          if (window.innerWidth <= 768)
            setMobileView(true);
          else
            setMobileView(false);
        }
        window.addEventListener("resize", updateSize);
      }, [mobileView]);

    return (
        <div className='headerContainer'>
            <img src={GyizerLogo} style={{ width: mobileView?'50px':'5.33vw', height:mobileView?'auto':'3.05vw', marginLeft: '4.55vw' }} />
        </div>
    );
}

export default Header;
