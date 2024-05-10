const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const PORT = 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/Inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.log(err));

const register = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const category = mongoose.Schema({
  name: String,
  data: [],
  image: String,
});

const adminRequest = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const Register = mongoose.model("Users", register);
const AdminRequest = mongoose.model("AdminRequests", adminRequest);
const Category = mongoose.model("Category", category);

app.use(cors());
app.use(BodyParser.json());

app.post("/signUp", async (req, res) => {
  try {
    const new_admin = new Register();
    const admins = await Register.find();
    let flag = true;
    for (let i = 0; i < admins.length; i++) {
      if (admins[i].email == req.body.email) {
        flag = false;
        res.status(400).send("Email already present");
        break;
      }
    }
    if (flag) {
      new_admin.name = req.body.name;
      new_admin.email = req.body.email;
      new_admin.password = req.body.password;
      new_admin.role = req.body.role;
      await new_admin.save();
      res.status(201).send("SignUp successfully");
    }
  } catch {
    res.status(400).send("Somthign went wrong");
  }
});

app.post("/signIn", async (req, res) => {
  try {
    const admins = await Register.find();
    let flag = true;
    for (let i = 0; i < admins.length; i++) {
      if (admins[i].email == req.body.email) {
        if (admins[i].password == req.body.password) {
          res.status(201).json(admins[i]);
        } else {
          res.status(400).send("Invalid Password");
        }
        flag = false;
        break;
      }
    }
    if (flag) {
      res.status(400).send(`${req.body.email} not exist`);
    }
  } catch {
    res.status(400).send("Something went wrong");
  }
});

app.post("/category", async (req, res) => {
  try {
    const new_category = await Category();
    new_category.image = req.body.image;
    new_category.name = req.body.name;
    new_category.data = [];
    await new_category.save();
    res.status(201).send(`${req.params.name} category added`);
  } catch {
    res.status(400).send("Somethig went wrong");
  }
});

app.get("/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

app.post("/addproduct/:categoryId", async (req, res) => {
  const id = new ObjectId(req.params.categoryId);
  let result = await Category.find({
    _id: id,
  });
  result = result[0].data;
  result.push(req.body);
  await Category.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        data: result,
      },
    }
  );
  res.status(201).send("Successfully added");
});

app.put("/updateProduct/:categoryId/:productId", async (req, res) => {
  const id = new ObjectId(req.params.categoryId);
  let result = await Category.find({
    _id: id,
  });
  result = result[0].data;
  result[req.params.productId].name = req.body.name;
  result[req.params.productId].quantity = req.body.quantity;
  result[req.params.productId].price = req.body.price;
  await Category.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        data: result,
      },
    }
  );
  res.status(201).send("Successfully updated");
});

app.get("/products", async (req, res) => {
  try {
    const folders = await Category.find();
    let ans = [];
    let total_quantity = 0;
    let total_amount = 0;
    for (let i = 0; i < folders.length; i++) {
      for (let j = 0; j < folders[i].data.length; j++) {
        ans.push(folders[i].data[j]);
        total_quantity += Number(folders[i].data[j].quantity);
        total_amount +=
          Number(folders[i].data[j].quantity) *
          Number(folders[i].data[j].price);
      }
    }
    res.status(201).json({
      folders: ans,
      quantity: total_quantity,
      amount: total_amount,
    });
  } catch {
    res.status(400).send("Something went wrong");
  }
});

app.post("/adminRequest", async (req, res) => {
  const new_request = new AdminRequest();
  new_request.name = req.body.name;
  new_request.email = req.body.email;
  new_request.password = req.body.password;
  new_request.role = req.body.role;
  await new_request.save();
  res.send("Request successfully send to Admin");
});

app.get("/adminRequests", async (req, res) => {
  try {
    const docs = await AdminRequest.find();
    res.status(201).json(docs);
  } catch {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/adminRequest/:Id", async (req, res) => {
  try {
    let id = new ObjectId(req.params.Id);
    await AdminRequest.deleteOne({ _id: id });
    res.status(201).send("Deleted successfully");
  } catch {
    res.status(400).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
