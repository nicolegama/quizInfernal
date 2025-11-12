const pics = ['Kibe.jpg', 'Brigadeiro.jpg', 'Pastel.jpg', 'falhou'];

function setupResult() {
  const img = document.createElement('img');
  img.id = 'imagemResultado';
  img.style.maxWidth = '500px';

  const textoRes = document.getElementById('textoResultado');
  const resultadoReal = document.getElementById('resultadoReal');
  const a = Math.floor(Math.random() * pics.length);

  textoRes.after(img);

  if (pics[a] !== 'falhou') {
    resultadoReal.style.display = 'block';
    resultadoReal.addEventListener('click', function () {
      img.src = '../assets/result/' + pics[a];
      textoRes.textContent = 'Parabens você é um ' + pics[a];
    });
  } else {
    setTimeout(function () {
      textoRes.textContent = 'Parabens você é uma falha';
    }, 6000);
  }
}
