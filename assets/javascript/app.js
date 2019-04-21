$(document).ready(function () {
	var movies = ["toy story", "coco", "cars", "finding nemo", "inside out", "monsters inc", "the incredibles", "up"];

	// Add buttons for original movies array
	function renderButtons() {
		$("#movie-buttons").empty();
		for (i = 0; i < movies.length; i++) {
			$("#movie-buttons").append("<button class='btn btn-success' data-movie='" + movies[i] + "'>" + movies[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for movie entered
	$("#add-movie").on("click", function () {
		event.preventDefault();
		var movie = $("#movie-input").val().trim();
		movies.push(movie);
		renderButtons();
		return;
	});


	// connecting to api
	$("button").on("click", function () {
		var movie = $(this).attr("data-movie");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			movie + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#movies").empty();
			for (var i = 0; i < results.length; i++) {
				var movieDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var movieImg = $("<img>");

				movieImg.attr("src", results[i].images.original_still.url);
				movieImg.attr("data-still", results[i].images.original_still.url);
				movieImg.attr("data-animate", results[i].images.original.url);
				movieImg.attr("data-state", "still");
				movieImg.attr("class", "gif");
				movieDiv.append(p);
				movieDiv.append(movieImg);
                $("#movies").append(movieDiv);
                console.log(original_still)
			}
		});
    });
    
    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


	// function changeState(){
	// 	var state = $(this).attr("data-state");
	// 	var animateImage = $(this).attr("data-animate");
	// 	var stillImage = $(this).attr("data-still");

	// 	if (state == "still") {
	// 		$(this).attr("src", animateImage);
	// 		$(this).attr("data-state", "animate");
	// 	}

	// 	else if (state == "animate") {
	// 		$(this).attr("src", stillImage);
	// 		$(this).attr("data-state", "still");
	// 	}
	// }

	// $("img").on("click", function() {
	// 	console.log("click worked!");
	// 	var src = movieImg.attr(src);
	// 	src = src.substring(0, src.length - 10);
	// 	src += ".url";
	// 	console.log(src);
	// 	movieImg.attr("src", src);
    // });
    
        //   // Else set src to the data-still value
        //   if (state === "still") {
        //     $(this).attr("src", $(this).attr("data-animate"));
        //     $(this).attr("data-state", "animate");
        //   } else {
        //     $(this).attr("src", $(this).attr("data-still"));
    //     //     $(this).attr("data-state", "still");
    

	// $(document).on("click", "#input", displayImg);
	// $(document).on("click", ".gif", changeState);

});