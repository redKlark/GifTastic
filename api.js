$(document).ready(function() {
	var punks = [
		'Joy Division',
		'The Cure',
		'The Smiths',
		'Ramones',
		'Gang of Four',
		'New Order',
		'The Fall',
		'Talking Heads',
		'Bauhaus',
		'Talking Heads',
		'U2',
		'R.E.M.',
		'Depeche Mode',
		'Tears for Fears'
	];

	// function to make buttons and add to page
	function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
		$(areaToAddTo).empty();

		for (var i = 0; i < arrayToUse.length; i++) {
			var a = $('<button>');
			a.addClass(classToAdd);
			a.attr('data-type', arrayToUse[i]);
			a.text(arrayToUse[i]);
			$(areaToAddTo).append(a);
		}
	}

	$(document).on('click', '.punk-button', function() {
		$('#punks').empty();
		$('.punk-button').removeClass('active');
		$(this).addClass('active');

		var type = $(this).attr('data-type');
		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=dc6zaTOxFJmzC&limit=10';

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var punkDiv = $('<div class="punk-item">');

				var rating = results[i].rating;

				var p = $('<p>').text('Rating: ' + rating);

				var animated = results[i].images.fixed_height.url;
				var still = results[i].images.fixed_height_still.url;

				var punkImage = $('<img>');
				punkImage.attr('src', still);
				punkImage.attr('data-still', still);
				punkImage.attr('data-animate', animated);
				punkImage.attr('data-state', 'still');
				punkImage.addClass('punk-image');

				punkDiv.append(p);
				punkDiv.append(punkImage);

				$('#punks').append(punkDiv);
			}
		});
	});

	$(document).on('click', '.punk-image', function() {
		var state = $(this).attr('data-state');

		if (state === 'still') {
			$(this).attr('src', $(this).attr('data-animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).attr('data-still'));
			$(this).attr('data-state', 'still');
		}
	});

	$('#add-punk').on('click', function(event) {
		event.preventDefault();
		var newpunk = $('input').eq(0).val();

		if (newpunk.length > 2) {
			punks.push(newpunk);
		}

		populateButtons(punks, '.punk-button', '#punk-buttons');
	});

	populateButtons(punks, '.punk-button', '#punk-buttons');
});
