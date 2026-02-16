let car;
function tickUp() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerHTML);
    count++;
    counter.innerHTML = count;
}

function tickDown() {
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerHTML);
    count--;
    counter.innerHTML = count;
}

function runForLoop(){
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerHTML);
    var result = [];
    if(count < 0){
        alert("Please enter a non-negative number");
        return;
    }
    for(var i = 0; i <= count; i++){
        result.push(i);
    }
    var resultSpan = document.getElementById("forLoopResult");
    resultSpan.innerHTML = result.join(", ");
}

function showOddNumbers(){
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerHTML);
    var result = [];
    if(count < 0){
        alert("Please enter a non-negative number");
        return;
    }
    for(var i = 0; i <= count; i++){
        if(i % 2 !== 0){
            result.push(i);
        }
    }
    var resultSpan = document.getElementById("oddNumberResult");
    resultSpan.innerHTML = result.join(", ");
}

function addMultiplesToArray(){
    var counter = document.getElementById("counter");
    var count = parseInt(counter.innerHTML);
    var result = [];
     if(count < 0){
        alert("Please enter a non-negative number");
        return;
    }
    for(var i = count; i >= 0; i--){
        if(i % 5 == 0 && i !== 0){
            result.push(i);
        }
    }
    console.log(result);
}
function printCarObject(){
    document.getElementById("carType").value = car.cType;
    document.getElementById("carMPG").value = car.cMPG;
    document.getElementById("carColor").value = car.cColor;
    
}
function loadCar(carNum){
    if(carNum === 1){
        car = carObject1;
        return carObject1;
    }
    if(carNum === 2){
        car = carObject2;
        return carObject2;
    }
    if(carNum === 3){
        car = carObject3;
        return carObject3;
    }
    car = null;
    return null;
}

function changeColor(color){
    var paragraph = document.getElementById("styleParagraph");
    if(color === 1){
        paragraph.style.color = "red";
        return;
    }
    if(color === 2){
        paragraph.style.color = "green";
        return;
    }
    if(color === 3){
        paragraph.style.color = "blue";
        return;
    }
    return null;
}

