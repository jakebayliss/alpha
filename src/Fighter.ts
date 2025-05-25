export type FighterState = {
    name: string;
    level: number;
    strength: number;
    defense: number;
    speed: number;
    accuracy: number;
    totalHealth: number;
    currentHealth: number;
};

export class Fighter {
    name: string;
    level: number = 1;
    strength: number;
    defense: number;
    speed: number;
    accuracy: number;
    totalHealth: number;
    currentHealth: number;

    constructor(state: FighterState) {
        this.name = state.name;
        this.level = state.level
        this.strength = state.strength;
        this.defense = state.defense;
        this.speed = state.speed;
        this.accuracy = state.accuracy;
        this.totalHealth = state.totalHealth;
        this.currentHealth = state.currentHealth;
    }

    attack(target: Fighter): number {
        const damage = Math.max(this.strength - target.defense, 1);
        target.takeDamage(damage);
        return damage;
    }

    takeDamage(amount: number): void {
        this.currentHealth = Math.max(this.currentHealth - amount, 0);
    }

    isAlive(): boolean {
        return this.currentHealth > 0;
    }

    getState(): FighterState {
        return {
            name: this.name,
            level: this.level,
            strength: this.strength,
            defense: this.defense,
            speed: this.speed,
            accuracy: this.accuracy,
            totalHealth: this.totalHealth,
            currentHealth: this.currentHealth,
        };
    }
}
