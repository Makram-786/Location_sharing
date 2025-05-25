import React, { Fragment } from "react";
import { useEffect } from "react";
import { useLoaderData,useFetcher,useNavigate } from "react-router-dom";
import axios from "axios";
const AllPlaces = () => {
  const data = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  if (data.places.length === 0) {
    return <h2>No Place Found</h2>;
  }
  const editHandler = (id) => {};

  return (
    <div>
      {/* {success && <p style={{color:'green'}}>New Place has been created Successfully</p>} */}
      <div className="d-flex justify-content-between">
      <h1>All Places</h1>
        
      </div>
      {data &&
        data.places.map((place) => {
          return (
            <Fragment key={place._id}>
              <li>{place.title}</li>
              <li>{place.description}</li>
              <li>
                <button onClick={() => navigate(`/update-place/${place._id}`)}>Edit</button>
              </li>
              <li>
                <fetcher.Form method="post">
                  <input type="hidden" name="placeId" value={place._id} />
                  <button type="submit">Delete</button>
                </fetcher.Form>
              </li>
            </Fragment>
          );
        })}
    </div>
  );
};

export default AllPlaces;

export async function deletePlaceAction({ request }) {
  const formData = await request.formData();
  const placeId = formData.get("placeId");

  try {
    await axios.delete(`http://localhost:5000/api/places/${placeId}`, {
      withCredentials: true,
    });

    return null; // Let useFetcher revalidate
  } catch (error) {
    return { error: "Failed to delete place" };
  }
}

