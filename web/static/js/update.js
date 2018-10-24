$(document).ready(function () {
    $(document).on('submit', '#change-form',  function (event) {

        event.preventDefault();
        let id = $(this).find('#id').val();
        let name = $(this).find('#name').val();
        let department = $(this).find('#department').val();
        let description = $(this).find('#description').val();
        let price = $(this).find('#price').val()

        $.ajax({
            url: 'update',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "id": id,
                "name": name,
                "department": department,
                "description": description,
                "price": price
            }),
            processData: false,
            success: function (data) {
                if (data['dbErr']) {
                    $('#noProducts h4').remove()
                    $('#noProducts').append('<h4 class="border-msg">' + data['dbErr'] + '</h4>')
                } else {
                    $('#update_' + id).remove();
                    $('.row_' + id).find('#prod_val').text(name);
                    $('.row_' + id).find('#dep_val').text(department);
                    $('.row_' + id).find('#price_val').text(price);
                    $('#desc_' + id).text(description);
                }
            },
            error: function () {
                console.log('Error')
            }
        });

    });
})