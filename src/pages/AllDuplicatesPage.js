import React, { Component } from 'react';
import {DuplicateConsumer} from '../context';
import Loader from "react-loader-spinner";

export default class AllDuplicatesPage extends Component {
    render() {
        return (
            <DuplicateConsumer>
                {value => {
const {duplicates,deleteDuplicate,editDupicate,editTitle,handleChange,editText,updateSpinner, duplicateUpdated,updateDuplicate, cerr} = value;

                    return (
<div className='container'>
    <h3 className='text-center'>All Duplicates</h3>
    {duplicates? null: <p className='text-center'>please create duplicates first</p>}
<table className="table table-striped">
  <thead>
    <tr>
     
      <th scope="col">Title</th>
      <th scope="col">Text</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {
       duplicates &&   duplicates.map(el => {
              return (
                <tr key={el.id}>
                <td>{el.title}</td>
                <td>{el.text}</td>
                <td>
                <button type="button" className='btn btn-primary me-2' data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={() => {
                    return editDupicate(el.id,el.title,el.text)
                }}>
  Edit  </button>
                   <button type='button' className='btn btn-danger'
                   onClick={() => {
                       return deleteDuplicate(el.id)
                   }}
                   >Delete</button>
                  </td>
              </tr>
              )
          })
      }
   
  </tbody>
</table>


<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Duplicate</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
      <form 
      onSubmit={updateDuplicate}
      >
  <div className="mb-3">
    <label htmlFor="editTitle" className="form-label">Enter Title</label>
    <input type="text" className="form-control" id="editTitle" name='editTitle' value={editTitle} onChange={handleChange}  />
  </div>
  <div className="mb-3">
    <label htmlFor="editText" className="form-label">Enter Text</label>
    <input type="text" className="form-control" id="editText" name='editText' value={editText} onChange={handleChange}  />
  </div>
  <strong className='d-block text-canter'>to get update count use {`{update}`} inside text </strong>
    <strong className='d-block text-canter'>to get the text inserted now use {`{text}`} inside text </strong>
          {
                              updateSpinner &&   <Loader className='text-center mb-2'
                              type="Puff"
                           color="#2353a1"
                           height={30}
                           width={30}
                         />
                          }
                       {
                           duplicateUpdated &&  <p className='text-center'> duplicate updated successfully </p>
                       }  
                       {
                              cerr && <strong className='text-danger d-block text-center mb-2 mt-0'>
                                  something went wrong
                              </strong>
                          }
                        
                          <div className="d-grid gap-2">
                          <button type='submit' className='btn btn-primary mx-auto'>submit</button>
                         </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


</div>
                    )
                }}
               
                
            </DuplicateConsumer>
        )
    }
}
