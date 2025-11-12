document.addEventListener("DOMContentLoaded", function () {
    const modalTrigger = document.getElementById("resultadoModalTrigger");
    const modalOverlay = document.getElementById("resultadoModalOverlay");
    const modalClose = document.getElementById("resultadoModalClose");
    const modalContent = document.getElementById("resultadoModalContent");
    const phoneInput = document.getElementById("resultadoModalTelefone");
    const form = document.getElementById("resultadoForm");
    const errorMessage = document.getElementById("resultadoModalError");
    const formWrapper = document.getElementById("resultadoModalFormWrapper");
    const loadingWrapper = document.getElementById(
        "resultadoModalLoadingWrapper"
    );
    const assinarPlanoWrapper = document.getElementById(
        "resultadoModalAssinarPlano"
    );
    const assinarPlanoButtons = document.querySelectorAll(
        ".resultado-plano-card-assinatura-button"
    );
    const nameField = form.querySelector("#resultadoModalNome");
    const emailField = form.querySelector("#resultadoModalEmail");
    const phoneField = form.querySelector("#resultadoModalTelefone");
    const consentField = form.querySelector("#resultadoConsentimento");
    const nameWrapper = nameField.closest(".resultado-modal-form-field");
    const emailWrapper = emailField.closest(".resultado-modal-form-field");
    const phoneWrapper = phoneField.closest(".resultado-modal-form-field");
    const consentWrapper = consentField.closest(".resultado-modal-form-field");

    // Numero aleatorio entre 5 e 10 segundos
    const LOADING_DURATION = Math.floor(Math.random() * 5000) + 5000;

    let loadingTimeoutId;

    function setVisibility(element, shouldShow) {
        if (shouldShow) {
            element.classList.add("is-visible");
            element.setAttribute("aria-hidden", "false");
        } else {
            element.classList.remove("is-visible");
            element.setAttribute("aria-hidden", "true");
        }
    }

    function showFormState() {
        setVisibility(formWrapper, true);
        setVisibility(loadingWrapper, false);
        setVisibility(assinarPlanoWrapper, false);
    }

    function showLoadingState() {
        setVisibility(formWrapper, false);
        setVisibility(loadingWrapper, true);
        setVisibility(assinarPlanoWrapper, false);
    }

    function showAssinarPlanoState() {
        setVisibility(formWrapper, false);
        setVisibility(loadingWrapper, false);
        setVisibility(assinarPlanoWrapper, true);
    }

    function showError(message) {
        errorMessage.textContent = message;
    }

    function resetError() {
        errorMessage.textContent = "";
    }

    function applyPhoneMask(value) {
        const digits = value.replace(/\D/g, "").slice(0, 11);

        if (digits.length <= 2) {
            return digits;
        }

        if (digits.length <= 6) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        }

        if (digits.length <= 10) {
            return (
                `(${digits.slice(0, 2)}) ` +
                `${digits.slice(2, 6)}-` +
                `${digits.slice(6)}`
            );
        }

        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
            7
        )}`;
    }

    function setFieldError(wrapper, message) {
        wrapper.classList.add("is-invalid");
        wrapper.dataset.error = message;
    }

    function clearFieldError(wrapper) {
        wrapper.classList.remove("is-invalid");
        delete wrapper.dataset.error;
    }

    function clearAllFieldErrors() {
        [
            nameWrapper,
            emailWrapper,
            phoneWrapper,
            consentWrapper
        ].forEach(clearFieldError);
    }

    function resetModalState() {
        form.reset();
        resetError();
        clearAllFieldErrors();
        showFormState();
    }

    function openModal() {
        resetModalState();
        setVisibility(modalOverlay, true);
    }

    function closeModal() {
        clearTimeout(loadingTimeoutId);
        setVisibility(modalOverlay, false);
    }

    function handleModalContentClick(event) {
        event.stopPropagation();
    }

    function handleAssinarPlanoClick() {
        window.alert("serviço indisponivel. Tente novamente mais tarde");
    }

    function validateForm() {
        let isValid = true;
        clearAllFieldErrors();

        const nomeValue = form.nome.value.trim();
        const emailValue = form.email.value.trim();
        const phoneValue = form.telefone.value.trim();
        const consentChecked = form.consentimento.checked;

        if (!nomeValue) {
            setFieldError(nameWrapper, "Informe seu nome");
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            setFieldError(emailWrapper, "Informe seu email");
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            setFieldError(emailWrapper, "Email inválido");
            isValid = false;
        }

        const digits = phoneValue.replace(/\D/g, "");
        if (!phoneValue) {
            setFieldError(phoneWrapper, "Informe seu telefone");
            isValid = false;
        } else if (digits.length < 10) {
            setFieldError(phoneWrapper, "Telefone inválido");
            isValid = false;
        }

        if (!consentChecked) {
            setFieldError(consentWrapper, "Consentimento obrigatório");
            isValid = false;
        }

        return isValid;
    }

    function handlePhoneInput(event) {
        event.target.value = applyPhoneMask(event.target.value);
        resetError();
    }

    function handleFieldInput(event) {
        const currentField = event.currentTarget;
        const fieldWrapper = currentField.closest(
            ".resultado-modal-form-field"
        );
        if (fieldWrapper) {
            clearFieldError(fieldWrapper);
        }
        resetError();
    }

    function handleConsentChange(event) {
        if (event.currentTarget.checked) {
            clearFieldError(consentWrapper);
            resetError();
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            showError("Corrija os campos destacados.");
            return;
        }

        resetError();
        showLoadingState();

        loadingTimeoutId = setTimeout(function () {
            showAssinarPlanoState();
        }, LOADING_DURATION);
    }

    modalTrigger.addEventListener("click", openModal);
    modalClose.addEventListener("click", closeModal);
    modalContent.addEventListener("click", handleModalContentClick);
    modalOverlay.addEventListener("click", closeModal);
    assinarPlanoButtons.forEach(function (button) {
        button.addEventListener("click", handleAssinarPlanoClick);
    });
    phoneInput.addEventListener("input", handlePhoneInput);
    form.nome.addEventListener("input", handleFieldInput);
    form.email.addEventListener("input", handleFieldInput);
    form.telefone.addEventListener("input", handleFieldInput);
    form.consentimento.addEventListener("change", handleConsentChange);
    form.addEventListener("submit", handleFormSubmit);
});
