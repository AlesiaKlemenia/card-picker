function getFormElements() {
  const form = document.querySelector('form');

  const userName = form.querySelector(".form-input-name");
  const userCard = form.querySelector(".form-input-card-number");
  const userCardMonth = form.querySelector(".form-input-card-month");
  const userCardYear = form.querySelector(".form-input-card-year");
  const userCardCVC = form.querySelector(".form-input-cvc");

  return [userName, userCard, userCardMonth, userCardYear, userCardCVC];
}

function initializeListeners() {
  const [userName, userCard, userCardMonth, userCardYear, userCardCVC] = getFormElements(); 

  userName.addEventListener('input', function() { displayUserName(userName, '.user-name') } );
  userCard.addEventListener('input', function() { displayUserCard(userCard, '.user-card', 16) } );
  userCardMonth.addEventListener('input', function() { displayUserData(userCardMonth, '.user-card-month', 2) } );
  userCardYear.addEventListener('input', function() { displayUserData(userCardYear, '.user-card-year', 2) } );
  userCardCVC.addEventListener('input', function() { displayUserData(userCardCVC, '.user-card-cvc', 3) } );
}

function addCard() {
  const [userName, userCard, userCardMonth, userCardYear, userCardCVC] = getFormElements();

  validateUserData(userName, userCard, userCardMonth, userCardYear, userCardCVC);

  showSuccessWindow();
}



function displayUserName(userName, displayElement) {
  if (userName) {
    const element = document.querySelector(displayElement);
    element.textContent = userName.value;
  }
}

function displayUserData(userData, displayElement, maxLength) {
  if (userData) {
    const element = document.querySelector(displayElement);
    element.textContent = `${'0'.repeat(maxLength - userData.value.length)}${userData.value}`;
  }
}

function displayUserCard(userCard, displayElement, maxLength) {
  if (userCard) {
    const element = document.querySelector(displayElement);
    const cardNumber = `${'0'.repeat(maxLength - userCard.value.length)}${userCard.value}`;
    element.textContent = cardNumber.match(/.{4}/g).join(' ');
  }
}

function validateUserData(userName, userCard, userCardMonth, userCardYear, userCardCVC) {
  const userNameRegex = new RegExp("[a-zA-Z,.'-]+ [a-zA-Z,.'-]+");
  const userCardRegex = new RegExp("^4[0-9]{15}$");
  const userCardYearRegex = new RegExp("^[0-9]{2}$");
  const userCardCVCRegex = new RegExp("[0-9]{3}");

  validateUserField(userName, userNameRegex);
  validateUserField(userCard, userCardRegex);
  validateUserMonthField(userCardMonth, userCardRegex);
  validateUserField(userCardYear, userCardYearRegex);
  validateUserField(userCardCVC, userCardCVCRegex);  
}

function validateUserField(userData, regex) {
  if (regex.test(userData.value)) { 
    customizeValid(userData);
  }
  else {
    customizeInvalid(userData);
  }
}

function validateUserMonthField(userCardMonth) {
  if (userCardMonth > 12 || userCardMonth < 1) {
    customizeInvalid(userCardMonth);
  }
  else {
    customizeValid(userCardMonth);
  }
}

function customizeInvalid(userInputField) {
  userInputField.style.border = "1px solid red";
}

function customizeValid(userInputField) {
  userInputField.style.border = "1px solid #DFDEE0";
}

async function showSuccessWindow() {
  const formWrapper = document.querySelector('.form-wrapper');

  deleteForm(formWrapper);

  formWrapper.style.top = '305px';
  formWrapper.style.height = '291px';
  formWrapper.style.flexDirection = 'column';
  formWrapper.style.justifyContent = 'space-between';
  formWrapper.style.alignItems = 'center';

  const circleElement = document.createElement('div');
  circleElement.classList.add('submit-circle');
  formWrapper.appendChild(circleElement);
  
  const svg = await fetch('./images/Path.svg');
  const svgElement = await svg.text();
  const svgContainer = document.querySelector('.submit-circle');
  svgContainer.innerHTML = svgElement;

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('content-wrapper');
  
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('text-wrapper');

  const thankYouText = document.createElement('h3');
  thankYouText.innerHTML = 'THANK YOU!';

  const cardAddedText = document.createElement('p');
  cardAddedText.innerHTML = 'We’ve added your card details';

  const continueButton = document.createElement('button');
  continueButton.classList.add('continue-button');
  continueButton.innerHTML = 'Continue';

  formWrapper.appendChild(contentWrapper);
  contentWrapper.appendChild(textWrapper);
  contentWrapper.appendChild(continueButton);
  textWrapper.appendChild(thankYouText);
  textWrapper.appendChild(cardAddedText);

  reloadCSS();
}

function deleteForm(parent) {
  const form = parent.querySelector('form');

  parent.removeChild(form);
}

// see https://gist.github.com/Razoxane/5952ecdab0c5ce976e230750306c5d78
function reloadCSS() {
  let links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) {
      if (links[i].getAttribute('rel') == 'stylesheet') {
    let href = links[i].getAttribute('href').split('?')[0];
          let newHref = href + '?version=' 
                       + new Date().getMilliseconds();
          console.log(newHref)
          links[i].setAttribute('href', newHref);
      }
  }
}