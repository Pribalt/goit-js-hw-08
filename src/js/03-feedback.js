import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
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
  e.target.reset();

  console.log(JSON.parse(localStorage.getItem(KEY_FOR_REPOSITORY)) ?? {});

  localStorage.removeItem(KEY_FOR_REPOSITORY);
}

function onGetLocal() {
  const savedData = JSON.parse(localStorage.getItem(KEY_FOR_REPOSITORY)) ?? {};

  if (savedData) {
    Object.entries(savedData).forEach(([key, value]) => {
      formEl[key].value = value;
      formData[key] = value;
    });
  }
}
