const form = document.getElementById('tip-form');
const tipContainer = document.getElementById('tip-amount');
const totalContainer = document.getElementById('total-amount');
const resetButton = document.getElementById('reset-button');

const validations = {
  bill: (input, value) => value !== '0' && value !== '',
  people: (input, value) => value !== '0' && value !== '',
  tip: (input, value) => value !== null,
};

const isZero = (input, value) => {
  let errorMessage = '';

  if (value === '0') {
    errorMessage = "Can't be Zero";
  } else {
    errorMessage = '';
  }

  renderContent(input.previousElementSibling, errorMessage);
};

const handleSubmit = () => {
  const formData = Object.fromEntries(new FormData(form));

  if (formData.tip === 'custom') {
    formData.tip = formData.customTip;
    document.getElementById('custom-tip').focus();
  }

  if (formIsValid(form, validations)) {
    calculateResult(Number(formData.bill), Number(formData.tip), Number(formData.people));
  }
};

form.addEventListener('input', handleSubmit);

const renderContent = (container, text) => {
  container.innerHTML = text;
};

const formIsValid = (form, validations) => {
  let isValid = true;
  const formData = Object.fromEntries(new FormData(form));

  Object.keys(formData).forEach((name) => {
    isZero(name, formData[name]);

    if (dataIsValid(name, formData[name], validations)) {
    }

    if (!dataIsValid(name, formData[name], validations)) {
      isValid = false;
    } else {
      dataIsValid(name, formData[name], validations);
    }
  });

  return isValid;
};

const dataIsValid = (input, value, validations) => {
  if (!validations[input]) return true;

  return validations[input](input, value);
};

const calculateResult = (bill, tip, people) => {
  let tipAmount = bill * (tip / 100);
  let tipResult = tipAmount / people;
  let total = (bill + tipAmount) / people;

  renderContent(tipContainer, roundNumber(tipResult));
  renderContent(totalContainer, roundNumber(total));
};

const roundNumber = (number) => {
  return Math.round(number * 100) / 100;
};

const resetForm = () => {
  const resetValue = '0.00';

  renderContent(totalContainer, resetValue);
  renderContent(tipContainer, resetValue);

  form.reset();
};

resetButton.addEventListener('click', resetForm);
