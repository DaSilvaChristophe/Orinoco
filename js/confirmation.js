// Récupération de l'id de commande et du prix total dans le local storage pour affichage page & suppression du panier

let orderIdLocalStorage = (localStorage.getItem("orderId"));
let priceTotalLocalStorage = (localStorage.getItem("priceTotal"));
localStorage.removeItem("product");

// Fonction pour la structure HTML et l'affichage des données Id & Prix total sur la page confirmation

function onConfirmation(){

    const confirmCommand = document.getElementById("confirm-command");

    let confirmation = [];

    confirmation = confirmation + 
    ` <h1 class="mx-auto text-center"><u>Confirmation</u></h1>
        <div class="row mx-auto text-center border">
            <p class="col-12 h2">OriTeddies vous remercie pour votre commande</p>
            <span class="col-12 h5">Id : ${orderIdLocalStorage}</span>
            <span class="col-12 h5">Prix total : ${priceTotalLocalStorage}€</span>
        </div>
        <div >
            <img src="img/teddie_1.png" class="img-confirm mt-3" alt="Ours en peluche">
        </div>`;

    confirmCommand.innerHTML = confirmation;

};

// apel de la fonction après que le HTML soit totalement chargé

document.addEventListener('DOMContentLoaded', onConfirmation()); 