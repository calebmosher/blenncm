/**
 * Main Script
 * (c) 2016 Blenncm.com
 */


var formSubmitButton = document.querySelector('.contact-form .button');
if (formSubmitButton) formSubmitButton.addEventListener('click', submitForm);

var form = document.querySelector('.contact-form');
if (form) form.addEventListener('click', submitForm);

function submitForm() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/handler');

    var data = {
        name: form.querySelector('.name').value,
        email: form.querySelector('.email').value,
        message: form.querySelector('.message').value
    };

    xhr.onload = function() {
        console.log(xhr);
    };

    xhr.send(JSON.stringify(data));
}

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

var galleries = document.querySelectorAll('.gallery');
if (galleries.length) galleries.forEach(function(gallery) { createGallery(gallery) });

function createGallery(gallery) {
    var slidesContainer = gallery.querySelector('ul');
    var slides = gallery.querySelectorAll('li');
    var galleryWidth = gallery.getBoundingClientRect().width;
    var isTransitioning = false;
    var currentIndex = 0;
    var indexMap = {};

    slides.forEach(function(slide, i) {
        slide.style.width = galleryWidth + 'px';
        indexMap[i] = i * galleryWidth;
    });

    slidesContainer.style.width = (galleryWidth * slides.length) + 'px';
    slidesContainer.style.left = 0;

    var leftArrow = document.createElement('div');
    var rightArrow = document.createElement('div');

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

    gallery.appendChild(leftArrow);
    gallery.appendChild(rightArrow);

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
        slidesContainer.style.left = '-' + indexMap[currentIndex] + 'px';
        isTransitioning = true;
    }
}



