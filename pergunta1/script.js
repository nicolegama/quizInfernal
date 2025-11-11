const options = document.querySelectorAll('.option');
const optionsWrapper = document.querySelector('.options');
const inputs = document.querySelectorAll('input[type="radio"]');
const ratingPopup = document.querySelector('#rating-popup');
const feedbackPopup = document.querySelector('#feedback-popup');

setupAnswerListeners();
setupAnnoyingPopup();
setupValidation();

function setupAnswerListeners() {
  options.forEach((option) =>
    option.addEventListener('click', () => {
      const input = option.querySelector('input[type="radio"]');
      input.click();
    }),
  );

  inputs.forEach((input) =>
    input.addEventListener('click', () => {
      localStorage.setItem('question-1-answer', input.value);
    }),
  );
}

function setupAnnoyingPopup() {
  const state = {
    ratingPopupShown: false,
    mouseMoved: false,
    wrongStarsClicked: 0,
  };

  document.addEventListener('mousemove', () => {
    state.mouseMoved = true;
  });

  function showPopup() {
    if (!state.mouseMoved || state.ratingPopupShown) return;
    state.ratingPopupShown = true;

    feedbackPopup.setAttribute('open', '');
    const buttons = feedbackPopup.querySelectorAll('button');

    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        feedbackPopup.removeAttribute('open');
        ratingPopup.setAttribute('open', '');
      }),
    );
  }

  optionsWrapper.addEventListener('mouseover', showPopup);
  optionsWrapper.addEventListener('touchend', showPopup);

  const ratingStars = Array.from(ratingPopup.querySelectorAll('button'));

  ratingStars.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (index === 0) {
        button.classList.add('filled');

        const content = ratingPopup.querySelector('.dialog-content');

        const thanksMessage = document.createElement('p');
        thanksMessage.textContent =
          'Obrigado! Sua opinião é valiosa para nós <3';
        thanksMessage.style.textAlign = 'center';
        thanksMessage.style.fontSize = '24px';
        content.appendChild(thanksMessage);

        setTimeout(() => content.classList.add('weird-slide-out'), 4 * 1000);

        return setTimeout(() => ratingPopup.removeAttribute('open'), 5 * 1000);
      }

      if (state.wrongStarsClicked > 3) {
        window.location.reload();
      }

      const headingText = ratingPopup.querySelector('h2 span');
      const fontSize = parseFloat(getComputedStyle(headingText).fontSize);
      headingText.style.fontSize = Math.min(fontSize * 1.25, 78) + 'px';
      state.wrongStarsClicked++;
    });
  });
}

function setupValidation() {
  const nextQuestionAnchor = document.querySelector('.next-question-link');
  const options = Array.from(inputs);

  nextQuestionAnchor.addEventListener('click', (e) => {
    if (!options.some((option) => option.checked)) {
      e.preventDefault();
      window.alert('Selecione uma opção!!');
    }
  });
}
