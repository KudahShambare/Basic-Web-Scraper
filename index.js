
import fetch from "node-fetch";
import cheerio from "cheerio";


const url="https://www.pindula.co.zw/Joshua_Maponga"

const scrap= async()=>{
	try{
		const feching =await fetch(url);
		console.log(feching.body)
	const cheerioLoad =cheerio.load(feching);
const result = cheerioLoad("p").text();
console.log(result)

}
catch(err){
	console.error(err)
}
}
scrap();