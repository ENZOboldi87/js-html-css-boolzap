$(document).ready(function() {
  // di default alcuni contenuti sono nascosti
  $('.content').hide();
  $('.teleg').hide();

  // al click sulle chat
  $('.contacts ul li').click(function(){
   // effetto sulla chat selezionata(grigio scuro)
   $('ul li').removeClass('selected');
   $(this).addClass('selected');
   // in fase beta: mostrare le chat in base al numero(data element 1,2,3,4 etc)
   var dataElement = $(this).attr('data-element');
   if ($('.chat .user_chat').hasClass('d-none')) {
     $('.chat .user_chat').removeClass('d-flex');
   }
   var selettore = '.chat .user_chat[data-user="' + dataElement + '"]';
   $(selettore).addClass('d-flex');
   // quando si seleziona una chat il contenuto viene mostrato e viene nascosta la schermata homepage
   $('.homepage-content').hide();
   $('.content').show();
 })

// quando passo il cursore sulle chat da effetto hover
 $('.contacts ul li').hover(function() {
   $(this).addClass('selected_hover');
 }, function() {
   $(this).removeClass('selected_hover');
 });

 // cerca contatto
 $('#search').keyup(function() {
   Cerca();
 });

// quando premo invio e invia il messaggio
 $('.message input').keyup(function() {
   if (event.which === 13 || event.keyCode === 13) {
     invioMessaggio();
     $('.teleg').hide();
     $('.microph').show();
   }
 });

// cambio icona se ho del testo nell input
$(document).on('.message input', 'input', function () {
 if ($(this).val().trim().length === 0) {
   $('.teleg').hide();
   $('.microph').show();
 }
 else {
   $('.microph').hide();
   $('.teleg').show();
 }
});

// click sull icona dropdown
$(document).on('click', '.box_chat i', function() {
    dropdown($(this));
});

// click su elmina messaggio
$(document).on('click', '.delete', function() {
    eliminaMessaggio($(this));
});


// FUNZIONI

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
    // scrollo la pagina
    ScrollaPagina();
    // dopo due secondi parte il messaggio di risposta
    setTimeout(riceviMessaggio, 2000);
   }
 }

// funzione per ricevere il messaggio
 function riceviMessaggio() {
    var nuovoMessaggioRisposta = $('.template .box_chat').clone();
    nuovoMessaggioRisposta.children('.box_chat p').text('ok');
    nuovoMessaggioRisposta.addClass('receive');
    var data = new Date();
    var oraCorrente = data.getHours();
    var minutiCorrenti = data.getMinutes();
    var oraAttuale = aggiungiZeroAllaData(oraCorrente) + ':' + aggiungiZeroAllaData(minutiCorrenti);
    nuovoMessaggioRisposta.children('.box_chat span').text(oraAttuale);
    $('.user_chat').append(nuovoMessaggioRisposta);
    ScrollaPagina();
};

// funzione che aggiunge uno zero alla data
 function aggiungiZeroAllaData(numero) {
   if (numero < 10) {
     return '0' + numero;
   }
   return numero;
 }

// funzione per far scrollare la pagina
 function ScrollaPagina() {
     var altezzaPagina = $('.user_chat.d-flex').height();
     $('.chat').scrollTop(altezzaPagina);
 }

 // funzione cerca
 function Cerca() {
   var cerca = $('#search').val().toLowerCase();
   // cerco un contatto
   $('.user').each(function() {
     var utente = $(this).find('h2').text().toLowerCase();
     if (utente.includes(cerca)) {
       $(this).show();
     } else {
       $(this).hide();
     }
   });
 }

// funzione per le dropdown
 function dropdown(selezionato) {
   var opzioneTemplate = $('.template .option').clone();
   var opzioneChat = $('.box_chat .option');
   opzioneChat.remove();
   if (!selezionato.siblings().hasClass('option')) {
     selezionato.parent().append(opzioneTemplate);
   } else {
     opzioneTemplate.remove();
   }
 }

// funzione per eliminare il messaggio
 function eliminaMessaggio(messaggio_selezioanto) {
   var messaggio = messaggio_selezioanto.closest('.box_chat');
   messaggio.remove();
 }





});
