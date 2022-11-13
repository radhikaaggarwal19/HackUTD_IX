# HackUTD_IX
Dynamic location-based service recommendation generator

Inspiration--
My group decided to tackle the Toyota challenge. We were thinking of ideas along the lines of convenience; what would make driving better? That's when we realized, sometimes when you're driving from point A to point B, you realize that you might want to get food on the way, fill your car with gas, etc. Instead of picking up your phone while driving to think of a place to go eat and then putting in directions, why not just ask Toyota's voice assistant to keep a look out for restaurants on the way to point B?

What it does--
The user will tell Toyota's voice assistant to keep a look out for restaurants, gas stations, convenience stores, etc. As the user is driving the voice assistant will start saying the nearby places and if the user decides to use one of the options the voice assistant will include a stop in the user's trip. DynamiGo consistently picks up the user's location and dynamically recommends places on the route as they go. This would also comply with security requirements: ensuring there is enough distance to the recommended place that the detour is not unsafe, and that the user is not bombarded with recommendations to prevent distraction.

How we built it--
This project was built using JavaScript, HTML, and CSS on Visual Studio Code using the Google Maps Places and Geolocation API's.

Challenges we ran into--
We had difficulty replicating an on-the-go environment and we didn't have access to the voice assistant to integrate with our project.

Accomplishments that we're proud of--
We are proud of the idea we came up with and the potential future implementations of the idea. We also successfully integrated APIs with our program having never worked with API's before.

What we learned--
We learned how to think of an idea in a well-rounded manner - thinking of all aspects of it. After discussing this idea with Toyota employees, we also realized the additional security considerations of this feature.

What's next for DynamiGo--
The next steps for DynamiGo would be fully integrating it with Toyota's voice assistant and integrating it into Toyota's app for their vehicles. DynamiGo would include presets for the user to define preferences in regards to restaurants and stores. These presets would allow the voice assistant to prioritize the places the user prefers. Depending on the user's speed, DynamiGo would recommend places that are within a safe detour distance e.g. if the user is driving over 40mph then the service would recommend places within 2-3 miles of the user's location.