$(document).ready( function () {
        $(document).on('click', '.detailsItem', function () {
            let id = $(this).attr('id')
            let value = $(this).text();

            if ( $('#update_' + id).is(':visible') ) {
                $('#update_' + id).remove();
            }

            $('#desc_' + id).toggle();

            if ( value === "Show") {
                $(this).text('Hide');
            } else {
                $(this).text('Show');
            }
        });

});