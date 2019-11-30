

// Check API
// https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=APPID&appKey=APPKEY

// const $creds = {
//   "appId": "50fa89ed",
//   "appKey": "2b12b9151d4e815121991d77947f2f5f",
// }

// const $query = {
//   "query": 'taco bell'
// }

// $.ajax({
//   url:`https://api.nutritionix.com/v1_1/search/${$query.query}?&appId=${$creds.appId}&appKey=${$creds.appKey}`,
//   success: (data) => {
//       console.log(data);
//   },
//   error: (error) => {
//         console.log('bad request: ', error);
//     }
//   });

  $('#progress-bar').css('width', '20%');
  $('#progress-bar').removeClass('green').addClass('red')
  $('#total-percent').text('20%');

  $('#progress-bar2').css('width', '40%');
  $('#progress-bar2').removeClass('green').addClass('yellow')
  $('#goal-percent').text('40%');



  document.addEventListener("touchstart", function(){}, true)

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
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


var ctx = document.getElementById('myChart2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Breakfest', 'Lunch', 'Dinner', 'Snacks'],
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

var ctx = document.getElementById('myChart3').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Breakfest', 'Lunch', 'Dinner', 'Snacks'],
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

var ctx = document.getElementById('myChart4').getContext('2d');
var myChart = new Chart(ctx, {
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

for(let i=1; i <= $countItems; i++){
$('ul.daily-meals').append(`<li class="waves-effect col s12"><a href="#" class="btn waves-effect">List Item 2</a><div class="list-text  col s8">Galata Loves Bodeshi ${i} times more than she does!!. Galata Loves Bodeshi ${i} times more than she does!!. Galata Loves Bodeshi ${i} times more than she does!!. Galata Loves Bodeshi ${i} times more than she does!!.</div></li>`)
}

for(let i=1; i <= $countItems; i++){
  $('#search-list').append(`<li class="waves-effect col s12"><a href="#" class="btn waves-effect">Search Food Item ${i}</a><div class="list-text  col s8">Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! Hello this is a Galata food item ${i} text! </div></li>`)
  }