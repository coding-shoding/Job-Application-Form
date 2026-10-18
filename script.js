document.addEventListener("DOMContentLoaded", function () {

    /* ============ ELEMENT REFERENCES ============ */

    const registrationContainer = document.getElementById("registration-container");
    const jobformContainer = document.getElementById("jobform-container");

    const registrationForm = document.getElementById("registrationform");
    const jobApplicationForm = document.getElementById("jobapplicationform");

    /* ============ PASSWORD SHOW/HIDE TOGGLE ============ */

    const eyeIcons = document.querySelectorAll(".toggle-eye");

    eyeIcons.forEach(function (icon) {
        icon.addEventListener("click", function () {
            const targetId = icon.getAttribute("data-target");
            const targetInput = document.getElementById(targetId);

            if (targetInput.type === "password") {
                targetInput.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                targetInput.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        });
    });

    /* ============ HELPER FUNCTIONS ============ */

    function showError(inputEl, errorEl, message) {
        errorEl.textContent = message;
        inputEl.classList.add("input-error");
    }

    function clearError(inputEl, errorEl) {
        errorEl.textContent = "";
        inputEl.classList.remove("input-error");
    }

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        const fullname = document.getElementById("fullname");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        const declaration = document.getElementById("declaration");
        const fullnameError = document.getElementById("fullname-error");
        const emailError = document.getElementById("email-error");
        const phoneError = document.getElementById("phone-error");
        const passwordError = document.getElementById("password-error");
        const confirmPasswordError = document.getElementById("confirm-password-error");
        const declarationError = document.getElementById("declaration-error");
        [fullname, email, phone, password, confirmPassword].forEach(function (el) {
            clearError(el, document.getElementById(el.id + "-error"));
        });
        declarationError.textContent = "";
        const nameRegex = /^[A-Za-z\s]+$/;
        if (fullname.value.trim() === "") {
            showError(fullname, fullnameError, "Full name is required.");
            isValid = false;
        } else if (!nameRegex.test(fullname.value.trim())) {
            showError(fullname, fullnameError, "Name should contain only alphabets and spaces.");
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            showError(email, emailError, "Email is required.");
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, emailError, "Please enter a valid email address.");
            isValid = false;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (phone.value.trim() === "") {
            showError(phone, phoneError, "Phone number is required.");
            isValid = false;
        } else if (!phoneRegex.test(phone.value.trim())) {
            showError(phone, phoneError, "Phone number must contain exactly 10 digits.");
            isValid = false;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]/\\;']).{8,}$/;
        if (password.value === "") {
            showError(password, passwordError, "Password is required.");
            isValid = false;
        } else if (!passwordRegex.test(password.value)) {
            showError(
                password,
                passwordError,
                "Password must be 8+ characters with uppercase, lowercase, number & special character."
            );
            isValid = false;
        }
        if (confirmPassword.value === "") {
            showError(confirmPassword, confirmPasswordError, "Please confirm your password.");
            isValid = false;
        } else if (confirmPassword.value !== password.value) {
            showError(confirmPassword, confirmPasswordError, "Passwords do not match.");
            isValid = false;
        }
        if (!declaration.checked) {
            declarationError.textContent = "You must agree to the Terms & Conditions.";
            isValid = false;
        }

        if (isValid) {
            registrationContainer.classList.add("hidden");
            jobformContainer.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });



    
    jobApplicationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        const position = document.getElementById("position");
        const joblevel = document.getElementById("joblevel");
        const experience = document.getElementById("experience");
        const skills = document.getElementById("skills");
        const projects = document.getElementById("projects");
        const resume = document.getElementById("resume");

        const positionError = document.getElementById("position-error");
        const joblevelError = document.getElementById("joblevel-error");
        const experienceError = document.getElementById("experience-error");
        const skillsError = document.getElementById("skills-error");
        const projectsError = document.getElementById("projects-error");
        const resumeError = document.getElementById("resume-error");

        [position, joblevel, experience, skills, projects, resume].forEach(function (el) {
            clearError(el, document.getElementById(el.id + "-error"));
        });

        if (position.value === "") {
            showError(position, positionError, "Please select a position.");
            isValid = false;
        }

        if (joblevel.value === "") {
            showError(joblevel, joblevelError, "Please select a job level.");
            isValid = false;
        }

        if (experience.value === "") {
            showError(experience, experienceError, "Experience is required.");
            isValid = false;
        } else {
            const expValue = Number(experience.value);
            if (isNaN(expValue) || expValue < 0) {
                showError(experience, experienceError, "Experience must not be negative.");
                isValid = false;
            }
        }

        if (skills.value.trim() === "") {
            showError(skills, skillsError, "Skills field cannot be empty.");
            isValid = false;
        }

        if (projects.value.trim().length < 50) {
            showError(
                projects,
                projectsError,
                "Project description must be at least 50 characters (currently " +
                    projects.value.trim().length +
                    ")."
            );
            isValid = false;
        }

        if (!resume.files || resume.files.length === 0) {
            showError(resume, resumeError, "Please upload your resume.");
            isValid = false;
        } else {
            const fileName = resume.files[0].name.toLowerCase();
            if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
                showError(resume, resumeError, "Resume must be a PDF or DOCX file.");
                isValid = false;
            }
        }

        if (isValid) {
            alert("Application Submitted Successfully!");
            jobApplicationForm.reset();
            registrationForm.reset();
            jobformContainer.classList.add("hidden");
            registrationContainer.classList.remove("hidden");
        }
    });

});
