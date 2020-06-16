$(document).ready(function() {
 $('.contacts ul li').click(function(){
   $('ul li').removeClass('active');
   $(this).addClass('active');
 })

 $('.contacts ul li').hover(function() {
   $(this).addClass('active_hover');

 }, function() {
   $(this).removeClass('active_hover');
 });

 $('.message input').keyup(function() {
   if (event.which === 13) {
     var messaggio = $(this).val();
     $('.template .box_chat p').text(messaggio);
     $('.template .box_chat').clone().appendTo('.user_chat');
     $('input').val('');
   }
 });

 $('.message i.fab').click(function() {
   alert('funziona');
   $('input').val('');
 });











});
