const button = document.querySelector('[data-lang-toggle]');
let language = localStorage.getItem('vikamines-language') || 'ru';

const fallbackTranslations = {
  'подписчиков в TikTok': 'TikTok followers',
  'лайков в TikTok': 'TikTok likes',
  'подписчиков в Telegram': 'Telegram followers',
  'Образы, beauty, GRWM и обычная жизнь без дистанции.': 'Looks, beauty, GRWM and everyday life without distance.',
  'узнать больше': 'learn more',
  'Telegram без сокращений': 'Telegram, uncut',
  'Сотрудничество': 'Collaboration',
  'Последние моменты': 'Latest moments',
  '15 фотографий из Telegram-канала.': '15 photos from the Telegram channel.',
  'Заполните короткую заявку. После отправки откроется Telegram для связи по рекламе.': 'Fill out a short brief. Telegram will open after submission.',
  'Имя': 'Name',
  'Бренд': 'Brand',
  'Telegram или email': 'Telegram or email',
  'Контакт': 'Contact',
  'Задача': 'Brief',
  'отправить заявку': 'send brief',
  'открыть канал': 'open channel',
  'контакты ↗': 'contact ↗',
  'главная ↑': 'home ↑',
  'лайков': 'likes'
};

document.querySelectorAll('a, p, span, h2, button').forEach((element) => {
  if (element.children.length || element.dataset.ru || element.dataset.en) return;
  const originalText = element.textContent.trim();
  const englishText = fallbackTranslations[originalText];
  if (!englishText) return;
  element.dataset.ru = originalText;
  element.dataset.en = englishText;
});

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-ru][data-en]').forEach((element) => { element.textContent = element.dataset[language]; });
  if (button) {
    button.dataset.language = language;
    button.setAttribute('aria-label', language === 'ru' ? 'Switch to English' : 'Переключить на русский');
  }
}

button?.addEventListener('click', () => {
  language = language === 'ru' ? 'en' : 'ru';
  localStorage.setItem('vikamines-language', language);
  applyLanguage();
});

applyLanguage();
