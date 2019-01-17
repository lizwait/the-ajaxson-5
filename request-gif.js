

$(document).ready(function() {

    $("#form-gif-request").submit(fetchAndDisplayGif); 
});

function fetchAndDisplayGif(event) {
    event.preventDefault();
    $("#loading").text("Loading...").attr("hidden", false);
    $("#gif").attr("hidden", true);

    var searchQuery = $("#gif-search"); 

    var params = { 
        api_key: "dc6zaTOxFJmzC", 
        tag : "jackson-5 " + searchQuery.val()
    };
    if (validateSearch() == false) {

        return false;
    }
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", 
        data: params, 
        success: function(response) {
            console.log("we received a response!");
            console.log(response);
            document.getElementById('gif').src = response.data.images.original.url;
            setGifLoadedStatus(true);
        },
        error: function() {
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    
}

function validateSearch()
{
    var riddle = $("#riddle");
    
    if (riddle.val() == "5") {
        riddle.removeClass("border border-danger");
        $("#error").text("");
        return true;

    } else {
        $("#error").text("No gifs for you. Please try again.").attr("hidden", false);
        riddle.addClass("border border-danger");
        setGifLoadedStatus(false);
        return false;
    }
}

function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
    $("#loading").attr("hidden", true);
}