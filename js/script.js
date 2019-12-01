

// Check API
// https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=APPID&appKey=APPKEY

let $foodSearch = '';

// function clearList(){

// }
// clearList();

const $creds = {
  "appId": "50fa89ed",
  "appKey": "2b12b9151d4e815121991d77947f2f5f",
}

const $fieldSet = {
  'calories': 'nf_calories',
  'brandName': 'brand_name',
  'fats': 'nf_total_fat',
  'carbs': 'nf_total_carbohydrate',
  'protein': 'nf_protein',
  'sugar': 'nf_sugars',
  'results': '0:20',
  'itemName': 'item_name',
  'totalServing': 'nf_servings_per_container'
}

let $calIntakeNum = null;
let $bCals = null;
let $lCals = null;
let $dCals = null;
let $sCals = null;

let $totalCalories = null
let $totalDailyCalories = parseInt(prompt('What is your daily calorie goal...'));

function clicked() {
  // event.preventDefault();

  let $addFoodText = event.target.offsetParent.getElementsByClassName('submit-div')[0].innerHTML;
  console.log(event.target.offsetParent.getElementsByClassName('submit-div')[0]);
  console.log(event.target.offsetParent.getElementsByClassName('sugar')[0].innerText);
  console.log(event.target.offsetParent.getElementsByClassName('protein')[0].innerText);
  console.log(event.target.offsetParent.getElementsByClassName('carbs')[0].innerText);
  console.log(event.target.offsetParent.getElementsByClassName('totalFat')[0].innerText);
  let $itemCals = event.target.offsetParent.getElementsByClassName('calories')[0].innerHTML;
  // console.log(event.target.offsetParent.getElementsByClassName('submit-div')[0].innerHTML)

  console.log($('div li > .sub-button').parents('li'))
  $addFood = $addFoodText
  // $('li.search-result').closest('li')
  
  $('ul.daily-meals').append(`<li class="waves-effect col s12"><a class="btn waves-effect red">Delete</a><div class="list-text  col s8">${$addFood}</div></li>`)

  $calIntakeNum++
  
  let $bSetDailyCal, $lSetDailyCal, $dSetDailyCal, $sSetDailyCal;

  if($calIntakeNum <= 3){
    $bCals += parseInt($itemCals)
    // console.log(myChart2.config.data.datasets[0].data[0]);
    $bSetDailyCal = parseInt((($bCals / $totalDailyCalories)*100));
    
    $('#progress-bar').css('width', `${$bSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals}(kcal) ${$bSetDailyCal}%`);
  } else if($calIntakeNum > 3 && $calIntakeNum <= 6){
    $lCals += parseFloat($itemCals)
    $lSetDailyCal = parseInt(((($bCals + $lCals) / $totalDailyCalories)*100));
    
    $('#progress-bar').css('width', `${$bSetDailyCal + $lSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals + $lCals}(kcal) ${$lSetDailyCal}%`);
  } else if($calIntakeNum > 6 && $calIntakeNum <= 9){
    $dSetDailyCal = parseInt(((($bCals + $lCals + $dCals) / $totalDailyCalories)*100));
    
    $('#progress-bar').css('width', `${$bSetDailyCal + $lSetDailyCal + $dSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals + $lCals + $dCals}(kcal) ${$dSetDailyCal}%`);
    $dCals += parseFloat($itemCals)
  } else if($calIntakeNum <= 10){
    $sCals += parseFloat($itemCals)
    $sSetDailyCal = parseInt(((($bCals + $lCals + $dCals + $sCals) / $totalDailyCalories)*100));
    
    $('#progress-bar').css('width', `${$bSetDailyCal + $lSetDailyCal + $dSetDailyCal + $sSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals + $lCals + $dCals + $sCals}(kcal) ${$sSetDailyCal}%`);
  }

let ctx2 = document.getElementById('myChart2').getContext('2d');
let myChart2 = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
        labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        datasets: [{
            label: 'Calories by Meal',
            data: [$bCals, $lCals, $dCals, $sCals],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        labels: {
          fontColor: "black",
          boxWidth: 20,
          padding: 20
      }
      },
        scales: {
          yAxes: [{
            gridLines: {
              drawBorder: false,
            }
          }],
            xAxes: [{
              display: false,
              gridLines: {
                display: false,
              },
              ticks: {
                 beginAtZero: true,
                 display: false
              }
            }]
        }
    }
});

}

$('#auto-search').on('click', (evt) => {
  evt.preventDefault();

  if(!$('#search-list div')){
    return;
  }else{
  for(let i = 0; i < 20; i++){
    $('#search-list div').remove(i);
  }
  }
  $foodSearch = $('#autocomplete-input').val();
  
  const $query = JSON.stringify($foodSearch)

  console.log(evt)
  console.log(JSON.stringify($foodSearch))

const promise = $.ajax({
    url:`https://api.nutritionix.com/v1_1/search/${$query}?results=${$fieldSet.results}&fields=${$fieldSet.brandName},${$fieldSet.itemName},${$fieldSet.fats},${$fieldSet.carbs},${$fieldSet.protein},${$fieldSet.sugar},${$fieldSet.calories},${$fieldSet.totalServing}&appId=${$creds.appId}&appKey=${$creds.appKey}`,
    success: (data) => {
        console.log(data);
    },
    error: (error) => {
          console.log('bad request: ', error);
      }
    });

  promise.then( (data) => {
    console.log(data)
    console.log(data.hits)
    console.log(data.hits[0].fields.item_name)

    for(let i = 0; i < 20; i++){
      $('ul#search-list').append(`<div class="search-add"><li class="waves-effect col s12 search-result"><button class="sub-button btn right waves-effect" onclick="clicked()">Add</button><div class="submit-div list-text col s8"><dl> 
      <dt>Brand:</dt><dd class="list-item">${data.hits[i].fields.brand_name}</dd> 
      <dt>Name:</dt><dt></dt><dd>${data.hits[i].fields.item_name}</dd>
      <dt>Nutrients</dt>
      <dd>Calories: <span class="calories">${data.hits[i].fields.nf_calories}</span> kcal</dd> 
      <dd>Protein: <span class="protein">${data.hits[i].fields.nf_protein}</span> (g)</dd> 
      <dd>Sugar: <span class="sugar">${data.hits[i].fields.nf_sugars}</span> (g)</dd> 
      <dd>Carbs: <span  class="carbs">${data.hits[i].fields.nf_total_carbohydrate}</span> (g)</dd>
      <dd>Total Fat: <span class="totalFat">${data.hits[i].fields.nf_total_fat}</span> (g)</dd>
      <dd>Serv. Size: <span class="servSize">${data.hits[i].fields.nf_serving_size_qty}</span></dd>
      <dd>Total Servings: <span class="TotalServ">${data.hits[i].fields.nf_servings_per_container}</span></dd></dl>
      </div></li></div>`)
    }

  });
});

{/* 
  <button class="btn col s2 right waves-effect">Add</button><div><li class="waves-effect col s10 search-result">
      <div class="list-text col s8"> 
      <dt>Brand:</dt><dd class="list-item">${data.hits[i].fields.brand_name}</dd></div>
      </li></div>
  <div class="list-text col s8"> 
<dt>Brand:</dt><dd class="list-item">${data.hits[i].fields.brand_name}</dd> 
<dt>Name:<dt><dd>${data.hits[i].fields.item_name}</dd>
<dt>Nutrients</dt>
<dd class="list-item">Calories: ${data.hits[i].fields.nf_calories} kcal</dd> 
<dd class="list-item">Protein: ${data.hits[i].fields.nf_protein} (g)</dd> 
<dd class="list-item">Sugar: ${data.hits[i].fields.nf_sugars} (g)</dd> 
<dd class="list-item">Carbs: ${data.hits[i].fields.nf_total_carbohydrate} (g)</dd>
<dd class="list-item">Total Fat: ${data.hits[i].fields.nf_total_fat} (g)</dd>
<dd class="list-item">Serv. Size: ${data.hits[i].fields.nf_serving_size_qty}</dd>
<dd class="list-item">Total Servings: ${data.hits[i].fields.nf_servings_per_container}</dd>
</div> */}


// for(let i=1; i <= $countItems; i++){
// $('ul.daily-meals').append(`<li class="waves-effect col s12"><a href="#" class="btn waves-effect">List Item 2</a><div class="list-text  col s8">Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text!</div></li>`)
// }


  $('#progress-bar').css('width', '20%');
  $('#progress-bar').removeClass('green').addClass('red')
  $('#total-percent').text('20%');

  $('#progress-bar2').css('width', '40%');
  $('#progress-bar2').removeClass('green').addClass('yellow')
  $('#goal-percent').text('40%');



document.addEventListener("touchstart", function(){}, true)

let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    title:{
      text: "Macronutrients"   
    },
    type: 'doughnut',
    data: {
        labels: ['Fats', 'Carbs', 'Protein'],
        datasets: [{
            label: '% of macronutrients',
            data: ['20', '40', '40'],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
            position: 'left',
            labels: {
              fontColor: "black",
              boxWidth: 20,
              padding: 20
          }
          }
      }
});





let ctx3 = document.getElementById('myChart3').getContext('2d');
let myChart3 = new Chart(ctx3, {
    type: 'horizontalBar',
    data: {
        labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        datasets: [{
            label: 'Calories by Meal',
            data: [25, 32, 37, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        labels: {
          fontColor: "black",
          boxWidth: 20,
          padding: 20
      }
      },
        scales: {
          yAxes: [{
            gridLines: {
              drawBorder: false,
            }
          }],
            xAxes: [{
              display: false,
              gridLines: {
                display: false,
              },
              ticks: {
                 beginAtZero: true,
                 display: false
              }
            }]
        }
    }
});

let ctx4 = document.getElementById('myChart4').getContext('2d');
let myChart4 = new Chart(ctx4, {
    title:{
      text: "Macronutrients"   
    },
    type: 'doughnut',
    data: {
        labels: ['Fats', 'Carbs', 'Protein'],
        datasets: [{
            label: '% of macronutrients',
            data: ['20', '40', '40'],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
            position: 'left',
            labels: {
              fontColor: "black",
              boxWidth: 20,
              padding: 20
          }
          }
      }
});


let $countItems = 50;


// for(let i=1; i <= $countItems; i++){
// $('ul.daily-meals').append(`<li class="waves-effect col s12"><a href="#" class="btn waves-effect">List Item 2</a><div class="list-text  col s8">Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text!</div></li>`)
// }

// for(let i=1; i <= $countItems; i++){
//   $('#search-list').append(`<li class="waves-effect col s12"><a href="#" class="btn waves-effect">Food Item ${i}</a><div class="list-text  col s8">Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! </div></li>`)
//   }

  $('#nav-mobile3').on('click', () => {
    $('.sidenav').sidenav();
  });




