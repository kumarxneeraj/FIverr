import React, { useEffect, useState } from 'react'
import "./Navbar.scss"

import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const Navbar = () => {

const [active ,setActive]=useState(false);
const [open ,setOpen]=useState(false);//used to open oe close options class
const {pathname}=useLocation()
const isActive=()=>{

window.scrollY>0 ? setActive(true) : setActive(false);
};
//Scroll happens in Y dir then setActive become true
useEffect(()=>{
window.addEventListener("scroll",isActive); // WE generllay dont use event listener in react but here we are using window not html element so we can use it

return ()=>{
window.removeEventListener("scroll", isActive);

};
},[]);

// const currentUser={ //Object is created to store info about currentusser

// id:1,
// username:"Nikunj",
// isSeller:true

// }
const currentUser=JSON.parse(localStorage.getItem("currentUser"));
const navigate=useNavigate();

const handleLogout=async ()=>{

  try{
await newRequest.post("/auth/logout");
localStorage.setItem("currentUser",null);
navigate("/");
  }

  catch{
console.log(err);

  }


}
  return (
    <div className={active || pathname != "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiver Business</span>
          <span> Explore</span>

          <span>English</span>
          {/* <span>Sign in</span> */}
          {!currentUser?.isSeller && <span>Become a Seller</span>}

          

          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"}/>
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout} >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {active ||
        (pathname != "/" && ( //When active true tabhi ye dikhega
          <>
            <hr />
            <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
            </div>
          </>
         
        ))}
        <hr />
    </div>
  );
}
//(Become a seller wala span) when currentseller empty hoga tab .isSeller check he nhi krenge sidhe become a seller likh denege pr if currente seller empty 
//nhi hua to check krenge ki kya wo seller he agr nhi he to become a seller print it mean if any value become true in optional chaining then chain will stop?


export default Navbar