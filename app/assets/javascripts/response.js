$(function() {
  function appendHTML(data) {
    var time = data.response_timestamp;
    var time = time.match(/.{8}$/);
    var html = `<div class= 'chat-item'>
                  <span>${request_time}</span>
                  <span>You ></span>
                  <span>${data.user_input}</span>
                </div>
                <div class='chat-item'>
                  <span>${time}</span>
                  <span>Bot ></span>
                  <span>${data.bot_response}</span>
                </div>`
    $('.chat-lists').append(html);
  }

  $('#new_history').on('submit', function(e) {
    e.preventDefault();
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    //出力用
    request_time = hour + ":" + min + ":" + sec;
    // return s;
    console.log(request_time);
    var userInput = $('.text-field').val();
    var formData = new FormData(this)
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log(data);
      appendHTML(data);
      $('.text-field').val('');
      $('.sent-bottun').prop('disabled', false);
    })
    .fail(function(){
      alert('入力された文字を認識できません。もう一度ご入力ください。');
      $('.text-field').val('');
      $('.send-button').prop('disabled', false);
    })
  });

  $(document).on('click', '.history-button', function(e) {
    e.preventDefault();
    $.ajax({
      url: "history/list",
      dataType: 'json'
    })
    .done(function(histories) {
      $('.chat-lists').empty();
      $('.form').addClass('chat-form-hidden');
      $('.history-button span').text("入力に戻る");
      $('.history-button').addClass('input-form-back');
      $('.history-button').removeClass('history-button')
      if (histories.length !== 0) {
        histories.forEach(function(history) {
          appendHTML(history);
        });
      }
    })
  });

  $(document).on('click', '.input-form-back', function() {
    $('.chat-lists').empty();
    $('.form').removeClass('chat-form-hidden');
    $('.input-form-back').addClass('history-button');
    $('.history-button').removeClass('input-form-back');
    $('.history-button span').text("履歴を表示する");
  });
});
