import React, { Component } from 'react';
import {DuplicateConsumer} from '../context';
import Loader from "react-loader-spinner";


export default class HomePage extends Component {
    render() {
        return (
            <DuplicateConsumer>
                {
                    value => {
 const {duplicates, copyLink,insertText,text,handleChange,loading,result } = value

                        return (
                            <div className='container'>
                            <div className='row mt-5'>
                            <div className='d-flex justify-content-center'>
                         {
                             duplicates.length && duplicates.map(el => {
                                 return (
                                    <button key={el.id} className="btn btn-primary tooltipa me-2" onClick={() => {
                                        return copyLink(el.text,el.id)
                                      }} > {el.title}
                                                    <span id={`tool-id-${el.id}`} className="tooltiptexta">Copied</span>
                                        </button>
                                 )
                             })
                         }
                         
                            </div>
                            </div>

                            <div className='d-flex justify-content-center align-items-center' style={{height:"50vh"}}>
        <form onSubmit={insertText}>
       <div className="mb-3">
  <label htmlFor="text" className="form-label">Enter Text</label>
  <input type='text' className="form-control" id='text' name='text' value={text} onChange={handleChange}/>
</div>
{
loading &&    <Loader className='text-center mb-2'
type="Puff"
color="#2353a1"
height={30}
width={30}
/>
}
{
    result && <p>{result}</p>
}

          <button type='submit' className='btn btn-primary' >submit</button>
        </form>
        </div>   
                                      </div>
                        )
                    }
                }
            </DuplicateConsumer>
           
        )
    }
}
