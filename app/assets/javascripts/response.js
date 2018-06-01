$(function(){

  function appendHTML(data) {
    time = data.response_timestamp;
    var time = time.match(/.{8}$/);
    var html = `<div class='chat-item'>
                  <span>${time}</span>
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

  $('#new_history').on('submit', function(e){
    e.preventDefault();
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
    .done(function(data){
      appendHTML(data);
      $('.text-field').val('');
      $('.sent-bottun').prop('disabled', false);
    })
    .fail(function(){
      alert('入力された文字を認識できません。もう一度ご入力ください。');
      $('.send-button').prop('disabled', false);
    })
  });
});
