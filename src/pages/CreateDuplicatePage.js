import React, { Component } from 'react';
import {DuplicateConsumer} from '../context'
import Loader from "react-loader-spinner";

export default class CreateDuplicatePage extends Component {
    
    render() {
        return (
            <DuplicateConsumer>
                {
                    value => {
  const {createTitle,handleChange,createText,duplicateSpinner,createDuplicate,duplicateCreated,cerr} = value;
                        return (
                            <div className='container mt-2'>
 <h3 className='text-center text-capitalize'>
                    create duplicate
                </h3>
                <div className='row'>
                    <div className='col-6 offset-3'>
                   <form onSubmit={createDuplicate}>
  <div className="mb-3">
    <label htmlFor="createTile" className="form-label">Enter Title</label>
    <input type="text" className="form-control" id="createTitle" name='createTitle' value={createTitle} onChange={handleChange}  />
  </div>
  <div className="mb-3">
    <label htmlFor="createText" className="form-label">Enter Text</label> 

    <input type="text" className="form-control" id="createText" name='createText' value={createText} onChange={handleChange}  />
    <strong>to get update count use {`'{update}'`} inside text </strong>
  </div>
          {
                              duplicateSpinner &&   <Loader className='text-center mb-2'
                              type="Puff"
                           color="#2353a1"
                           height={30}
                           width={30}
                         />
                          }
                          {
                              cerr && <strong className='text-danger d-block text-center mb-2 mt-0'>
                                  something went wrong
                              </strong>
                          }
                       {
                           duplicateCreated &&  <p className='text-center'> duplicate created successfully </p>
                       }  
                        
                          <div className="d-grid gap-2">
                          <button type='submit' className='btn btn-primary mx-auto'>submit</button>
                         </div>
</form>

                    </div>
                </div>
                            </div>
                        )
                    }
                }
               
            </DuplicateConsumer>
        )
    }
}
