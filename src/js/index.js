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
