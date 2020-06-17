$(document).ready(function() {
 $('.contacts ul li').click(function(){
   $('ul li').removeClass('selected');
   $(this).addClass('selected');
   var dataElement = $(this).attr('data-element');
   if ($('.chat .user_chat').hasClass('d-flex')) {
     $('.chat .user_chat').removeClass('d-flex');
   }
   var selettore = '.chat .user_chat[data-user="' + dataElement + '"]';
   $(selettore).addClass('d-flex');

 })

 $('.contacts ul li').hover(function() {
   $(this).addClass('selected_hover');

 }, function() {
   $(this).removeClass('selected_hover');
 });

 $('.message input').keyup(function() {
   if (event.which === 13 || event.keyCode === 13) {
     invioMessaggio();
    riceviMessaggio();
   }
 });

 $('.message i.fab').click(function() {
   alert('funziona');
   $('input').val('');
 });


 // funzioni
// funzione per inviare il messaggio
 function invioMessaggio() {
   var messaggio = $('.message input').val();
   // se il messaggio e vuoto non fare nulla, altrimenti
   if (messaggio != '') {
     // clono il template
    var nuovoMessaggio = $('.template .box_chat').clone();
    // ci aggiungo il messaggio
    nuovoMessaggio.children('.box_chat p').text(messaggio);
    // e lo appendo alla classe send(messaggio inviato)
    nuovoMessaggio.addClass('send');

    // inserisco la data
    var data = new Date();
    var oraCorrente = data.getHours();
    var minutiCorrenti = data.getMinutes();
    var oraAttuale = aggiungiZeroAllaData(oraCorrente) + ':' + aggiungiZeroAllaData(minutiCorrenti);
    nuovoMessaggio.children('.box_chat span').text(oraAttuale);

    // e lo appendo alla chat
    $('.user_chat').append(nuovoMessaggio);

    // pulisco l input
    $('input').val('');

   }

 }

 function riceviMessaggio() {
   if (messaggio != '') {
     setTimeout(function () {
       $('.template .box_chat p').text('ok');
       $('.template .box_chat').clone().addClass('receive').appendTo('.user_chat');
     }, 2000);

   }

 }


 function aggiungiZeroAllaData(numero) {
   if (numero < 10) {
     return '0' + numero;
   }
   return numero;
 }



// scrolla alla fine della finestra












});
