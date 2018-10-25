 $(document).ready( function () {
    $("#add-form").submit(function (event) {

        event.preventDefault()


        $.ajax({
            url: 'add',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $(this).find('#name').val(),
                "department": $(this).find('#department').val(),
                "description": $(this).find('#description').val(),
                "price": $(this).find('#price').val()
            }),
            processData: false,
            success: function (data) {
                if (data['dbErr']) {
                    $('#noProducts h4').remove()
                    $('#noProducts').append('<h4 class="border-msg">' + data['dbErr'] + '</h4>')
                } else {
                    let buttons = "<div class='col-sm-4 text-right'>"
                        + "<button type='button' class='detailsItem btn btn-info' id='"
                        + data['_id']['$oid'] + "'>Show</button>"
                        + " <button type='button' class='editItem btn btn-primary' id='"
                        + data['_id']['$oid'] + "'>Edit</button>"
                        + " <button type='button' class='removeItem btn btn-danger' id='"
                        + data['_id']['$oid'] + "'>Remove</button>"
                        + "</div>";

                     let description = "<p class='col-sm-8 text-center' id='desc_"
                         + data['_id']['$oid'] + "'>"
                         + data['description']
                         + "</p>";

                     let row = "<div class='row align-items-center justify-content-md-center db_row row_"
                        + data['_id']['$oid'] + "'><div class='col-sm-3 text-center' id='prod_val'>"
                        + data['name'] + "</div>"
                        + "<div class='col-sm-3 text-center' id='dep_val'>" + data['department'] + "</div>"
                        + "<div class='col-sm-2 text-center' id='price_val'>" + data['price'] + "</div>"
                        + buttons
                        + description
                        + "</div>";

                    $('#dynamic').append(row);
                    $('#noProducts h4').remove()
                }
            },
            error: function () {
                console.log("Error")
            }
        });

        $('#add-form').trigger("reset");
    });
});