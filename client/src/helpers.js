function distance(arr, a, b) {
    // input

    const distanceArray = arr.slice(0);
    distanceArray.shift();
    const size = distanceArray.shift();
    const planets = distanceArray.splice(0, size);

    const [indexOfA, indexOfB] = [planets.indexOf(a), planets.indexOf(b)];

    return distanceArray[indexOfA + size * indexOfB];
}

function splitPlanets(stringWithPlanets) {
    // input:
    // 05G3W5 4 - 0 0 0 0 078FK 6 bonek 6 0 0 0

    const regex = /[A-Z0-9]{4,} \d+ [a-zA-Z0-9-]+ \d+ \d+ \d+ \d+/g;

    const planets = [];
    let result;
    do {
        result = regex.exec(stringWithPlanets);
        if (result) {
            const [name, efficiency, owner, ships, tanks, production, turn] = result[0].split(' ');
            planets.push({
                name,
                efficiency: parseInt(efficiency),
                owner,
                ships: parseInt(ships),
                tanks: parseInt(tanks),
                production: parseInt(production),
                turn: parseInt(turn)
            });
        }
    } while (result);

    return planets;
}

export { distance, splitPlanets };