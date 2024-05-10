import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = (props) => {
  return (
    <>
      {props.category ? (
        <div className="grid grid-cols-4 gap-4 p-6">
          {props.data.role == "Admin"
            ? props.category.map((folder, key) => (
                <Link
                  to={`/product/${props.categoryId}/${key}`}
                  className="w-60 p-3 text-stone-700 bg-stone-100 rounded-md shadow-md"
                >
                  <div className="flex justify-center">
                    <img
                      className="h-60 w-45"
                      src={folder.image}
                      alt={folder.name}
                    />
                  </div>
                  <h1 className="text-sm text-center font-medium p-1">
                    {folder.name}
                  </h1>
                  <p className="text-sm text-center font-medium p-1">
                    Price: {folder.price}
                  </p>
                  <p className="text-sm text-center font-medium p-1">
                    Quantity: {folder.quantity}
                  </p>
                </Link>
              ))
            : props.category.map((folder, key) => (
                <div className="w-60 p-3 text-stone-700 bg-stone-100 rounded-md shadow-md">
                  <div className="flex justify-center">
                    <img
                      className="h-60 w-45"
                      src={folder.image}
                      alt={folder.name}
                    />
                  </div>
                  <h1 className="text-sm text-center font-medium p-1">
                    {folder.name}
                  </h1>
                  <p className="text-sm text-center font-medium p-1">
                    Price: {folder.price}
                  </p>
                  <p className="text-sm text-center font-medium p-1">
                    Quantity: {folder.quantity}
                  </p>
                </div>
              ))}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Products;
