let dropdowns = document.querySelectorAll(".dropdown select")
let btn = document.querySelector('#exchange-button')
// let baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
let baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let fromCurr = document.querySelector('.from select');
let toCurr = document.querySelector('.to select');
let msg = document.querySelector('.msg');
let form = document.querySelector('form');

dropdowns.forEach(select => {
    for (let currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === 'USD') {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === 'PKR') {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evnt) => {
        updateFlag(evnt.target);
    })
});

const updateFlag = (element) => {
    console.log(element);
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


const updateExchangeRate = async () => {
    let amount = document.querySelector('#input-amount');
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amount.value = "1";
        amountVal = 1;

    }
    console.log(amountVal);
    console.log(fromCurr.value, toCurr.value);
    // let url = `${baseURL}/${toCurr.value.toLowerCase()}/${fromCurr.value.toLowerCase()}.json`;
    let url = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    // console.log(response);
    let data = await response.json();
    console.log(data);
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    let decimalAmt = rate * amountVal;
    let finalAmt = decimalAmt.toFixed(2);
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

form.addEventListener('submit', async (evt) => {
    evt.preventDefault(); // Prevent form submission (which causes page refresh)
    updateExchangeRate(); // Call the conversion function
});

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    updateExchangeRate();


});


window.addEventListener('load', () => {
    updateExchangeRate();
})
