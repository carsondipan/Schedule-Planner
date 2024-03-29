// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  currentHour = dayjs().add(0, 'hour').hour();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.time-block').on('click', '.saveBtn', function() {
    var input = $(this).prev().val();
    
    var id = $(this).parent().attr('id');
    localStorage.setItem(id, input);
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  $('.time-block').each(function() {
    var hour = parseInt($(this).attr('id').split('-')[1]);
    if (hour < currentHour) {
      $(this).addClass('past');
    }
    else if (hour === currentHour) {
      $(this).addClass('present');
    }
    else if (hour > currentHour) {
      $(this).addClass('future');
    }
    var text = localStorage.getItem($(this).attr('id'));

    $(this).find('.description').val(text);
  });

  $('#currentDay').text(dayjs().format('MMM d, YYYY'))
});
