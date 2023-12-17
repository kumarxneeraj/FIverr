import React from 'react'
import {Link} from "react-router-dom"
import { useQuery } from '@tanstack/react-query'; 
import newRequest from '../../utils/newRequest';
import "./GigCard.scss"

const GigCard = ({item}) => {


  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
    newRequest.get(`/users/${item.userId}`)
    .then((res)=>{ //notice you use `` here as we are writing java script query inside it this is a link with queries we are creating

      return res.data;
    })
  })

  return (
    <Link to={`/gig/${item._id}`}>
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "Something went wrong "
          ) : (
            <div className="user">
              <img src={data.img || "/img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.shortTitle}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{!isNaN(item.totalStars/item.starNumber) && Math.round(item.totalStars/item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GigCard