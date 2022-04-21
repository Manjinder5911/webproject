function updateMap() {
    console.log("updating data with real time")
    fetch("/data.json")
        .then(Response => Response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.Lat;
                longitude = element.Lon;

                cases = element.Cases;
                if (cases > 255){
                    color = " rgb(255,0,0)";
                }
                else if(100<cases<255){
                    color = ` rgb(${cases},0,0)`;
                }
                else{
                    color = ` rgb(${cases},${cases},0)`;
                }

                // mark on map
                new mapboxgl.Marker({
                    draggable: false,
                    color:color
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            });

        })
}

setInterval(updateMap,20000)