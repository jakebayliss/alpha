import { Fighter, FighterState } from "./Fighter";

type PlayerState = FighterState & {
  baseExp: number;
  exp: number;
};

export class Player extends Fighter {
    baseExp: number;
    exp: number;

    constructor(state: PlayerState) {
        super(state);
        this.baseExp = state.baseExp;
        this.exp = state.exp;
    }

    gainExp(amount: number): void {
        this.exp += amount;
    }

    saveExp(){
        this.baseExp = this.exp;
    }

    getState(): PlayerState {
        const fighterState = super.getState();
        return {
            ...fighterState,
            level: this.level,
            baseExp: this.baseExp,
            exp: this.exp,
        };
    }
}
