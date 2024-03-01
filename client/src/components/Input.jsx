import React from "react";

const Input = ({ name, type, id, value, setInput }) => {
  return (
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          {name}
        </label>
        <input
          type={type}
          className="form-control"
          id={id}
          value = {value}
          aria-describedby="emailHelp"
          onChange={(e)=>{
            setInput((prev)=>({...prev, [id]: e.target.value}))
          }}
        />
      </div>
  
      
  );
};

export default Input;
