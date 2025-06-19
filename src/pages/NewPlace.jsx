// NewPlace.jsx
import { Form, useActionData,redirect,useParams,useLoaderData } from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'

export async function placeFormAction({ request }) {
  const formData = await request.formData();
  const sendFormData = new FormData()
  sendFormData.append('title', formData.get("title"));
  sendFormData.append('description', formData.get("description"))
  sendFormData.append('address', formData.get("address"));
  // Append multiple files
  const files = formData.getAll("file"); // this will be a FileList
  files.forEach((file) => sendFormData.append("file", file)); // same key "file"
  try {
    await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/places`, {
      sendFormData
    },{withCredentials:true});
    return redirect("/?toast=place-added")
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

// Fetch Place For Update

const NewPlace = () => {

  const result = useActionData();
  const place = useLoaderData()

  return (
    <div className="wrapper">
    <Form method="post">
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
        <label htmlFor="file">Upload Images</label>
        <input type="file" name="file" id="file" />
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
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  try {
    await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/places/${params.pid}`, {
      title,
      description,
    },{withCredentials:true});
    return redirect('/')
  } catch (error) {
    return toast(error)
  }
}
export default NewPlace;
