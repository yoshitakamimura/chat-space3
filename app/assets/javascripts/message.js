$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="message">
          <div class="upper-message">
            <div class="upper-message__member">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__text">
              ${message.content}
            </p>
          </div>
          <img src=${message.image}>
        </div>`
      return html;
    } else {
      var html =
        `<div class="message">
        <div class="upper-message">
          <div class="upper-message__member">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__text">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  
  $(".new_message").on("submit", function(e){
    e.preventDefault()

    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done (function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $("submit-btn").prop("disabled", false);
    })

    .fail(function(){
      alert('error');
    });
    return false;
  })
});