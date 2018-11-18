//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  e.preventDefault();

  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000)
});

//calc result
function calculateResults() {

  console.log('calculating')
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value)*12;

  //compute monthly payment
  const x = Math.pow(1+calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);

    document.querySelector('#results').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }


}

function showError(message) {

  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'none';


    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(message));

  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading); //you call it on a parent, you pass the element that you want to insert and then specify before which element.

  //clear error after 3 sec
  setTimeout(clearError, 3000) //takes 2 parameters, first is gonna be a function and second is the time.
}

function clearError() {
  document.querySelector('.alert').remove()
}
