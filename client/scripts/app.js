// YOUR CODE HERE:

var app = {
  init: function(){},
  send: function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {

        console.log(data)
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    })
  },
  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log(data)
        for (var i = 0; i < data.results.length; i++){
          if (data.results[i].text.indexOf('script') === -1 || data.results[i] === undefined){
            $('#chatbox').prepend('<p class="message">' + data.results[i].username + ': ' + data.results[i].text + '</p>')
          }
        }
        console.log('chatterbox: Messages received');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message');
      }
    })
  },
  clearMessages: function(){
    $('.message').remove();
  },
  addMessage: function(message){
    var message = {
      username: location.search.split('=')[1],
      text: $('#userMessage').val(),
      roomname: 'lobby'
    };
    $('#chatbox').prepend('<p class="message">' + message.username + ': ' + message.text + '</p>');
    app.send(message)
  },
  addRoom: function(){}
};


$('#remove').on('click', app.clearMessages);
$('#submit').on('click', app.addMessage);
$('#fresh').on('click', app.fetch);
