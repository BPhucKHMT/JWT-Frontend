import React from 'react';
import './Register.scss'
import {Link , useNavigate } from 'react-router-dom'
import { useEffect , useState} from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { registerNewUser } from '../../services/userService';

const Register = props => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const defaultValidInput = {
        isValidEmail:true,
        isValidPhone:true,
        isValidPassword:true,
        isValidConfirmPassword:true  
    }
    const [objCheckInput , setobjCheckInput] = useState(defaultValidInput)

    let Navigate = useNavigate();
    const  handleLogin =() =>{
        Navigate("/login");
    }

    const isValidInputs =()=>{
        setobjCheckInput(defaultValidInput);

        if(!email ){
            toast.error("Email is required");
            setobjCheckInput({...defaultValidInput,isValidEmail:false});
            return false;
        }

        let re = /\S+@\S+\.\S+/;
        if(!re.test(email)){
            setobjCheckInput({...defaultValidInput,isValidPhone:false});
            toast.error("Please enter a valid email address");
            return false;
        }
          
        if(!phone){
            toast.error("Phone is required");
            return false;
        }
        if(!password){
            toast.error("Password is required");
            setobjCheckInput({...defaultValidInput,isValidPassword:false});
            return false;
        }
        if(password != confirmPassword){
            toast.error("Your password is not the same!");
            setobjCheckInput({...defaultValidInput,isValidConfirmPassword:false});
            return false;
        }
        
             
        return true;

    }

    const handleRegister = async () => {
      let check = isValidInputs();
      if (check === true) {
        let response = await registerNewUser(email, phone, username, password);
        let serverData = response.data;
        if(+serverData.EC===0){
            toast.success(serverData.EM)
            Navigate('/login') //đẩy người dùng đến trang login
        }else
        {
            toast.error(serverData.EM)
        }
       // console.log(response);
      }
      return;
    };

    useEffect(()=>{
        // axios.get('http://localhost:8888/api/v1/test-api').then(data=>{
        //     console.log("Check data" ,data)
        // })

    
    },[]) 
    return (
        <div className='register-container '>
            <div className ="container">
            <div className="row px-3 px-sm-0">

                    <div className ="content-left col-12 d-none col-sm-7 d-sm-block ">
                        <div className='brand'>
                            Bao Phuc
                        </div>

                        <div className="detail">
                            Bao Phuc helps you connect and share with the people in your life.
                        </div>
                    </div>

                    <div className ="content-right  col-sm-5 col-12  d-flex flex-column gap-3 py-3 ">
                        <div className='brand d-sm-none' >
                            Bao Phuc
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text"className={objCheckInput.isValidEmail ?"form-control" :"form-control is-invalid" } placeholder="Email address"
                                value={email} onChange = {(event)=>setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input type="text"className={objCheckInput.isValidPhone ?"form-control" :"form-control is-invalid" } placeholder="Phone number"
                                value={phone} onChange = {(event)=>setPhone(event.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text"className="form-control" placeholder="Username"
                                value={username} onChange = {(event)=>setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password"className={objCheckInput.isValidPassword ?"form-control" :"form-control is-invalid" } placeholder="Password"
                                value={password} onChange = {(event)=>setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Re-enter password:</label>
                            <input type="password"className={objCheckInput.isValidConfirmPassword ?"form-control" :"form-control is-invalid" } placeholder="Re-enter password"
                                value={confirmPassword} onChange = {(event)=>setConfirmPassword(event.target.value)}
                            />
                        </div>

                        <button className ="btn btn-primary" onClick = {() =>handleRegister()}>Register</button>
                        <hr/>

                        <div className="text-center">
                            <button className ="btn btn-success" onClick ={()=> handleLogin()}>
                                Already've an account. Login
                            </button>
                        </div>
                    </div>

            </div>
            </div>
        </div>
    );
};


export default Register;