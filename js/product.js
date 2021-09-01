// Récupération de l'id produit dans l'url 
  
const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

// Création de structure HTML pour la mise en page du produit appeler via l'API

function structureHtml(){    

    const newElementArticle = document.getElementById("presentation-product");

    let structureProduct = [];

        structureProduct = structureProduct + 
        `<div class="div-img-page-product rounded">
            <img class="img-page-product rounded" src=""alt="teddie">
        </div>
        <div class="div-text-page-product text-center bg-white rounded">
            <h2 class="title-page-product fw-bold "></h2>
            <p class="description-page-product"></p>
            <span class="price-page-product fw-bold"></span>
            <div class="div-form-page-product">
                <form class="form-colors-page-product">
                    Nos couleurs :
                    <select class="select-page-product"></select> 
                </form>
                <form class="form-quantity-page-product" name="formquantity">
                    Quantité :
                    <input class="input-page-product" type="number" name="input" value="1" min="1" max="10">
                </form>
            </div>
        </div>
        <button class="btn-page-product bg-white rounded">
            <a class="link-page-product text-success text-decoration-none "> Ajouter au panier </a>
        </button>
        <a class="link-return-home mx-auto text-white text-decoration-none" href="index.html"> < Retour Accueil </a>`;

        newElementArticle.innerHTML = structureProduct;
};

// fonction qui permet l'apel API du produit seul via son id et enregistrement dans le local storage 

function presentationProduct(){
    
    fetch(`http://localhost:3000/api/teddies/${id}`) 
    
    .then(function(resultPromise) {
        if (resultPromise.ok) {
            return resultPromise.json();
        }
    })

    .catch(function(err) {
        window.alert = ("Un problème vient de survenir, veuillez recharger votre page, si le problème persiste contactez-nous directement via le lien contact de la page.");
     })

    .then(function(value){
        
        // Apel des valeurs du produit et dispersion dans la structure HTML
        
        const image = document.querySelector(".img-page-product");
            image.src = value.imageUrl;
        
        const title = document.querySelector(".title-page-product");
            title.innerHTML = value.name;
        
        const description = document.querySelector(".description-page-product");
            description.innerHTML = value.description;
        
        // Apel de la valeur prix produit dans la structure HTML et formatage du prix (centimes => euros) avec le constructeur Intl.NumberFormat
        
        const price = document.querySelector(".price-page-product");
            value.price = value.price / 100;
            price.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            }).format(value.price);
        
        // Boucle qui permet la récupération des valeurs couleurs et l'affichage dans la structure HTML en créant dynamiquement des balises option
        
        for (color of value.colors)
        {
            const select = document.querySelector(".select-page-product")
            let option = document.createElement("option");
                select.appendChild(option);
                option.innerHTML = color;
                option.setAttribute("value",`${color}`)
        }

        /* récupération des données produits séléctionner par l'utilisateur pour le local storage et envoi au panier */
        
        let linkBasket =  document.querySelector(".link-page-product")
        .addEventListener('click',function(){

            
            // récupèration de la valeur de l'input qui permet le choix de la quantité produit
               
            const quantity = `${formquantity.input.value}`;
            
            // Récupération et regroupement des valeurs produit dans un objet pour l'enregistrement dans le local storage et l'envoi au panier
           
            let valuesProduct = {
                image: value.imageUrl,
                name: value.name,
                price: (value.price * quantity),
                id: value._id,
                quantity: quantity
            }; 
        
            // Fonction d'alerte qui confirme l'ajout au panier par l'utilisateur et choix pour l'utilisateur (aller au panier où retournez à l'accueil et continuer ces achats)

            function alertConfirmation(){
            
                if (window.confirm (`${value.name} a bien été ajouter à votre panier, appuyez sur OK pour voir votre panier ou ANNULER pour continuez vos achats.`)){
                        window.location.href = "basket.html";
                } else {
                        window.location.href = "index.html";
                }
            };

            // Création de la fonction qui permet l'ajout produits au local storage
            
            function additionLocalStorageProduct(){
            
                if (localStorage.getItem("product") !== null) {
                    
                    // JSON.parse = permet la convertion des données pour récupérer celle-ci dans le local storage (format JSON => Objet JavaScript) 
                    
                    items = JSON.parse(localStorage.getItem("product"));
                    
                    for (let item of items){
                        
                        if(valuesProduct.name === item.name){
                            
                            item.quantity = valuesProduct.quantity;
                            item.price = valuesProduct.price;
                            
                        } if(valuesProduct.name !== item.name) {
                           
                            items.push(valuesProduct);
                            break;   
                        }
                    }
                    
                    localStorage.setItem("product", JSON.stringify(items));
                    alertConfirmation()

                } else { 
                    // Création d'un tableau pour le push des valeurs produits pour l'envoi au local storage
                    let productRegisteredLocalStorage = [];
                    // envoie les données des valeurs produit dans le tableau ligne 142 "productRegisteredLocalStorage"
                    productRegisteredLocalStorage.push(valuesProduct);
                     // JSON.stringify = convertion des données pour l'envoi dans local storage (Objet JavaScript => JSON);
                    localStorage.setItem("product", JSON.stringify(productRegisteredLocalStorage));
                    
                    alertConfirmation()
                }  
            };

            additionLocalStorageProduct();
                 
        });
    });
};


// apel des fonctions après que le HTML soit totalement chargé

document.addEventListener('DOMContentLoaded', function(){
    
    structureHtml();
    presentationProduct();
    
});