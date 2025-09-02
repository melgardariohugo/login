const apiUrl = 'http://localhost:3000/api';

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function register() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showNotify('Completa todos los campos.');
    return;
  }

  if (!isValidEmail(email)) {
    showNotify('Ingresa un correo válido.');
    return;
  }

  const res = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  showNotify(data.message || data.error);

  if (res.status === 200) {
    emailInput.value = '';
    passwordInput.value = '';
  }
}

async function login() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showNotify('Completa todos los campos.');
    return;
  }

  if (!isValidEmail(email)) {
    showNotify('Ingresa un correo válido.');
    return;
  }

  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  showNotify(data.message || data.error);

  if (res.status === 200) {
    showNotify(`¡Bienvenido, ${email}!`);
    emailInput.value = '';
    passwordInput.value = '';
  }
}

function showNotify(message) {
  const notify = document.getElementById('notify');
  notify.innerText = message;
  notify.classList.remove('hidden');
  notify.classList.add('show');

  setTimeout(() => {
    notify.classList.remove('show');
    notify.classList.add('hidden');
  }, 3000);
}

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

const keySound = new Audio('sonido/keyboard-04.mp3');
keySound.volume = 0.4;

function addKeySound(inputId) {
  const input = document.getElementById(inputId);
  input.addEventListener('keydown', () => {
    keySound.currentTime = 0;
    keySound.play();
  });
}

addKeySound('email');
addKeySound('password');


const toggleReadme = document.getElementById('toggleReadme');
const readmeBox = document.getElementById('readmeBox');
const readmeText = document.getElementById('readmeText');
const switchLang = document.getElementById('switchLang');

let currentLang = 'es';

const readmeContent = {
  es: 'Este formulario permite registrarte o iniciar sesión. Ingresa tu correo electrónico y contraseña para continuar. Los datos se validan antes de enviarse al servidor.',
  en: 'This form allows you to register or log in. Enter your email and password to proceed. The data is validated before being sent to the server.'
};

toggleReadme.addEventListener('click', () => {
  readmeBox.classList.toggle('hidden');
});

switchLang.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  switchLang.textContent = currentLang === 'es' ? 'EN' : 'ES';
  readmeText.innerHTML = `<p>${readmeContent[currentLang]}</p>`;
});
