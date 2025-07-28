import React from 'react'

const Login = () => {
    return (
        <>
            <div className="log-w3">

                <div className="w3layouts-main">
                    <h2>Sign In Now</h2>
                    <form action="#" method="post">
                        <input type="email" className="ggg" name="Email" placeholder="E-MAIL" required="" />
                        <input type="password" className="ggg" name="Password" placeholder="PASSWORD" required="" />
                        <span><input type="checkbox" />Remember Me</span>
                        <h6><a href="#">Forgot Password?</a></h6>
                        <div className="clearfix"></div>
                        <input type="submit" value="Sign In" name="login" />
                    </form>
                    <p>Don't Have an Account ?<a href="registration.html">Create an account</a></p>
                </div>

            </div>
        </>
    )
}

export default Login