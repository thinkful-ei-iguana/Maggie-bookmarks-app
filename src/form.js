


function serializeJson(form) {
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return obj;
}

export default {
  serializeJson
};