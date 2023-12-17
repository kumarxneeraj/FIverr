import React from 'react'
import "./Slide.scss"
import Slider from 'infinite-react-carousel';


const Slide = ({children,slidesToShow,arrowsScroll}) => {
  return (
 <div className='slide'>
<div className="container">
<Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
  {/* {cards.map(card=>(

    <CatCard item={card} key={card.id}/>
  ))} */}
  {children}
  </Slider>
</div>

 </div>
  )
}

export default Slide