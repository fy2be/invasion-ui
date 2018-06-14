function calcDistance(arr, a, b) {
    // input
    if (!a || !b)
        return 0;

    const distanceArray = arr.split(' ').slice(0);
    const size = distanceArray.shift();
    const planets = distanceArray.splice(0, size);

    const [indexOfA, indexOfB] = [planets.indexOf(a), planets.indexOf(b)];
    const index = indexOfA + size * indexOfB;

    return distanceArray[index];
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
                efficiency: parseInt(efficiency, 10),
                owner,
                ships: parseInt(ships, 10),
                tanks: parseInt(tanks, 10),
                production: parseInt(production, 10),
                turn: parseInt(turn, 10)
            });
        }
    } while (result);

    return planets;
}

function splitDivisions(stringWithDivisions) {
    // input:
    // '2 test XXXX YYYY 10 test2 AAA ZZZ 20';

    const regex = /[a-zA-Z0-9]+ [A-Z0-9]{4,} [A-Z0-9]{4,} \d+ \d+/g;

    const divisions = [];
    let result;
    do {
        result = regex.exec(stringWithDivisions);
        if (result) {
            const [name, from, to, ships, timeleft] = result[0].split(' ');
            divisions.push({
                name,
                from,
                to,
                ships: parseInt(ships, 10),
                timeleft: parseInt(timeleft, 10)
            });
        }
    } while (result);

    return divisions;

}

export { calcDistance, splitPlanets, splitDivisions };