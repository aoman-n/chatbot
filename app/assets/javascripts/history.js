$(function() {

  function displayHistories(history) {
    var html = `<div class='chat-item'>
                  <span>Bot ></span>
                  <span>${history.bot_response}</span>
                </div>
                <div class= 'chat-item'>
                  <span>You ></span>
                  <span>${history.user_input}</span>
                </div>`
    $('.chat-lists').append(html);
  }

  $(document).on('click', '.history-button', function(e) {
    e.preventDefault();
    $.ajax({
      url: "history/list",
      dataType: 'json'
    })
    .done(function(histories) {
      $('.chat-lists').empty();
      $('.form-area').addClass('chat-form-hidden');
      $('.history-button span').text("入力に戻る");
      $('.history-button').addClass('input-form-back');
      $('.history-button').removeClass('history-button');
      $('.history-title').removeClass('history-title-hidden');
      if (histories.length !== 0) {
        histories.forEach(function(history) {
          displayHistories(history);
        });
      }
    })
  });

  $(document).on('click', '.input-form-back', function() {
    $('.chat-lists').empty();
    $('.form-area').removeClass('chat-form-hidden');
    $('.input-form-back').addClass('history-button');
    $('.history-button').removeClass('input-form-back');
    $('.history-button span').text("履歴を表示する");
    $('.history-title').addClass('history-title-hidden');
  });
});
