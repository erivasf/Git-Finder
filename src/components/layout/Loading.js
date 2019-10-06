import React , {Fragment}from 'react'
import loading from './loading.gif'
const Loading = () => 
    <Fragment>
    <img src={loading} alt="Loading..." style ={spinnerStyle} />
    </Fragment>

const spinnerStyle = {
  width: '10vw', 
  margin: 'auto',
  display: 'block'
}
export default Loading
