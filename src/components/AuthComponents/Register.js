import React, { Component } from 'react';
import {DuplicateConsumer} from '../../context';
import Loader from "react-loader-spinner";


export default class Register extends Component {
    render() {
        return (
            <DuplicateConsumer>
                {
                    value => {
                   const {name,passwordReg,emailReg,confirmPassword,handleChange,
                    registerSpinner, wrongReg, messageReg,registerHandler} = value
                        return (
                            <form onSubmit={registerHandler}>
                             <div className="mb-3">
                            <label htmlFor="name" className="form-label">Enter Name</label>
                            <input type='text' className="form-control" id='name' name='name' onChange={handleChange} value={name}/>
                          </div>
                            <div className="mb-3">
                            <label htmlFor="emailReg" className="form-label">Enter Email</label>
                            <input type='email' className="form-control" id='emailReg' name='emailReg' onChange={handleChange} value={emailReg}/>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="passwordReg" className="form-label">Enter Password</label>
                            <input type='password' className="form-control" id='passwordReg' name='passwordReg' onChange={handleChange} value={passwordReg}/>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type='password' className="form-control" id='confirmPassword' name='confirmPassword' onChange={handleChange} value={confirmPassword}/>
                          </div>
                          {
                              registerSpinner &&  
                               <Loader className='text-center mb-2'
                              type="Puff"
                           color="#FFF"
                           height={30}
                           width={30}
                         />
                          }
                          {wrongReg && <p className='text-danger text-center'>something went wrong</p>}
                          {messageReg && <p className='text-danger text-center'>{messageReg}</p>}
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
