document.addEventListener('DOMContentLoaded', () => {
    const loginCard = document.getElementById('loginCard');
    const switchBtns = document.querySelectorAll('.switch-btn');
    const progressDots = document.querySelectorAll('.progress-dot');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const forms = document.querySelectorAll('.login-form');

    let currentForm = 'signin';
    let isAnimating = false;

    function switchForm(target) {
        if (isAnimating || target === currentForm) return;
        isAnimating = true;

        const progressFrom = document.querySelector(`.progress-dot[data-form="${currentForm}"]`);
        const progressTo = document.querySelector(`.progress-dot[data-form="${target}"]`);

        progressFrom?.classList.remove('active');
        progressTo?.classList.add('active');

        if (target === 'signup') {
            loginCard.classList.add('is-flipped');
        } else {
            loginCard.classList.remove('is-flipped');
        }

        currentForm = target;

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    switchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            switchForm(target);
        });
    });

    progressDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = dot.dataset.form;
            switchForm(target);
        });
    });

    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.input-wrapper').querySelector('.form-input');
            const eyeOpen = btn.querySelector('.eye-open');
            const eyeClosed = btn.querySelector('.eye-closed');

            if (input.type === 'password') {
                input.type = 'text';
                eyeOpen?.classList.add('hidden');
                eyeClosed?.classList.remove('hidden');
            } else {
                input.type = 'password';
                eyeOpen?.classList.remove('hidden');
                eyeClosed?.classList.add('hidden');
            }
        });
    });

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formType = form.dataset.form;
            const submitBtn = form.querySelector('.submit-btn');

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                if (formType === 'signin') {
                    console.log('Sign In submitted');
                } else {
                    console.log('Sign Up submitted');
                }

                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                form.reset();
            }, 1500);
        });
    });
});
