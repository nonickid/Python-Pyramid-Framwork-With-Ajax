$(document).ready(function () {
    $(document).on('click', '.editItem', function () {
        let id = $(this).attr('id');
        let prod = $(this).parent('div').parent('div').find('#prod_val').text()
        let dep = $(this).parent('div').parent('div').find('#dep_val').text()
        let price = $(this).parent('div').parent('div').find('#price_val').text()
        let desc = $('#desc_' + id).text();

        console.log(desc);

        if ($('#desc_' + id).is(':visible')) {
            $('#desc_' + id).toggle();
            //$('.detailsItem').closest('button').text('Show');
            $(this).parent('div').find('.detailsItem').text('Show');
        }

        if ( $('#update_' + id).is(':visible') ) {
            $('#update_' + id).remove();
        } else {
            let form = "<div class='col-md-12' id='update_" + id + "'><form id='change-form'>" +
                "<input class='form-control' type='hidden' id='id' value='" + id + "'/>" +
                "<input class='form-control' type='text' id='name' value='" + prod + "'/>" +
                "<input class='form-control' type='text' id='department' value='" + dep + "'/>" +
                "<textarea id='description' class='form-control' form='change-form'>" + desc + "</textarea>" +
                "<input class='form-control' type='text' id='price' value='" + price + "'/>" +
                "<div class='actions'>" +
                "<button type='submit' class='btn btn-primary'>Save</button>" +
                "</div></form></div>";

            $('.db_row').closest('.row_' + id).append(form);
        }
    });
})