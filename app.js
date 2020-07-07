const CURRENCY_ONE = document.querySelector('#currency-one');
const AMOUNT_ONE = document.querySelector('#amount-one');
const CURRENCY_TWO = document.querySelector('#currency-two');
const AMOUNT_TWO = document.querySelector('#amount-two');
const RATE_ELEMENT = document.querySelector('.rate');
const swap_ELEMENT = document.querySelector('#swap');

//Fetch exchange rates and update the DOM
function calculate() {
    const CURRENCY_ONE_VALUE = CURRENCY_ONE.value;
    const CURRENCY_TWO_VALUE = CURRENCY_TWO.value;
    console.log(CURRENCY_ONE_VALUE, CURRENCY_TWO_VALUE);

    fetch(`https://api.exchangerate-api.com/v4/latest/${CURRENCY_ONE_VALUE}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let rate = data.rates[CURRENCY_TWO_VALUE];
            console.log(rate);
            RATE_ELEMENT.innerHTML = `1 ${CURRENCY_ONE_VALUE} = ${rate} ${CURRENCY_TWO_VALUE}`;
            AMOUNT_TWO.value = (AMOUNT_ONE.value * rate).toFixed(2);
        });
}

//Event listeners 
CURRENCY_ONE.addEventListener('change', calculate);
AMOUNT_ONE.addEventListener('input', calculate);
CURRENCY_TWO.addEventListener('change', calculate);
AMOUNT_TWO.addEventListener('input', calculate);

swap_ELEMENT.addEventListener('click', () => {
    let temp = CURRENCY_ONE.value;
    CURRENCY_ONE.value = CURRENCY_TWO.value;
    CURRENCY_TWO.value = temp;
    calculate();
})



calculate();