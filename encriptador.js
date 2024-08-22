const d = document;
const textArea = d.querySelector(".form_input"); 
const imagenMuneco = d.querySelector(".result_img");
const loader = d.querySelector(".loader");
const resultTitle = d.querySelector(".result_title");
const resultText = d.querySelector(".result_text");
const botonEncriptar = d.querySelector(".form_btn");
const botonDesencriptar = d.querySelectorAll(".form_btn");
const botonCopiar = d.querySelector(".result_btn");

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

//Funcion para encriptar
function encriptarmensaje(mensaje) {
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++){
            if(letra === llaves[j][0]) {
                encriptada = llaves[j][1];//Reemplaza la letra por su equivalente encriptado
            break;//Termina el bucle cuando se encuentra la correspondencia
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado
}

//Funcion para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado
}

//Ocultar elementos dinamicamente
textArea.addEventListener("input", (e) => {
    imagenMuneco.style.display = "none";
    loader.classList.remove("hidden");
    resultTitle.textContent = "Capturando Mensaje.";
    resultText.textContent = "";
});

//Funcion del boton encriptar
botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarmensaje(mensaje);
    resultText.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultTitle.textContent = "El resultado es:";
});

//Funcion del boton desencriptar
botonDesencriptar[1].addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultText.textContent = mensajeDesencriptado;
    resultTitle.textContent = "El resultado es:";
    botonCopiar.classList.remove("hidden");       
});

botonCopiar.addEventListener("click", () => {
    let textoCopiado = resultText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        imagenMuneco.style.display = "block";
        loader.classList.add("hidden");
        resultTitle.textContent = "El texto se copio";
        botonCopiar.classList.add("hiden");
        resultText.textContent = "";
        //console.log(`Se copio el texto: ${textoCopiado}`)
    })   
});