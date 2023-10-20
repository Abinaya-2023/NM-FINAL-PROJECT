const startBtn= document.querySelector('.start-btn');
const popupInfo= document.querySelector('.popup-info');
const exitBtn= document.querySelector('.exit-btn');
const main= document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');


startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userAttended = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userAttended = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

}


let questionCount = 0;
let questionNumb = 1;
let userAttended = 0;

const nextBtn = document. querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{
        console.log('Quiz Completed');
        showResultBox();
    }
    
}

const optionList = document.querySelector('.option-list');

function showQuestions(index){
    const questionText= document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option= document.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++ ){
        option[i].setAttribute('onclick', 'optionSelected(this)');
        
    }
}

left = 0;
right = 0;

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let leftAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == leftAnswer){
        answer.classList.add('left');
        left +=1;
    }
    else{
        answer.classList.add('right');
        right+=1;
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent= `${index} of ${questions.length} Questions`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    if (left > right) {
      scoreText.textContent = `You are a left-brained person.`;
    }else if (left==right) {
       scoreText.textContent = `You are a ambidextrous person`;
    } else {
        scoreText.textContent = `You are a right-brained person`;
    };

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = 0;
    if (left > right) {
        progressEndValue = Math.round((left / questions.length) * 100); 
    }else if (right == left) {
        progressEndValue = Math.round((left / questions.length) * 100);
    } else {
        progressEndValue = Math.round((right / questions.length) * 100);
    };
    let speed= 20;

    let progress= setInterval(()=>{
        progressStartValue++;
    
        progressValue.textContent = `${progressEndValue}%`;
        circularProgress.style.background = `conic-gradient(#7551c2 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        if (progressStartValue==progressEndValue){
            clearInterval(progress);
        }
    }, speed);

}
