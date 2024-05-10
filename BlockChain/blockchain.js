const express = require("express");
const crypto = require("crypto-js");
//const Web3 = require('web3');
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const PORT = 4000;

app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

class CryptoBlock {
  constructor(index, timestamp, data, precidingHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precidingHash = precidingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return crypto
      .SHA256(
        this.index +
          this.precidingHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.nonce
      )
      .toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4;
    this.total = 0;
    this.category = "";
  }

  startGenesisBlock() {
    return new CryptoBlock(0, "01/01/2020", "Initial Block in the Chain", "0");
  }

  obtainLastBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.precidingHash = this.obtainLastBlock().hash;
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.precidingHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}

let products = [];

app.use(express.json());

app.post("/entry", (req, res) => {
  let data = req.body;
  let name = data.name;
  let quantity = data.quantity;
  let manufacture = new Date();
  let expire = data.expire;
  let n = name.length;
  if (
    quantity.length != n ||
    expire.length != n ||
    n == 0 ||
    !req.body.category
  ) {
    res.status(404).send("Insufficient Data");
    return;
  }
  let blockchain = new CryptoBlockchain();
  let detail;
  let newBlock;
  for (let i = 0; i < n; i++) {
    let x = new Date(Date.parse(expire[i]));
    if (x <= manufacture) {
      res.status(404).send("Expire Items are present");
      return;
    }
    detail = {
      name: name[i],
      quantity: quantity[i],
      expire: x,
    };
    newBlock = new CryptoBlock(
      blockchain.obtainLastBlock().index + 1,
      new Date(),
      detail
    );
    blockchain.addNewBlock(newBlock);
    blockchain.total += 1;
  }
  detail = {};
  newBlock = new CryptoBlock(
    blockchain.obtainLastBlock().index + 1,
    new Date(),
    detail
  );
  blockchain.addNewBlock(newBlock);
  blockchain.category = req.body.category;
  products.push(blockchain);
  res.status(200).send("Entry added successfully");
});

app.post("/verification", (req, res) => {
  let data = req.body;
  let address = data.address;
  let name = data.name;
  let quantity = data.quantity;
  let port = data.port;
  let cur_Date = new Date();
  let n = name.length;

  if (address >= products.length) {
    res.status(404).send(`Invalid address`);
    return;
  }

  if (quantity.length != n) {
    res.status(404).send(`Insufficient Data`);
    return;
  }

  if (req.body.category != products[address].category) {
    res.status(404).send(`Invalid Category`);
    return;
  }

  if (port < "3001") {
    res.status(404).send(`Invalid PORT ${port}`);
    return;
  } else if (port > "3001") {
    if (
      products[address].blockchain[
        products[address].total + 1
      ].data.hasOwnProperty(port - 1) == false
    ) {
      res.status(404).send(`Previous PORT ${port - 1} is not verified yet`);
      return;
    } else if (
      products[address].blockchain[products[address].total + 1].data[
        port - 1
      ] == "Fail"
    ) {
      res
        .status(404)
        .send(
          `Previous PORT ${
            port - 1
          } is fail in verification so we cannot verify at ${port}`
        );
      return;
    }
  }

  if (products[address].total != n) {
    res.status(404).send(`Invalid Items`);
    return;
  }

  for (let i = 1; i <= products[address].total; i++) {
    if (name[i - 1] != products[address].blockchain[i].data.name) {
      products[address].blockchain[products[address].total + 1].data[port] =
        "Fail";
      res.status(404).send(`Invalid Item`);
      return;
    }
    if (quantity[i - 1] != products[address].blockchain[i].data.quantity) {
      products[address].blockchain[products[address].total + 1].data[port] =
        "Fail";
      let x = products[address].blockchain[i].data.quantity - quantity[i - 1];
      if (x > 0) {
        res.status(404).send(`${x} items are missing`);
      } else {
        res.status(404).send(`${x} items are more`);
      }
      return;
    }
    if (products[address].blockchain[i].data.expire <= cur_Date) {
      products[address].blockchain[products[address].total + 1].data[port] =
        "Fail";
      res.status(404).send(`Item Already Expired`);
      return;
    }
  }
  products[address].blockchain[products[address].total + 1].data[port] = "Pass";
  res.status(200).send(`Validation Successfull`);
});

app.get("/products", (req, res) => {
  let result = {};
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].blockchain[products[i].total + 1].data[3003] == "Pass" &&
      products[i].blockchain[products[i].total + 1].data.hasOwnProperty(3004) ==
        false
    ) {
      result[i] = [];
      for (let j = 1; j <= products[i].total; j++) {
        result[i].push(products[i].blockchain[j].data);
      }
      result[i].push({ category: products[i].category });
    }
  }
  res.status(200).json(result);
});

app.get("/show", (req, res) => {
  res.status(201).send(products);
});
