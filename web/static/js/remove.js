$(document).ready( function () {
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
                if (data['dbErr']) {
                    $('#noProducts h4').remove()
                    $('#noProducts').append('<h4 class="border-msg">' + data['dbErr'] + '</h4>')
                } else {
                    $('.row_' + id + '').remove();
                    $('#noProducts h4').remove()
                    if (data['count'] === 0) {
                        $('#noProducts').append('<h4 class="border-msg">There is no any products</h4>')
                    }
                }
             },
            error: function () {
                console.log("Error");
            }
        });
    });
});