const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const read = require("node-readability");
const serverless = require("serverless-http");

const router = express.Router();
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, "../frontend"))); // Make sure "frontend" is at the root

/** Functions */
const objectifyBlog = (url) => {
  return new Promise((resolve, reject) => {
    let obj = {
      title: "",
      textBody: "",
    };
    read(url, function (err, article, meta) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        // Title and Text Body
        let title = article.title;
        let textBody = article.textBody;
        obj.title = title;
        obj.textBody = textBody;
      }

      // Close article to clean up
      article.close();
      resolve(obj);
    });
  });
};

/***** Routes */

// Serve the HTML file from "frontend/index.html"
app.get("/", (req, resp) => {
  resp.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Handle the URL post request
app.post("/url", async (req, resp) => {
  const urlArr = req.body.url;

  const promises = urlArr.map((url) => objectifyBlog(url));
  const blogArr = await Promise.all(promises);

  // Introduce a delay if needed
  await new Promise((resolve) => setTimeout(resolve, 1000));

  resp.json(blogArr);
});

// Serve a file (like a PDF)
app.get("/get-file", (req, resp) => {
  resp.sendFile(path.join(__dirname, "../output.pdf"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
// Serverless export
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);
