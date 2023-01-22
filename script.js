const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

//başlangıç değeri atandı.
let displayValue = '0'

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function(e){
//target ile elemente ulaştık.
    const element = e.target;

// matches metodu ile ulaşmış olduğumuz elementin buton olup olmadığı kontrol edilir.
    if (!element.matches('button')) return;

// operator - decimal - clear hangi özelliği taşıdığının kontrolü yapılır.
    if(element.classList.contains('operator')){
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')){
        inputDecimal();
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')){
        clear();
        updateDisplay();
        return;
    }

    inputNumber(element.value);
    updateDisplay();
});

//Operator ile yapılacak işlemlerim tanımlanması
function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = String(result);
        firstValue = result;
    }

// bir operatore tıklandıktan sonra ikinci bir sayı girilmesi için
    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if(operator === '+'){
        return first + second;
    } else if(operator === '-'){
        return first - second;
    } else if(operator === '/'){
        return first / second;
    } else if(operator === '*'){
        return first * second;
    }

    return second;
}

//Eğer değerimiz sıfıra eşit değilse başka bir number butonuna tıklanmıştır 
//ve sonuna göndermiş olduğumuz number bilgisini ekletiriz.
function inputNumber(num) {
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0'? num: displayValue + num;
    }
}

//decimal çağırıldığı zaman sonuna nokta eklemek
function inputDecimal() {
// eğer önceden nokta eklendiyse bir daha eklemez
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
    
}

//clear bilgisi ile başlangıçta tanımladığımız value bilgisine aktarabiliriz.
function clear() {
    displayValue = '0';
}