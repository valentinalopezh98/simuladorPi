// Paso 1: Definir el modelo matemático
// Simulamos granos de arroz cayendo sobre un cuadrado con un círculo inscrito
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const simularBtn = document.getElementById('simularBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');
const inputGranos = document.getElementById('granos');

// Estadísticas
let dentro = 0;
let total = 0;

// Paso 2: Determinar valores de entrada
const L = canvas.width; // lado del cuadrado (en px)
const radio = L / 2; // radio del círculo
const centro = { x: L / 2, y: L / 2 };

// Dibujar el cuadrado y el círculo al iniciar
function dibujarModelo() {
  ctx.clearRect(0, 0, L, L);

  // Cuadrado (ya es el canvas entero)
  ctx.fillStyle = '#1a1b1f';
  ctx.fillRect(0, 0, L, L);

  // Círculo inscrito
  ctx.beginPath();
  ctx.arc(centro.x, centro.y, radio, 0, 2 * Math.PI);
  ctx.strokeStyle = '#fff';
  ctx.stroke();
}

dibujarModelo();

// Paso 3: Generar números aleatorios (posiciones de granos)
function generarPunto() {
  const x = Math.random() * L;
  const y = Math.random() * L;
  return { x, y };
}

// Paso 4: Ejecutar la simulación
function simular() {
  const cantidad = parseInt(inputGranos.value);

  for (let i = 0; i < cantidad; i++) {
    const punto = generarPunto();

    // Calcular distancia al centro del círculo
    const dx = punto.x - centro.x;
    const dy = punto.y - centro.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    // Verificar si está dentro del círculo
    const estaDentro = distancia <= radio;
    if (estaDentro) {
      dentro++;
      ctx.fillStyle = '#00c1d1';
    } else {
      ctx.fillStyle = '#e5587d';
    }

    // Dibujar el punto
    ctx.beginPath();
    ctx.arc(punto.x, punto.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    total++;
  }

  // Paso 5: Analizar resultados
  const fuera = total - dentro;
  const porcentajeDentro = ((dentro / total) * 100).toFixed(2);
  const porcentajeFuera = ((fuera / total) * 100).toFixed(2);
  const piEstimado = ((4 * dentro) / total).toFixed(5);

  document.getElementById('total').textContent = total;
  document.getElementById('dentro').textContent = dentro;
  document.getElementById('fuera').textContent = fuera;
  document.getElementById('porcentajeDentro').textContent = porcentajeDentro;
  document.getElementById('porcentajeFuera').textContent = porcentajeFuera;
  document.getElementById('piEstimado').textContent = piEstimado;
}

// Botón Simular
simularBtn.addEventListener('click', simular);

// Botón Reiniciar
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
