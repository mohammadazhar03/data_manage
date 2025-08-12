import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard';

function Form() {

  const initialData=({
    name:"",
    email:"",
    password:"",
    address:"",
    city:"",
    _id:""
  })
  const [formData,setFormData]=useState(initialData)
  const [enquiryList,setEnquiryList]=useState([])


  const getValue=(e)=>{
    let inputValue=e.target.value;
    let inputName=e.target.name;

    let oldData = {...formData}
    oldData[inputName]=inputValue;
    setFormData(oldData);

    // setFormData((prev)=>({...prev,[inputName]:inputValue})) or
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    
     if(formData._id){
     //updateid 
                axios.put(`http://localhost:3000/api/web/enquiry_update/${formData._id}`,formData)
            .then((res)=>{
              console.log('data updated successfully',res.data);
              setFormData(initialData)
              getAllEnquiry();
            }).catch((err)=>{
              console.log('error to update',err)
            })
     
     }  else{
              axios.post('http://localhost:3000/api/web/insert_data',formData)
            .then((res)=>{console.log("Data inserted SuccessFully:",res.data);

              setFormData(initialData);
              getAllEnquiry(); 
            }).catch((err)=>{console.error('Data fetching failed ',err)})
          

     }

  }

    const getAllEnquiry=()=>{
       axios.get('http://localhost:3000/api/web/enquiry_data')
    .then((res)=>{return res.data})
    .then((finalData)=>{
      if(finalData.status === 1){
        setEnquiryList(finalData.data)
      }}).catch((err)=>console.log("faild to fetch",err))
    }

    

    useEffect(()=>{
      getAllEnquiry();
    },[])

  return (
  
    <>
    <div className="row m-4">
      <div className="col-lg-4">
            <form className="row g-3 .bg-dark.bg-gradient" onSubmit={handleSubmit}>
    <label  className="form-label">Name</label>
    <input onChange={ getValue} type="text" className="form-control" value={formData.name} name='name' id="inputName4"/>

  <div className="col-md-6">
    <label  className="form-label">Email</label>
    <input onChange={ getValue} type="email" className="form-control" value={formData.email} name='email' id="inputEmail4"/>
  </div>
  <div className="col-md-6">
    <label  className="form-label">Password</label>
    <input onChange={ getValue} type="password" className="form-control" value={formData.password} name='password' id="inputPassword4"/>
  </div>
  <div className="col-12">
    <label  className="form-label">Address</label>
    <input onChange={ getValue} type="text" className="form-control" value={formData.address} name='address' id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div className="col-md-6">
    <label  className="form-label">City</label>
    <input onChange={ getValue} type="text" className="form-control" value={formData.city} name='city' id="inputCity"/>
  </div>
  <div className="col-md-4">
    <label className="form-label">State</label>
    <select id="inputState" className="form-select">
      <option >Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" >
        Check me out
      </label>
    </div>
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary" >{ formData._id ? 'update' : 'save'}</button>
  </div>
</form>
      </div>
      <div className="col-lg-8 ">
        <Dashboard data={enquiryList} getAllEnquiry={getAllEnquiry} setFormData={setFormData} />
      </div>
    </div>
    </>
    
  )
}

export default Form
