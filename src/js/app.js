$(document).ready(function() {
    // Hide jQuery mobile loading message

    var global = {
        changePage : function(page) {
            $("body").pagecontainer("change", page);
        }
    };

    var swiper = {

        stackClass : ".stack",
        jsonFile : "api/questions.json",

        images : {},
        index : 0,
        liked : [],
        disliked : [],

        init : function() {
            swiper.getJson();
        },

        addImage : function() {
            var image = swiper.getImage();

            if(image == null) {
                var li = '';
            }
            else {
                var li = '<li data-id="' + image.id + '"><figure style="background-image: url(' + image.url + ')"></figure></li>';
            }

            $(swiper.stackClass + " ul").append(li);
        },

        setIndex : function() {
            $(swiper.stackClass + " ul").children().each(function(i) {
                $(this).removeClass().addClass("tag_" + (i + 1));
                $(this).css("z-index", -i);
            });
        },


        getJson : function() {
            jQuery.ajax({
                url: swiper.jsonFile,
                type:"GET",
                dataType: "json",
                success: function(data) {
                    swiper.saveJson(data);
                },
                error: function() {
                    alert("JSON fout");
                }
            });
        },

        saveJson : function(data) {
            swiper.images = data;

            swiper.addImage();
            swiper.addImage();
            swiper.addImage();

            swiper.tinder();
            swiper.setIndex();
        },

        reInit : function() {
            swiper.tinder();
            swiper.setIndex();
        },

        getImage : function() {
            if(swiper.index >= swiper.images.length) {
                image = null;
            }
            else {
                image = swiper.images[swiper.index];
                swiper.index = swiper.index + 1;
            }

            return image;
        },

        tinder : function() {
            $(swiper.stackClass).jTinder({
                onDislike: function (item) {
                    var id = $(item).data("id");

                    swiper.disliked.push(id);

                    $(item).remove();
                    swiper.addImage();
                    swiper.reInit();
                },
                onLike: function (item) {
                    var id = $(item).data("id");

                    swiper.liked.push(id);

                    swiper.checkLikes();

                    $(item).remove();
                    swiper.addImage();
                    swiper.reInit();
                },
                animationRevertSpeed: 200,
                animationSpeed: 400,
                threshold: 1,
                likeSelector: '.like',
                dislikeSelector: '.dislike'
            });
        },

        checkLikes : function() {
            if(swiper.liked.length >= 3) {
                overview.getBooks();
            }

            if(swiper.liked.length >= 5) {
                global.changePage("#step2");
            }
        },

        clear : function() {
            swiper.images = {};
            swiper.index = 0;
            swiper.liked = [];
            swiper.disliked = [];
            $(".stack ul").empty();
            swiper.init();
        }

    };

    swiper.init();

    var overview = {

        sugestionsUrl : "api/books.json",

        books : {},

        index : 0,

        booksPerPage : 8,

        showDetail : function(id) {
            $(".book, header").addClass("blur", 300);
            $(".details").fadeIn(300);
            $(".overlay").fadeIn(300);

            var book = overview.books[id];
            $(".details h1").html(book.title);
            $(".details p").html(book.description);
            $(".details .author").html("<strong>Auteur</strong> " + book.author);
            $(".details .genre").html("<strong>Genre</strong> " + book.genres);
            $(".details figure").css("background-image", "url(" + book.coverimage + ")");
        },

        removeDetail : function() {
            $(".book, header").removeClass("blur", 200);
            $(".details").fadeOut(200);
            $(".overlay").fadeOut(200);
        },

        getBooks : function() {
            var likes = swiper.liked.join();
            var dislikes = swiper.disliked.join();
            var url = "http://bieblo.be/api.php?action=books&like=" + likes + "&dislike=" + dislikes;
            jQuery.ajax({
                url: "api/books.json",
                type:"GET",
                dataType: "json",
                success: function(data) {
                    overview.saveBooks(data);
                },
                error: function (request, error) {
                    alert(" Can't do because: " + error);
                }
            });
        },

        saveBooks : function(data) {
            overview.books = data;
            overview.showBooks();
        },

        showBooks : function() {
            jQuery.each(overview.books, function(i, book) {
                if(overview.index < overview.booksPerPage) {
                    overview.printBook(book);
                }
            });
        },

        printBook : function(book) {
            var bookHtml = '<div class="book" data-index="' + overview.index + '"><figure style="background-image: url(' + book.coverimage + ');"></figure></div>';
            $(".books").append(bookHtml);

            overview.index++;
        },

        replace : function(string1, string2) {
            var replaced = $("body").html().replace(string1,string2);
            $("body").html(replaced);
        }
    }

    overview.getBooks();

    $(document).on("click tap", ".book", function() {
        var bookIndex = $(this).data("index");
        overview.showDetail(bookIndex);
    });

    $("header .back").on("tap", function() {
        swiper.clear();
    });

    $("header .back").on("click", function() {
        swiper.clear();
    });

    $(".details #close").on("click tap", function() {
        overview.removeDetail();
    });

});

