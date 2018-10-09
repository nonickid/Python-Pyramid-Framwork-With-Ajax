<!-- (function ($) { -->
 $(document).ready( function () {
    $("#my-form").submit(function (event) {

        event.preventDefault()

        $.ajax({
            url: 'add',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $('#name').val(),
                "description": $('#description').val(),
                "price": $('#price').val()
            }),
            processData: false,
            success: function (data, textStatus, jQxhr) {
                let row = "<tr id='row_" + data._id.$oid +  "'><td>" + data.name +
                        "</td><td>" + data.description +
                        "</td><td>" + data.price +
                        "</td><td><button type='button' class='removeItem btn btn-danger' id='" + data._id.$oid + "'>remove</button></td></tr>";
                $('#dynamic').append(row);
                $('#noProducts h3').remove()
            },
            error: function (jqHdr, test, error) {
                console.log("Error")
            }
        });

        $('#my-form').trigger("reset");
    });


    $(document).on('click', '.removeItem', function () {

        let id = $(this).attr('id')

        $.ajax({
            url: 'remove',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "id": id
            }),
            processData: false,
            success: function (data) {
                $('#row_' + id + '').remove();
                if (data.count === 0) {
                    $('#noProducts').append('<h3>There is no any products</h3>')
                };
             },
            error: function (jqHdr, test, error) {
                console.log("Error");
            }
        });
    });
});