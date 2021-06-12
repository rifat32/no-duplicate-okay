import React, { Component } from 'react';
import axios from 'axios';
import ApiClient from './ApiClient'
const DuplicateContext = React.createContext() ;
const baseUrl = 'https://pure-stream-02985.herokuapp.com/api';


class DuplicateProvider extends Component{
state = {
login:false,
emailLog:'',
passwordLog:'',
emailReg:'',
passwordReg:'',
confirmPassword:'',
name:'',
loginSpinner:false,
createTitle:'',
createText:'',
duplicateSpinner:false,
duplicateCreated:false,
duplicates:[],
editId:0,
editTitle:'',
editText:'',
updateSpinner:false,
duplicateUpdated:false,
text:'',
result:'',
loading:false,
updateCount:0,
wrong:false,
message:'',
registerSpinner:false,
wrongReg:false,
messageReg:'',
cerr:false
}
componentDidMount(){
    const token = localStorage.getItem("token");
    if(token) {
this.setState({
    login:true
})
 this.getAllDuplicates()
    }
    
}
handleChange = (e) => {
e.preventDefault();
this.setState({
    [e.target.name]: e.target.value
})
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Login handler
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
loginHandler = (e) => {
    e.preventDefault();
    this.setState({
        loginSpinner:true,
        wrong:false,
        message:''
    })
    const {emailLog,passwordLog} = this.state
    axios.post(`${baseUrl}/login`,
    {
        email:emailLog,
        password:passwordLog
    })
    .then(res => {
    this.setState({
     loginSpinner:false
    })
  if(res.data.access_token) {
    localStorage.setItem("token",res.data.access_token);
    this.setState({
        login:true
     })
    this.getAllDuplicates()
  
} else if(res.data.message) {
    this.setState({
        message:res.data.message
    })
    console.log(res)
} else {
    this.setState({
        wrong:true
    })
}

    })
    .catch(err => {
        this.setState({
            wrong:true,
            loginSpinner:false,
        })
        
    })
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of Login handler
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ register handler
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
registerHandler = (e) => {
    e.preventDefault();
    this.setState({
        registerSpinner:true,
        wrongReg:false,
        messageReg:'',
    })
    const {emailReg,passwordReg,name,confirmPassword} = this.state;
    const config = {
        headers: { "content-type": "application/json",
        "Accept": "application/json" }
    };
    axios.post(`${baseUrl}/register`,
    {
        name:name,
        email:emailReg,
        password:passwordReg,
        password_confirmation:confirmPassword
    },
    config)
    .then(res => {
    this.setState({
        registerSpinner:false
    })
    
  if(res.data.token) {
    localStorage.setItem("token",res.data.token);
    
    this.setState({
        login:true
     })
    this.getAllDuplicates()
  
} else if(res.data.errors) {
    this.setState({
        messageReg:res.data.errors[0]
    })
    console.log(res)
}
else {
    this.setState({
        wrongReg:true
    })
}

    })
    .catch(err => {
        this.setState({
            wrongReg:true,
            registerSpinner:false,
        })
        console.log(err)
        
    })
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of register handler
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ logout
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
logout = () => {
    localStorage.clear();
    this.setState({login:false,
        emailLog:'',
        passwordLog:'',
        emailReg:'',
        passwordReg:'',
        confirmPassword:'',
        name:'',
        loginSpinner:false,
        createTitle:'',
        createText:'',
        duplicateSpinner:false,
        duplicateCreated:false,
        duplicates:[],
        editId:0,
        editTitle:'',
        editText:'',
        updateSpinner:false,
        duplicateUpdated:false,
        text:'',
        result:'',
        loading:false,
        updateCount:0,
        wrong:false,
        message:'',
        registerSpinner:false,
        wrongReg:false,
        messageReg:'',
        cerr:false
   })
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of logout
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ get all duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
getAllDuplicates = () => {
axios.get(`${baseUrl}/duplicates`,ApiClient())
.then(res => {
if(res.data.status === 200){
    this.setState({
        duplicates:res.data.data
    })
}
})
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of get all duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ create duplicate
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
createDuplicate = (e) => {
    e.preventDefault();
this.setState({
    duplicateSpinner:true,
    duplicateCreated:false,
    cerr:false
})
const {createTitle,createText} = this.state;
axios.post(`${baseUrl}/duplicates`,
{
    title:createTitle,
    text:createText
},ApiClient())
.then(res => {
    this.setState({
        duplicateSpinner:false
    })
if(res.data.status === 201){
    this.setState({
        duplicateCreated:true,
        createTitle:'',
        createText:''
    })
    setTimeout(() =>{
        this.setState({
            duplicateCreated:false
        })
    },3000)
    this.getAllDuplicates()
}
})
.catch(err => {
    this.setState({
        cerr:true,
        duplicateSpinner:false,
    duplicateCreated:false,
    })
})
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of  create duplicate
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
deleteDuplicate = (id) => {
    axios.delete(`${baseUrl}/duplicates/${id}`,ApiClient())
    .then(res => {
    if(res.data.status === 200){
        this.getAllDuplicates()
    }
    })

}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of delete duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ edit duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
editDupicate = (id,title,text) => {
this.setState({
    editId:id,
    editTitle:title,
editText:text,
updateSpinner:false,
duplicateUpdated:false,
cerr:false
})
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of edit duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@update duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
updateDuplicate = (e) => {
    e.preventDefault();
this.setState({
    updateSpinner:true,
duplicateUpdated:false,
cerr:false
})
const {editTitle,editText,editId} = this.state;
axios.put(`${baseUrl}/duplicates/${editId}`,
{
    title:editTitle,
    text:editText
},ApiClient())
.then(res => {
    this.setState({
        updateSpinner:false,
    })
if(res.data.status === 200){
    this.setState({
        duplicateUpdated:true,
    })
    this.getAllDuplicates()
}
})
.catch(err => {
    this.setState({
        cerr:true,
        updateSpinner:false,
      duplicateUpdated:false,
    })
})
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of update duplicates
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ insert text
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
insertText = (e) => {
        e.preventDefault();
        this.setState({
          loading:true,
          result:'',
          updateCount:0
        })
        axios.post(`${baseUrl}/duplicate-counts`,
        {
            text:this.state.text
         },
          ApiClient())
        .then(res => {
        this.setState({
                loading:false
              })
           const {status,text} = res.data;
           if(status === 200) {
            const {updatedCount,previousCount} = res.data
     this.setState({
       result: `text updated -- previousCount:${previousCount}, updatedCount: ${updatedCount},
        text:${text}`,
        updateCount:updatedCount
     })
     }   else if(status === 201) {
        this.setState({
          result: `text inserted -- text:${text}`,
          updateCount:1
        })
      }
      else {
        this.setState({
          result:'error'
        })
      }
        })
      }
 //  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of insert text
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ copy link
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
copyLink = (key,id) => {
    let count = this.state.updateCount;
    let text = this.state.text;
    if(count > 1) {
        key = key.replace(/{update}/g, count)
    } else {
        key = key.replace(/{update}/g, '')
    }
    if(text){
        key = key.replace(/{text}/g, text)
    }
   
    

    const tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = key;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

const tooltipTexta = document.getElementById(`tool-id-${id}`);
tooltipTexta.classList.add('visible');
setTimeout(() => {
  tooltipTexta.classList.remove('visible');
},500);
}
//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ end of copy link
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 


    render(){
        return (
            <DuplicateContext.Provider 
            value={{
                ...this.state,
                handleChange:this.handleChange,
                loginHandler:this.loginHandler,
                createDuplicate:this.createDuplicate,
                deleteDuplicate:this.deleteDuplicate,
                editDupicate:this.editDupicate,
                updateDuplicate:this.updateDuplicate,
                copyLink:this.copyLink,
                insertText:this.insertText,
                logout:this.logout,
                registerHandler:this.registerHandler
                }}>
                {this.props.children}
            </DuplicateContext.Provider>
        )
    }
}
const DuplicateConsumer = DuplicateContext.Consumer;
export {DuplicateConsumer,DuplicateProvider,DuplicateContext}