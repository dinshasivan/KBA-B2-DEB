
const QuizData=[
    {question:"What is the capital of France?",
    answers:['a) Berlin','b) Madrid','c) Paris', 'd) Rome'],
    correct:3
    },
    {question:"Which element is represented by the chemical symbol 'O'?",
    answers:['a) Oxygen','b) Osmium','c) Ozone', 'd) Olivine'],
    correct:1
    },
    {question:"Which planet is known as the 'Red Planet'?",
    answers:['a) Venus','b) Mars','c) Jupiter', 'd) Mercury'],
    correct:2
    },
    ]

let currentQuestionindex=0;
let userAnswers=[];
let score=0;
let timer;
let timeLimit=20;
function showQuestion(){
    // document.write("Your Quize Start Now..!");
    document.getElementById('Welcome_quize').style.display='none';
    document.getElementById('Quize_Container').style.display='block';
    // console.log("Start quize");
    loadQuestion();
}
function loadQuestion(){
    clearTimeout(timer);
    const currentQuestion = QuizData[currentQuestionindex];
    document.getElementById('question').textContent = currentQuestion.question;
    const answersContainer = document.getElementById('mcq');
    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const answerItem = document.createElement('li');
        answerItem.innerHTML = `<input type="radio" name="answer" value="${index}" /> ${answer}`;
        answersContainer.appendChild(answerItem);
    });
    startTimer();
}

function startTimer(){
    let timeLeft=timeLimit;
    let timeElement=document.getElementById('timer');
    timeElement.textContent=`Time left: ${timeLeft}s`;
    timer=setInterval(()=>{
        timeLeft--;
        timeElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
    }
    },1000);

}

function nextQuestion(){
    const selectedAnswer=document.querySelector('input[name="answer"]:checked');
    if(selectedAnswer){
        userAnswers[currentQuestionindex]=parseInt(selectedAnswer.value);
    }
    currentQuestionindex++;
    if(currentQuestionindex>=QuizData.length){
        QuizEnd();
    }
    else{
        loadQuestion();
    }
   console.log(userAnswers);
}
function prevQuestion(){
    if(currentQuestionindex>=0){
        currentQuestionindex--;
        loadQuestion();
    }
}

function QuizEnd(){
    document.getElementById('Quize').style.display='none';
    document.getElementById('start_quize').style.display='none';
    document.getElementById('display_score').style.display='block';
    calculateScore();
}

function calculateScore(){
    userAnswers.forEach((answer,index)=>{
        if(answer==QuizData[index].correct){
            score++;
        }
    });
    document.getElementById('score').textContent = `${score} out of ${QuizData.length}`;
}

window.onload =function() {
    
};