const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const productcart = new Map();
function askCommand(){
    console.log("Welcome to Product Order Cart");
    console.log("Available commands are:");
    console.log("ADD , REMOVE, SEARCH, UPDATE, SUMMARY, EXIT!");

    rl.question("Enter a command:",function(command){
        
        switch(command.trim().toLowerCase()){
            case 'add':
                addProductPrompt();
                break;
            case 'remove':
                removeProductPrompt();
                break;
            case 'search':
                searchProduct();
                break;
            case 'update':
                updateProductPrompt();
                break;
            case 'summary':
                printProductSummary();
                askCommand();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("Enter a valid command!");
                askCommand();
                break;
        }
    })
}

function addProductPrompt(){
    rl.question("Enter product id:",function(id){
        rl.question("Enter product name:",function(productName){
            rl.question("Enter quatity:",function(quatity){
                rl.question("Enter your name:",function(customerName){
                    addProduct(id,productName,quatity,customerName);
                    askCommand();
                })
            })
        })
    })
}

function addProduct(id, productName,quatity,customerName){
    if(productcart.has(id)){
        console.log(`Item with id ${id} already exsting!`);
    }
    else{
        productcart.set(id,{productName,quatity,customerName});
        console.log(`Item with id ${id} Added to cart!`);
    }
}

function removeProductPrompt(){
    rl.question("Enter id to remove an item:",function(id){
        removeItem(id);
        askCommand();
    })
}
function removeItem(id){
    if(productcart.has(id)){
        productcart.delete(id);
        console.log(`Item with id ${id} successfully removed`);
    }
    else{
        console.log(`Item with id ${id} not fount at cart!`);
    }
}


function  searchProduct(){
    rl.question("Enter search term you want to search:",function(searchTerm){
        seachItem(searchTerm);
        askCommand();
    })
}
function seachItem(searchTerm){
    const searchResult =[];
    for(const[id,item] of productcart){
        if(id.includes(searchTerm) || item.productName.includes(searchTerm) || item.quatity.includes(searchTerm) || item.customerName.includes(searchTerm)){
            searchResult.push(id,item.productName,item.quatity,item.customerName);
        }
    if(searchResult.length>0){
        console.log("Search item found:",searchResult);
    }
    else{
        console.log("Item not found!");
    }
    }
}
function updateProductPrompt(){
    rl.question("Enter product id:",function(id){
        rl.question("Enter product name:",function(newProductName){
            rl.question("Enter quatity:",function(newQuatity ){
                rl.question("Enter your name:",function(newCustomerName){
                    updateProduct(id,newProductName,newQuatity,newCustomerName);
                    askCommand();
                })
            })
        })
    })
}

function updateProduct(id,newProductName,newQuatity,newCustomerName){
    if(productcart.has(id)){
        const item=productcart.get(id);
        item.productName=newProductName || item.productName;
        item.quatity=newQuatity || item.quatity;
        item.customerName=newCustomerName || item.customerName;
        productcart.set(id,item);
        console.log(`Item with id ${id} Updated !`);
    }
    else{
        console.log(` Error! Item with id ${id} not found!`)
    }
}

function printProductSummary(){
    if(productcart.size>0){
        console.log("PRODUCT SUMMARY!");
        for(const[id,item] of productcart){
            console.log(`ID:${id}, Product Name:${item.productName}, Quantity:${item.quatity}, Customer Name:${item.customerName}`);
        }
    }
    else{
        console.log("Item not found!")
    }
}
askCommand();