import React, { Fragment } from "react";
import { useEffect } from "react";
import { useLoaderData,useFetcher,useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import Map from "../components/Map";
import {ToastContainer, toast} from 'react-toastify'
import Pagination from "../utils/pagination";
const AllPlaces = () => {
  const data = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation()
  if (data.places.length === 0) {
    return <h2>No Place Found</h2>;
  }
  const editHandler = (id) => {};
  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const toastMessage = params.get('toast')
    if(toastMessage === 'place-added'){
      toast.success("Place added successfully")
        // Clean the URL
    const cleanUrl = location.pathname;
    navigate(cleanUrl, { replace: true });
    }
    if(toastMessage === 'logged-in'){
      toast.success("You have loggedIn successfully")
        // Clean the URL
    const cleanUrl = location.pathname;
    navigate(cleanUrl, { replace: true });
    }
   
  },[location,navigate])

  // Handle Pagination
  // const setCurrentPage = async(page) =>{
  //   const res = 
  // }

  return (
    <div>
      {/* {success && <p style={{color:'green'}}>New Place has been created Successfully</p>} */}
      <div className="d-flex justify-content-between">
      <h1 className="place-heading">All <span> Places</span></h1>
      </div>
      <div className="place-list">
      {data &&
        data.places.map((place) => {
          return (
            <div key={place._id} className="place">
              <div className="mb-10">
              <Map lat={place.location.lat} lng={place.location.lon} />
              </div>
              <h2 className="place-title">{place.title}</h2>
              <p className="place-description">{place.description}</p>
              {/* <p>lat: {place.lat}</p>
              <p>lng : {place.lon}</p> */}
              <div className="btn-action">
                <button className="btn-edit" onClick={() => navigate(`/update-place/${place._id}`)}>Edit</button>
                <fetcher.Form method="post">
                  <input type="hidden" name="placeId" value={place._id} />
                  <button className="btn-delete" type="submit">Delete</button>
                </fetcher.Form>
              </div>

            </div>
          );
        })}
        <Pagination  currentPage={data.currentPage} totalPages={data.totalPages}  />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AllPlaces;

export async function deletePlaceAction({ request }) {
  const formData = await request.formData();
  const placeId = formData.get("placeId");

  try {
    await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/places/${placeId}`, {
      withCredentials: true,
    });

    return null; // Let useFetcher revalidate
  } catch (error) {
    return { error: "Failed to delete place" };
  }
}

export const fetchPlacesLoader =  async ({request}) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  console.log(page,"==================Page Number=================")
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (!userId) throw new Error("Not logged in");
  const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/places/user/${userId}?page=${page}`, {
    withCredentials: true,
  });
  return res.data;
}

