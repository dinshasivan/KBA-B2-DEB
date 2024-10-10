const { createDiffieHellmanGroup } = require('crypto');
const { update } = require('lodash');
const readline = require('readline');//import readline module
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const inventory = new Map();
function askCommand(){
    console.log("Welcome to inventory management system!");
    console.log("Availbale commands: add, remove, search, update, summary, exit");
    rl.question("\Enter a command:",function(command){//call back function

        switch(command.trim().toLowerCase()){
            case 'add':
                addItemPrompt();
                break;
            case 'remove':
                removeItemPrompt();
                break;
            case 'search':
                searchItemPrompt();
                break;
            case 'update':
                updateItemPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand();//recursive
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Invalid command! enter a valid choice!');
                askCommand();
                break;
        }
    });
}

function addItemPrompt(){
    rl.question("Enter an item id:",function(id){
        rl.question("Enter an item name:",function(name){
            rl.question("Enter item category:",function(category){
                rl.question("Enter item quantity:",function(quantity){
                    addItems(id,name,category,parseInt(quantity));
                    askCommand();
                });
            });
        });
    });
}
function addItems(id,name,category,quantity){
    if(inventory.has(id)){
        console.log(`Error item with id ${id} already exist`)
    }
    else{
        inventory.set(id,{name,category,quantity});
        console.log(`Item with id ${id} added to invetory`);
    }
    
}

function removeItemPrompt(){
    rl.question("Enter an id to remove:",function(id){
        removeItem(id);
        askCommand();
    })
}
function removeItem(id){
    if(inventory.has(id)){
        inventory.delete(id);
        console.log(`Item with id ${id} removed`);
    }
    else{
        console.log(`Error! No item with id ${id} found`);
    }
}
function searchItemPrompt(){
    rl.question("Enter a search term:",function(searchTerm){
        searchItem(searchTerm);
        askCommand();
    })
}
function searchItem(searchTerm){
    const results =[];
    for(const[id,item] of inventory){
        if(id.includes(searchTerm) || item.name.includes(searchTerm) || item.category.includes(searchTerm) || item.quantity.includes(searchTerm)){
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
function  updateItemPrompt(){
    rl.question("Enter an item id:",function(id){
        rl.question("Enter an item name:",function(newName){
            rl.question("Enter item category:",function(newCategory){
                rl.question("Enter item quantity:",function(newQuantity){
                    updateItem(id,newName,newCategory,newQuantity ? parseInt(newQuantity) : undefined);
                    askCommand();
                });
            });
        });
    });
}
function updateItem(id,newName,newCategory,newQuantity){
    if(inventory.has(id)){
        const item=inventory.get(id);
        item.name=newName || item.name;
        item.category=newCategory || item.category;
        item.quantity=newQuantity !== undefined ? newQuantity : item.quantity;
        inventory.set(id,item);
        console.log(`Items with id ${id} updated `)
    }
    else{
        console.log(`Item with ${id} not found`);
    }
}
function  printSummary(){
    if(inventory.size>0){
        console.log("Inventory Summary");
        for(const [id,item] of inventory){
            console.log(`Id:${id}, Name : ${item.name}, Category : ${item.category}, Quantity : ${item.quantity}`);
        }
     } 
     else{
        console.log("No Item found");
     }
        
}
askCommand();