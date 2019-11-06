
let form = document.getElementById('add-display');

function serializeJson(form) {
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return JSON.stringify(obj);
}

$('#add-display').submit(e => {
  e.preventDefault();
  let formElement = $('#add-display')[0];
  console.log(serializeJson(formElement));

//   $('#add-display').html(<p>'your form submission has been received!'</p>);
});