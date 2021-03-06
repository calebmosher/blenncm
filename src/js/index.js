/**
 * Main Script
 * (c) 2016 Blenncm.com
 */



/* ---------------------------------------- *\
 * Contact Form
\* ---------------------------------------- */

var form = document.querySelector('.contact-form');
var formSubmitButton = document.querySelector('.contact-form .button');
var formName;
var formEmail;
var formMessage;

if (form && formSubmitButton) {
    formSubmitButton.addEventListener('click', submitForm);

    formName = form.querySelector('.name');
    formEmail = form.querySelector('.email');
    formMessage = form.querySelector('.message');
}

function submitForm(e) {
    e.preventDefault();
    document.querySelectorAll('.api-message').forEach(function(el) { el.classList.remove('visible') });

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/handler/index.php');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = 'name=' + formName.value + '&email=' + formEmail.value + '&message=' + formMessage.value;

    xhr.onload = function() {
        if (xhr.status !== 200) {
            document.querySelector('.api-message.fail').classList.add('visible');
            return;
        }
        document.querySelector('.api-message.success').classList.add('visible');
        formName.value = formEmail.value = formMessage.value = '';
    };

    xhr.send(data);
}



/* ---------------------------------------- *\
 * Moodboard
\* ---------------------------------------- */

var moodboard = document.querySelector('.moodboard .board');
if (moodboard) setTimeout(function() { createMoodboard(moodboard) }, 1000);

function createMoodboard(board) {
    var viewport = board.querySelector('.board-viewport');
    var images = viewport.querySelectorAll('img');
    var boardWidth = parseFloat(getComputedStyle(board).width);
    var viewportWidth = 0;

    images.forEach(function(image) {
        var computedStyles = getComputedStyle(image);
        viewportWidth += parseFloat(computedStyles.width) + parseFloat(computedStyles.marginRight);
    });

    viewport.style.width = Math.ceil(viewportWidth) + 'px';
    viewport.style.left = 0;

    setTimeout(function() {
        var boardInterval = setInterval(function() {
            viewport.style.left = (parseInt(viewport.style.left) - 1) + 'px';
            if (-parseFloat(viewport.style.left) >= (viewportWidth - boardWidth)) {
                clearInterval(boardInterval);
                setTimeout(function() { createMoodboard(board) }, 1000);
            }
        }, 25);
    }, 1000);
}



/* ---------------------------------------- *\
 * Galleries
\* ---------------------------------------- */

var galleries = document.querySelectorAll('.gallery');
if (galleries.length) galleries.forEach(function(gallery) { createGallery(gallery) });

function createGallery(gallery) {
    var slidesContainer = gallery.querySelector('ul');
    var slides = gallery.querySelectorAll('li');
    var galleryWidth = gallery.getBoundingClientRect().width;
    var isTransitioning = false;
    var currentIndex = 0;
    var indexMap = {};

    var dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container');

    slides.forEach(function(slide, i) {
        slide.style.width = galleryWidth + 'px';
        indexMap[i] = i * galleryWidth;

        var dot = document.createElement('div');
        dot.classList.add('dot');
        if (!i) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });

    slidesContainer.style.width = (galleryWidth * slides.length) + 'px';
    slidesContainer.style.left = 0;

    var leftArrow = document.createElement('div');
    var rightArrow = document.createElement('div');
    var dots = dotsContainer.querySelectorAll('.dot');

    leftArrow.classList.add('arrow', 'left');
    rightArrow.classList.add('arrow', 'right');

    leftArrow.addEventListener('click', function() {
        if (isTransitioning) return;
        previous();
    });
    rightArrow.addEventListener('click', function() {
        if (isTransitioning) return;
        next();
    });
    slidesContainer.addEventListener('transitionend', function() {
        isTransitioning = false;
    });
    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() {
            setCurrent(i);
        });
    });

    gallery.appendChild(leftArrow);
    gallery.appendChild(rightArrow);
    gallery.appendChild(dotsContainer);

    function previous() {
        if (currentIndex <= 0) return;
        --currentIndex;
        transition();
    }
    function next() {
        if (currentIndex >= slides.length - 1) return;
        ++currentIndex;
        transition();
    }
    function setCurrent(newIndex) {
        currentIndex = newIndex;
        transition();
    }
    function transition() {
        slidesContainer.style.left = '-' + indexMap[currentIndex] + 'px';
        isTransitioning = true;

        dots.forEach(function(dot) { dot.classList.remove('active') });
        dots[currentIndex].classList.add('active');
    }
}



/* ---------------------------------------- *\
 * Viewer
\* ---------------------------------------- */

var viewer = document.querySelector('.viewer');
var viewerTriggers = document.querySelectorAll('[data-viewer-id]');

if (viewer && viewerTriggers.length) {
    createViewer();
}

function createViewer() {
    var slides = viewer.querySelectorAll('img');
    var currentIndex = 0;

    var leftArrow = document.createElement('div');
    var rightArrow = document.createElement('div');
    var closeButton = document.createElement('div');

    leftArrow.classList.add('arrow', 'left');
    rightArrow.classList.add('arrow', 'right');
    closeButton.classList.add('close');

    leftArrow.addEventListener('click', function() { previous() });
    rightArrow.addEventListener('click', function() { next() });
    closeButton.addEventListener('click', function() { closeViewer() });

    viewer.appendChild(leftArrow);
    viewer.appendChild(rightArrow);
    viewer.appendChild(closeButton);

    function previous() {
        if (currentIndex <= 0) return;
        --currentIndex;
        transition();
    }
    function next() {
        if (currentIndex >= slides.length - 1) return;
        ++currentIndex;
        transition();
    }
    function transition() {
        slides.forEach(function(slide) { slide.classList.remove('active') });
        slides[currentIndex].classList.add('active');
    }

    function openViewer(index) {
        document.body.classList.add('lock-scroll');
        viewer.classList.add('visible');
        currentIndex = index;
        transition();
    }
    function closeViewer() {
        document.body.classList.remove('lock-scroll');
        viewer.classList.remove('visible');
    }

    viewerTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() { openViewer(Number(trigger.dataset.viewerId)) });
    });
    document.body.addEventListener('keyup', function(e) {
        if (e.which === 27) closeViewer();
        if (e.which === 37) previous();
        if (e.which === 39) next();
    });
}




