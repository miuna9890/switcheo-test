// Author: Varatharaju Mithuna
document.addEventListener('DOMContentLoaded', function() {
    const input_amount = document.getElementById('input-amount'); // input field
    const input_currency = document.getElementById('input-currency'); // select field
    const output_amount = document.getElementById('output-amount'); // output field
    const output_currency = document.getElementById('output-currency'); // select field
    const swap_button = document.getElementById('swap-button'); // button
    const selected = document.querySelector('.selected'); // selected currency
    const options_container = document.querySelector('.options-container'); // currency options container
    const options = document.querySelectorAll('.option'); // currency options
    const arrow = document.querySelector('#arrow'); // arrow icon
    console.log(selected, options_container, options, arrow);

    selected.onclick = () => { // show currency options on click
        selected.style.backgroundColor = '#f0f0f0';
        options_container.classList.toggle('active');
        if (arrow.classList.contains('fa-arrow-down')) {
            arrow.classList.remove('fa-arrow-down');
            arrow.classList.add('fa-arrow-up');
        }
    };

    // Fetch exchange rates from API
fetch('https://interview.switcheo.com/prices.json')
.then(response => response.json())
.then(data => {
    exchange_rate = data.reduce((acc, item) => 
        { acc[item.currency] = item.price;
        return acc; 
    }, {}); // store exchange rates in object

    const currencies_1 = Object.keys(exchange_rate); // get all currencies

    options_container.innerHTML = ''; // clear select fields

    currencies_1.forEach(currency => { // add currencies to select fields
        const option = document.createElement('li');
        option.classList.add('option');
        option.innerHTML = `
        <img src="https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg" alt="${currency}" style="width: 20px; height: 20px; margin-right: 10px;" />
        <p>${currency}</p>
    `;
    
    options_container.appendChild(option);

    });

    const options = document.querySelectorAll('.option'); // currency options

    options.forEach(option => { // select currency on click
        option.addEventListener('click', () => {
            const text = option.querySelector('p').textContent.trim();
            selected.placeholder = text;
            options_container.classList.remove('active');
            arrow.classList.remove('fa-arrow-up');
            arrow.classList.add('fa-arrow-down');
            input_currency.value = text;
            convertCurrency_input();
        });
        });
    });




let exchange_rate; // exchange rates object

// Fetch exchange rates from API
fetch('https://interview.switcheo.com/prices.json')
    .then(response => response.json())
    .then(data => {
        exchange_rate = data.reduce((acc, item) => 
            { acc[item.currency] = item.price;
            return acc; 
        }, {}); // store exchange rates in object
        console.log("Exchange Rates Loaded:", exchange_rate);

        const currencies = Object.keys(exchange_rate); // get all currencies

        input_currency.innerHTML = ''; // clear select fields
        output_currency.innerHTML = ''; // clear select fields

        currencies.forEach(currency => { // add currencies to select fields
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            input_currency.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            output_currency.appendChild(option2);
        });

        input_currency.value = 'BUSD'; // set default input currency
        output_currency.value = 'USD'; // set default output

        convertCurrency_input(); // convert currency on page load
    });

// Function to convert currency
function convertCurrency_input() {
    if (!exchange_rate) return; // return if exchange rates are not yet fetched
    const amount = parseFloat(input_amount.value) || 0; // get input amount
    const inputCurrency = input_currency.value; // get selected input currency
    const outputCurrency = output_currency.value; // get selected output currency

    // Calculate output amount
    const input_currency_rate = exchange_rate[inputCurrency]; // get exchange rate for input currency
    const output_currency_rate = exchange_rate[outputCurrency]; // get exchange rate for output currency
    const converted_amount = (amount * input_currency_rate) / output_currency_rate; // calculate output amount

    // Display output amount
    output_amount.value = converted_amount.toFixed(3); // display output amount
}

// Function to convert currency
function convertCurrency_output() {
    if (!exchange_rate) return; // return if exchange rates are not yet fetched
    const amount = parseFloat(output_amount.value) || 0; // get input amount
    const inputCurrency = input_currency.value; // get selected input currency
    const outputCurrency = output_currency.value; // get selected output currency

    // Calculate output amount
    const input_currency_rate = exchange_rate[inputCurrency]; // get exchange rate for input currency
    const output_currency_rate = exchange_rate[outputCurrency]; // get exchange rate for output currency
    const converted_amount = (amount * output_currency_rate) / input_currency_rate; // calculate output amount

    // Display output amount
    input_amount.value = converted_amount.toFixed(3); // display output amount
}

// Event listeners
input_amount.addEventListener('input', convertCurrency_input); // convert currency on input change
output_amount.addEventListener('input', convertCurrency_output); // convert currency on output change
input_currency.addEventListener('change', convertCurrency_input); // convert currency on currency change
output_currency.addEventListener('change', convertCurrency_output); // convert currency on currency change
swap_button.addEventListener('click', () => { // swap input and output currencies
    let temp = input_currency.value;
    input_currency.value = output_currency.value;
    output_currency.value = temp;
    convertCurrency_input();
});

});


