import express from "express";
import path from "path";
import bodyParser from "body-parser";
import read from "node-readability";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//use path to access fies
const __dirname = path.resolve();

app.use(express.static("frontend"));

/**   Fuctions */

const objectifyBlog =  (url) => {
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

      // Title
      let title = article.title;

      // HTML Text
      let textBody = article.textBody;
    
      obj.title = title;
      obj.textBody = textBody;
      }

      // Close article to clean up
      article.close();
      resolve(obj);
    });
  });
}


/*****Route */
app.post("/url", async (req, resp) => {
  const urlArr = req.body.url;

  const promises = urlArr.map((url) => objectifyBlog(url));
  const blogArr = await Promise.all(promises);

  // Introduce a delay if needed
  await new Promise((resolve) => setTimeout(resolve, 1000));

  //console.log(blogArr);
  resp.json(blogArr);
});

app.get("/get-file", (req, resp) => {
  resp.sendFile(__dirname + "/output.pdf");
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log("App listening to port " + PORT);
});
