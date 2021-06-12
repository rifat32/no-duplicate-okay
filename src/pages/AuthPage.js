import React, { Component } from 'react';
import Login from '../components/AuthComponents/Login'
import Register from '../components/AuthComponents/Register'


export default class LoginPage extends Component {
    render() {
        return (
            <div className='container bg-primary'>
                        <div className='d-flex justify-content-center align-items-center' style={{height:"120vh"}}>

                            <div className='mt-5 w-50 mx-auto'>
              <h3 className='text-center'>Login</h3>
                               <Login/>
              <h3 className='text-center mt-3'>Register</h3>
            <Register/>

                            </div>
                            
                      
                        
            
              </div>
                  
            
            </div>
        )
    }
}
