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
            success: function (data) {
                if (data['connectionErr']) {
                    $('#noProducts h4').remove()
                    $('#noProducts').append('<h4>' + data['connectionErr'] + '</h4>')
                } else {
                    let row = "<tr id='row_" + data['_id']['$oid'] + "' class='row'><td class='col-sm-3'>" + data['name'] +
                        "</td><td class='col-sm-3'>" + data['description'] +
                        "</td><td class='col-sm-3'>" + data['price'] +
                        "</td><td class='col-sm-3'><button type='button' class='removeItem btn btn-danger' id='" + data['_id']['$oid'] + "'>remove</button></td></tr>";
                    $('#dynamic').append(row);
                    $('#noProducts h4').remove()
                }
            },
            error: function () {
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
                if (data['connectionErr']) {
                    $('#noProducts h4').remove()
                    $('#noProducts').append('<h4>' + data['connectionErr'] + '</h4>')
                } else {
                    $('#row_' + id + '').remove();
                    $('#noProducts h4').remove()
                    if (data['count'] === 0) {
                        $('#noProducts').append('<h4>There is no any products</h4>')
                    }
                }
             },
            error: function () {
                console.log("Error");
            }
        });
    });
});