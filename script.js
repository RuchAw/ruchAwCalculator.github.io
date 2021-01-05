const buttons_lowerPart = document.querySelectorAll(".grey");
const state = document.querySelectorAll(".fade");
let screen = document.querySelector(".calculs");
let results = document.querySelector(".results");
var child = true;
var touch = null;
var numbers = [];
var operators = [];
var resultat = 0;
var startIndex = 0;
var endIndex = 0;
var numString = "";
var operatorOn = false;
var trash = "";
var ans = 0;


buttons_lowerPart.forEach(button => {
    button.addEventListener('click', function() {
        if (child) touch = this.lastElementChild.textContent;
        else touch = this.firstElementChild.textContent;
        console.log(touch);


        if (touch === "OFF") {
            document.querySelector(".upScreen").classList.add("off");
            document.querySelector(".calculs").classList.add("off");
            document.querySelector(".results").classList.add("off");
        }


        if (touch === "Ans") {
            console.log(ans);
            if (screen.innerHTML == "0") screen.innerHTML = ans;
            else screen.innerHTML += ans;
            touch = '';
        }


        if (touch != "DEL" && touch != "AC") {

            if (!(touch >= 0) && touch != ".") {
                //console.log("i am not a number");
                if (operatorOn) {
                    operators.pop();
                    screen.innerHTML = screen.innerHTML.substr(0, screen.innerHTML.length - 1);
                }

                if (!operatorOn) {
                    endIndex = screen.innerHTML.length;
                    console.log(endIndex);
                    numString = screen.innerHTML.substring(startIndex, endIndex);
                    console.log(numString);
                    startIndex = endIndex + 1;
                    //push into table of numbers
                    numbers.push(parseFloat(numString));
                    console.log(numbers);
                }
                operatorOn = true;

                switch (touch) {
                    case "+":
                        {
                            operators.push("+");
                            touch = "+";
                            break;
                        }

                    case "−":
                        {
                            operators.push("-");
                            touch = "-";
                            break;
                        }

                    case "÷":
                        {
                            operators.push("/");
                            touch = "÷";
                            break;
                        }

                    case "×":
                        {
                            operators.push("*");
                            touch = "*";
                            break;
                        }

                    case "=":
                        {
                            results.innerHTML = doCalculation();
                            ans = parseFloat(results.innerHTML);
                            clrArray();
                            break;
                        }

                }
            } else operatorOn = false;



            if (screen.innerHTML == "0" ||
                screen.innerHTML.includes("=")) screen.innerHTML = touch;
            else screen.innerHTML += touch;


        } else if (touch === "DEL") {
            if (screen.innerHTML.length > 1 && !(screen.innerHTML.includes("="))) {

                trash = screen.innerHTML.split("").pop();
                if (numbers.length < 1) startIndex = 0;
                else {
                    if (!(trash >= 0) && trash != ".") {
                        operators.pop();
                        startIndex -= numbers.pop().toString().length + 1;
                        if (operatorOn) operatorOn = false;
                    } else operatorOn = true;
                }



                screen.innerHTML = screen.innerHTML.substr(0, screen.innerHTML.length - 1);
            } else screen.innerHTML = "0";
        } else if (touch === "AC") {
            screen.innerHTML = "0";
            state[0].classList.remove("active");
            state[1].classList.remove("active");
            results.innerHTML = "0";
            clrArray();

        }


        child = true;
        state[0].classList.remove("active");
        state[1].classList.remove("active");
    })
});




const buttons_upperPart = document.querySelectorAll(".upper .button:not(.black)");

buttons_upperPart.forEach(button => {
    button.addEventListener('click', function() {
        const touch_up = this.firstElementChild.textContent;
        switch (touch_up) {
            case "SHIFT":
                {
                    state[0].classList.add("active");
                    state[1].classList.remove("active");
                    child = false;
                    break;
                }
            case "ALPHA":
                {
                    state[1].classList.add("active");
                    state[0].classList.remove("active");
                    child = false;
                    break;
                }

            case "CLR":
                {
                    state[0].classList.remove("active");
                    state[1].classList.remove("active");
                    screen.innerHTML = "0";
                    results.innerHTML = "0";
                    child = true;
                    clrArray();
                    break;
                }

            case "ON":
                {
                    state[0].classList.remove("active");
                    state[1].classList.remove("active");
                    screen.innerHTML = "0";
                    results.innerHTML = "0";
                    child = true;
                    clrArray();
                    document.querySelector(".upScreen").classList.remove("off");
                    document.querySelector(".calculs").classList.remove("off");
                    document.querySelector(".results").classList.remove("off");

                    break;

                }

        }
    })
});


function doCalculation() {
    let res = 0;

    if (numbers.length < 2 || (numbers.length - 1 != operators.length)) {
        alert("Syntaxe error");
        results.innerHTML = "Syntaxe error";

        return;
    } else {
        res = calculations();
    }

    return res;
}

function clrArray() {
    startIndex = 0;
    while (operators.length) operators.pop();
    while (numbers.length) numbers.pop();
}

function calculations() {

    while (operators.includes("*")) {
        let position = operators.indexOf("*");
        numbers.splice(position, 2, numbers[position] * numbers[position + 1]);
        operators.splice(position, 1);
    }

    while (operators.includes("/")) {
        let position = operators.indexOf("/");
        numbers.splice(position, 2, numbers[position] / numbers[position + 1]);
        operators.splice(position, 1);
    }

    while (operators.includes("+")) {
        let position = operators.indexOf("+");
        numbers.splice(position, 2, numbers[position] + numbers[position + 1]);
        operators.splice(position, 1);
    }


    while (operators.includes("-")) {
        let position = operators.indexOf("-");
        numbers.splice(position, 2, numbers[position] - numbers[position + 1]);
        operators.splice(position, 1);
    }

    return numbers[0];
}