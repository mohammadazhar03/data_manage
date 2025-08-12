import React from 'react'
import axios from 'axios';
function dashboard({data,getAllEnquiry,setFormData}) {

       const editRow=(edi)=>{
        axios.get(`http://localhost:3000/api/web/enquiry_singlerow/${edi}`)
        .then((res)=>{
          let data=res.data;
          console.log(data.enquiry);
          setFormData(data.enquiry)
          getAllEnquiry();
        })
    }

  const deleteRow=(delId)=>{
    axios.delete(`http://localhost:3000/api/web/enquiry_delete/${delId}`)
    .then((res)=>{
      console.log('Enquiry deleted Successfully')
      getAllEnquiry();
    }).catch((err)=>{
      console.log(err)
    })
  }
 return (
    <div className="container mt-4">
      <h2 className="mb-3">User Data</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>City</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          
          {data && data.length > 0 ? 
            (
              data.map((item,index)=>{
                const {name,password,email,address,city}=item;
                return(
                 <tr key={index}>
                  <td>{index+1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{password}</td>
                  <td>{address}</td>
                  <td>{city}</td>
                  <td>
                    <button type="button" className="btn btn-dark" onClick={()=> editRow(item._id)}>Edit</button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-dark" onClick={()=> deleteRow(item._id)}>Delete</button>
                  </td>
                </tr>
                )
              })
            )
          : (
            <tr>
              <td colSpan="7" className="text-center">No data available</td>
            </tr>
          )
            }

        </tbody>
      </table>
    </div>
  );
}


export default dashboard;
