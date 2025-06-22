// NewPlace.jsx
import { useState } from "react";
import { Form, useActionData,redirect,useParams,useLoaderData } from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'

export async function placeFormAction({ request }) {

  const rawData = await request.formData();
  const formData = new FormData()
  formData.append('title',rawData.get("title"));
  formData.append('description', rawData.get("description"));
  formData.append('address',rawData.get("address"));
  // Append multiple files
  const files = rawData.getAll("images"); // this will be a FileList
  files.forEach((file)=> formData.append('images', file) )
  
   // same key "file"
  try {
    await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/places`, 
    formData
    ,{withCredentials:true,
      headers: {
        'Content-Type': 'multipart/form-data', // important!
      },});
    return redirect("/?toast=place-added")
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
// Image Preview Handler

// Fetch Place For Update

const NewPlace = () => {
  const [preview,setPreview] = useState([])
  const result = useActionData();
  const place = useLoaderData()

  const changeFileHandler = (e) =>{
    const files = Array.from(e.target.files);
    const previews = files.map(file=> URL.createObjectURL(file))
    setPreview([...preview , previews])
  }
  const closeHandler = (indexToRemove) =>{
    const newPreview = preview.filter((_,i)=> i !== indexToRemove)
    setPreview(newPreview)
  }
  return (
    <div className="wrapper">
    <Form method="post" encType="multipart/form-data">
      {result?.success && (
        <div style={{ color: "green" }}>Form submitted successfully</div>
      )}
      {result?.error && (
        <div style={{ color: "red" }}>{result.error}</div>
      )}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" defaultValue={place?.title || ""} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" defaultValue={place?.description || ""} required></textarea>
      </div>
       {!place && <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" name="address" id="address"   required />
      </div>}
      <div className="form-group">
        <label htmlFor="images">Upload Images</label>
        <input type="file" name="images" id="images" multiple onChange={changeFileHandler} />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {preview.map((src, index) => (
             <div className="thumbnail">
               <img
                 key={index}
                 src={src}
                 alt={`Preview ${index}`}
                 style={{ width: "100px", height: "100px", objectFit: "cover" }}
               />
              <button className="btn-remove" onClick={()=>closeHandler(index)}>X</button>
             </div>
          ))}
        </div>
       {/* {!place && 
       <Map/>
       } */}
      <div className="form-group">
        <button type="submit">{!place ? "Add Place" : "Update Place"}</button>
      </div>
    </Form>
      <ToastContainer/>
    </div>
  );
};
export const fetchPlace = async({params}) =>{
  try {
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/places/${params.pid}`)
      return res.data.place
    }

   catch (error) {
    return toast(error)
  }
}

export async function updatePlaceFormAction({ request,params }) {
  const rawData = await request.formData();
  const formData = new FormData()
  formData.append('title', rawData.get("title"));
  formData.append('description', rawData.get("description"));
 // Append multiple files
 const files = rawData.getAll("images"); // this will be a FileList
 files.forEach((file)=> formData.append('images', file) )
 
  try {
    await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/places/${params.pid}`, formData,{withCredentials:true,
      headers: {
        'Content-Type': 'multipart/form-data', // important!
      }});
    return redirect('/')
  } catch (error) {
    return toast(error)
  }
}
export default NewPlace;
