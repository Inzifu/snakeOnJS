

let field = document.createElement("div")
document.body.appendChild(field)
field.classList.add("field")

for(let i = 0; i < 100; i++) {
    let point = document.createElement("div");
    field.appendChild(point);
    point.classList.add("field_point")
}

let fieldPoint = document.getElementsByClassName("field_point");
let x = 1, y = 10;

for( let i = 0; i < fieldPoint.length; i++){
    if(x > 10){
        x = 1;
        y--
    }
    // Не разобрался как в циклах к элементу прописать dataset
    fieldPoint[i].setAttribute("posX", x);
    fieldPoint[i].setAttribute("posY", y);
    x++;
}

let snake = [document.querySelector('[posX = "5"][posY = "6"]'),document.querySelector('[posX = "5"][posY = "5"]')]



snake[0].classList.add("snake_head");
snake[1].classList.add("snake_body");

// Генерация еды в самом начале
function generateFood(){ 
    let posX = Math.round(Math.random() * (10 - 1) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return[posX, posY]
}

let food;
function displayFood(){
    let generatedFood = generateFood();
    food = document.querySelector(`[posX = "${generatedFood[0]}"][posY = "${generatedFood[1]}"]`)

    while(food.classList.contains("snake_body")){
        let generatedFood = generateFood();
        food = document.querySelector(`[posX = "${generatedFood[0]}"][posY = "${generatedFood[1]}"]`)
    }
   
    food.classList.add("food")
}   
displayFood()

let direction = "up";
let steps = false;
let record = 0;
let bestRecord = 0;
let recordNow = document.getElementsByClassName("record_now-number");
let btn = document.getElementById("btn");
let recordsBestBlock = document.getElementsByClassName("records_best");
let recordBestNumber = document.getElementsByClassName("record_best-number");

document.addEventListener("DOMContentLoaded", () => {
    storageItem = localStorage.getItem('best');
    if (storageItem) {
        recordsBestBlock[0].classList.add("records_best_display");  
        recordBestNumber[0].innerHTML = `${localStorage.getItem("best")}`   
    }
  });
function move(){  
    let currentHeadCords = [snake[0].getAttribute("posX"),snake[0].getAttribute("posY")];
    snake[0].classList.remove("snake_head");
    snake[snake.length - 1].classList.remove("snake_body");
    snake.pop();
    
    
    if(direction == "up"){
        if(currentHeadCords[1] < 10){
            snake.unshift(document.querySelector(`[posX = "${currentHeadCords[0]}"][posY = "${(+currentHeadCords[1] + 1)}"]`));
        }else {
            snake.unshift(document.querySelector(`[posX = "${currentHeadCords[0]}"][posY = "1"]`));
        }
    
        snake[0].classList.add("snake_head")
        for(let i = 1; i < snake.length;i++){
            snake[i].classList.add("snake_body")
        }
    } else if(direction == "down"){
        if(currentHeadCords[1] > 1){
            snake.unshift(document.querySelector(`[posX = "${currentHeadCords[0]}"][posY = "${(+currentHeadCords[1] - 1)}"]`));
        }else {
            snake.unshift(document.querySelector(`[posX = "${currentHeadCords[0]}"][posY = "10"]`));
        }
    
        snake[0].classList.add("snake_head")
        for(let i = 1; i < snake.length;i++){
            snake[i].classList.add("snake_body")
        }
    } else if(direction == "right"){
        if(currentHeadCords[0] < 10){
            snake.unshift(document.querySelector(`[posX = "${(+currentHeadCords[0] + 1)}"][posY = "${currentHeadCords[1]}"]`));
        }else {
            snake.unshift(document.querySelector(`[posX = "1"][posY = "${currentHeadCords[1]}"]`));
        }
    
        snake[0].classList.add("snake_head")
        for(let i = 1; i < snake.length;i++){
            snake[i].classList.add("snake_body")
        }
    }else if(direction == "left"){
        if(currentHeadCords[0] > 1){
            snake.unshift(document.querySelector(`[posX = "${(+currentHeadCords[0] - 1)}"][posY = "${currentHeadCords[1]}"]`));
        }else {
            snake.unshift(document.querySelector(`[posX = "10"][posY = "${currentHeadCords[1]}"]`));
        }
    
        snake[0].classList.add("snake_head")
        for(let i = 1; i < snake.length;i++){
            snake[i].classList.add("snake_body")
        }
    }
    // ПОЕДАНИЕ ЯБЛОКА -----

    if(snake[0].getAttribute("posX") == food.getAttribute("posX") && snake[0].getAttribute("posY") == food.getAttribute("posY")){
        food.classList.remove("food");
        let lastCordX = snake[snake.length - 1].getAttribute("posX");
        let lastCordY = snake[snake.length - 1].getAttribute("posY");
        snake.push(document.querySelector(`[posX = "${lastCordX}"][posY = "${lastCordY}"]`))
        displayFood();
        
        record++;
        recordNow[0].innerHTML = `${record}`
    }
    
    // конец игры

    if(snake[0].classList.contains("snake_body")){
        if(record > localStorage.getItem("best")){
            localStorage.setItem('best', record);
        }else{
            recordBestNumber[0].innerHTML = `${localStorage.getItem("best")}`
        }
        clearInterval(interval);
        food.classList.remove("food");
        food.classList.add("food_dead");
        for(let i = 1; i < snake.length; i++){
            snake[i].classList.remove("snake_body");
            snake[i].classList.add("snake_dead")
        }
        snake[0].classList.add("snake_head_dead");
        btn.classList.remove("btn_hidden");
        btn.classList.add("btn")
    }
   
   
    steps = true;
}
window.addEventListener('keydown',function(e){
    if(steps == true){
        if(e.keyCode == 37 && direction!= "right"){
            direction = "left";
            steps = false;
        }
        if(e.keyCode == 38 && direction!= "down" ){
            direction = "up";
            steps = false;
        }
        if(e.keyCode == 39 && direction!= "left"){
            direction = "right";
            steps = false;
        }
        if(e.keyCode == 40 && direction!= "up"){
            direction = "down";
            steps = false;
        }
    }
})

let interval = setInterval(move,200); // 500мс совсем медленно неиграбельно
