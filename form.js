document.querySelectorAll('[data-collab-form]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      'Заявка на сотрудничество с Vikamines',
      `Имя: ${data.get('name')}`,
      `Бренд: ${data.get('brand')}`,
      `Контакт: ${data.get('contact')}`,
      `Задача: ${data.get('brief')}`,
    ].join('\n');
    const status = form.querySelector('.form-status');

    window.open('https://t.me/VikaminesPR', '_blank', 'noopener,noreferrer');

    try {
      await navigator.clipboard.writeText(message);
      status.textContent = 'Заявка скопирована. Вставьте её в открывшийся Telegram.';
    } catch {
      status.textContent = 'Telegram открыт. Отправьте менеджеру данные из формы.';
    }
  });
});
