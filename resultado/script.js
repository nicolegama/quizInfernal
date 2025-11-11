document.addEventListener('DOMContentLoaded', () => {
    const modalTrigger = document.getElementById('resultadoModalTrigger');
    const modalOverlay = document.getElementById('resultadoModalOverlay');
    const modalClose = document.getElementById('resultadoModalClose');
    const modalContent = document.getElementById('resultadoModalContent');
    const phoneInput = document.getElementById('resultadoModalTelefone');
    const form = document.getElementById('resultadoForm');
    const errorMessage = document.getElementById('resultadoModalError');
    const formWrapper = document.getElementById('resultadoModalFormWrapper');
    const loadingWrapper = document.getElementById('resultadoModalLoadingWrapper');
    const assinarPlanoWrapper = document.getElementById('resultadoModalAssinarPlano');
    const assinarPlanoButtons = document.querySelectorAll('.resultado-plano-card-assinatura-button');


    const nameWrapper = form.querySelector('#resultadoModalNome').closest('.resultado-modal-form-field');
    const emailWrapper = form.querySelector('#resultadoModalEmail').closest('.resultado-modal-form-field');
    const phoneWrapper = form.querySelector('#resultadoModalTelefone').closest('.resultado-modal-form-field');
    const consentWrapper = form.querySelector('#resultadoConsentimento').closest('.resultado-modal-form-field');

    // Numero aleatorio entre 5 e 10 segundos
    const LOADING_DURATION = Math.floor(Math.random() * 5000) + 5000;

    const setVisibility = (element, shouldShow) => {
        if (shouldShow) {
            element.classList.add('is-visible');
            element.setAttribute('aria-hidden', 'false');
        } else {
            element.classList.remove('is-visible');
            element.setAttribute('aria-hidden', 'true');
        }
    };

    const showFormState = () => {
        setVisibility(formWrapper, true);
        setVisibility(loadingWrapper, false);
        setVisibility(assinarPlanoWrapper, false);
    };

    const showLoadingState = () => {
        setVisibility(formWrapper, false);
        setVisibility(loadingWrapper, true);
        setVisibility(assinarPlanoWrapper, false);
    };

    const showAssinarPlanoState = () => {
        setVisibility(formWrapper, false);
        setVisibility(loadingWrapper, false);
        setVisibility(assinarPlanoWrapper, true);
    };

    const showError = (message) => {
        errorMessage.textContent = message;
    };

    const resetError = () => {
        errorMessage.textContent = '';
    };

    const applyPhoneMask = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);

        if (digits.length <= 2) {
            return digits;
        }

        if (digits.length <= 6) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        }

        if (digits.length <= 10) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        }

        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    };

    const setFieldError = (wrapper, message) => {
        wrapper.classList.add('is-invalid');
        wrapper.dataset.error = message;
    };

    const clearFieldError = (wrapper) => {
        wrapper.classList.remove('is-invalid');
        delete wrapper.dataset.error;
    };

    const clearAllFieldErrors = () => {
        [nameWrapper, emailWrapper, phoneWrapper, consentWrapper].forEach(clearFieldError);
    };

    const resetModalState = () => {
        form.reset();
        resetError();
        clearAllFieldErrors();
        showFormState();
    };

    const openModal = () => {
        resetModalState();
        modalOverlay.classList.add('is-visible');
        modalOverlay.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
        modalOverlay.classList.remove('is-visible');
        modalOverlay.setAttribute('aria-hidden', 'true');
    };

    modalTrigger.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    modalOverlay.addEventListener('click', closeModal);
    assinarPlanoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            alert('serviço indisponivel. Tente novamente mais tarde');
        });
    });

    const validateForm = () => {
        let isValid = true;
        clearAllFieldErrors();

        const nomeValue = form.nome.value.trim();
        const emailValue = form.email.value.trim();
        const phoneValue = form.telefone.value.trim();
        const consentChecked = form.consentimento.checked;

        if (!nomeValue) {
            setFieldError(nameWrapper, 'Informe seu nome');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            setFieldError(emailWrapper, 'Informe seu email');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            setFieldError(emailWrapper, 'Email inválido');
            isValid = false;
        }

        const digits = phoneValue.replace(/\D/g, '');
        if (!phoneValue) {
            setFieldError(phoneWrapper, 'Informe seu telefone');
            isValid = false;
        } else if (digits.length < 10) {
            setFieldError(phoneWrapper, 'Telefone inválido');
            isValid = false;
        }

        if (!consentChecked) {
            setFieldError(consentWrapper, 'Consentimento obrigatório');
            isValid = false;
        }

        return isValid;
    };

    phoneInput.addEventListener('input', (event) => {
        event.target.value = applyPhoneMask(event.target.value);
        resetError();
    });

    ['nome', 'email', 'telefone'].forEach((fieldName) => {
        const input = form[fieldName];
        const wrapper = input.closest('.resultado-modal-form-field');

        input.addEventListener('input', () => {
            clearFieldError(wrapper);
            resetError();
        });
    });

    const consentInput = form.consentimento;
    consentInput.addEventListener('change', () => {
        if (consentInput.checked) {
            clearFieldError(consentWrapper);
            resetError();
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            showError('Corrija os campos destacados.');
            return;
        }

        resetError();
        showLoadingState();

        loadingTimeoutId = setTimeout(() => {
            showAssinarPlanoState();
        }, LOADING_DURATION);
    });
});
