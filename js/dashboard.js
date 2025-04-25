class Mydash extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        console.log('me enlace correctamente ')
    }

}
customElements.define("my-dash", Mydash)
const bodydash = document.getElementById('body')