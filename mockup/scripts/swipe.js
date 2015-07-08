$(document).ready(function(){

    $(".buddy").on("swiperight",function(){
      $(this).addClass('rotate-left').delay(700).fadeOut(1);
      $('.buddy').find('.status').remove();

      $(this).append('<div class="status like">Like!</div>');
      if ( $(this).is(':last-child') ) {
        $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
       } else {
          $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
       }
    });

   $(".buddy").on("swipeleft",function(){
    $(this).addClass('rotate-right').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();
    $(this).append('<div class="status dislike">Dislike!</div>');

    if ( $(this).is(':last-child') ) {
     $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
      alert('Last one');
     } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    }
  });

  $(".yes").on("click",function(){
    $('.buddy').addClass('rotate-left').delay(700).fadeOut(1);
    $('.buddy').find('.status').remove();
    $('.buddy').append('<div class="status like">Like!</div>');

    // if ( $(this).is(':last-child') ) {
    //   $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
    //  } else {
    //     $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    //  }
  });

 $(".no").on("click",function(){
  $('.buddy').addClass('rotate-right').delay(700).fadeOut(1);
  $('.buddy').find('.status').remove();
  $('.buddy').append('<div class="status dislike">Dislike!</div>');

  // if ( $(this).is(':last-child') ) {
  //  $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
  //   alert('Last one');
  //  } else {
  //     $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
  // }
});



});
