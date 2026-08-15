const button = document.querySelector('[data-lang-toggle]');
let language = localStorage.getItem('vikamines-language') || 'ru';

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-ru][data-en]').forEach((element) => { element.textContent = element.dataset[language]; });
  if (button) button.textContent = language === 'ru' ? 'EN' : 'RU';
}

button?.addEventListener('click', () => {
  language = language === 'ru' ? 'en' : 'ru';
  localStorage.setItem('vikamines-language', language);
  applyLanguage();
});

applyLanguage();
