
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';

const Login = () => {
    const { register, handleSubmit,formState: { errors },} = useForm();
    const [loginError, setLoginError] = useState(''); 
    const {login} = useContext(mycontext)
    const negivet = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

 
    const handlLogin = data => {
        console.log(data);
        setLoginError('');
        const email = data.email;
        const password = data.password;
        login(email,password)
        .then(result => {
            const user = result.user;
            console.log(user)
            negivet(from, { replace: true });
        })
        .catch(error => console.log(error))
       
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
        <div className='w-96 p-7'>
            <h2 className='text-xl text-center'>Login</h2>
            <form onSubmit={handleSubmit(handlLogin)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="text"
                        {...register("email", {
                            required: "Email Address is required"
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Password</span></label>
                    <input type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    <label className="label"> <span className="label-text">Forget Password?</span></label>
                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                </div>
                <input className='btn btn-info w-full' value="Login" type="submit" />
                <div>
                    {loginError && <p className='text-red-600'>{loginError}</p>}
                </div>
            </form>
            <p>New to This Site ? <Link className='text-secondary' to="/register">Create new Account</Link></p>
            
        </div>
    </div>
    );
};

export default Login;