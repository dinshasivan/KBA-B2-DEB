const readline = require('readline');//import readline module
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function askName(){
    rl.question("What is your name?",function(name){
        console.log(`Hello ${name}`);
        askFavoriteLanguage();
    })
}

function askFavoriteLanguage(){
    rl.question("What is your favorite programming language?",function(language){
        console.log(`${language} is a great choice`);
        rl.close;
    })
}

//stsrt prompt
console.log('Welcome to smple interface using readline!');
askName();

