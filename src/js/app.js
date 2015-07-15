$("li").on("swiperight",function(){
    $(this).addClass('rotate-left').delay(700).fadeOut(1);
    $('li').find('.status').remove();

    if ( $(this).is(':last-child') ) {
        $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
    } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    }
});

$("li").on("swipeleft",function(){
    $(this).addClass('rotate-right').delay(700).fadeOut(1);
    $('li').find('.status').remove();

    if ( $(this).is(':last-child') ) {
        $('li:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
        $(this).remove();
    } else {
        $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    }
});

$(".like").on("click",function(){
    $('li').addClass('rotate-left').delay(700).fadeOut(1);
    $('li').find('.status').remove();
    $('li').append('<div class="status like">Like!</div>');

    // if ( $(this).is(':last-child') ) {
    //   $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
    //  } else {
    //     $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    //  }
});

$(".dislike").on("click",function(){
    $('li').addClass('rotate-right').delay(700).fadeOut(1);
    $('li').find('.status').remove();
    $('li').append('<div class="status dislike">Dislike!</div>');

    // if ( $(this).is(':last-child') ) {
    //  $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
    //   alert('Last one');
    //  } else {
    //     $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
    // }
});

