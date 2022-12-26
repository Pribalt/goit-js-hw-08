import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEmailEl = document.querySelector('input[name="email"]');
const textareaMessageEl = document.querySelector('textarea[name="message"]');
const KEY_FOR_REPOSITORY = 'feedback-form-state';
const formData = {};

onGetLocal();

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(KEY_FOR_REPOSITORY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(KEY_FOR_REPOSITORY);
  console.log(formData);
}

function onGetLocal() {
  const savedMessage =
    JSON.parse(localStorage.getItem(KEY_FOR_REPOSITORY)) ?? {};

  if (savedMessage.email) {
    inputEmailEl.value = savedMessage.email;
  }
  if (savedMessage.message) {
    textareaMessageEl.value = savedMessage.message;
  }
}
