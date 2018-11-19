//Grab the fields
const ageField = document.getElementById('age');
const genderSelectField = document.getElementById('genderSelect');
const heightField = document.getElementById('height');
const weightField = document.getElementById('weight');
const activitySelectField = document.getElementById('activitySelect');
const bmrForm = document.getElementById('bmr-form');
const bmrResult = document.getElementById('bmr-result');
const cpmResult = document.getElementById('cpm-result');
const resultsContainer = document.getElementById('results');
const descriptionResult = document.getElementById('result-description');
const loader = document.getElementById('loading');
const hint = document.querySelector('.hint');

bmrForm.addEventListener('submit', calculateDailyCaloricNeeds);
 
function calculateDailyCaloricNeeds(e) {

  e.preventDefault();
  resultsContainer.style.display = 'none';

  //Get the values from fields
  const userAge = ageField.value;
  const userGender = genderSelectField.options[genderSelectField.selectedIndex].text;
  const userHeight = parseFloat(heightField.value);
  const userWeight =  parseFloat(weightField.value);
  const userActivityFactor = activitySelectField.value;

  if(!userAge || !userGender || !userHeight || !userWeight || !userActivityFactor) {
    return handleShowingError('Something went wrong. Fill all the fields.');
  }

  if(userAge < 10 || userHeight < 140 || userWeight < 40 || userAge > 110 || userHeight > 230 || userWeight > 200 ) {
    return handleShowingError(`Are you really ${userAge} years old, ${userHeight} cm height and ${userWeight} kg weight?`)
  }

  //create a user object
  let user = new Object();
  user.age = userAge; 
  user.gender = userGender,
  user.height = userHeight,
  user.weight = userWeight;
  user.activity = userActivityFactor;

  let bmrCalculated = calculateBmr(user);
  let cpmCalculated = bmrCalculated*user.activity;
  bmrResult.value = bmrCalculated;
  cpmResult.value = cpmCalculated;

  writeDescriptionResult(cpmCalculated);

  handleDisplayingResults();

}

function calculateBmr(person) {
  const weightIndex = 9.99*person.weight;
  const heightIndex = 6.25*person.height;
  const ageIndex = 4.92*person.age;

  if(person.gender.toLowerCase='female') {
    return weightIndex + heightIndex - ageIndex - 161;
  }

  return weightIndex + heightIndex - ageIndex + 5;
}

function writeDescriptionResult(totalCpm) {
  let htmlDescription = `
  <ul>
    <li class="text-muted">You need <b>${Math.round(totalCpm)}</b> Calories/day to maintain your weight</li>
    <li class="text-success">You need <b>${Math.round(totalCpm)-300}</b> Calories/day to lose 0.5 kg per week</li>
    <li class="text-danger">You need <b>${Math.round(totalCpm)+300}</b> Calories/day to gain 0.5 kg per week</li>
  </ul>`

  descriptionResult.innerHTML = htmlDescription
  
}

function handleShowingError(message) {
  let error = document.createElement('div');
  error.className = 'alert alert-danger';
  error.appendChild(document.createTextNode(message));
  
  loader.style.display = 'block';
  hint.style.display = 'block';

  setTimeout(function() {
    document.querySelector('.card').insertBefore(error, bmrForm);
    loader.style.display = 'none';
    hint.style.display = 'none';
  }, 1000)

  setTimeout(function() {
    error.remove();
  }, 6000)

}

function handleDisplayingResults() {
  loader.style.display = 'block';
  hint.style.display = 'block';

  setTimeout(function() {
    loader.style.display = 'none';
    hint.style.display = 'none';
    resultsContainer.style.display = 'block';
  }, 2000);
}
