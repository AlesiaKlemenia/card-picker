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
  userCard.addEventListener('input', function() { displayUserData(userCard, '.user-card', 16) } );
  userCardMonth.addEventListener('input', function() { displayUserData(userCardMonth, '.user-card-month', 2) } );
  userCardYear.addEventListener('input', function() { displayUserData(userCardYear, '.user-card-year', 2) } );
  userCardCVC.addEventListener('input', function() { displayUserData(userCardCVC, '.user-card-cvc', 3) } );
}

function addCard() {
  const [userName, userCard, userCardMonth, userCardYear, userCardCVC] = getFormElements();

  const isDataValid = validateUserData(userName, userCard, userCardMonth, userCardYear, userCardCVC);

  if (isDataValid) {
    showSuccessWindow();
  }
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
    if (userData.className === 'form-input-cvc') {
      element.textContent = getShowStringWithRightZeroes(userData.value, maxLength);
    } else if (userData.className === 'form-input-card-number') {
      const cardNumber = getShowStringWithRightZeroes(userData.value, maxLength);
      element.textContent = cardNumber.match(/.{4}/g).join(' ');
    }
    else {
      element.textContent = getShowStringWithLeftZeroes(userData.value, maxLength);
    }
    // element.textContent = `${'0'.repeat(maxLength - userData.value.length)}${userData.value}`;
  }
}

function getShowStringWithLeftZeroes(value, length) {
  return `${'0'.repeat(length - value.length)}${value}`;
}

function getShowStringWithRightZeroes(value, length) {
  return `${value}${'0'.repeat(length - value.length)}`;
}

function validateUserData(userName, userCard, userCardMonth, userCardYear, userCardCVC) {
  const userNameRegex = new RegExp("[a-zA-Z,.'-]+ [a-zA-Z,.'-]+");
  const userCardRegex = new RegExp("^4[0-9]{15}$");
  const userCardYearRegex = new RegExp("^[0-9]{2}$");
  const userCardCVCRegex = new RegExp("[0-9]{3}");

  const isUserNameValid = validateUserField(userName, userNameRegex);
  const isUserCardValid = validateUserField(userCard, userCardRegex);
  const isUserCardMonthValid = validateUserMonthField(userCardMonth, userCardRegex);
  const isUserCardYearValid = validateUserField(userCardYear, userCardYearRegex);
  const isUserCardCVCValid = validateUserField(userCardCVC, userCardCVCRegex);

  return (isUserNameValid && isUserCardValid && isUserCardMonthValid && isUserCardYearValid && isUserCardCVCValid);
}

function validateUserField(userData, regex) {
  if (!userData.value) {
    customizeInvalid(userData);
    showBlankMessage(userData.nextSibling);
    return false;
  }

  if (regex.test(userData.value)) { 
    customizeValid(userData);
    return true;
  }
  else {
    customizeInvalid(userData);
    return false;
  }
}

function validateUserMonthField(userCardMonth) {
  // console.log(userCardMonth);
  if (!userCardMonth.value) {
    customizeInvalid(userCardMonth);
    showBlankMessage(userCardMonth.parentNode.querySelector('p'));
    return false;
  }

  if (userCardMonth.value > 12 || userCardMonth.value < 1) {
    customizeInvalid(userCardMonth);
    return false;
  }
  else {
    customizeValid(userCardMonth);
    return true;
  }
}

function customizeInvalid(userInputField) {
  userInputField.style.border = "1px solid red";
}

function customizeValid(userInputField) {
  userInputField.style.border = "1px solid #DFDEE0";
}

function showBlankMessage(element) {
  const p = element.nextSibling;

  p.innerHTML = "Can't be blank";
  p.style.color = 'red';
  p.style.margin = '8px 0 0 0';

  const formWrapper = document.querySelector('.form-wrapper');
  console.log(formWrapper.className);
  formWrapper.style.height = changeElementHeight(formWrapper, 23);

  const form = document.querySelector('form');
  console.log(form.className);
  form.style.height = changeElementHeight(form, 23);

  const parentNode = element.parentNode;
  console.log(parentNode.className);
  parentNode.style.height = changeElementHeight(parentNode, 23);

  const divWrapper = parentNode.parentNode;
  console.log(divWrapper.className);
  divWrapper.style.height = changeElementHeight(divWrapper, 23);

}

function changeElementHeight(element, term) {
  const elementHeight = element.offsetHeight;
  const newElementHeight = `${elementHeight + +term}px`;
  return newElementHeight;
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