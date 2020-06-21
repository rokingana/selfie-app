/* Client side that gets data from db and serves it to the Logs client */

getData();
async function getData() {
    const res = await fetch('/api');
    const data = await res.json();

    data.map((item) => {
        const parent = document.createElement('div');
        const title = document.createElement('h2');
        const img = document.createElement('img');
        const geo = document.createElement('p');
        const time = document.createElement('p');
        

        
        

        title.textContent = `${item.name} feeling ${item.mood}`;
        geo.textContent = `Mood registered from ${item.latitude}°, ${item.longitude}°`;
        const date = new Date(item.timeStamp).toDateString();
        time.textContent = `on ${date}`;
        img.src = item.image64;
        img.setAttribute('alt', `${item.name}'s capture when feeling ${item.mood}`);
        parent.setAttribute('class', 'mood-card');

        parent.append(title, img, geo, time);

        document.getElementById('mood-history').append(parent);
    })


    console.log(data);
}