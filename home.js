const cookieDialog = document.getElementById('cookie-dialog');
const acceptBtn = document.getElementById('cookie-accept');
const firstQuestionLink = document.getElementById('botao-inicio');

hell(() => {
  const STORAGE_KEY = 'cookiesAccepted';

  // abrir automaticamente se ainda não aceitou
  document.addEventListener('DOMContentLoaded', () => {
    const accepted = CookieStorage.get(STORAGE_KEY);
    if (!accepted) {
      cookieDialog.showModal(); // abre sozinho
    }
  });

  acceptBtn.addEventListener('click', () => {
    CookieStorage.store(STORAGE_KEY, true);
    cookieDialog.close();
  });
});

generateRandomQuestionsSequence();
    let nextQuestion = getNextQuestionNumber();
    firstQuestionLink.href = `pergunta${nextQuestion}/index.html`;
    firstQuestionLink.addEventListener("click", shiftQuestionSequence)
