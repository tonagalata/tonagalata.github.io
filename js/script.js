

// Check API
// https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=APPID&appKey=APPKEY

const $creds = {
  "appId": "50fa89ed",
  "appKey": "2b12b9151d4e815121991d77947f2f5f",
}

const $query = {
  "query": 'taco bell'
}

$.ajax({
  url:`https://api.nutritionix.com/v1_1/search/${$query.query}?&appId=${$creds.appId}&appKey=${$creds.appKey}`,
  success: (data) => {
      console.log(data);
  },
  error: (error) => {
        console.log('bad request: ', error);
    }
  });

  document.addEventListener("touchstart", function(){}, true)


