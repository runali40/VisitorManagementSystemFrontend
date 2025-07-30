
import React from 'react'
import { NavLink } from 'react-router-dom'

const Registration = () => {
  return (
    <>
           <div className="reg-w3">
               <div className="w3layouts-main">
                   <h2>Register Now</h2>
                   <form action="#" method="post">
                       <input type="text" className="ggg" name="Name" placeholder="NAME" required="" />
                       <input type="email" className="ggg" name="Email" placeholder="E-MAIL" required="" />
                       <input type="text" className="ggg" name="Phone" placeholder="PHONE" required="" />
                       <input type="password" className="ggg" name="Password" placeholder="PASSWORD" required="" />
                       <h4><input type="checkbox" />I agree to the Terms of Service and Privacy Policy</h4>
                       <div className="clearfix"></div>
                       <input type="submit" value="submit" name="register" />
                   </form>
                   <p>Already Registered.<NavLink to="/">Login</NavLink></p>
               </div>
            </div>
       </>
  )
}

export default Registration