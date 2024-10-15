const readline = require('readline');//import readline module
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const library = new Map();
function command(){
    console.log("Welcome to library management system!");
    console.log("Available commands are: Add, Remove, Update, Search, Summary, Exit!");
    rl.question("Enter a command :",function(command){
       
        switch(command.trim().toLowerCase()){
            case 'add':
                addBookPrompt();
                break;
            case 'remove':
                removeBookPrompt();
                break;
            case 'update':
                updateBookPrompt();
                break;
            case 'search':
                searchBookPrompt();
                break;
            case 'summary':
                summaryOfBooks();
                command();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("Enter a valid command!");
                command();
                break
        }
    });
}

function addBookPrompt(){
    rl.question("Enter book id:",function(id){
        rl.question("Enter book title:",function(title){
            rl.question("Enter author name:",function(author){
                addBook(id,title,author);
                command();
            });
        });
    });
}
function addBook(id,title,author){
    if(library.has(id)){
        console.log(` Error Book with id ${id} is already existing!`)
    }
    else{
        library.set(id,{title,author});
        console.log(`Book with id ${id} successfully added! `)
    }
}

function removeBookPrompt(){
   rl.question("Enter id to remove :",function(id){
    removeBook(id);
    command();
   })
}

function removeBook(id){
    if(library.has(id)){
        library.delete(id);
        console.log(`Book with id ${id} removed!`);
    }
    else{
        console.log(`Book with id ${id} not found!`);
    }
}

function searchBookPrompt(){
    rl.question("Enter a search term:",function(searchTerm){
        searchBook(searchTerm);
        command();
    })
}
function searchBook(searchTerm){
    const results =[];
    for(const[id,item] of library){
        if(id.includes(searchTerm) || item.title.includes(searchTerm) || item.author.includes(searchTerm)){
            results.push({id,...item});// spred operator ... 
        }
    }
    if(results.length>0){
        console.log("Search results",results);
    }
    else{
        console.log("No item found!");
    }
       
}

function updateBookPrompt(){
    rl.question("Enter book id:",function(id){
        rl.question("Enter book title",function(newTitle){
            rl.question("Enter authore name:",function(newAuthor){
                updateBook(id,newTitle,newAuthor);
                command();
            })
        })
    })
}

function updateBook(id, newTitle, newAuthor){
    if(library.has(id)){
        const item=library.get(id);
        item.title=newTitle || item.title;
        item.author=newAuthor || item.author;
        library.set(id,item);
        console.log(`Book with id ${id} updated`)
    }
    else{
        console(`Book with id ${id} not found`);
    }
}

function summaryOfBooks(){
    if(library.size>0){
        console.log("Book Summary");
        for(const [id,item] of library){
            console.log(`Id:${id},Book Name : ${item.title}, Author Nmane: ${item.author}`);
        }
     } 
     else{
        console.log("No Item found");
     }
}
command();

//npm init node project initialization