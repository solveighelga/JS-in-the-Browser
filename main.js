// Here are all of my form elements by id
const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const popup = document.getElementById('popup');

// added an EventListener to my submit button
form.addEventListener('submit', e => {
    e.preventDefault(); //prevent my form from submitting because I want to validate my inputs

    validateInput(); // this will be triggered on every form submit
})

// Checking if it is an emty string or does it have a value. If it is empty there will be a error message
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error'); // add the error class if it missing
    inputControl.classList.remove('success'); // add the success class if it is present (red border from my css)

};

// Same as above but for success
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// I need to check if the email is a valid email or not
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Get all the values of the input fields
const validateInput = () => {
const firstNameValue = firstName.value.trim(); // trim removed all the white space that the string will have
const lastNameValue = lastName.value.trim();
const emailValue = email.value.trim();

// I have to then add every validation condition that I want for each value (firstName, lastName, email). Because they are required fields
let errorCount = 0; // Count if I get error or not for my popup
if(firstNameValue === '') {
    setError(firstName, 'First name is required');
    errorCount++;
} else {
    setSuccess(firstName);
}

// Check if last name is not empty
if(lastNameValue === '') {
    setError(lastName, 'Last name is required');
    errorCount++;
} else {
    setSuccess(lastName);
}

// Check if email is valid
if(emailValue === '') {
    setError(email, 'Email is required');
    errorCount++;
} else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
    errorCount++;
} else {
    setSuccess(email);
}

// Check if I got any errors and If not I open the success popup
if (errorCount === 0){
    openPopup();
    clearForm();
}
};

// Here we open the popup
function openPopup(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    popup.classList.add("open-popup")
}

// Here we close the popup
function closePopup(){
    popup.classList.remove("open-popup")
}

// Here we clear the form and remove success from elements.
function clearForm(){
    form.reset();
    firstName.parentElement.classList.remove('success');
    lastName.parentElement.classList.remove('success');
    email.parentElement.classList.remove('success');
}