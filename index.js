
import fetch from "node-fetch";
import cheerio from "cheerio";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import pdfkit from "pdfkit";
import fs from "fs";

const app=express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//use path to access fies
const __dirname=path.resolve();





//routes
app.get("/",(req,resp)=>{
	resp.sendFile(__dirname+"/index.html");
})

app.post("/url",(req,resp)=>{

	const url=req.body.url;

	const scrap= async()=>{
	try{
		const feching =await fetch(url);
		const body = await feching.text();
		
	const cheerioLoad = await cheerio.load(body);
	const heading=cheerioLoad("h1").text();
const result = cheerioLoad("p").text();

//console.log(result);

const paragraphs =result.split("\n");
paragraphs.push(heading);

return paragraphs;

//resp.send(paragraphs[0]);
//console.log(paragraphs);
}
catch(err){
	console.error(err)
}
}
let p= scrap();
p.then((a)=>{
	//console.log(a);

	const fileHead=a[a.length-1];
	console.log(fileHead);

	a.pop();


	const pdfFile= new pdfkit();

	pdfFile.pipe(fs.createWriteStream('output.pdf'));
//HEADING
	pdfFile.fontSize(20).text(fileHead,{paragraphGap:35,align:"center"}).fontSize(13);

	//PARAGRAPHS
	a.map((para)=>{
		return 	pdfFile.text(para,{paragraphGap:30})
	})

pdfFile.end();

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

