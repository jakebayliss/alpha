export type PlayerState = {
  strength: number;
  defense: number;
  speed: number;
  totalHealth: number;
  currentHealth: number;
  baseExp: number;
    exp: number;
};

export class Player {
    letter: string;
    strength: number;
    defense: number;
    speed: number;
    totalHealth: number;
    currentHealth: number;
    baseExp: number;
    exp: number;

    constructor(letter: string, state: PlayerState) {
        this.letter = letter;
        this.strength = state.strength;
        this.defense = state.defense;
        this.speed = state.speed;
        this.totalHealth = state.totalHealth;
        this.currentHealth = state.currentHealth;
        this.baseExp = state.baseExp;
        this.exp = state.exp;
    }

    attack(target: Player): number {
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

    gainExp(amount: number): void {
        this.exp += amount;
    }

    saveExp(){
        this.baseExp = this.exp;
        this.exp = 0;
    }

    getState(): PlayerState {
        return {
            strength: this.strength,
            defense: this.defense,
            speed: this.speed,
            totalHealth: this.totalHealth,
            currentHealth: this.currentHealth,
            baseExp: this.baseExp,
            exp: this.exp,
        };
    }

    static spawn(letter: string): Player {
        const totalHealth = Math.floor(Math.random() * 10) + 10;
        const randomState: PlayerState = {
            strength: Math.floor(Math.random() * 5) + 1,
            defense: Math.floor(Math.random() * 5) + 1,
            speed: Math.floor(Math.random() * 3) + 1,
            totalHealth: totalHealth,
            currentHealth: totalHealth,
            baseExp: 0,
            exp: 0,
        };
        randomState.currentHealth = randomState.totalHealth;
        return new Player(letter, randomState);
    }
}
