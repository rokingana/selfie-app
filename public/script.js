/* Client Side where info is taken and stored to the db */

function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(400, 300);
    video.id('video-frame');
    video.parent('capture-screen');

    let latitude, longitude;
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        const name = document.getElementById('name').value;
        const mood = document.getElementById('mood').value;

        video.loadPixels();
        const image64 = video.canvas.toDataURL();

        const data = { latitude, longitude, name, mood, image64 };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch('/api', options);
        const res = await response.json();
        console.log(res);
        

    });

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            document.getElementById('lat').textContent = latitude;
            document.getElementById('long').textContent = longitude;

        });

    } else {
        console.log('unavailable');
    }


}