import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  

  const { isLoading, error, data } = useQuery({ //we are fetching data here
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs/?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });
 
  //useMutation is a hook provided by react-query that facilitates making mutations, like POST, PUT, DELETE requests, and handling their state
  const mutation = useMutation({  // from  tanstack/react-query to make post request
    mutationFn: (id) => { //this id is gig id
      return newRequest.delete(`/gigs/${id}`); //deleting gig using gig idS
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["myGigs"]) //Add our review to data
    }
  });


const handleDelete=(id)=>{

mutation.mutate(id);

}
console.log(error);
  return (
    <div className="myGigs">
      {isLoading ? (
        "loading "
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
      {data.map((gig)=>(  
        <tr key={gig._id}>
              <td>
                <img
                  className="image"
                  src={gig.cover}
                  alt=""
                />
              </td>
              <td>{gig.title}</td>
              <td>
               {gig.price}
              </td>
              <td>{gig.sales}</td>
              <td>
                <img
                  className="delete"
                  src="./img/delete.png"
                  alt=""
                  onClick={()=>handleDelete(gig._id)}
                />
              </td>
            </tr>
      ))}
      </tbody> 
           
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;