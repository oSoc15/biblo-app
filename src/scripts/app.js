/**
 * @author: Shaun Janssens
 * @copyright: open Summer of code
 */
$(document).ready(function() {

    /**
     * Swipe controller
     * @type {{images: {}, index: number, liked: Array, disliked: Array, init: Function, getImages: Function,
     * getImage: Function, addImage: Function, setIndex: Function, checkLikes: Function, reset: Function, like:
     * Function, dislike: Function, tinder: Function}}
     */
    var swipe = {
        images : {},
        index : 0,
        liked : [],
        disliked : [],
        swipes : 0,
        maxswipes : 5,
        checkBooks : false,

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
                url: "http://api.bieblo.be/API/illustrations",
                type:"GET",
                dataType: "json",
                success: function(data) {
                    swipe.images = swipe.shuffle(data);

                    for(var i = 0; i < 3; i++) {
                        swipe.addImage();
                    }

                    swipe.tinder();
                },
                error : function(xhr, textStatus, errorThrown ) {
                    alert("Error: fout bij ophalen afbeelding. Code: " + xhr.status);
                }
            });
        },

        /**
         * Shuffle array object
         * @param data
         * @returns {*}
         */
        shuffle : function(data){
            for(var j, x, i = data.length; i; j = Math.floor(Math.random() * i), x = data[--i], data[i] = data[j], data[j] = x);
            return data;
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
        checkSwipes : function() {
            swipe.swipes = swipe.swipes + 1;

            /**
             * Get books after 3 likes or after 5 swipes
             */
            if(parseInt(swipe.liked.length) == 3 && swipe.checkBooks == false) {
                overview.getBooks();
                swipe.checkBooks = true;
            }
            else if(parseInt(swipe.liked.length) < 3 && parseInt(swipe.swipes) == parseInt(swipe.maxswipes) && swipe.checkBooks == false) {
                overview.getBooks();
                swipe.checkBooks = true;
            }

            /**
             * Go to page 2 if all images are swiped
             */
            if(parseInt(swipe.swipes) == parseInt(swipe.images.length)) {
                page.showPage(2);
            }

            /**
             * Go to page 2 if swipe.maxswipes likes
             */
            if(parseInt(swipe.liked.length) == parseInt(swipe.maxswipes)) {
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
            swipe.swipes = 0;
            swipe.checkBooks = false;
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
            swipe.checkSwipes();
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
            swipe.checkSwipes();
            $(item).remove();
            swipe.addImage();
            swipe.tinder();
        },

        /**
         * Animate background on like and dislike
         * @param color
         */
        animateBackground : function(color) {
            if(color == "like") {
                $("body").removeClass().addClass("bg-liked2");

                setTimeout(function () {
                    $("body").removeClass("bg-liked2");
                }, 1000);
            }

            if(color == "dislike") {
                $("body").removeClass().addClass("bg-disliked2");

                setTimeout(function () {
                    $("body").removeClass("bg-disliked2");
                }, 1000);
            }
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
     * @type {{books: {}, index: number, booksPerPage: number, getBooks: Function, showBooks: Function,
     * showDetail: Function, removeDetail: Function}}
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
            var likes = overview.removeComma(swipe.liked.join());
            var dislikes = overview.removeComma(swipe.disliked.join());
            var url = "http://api.bieblo.be/API/recommendations?likes=" + likes + "&dislikes=" + dislikes;

            jQuery.ajax({
                url: url,
                type:"GET",
                dataType: "json",
                success: function(data) {
                    if(data == "unavailable") {
                        alert("Bibnet service niet beschikbaar. Probeer opnieuw.");
                        page.showPage(1);
                    }
                    else {
                        overview.index = overview.booksPerPage;
                        overview.books = data;
                        overview.showBooks(data);
                    }

                },
                error : function(xhr, textStatus, errorThrown ) {
                    console.log("Error: fout bij ophalen boeken. Code: " + xhr.status);
                    if(xhr.status == 404) {
                        alert("Bibnet service niet beschikbaar. Probeer opnieuw.");
                        swipe.reset();
                    }
                }
            });
        },

        /**
         * Remove the last comma of a string
         * @param str
         * @returns {XML|void|string}
         */
        removeComma : function(str) {
            return str.replace(/,(\s+)?$/, '');
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
        },

        /**
         * Print function
         */
        print : function() {
            window.print()
        },

        /**
         * Show e-mail popup
         */
        showEmail : function() {
            var handlebars = Handlebars.templates['email-template'];
            $(".overview").append(handlebars());
            $(".books, header").addClass("blur", 200);
            $(".overview").fadeIn(200);
        },

        /**
         * Send e-mail with all the books
         */
        sendEmail : function() {
            var email = $("input[type=email]").val();
            var form = $(".email-popup form");

            $.ajax({
                url: "api/email",
                contentType: "application/json",
                type: "POST",
                data: {"email": email, "books": overview.books},
                dataType: 'json',
                success: function(data){
                    form.empty();
                    form.append("<p>Je krijgt zodadelijk een e-mail met jouw lijstje.</p>");
                    setTimeout(function() {
                        overview.closeEmail()
                    }, 5000);
                },
                error: function(xhr, textStatus, errorThrown){
                    console.log("Error: fout e-mailen. Code: " + xhr.status);
                    form.empty();
                    form.append("<p>Er is iets mis gegaan met het e-mailen.</p>");
                    setTimeout(function() {
                        overview.closeEmail()
                    }, 5000);
                }
            })
        },

        /**
         * Close the e-mail popup
         */
        closeEmail : function() {
            $(".books, header").removeClass("blur", 200);
            $(".email-overlay").fadeOut(function() {
                $(this).remove();
            });
        },

        /**
         * Switch a book
         * @param id
         */
        switchBook : function(id) {
            if(overview.books.length == overview.index) {
                alert("Alle boeken zijn op");
            }
            else {
                overview.index++;

                var book = $("figure[data-index=" + id + "]").parent();

                $("figure[data-index=" + id + "]").parent().empty();

                data = overview.books[overview.index];
                var handlebars = Handlebars.templates["book-template"];
                $(book).append(handlebars(data));

                $(book).children("figure").attr("data-index", overview.index);
            }
        },
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

    // Touch move
    var dragging = false;
    $("body").on("touchmove", function(){
        dragging = true;
    });
    $("body").on("touchstart", function(){
        dragging = false;
    });

    // Dislike button
    $(document).on('touchstart click', '#dislike', function(event){
        event.stopPropagation();
        event.preventDefault();
        if(event.handled !== true) {
            $(".tag_1").addClass("rotate-right");
            setTimeout(function() {
                var item = $(".rotate-right");
                swipe.dislike(item);
                swipe.animateBackground("dislike");
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
                swipe.animateBackground("like");
            }, 400 );
            event.handled = true;
        } else {
            return false;
        }
    });

    // Show detail overlay
    $(document).on("touchend click", ".book figure", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(!dragging) {
            var element = $(this);

            if(event.handled !== true) {
                setTimeout(function() {
                    overview.showDetail($(element).data("index"));
                }, 400 );
                event.handled = true;
            } else {
                return false;
            }
        }
    });

    // Hide detail overlay
    $(document).on("touchstart click", ".close", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(event.handled !== true) {
            setTimeout(function() {
                overview.removeDetail();
            }, 400 );
            event.handled = true;
        } else {
            return false;
        }
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

    // Back button
    $(document).on("touchstart click", ".icon-home", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(event.handled !== true) {
            setTimeout(function() {
                swipe.reset();
            }, 400 );
            event.handled = true;
        } else {
            return false;
        }
    });

    // Print button
    $(document).on("touchstart click", ".icon-print", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(event.handled !== true) {
            setTimeout(function() {
                overview.print();
            }, 400 );
            event.handled = true;
        } else {
            return false;
        }
    });

    // E-mail button
    $(document).on("touchstart click", ".icon-email", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(event.handled !== true) {
            setTimeout(function() {
                overview.showEmail();
            }, 400 );
            event.handled = true;
        } else {
            return false;
        }
    });
    $(document).on("touchstart click", ".email-overlay input[type=button]", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(event.handled !== true) {
            setTimeout(function() {
                overview.sendEmail();
            }, 400 );
            event.handled = true;
        } else {
            return false;
        }
    });
    $(document).on("touchstart click", ".email-overlay .close img", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(event.handled !== true) {
            setTimeout(function() {
                overview.closeEmail();
            }, 400 );
            event.handled = true;
        } else {
            return false;
        }
    });

    // Switch book
    $(document).on("touchend click", ".book .delete", function(event){
        event.stopPropagation();
        event.preventDefault();

        if(!dragging) {
            var element = $(this);
            if(event.handled !== true) {
                setTimeout(function() {
                    var id = $(element).closest("figure").data("index");
                    overview.switchBook(id);
                }, 400 );
                event.handled = true;
            } else {
                return false;
            }
        }
    });
});