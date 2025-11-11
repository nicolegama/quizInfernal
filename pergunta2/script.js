document.addEventListener('DOMContentLoaded', function() {

    const adOverlay = document.getElementById('ad-overlay');
    const adModal = document.getElementById('ad-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const quizOptions = document.querySelectorAll('.option');
    const quizForm = document.getElementById('quiz-form');
    const nextBtn = document.getElementById('next-question-btn');
    
    let canTriggerClickAd = true;
    const adCooldown = 20000; 
    
    function showAnnoyingAd() {
        adOverlay.classList.add('active');
        adModal.classList.add('active');
    }

    function hideAnnoyingAd() {
        adOverlay.classList.remove('active');
        adModal.classList.remove('active');
    }

    setTimeout(showAnnoyingAd, 1500);

    closeModalBtn.addEventListener('click', function(event) {
        event.stopPropagation(); 
        hideAnnoyingAd();
    });

  
    quizOptions.forEach(option => {
        option.addEventListener('click', function(event) {
            event.stopPropagation();

            if (adModal.classList.contains('active')) return;

            if (this.classList.contains('quiz-option-ad')) {
                const adHref = this.dataset.href;
                if (adHref) window.open(adHref, '_blank');
                return; 
            }

            if (canTriggerClickAd) {
                canTriggerClickAd = false; 
                window.open('https://example.com/fake-ad-simulation', '_blank');

                setTimeout(() => { canTriggerClickAd = true; }, adCooldown);

            } else {
                quizOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                const radioInput = this.querySelector('input[type="radio"]');
                if (radioInput) {
                    radioInput.checked = true;
                    
                    localStorage.setItem('question-2-answer', radioInput.value);
                    
                    nextBtn.disabled = false;
                }
            }
        });
    });

    document.documentElement.addEventListener('click', function(event) {
        if (adModal.classList.contains('active')) {
            return;
        }
        
        if (canTriggerClickAd) {
            canTriggerClickAd = false; 
            window.open('https://example.com/fake-ad-simulation', '_blank');
            
            setTimeout(function() {
                canTriggerClickAd = true;
            }, adCooldown);
        }
    });

    quizForm.addEventListener('submit', function(event) {
        const selectedOption = document.querySelector('input[name="recheio"]:checked');
        
        if (!selectedOption) {
            event.preventDefault(); 
            alert("Você precisa escolher um recheio para continuar!");
        }
    });
});