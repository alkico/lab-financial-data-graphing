const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
let startInputValue;
let endInputValue;
const chooseCurrency = document.getElementById("currency");
let selectedCurrency;
let minValue = document.getElementById("minVal");
let maxValue = document.getElementById("maxVal");
let minimum;
let maximum;

startDate.onchange = (event) => {
    startInputValue = event.target.value;
    bitcoinTracker();
};

endDate.onchange = (event) => {
    endInputValue = event.target.value;
    bitcoinTracker();
};

chooseCurrency.onchange = (event) => {
    selectedCurrency = event.target.value;
    updateCurrency();
}

function bitcoinTracker() {
    if (!startInputValue || !endInputValue) {
      return;
    }
   updateChart();
}

function updateChart() {
    axios.get(apiUrl + `?start=${startInputValue}&end=${endInputValue}`)
    .then((res) => {
       const labels = Object.keys(res.data.bpi);
       const data = Object.values(res.data.bpi);
       printTheChart(labels, data);
    })
    .catch(err => {
        console.log("Error while getting the data: ", err);
      });
};

function updateCurrency() {
    axios.get(apiUrl + '?currency=' + selectedCurrency)
    .then((res) => {
        const labels = Object.keys(res.data.bpi);
        const data = Object.values(res.data.bpi);
        printTheChart(labels, data);
    })
    .catch(err => {
        console.log("Error while getting the data: ", err);
      });
}

axios
.get(apiUrl)
.then(responseFromAPI => {
//   console.log("The response from API: ", responseFromAPI);
  const labels = Object.keys(responseFromAPI.data.bpi);
  const data = Object.values(responseFromAPI.data.bpi);
  printTheChart(labels, data);
})
.catch(err => {
  console.log("Error while getting the data: ", err);
});

function printTheChart(labels, data) {
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Bitcoin Historical Prices",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data
            }]
        },
    });

    updateMinMaxVals(data);
}


function updateMinMaxVals (data) {

minimum = Math.min(...data);
maximum = Math.max(...data);
minValue.innerHTML = minimum;
maxValue.innerHTML = maximum;

}