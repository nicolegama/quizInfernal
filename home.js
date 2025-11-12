const cookieDialog = document.getElementById('cookie-dialog');
const acceptBtn = document.getElementById('cookie-accept');

const STORAGE_KEY = "cookiesAccepted";

// abrir automaticamente se ainda não aceitou
document.addEventListener("DOMContentLoaded", () => {
  const accepted = localStorage.getItem(STORAGE_KEY);

  if (!accepted) {
    cookieDialog.showModal();  // abre sozinho
  }
});

// ao aceitar, salva e fecha
acceptBtn.addEventListener("click", () => {
  localStorage.setItem(STORAGE_KEY, "true");
  cookieDialog.close();
});

localStorage.clear();