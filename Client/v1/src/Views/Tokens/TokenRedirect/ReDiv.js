import React from 'react'
import { useLocation } from 'react-router-dom';
const ReDiv = ({}) => {
  const { state } = useLocation();
  console.log(state);

    window.location.href = `https://${state?.Url}`;
  return (
    <div className="loaderDiv">
        <h1>
            REEE Tokenizer 
        </h1>
    </div>
  )
}

export default ReDiv