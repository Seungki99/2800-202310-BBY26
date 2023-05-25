let map;
let infoWindow;

function initMap() {
    // Initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 15,
    });

    infoWindow = new google.maps.InfoWindow();

    // Prompt user for location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Set user's location on the map
                map.setCenter(userLocation);
                const marker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Location",
                });

                // Display nearby recycling depots
                displayNearbyRecyclingDepots(userLocation);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function displayNearbyRecyclingDepots(userLocation) {
    // Create a PlacesService object to search for nearby recycling depots
    const service = new google.maps.places.PlacesService(map);

    // Specify the search parameters
    const request = {
        location: userLocation,
        radius: "700", // Specify the radius within which to search for recycling depots
        keyword: "recycling",
    };

    // Perform the nearby search
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}

function createMarker(place) {
    // Create a marker for each recycling depot
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Custom icon for recycling centers
        },
    });

    // Display place details in an info window when clicked
    google.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(place.name);
        infoWindow.open(map, marker);
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, userLocation) {
    infoWindow.setPosition(userLocation);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
// Handle back button click event
backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
    // Redirect to another page
    window.location.href = "/members";
});
