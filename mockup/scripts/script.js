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


                    $('#page-wrapper').append(
                        "<div class='col-md-3 col-lg-3 book' data-id=" + index + ">" +
                        "<img src=" + image + " alt="+ title +" class="+ "resize" + " >" +
                        "</div>"
                    );


                });


            }

        });

    });
