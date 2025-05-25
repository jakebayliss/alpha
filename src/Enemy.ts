import { Fighter, FighterState } from "./Fighter";


export class Enemy extends Fighter {
    name: string;

    constructor(state: FighterState) {
        super(state);
        this.name = state?.name || enemyNames[Math.floor(Math.random() * enemyNames.length)];
    }

    static spawn(level: number): Enemy {
        const totalHealth = Math.floor(Math.random() * 10) + 10;
        const name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
        const randomState: FighterState = {
            name: name,
            level: level,
            strength: Math.floor(Math.random() * 5) + level,
            defense: Math.floor(Math.random() * 5) + level,
            speed: Math.floor(Math.random() * 3) + level,
            accuracy: Math.random() * 0.1 + (level * 0.9),
            totalHealth: totalHealth,
            currentHealth: totalHealth,
        };
        randomState.currentHealth = randomState.totalHealth;
        return new Enemy(randomState);
    }
}

const enemyNames = [
    "Goblin",
    "Orc",
    "Troll",
    "Skeleton",
    "Zombie",
    "Dragon",
    "Vampire",
    "Werewolf",
    "Giant Spider",
    "Bandit",
    "Witch",
    "Demon",
    "Ghost",
    "Golem",
    "Minotaur",
    "Hydra",
    "Phoenix",
    "Griffin",
    "Basilisk",
    "Chimera",
    "Kraken"]