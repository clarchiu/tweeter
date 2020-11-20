const checkFormValid = (text) => {
  if (!text) {
    alert("Tweet can't be empty!");
    return false;
  }
  if (text.length > 140) {
    alert("Maximum characters exceeded!");
    return false;
  }
  return true; 
}

$(document).ready(function() {
  $("#new-tweet form").on("submit", function (event) {
    event.preventDefault();

    if (!checkFormValid($(this).find('textarea').val())) {
      event.stopImmediatePropagation()
      return;
    }
  });  
});