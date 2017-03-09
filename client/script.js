$(document).ready(function(){
    $('#addLocationButton').attr('disabled', true);
    getLocations();

    $(document).keyup(function(e){
        if($('#name').val().length != 0){
            if($('#phone').val().length != 0){
                if($('#address1').val().length != 0){
                    if($('#city').val().length != 0){
                        if($('#state').val().length != 0){
                            if($('#zip').val().length != 0){
                                $('#addLocationButton').attr('disabled', false);
                            }
                        }
                    }
                }
            }
        }else{
            $('#addLocationButton').attr('disabled', true);
        }
    }); 
    
    $divId = 0;
    function addLocation(location){
        $('<div class="pizzaPlanetLocation" id="' + $divId + '"><ul class="list-group"></ul></div><p></p><p></p>').appendTo($('#pizzaPlanetLocations'));
        $('<li class="list-group-item"></li>').text(location.name).appendTo('#' + $divId + '');
        $checkbox = $('<li class="list-group-item"><input type="checkbox" disabled> Delivers</li>');
        if(location.delivers){
            $checkbox.children().first().attr('checked', true);
        }
        $('#' + $divId + '').append($checkbox);
        $('<li class="list-group-item"></li>').text(location.phone).appendTo('#' + $divId + '');
        $('<li class="list-group-item"></li>').text(location.address.line1).appendTo('#' + $divId + '');
        $('<li class="list-group-item"></li>').text(location.address.line2).appendTo('#' + $divId + '');
        $('<li class="list-group-item"></li>').text(location.address.city).appendTo('#' + $divId + '');
        $('<li class="list-group-item"></li>').text(location.address.state).appendTo('#' + $divId + '');
        $('<li class="list-group-item"></li>').text(location.address.zip).appendTo('#' + $divId + '');
        $divId += 1;
    }

    function getLocations(){
        $divId = 0;
        $('.pizzaPlanetLocation').remove();
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/api/locations'
        }).then(function(locations){
            for(var i = 0; i < locations.length; i++){
                addLocation(locations[i]);
            };
        }, function(err){
            console.log(err);
        });
    };

    $('#addLocationButton').click(function(){
        var delivers = false;
        if($('#delivers').is(':checked')){
            delivers = true;
        }

        $address = {
            line1: $('#address1').val(),
            line2: $('#address2').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            zip: $('#zip').val()
        };

        $newLocation = {
            name: $('#name').val(),
            delivers: delivers,
            phone: $('#phone').val(),
            address: $address
        };

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/api/locations',
            contentType: 'application/json',
            data: JSON.stringify($newLocation)
        }).then(function() {
            getLocations();  
            $('#name').val('');
            $('#phone').val('');
            $( "#delivers" ).prop( "checked", false );
            $('#address1').val('');
            $('#address2').val(''); 
            $('#city').val('');
            $('#state').val('');
            $('#zip').val('');
        });
});
});