import * as DDG from 'duck-duck-scrape';

export const duckSearch = async (searchQuery) =>{

    const searchResults = await DDG.search(searchQuery, {
        safeSearch: DDG.SafeSearchType.STRICT
      });


      return searchResults.results;
    
}






