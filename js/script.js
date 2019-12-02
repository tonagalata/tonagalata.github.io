

// Check API
// https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=APPID&appKey=APPKEY

let $foodSearch = '';

$('span.userName')[0].innerText = JSON.parse(localStorage.getItem('userName'));
$('span.userEmail')[0].innerText = JSON.parse(localStorage.getItem('email'));
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

let $calIntakeNum = null, $bCals = null, $lCals = null, $dCals = null, $sCals = null, $fats = null, $carbs = null, $protein = null, $sugar = null, $totalCalories = null, $totalDailyCalories = parseInt($('#goal-cal').val());

function deleteEntry(evt) {
  let $removeEntry = event.target.offsetParent;
  $removeEntry.remove();
}

let $diaryEntry = [];

$('#save').on('click', (evt) => {
  evt.preventDefault();
  if($diaryEntry.length === 0) return;

  for(let i=0; i < $diaryEntry.length; i++){
    $diaryEntry[i]
    localStorage.setItem(`Food Entry: ${i}`, $diaryEntry[i])
    
  }

})

$('#clear').on('click', (evt) => {
  evt.preventDefault();
  for(let i=0; i < localStorage.length; i++){
  if(localStorage.getItem(`Food Entry: ${i}`) === null) return;
    localStorage.clear(`Food Entry: ${i}`)
  }

})

function clicked() {
  // event.preventDefault();

  console.log(event.target.offsetParent.getElementsByClassName('submit-div')[0].innerHTML)



  $diaryEntry.push(JSON.stringify(event.target.offsetParent.getElementsByClassName('submit-div')[0].innerHTML))
  
  console.log(JSON.stringify(event.target.offsetParent.getElementsByClassName('submit-div')[0].innerHTML))

  // console.log($diaryEntry)


  let $addFoodText = event.target.offsetParent.getElementsByClassName('submit-div')[0].innerHTML;
  // console.log(event.target.offsetParent.getElementsByClassName('submit-div')[0]);
  console.log('This one... ' + event.target.offsetParent.getElementsByClassName('sugar')[0].innerText);
  console.log(event.target.offsetParent.getElementsByClassName('protein')[0].innerHTML);
  let $itemProtein = event.target.offsetParent.getElementsByClassName('protein')[0].innerHTML;
  let $itemCarbs = event.target.offsetParent.getElementsByClassName('carbs')[0].innerHTML;
  let $itemFats = event.target.offsetParent.getElementsByClassName('totalFat')[0].innerHTML;
  let $itemCals = event.target.offsetParent.getElementsByClassName('calories')[0].innerHTML;
  // console.log(event.target.offsetParent.getElementsByClassName('submit-div')[0].innerHTML)

  console.log($('div li > .sub-button').parents('li'))
  $addFood = $addFoodText
  // $('li.search-result').closest('li')
  
  $('ul.daily-meals').append(`<li class="food-entries waves-effect collection-item col s12"><a class="btn waves-effect red" onclick="deleteEntry()">Delete</a><div class="list-text  col s8">${$addFood}</div></li>`)

  $calIntakeNum++
  
  let $bSetDailyCal, $lSetDailyCal, $dSetDailyCal, $sSetDailyCal;

  if($calIntakeNum <= 3){
    
    $bCals += parseInt($itemCals)
    $carbs += parseInt($itemCarbs)
    $fats += parseInt($itemFats)
    $protein += parseInt($itemProtein)
    // console.log(myChart2.config.data.datasets[0].data[0]);
    $bSetDailyCal = parseInt((($bCals / $totalDailyCalories)*100));
    sessionStorage.setItem('b_calories', $bCals);
    $('#progress-bar').css('width', `${$bSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals}(kcal) ${$bSetDailyCal}%`);
  } else if($calIntakeNum > 3 && $calIntakeNum <= 6){
    $lCals += parseFloat($itemCals)
    $lSetDailyCal = parseInt(((($bCals + $lCals) / $totalDailyCalories)*100));
    sessionStorage.setItem('l_calories', $lCals);
    $('#progress-bar').css('width', `${$bSetDailyCal + $lSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals + $lCals}(kcal) ${$lSetDailyCal}%`);
  } else if($calIntakeNum > 6 && $calIntakeNum <= 9){
    $dCals += parseFloat($itemCals)
    $dSetDailyCal = parseInt(((($bCals + $lCals + $dCals) / $totalDailyCalories)*100));
    sessionStorage.setItem('d_calories', $dCals);
    $('#progress-bar').css('width', `${$bSetDailyCal + $lSetDailyCal + $dSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals + $lCals + $dCals}(kcal) ${$dSetDailyCal}%`);
  } else if($calIntakeNum > 10){
    $sCals += parseFloat($itemCals)
    $sSetDailyCal = parseInt(((($bCals + $lCals + $dCals + $sCals) / $totalDailyCalories)*100));
    sessionStorage.setItem('s_calories', $sCals);
    $('#progress-bar').css('width', `${$bSetDailyCal + $lSetDailyCal + $dSetDailyCal + $sSetDailyCal}%`);
    $('#total-percent').css({'font-size': 'small'});
    $('#total-percent').text(`${$bCals + $lCals + $dCals + $sCals}(kcal) ${$sSetDailyCal}%`);
  }

let mealsBarChart = document.getElementById('myChart2').getContext('2d');
let myChart2 = new Chart(mealsBarChart, {
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

let ctx3 = document.getElementById('myChart3').getContext('2d');
let myChart3 = new Chart(ctx3, {
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

// console.log(document.querySelector('.macros-chart').getContext('2d'))
// console.log(document.querySelector('.meals-chart').getContext('2d'))

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
            data: [$fats, $carbs, $protein],
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
            data: [$fats, $carbs, $protein],
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

  // console.log(evt)
  // console.log(JSON.stringify($foodSearch))

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
    // console.log(data)
    // console.log(data.hits)
    // console.log(data.hits[0].fields.item_name)

    

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


  $('#progress-bar').css('width', '0%');
  $('#progress-bar').removeClass('green').addClass('red')
  $('#total-percent').text('0%');

  $('#progress-bar2').css('width', '0%');
  $('#progress-bar2').removeClass('green').addClass('yellow')
  $('#goal-percent').text('0%');



document.addEventListener("touchstart", function(){}, true)

$('#icon').on('click', () => {
  $('.sidenav').sidenav();
  $('.sidenav').focusout(() => {
    return document.querySelector('body').style.overflow = "visible";
  }
  )
});


$(document).ready( () => {
  userActivity();
});

function closeModel () {

  let $parsed = [];

  for(let i=0; i < localStorage.length; i++){
  if(localStorage.getItem(`Food Entry: ${i}`) === null) 
  {
          document.querySelector('.bg-modal').style.display = "none";
  return document.querySelector('body').style.overflow = "visible";
  };

  $parsed.push(localStorage.getItem(`Food Entry: ${i}`))
  
  $('ul.daily-meals').append(`<li class="food-entries waves-effect collection-item col s12"><a class="btn waves-effect red" onclick="deleteEntry()">Delete</a><div class="list-text  col s8">${JSON.parse($parsed[i])}</div></li>`)
}

}

document.querySelector('#sign-up').addEventListener("click", (evt) => {
  if(($('#userName').val() !== "") && ($('#userEmail').val() !== "") && ($('#userPassword').val() !== "")){

    let $userName = JSON.stringify($('#userName').val())
    localStorage.setItem('userName', $userName)
    sessionStorage.setItem('userName', $userName)
    $('span.userName')[0].innerText = $userName;
    
    let $userEmail = JSON.stringify($('#userEmail').val());
    localStorage.setItem('email', $userEmail)
    sessionStorage.setItem('email', $userEmail)
    $('span.userEmail')[0].innerText = $userEmail;
    
    let $userPassword = JSON.stringify($('#userPassword').val());
    localStorage.setItem('password', $userPassword)
    sessionStorage.setItem('password', $userPassword)
    
    closeModel();
  } else {
    alert("Please complete the form to access the page...")
  }
});

document.querySelector('#sign-in').addEventListener("click", (evt) => {
  let $userName = JSON.stringify($('#userName').val());
  let $userEmail = JSON.stringify($('#userEmail').val());
  let $userPassword = JSON.stringify($('#userPassword').val());
 
  userHistory($userEmail, $userPassword, $userName);
});


function userHistory(email, password, uName) {
  if(((localStorage.getItem('email') === email) && (localStorage.getItem('password') === password) && (localStorage.getItem('userName') === uName))){


    $('span.userName')[0].innerText = sessionStorage.getItem('userName');
    $('span.userEmail')[0].innerText = sessionStorage.getItem('email');

    let $totlCals = parseInt(localStorage.getItem('total_calories')) 
    $totlCals = $totalDailyCalories;

    sessionStorage.setItem('userName', uName)
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('password', password)

    closeModel();
  }else{
    alert('Sorry, no record found...\nPlease Sign-in with your credentials or Sign-up')
    console.log('Sorry, no record found...\nPlease Sign-in with your credentials or\n Sign-up')
  }
}

function userActivity(email, password, uName) {

  if(((sessionStorage.getItem('email')) !== null) && ((sessionStorage.getItem('password')) !== null)  && ((sessionStorage.getItem('userName')) !== null)){
    $totalDailyCalories = parseInt($('#goal-cal').val()); 
    closeModel()
  }else if(((sessionStorage.getItem('email') == email) && (sessionStorage.getItem('password') == password) && (sessionStorage.getItem('userName') == uName))){
    document.querySelector('.bg-modal').style.display = "flex";
  }else {
    console.log('Sorry, no record found...\n\nPlease sign in')
  }
}