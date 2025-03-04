const add = document.getElementById("add");
const urlText = document.getElementById("url");
const submit = document.getElementById("submit");

let allLinks = [];
add.addEventListener("click", (e) => {
  console.log("Add clicked");
  
  e.preventDefault();
  //alert("Add")
  allLinks.push(urlText.value);
  alert(
    "Link added, you can add more links or click submit to process the links"
  );
  urlText.select();
  document.getSelection().deleteFromDocument();
  //console.log(allLinks.length, allLinks);
});

submit.addEventListener("click", (e) => {
  console.log("ok");
  
  e.preventDefault();
  if (urlText.value != "") {
    allLinks.push(urlText.value);
  }
  urlText.select();
  document.getSelection().deleteFromDocument();

  fetch("/url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: allLinks }),
  })
    .then((res) => {
      console.log(res);
      
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
