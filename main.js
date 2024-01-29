const startBtn = document.getElementById('start-section')
const instructionBox = document.getElementById('instruction-box')
const questionBox = document.getElementById('question-box')
const resultBox = document.getElementById('result-box')
const options = document.querySelector(".options")
const timeCount = document.getElementById("time");
const timeLine = document.querySelector(".time_line");
const score = document.getElementById("score")
const timeText = document.querySelector('.time-txt')
const resulticonBox = document.querySelector('.result-icon')

const exitBtn = document.getElementById('exit')
const continueBtn = document.getElementById('continue')
const nxtQstBtn = document.getElementById('nxt-qstBtn')
const restartBtn = document.querySelector(".restart")
const quitBtn = document.querySelector(".quit")

let tickIcon = '<i class="fa-regular fa-circle-check"></i>'
let wrongIcon = '<i class="fa-regular fa-circle-xmark"></i>'

startBtn.addEventListener('click', ()=>{
    startBtn.className = "disable"
    instructionBox.className = "active"
})

exitBtn.addEventListener('click', ()=>{
    startBtn.className = ""
    instructionBox.className = ""
})

continueBtn.addEventListener('click', ()=>{
    questionBox.className = "active"
    instructionBox.className = ""
    showQuestions(0)
    startTimeCounter(15)
    startTimeLine(0)
})

let que_count = 0
let counter ;
let counterLine ;
let timeVal = 15;
let widthVal =0
let userScore = 0

restartBtn.addEventListener('click',()=>{
    questionBox.classList.add('active')
    resultBox.classList.remove('active')
     que_count = 0
     timeVal = 15;
     widthVal =0
     userScore = 0
    showQuestions(que_count)
    clearInterval(counter)
    startTimeCounter(timeVal)
    clearInterval(counterLine)
    startTimeLine(widthVal)
    nxtQstBtn.style.display ="none"
    timeText.textContent ="Time Left"
})



quitBtn.addEventListener('click', ()=>{
    window.location.reload()
})

nxtQstBtn.addEventListener('click', ()=>{
    if(que_count < questions.length - 1){
        que_count++
        console.log("the que count",que_count)
        showQuestions(que_count)
        clearInterval(counter)
        startTimeCounter(timeVal)
        clearInterval(counterLine)
        startTimeLine(widthVal)
        nxtQstBtn.style.display ="none"
        timeText.textContent ="Time Left"
    }else{
        clearInterval(counter)
        clearInterval(counterLine)
        console.log("questions completed")
        showResultBox()
    }
})

const showQuestions = (index) => {
    const questionText = document.querySelector(".qstn");
    const qstnFooter = document.querySelector(".qstn-footer p");

    questionText.innerHTML = `<span>${questions[index].numb}.${questions[index].question}</span>`;
    options.innerHTML = `
        <div class="option">${questions[index].options[0]}<span></span></div>
        <div class="option">${questions[index].options[1]}<span></span></div>
        <div class="option">${questions[index].options[2]}<span></span></div>
        <div class="option">${questions[index].options[3]}<span></span></div>
    `;

    qstnFooter.innerHTML = `<span>${questions[index].numb}</span> of 5 Questions`;

    const option = document.querySelectorAll('.option');

    for (let i = 0; i < option.length; i++) { 
        option[i].setAttribute('onclick', "optionSelected(this)");
    }
};


const optionSelected =(answer)=>{
    clearInterval(counter)
    clearInterval(counterLine)
    
    let userAnswer = answer.textContent
   let correctAnswer = questions[que_count].answer
    let allOption = options.children.length

    if(userAnswer === correctAnswer){
        userScore += 1
        console.log("correct")
        answer.classList.add("correct");
        answer.insertAdjacentHTML('beforeend', tickIcon);

    }else{
        console.log("wrong")
        answer.classList.add("wrong");
        answer.insertAdjacentHTML('beforeend', wrongIcon);


        //select correct answer automatically when user seected wrong answer
        for(let i = 0; i < allOption; i++){
            if(options.children[i].textContent === correctAnswer){
                options.children[i].setAttribute('class', "option correct")
                options.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
         }
    }

    //diable all options hile user selected one 
   for (let i = 0; i < allOption; i++) {
    options.children[i].setAttribute('disabled', true);
}

   nxtQstBtn.style.display ="block"
}

const showResultBox = () => {
    startBtn.className = "disable";
    instructionBox.className = "";
    questionBox.className = "";
    resultBox.classList.add("active");

    const scoretagLine = document.getElementById('score-text');
    const resulticonBox = document.querySelector('.result-icon');

    if (userScore === 5) {
        let icon = `<i class="fa-solid fa-crown"></i>`;
        resulticonBox.innerHTML = icon;
        let scoreTag = `<span>Awesome!, you got <span id="score">${userScore}</span> out of ${questions.length}</span>`;
        scoretagLine.innerHTML = scoreTag;
    }
    if (userScore > 2 && userScore < 5) {
        let icon = `<i class="fa-solid fa-thumbs-up"></i>`;
        resulticonBox.innerHTML = icon;
        let scoreTag = `<span>and congrats!, you got <span id="score">${userScore}</span> out of ${questions.length}</span>`;
        scoretagLine.innerHTML = scoreTag;
    }
    if (userScore > 0 && userScore < 3) {
        let icon = `<i class="fa-solid fa-face-smile"></i>`;
        resulticonBox.innerHTML = icon;
        let scoreTag = `<span>and nice, you got <span id="score">${userScore}</span> out of ${questions.length}</span>`;
        scoretagLine.innerHTML = scoreTag;
    }
    if(userScore === 0) {
        let icon = `<i class="fa-solid fa-thumbs-down"></i>`;
        resulticonBox.innerHTML = icon;
        let scoreTag = `<span>and Sorry you got only <span id="score">${userScore}</span> out of ${questions.length}</span> `;
        scoretagLine.innerHTML = scoreTag;
    }
};




const startTimeCounter = (time) => {
    let remainingTime = time;

    console.log(time)
    function timer() {
        timeCount.textContent = remainingTime;
        remainingTime--;
        

          if(remainingTime < 9){
            let addZero = timeCount.textContent
            timeCount.textContent =`0${addZero}` 
          }

        if (remainingTime < 0) {
            clearInterval(counter);
            timeCount.textContent ="00"
            timeText.textContent = "Time off"

            let correctAnswer = questions[que_count].answer
            let allOption = options.children.length

            for(let i = 0; i < allOption; i++){
                if(options.children[i].textContent === correctAnswer){
                    options.children[i].setAttribute('class', "option correct")
                    options.children[i].insertAdjacentHTML('beforeend', tickIcon);
                }
             }
             for (let i = 0; i < allOption; i++) {
                options.children[i].setAttribute('disabled', true);
            }
        }
    }

    timer();

    counter = setInterval(timer, 1000);

};

const startTimeLine =(time)=>{
   counterLine = setInterval(timer, 23)
   function timer(){
    time +=1;
    timeLine.style.width = time + 'px';
    if(time > 500){
        timeLine.style.backgroundColor = "red"
    }
    if(time < 500){
        timeLine.style.backgroundColor = "rgb(0, 106, 205)"
    }
    if(time > 650){
        clearInterval(counterLine)
        nxtQstBtn.style.display ="block"
    }
   }
}

