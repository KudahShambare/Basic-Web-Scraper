

import express from "express";
import path from "path";
import bodyParser from "body-parser";


import { duckSearch } from "./searchEngine.js";


const app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//use path to access fies
const __dirname=path.resolve();

app.use(express.static("frontend"));


app.get("/data",(req,resp)=>{
	
duckSearch("Mugabe").then(val =>{
		console.log(val);

		resp.json(val)
		
	})
})


app.post("/url",(req,resp)=>{

	const url=req.body.url;


let p= scrap(); //returns a promise which has to be resolved by the then function
p.then((a)=>{
	

	const fileHead=a[0];  // first h1 which in most cases the heading of the blog


	a.pop(); // remove last paragraph which usually has blog meta details




	resp.set({
		"Content-Type":"applicatio/pdf",
		"Content-Disposition":"attachment/output.pdf"
	}).redirect("/get-file")

})



})

app.get("/get-file",(req,resp)=>{
	resp.sendFile(__dirname+"/output.pdf")
})

const PORT = 5500;
app.listen(PORT,()=>{
	console.log("App listening to port "+PORT);
})

//webpage 



//sortable plainrowheaders wikitable jquery-tablesorter

