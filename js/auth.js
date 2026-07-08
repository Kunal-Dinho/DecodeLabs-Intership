/* ============================================
   NTESHIP — Auth JavaScript
   Login & Registration form validation,
   password toggle, password strength indicator
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /* ============ PASSWORD TOGGLE VISIBILITY ============ */
    document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.input-wrapper').querySelector('input');
            if (!input) return;

            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');

            // Toggle eye icon
            const icon = this.querySelector('svg');
            if (icon) {
                if (isPassword) {
                    icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>';
                } else {
                    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
                }
            }
        });
    });

    /* ============ PASSWORD STRENGTH INDICATOR ============ */
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const strengthBars = input.closest('.form-group')?.querySelectorAll('.strength-bar');
        const strengthText = input.closest('.form-group')?.querySelector('.strength-text');

        if (!strengthBars) return;

        input.addEventListener('input', function() {
            const value = this.value;
            let strength = 0;

            if (value.length >= 6) strength++;
            if (value.length >= 10) strength++;
            if (/[A-Z]/.test(value)) strength++;
            if (/[0-9]/.test(value)) strength++;
            if (/[^A-Za-z0-9]/.test(value)) strength++;

            // Reset all bars
            strengthBars.forEach(bar => {
                bar.className = 'strength-bar';
            });

            if (value.length === 0) {
                if (strengthText) strengthText.textContent = '';
                return;
            }

            // Set strength bars
            if (strength <= 2) {
                strengthBars.forEach((bar, i) => {
                    if (i < 1) bar.classList.add('weak');
                });
                if (strengthText) {
                    strengthText.textContent = 'Weak';
                    strengthText.style.color = 'var(--error)';
                }
            } else if (strength <= 3) {
                strengthBars.forEach((bar, i) => {
                    if (i < 2) bar.classList.add('medium');
                });
                if (strengthText) {
                    strengthText.textContent = 'Medium';
                    strengthText.style.color = 'var(--warning)';
                }
            } else if (strength <= 4) {
                strengthBars.forEach((bar, i) => {
                    if (i < 3) bar.classList.add('strong');
                });
                if (strengthText) {
                    strengthText.textContent = 'Strong';
                    strengthText.style.color = 'var(--success)';
                }
            } else {
                strengthBars.forEach(bar => bar.classList.add('strong'));
                if (strengthText) {
                    strengthText.textContent = 'Very Strong';
                    strengthText.style.color = 'var(--success)';
                }
            }
        });
    });

    /* ============ CONFIRM PASSWORD MATCH ============ */
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        const password = document.getElementById('reg-password');
        const confirm = document.getElementById('reg-confirm');
        const confirmError = document.getElementById('confirm-error');

        if (confirm && password) {
            confirm.addEventListener('input', function() {
                if (this.value && this.value !== password.value) {
                    this.classList.add('error');
                    if (confirmError) confirmError.textContent = 'Passwords do not match';
                } else {
                    this.classList.remove('error');
                    if (confirmError) confirmError.textContent = '';
                }
            });

            password.addEventListener('input', function() {
                if (confirm.value && confirm.value !== this.value) {
                    confirm.classList.add('error');
                    if (confirmError) confirmError.textContent = 'Passwords do not match';
                } else if (confirm.value) {
                    confirm.classList.remove('error');
                    if (confirmError) confirmError.textContent = '';
                }
            });
        }
    }

    /* ============ LOGIN FORM VALIDATION ============ */
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        const emailError = document.getElementById('login-email-error');
        const passwordError = document.getElementById('login-password-error');

        function validateEmail() {
            const value = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                emailInput.classList.add('error');
                emailError.textContent = 'Email is required';
                return false;
            }
            if (!emailRegex.test(value)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email';
                return false;
            }
            emailInput.classList.remove('error');
            emailError.textContent = '';
            return true;
        }

        function validatePassword() {
            const value = passwordInput.value.trim();
            if (!value) {
                passwordInput.classList.add('error');
                passwordError.textContent = 'Password is required';
                return false;
            }
            if (value.length < 6) {
                passwordInput.classList.add('error');
                passwordError.textContent = 'Password must be at least 6 characters';
                return false;
            }
            passwordInput.classList.remove('error');
            passwordError.textContent = '';
            return true;
        }

        emailInput.addEventListener('blur', validateEmail);
        passwordInput.addEventListener('blur', validatePassword);

        [emailInput, passwordInput].forEach(input => {
            input.addEventListener('focus', () => {
                input.classList.remove('error');
                const errorEl = document.getElementById(input.id + '-error');
                if (errorEl) errorEl.textContent = '';
            });
        });

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();

            if (isEmailValid && isPasswordValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Logging in...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Show success
                    const formContent = this.querySelector('.auth-form-fields');
                    const successMsg = this.querySelector('.auth-success');
                    if (formContent) formContent.style.display = 'none';
                    if (successMsg) successMsg.classList.add('show');

                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    /* ============ REGISTER FORM VALIDATION ============ */
    if (registerForm) {
        const nameInput = document.getElementById('reg-name');
        const emailInput = document.getElementById('reg-email');
        const passwordInput = document.getElementById('reg-password');
        const confirmInput = document.getElementById('reg-confirm');
        const termsCheck = document.getElementById('reg-terms');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('reg-email-error');
        const passwordError = document.getElementById('reg-password-error');
        const confirmError = document.getElementById('confirm-error');
        const termsError = document.getElementById('terms-error');

        function validateName() {
            const value = nameInput.value.trim();
            if (value.length < 2) {
                nameInput.classList.add('error');
                nameError.textContent = 'Name must be at least 2 characters';
                return false;
            }
            nameInput.classList.remove('error');
            nameError.textContent = '';
            return true;
        }

        function validateEmail() {
            const value = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                emailInput.classList.add('error');
                emailError.textContent = 'Email is required';
                return false;
            }
            if (!emailRegex.test(value)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email';
                return false;
            }
            emailInput.classList.remove('error');
            emailError.textContent = '';
            return true;
        }

        function validatePassword() {
            const value = passwordInput.value.trim();
            if (value.length < 6) {
                passwordInput.classList.add('error');
                passwordError.textContent = 'Password must be at least 6 characters';
                return false;
            }
            passwordInput.classList.remove('error');
            passwordError.textContent = '';
            return true;
        }

        function validateConfirm() {
            if (!confirmInput.value) {
                confirmInput.classList.add('error');
                confirmError.textContent = 'Please confirm your password';
                return false;
            }
            if (confirmInput.value !== passwordInput.value) {
                confirmInput.classList.add('error');
                confirmError.textContent = 'Passwords do not match';
                return false;
            }
            confirmInput.classList.remove('error');
            confirmError.textContent = '';
            return true;
        }

        function validateTerms() {
            if (!termsCheck.checked) {
                termsError.textContent = 'You must agree to the terms';
                return false;
            }
            termsError.textContent = '';
            return true;
        }

        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        passwordInput.addEventListener('blur', validatePassword);
        confirmInput.addEventListener('blur', validateConfirm);
        termsCheck.addEventListener('change', validateTerms);

        [nameInput, emailInput, passwordInput, confirmInput].forEach(input => {
            input.addEventListener('focus', () => {
                input.classList.remove('error');
                const errorEl = document.getElementById(input.id + '-error') || 
                    document.getElementById(input.id.replace('reg-', '') + '-error');
                if (errorEl) errorEl.textContent = '';
            });
        });

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isConfirmValid = validateConfirm();
            const isTermsValid = validateTerms();

            if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Creating account...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    const formContent = this.querySelector('.auth-form-fields');
                    const successMsg = this.querySelector('.auth-success');
                    if (formContent) formContent.style.display = 'none';
                    if (successMsg) successMsg.classList.add('show');

                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    /* ============ DARK MODE SYNC ============ */
    const storedTheme = localStorage.getItem('nteship-theme');
    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    function handleThemeToggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const theme = current === 'dark' ? 'light' : 'dark';
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('nteship-theme', theme);
    }

    // Support both auth pages (#auth-theme-toggle) and main site (#dark-toggle)
    const authToggle = document.getElementById('auth-theme-toggle');
    const mainToggle = document.getElementById('dark-toggle');
    if (authToggle) authToggle.addEventListener('click', handleThemeToggle);
    if (mainToggle) mainToggle.addEventListener('click', handleThemeToggle);
});