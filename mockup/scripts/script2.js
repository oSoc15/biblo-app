/**
 * Created by vanbrabantwesley on 8/07/15.
 */

$(document).ready(function() {

    //after button is clicked we download the data
    //start ajax request
    $.ajax({
        type: 'get',
        url: "scripts/data.json",
        //force to handle it as text
        dataType: "json",
        success: function(data) {

            $.each(data, function(index, book){
                var index = index;
                var title = book.title;
                var image = book.coverimage;
                var author = book.author;
                var description = book.description;


                $('.row').append(

                    "<div class='col-md-6 information'>" +
                    "<img src=" + image + " alt="+ title +" class="+ "resize" + " >" +
                    "</div>" +
                    "<div class='col-md-6 information'>" +
                    "<h1 class='title'>" + title + "</h1>" +
                    "<p class='synopsis'>" + description + "</p>" +
                    "<p class='writtenby'> Geschreven door <strong>" + author + "</strong></p>" +
                    "</div>"

                );


            });


        }

    });

});
