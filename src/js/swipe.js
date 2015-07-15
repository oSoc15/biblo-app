tinder();
zIndex();

$('.controls .like, .controls .dislike').click(function(e){
    e.preventDefault();
    window.alert("dkjlfd");
    $(".stack").jTinder($(this).like());
    $(".stack").jTinder($(this).attr('class'));
});

function tinder() {
    $(".stack").jTinder({
        // dislike callback
        onDislike: function (item) {
            // set the status text
            $('#status').html('Dislike image ' + $(item).data("id"));
            $(item).remove();
            addImage();
            zIndex();
            tinder();
        },
        // like callback
        onLike: function (item) {
            // set the status text
            $('#status').html('Like image ' + $(item).data("id"));
            $(item).remove();
            addImage();
            zIndex();
            tinder();
        },
        animationRevertSpeed: 200,
        animationSpeed: 400,
        threshold: 1,
        likeSelector: '.like',
        dislikeSelector: '.dislike'
    });
}

function zIndex() {
    $(".stack ul").children().each(function(i) {
        $(this).removeClass().addClass("tag_" + (i + 1));
        $(this).css("z-index", -i);
    });
}

function addImage() {
    var number = Math.floor((Math.random() * 3) + 1);
    var image = "images/tag-" + number + ".jpg";
    var li = "<li data-id='" + number + "'><figure style='background-image: url(" + image + ")';</figure></li>"
    $(".stack ul").append(li);
}