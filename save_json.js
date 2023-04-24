const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const save = async (randomText) => {
    console.log("saving");
    await s3.putObject({
        Body: JSON.stringify(randomText, null, 2),
        Bucket: "cyclic-dull-puce-dhole-toga-us-east-1",
        Key: "text.json",
    }).promise()
};

module.exports = { save };