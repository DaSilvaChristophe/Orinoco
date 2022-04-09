// fonction qui permet l'apel des produits a l'API et l'affichage sur la page d'accueil 

function listProducts(){ 
    
    fetch("http://localhost:3000/api/teddies") // Requête GET de tous les produits de l'API
    
    .then(function(resultPromise) {  
        if (resultPromise.ok) {
            return resultPromise.json(); // Réponse de l'API dans une promise et récupération de celle-ci au format JSON 
        }
    })
    
    .then(function(values){ 

        const articles = values; 
    
        for (let article in articles) { 

        /* Création dynamique d'éléments dans le DOM pour la structure HTML, apel des valeurs produits de l'API et dispersion de celle-ci dans la structure */

        const sectionProducts = document.getElementById("list-products");
        
        let newElementArticle = document.createElement("article");
            sectionProducts.appendChild(newElementArticle)
            .classList.add("article-products");
                
        let newElementDiv1 = document.createElement("div");
            newElementArticle.appendChild(newElementDiv1)
            .classList.add("div-img");
        
        let newElementImage = document.createElement("img");
            newElementDiv1.appendChild(newElementImage)
            .classList.add("img-products")
            newElementImage.src = values[article].imageUrl; 
            
        let newElementDiv2 = document.createElement("div");
            newElementArticle.appendChild(newElementDiv2)
            .classList.add("div-text");
        
        let newElementTitle = document.createElement("h3");
            newElementDiv2.appendChild(newElementTitle)
            .classList.add("title-products");
            newElementTitle.innerHTML = values[article].name;

        let newElementPrice = document.createElement("span");
            newElementDiv2.appendChild(newElementPrice)
            .classList.add("price-products");
            // Affichage du prix et formatage du prix (centimes => euros) avec le constructeur Intl.NumberFormat
            values[article].price = values[article].price / 100;
            newElementPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            }).format(values[article].price);
            
        let newElementButton = document.createElement("button");
            newElementArticle.appendChild(newElementButton)
            .classList.add("btn-products");
        
        let newElementLink = document.createElement("a"); 
            newElementButton.appendChild(newElementLink)
            .classList.add("link-products");
            newElementLink.textContent = "Info Teddie"; 
            // lien qui permet l'affichage de l'id produit dans l'url et qui va servir a afficher le produit seul sur la page product
            newElementLink.href = `product.html?id=${values[article]._id}`;   
        }
    })

    // Catch (Gestion d'erreur de la requète) - Affichage phrase d'erreur pour informer l'utilisateur
    
    .catch(function(err) {
        document.getElementById("oursteddies")
        .innerHTML = "Connectez-vous sur le port 3000 afin de voir notre collection de Teddies, si le problème persiste contactez-nous directement via le lien contact de la page.";
     })
};

// apel de la fonction qui permet l'apel et l'affichage des produits de l'API sur la page d'accueil après que le HTML soit totalement chargé

document.addEventListener('DOMContentLoaded', listProducts()); 