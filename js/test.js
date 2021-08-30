productRegisteredLocalStorage = JSON.parse(localStorage.getItem("product"));
                     
productRegisteredLocalStorage.forEach(function (item){
    
    if (valuesProduct.name === item.name){
        
        item.quantity = valuesProduct.quantity;
        item.price = valuesProduct.price;
        

    } else{
       
        productRegisteredLocalStorage.push(valuesProduct);
        
    }
});

localStorage.setItem("product", JSON.stringify(productRegisteredLocalStorage));
alertConfirmation()

items.filter((item) => items.indexOf(item) !== valuesProduct);