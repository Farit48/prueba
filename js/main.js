let db;
function abrirDB(callback){
    const request = indexedDB.open("My DataBase", 1);
    
    request.onerror = (e)=>{
        console.log("Error al Leer la base de Datos", e.target.error);
    };

    request.onsuccess = (e)=>{
        db = e.target.result
        callback(db);
        console.log("Base de datos abierta")
        
    }
    request.onupgradeneeded = (e)=>{
        const db = e.target.result
        if(!db.objectStoreNames.contains("Usuarios")){
            db.createObjectStore("Usuarios", {keyPath: "id"}).createIndex("porCorreo", "correo", {unique:true})
            console.log("Se ha actualizado la base de datos Con exito", db)
        }
    } 
}

class Mimain extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = `
        <main class="main-etiqueta">
            <section class="main_header">
                <h1>Bienvenido tu Blog de Notas Acme</h1>
            </section>
            <section class="main_form">
                <form action="" id="frmGetIn" class="main_form-elements">
                    <p>Inicia sesion con el correo</p>
                    <input type="text" name="Usuario" id="email">
                    <p>Ingrese contraseña</p>
                    <input type="password" name="password" id="password"><br>
                    <button type="button" id="btnGetin">Iniciar</button>
                    <br>
                    <button type="button" id="btnRE">Registrar</button>
                </form> 
            </section>
        </main>
      
          
        `
    }
   

    connectedCallback(){
        console.log("ya me conecte al doom")
        const btnRE = document.getElementById('btnRE')
        btnRE.addEventListener('click',()=>{
            
            
            const main = document.getElementById('main')
            main.setAttribute('vista', 'registro')
            main.innerHTML=`<mi-dash><mi-dash>`
            
            
        })
        const btnGetin = document.getElementById('btnGetin')
        btnGetin.addEventListener('click', ()=>{
            
            
            abrirDB((db)=>{
                const correo = document.getElementById('email').value;
                const pass = document.getElementById('password').value;
        
                const transaction = db.transaction(["Usuarios"], "readonly");
                const store = transaction.objectStore("Usuarios");
                const index = store.index("porCorreo");
        
                const request = index.get(correo);
        
                request.onsuccess = () => {
                    const usuario = request.result;
                    if (usuario) {
                        if (usuario.contraseña === pass && usuario.correo === correo) {
                            main.innerHTML=`
                                <style>
                                .efecto{
                                    opacity:0;
                                    animation: animation 4s ease 0.1s forwards ;
                                    width:50%;
                                    margin:auto;
                                }
                                @keyframes animation {
                                    0%{opacity: 0;}
                                    50%{opacity: 1;}
                                    75%{opacity: 0;}
                                    100%{opacity: 1;}
                                }
                                </style>
                                <h1 class="efecto">Iniciando Sesion</h1>`
                            setTimeout(() => {
                                window.location.href= "dashboard.html"
                            }, 5000);
                        } else {
                            main.innerHTML=`
                                <style>
                                .efecto{
                                    opacity:0;
                                    animation: animation 4s ease 0.1s forwards ;
                                    width:50%;
                                    margin:auto;
                                }
                                @keyframes animation {
                                    0%{opacity: 0;}
                                    50%{opacity: 1;}
                                    75%{opacity: 0;}
                                    100%{opacity: 1;}
                                }
                                </style>
                                <h1 class="efecto">Usuario invalidao</h1>`
                            setTimeout(() => {
                                window.location.href= "index.html"
                            }, 2000);
                        }   
                    } else {
                        console.log('Usuario no registrado');
                        main.innerHTML=`
                                <style>
                                .efecto{
                                    opacity:0;
                                    animation: animation 4s ease 0.1s forwards ;
                                    width:50%;
                                    margin:auto;
                                }
                                @keyframes animation {
                                    0%{opacity: 0;}
                                    50%{opacity: 1;}
                                    75%{opacity: 0;}
                                    100%{opacity: 1;}
                                }
                                </style>
                                <h1 class="efecto">Usuario No Registrado</h1>`
                            setTimeout(() => {
                                window.location.href= "index.html"
                            }, 2000);
                    }
                }; 
            })
        })
        
       
        
        
    }

  
}
customElements.define("mi-main", Mimain )

