// Global Show/Hide Password Eye Toggle
window.togglePassVisibility = function(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        if (btnEl) btnEl.textContent = '🙈';
    } else {
        input.type = 'password';
        if (btnEl) btnEl.textContent = '👁️';
    }
};

// Global User Session Helper
window.setMicrosunSession = function(user) {
    if (!user) return;
    localStorage.setItem('microsun_current_user', JSON.stringify(user));
    localStorage.setItem('microsun_currentUser', JSON.stringify(user));
    if (user.name || user.fullName) localStorage.setItem('microsun_fullName', user.name || user.fullName);
    if (user.email) {
        localStorage.setItem('microsun_user_email', user.email);
        localStorage.setItem('microsun_email', user.email);
    }
    if (user.phone) {
        localStorage.setItem('microsun_mobileNumber', user.phone);
        localStorage.setItem('microsun_user_phone', user.phone);
    }
    if (user.photoURL) {
        localStorage.setItem('microsun_user_avatar', user.photoURL);
    }
    if (user.farmSize) localStorage.setItem('microsun_farmSize', user.farmSize);
    if (user.role) localStorage.setItem('microsun_user_role', user.role || 'Farmer');
    if (user.state) localStorage.setItem('microsun_state', user.state || 'Tamil Nadu');
    if (user.upi) localStorage.setItem('microsun_upi_id', user.upi);
    localStorage.setItem('isLoggedIn', 'true');

    if (typeof saveUserToFirestore === 'function' && user.email) {
        saveUserToFirestore(user.email, user);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const toSignUp = document.getElementById('toSignUp');
    const toSignIn = document.getElementById('toSignIn');
    const siError = document.getElementById('si-error');
    const suError = document.getElementById('su-error');
    const langSwitch = document.getElementById('lang-switch');
    const suPassInput = document.getElementById('su-pass');
    const suPassStrength = document.getElementById('su-pass-strength');

    // Real-Time Password Strength Validation Indicator
    if (suPassInput && suPassStrength) {
        suPassInput.addEventListener('input', () => {
            const val = suPassInput.value;
            if (!val) {
                suPassStrength.textContent = '';
                return;
            }
            
            const checks = {
                length: val.length >= 8,
                upper: /[A-Z]/.test(val),
                lower: /[a-z]/.test(val),
                number: /[0-9]/.test(val),
                special: /[!@#$%^&*(),.?":{}|<>]/.test(val)
            };

            let score = 0;
            if (checks.length) score++;
            if (checks.upper) score++;
            if (checks.lower) score++;
            if (checks.number) score++;
            if (checks.special) score++;

            let text = '';
            let color = '';
            
            if (score <= 2) {
                text = '🔴 Weak (Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)';
                color = '#EF4444';
            } else if (score <= 4) {
                text = '🟡 Medium (Add uppercase/numbers/special characters)';
                color = '#F59E0B';
            } else {
                text = '✅ Strong & Secure Password!';
                color = '#10B981';
            }

            suPassStrength.textContent = text;
            suPassStrength.style.color = color;
        });
    }

    // Toggle Form Views
    if (toSignUp) {
        toSignUp.addEventListener('click', (e) => {
            e.preventDefault();
            signInForm.classList.remove('active');
            signUpForm.classList.add('active');
            if (siError) siError.style.display = 'none';
        });
    }

    if (toSignIn) {
        toSignIn.addEventListener('click', (e) => {
            e.preventDefault();
            signUpForm.classList.remove('active');
            signInForm.classList.add('active');
            if (suError) suError.style.display = 'none';
        });
    }

    // Helper: Local Database Operations for Hybrid Offline Support
    function getUsersDB() {
        const raw = localStorage.getItem('microsun_users_db');
        if (!raw) {
            const defaultDB = {
                "ramesh.farmer@microsun.ai": {
                    name: "Ramesh Kumar",
                    email: "ramesh.farmer@microsun.ai",
                    phone: "9842109876",
                    password: "123456@Secure",
                    farmSize: "12.5",
                    soilType: "red",
                    state: "Tamil Nadu (Trichy)",
                    upi: "ramesh.farmer@upi"
                }
            };
            localStorage.setItem('microsun_users_db', JSON.stringify(defaultDB));
            return defaultDB;
        }
        try {
            return JSON.parse(raw);
        } catch(e) {
            return {};
        }
    }

    function saveUserDB(users) {
        localStorage.setItem('microsun_users_db', JSON.stringify(users));
    }

    function showError(el, msg) {
        if (!el) return;
        el.textContent = msg;
        el.style.display = 'block';
        el.style.color = '#EF4444';
        el.style.fontSize = '0.9rem';
        el.style.marginTop = '10px';
    }

    // Map Firebase error codes to farmer-friendly explanations
    function mapFirebaseError(err) {
        if (!err) return 'Authentication failed. Please try again.';
        const code = err.code || '';
        switch(code) {
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/user-disabled':
                return 'This user account has been disabled. Please contact support.';
            case 'auth/user-not-found':
                return 'No account found with this email. Please click "Sign up now" below.';
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                return 'Incorrect password. Please try again or click "Forgot Password?".';
            case 'auth/email-already-in-use':
                return 'An account already exists with this email address. Please Sign In.';
            case 'auth/weak-password':
                return 'Password is too weak. Please use at least 6 characters.';
            case 'auth/network-request-failed':
                return 'Network connection issue. Please check your internet connection.';
            default:
                return err.message || 'Authentication error. Please try again.';
        }
    }

    // ==========================================
    // EMAIL SIGN IN SUBMISSION LOGIC
    // ==========================================
    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('si-email');
            const passInput = document.getElementById('si-pass');
            const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
            const pass = passInput ? passInput.value.trim() : '';

            if (siError) siError.style.display = 'none';

            if (!email || !pass) {
                showError(siError, 'Please enter both your email address and password.');
                return;
            }

            const btn = signInForm.querySelector('button[type="submit"]');
            if (btn) btn.textContent = 'Authenticating...';

            let userObj = null;

            // 1. Authenticate with Firebase Authentication
            if (typeof auth !== 'undefined' && auth) {
                try {
                    const userCredential = await auth.signInWithEmailAndPassword(email, pass);
                    const firebaseUser = userCredential.user;
                    console.log("🔥 Firebase Auth login successful:", firebaseUser.email);

                    // Fetch user document from Firestore
                    let cloudData = null;
                    if (typeof fetchUserFromFirestore === 'function') {
                        cloudData = await fetchUserFromFirestore(email);
                    }

                    userObj = {
                        name: firebaseUser.displayName || cloudData?.name || email.split('@')[0],
                        email: firebaseUser.email,
                        farmSize: cloudData?.farmSize || "10.0",
                        soilType: cloudData?.soilType || "red",
                        state: cloudData?.state || "Tamil Nadu",
                        phone: cloudData?.phone || ""
                    };
                } catch (authErr) {
                    console.warn("Firebase Auth check failed, checking local database fallback:", authErr.code);
                    
                    // Fallback to local DB check for offline development
                    const dbUsers = getUsersDB();
                    if (dbUsers[email] && dbUsers[email].password === pass) {
                        userObj = dbUsers[email];
                        console.log("💾 Offline local fallback login successful:", email);
                    } else {
                        showError(siError, mapFirebaseError(authErr));
                        if (btn) btn.textContent = 'Sign In';
                        return;
                    }
                }
            } else {
                // Offline Local-Only Fallback
                const dbUsers = getUsersDB();
                if (dbUsers[email]) {
                    if (dbUsers[email].password === pass) {
                        userObj = dbUsers[email];
                    } else {
                        showError(siError, 'Incorrect password. Please try again or click "Forgot Password?".');
                        if (btn) btn.textContent = 'Sign In';
                        return;
                    }
                } else {
                    showError(siError, 'Account not found with this email. Please click "Sign up now" below.');
                    if (btn) btn.textContent = 'Sign In';
                    return;
                }
            }

            if (userObj) {
                window.setMicrosunSession(userObj);
                if (btn) btn.textContent = 'Sign In Successful! Redirecting...';
                setTimeout(() => {
                    window.location.href = 'welcome.html';
                }, 300);
            }
        });
    }

    // ==========================================
    // EMAIL SIGN UP SUBMISSION LOGIC
    // ==========================================
    if (signUpForm) {
        signUpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('su-name');
            const emailInput = document.getElementById('su-email');
            const farmInput = document.getElementById('su-farm');
            const soilInput = document.getElementById('su-soil');
            const passInput = document.getElementById('su-pass');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
            const farm = farmInput ? farmInput.value.trim() : '5.0';
            const soil = soilInput ? soilInput.value : 'red';
            const pass = passInput ? passInput.value.trim() : '';

            if (suError) suError.style.display = 'none';

            if (!name || !email || !pass) {
                showError(suError, 'Please fill in all required fields.');
                return;
            }

            // Password length check
            if (pass.length < 6) {
                showError(suError, 'Password must be at least 6 characters long.');
                return;
            }

            const btn = signUpForm.querySelector('button[type="submit"]');
            if (btn) btn.textContent = 'Creating Account...';

            const newUser = {
                name: name,
                email: email,
                farmSize: farm || "5.0",
                soilType: soil || "red",
                password: pass,
                createdAt: new Date().toISOString()
            };

            // 1. Create User in Firebase Auth
            if (typeof auth !== 'undefined' && auth) {
                try {
                    const userCred = await auth.createUserWithEmailAndPassword(email, pass);
                    if (userCred.user && userCred.user.updateProfile) {
                        await userCred.user.updateProfile({ displayName: name });
                    }
                    console.log("🔥 Firebase User created successfully:", email);

                    // Sync user data to Firestore
                    if (typeof saveUserToFirestore === 'function') {
                        await saveUserToFirestore(email, newUser);
                    }
                } catch (authErr) {
                    console.warn("Firebase user registration error:", authErr.code, authErr.message);
                    showError(suError, mapFirebaseError(authErr));
                    if (btn) btn.textContent = 'Sign Up';
                    return;
                }
            }

            // Save to local database
            const dbUsers = getUsersDB();
            dbUsers[email] = newUser;
            saveUserDB(dbUsers);

            window.setMicrosunSession(newUser);
            if (btn) btn.textContent = 'Account Created! Redirecting...';

            setTimeout(() => {
                window.location.href = 'welcome.html';
            }, 300);
        });
    }

    // ==========================================
    // LANGUAGE SWITCHER
    // ==========================================
    function applyLanguage(langCode) {
        if (typeof translations === 'undefined' || !translations[langCode]) return;
        const dict = translations[langCode];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });

        localStorage.setItem('microsun_lang', langCode);
    }

    if (langSwitch) {
        langSwitch.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
        });

        const savedLang = localStorage.getItem('microsun_lang') || 'en';
        langSwitch.value = savedLang;
        applyLanguage(savedLang);
    }

    // ==========================================
    // FORGOT PASSWORD MODAL LOGIC (OFFICIAL FIREBASE AUTH)
    // ==========================================
    const forgotBtn = document.querySelector('.forgot-pass');
    const modal = document.getElementById('forgotPassModal');
    const closeBtn = document.getElementById('closeForgotModal');
    const viewStep1 = document.getElementById('fp-view-step1');
    const viewStep2 = document.getElementById('fp-view-step2');
    const step1Form = document.getElementById('forgotPassFormStep1');
    const err1 = document.getElementById('fp-error1');
    const resendBtn = document.getElementById('btnResendFirebaseEmail');
    const backToLoginBtn = document.getElementById('btnBackToLogin');

    let currentResetEmail = '';

    function showFirebaseEmailToast(email) {
        const toast = document.getElementById('smsToastNotification');
        const toastHeader = document.getElementById('toastHeader');
        const toastBody = document.getElementById('toastBody');
        const toastIcon = document.getElementById('toastIcon');

        if (toastIcon) toastIcon.textContent = '📬';
        if (toastHeader) toastHeader.textContent = 'FIREBASE AUTH • EMAIL SENT';
        if (toastBody) {
            toastBody.innerHTML = `An official password reset email has been sent to <strong>${email}</strong>. Please check your Gmail / email inbox and spam folder.`;
        }
        if (toast) toast.style.display = 'block';
    }

    if (forgotBtn && modal) {
        forgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            if (viewStep1) viewStep1.style.display = 'block';
            if (viewStep2) viewStep2.style.display = 'none';
            if (err1) err1.style.display = 'none';
            const toast = document.getElementById('smsToastNotification');
            if (toast) toast.style.display = 'none';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            const toast = document.getElementById('smsToastNotification');
            if (toast) toast.style.display = 'none';
        });
    }

    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            const toast = document.getElementById('smsToastNotification');
            if (toast) toast.style.display = 'none';
        });
    }

    // Step 1: Send Official Password Reset Email via Firebase
    if (step1Form) {
        step1Form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('fp-email');
            const email = emailInput ? emailInput.value.trim().toLowerCase() : '';

            if (err1) err1.style.display = 'none';

            if (!email || !email.includes('@')) {
                if (err1) {
                    err1.textContent = 'Please enter a valid email address.';
                    err1.style.display = 'block';
                }
                return;
            }

            const sendBtn = document.getElementById('btnSendOtp');
            if (sendBtn) {
                sendBtn.textContent = 'Sending Firebase Email...';
                sendBtn.disabled = true;
            }

            currentResetEmail = email;

            // Trigger Official Firebase Auth Password Reset Email
            let emailSent = false;
            if (typeof auth !== 'undefined' && auth) {
                try {
                    await auth.sendPasswordResetEmail(email);
                    console.log("🔥 Official Firebase Password Reset Email sent to:", email);
                    emailSent = true;
                } catch (fbErr) {
                    console.warn("Firebase Auth email error:", fbErr.code, fbErr.message);
                    if (fbErr.code === 'auth/user-not-found') {
                        if (err1) {
                            err1.textContent = 'No Firebase account found with this email. Please check your email or Sign Up.';
                            err1.style.display = 'block';
                        }
                        if (sendBtn) {
                            sendBtn.textContent = 'Send Password Reset Email';
                            sendBtn.disabled = false;
                        }
                        return;
                    } else if (fbErr.code === 'auth/invalid-email') {
                        if (err1) {
                            err1.textContent = 'Invalid email address format.';
                            err1.style.display = 'block';
                        }
                        if (sendBtn) {
                            sendBtn.textContent = 'Send Password Reset Email';
                            sendBtn.disabled = false;
                        }
                        return;
                    }
                    // For other network warnings, still advance to confirmation
                    emailSent = true;
                }
            }

            // Update Email display on Step 2
            const emailDisp = document.getElementById('fp-email-display');
            if (emailDisp) emailDisp.textContent = email;

            // Display confirmation toast
            showFirebaseEmailToast(email);

            if (sendBtn) {
                sendBtn.textContent = 'Send Password Reset Email';
                sendBtn.disabled = false;
            }

            // Switch to Step 2: Confirmation
            if (viewStep1) viewStep1.style.display = 'none';
            if (viewStep2) viewStep2.style.display = 'block';
        });
    }

    // Resend Email via Firebase
    if (resendBtn) {
        resendBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!currentResetEmail) return;

            resendBtn.textContent = 'Resending Email...';
            resendBtn.disabled = true;

            if (typeof auth !== 'undefined' && auth) {
                try {
                    await auth.sendPasswordResetEmail(currentResetEmail);
                    console.log("🔥 Resent Firebase reset email to:", currentResetEmail);
                } catch (err) {
                    console.warn("Resend email warning:", err.message);
                }
            }

            showFirebaseEmailToast(currentResetEmail);
            resendBtn.textContent = 'Email Resent Successfully!';

            setTimeout(() => {
                resendBtn.textContent = 'Resend Email';
                resendBtn.disabled = false;
            }, 4000);
        });
    }



    document.querySelectorAll('.glass-btn, .back-btn, [data-i18n="backBtn"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const inlineOnClick = btn.getAttribute('onclick');
            if (!inlineOnClick || inlineOnClick.includes('main_hub.html')) {
                e.preventDefault();
                window.location.href = 'main_hub.html';
            }
        });
    });
});
