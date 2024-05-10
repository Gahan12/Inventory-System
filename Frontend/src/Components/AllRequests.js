import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const AllRequests = (props) => {


  const keys = Object.keys(props.productRequests);

  return (
    <div className="bg-gray-100 text-gray-800 rounded-lg p-6 shadow-md">
      {props.flag ? (
        <table className="table-auto w-full" border="1px">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-slate-600">#</th>
              <th className="px-4 py-2 border border-slate-600">Name</th>
              <th className="px-4 py-2 border border-slate-600">Quantity</th>
              <th className="px-4 py-2 border border-slate-600">
                Verification
              </th>
            </tr>
          </thead>
          <tbody>
            {keys.map((val, key) => (
              <tr>
                <th className="px-4 py-2 border border-slate-600">{key + 1}</th>
                <th className="px-4 py-2 border border-slate-600">
                  {props.productRequests[val].map((v, k) => (
                    <tr>{v.name}</tr>
                  ))}
                </th>
                <th className="px-4 py-2 border border-slate-600">
                  {props.productRequests[val].map((v, k) => (
                    <tr>{v.quantity}</tr>
                  ))}
                </th>
                <th className="px-4 py-2 border border-slate-600">
                  <button
                    onClick={async () => {
                      let name = [],
                        quantity = [],
                        category =
                          props.productRequests[val][
                            props.productRequests[val].length - 1
                          ].category;
                      let value=null;
                      for (let x in props.folders) {
                        if (props.folders[x].name == category) {
                          value = props.folders[x];
                        }
                      }
                      if (value==null) {
                        alert(`Make category of name: ${category}`);
                        window.location.pathname = "/addCategory";
                        return;
                      }
                      for (
                        let i = 0;
                        i < props.productRequests[val].length-1;
                        i++
                      ) {
                        name.push(props.productRequests[val][i].name);
                        quantity.push(props.productRequests[val][i].quantity);
                      }
                      for (let x in name) {
                        let f = true;
                        for (let y in value.data) {
                          if (name[x]==value.data[y].name) {
                            f = false;
                          }
                        }
                        if (f) {
                          alert(
                            `Make product folder ${name[x]} in ${category} category`
                          );
                          window.location.pathname = `/addProduct/${value._id}`;
                          return;
                        }
                      }        
                      const response = await fetch(
                        "http://localhost:4000/verification",
                        {
                          method: "POST",
                          body: JSON.stringify({
                            name: name,
                            quantity: quantity,
                            address: val,
                            port: "3004",
                            category: category,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      if (response.ok) {
                        for (let x in value.data) {
                          for (let y in name) {
                            if (value.data[x].name == name[y]) {
                              await fetch(
                                `http://localhost:5000/updateProduct/${value._id}/${x}`,
                                {
                                  method: "PUT",
                                  body: JSON.stringify({
                                    name: name[y],
                                    quantity: (Number(quantity[y])+Number(value.data[x].quantity)).toString(),
                                    price: value.data[x].price,
                                  }),
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                }
                              );
                            }
                          }
                        }
                      } else {
                        console.error('Error: ', response.error);
                      }
                    }}
                    className="btn btn-success mr-2 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2  border border-slate-600">#</th>
              <th className="px-4 py-2  border border-slate-600">Name</th>
              <th className="px-4 py-2  border border-slate-600">Email</th>
              <th className="px-4 py-2  border border-slate-600 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.adminRequests.map((val, key) => (
              <tr key={key}>
                <th className="px-4 py-2 border border-slate-600">{key + 1}</th>
                <th className="px-4 py-2 border border-slate-600">
                  {val.name}
                </th>
                <th className="px-4 py-2 border border-slate-600">
                  {val.email}
                </th>
                <th className="px-4 py-2 border border-slate-600">
                  <button
                    onClick={async () => {
                      try {
                        await fetch("http://localhost:5000/signUp", {
                          method: "POST",
                          body: JSON.stringify({
                            name: val.name,
                            email: val.email,
                            password: val.password,
                            role: val.role,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        });
                        // After successful signup, you might want to delete the admin request
                        await fetch(
                          `http://localhost:5000/adminRequest/${val._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                      } catch (error) {
                        console.error("Error:", error);
                      }
                    }}
                    className="btn btn-success mr-2 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await fetch(
                          `http://localhost:5000/adminRequest/${val._id}`,
                          {
                            method: "DELETE",
                          }
                        );
                      } catch (error) {
                        console.error("Error:", error);
                      }
                    }}
                    className="btn btn-danger hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllRequests;
