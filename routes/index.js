const express = require("express");
const router = new express.Router();
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

router.get('/text', async function(req, res, next) {
  let my_file = await s3.getObject({
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: "content.json",
  }).promise()
  const result = JSON.parse(my_file.Body)?.content
  if(result == null) {
    res.json({
      status: "fail"
    });
  }
  else {
    res.json({
      status: "success",
      content: result,
    });
  }
});

router.post("/text", async (req, res) => {
  const {content} = req.body;
  const contentObj = {
    content: content
  }
  await s3.putObject({
    Body: JSON.stringify(contentObj, null, 2),
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: "content.json",
  }).promise()
  res.json({
    status: "success",
    content: content,
  });
});

module.exports = router;
