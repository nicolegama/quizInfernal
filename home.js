const cookieDialog = document.getElementById('cookie-dialog');
const acceptBtn = document.getElementById('cookie-accept');

hell(() => {
  const STORAGE_KEY = 'cookiesAccepted';

  // abrir automaticamente se ainda não aceitou
  document.addEventListener('DOMContentLoaded', () => {
    const accepted = CookieStorage.get(STORAGE_KEY);

    if (!accepted) {
      cookieDialog.showModal(); // abre sozinho
    }
  });

  // ao aceitar, salva e fecha
  acceptBtn.addEventListener('click', () => {
    CookieStorage.store(STORAGE_KEY, true);
    cookieDialog.close();
  });
});
