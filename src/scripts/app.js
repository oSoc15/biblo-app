/**
 * @author: Shaun Janssens
 * @copyright: open Summer of code
 */
$(document).ready(function() {

    /**
     * Swipe controller
     * @type {{images: {}, index: number, liked: Array, disliked: Array, init: Function, getImages: Function, getImage: Function, addImage: Function, setIndex: Function, checkLikes: Function, reset: Function, like: Function, dislike: Function, tinder: Function}}
     */
    var swipe = {
        images : {},
        index : 0,
        liked : [],
        disliked : [],

        init : function() {
            swipe.getImages();
        },

        /**
         * Get images
         * Save tags
         * Add 3 images for init
         * Init tinder module
         */
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

        /**
         * Get the next image
         * @returns {null|*}
         */
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

        /**
         * Add an image to the stack
         */
        addImage : function() {
            var data = swipe.getImage();

            if(data != null) {
                var handlebars = Handlebars.templates['tag-template'];
                $(".stack ul").append(handlebars(data));
            }

            swipe.setIndex();
        },

        /**
         * Calculate z-index on stack
         */
        setIndex : function() {
            $(".stack ul").children().each(function(i) {
                $(this).removeClass().addClass("tag_" + (i + 1));
                $(this).css("z-index", -i);
            });
        },

        /**
         * Check likes
         */
        checkLikes : function() {
            if(swipe.liked.length == 3) {
                overview.getBooks();
            }

            if(swipe.liked.length >= 5) {
                page.showPage(2);
            }
        },

        /**
         * Reset and reinit
         */
        reset : function() {
            swipe.images = {};
            swipe.index = 0;
            swipe.liked = [];
            swipe.disliked = [];
            $(".stack ul").empty();
            $(".books").empty();
            swipe.init();
            page.showPage(1);
        },

        /**
         * Like tag
         * @param item
         */
        like : function(item) {
            var id = $(item).data("id");
            swipe.liked.push(id);
            swipe.checkLikes();
            $(item).remove();
            swipe.addImage();
            swipe.tinder();
        },

        /**
         * Dislike tag
         * @param item
         */
        dislike : function(item) {
            var id = $(item).data("id");
            swipe.disliked.push(id);
            $(item).remove();
            swipe.addImage();
            swipe.tinder();
        },

        /**
         * Tinder plugin
         */
        tinder : function() {
            $(".stack").jTinder({
                onDislike: function (item) {
                    swipe.dislike(item);
                },
                onLike: function (item) {
                    swipe.like(item);
                },
                animationRevertSpeed: 200,
                animationSpeed: 400,
                threshold: 1,
                likeSelector: '#like',
                dislikeSelector: '#dislike'
            });
        }
    };


    /**
     * Overview controller
     * @type {{books: {}, index: number, booksPerPage: number, getBooks: Function, showBooks: Function, showDetail: Function, removeDetail: Function}}
     */
    var overview = {
        books : {},
        index : 0,
        booksPerPage : 8,

        /**
         * Get the recommendations
         * Save all the books
         */
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

        /**
         * Show the overview
         * @param data
         */
        showBooks : function(data) {
            data = data.slice(0, overview.booksPerPage);
            var handlebars = Handlebars.templates['overview-template'];
            $(".books").append(handlebars(data));
        },

        /**
         * Show details popup
         * @param id
         */
        showDetail : function(id) {
            $(".books, header").addClass("blur", 200);
            $(".details").fadeIn(200);
            $(".overlay").fadeIn(200);

            var book = overview.books[id];
            var handlebars = Handlebars.templates['detail-template'];
            $(".overlay").append(handlebars(book));
        },

        /**
         * Remove details popup
         */
        removeDetail : function() {
            $(".books, header").removeClass("blur", 200);
            $(".details").fadeOut(200);
            $(".overlay").fadeOut(200).empty();
        }
    };

    /**
     * Page controller
     * @type {{startpage: number, currentpage: number, init: Function, showPage: Function}}
     */
    var page = {
        startpage : 1,
        currentpage: 1,

        init : function () {
            $("[data-page]").hide();
            page.showPage(page.startpage);

            swipe.init();
        },

        /**
         * Change page
         * @param newpage
         */
        showPage : function (newpage) {
            $("[data-page=" + page.currentpage +"]").fadeOut(300);
            $("[data-page=" + newpage +"]").fadeIn(300);
            page.currentpage = newpage;
        }

    };

    page.init();

    /**
     * Event handler
     */

    // Dislike button
    $(document).on('touchstart click', '#dislike', function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.handled !== true) {

            $(".tag_1").addClass("rotate-right");
            setTimeout(function() {
                var item = $(".rotate-right");
                swipe.dislike(item);
            }, 400 );

            event.handled = true;
        } else {
            return false;
        }
    });

    // Like button
    $(document).on('touchstart click', '#like', function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.handled !== true) {

            $(".tag_1").addClass("rotate-left");
            setTimeout(function() {
                var item = $(".rotate-left");
                swipe.like(item);
            }, 400 );

            event.handled = true;
        } else {
            return false;
        }
    });

    // Prevent touch move
    document.ontouchmove = function(event){
        event.preventDefault();
    };

    // Back button
    $(document).on("click touchstart", ".back", function() {
        swipe.reset();
    });

    // Show detail overlay
    $(document).on("click touchstart", ".book", function() {
        overview.showDetail($(this).data("index"));
    });

    // Hide detail overlay
    $(document).on("click touchstart", ".close", function() {
        overview.removeDetail();
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37: // Left => dislike
                $(".tag_1").addClass("rotate-right");
                setTimeout(function() {
                    var item = $(".rotate-right");
                    swipe.dislike(item);
                }, 400 );
                break;

            case 39: // Right => like
                $(".tag_1").addClass("rotate-left");
                setTimeout(function() {
                    var item = $(".rotate-left");
                    swipe.like(item);
                }, 400 );
                break;

            case 27: // Esc => close detail
                overview.removeDetail();
                break;
        }
    }, false);

});

