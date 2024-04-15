document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('taxForm');
  const modal = document.getElementById('modal');
  const remainingSalary = document.getElementById('remainingSalary');
  const taxResult = document.getElementById('taxResult');
  const closeBtn = document.getElementById('closeBtn');

  // Function to display error message inside input field
  function displayError(inputField, errorMessage) {
    const errorIcon = inputField.parentElement.querySelector('.error-icon');
    const tooltip = inputField.parentElement.querySelector('.tooltip');

    // Show error icon and tooltip
    errorIcon.style.display = 'inline-block';
    tooltip.textContent = errorMessage;
    tooltip.style.display = 'block';

    // Add error class to input field
    inputField.classList.add('error');
  }

  // Function to remove error message from input field
  function removeError(inputField) {
    const errorIcon = inputField.parentElement.querySelector('.error-icon');
    const tooltip = inputField.parentElement.querySelector('.tooltip');

    // Hide error icon and tooltip
    errorIcon.style.display = 'none';
    tooltip.style.display = 'none';

    // Remove error class from input field
    inputField.classList.remove('error');
  }

  // Show/hide error messages on input change
  const inputFields = document.querySelectorAll('input[type="text"]');
  inputFields.forEach((inputField) => {
    inputField.addEventListener('input', function() {
      const inputValue = this.value.trim();
      const isValid = !isNaN(parseFloat(inputValue)) && isFinite(inputValue);
      if (!isValid) {
        displayError(this, 'Please enter numbers only');
      } else {
        removeError(this);
      }
    });
  });

  // Display modal
  function showModal(incomeTax, remaining) {
    taxResult.innerText = `Tax to be paid: ${incomeTax.toFixed(2)} Lakhs`;
    remainingSalary.innerText = `Your Overall Income will be\n ${remaining.toFixed(2)} \nafter tax deductions`;
    modal.style.display = 'block';
  }

  // Hide modal
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Validate inputs and calculate remaining salary
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const grossIncome = parseFloat(form.grossIncome.value);
    const extraIncome = parseFloat(form.extraIncome.value) || 0;
    const deductions = parseFloat(form.deductions.value) || 0;
    const age = form.age.value;

    let errorMessage = '';

    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
      errorMessage += 'All fields must be numbers.\n';
    }

    if (grossIncome - deductions < 0) {
      errorMessage += 'Taxable income cannot be negative.\n';
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    let taxableIncome = grossIncome + extraIncome - deductions;
    let incomeTax = 0;

    if (taxableIncome > 900000) {
      switch(age) {
        case '<40':
          incomeTax = 0.3 * (taxableIncome );
          break;
        case '>=40 & <60':
          incomeTax = 0.4 * (taxableIncome);
          break;
        case '>=60':
          incomeTax = 0.1 * (taxableIncome);
          break;
        default:
          break;
      }
    }

    const remainingSalary = taxableIncome - incomeTax;

    showModal(incomeTax, remainingSalary);
  });
});
