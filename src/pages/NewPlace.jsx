// NewPlace.jsx
import { Form, useActionData,redirect } from "react-router-dom";
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

const NewPlace = () => {
  const result = useActionData();

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
        <input type="text" name="title" id="title" required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" name="address" id="address" required />
      </div>
      <div className="form-group">
        <button type="submit">Add Place</button>
      </div>
    </Form>
  );
};

export default NewPlace;
