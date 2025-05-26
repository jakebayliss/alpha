import { Player } from "./Player";

const STORAGE_KEY = 'player';

export const playerStorage = {
    save(player: Player) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(player.getState()));
    },

    load(): Player {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            const player = new Player(data);
            return player
        }
        return new Player({
            name: 'Hero',
            level: 1,
            strength: 10,
            defense: 10,
            speed: 10,
            accuracy: 0.9,
            totalHealth: 10,
            currentHealth: 10,
            baseExp: 0,
            exp: 0,
        });
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    },
};