import React from 'react';
import { splitPlanets, splitDivisions } from '../helpers';
import Planet from '../components/Game/Planet';
import Division from '../components/Game/Division';

import { PICK_PLANET } from '../actions/game';

export const IO_GAME_JOIN_CHANNEL_OK = 'IO_GAME_JOIN_CHANNEL_OK';
export const IO_GAME_CHANNEL_OPERATOR = 'IO_GAME_CHANNEL_OPERATOR';
export const IO_GAME_PLANETS = 'IO_GAME_PLANETS';
export const IO_GAME_DIVISIONS = 'IO_GAME_DIVISIONS';


const splitPlayers = (input) => {
    const players = input.split(' ').slice(1);
    return players;
}

const game = (state = {}, action) => {
    switch (action.type) {
        case IO_GAME_JOIN_CHANNEL_OK:
            return {
                ...state,
                players: splitPlayers(action.data)
            };

        case IO_GAME_CHANNEL_OPERATOR:
            return {
                ...state,
                operator: action.data
            };

        case IO_GAME_PLANETS:
            const planetsData = splitPlanets(action.data);
            const planets = planetsData.map(planet =>
                <Planet key={planet.name} details={planet} {...state} />
            );

            return {
                ...state,
                planets
            };

        case IO_GAME_DIVISIONS:
            const divisionsData = splitDivisions(action.data);
            const divisions = divisionsData.map((division, i) =>
                <Division key={i} details={division} {...state} />
            );

            return {
                ...state,
                divisions
            };

        case PICK_PLANET:
            console.log('--- PICK_PLANET ---');
            const planet = action.planet;
            console.log(planet);

            const { owner } = planet.props.details;
            console.log(`Owner: ${owner}`);

            console.log(`Do we have access to state.login?`);
            console.log(state);

            if (owner === state.login) {
                console.log('Klik na moja planete.');
            } else {
                console.log('Klik na cudza planete.');
            }

            console.log('--- / PICK_PLANET ---');


        default:
            return state;
    }
}

export default game;