var maquina = []; // es una lista vacía
var entregado = [];// dar vueltas
var placas1=[];// lista que almacena un elemento de tipo vehiculo (placa,inicio,fin (miliseg))
var div = 0; 
var dineroImpreso = 0;


//Instanciando
// resultado (parrafo) muestra los valores de la lista entregado (vueltas)
var resultado = document.getElementById("resultado");

var botonExt = document.getElementById("extraer");
if (botonExt) {
    botonExt.addEventListener('click', entregarDinero, false);
    // validar click en boton pars que ejecute la función 
}
var botonReg = document.getElementById("registrar");
if (botonReg) {
    botonReg.addEventListener('click', registrar, false);
}
var botonCons = document.getElementById("consultar");
if (botonCons) {
    botonCons.addEventListener('click', consultas, false);
}
//fin de instanciar

//clase Plata incluye billetes y monedas
class Plata {
    constructor(v, c) {
    // constructor sirve para llamar variables fuera de la función 
        this.valor = v;
        this.cantidad = c;
    }
}
//---------------->Aqui puedes agregar nuevos billetes<-----------------//
// new para agregar una nueva plata 
maquina.push(new Plata(50000, 10));
maquina.push(new Plata(20000, 10));
maquina.push(new Plata(10000, 10));
maquina.push(new Plata(5000, 10));
maquina.push(new Plata(2000, 10));

//---------------->Aqui puedes agregar nuevos monedas<-----------------//
maquina.push(new Plata(1000, 10));
maquina.push(new Plata(500, 10));
maquina.push(new Plata(200, 10));
maquina.push(new Plata(100, 10));
maquina.push(new Plata(50, 10));
// cantidad total 888.500 

class vehiculo{
    // la clase vehiculo almacena placla, inicio y fin 
    constructor(pl, ini, fn) {
        this.placa = pl;
        this.inicio = ini;
        this.fin = fn;
    }
}
// ejemplo 
placas1.push(new vehiculo("hat031", 10,5));



// registrar = agregar una fechaInicial a la placa
function registrar () {
    var inicio = Date.now(); // almacenar hora actual de la maquina en miliseg
    var placaReg = document.getElementById("placas"); // almacena input de placas
    placas1.push(new vehiculo(placaReg.value, inicio, 0)); 
    // almacena el valor de lo que está dentro de la placaReg
}



//Para eliminar la placa que no se usará más
function eliminarelemento( arr, item ) {
    var i = arr.indexOf( item );
    // indexOf sirve para buscar la posicion del elemnto dentro de la lista o del arr
    if ( i !== -1 ) {
        arr.splice( i, 1 );
        // splice sirve para eliminar la posición del elemento
    }
}

// Función consultas con cálculo de tiempo de seg a min
function consultas(){
    var fin=Date.now();
    var placaConsElim = document.getElementById("placa");
    var total=0;
    // forEach me permite cambiar los valores de una lista
    placas1.forEach(function (element) {
         if (element.placa==placaConsElim.value) {
            element.fin=fin;
            // De segundos a minutos * dinero = plata 
            // Total es 50 pesos por min 
            total=((((element.fin-element.inicio)/1000))*0.0166667)*50;
            eliminarelemento(placas1,element);
         }
     });
  
    // valor es un input en htm --- math trunc para quitar los decimales
     document.getElementById("valor").value=Math.trunc(parseInt(total));
}



//---- Proceso para dar vueltas -------//
function entregarDinero() {
    entregado = []; // limpiar la lista 
    var total = document.getElementById("valor"); //alamcena lo que está en "dinero"
    var dinero = parseInt(total.value);// convierte el valor de dinero en un int 
    //COP 
    
    // Parecido al radix 
    var tmp = Math.trunc(dinero % 1000);
    //para conocer uniMil
    var tmp = Math.trunc(tmp % 100);
    // para conocer las centenas
    var decenas = Math.trunc(tmp / 10);
    // para conocer las decenas
    var unidades = Math.trunc(tmp % 10);
    // para concoer las unidades 


/// ------ CALCULO PARA UNIDAD MONETARIA COP ----///
// Calculo para decenas mayor a 5
    if (decenas > 5) {
        if (decenas == 6) {
            var resta = ((10 + unidades));
            dinero = dinero - resta;
        } else if (decenas == 7) {
            var resta = ((20 + unidades));
            dinero = dinero - resta;
        } else if (decenas == 8) {
            var resta = ((30 + unidades));
            dinero = dinero - resta;
        } else {
            var resta = ((40 + unidades));
            dinero = dinero - resta;
        }
    }
// Calculo par decenas menor a 5
    if (decenas < 5) {
        if (decenas == 1) {
            var resta = ((decenas * 10 + unidades));
            dinero = dinero - resta;
        } else if (decenas == 2) {
            var resta = ((decenas * 10 + unidades));
            dinero = dinero - resta;
        } else if (decenas == 3) {
            var resta = ((decenas * 10 + unidades));
            dinero = dinero - resta;
        } else {
            var resta = ((decenas * 10 + unidades));
            dinero = dinero - resta;
        }
    }

// Cuando las decenas son =0 pero las unidades son mayores a 0
    if (decenas == 0) {
        if (unidades > 0) {
            dinero = dinero - unidades;
        }
    }

/// Cuando la decena es igual a 5 pero la unidad es mayor a 0
    if (decenas == 5) {
        if (unidades > 0) {
            dinero = dinero - unidades;
        }
    }
//COP    

/// ----------- ENTREGAR VUELTAS -------- ///
// El div optimiza la entrega de dinero de manera eficiente. 
    for (var dineroAlmacenado of maquina) {
        if (dinero > 0) {
            // dinero = vueltas en COP
            // dineroAlmacenado = en mi máquina 
            div = Math.floor(dinero / dineroAlmacenado.valor); // cantidad de billetes para entregar
            // floor es el cociente ENTERO

            if (div > dineroAlmacenado.cantidad) { // para saber si hay dinero en la máquina
                // cantidad está en el constructor
                dineroAlmacenado.cantidad - 1; // me quita 1 billete de cada cajita
                dineroImpreso = dineroAlmacenado.cantidad; // cantidad de dinero que debo entregar por billete
            } else {
                dineroImpreso = div; 
                //en caso que dineroImpreso sea igual a la cantidad de dinero que la maquina entrega entonces se iguala a 0
            }
            if (dineroImpreso > 0) {
                //entregado almacena las vueltas que la máquina debe entregar
                entregado.push(new Plata(dineroAlmacenado.valor, dineroImpreso));
                // guarando en lista entregado para mostrarselo al usuario en pantalla 
                //Ejm: entregar 1 bill de 20mil
            }
            // para saber si estoy doy dando vueltas exactas
            dinero = dinero - (dineroAlmacenado.valor * dineroImpreso);
        }
    }
    // "dinero" es un nuevo dinero
    // dinero estaría igualado a 0 entonces los fondos son insuficientes
    if (dinero > 0) {
        resultado.innerHTML = "Fondos Insuficientes";
    } else {
        //plata es cada valor de la lista entregado 
        for (var plata of entregado) {
            // imprimir todos los valores de la lista entregado es un </p>
            resultado.innerHTML = resultado.innerHTML + plata.cantidad + " billetes de $" + plata.valor + "<br/>";

        }
    }
    
//------ RESTA A LA MÁQUINA ----////
    // element me ayuda a restarle a la máquina los billetes que voy a entregar
 for (var plata of entregado) {
     maquina.forEach(function (element) { // element: elemento de tipo plata
         if (plata.valor==element.valor) {
             element.cantidad = element.cantidad - plata.cantidad;
         }
     });
 }

/// ---- CANTIDAD BILLETES MÁQUINA ----- /// 
// imprimir la cantidad de billetes que hay en la máquina 
 mostrasx();
}

function mostrasx(){
    for (var plata of maquina){
    if(plata.valor==50000){   
        document.getElementById('cincuenta').value= plata.cantidad;
   }
   else if(plata.valor==20000){
       document.getElementById('veintemil').value=plata.cantidad;
   }
   else if (plata.valor==10000){
    document.getElementById('diezmil').value=plata.cantidad;
   }
   else if (plata.valor==5000){
    document.getElementById('cincomil').value=plata.cantidad;
   }
   else if (plata.valor == 2000){
    document.getElementById('dosmil').value=plata.cantidad;
   }
   else if (plata.valor == 1000){
    document.getElementById('mil').value=plata.cantidad;
   }
   else if (plata.valor == 500){
    document.getElementById('quinientos').value=plata.cantidad;
   } 
   else if (plata.valor == 200){
    document.getElementById('doscientos').value=plata.cantidad;
   }
   else if (plata.valor == 100){
    document.getElementById('cien').value=plata.cantidad;
   }
} 
}
    
var botonvueltases = document.getElementById("vueltas");
if (botonvueltases) {
    botonvueltases.addEventListener('click',darvueltasalgusto , false);
    // validar click en boton pars que ejecute la función 
}
    
function darvueltasalgusto() {
    entregado = [];
    var cincuentad = document.getElementById("cincuentad");
    var cincuenta = parseInt(cincuentad.value); // convierte el valor de dinero en un int 
    var veintemild = document.getElementById("veintemild");
    var veintemil = parseInt(veintemild.value);
    var diezmild = document.getElementById("diezmild");
    var diezmil = parseInt(diezmild.value);
    var cincomild = document.getElementById("cincomild");
    var cincomil = parseInt(cincomild.value);
    var dosmild = document.getElementById("dosmild");
    var dosmil = parseInt(dosmild.value);
    var mild = document.getElementById("mild");
    var mil = parseInt(mild.value);
    var quinientosd = document.getElementById("quinientosd");
    var quinientos = parseInt(quinientosd.value);
    var doscientosd = document.getElementById("doscientosd");
    var doscientos = parseInt(doscientosd.value);
    var ciend = document.getElementById("ciend");
    var cien = parseInt(ciend.value);
    var total = document.getElementById("valor");
    var dinero = parseInt(total.value);
    //g
    for (var dineroAlmacenado of maquina) {
        if (dineroAlmacenado.valor == 50000) {
            if (dineroAlmacenado.cantidad >= cincuenta) {
                entregado.push(new Plata(50000, cincuenta));
            }
        } else if (dineroAlmacenado.valor == 20000) {
            if (dineroAlmacenado.cantidad >= veintemil) {
                entregado.push(new Plata(20000, veintemil));
            }
        } else if (dineroAlmacenado.valor == 10000) {
            if (dineroAlmacenado.cantidad >= diezmil) {
                entregado.push(new Plata(10000, diezmil));
            }
        } else if (dineroAlmacenado.valor == 5000) {
            if (dineroAlmacenado.cantidad >= cincomil) {
                entregado.push(new Plata(5000, cincomil));
            }
        } else if (dineroAlmacenado.valor == 2000) {
            if (dineroAlmacenado.cantidad >= dosmil) {
                entregado.push(new Plata(2000, dosmil));
            }
        } else if (dineroAlmacenado.valor == 1000) {
            if (dineroAlmacenado.cantidad >= mil) {
                entregado.push(new Plata(20000, mil));
            }
        } else if (dineroAlmacenado.valor == 500) {
            if (dineroAlmacenado.cantidad >= quinientos) {
                entregado.push(new Plata(500, quinientos));
            }
        } else if (dineroAlmacenado.valor == 200) {
            if (dineroAlmacenado.cantidad >= doscientos) {
                entregado.push(new Plata(200, doscientos));
            }
        } else if (dineroAlmacenado.valor == 100) {
                if (dineroAlmacenado.cantidad >= cien) {
                    entregado.push(new Plata(100, cien));
                }
            }
        }
        c=0
        for(var plata of entregado){
            c=c+(plata.valor)*plata.cantidad;
        } 
        var valor = document.getElementById("valor");
        var dinero = parseInt(valor.value);
    
        var tmp = Math.trunc(dinero % 1000);
        //para conocer uniMil
        var tmp = Math.trunc(tmp % 100);
        // para conocer las centenas
        var decenas = Math.trunc(tmp / 10);
        // para conocer las decenas
        var unidades = Math.trunc(tmp % 10);
        // para concoer las unidades 


        /// ------ CALCULO PARA UNIDAD MONETARIA COP ----///
        // Calculo para decenas mayor a 5
        if (decenas > 5) {
            if (decenas == 6) {
                var resta = ((10 + unidades));
                dinero = dinero - resta;
            } else if (decenas == 7) {
                var resta = ((20 + unidades));
                dinero = dinero - resta;
            } else if (decenas == 8) {
                var resta = ((30 + unidades));
                dinero = dinero - resta;
            } else {
                var resta = ((40 + unidades));
                dinero = dinero - resta;
            }
        }
        // Calculo par decenas menor a 5
        if (decenas < 5) {
            if (decenas == 1) {
                var resta = ((decenas * 10 + unidades));
                dinero = dinero - resta;
            } else if (decenas == 2) {
                var resta = ((decenas * 10 + unidades));
                dinero = dinero - resta;
            } else if (decenas == 3) {
                var resta = ((decenas * 10 + unidades));
                dinero = dinero - resta;
            } else {
                var resta = ((decenas * 10 + unidades));
                dinero = dinero - resta;
            }
        }

        // Cuando las decenas son =0 pero las unidades son mayores a 0
        if (decenas == 0) {
            if (unidades > 0) {
                dinero = dinero - unidades;
            }
        }

        /// Cuando la decena es igual a 5 pero la unidad es mayor a 0
        if (decenas == 5) {
            if (unidades > 0) {
                dinero = dinero - unidades;
            }
        }
        //COP    
        document.getElementById('dinero').value=c;
      
        if(c==dinero){   
        for (var plata of entregado) {
            maquina.forEach(function (element) { // element: elemento de tipo plata
                if (plata.valor == element.valor) {
                    element.cantidad = element.cantidad - plata.cantidad;
                }
            });
        }
        }
        else{
            alert("Digita la cantidad exacta a pagar /o fondos insuficientes");
        }    
         
     mostrasx();
    }
   
