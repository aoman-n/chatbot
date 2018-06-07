$(function() {
  function appendRequest(data) {
    var html = `<div class= 'chat-item'>
                  <span>${requestTime}</span>
                  <span>You ></span>
                  <span>${data.user_input}</span>
                </div>
                <div class= 'loading'>
                  <img src= '/assets/loading.gif'>
                </div>`
    $('.chat-lists').append(html);
  }

  function appendResponse(data) {
    responseTime = timeCreate();
    var html = `<div class='chat-item' style= "display: none;">
                  <span>${responseTime}</span>
                  <span>Bot ></span>
                  <span>${data.bot_response}</span>
                </div>`
    $('.chat-lists').append(html);
    $('.loading').remove();
    $('.chat-item').fadeIn();
  }

  function padZero(num) {
    var result;
    if (num < 10) {
      result = "0" + num;
    } else {
      result = "" + num;
    }
    return result;
  }

  function timeCreate() {
    var now = new Date();
    var hour = padZero(now.getHours());
    var min = padZero(now.getMinutes());
    var sec = padZero(now.getSeconds());
    return hour + ":" + min + ":" + sec;
  }

  $(document).on('submit', '#new_history', function(e) {
    e.preventDefault();
    requestTime = timeCreate();
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
      appendRequest(data);
      setTimeout(function() {
        appendResponse(data);
      }, 1000);
      $('.text-field').val('');
      $('.sent-bottun').prop('disabled', false);
      $('.chat-lists').animate({scrollTop: $('.chat-lists')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('入力された文字を認識できません。もう一度ご入力ください。');
      $('.text-field').val('');
      $('.send-button').prop('disabled', false);
    })
  });
});
