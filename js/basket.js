// Récupération dans une variable des produits enregistré dans le local storage
        
let productRegisteredLocalStorage = JSON.parse(localStorage.getItem("product"));

// Barre de désignation des éléments du panier (Structure HTML)
 
function basketBarPresentation(){
    
    const presentationBasket = document.getElementById("presentation-basket");
    
    let divPresentationBasket = [];
    
    divPresentationBasket = divPresentationBasket + 
    `<div class="row mx-auto mb-2 text-center bg-colortheme text-white rounded">
        <span class="col-3">Teddie</span>
        <span class="col-3">Nom</span>
        <span class="col-3">Quantité</span>
        <span class="col-3">Prix</span>
    </div>`;
    
    presentationBasket.innerHTML = divPresentationBasket;
};

// Affichage des données du local storage sur la page et gestion du panier vide

const basketView = document.getElementById("basket-products");

function basketViewElements(){
 
    if (productRegisteredLocalStorage === null) {  // Si le panier est vide 
        
        let emptyBasket = document.createElement("p");
        basketView.appendChild(emptyBasket)
        .classList.add("empty-basket");
        emptyBasket.innerHTML = "Votre panier est vide";
        document.getElementsByClassName("btn-remove-basket").display = "none";

    } else {  // Si il y a des produits dans le panier 
        
        let structureBasket = [];
        
        for (i = 0; i < productRegisteredLocalStorage.length; i++){
        
        structureBasket = structureBasket + 
        
            `<article class="row text-center">  
                <img class="col-3" src="${productRegisteredLocalStorage[i].image}"alt="teddie">
                <p class="col-3 my-auto"<p>${productRegisteredLocalStorage[i].name}</p>
                <p class="col-3 my-auto border-bottom">${productRegisteredLocalStorage[i].quantity}</p>
                <p class="col-3 my-auto">${productRegisteredLocalStorage[i].price}€</p>   
            </article>
            <div class="row mb-3 text-center justify-content-center">
                <button class="btn-remove-product col-6 col-sm-3 border bg-colortheme text-white rounded">Supprimer article</button>
            </div>`;
        }
        
        basketView.innerHTML = structureBasket;
        
    };
};

// Ajout des boutons supprimer l'article

function deleteProductAlone(){

    let buttonRemoveProduct = document.getElementsByClassName("btn-remove-product");

    for (let j = 0; j < buttonRemoveProduct.length ; j++){
            
        buttonRemoveProduct[j].addEventListener('click',function(){
        
        let idSelectDelete = productRegisteredLocalStorage[j].id;
        // La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau (pour renvoyer les produits qu'il reste dans le local storage sans le produit supprimer)
        productRegisteredLocalStorage = productRegisteredLocalStorage.filter((el) => el.id !== idSelectDelete);
        localStorage.setItem("product", JSON.stringify(productRegisteredLocalStorage));
        window.location.href = "basket.html";
        
        });
    };
};

/* Div qui regroupe le prix total du panier + le bouton supprimer le panier */

const divTotalPrice = document.createElement("div");
    basketView.appendChild(divTotalPrice)
    .classList.add("div-total-basket");

// Calcul du prix total du panier

let totalPriceForConfirmation = []; // !! tableau qui va permettre d'enregistrer le prix total afin de l'afficher sur la page confirmation de commande

function calculTotalBasket(){
    
    tabTotalPrice = []; 
    
    for (k = 0; k < productRegisteredLocalStorage.length; k++) {
            
        let pricesProductBasket = productRegisteredLocalStorage[k].price;
        tabTotalPrice.push(pricesProductBasket);
    }

    // Méthode reduce permet de faire l'addition des prix dans le panier pour en faire le prix total (REDUCE permet de réduire a une seul valeur)
    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    let calculTotalPrice = tabTotalPrice.reduce(reducer,0);

    totalPriceForConfirmation.push(calculTotalPrice) // !! push dans le tableau ligne 96 pour affichage du prix total dans la page de confiramtion
    
    // Affichage du prix total dans le HTML
    
    let totalPrice = document.createElement("p");
    divTotalPrice.appendChild(totalPrice)
    .classList.add("total-price-basket");
    totalPrice.innerHTML = `Prix total : ${calculTotalPrice} €`;
};
    
// Ajout du bouton supprimer le panier (tous les produits)

function deleteAllBasket(){
    
    let buttonRemoveBasket = document.createElement("button");
        divTotalPrice.appendChild(buttonRemoveBasket)
        .classList.add("btn-remove-basket");
        buttonRemoveBasket.innerHTML = "Supprimer panier";
        
        buttonRemoveBasket.addEventListener('click',function(){
        localStorage.removeItem("product");
        window.location.href = "basket.html"
        });
};

/* Partie Formulaire */

// Affichage du formulaire et validation données formulaire (Bootstrap & pattern regex HTML)

let sectionFormulaireClient = document.getElementById("formulaire");

    let formulaireClient = [];

    formulaireClient = formulaireClient + 
    
    `<h2 class="container mt-3 pt-2 text-center border-top border-dark">Formulaire de commande</h2>
    <form class="container needs-validation" novalidate>
        <div class="form-group">
            <div class="form-row">
                <input type="text" id="inputFirstName" class="form-control" value="" placeholder="Votre prénom" pattern="^[^ -] ?[A-Za-z -]+$" required>
                <div class="valid-feedback">Correct !</div>
                <div class="invalid-feedback">Saisie Incorrect - Veuillez saisir uniquement des lettres pour votre prénom (tiret accepté pour les prénoms composés).</div>
            </div>
            <div class="form-row mt-2">
                <input type="text" id="inputLastName" class="form-control" value="" placeholder="Votre nom" pattern="^[^ -] ?[A-Za-z -]+$" required>
                <div class="valid-feedback">Correct !</div>
                <div class="invalid-feedback">Saisie Incorrect - Veuillez saisir uniquement des lettres pour votre nom (tiret accepté pour les noms composés).</div>
            </div>
            <div class="form-row mt-2">
                <input type="text" id="inputAddress" class="form-control" value="" placeholder="Adresse" pattern="^[0-9]{1,4} ?[ -] ?[A-Za-z -]+$" required>
                <div class="valid-feedback">Correct !</div>
                <div class="invalid-feedback">Saisie Incorrect - Veuillez saisir uniquement des lettres et des chiffres pour votre adresse (exemple : 113 Avenue de Fontainebleau).</div>
            </div>
            <div class="form-row mt-2">
                <input type="text" id="inputPostal" class="form-control" value="" placeholder="Code postal" pattern="^(^[A-Z]+[A-Z]?\-)?[0-9]{1,2} ?[0-9]{3}$" required>
                <div class="valid-feedback">Correct !</div>
                <div class="invalid-feedback">Saisie Incorrect - Veuillez saisir uniquement des chiffres pour votre code postal (votre code postal doit contenir entre 4 & 5 chiffres).</div>
            </div>
            <div class="form-row mt-2">
                <input type="text" id="inputCity" class="form-control" value="" placeholder="Ville" pattern="^[^ -] ?[A-Za-z -]+$" required>
                <div class="valid-feedback">Correct !</div>
                <div class="invalid-feedback">Saisie Incorrect - Veuillez saisir uniquement des lettres pour votre ville (tiret accepté pour ville au nom composés).</div>
             </div>
            <div class="form-row mt-2">
                <input type="email" id="inputEmail" class="form-control" value="" placeholder="Email" required>
                <div class="valid-feedback">Correct !</div>
                <div class="invalid-feedback">Saisie Incorrect - Veuillez saisir un email valide.</div>
            </div>
        </div>
        <button type="submit" class="btn-form btn-success mt-2 text-white" onclick="getValue();">Commander</button>
    </form>`;

    sectionFormulaireClient.innerHTML = formulaireClient;

// Fonction qui empêche l'envoi du formulaire si un champ a été mal rempli et applique les styles de validation aux différents éléments 

(function() {  // Fonction (Bootstrap)
    'use strict';
    window.addEventListener('load', function() {
      let forms = document.getElementsByClassName('needs-validation');
      let validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

function getValue() {
    
    // Sélection des éléments input afin de récupérer leur valeur
    
    let firstNameForm = document.getElementById("inputFirstName").value;
    let lastNameForm = document.getElementById("inputLastName").value;
    let addressForm = document.getElementById("inputAddress").value;
    let cityForm = document.getElementById("inputCity").value;
    let emailForm = document.getElementById("inputEmail").value;
    
    // Création d'un objet valide pour l'envoi au serveur
    
    let productsId = [];

    for (let m = 0; m < productRegisteredLocalStorage.length; m++) {
        productsId.push(productRegisteredLocalStorage[m].id)
    }
    
    let postServer = {
        contact: {
           firstName: firstNameForm,
           lastName: lastNameForm,
           address: addressForm,
           city: cityForm,
           email: emailForm
        },
         products: productsId
    };

   fetch("http://localhost:3000/api/teddies/order", {
    
    method: "POST",
    headers: {'Content-Type': 'application/json' },
        
        body: JSON.stringify(postServer)
    })

    .then(function(resultPromise) {
        if (resultPromise.ok) {
            return resultPromise.json();
        }
    })

    .then(function(value){
          
        localStorage.setItem("orderId", value.orderId);
        localStorage.setItem("priceTotal", totalPriceForConfirmation); // tableau ligne 96
        window.location.href = "confirmation.html";
    });
};

// apel des fonctions après que le HTML soit totalement chargé

document.addEventListener('DOMContentLoaded', function(){
    
    basketBarPresentation();
    basketViewElements();
    deleteProductAlone();
    
    // Apel des fonctions qui calcul le prix total et supprime le panier entier uniquement si il y a un ou plusieurs produits dans le panier
    if (productRegisteredLocalStorage === null) {
    
        document.getElementsByClassName("total-price-basket").display = "none";
    } else {
        
        calculTotalBasket();
        deleteAllBasket();
    }

});