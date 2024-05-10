import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Folder = (props) => {

  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {props.folders.map((folder) => (
        <Link to={`/products/${folder._id}`} key={folder.name} className="w-60 p-3 text-stone-700 bg-stone-100 rounded-md shadow-md">
          <div className="flex justify-center">
            <img className="h-60 w-45" src={folder.image} alt={folder.name} />
          </div>
          <h1 className="text-sm text-center font-medium p-1">{folder.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Folder;