export const PICK_PLANET = 'PICK_PLANET';

const pickPlanet = (planet) => ({
    type: PICK_PLANET,
    planet
});

export { pickPlanet };