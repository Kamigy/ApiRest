require("dotenv").config();
require("../src/utils/mongoose");

const prompts = require("prompts");
const Order = require("../src/models/Order");

async function main() {
  const questions = [
    {
      type: "text",
      name: "name",
      message: "What is the name of the order ?",
    },
    {
      type: "text",
      name: "image",
      message: "What is the url of the image ?",
    },
    {
        type: "text",
        name: "price",
        message: "What is the price of the order ?",
    },
    {
        type: "text",
        name: "userId",
        message: "What is the Id of the user ?",
    },
  ];

  const response = await prompts(questions);
  console.log(response)
  const order = await Order.create({
    name: response.name,
    image: response.image,
    price: response.price,
    status: "PROCESSED",
    userId: response.userId,
  });
  console.log("order created", order);
}

main();