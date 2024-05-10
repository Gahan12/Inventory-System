import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TableTwo = ({ folders, data }) => {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-4 mr-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Categories</h2>
            <p className="mt-1 text-sm text-gray-700 mr-6">
              This is a list of all inventory categories. You can add new ,
              delete existing ones.
            </p>
          </div>
          {data.role == "Admin" && (
            <div>
              <Link
                to="/addcategory"
                className="ml-4  rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new Category
              </Link>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="">
                      <th
                        scope="col"
                        className="px-4 py-3.5 flex flex-row justify-center text-left text-sm font-normal text-gray-700"
                      >
                        <span>Category</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5  text-center text-sm font-normal text-gray-700"
                      >
                        <span>Name</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {folders.map((product) => (
                      <tr key={product.name}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex flex-row justify-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={product.image}
                                alt=""
                              />
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm  text-center text-gray-900 ">
                            {product.name}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TableTwo;
