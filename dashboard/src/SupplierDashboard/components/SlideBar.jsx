import React from 'react'

const SlideBar = ({showFirmHandler,showProductHandler,showAllProductsHandler,showFirmHeading}) => {
  return (
    <div className='sideBarcontainer'>
        <ul>
          {showFirmHeading ? <li onClick={showFirmHandler}>Firm</li> : "" }
            <li onClick={showProductHandler}>Add product</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default SlideBar
