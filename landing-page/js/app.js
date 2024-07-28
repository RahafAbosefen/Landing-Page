/**
 * Define Global Variables
 * 
*/
// NodeList of all the sections in the document.
const sections = document.querySelectorAll('section');
//The navigation list element where navigation items will be appended.
const navList = document.getElementById('navbar__list');
//Threshold value for determining if a section is in the viewport.
const VALUE = 150;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Prevents the default action of anchor links and smoothly scrolls to the target section.
const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
};

//Checks if the section is within the viewport.
const isValue = (box) => {
    return (box.top <= VALUE && box.bottom >= VALUE);
}

//Toggles the ' your-active-class' class on the current section and corresponding navigation link.
const activeClass = (section, isValue) => {
    section.classList.toggle('your-active-class', isValue);
    const navLink = document.querySelector(`a[href="#${section.id}"]`);
    if (navLink) {
        navLink.classList.toggle('your-active-class', isValue);
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Dynamically creates the navigation menu using a DocumentFragment to reduce DOM manipulation.
const buildNav = () => {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const sectionID = section.getAttribute('id');
        const sectionTitle = section.getAttribute('data-nav');
        const listItem = document.createElement('li');
        const aItem = document.createElement('a');
        aItem.classList.add('menu__link');
        aItem.textContent = sectionTitle;
        aItem.setAttribute('href', `#${sectionID}`);
        listItem.appendChild(aItem);
        fragment.appendChild(listItem);
    });
    navList.appendChild(fragment);
};

// Scroll to anchor ID using scrollTO event
// Adds an event listener to each navigation link to enable smooth scrolling.
const makeLinksSmooth = () => {
    const navLinks = document.querySelectorAll("a");

    navLinks.forEach((link) => {
        link.addEventListener("click", smoothScroll);
    });
}

// Add class 'active' to section when near top of viewport
// Checks each section's position relative to the viewport and adds/removes the 'active' class accordingly.
const makeActive = () => {
    sections.forEach(section => {
        const box = section.getBoundingClientRect();
        activeClass(section, isValue(box));
    });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

//Builds the navigation menu and sets up smooth scrolling.
document.addEventListener('DOMContentLoaded', () => {
    // Build menu 
    buildNav();
    // Scroll to section on link click
    makeLinksSmooth();
});

// Sets sections as active based on their position in the viewport.
// Set sections as active
document.addEventListener("scroll", makeActive);

