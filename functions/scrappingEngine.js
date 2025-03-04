import fetch from "node-fetch";
import cheerio from "cheerio";

const scrap= async(url)=>{
	try{
		const feching =await fetch(url);
		const body = await feching.text();
		
	const cheerioLoad = await cheerio.load(body);
	const heading=cheerioLoad("h1").text(); //scrap all h1 headings on the site
const result = cheerioLoad("p").text(); //scrap all paragraphs ont he site

//console.log(result);

const paragraphs =result.split("\n"); //put all the paragraphs into an array

const blogArr = [heading,...paragraphs] //add the heasding and the paragraphs into 1 array

return blogArr;


}
catch(err){
	console.error(err)
}
}