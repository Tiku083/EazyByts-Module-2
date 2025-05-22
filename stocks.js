const finnhub = required ('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
const apiKey = 'd0jj5k1r01qjm8s1g2sgd0jj5k1r01qjm8s1g2t0';
const stockSymbol = 'AAPL';
const chartCtx = document.getElementById('price-chart').getContext('2d');
let chart;


function fetchStockData() {
  fetch(`https://api.example.com/stock/${stockSymbol}?apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const price = data.currentPrice;
      updateChart(price);
    })
    .catch(error => console.error('Error fetching stock data:', error));
}

function updateChart(price) {
  if (!chart) {
    chart = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: [], // Add time labels
        datasets: [{
          label: stockSymbol,
          data: [], // Add price data
          borderColor: 'rgb(213, 40, 40)',
          fill: false,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
  
  // Update chart data
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(price);
  chart.update();
}

// Fetch data every 5 seconds
setInterval(fetchStockData, 5000);
