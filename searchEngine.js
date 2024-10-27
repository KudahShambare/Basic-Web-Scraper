import * as DDG from 'duck-duck-scrape';

export const duckSearch = async (searchQuery) =>{

    const searchResults = await DDG.search('kudakwashe shambare fide', {
        safeSearch: DDG.SafeSearchType.STRICT
      });


      return searchResults.results;
    
}


const search = duckSearch("mugabe")
console.log(search.then((val)=>{
  console.log(val);
  
}));




