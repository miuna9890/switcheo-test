// Author: Varatharaju Mithuna
document.addEventListener('DOMContentLoaded', function() {
    const input_amount = document.getElementById('input-amount'); // input field
    const output_amount = document.getElementById('output-amount'); // output field
    const swap_button = document.getElementById('swap-button'); // button
    const submit_button = document.getElementById('submit-button'); // button
    const input_currency = document.getElementById('input-currency'); // select field
    const output_currency = document.getElementById('output-currency'); // select field
    const input_options_container = document.querySelector('.input-options-container'); // currency options container
    const output_options_container = document.querySelector('.output-options-container'); // currency options container
    //const output_options = document.querySelectorAll('.output-option'); // currency options
    //const options = document.querySelectorAll('.option'); // currency options
    const input_arrow = document.querySelector('#input-arrow'); // arrow
    const output_arrow = document.querySelector('#output-arrow'); // arrow
    const error_msg = document.getElementById('input-error'); // error message
    // Fetch exchange rates from API
fetch('https://interview.switcheo.com/prices.json')
.then(response => response.json())
.then(data => {
    exchange_rate = data.reduce((acc, item) => 
        { acc[item.currency] = item.price;
        return acc; 
    }, {}); // store exchange rates in object

    const currencies_1 = Object.keys(exchange_rate); // get all currencies

    input_options_container.innerHTML = ''; // clear select fields
    output_options_container.innerHTML = ''; // clear select fields

    currencies_1.forEach(currency => { // add currencies to select fields
        const input_option = document.createElement('li');
        const output_option = document.createElement('li');

        input_option.classList.add('input-option');
        output_option.classList.add('output-option');
        
    input_option.innerHTML = `
        <img src="https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg" alt="${currency}" style="width: 20px; height: 20px; margin-right: 10px;" />
        <p>${currency}</p>
    `;

    output_option.innerHTML = `
        <img src="https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg" alt="${currency}" style="width: 20px; height: 20px; margin-right: 10px;" />
        <p>${currency}</p>
    `;
    
    input_options_container.appendChild(input_option);
    output_options_container.appendChild(output_option);

    });

    input_currency.value = 'BUSD'; // set default input currency
    output_currency.value = 'BUSD'; // set default output currency

    const inputOptions = document.querySelectorAll('.input-option'); // currency options
    const outputOptions = document.querySelectorAll('.output-option'); // currency options

    
    input_currency.onclick = () => { // show currency options on click
        console.log("Input currency clicked!");
        input_currency.style.backgroundColor = '#f0f0f0';
        input_options_container.classList.toggle('active');
        if (input_arrow.classList.contains('fa-arrow-down input')) {
            input_arrow.classList.remove('fa-arrow-down input');
            input_arrow.classList.add('fa-arrow-up input');
        }
    };

    output_currency.onclick = () => { // show currency options on click
        console.log("Output currency clicked!");
        output_currency.style.backgroundColor = '#f0f0f0';
        output_options_container.classList.toggle('active');
        if (output_arrow.classList.contains('fa-arrow-down output')) {
            output_arrow.classList.remove('fa-arrow-down output');
            output_arrow.classList.add('fa-arrow-up output');
        }
    }

    inputOptions.forEach(option => { // select currency on click
        option.addEventListener('click', () => {
            const text = option.querySelector('p').textContent.trim();
            input_currency.placeholder = text;
            input_options_container.classList.remove('active');
            input_arrow.classList.remove('fa-arrow-up');
            input_arrow.classList.add('fa-arrow-down');
            input_currency.value = text;
            convertCurrency_input();
        });
        });

    outputOptions.forEach(option => { // select currency on click
        option.addEventListener('click', () => {
            const text = option.querySelector('p').textContent.trim();
            output_currency.placeholder = text;
            output_options_container.classList.remove('active');
            output_arrow.classList.remove('fa-arrow-up');
            output_arrow.classList.add('fa-arrow-down');
            output_currency.value = text;
            convertCurrency_output();
        });
        });
    });




let exchange_rate; // exchange rates object

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

// Function to submit exchange
function submit_exchange() {
    if (!exchange_rate) return; // return if exchange rates are not yet fetched
    if (!output_amount.value) return; // return if output amount is not yet calculated
    if (output_amount.value <= 0) return; // return if output amount is less than or equal to 0

    alert(`Exchange successful! You have exchanged ${input_amount.value} ${input_currency.value} for ${output_amount.value} ${output_currency.value}.`); // show alert
    input_amount.value = ''; // clear input amount
    output_amount.value = ''; // clear output amount
    input_currency.value = 'BUSD'; // set default input currency
    output_currency.value = 'BUSD'; // set default output currency
    input_currency.placeholder = 'BUSD'; // set default input currency
    output_currency.placeholder = 'BUSD'; // set default output currency
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

submit_button.addEventListener('click', () => { // swap input and output currencies
    submit_exchange();

});

}
);


