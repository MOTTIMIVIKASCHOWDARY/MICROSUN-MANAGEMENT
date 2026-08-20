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

    // Helper: Local Database Operations
    function getUsersDB() {
        const raw = localStorage.getItem('microsun_users_db');
        if (!raw) {
            const defaultDB = {
                "9842109876": {
                    name: "Ramesh Kumar",
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

    function setCurrentSession(user) {
        if (!user) return;
        localStorage.setItem('microsun_current_user', JSON.stringify(user));
        localStorage.setItem('microsun_currentUser', JSON.stringify(user));
        if (user.name || user.fullName) localStorage.setItem('microsun_fullName', user.name || user.fullName);
        if (user.phone) {
            localStorage.setItem('microsun_mobileNumber', user.phone);
            localStorage.setItem('microsun_user_phone', user.phone);
            if (typeof saveUserToFirestore === 'function') {
                saveUserToFirestore(user.phone, user);
            }
        }
        if (user.farmSize) localStorage.setItem('microsun_farmSize', user.farmSize);
        if (user.role) localStorage.setItem('microsun_user_role', user.role);
        if (user.state) localStorage.setItem('microsun_state', user.state);
        if (user.upi) localStorage.setItem('microsun_upi_id', user.upi);
        localStorage.setItem('isLoggedIn', 'true');
    }

    // Sign In Submission Logic (Email Login)
    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('si-email');
            const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
            const pass = document.getElementById('si-pass').value.trim();

            if (siError) siError.style.display = 'none';

            if (!email || !pass) {
                showError(siError, 'Please enter your email address and password.');
                return;
            }

            const btn = signInForm.querySelector('button[type="submit"]');
            if (btn) btn.textContent = 'Authenticating with Firebase...';

            let userObj = null;

            // 1. Try Firebase Auth (Email/Password)
            if (typeof firebase !== 'undefined' && firebase.auth) {
                try {
                    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, pass);
                    const fbUser = userCredential.user;
                    console.log("🔥 Firebase Auth Success:", fbUser.email);
                    
                    // Fetch user document from Firestore
                    if (typeof db !== 'undefined' && db) {
                        try {
                            const querySnap = await db.collection('users').where('email', '==', email).limit(1).get();
                            if (!querySnap.empty) {
                                userObj = querySnap.docs[0].data();
                            }
                        } catch (err) {
                            console.warn("Firestore user query failed:", err.message);
                        }
                    }

                    if (!userObj) {
                        userObj = {
                            name: fbUser.displayName || email.split('@')[0],
                            email: fbUser.email,
                            phone: fbUser.phoneNumber || '9842109876',
                            role: 'Farmer',
                            farmSize: '12.5',
                            soilType: 'alluvial'
                        };
                    }
                } catch (authErr) {
                    console.warn("Firebase Auth attempt:", authErr.message);
                    // If error is wrong password or user not found, show message
                    if (authErr.code === 'auth/wrong-password' || authErr.code === 'auth/invalid-credential') {
                        showError(siError, 'Incorrect password. Please try again or click "Forgot Password?".');
                        if (btn) btn.textContent = 'Sign In with Email';
                        return;
                    } else if (authErr.code === 'auth/user-not-found') {
                        showError(siError, 'No account found with this email. Please create an account first.');
                        if (btn) btn.textContent = 'Sign In with Email';
                        return;
                    }
                }
            }

            // 2. Fallback to local browser database if offline
            if (!userObj) {
                const dbUsers = getUsersDB();
                for (const key in dbUsers) {
                    const u = dbUsers[key];
                    if ((u.email && u.email.toLowerCase() === email) || (u.phone && u.phone === email.replace(/\D/g, '').slice(-10))) {
                        if (u.password === pass) {
                            userObj = u;
                            break;
                        }
                    }
                }
            }

            if (!userObj) {
                showError(siError, 'Invalid email or password. Please check your credentials or click Sign Up.');
                if (btn) btn.textContent = 'Sign In with Email';
                return;
            }

            // Valid credentials
            setCurrentSession(userObj);
            if (btn) btn.textContent = 'Success! Opening App...';
            
            setTimeout(() => {
                window.location.href = 'main_hub.html';
            }, 350);
        });
    }

    // Sign Up Submission Logic (Mobile Number + Email + Password)
    if (signUpForm) {
        signUpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('su-name').value.trim();
            const rawPhone = document.getElementById('su-phone').value.trim();
            const emailInput = document.getElementById('su-email');
            const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
            const farm = document.getElementById('su-farm').value.trim();
            const soil = document.getElementById('su-soil').value;
            const pass = document.getElementById('su-pass').value.trim();
            const phone = rawPhone.replace(/\D/g, '').slice(-10);

            if (suError) suError.style.display = 'none';

            if (!name || !phone || !email || !pass) {
                showError(suError, 'Please fill in all required fields.');
                return;
            }

            if (phone.length < 10) {
                showError(suError, 'Please enter a valid 10-digit mobile number.');
                return;
            }

            if (pass.length < 6) {
                showError(suError, 'Password must be at least 6 characters long.');
                return;
            }

            const btn = signUpForm.querySelector('button[type="submit"]');
            if (btn) btn.textContent = 'Creating Firebase Account...';

            const newUser = {
                name,
                fullName: name,
                phone,
                email,
                farmSize: farm || "5.0",
                soilType: soil || "red",
                role: "Farmer",
                upi: `${phone}@upi`,
                password: pass,
                createdAt: new Date().toISOString()
            };

            // 1. Register with Firebase Authentication (Email/Password)
            if (typeof firebase !== 'undefined' && firebase.auth) {
                try {
                    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, pass);
                    if (userCredential.user) {
                        await userCredential.user.updateProfile({ displayName: name });
                    }
                    console.log("🔥 Firebase Auth user created successfully:", email);
                } catch (authErr) {
                    console.warn("Firebase Auth createUser warning:", authErr.message);
                    if (authErr.code === 'auth/email-already-in-use') {
                        showError(suError, 'An account with this email already exists. Please Sign In.');
                        if (btn) btn.textContent = 'Create Account';
                        return;
                    }
                }
            }

            // 2. Save to Firebase Cloud Firestore Database
            if (typeof db !== 'undefined' && db) {
                try {
                    if (btn) btn.textContent = 'Syncing Cloud Firestore...';
                    await db.collection('users').doc(phone).set(newUser, { merge: true });
                    console.log("☁️ User successfully registered to Firebase Firestore:", phone);
                } catch (err) {
                    console.warn("Could not save to Firebase Firestore:", err.message);
                }
            }

            // 3. Save locally as backup
            const dbUsers = getUsersDB();
            dbUsers[phone] = newUser;
            saveUserDB(dbUsers);

            setCurrentSession(newUser);
            if (btn) btn.textContent = 'Account Created! Redirecting...';

            setTimeout(() => {
                window.location.href = 'main_hub.html';
            }, 400);
        });
    }

    function showError(el, msg) {
        if (!el) return;
        el.textContent = msg;
        el.style.display = 'block';
        el.style.color = '#EF4444';
        el.style.fontSize = '0.9rem';
        el.style.marginTop = '10px';
    }

    // Language Selector Engine
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

    // Setup Real-Time Email Password Reset via Firebase Auth
    const forgotBtn = document.querySelector('.forgot-pass');
    const modal = document.getElementById('forgotPassModal');
    const closeBtn = document.getElementById('closeForgotModal');
    const fpForm = document.getElementById('forgotPassEmailForm');
    const fpEmailInput = document.getElementById('fp-email');
    const fpSuccess = document.getElementById('fp-success-msg');
    const fpError = document.getElementById('fp-error-msg');
    const btnSendReset = document.getElementById('btnSendResetEmail');

    if (forgotBtn && modal) {
        forgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            if (fpSuccess) fpSuccess.style.display = 'none';
            if (fpError) fpError.style.display = 'none';
            if (btnSendReset) btnSendReset.textContent = 'Send Password Reset Link';
            if (fpEmailInput) {
                const siEmail = document.getElementById('si-email');
                if (siEmail && siEmail.value) fpEmailInput.value = siEmail.value.trim();
            }
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (fpForm) {
        fpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = fpEmailInput ? fpEmailInput.value.trim().toLowerCase() : '';
            if (!email) return;

            if (fpError) fpError.style.display = 'none';
            if (fpSuccess) fpSuccess.style.display = 'none';
            if (btnSendReset) btnSendReset.textContent = 'Sending Reset Link in Real-Time...';

            if (typeof firebase !== 'undefined' && firebase.auth) {
                try {
                    await firebase.auth().sendPasswordResetEmail(email);
                    console.log("⚡ Real-time password reset email sent successfully to:", email);
                    if (fpSuccess) fpSuccess.style.display = 'block';
                    if (btnSendReset) btnSendReset.textContent = 'Reset Link Sent to Email!';
                } catch (err) {
                    console.error("Password reset error:", err);
                    let msg = err.message;
                    if (err.code === 'auth/user-not-found') {
                        msg = 'No account found with this email address. Please check spelling or create an account.';
                    } else if (err.code === 'auth/invalid-email') {
                        msg = 'Please enter a valid email address.';
                    }
                    if (fpError) {
                        fpError.textContent = msg;
                        fpError.style.display = 'block';
                    }
                    if (btnSendReset) btnSendReset.textContent = 'Send Password Reset Link';
                }
            } else {
                if (fpError) {
                    fpError.textContent = 'Connecting to Firebase Authentication... Please check your internet connection.';
                    fpError.style.display = 'block';
                }
                if (btnSendReset) btnSendReset.textContent = 'Send Password Reset Link';
            }
        });
    }

    // Universal 3-Bar Sidebar Hamburger Menu Controller (Delegated & Fail-Safe)
    document.addEventListener('click', function(e) {
        const toggleBtn = e.target.closest('#menuToggle, .hamburger-btn');
        if (toggleBtn) {
            e.preventDefault();
            e.stopPropagation();

            const sidebar = document.getElementById('mainSidebar') || document.querySelector('.sidebar');
            let overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'sidebarOverlay';
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
            }

            if (sidebar) {
                const isOpening = !sidebar.classList.contains('open');
                toggleBtn.classList.toggle('open', isOpening);
                sidebar.classList.toggle('open', isOpening);
                if (overlay) overlay.classList.toggle('open', isOpening);
            }
        } else if (e.target.closest('#sidebarOverlay, .sidebar-overlay')) {
            const sidebar = document.getElementById('mainSidebar') || document.querySelector('.sidebar');
            const toggleBtn = document.getElementById('menuToggle') || document.querySelector('.hamburger-btn');
            const overlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

            if (sidebar) sidebar.classList.remove('open');
            if (toggleBtn) toggleBtn.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
        } else {
            const menuItem = e.target.closest('.menu-item, .submenu-item');
            if (menuItem) {
                const onclickAttr = menuItem.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes('window.location.href')) {
                    const match = onclickAttr.match(/window\.location\.href\s*=\s*'([^']+)'/);
                    if (match && match[1]) {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = match[1];
                    }
                }
            }
        }
    });

    // Universal Back Button Controller
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
