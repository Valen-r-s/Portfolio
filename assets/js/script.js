"use strict";

// Element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar toggle functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Language toggle functionality
let currentLanguage = "en"; // Default language

const languageButton = document.getElementById("languageButton");
const translateElements = document.querySelectorAll("[data-translate]");
const cvLink = document.getElementById("cv-link"); // Select the CV link element

// Function to apply translations
const applyTranslations = (language, translations) => {
  translateElements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });

  // Update CV link text and URL
  if (translations[language]["cv-link"]) {
    cvLink.textContent = translations[language]["cv-link"].text;
    cvLink.href = translations[language]["cv-link"].url;
  }

  // Update button text
  languageButton.textContent = language === "en" ? "Español" : "English";
};

// Load translations and set initial language
const loadTranslations = async () => {
  try {
    const response = await fetch("./assets/js/translations.json");
    const translations = await response.json();

    // Apply initial translations
    applyTranslations(currentLanguage, translations);

    // Add event listener for language toggle
    languageButton.addEventListener("click", () => {
      currentLanguage = currentLanguage === "en" ? "es" : "en";
      applyTranslations(currentLanguage, translations);
    });
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};

loadTranslations();
