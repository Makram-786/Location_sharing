// NewPlace.jsx
import { Form, useActionData,redirect,useParams,useLoaderData } from "react-router-dom";
import axios from "axios";

export async function placeFormAction({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const address = formData.get("address");

  try {
    await axios.post("http://localhost:5000/api/places", {
      title,
      description,
      address,
    },{withCredentials:true});
    return redirect('/')
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

// Fetch Place For Update

const NewPlace = () => {

  const result = useActionData();
  const place = useLoaderData()

  return (
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
        <button type="submit">{!place ? "Add Place" : "Update Place"}</button>
      </div>
    </Form>
  );
};
export const fetchPlace = async({params}) =>{
  console.log(params,"========================================")
  try {
   
      const res = await axios.get(`http://localhost:5000/api/places/${params.pid}`)
      console.log(res.data,)
      return res.data.place
    }

   catch (error) {
    throw error
  }
}

export async function updatePlaceFormAction({ request,params }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  console.log(params.pid,"===========================Inside Update Action")
  try {
    await axios.patch(`http://localhost:5000/api/places/${params.pid}`, {
      title,
      description,
    },{withCredentials:true});
    return redirect('/')
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
export default NewPlace;
