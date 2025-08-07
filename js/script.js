
  const btn = document.getElementById('auto-toggle-btn');
  let toggleInterval;

  // Función para iniciar el parpadeo
  function startBlinking() {
    toggleInterval = setInterval(() => {
      btn.classList.toggle('active');
    }, 1000);
  }

  // Función para detener el parpadeo y dejarlo "activo"
  function stopBlinking() {
    clearInterval(toggleInterval);
    btn.classList.add('active');
  }

  // Inicia el parpadeo al cargar la página
  startBlinking();

  // Se detiene cuando el mouse entra o el enlace recibe foco
  btn.addEventListener('mouseenter', stopBlinking);
  btn.addEventListener('focus', stopBlinking);
