import { Fighter } from "./Fighter";

function fighting(){
    const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
    const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
    const restBtn = document.getElementById('rest-btn') as HTMLButtonElement;
    const gameContainer = document.getElementById('game-container') as HTMLDivElement;

    playBtn.style.display = 'none';
    gameContainer.style.display = 'flex';
    attackBtn.style.display = 'block';
    restBtn.style.display = 'block';
}

function resting() {
    const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
    const restBtn = document.getElementById('rest-btn') as HTMLButtonElement;
    const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
    const gameContainer = document.getElementById('game-container') as HTMLDivElement;
    playBtn.style.display = 'block';
    gameContainer.style.display = 'none';
    attackBtn.style.display = 'none';
    restBtn.style.display = 'none';
}

function updateHealthBar(element: string, player: Fighter): void {
    const healthBar = document.getElementById(element) as HTMLProgressElement;
    if (healthBar) {
        healthBar.textContent = `${player.currentHealth} / ${player.totalHealth}`;
    }
}

function updateExpBar(exp: number): void {
    const expBar = document.getElementById('exp-bar') as HTMLProgressElement;
    if (expBar) {
        expBar.textContent = `Exp: ${exp}`;
        expBar.value = exp;
    }
}

function log(message: string): void {
  const logDiv = document.getElementById('log');
  if (logDiv) {
    const entry = document.createElement('p');
    entry.textContent = message;
    logDiv.prepend(entry);
  }
}

export const ui = {
    fighting,
    resting,
    updateHealthBar,
    updateExpBar,
    log
};

export default ui;