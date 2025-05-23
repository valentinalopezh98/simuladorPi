
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const simularBtn = document.getElementById('simularBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');
const inputGranos = document.getElementById('granos');

//Variables para las estadísticas
let dentro = 0;
let total = 0;

const L = canvas.width; // lado del cuadrado (en px)
const radio = L / 2; // radio del círculo
const centro = { x: L / 2, y: L / 2 }; //coordenadas del centro del círculo

//Dibuja el cuadrado y el círculo al iniciar
function dibujarModelo() {
  ctx.clearRect(0, 0, L, L);

  //Cuadrado 
  ctx.fillStyle = '#1a1b1f';
  ctx.fillRect(0, 0, L, L);

  //Círculo
  ctx.beginPath();
  ctx.arc(centro.x, centro.y, radio, 0, 2 * Math.PI);
  ctx.strokeStyle = '#fff';
  ctx.stroke();
}

dibujarModelo();

//Genera coordenadas aleatorios validos (dentro del cuadrado): punto de donde cae un grano de arroz
function generarPunto() {
  const x = Math.random() * L;
  const y = Math.random() * L;
  return { x, y };
}

// simulacion
function simular() {
  const cantidad = parseInt(inputGranos.value);

  for (let i = 0; i < cantidad; i++) {
    const punto = generarPunto(); //Genera las coordenadas aleatorias

    //Calcula la distancia al centro del crculo
    const dx = punto.x - centro.x;
    const dy = punto.y - centro.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    //Verifica si esta adentro del circulo
    const estaAdentro = distancia <= radio;
    if (estaAdentro) {
      dentro++;
      ctx.fillStyle = '#00c1d1'; //Pinta el punto en color celeste si esta en el circulo
    } else {
      ctx.fillStyle = '#e5587d'; ////Pinta el punto en color rosa si esta afuera del circulo
    }

    //Dibuja el punto
    ctx.beginPath();
    ctx.arc(punto.x, punto.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    total++;
  }

  //Analisis de resultados
  const fuera = total - dentro; //Calcula la cantidad que cayeron afuera del circulo
  const porcentajeDentro = ((dentro / total) * 100).toFixed(2); //Porcentaje de granos que cayeron adentro
  const porcentajeFuera = ((fuera / total) * 100).toFixed(2);//Porcentaje de granos que cayeron afuera
  const piEstimado = ((4 * dentro) / total).toFixed(5); //Calcula pi

  //Imprime los valores
  document.getElementById('total').textContent = total;
  document.getElementById('dentro').textContent = dentro;
  document.getElementById('fuera').textContent = fuera;
  document.getElementById('porcentajeDentro').textContent = porcentajeDentro;
  document.getElementById('porcentajeFuera').textContent = porcentajeFuera;
  document.getElementById('piEstimado').textContent = piEstimado;
}

//Boton simular (llama a ejecutar la func simular)
simularBtn.addEventListener('click', simular);

//Boton reiniciar (reinicia todos los valores)
reiniciarBtn.addEventListener('click', () => {
  dentro = 0;
  total = 0;
  dibujarModelo();
  document.getElementById('total').textContent = 0;
  document.getElementById('dentro').textContent = 0;
  document.getElementById('fuera').textContent = 0;
  document.getElementById('porcentajeDentro').textContent = 0;
  document.getElementById('porcentajeFuera').textContent = 0;
  document.getElementById('piEstimado').textContent = 0;
});
