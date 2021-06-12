import React, { Component } from 'react';
import {DuplicateConsumer} from '../../context';
import Loader from "react-loader-spinner";


export default class Login extends Component {
    render() {
        return (
            <DuplicateConsumer>
                {
                    value => {
                   const {loginSpinner,passwordLog,emailLog,handleChange,loginHandler,wrong,message} = value
                        return (
                            <form onSubmit={loginHandler} >
                            <div className="mb-3">
                            <label htmlFor="emailLog" className="form-label">Enter Email</label>
                            <input type='email' className="form-control" id='emailLog' name='emailLog' onChange={handleChange} value={emailLog}/>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="passwordLog" className="form-label">Enter Password</label>
                            <input type='password' className="form-control" id='passwordLog' name='passwordLog' onChange={handleChange} value={passwordLog}/>
                          </div>
                          {
                              loginSpinner &&   <Loader className='text-center mb-2'
                              type="Puff"
                           color="#FFF"
                           height={30}
                           width={30}
                         />
                          }
                          {wrong && <p className='text-danger text-center'>something went wrong</p>}
                          {message && <p className='text-danger text-center'>{message}</p>}
                        
                          <div className="d-grid gap-2">
                          <button type='submit' className='btn btn-light mx-auto'>submit</button>
                         </div>
                                  </form>
                        )
                    }
                }
                
            </DuplicateConsumer>
        )
    }
}
