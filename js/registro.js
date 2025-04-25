class Registro extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = `
        <main class="main-etiqueta-form">
            <section class="main_header">
                <h2>Registrar</h2>
            </section>
            <section class="main_form">
                <form action="" id="frmRegist" class="main_form-elements">
                    <p>Correo nuevo</p>
                    <input type="email" name="Usuario" id="emailReg">
                    <p>Ingrese contraseña nueva</p>
                    <input type="password" name="password" id="passwordReg">
                    <p>id nuevo</p>
                    <input type="text" name="id" id="id">
                    <span>Profesor</span><input type="radio" name="cargo" id="cargo" value="Profe">
                    <span>Admin</span> <input type="radio" name="cargo" id="cargo" value="Admin"><br>
                    <button type="button" id="btnSave">guardar</button>
                </form>
            </section>
            
        </main>
        `
    }
    connectedCallback(){
        console.log('hola soy la nueva etiqueda conectada aldoom')
        const btnSave = document.getElementById('btnSave')
        btnSave.addEventListener('click', ()=>{
            abrirDB((db)=>{
                console.log('Se dio click en guardar')
                const nuevoUser = {
                id:document.getElementById('id').value,
                correo:document.getElementById('emailReg').value,
                contraseña:document.getElementById('passwordReg').value,
                cargo:document.querySelector('input[name="cargo"]:checked').value
                }
            
                const transaction = db.transaction(["Usuarios"], "readwrite")
                const mibase = transaction.objectStore("Usuarios")
                const addmibase = mibase.add(nuevoUser)
                addmibase.onsuccess = ()=>{
                    console.log('Se agrego correctamente al object store')
                    const main = document.getElementById('main')
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
                    <h1 class="efecto">AGREGANDO EL USUARIO</h1>`
                    setTimeout(()=>{
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
                            <h1 class="efecto">USUARIO AGREGADO CON EXITO</h1>`
                    }, 5000)
                    setTimeout(()=>{
                        window.location.href = "/index.html"
                    }, 10000)
                    
                    
                }
                addmibase.onerror = ()=>{
                    console.log("Erro al agregar")
                }
            })
        })
    }
}
customElements.define('mi-dash', Registro )