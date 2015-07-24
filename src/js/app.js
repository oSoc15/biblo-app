$(document).ready(function() {
    // Hide jQuery mobile loading message
    $(".ui-loader").hide();

    var global = {
        changePage : function(page) {
            console.log("hello");
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

                    console.log("Dislike: " + id);
                    console.log("Disliked: " + swiper.disliked);

                    $(item).remove();
                    swiper.addImage();
                    swiper.reInit();
                },
                onLike: function (item) {
                    var id = $(item).data("id");

                    swiper.liked.push(id);

                    console.log("Like: " + id);
                    console.log("Liked: " + swiper.liked);

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
            console.log(swiper.liked.length);
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
            $(swiper.stackClass + " ul").empty();
            swiper.init();
        }

    };

    swiper.init();

    var overview = {

        sugestionsUrl : "api/books.json",

        books : {},

        index : 0,

        booksPerPage : 8,

        showDetail : function() {
            $(".book, header").addClass("blur");
            $(".details").show();
            $(".overlay").show();
        },

        removeDetail : function() {
            $(".book, header").removeClass("blur");
            $(".details").hide();
            $(".overlay").hide();
        },

        getBooks : function() {
            var likes = swiper.liked.join();
            var dislikes = swiper.disliked.join();
            var url = "http://bieblo.be/api.php?action=books&like=" + likes + "&dislike=" + dislikes;
            console.log(url);
            jQuery.ajax({
                url: "api/books.json",
                type:"GET",
                dataType: "json",
                success: function(data) {
                    overview.saveBooks(data);
                },
                error: function (request, error) {
                    console.log(arguments);
                    alert(" Can't do because: " + error);
                }
            });
        },

        saveBooks : function(data) {
            overview.books = data;
            console.log(overview.books);
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
        }
    }

    overview.getBooks();

    $(document).on("click", ".book", function() {
        var bookIndex = $(this).data("index");
        console.log(bookIndex);

        overview.showDetail();
    });

    $("header .back").on("click", function() {
        swiper.clear();
    });

    $(".details #close").on("click", function() {
        overview.removeDetail();
    });


});

