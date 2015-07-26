/**
 * @author: Shaun Janssens
 * @copyright: open Summer of code
 */
$(document).ready(function() {

    var swipe = {
        jsonFile : "api/questions.json",

        images : {},
        index : 0,
        liked : [],
        disliked : [],

        init : function() {
            swipe.getImages();
        },

        getImages : function() {
            jQuery.ajax({
                url: "api/questions.json",
                type:"GET",
                dataType: "json",
                success: function(data) {
                    swipe.images = data;

                    for(var i = 0; i < 3; i++) {
                        swipe.addImage();
                    }

                    swipe.tinder();
                },
                error: function() {
                    alert("Fout bij ophalen van afbeeldingen");
                }
            });
        },

        getImage : function() {
            if(swipe.index >= swipe.images.length) {
                image = null;
            }
            else {
                image = swipe.images[swipe.index];
                swipe.index = swipe.index + 1;
            }

            return image;
        },

        addImage : function() {
            var data = swipe.getImage();

            if(data != null) {
                var template = $("#tag-template").html();
                var handlebars = Handlebars.compile (template);
                $(".stack ul").append(handlebars(data));
            }

            swipe.setIndex();
        },

        setIndex : function() {
            $(".stack ul").children().each(function(i) {
                $(this).removeClass().addClass("tag_" + (i + 1));
                $(this).css("z-index", -i);
            });
        },

        checkLikes : function() {
            if(swipe.liked.length == 3) {
                overview.getBooks();
            }

            if(swipe.liked.length >= 5) {
                page.showPage(2);
            }
        },

        reset : function() {
            swipe.images = {};
            swipe.index = 0;
            swipe.liked = [];
            swipe.disliked = [];
            $(".stack ul").empty();
            swipe.init();
            page.showPage(1);
        },

        tinder : function() {
            $(".stack").jTinder({
                onDislike: function (item) {
                    var id = $(item).data("id");
                    swipe.disliked.push(id);

                    $(item).remove();
                    swipe.addImage();
                    swipe.tinder();
                },
                onLike: function (item) {
                    var id = $(item).data("id");
                    swipe.liked.push(id);

                    swipe.checkLikes();

                    $(item).remove();
                    swipe.addImage();
                    swipe.tinder();
                },
                animationRevertSpeed: 200,
                animationSpeed: 400,
                threshold: 1,
                likeSelector: '#like',
                dislikeSelector: '#dislike'
            });
        }
    };


    var overview = {
        books : {},
        index : 0,
        booksPerPage : 8,

        getBooks : function() {
            var likes = swipe.liked.join();
            var dislikes = swipe.disliked.join();
            var url = "http://bieblo.be/api.php?action=books&like=" + likes + "&dislike=" + dislikes;

            jQuery.ajax({
                url: "api/books.json",
                type:"GET",
                dataType: "json",
                success: function(data) {
                    overview.books = data;
                    overview.showBooks(data);
                },
                error: function (request, error) {
                    alert("Fout bij ophalen van boeken");
                }
            });
        },

        showBooks : function(data) {
            data = data.slice(0, overview.booksPerPage);
            var template = $("#overview-template").html();
            var handlebars = Handlebars.compile (template);
            $(".books").append(handlebars(data));
        },

        showDetail : function(id) {
            $(".books, header").addClass("blur", 200);
            $(".details").fadeIn(200);
            $(".overlay").fadeIn(200);

            var book = overview.books[id];
            var template = $("#detail-template").html();
            var handlebars = Handlebars.compile (template);
            $(".overlay").append(handlebars(book));
        },

        removeDetail : function() {
            $(".books, header h1").removeClass("blur", 200);
            $(".details").fadeOut(200);
            $(".overlay").fadeOut(200).empty();
        }
    };

    var page = {
        startpage : 1,
        currentpage: 1,

        init : function () {
            $("[data-page]").hide();
            page.showPage(page.startpage);

            swipe.init();
        },

        showPage : function (newpage) {
            $("[data-page=" + page.currentpage +"]").fadeOut(300);
            $("[data-page=" + newpage +"]").fadeIn(300);
            page.currentpage = newpage;
        }

    };

    page.init();

    $(document).on("click touchstart", ".back", function() {
        swipe.reset();
    });

    $(document).on("click touchstart", ".book", function() {
        overview.showDetail($(this).data("index"));
    });

    $(document).on("click touchstart", ".close", function() {
        overview.removeDetail();
    });

    document.ontouchmove = function(event){
        event.preventDefault();
    }
});

