const { Router } = require("express");
const { save } = require("../save_json");
let favouriteNumber = require("../text.json");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const router = new Router();

router.get("/text", async (req, res) => {
  let my_file = await s3.getObject({
    Bucket: "cyclic-dull-puce-dhole-toga-us-east-1\n",
    Key: "text.json",
  }).promise()
  const randomText = JSON.parse(my_file.Body)?.content;
  res.json({
    status: "success",
    result: randomText,
  });
});

router.post("/text", async (req, res) => {
  const {content} = req.body;
  if(content == null ) {
    res.status(400).send("Text not provided");
    return;
  }
  await save({
    content: content
  });
  res.json({
    status: "success",
    newContent: content,
  });
});

module.exports = router;