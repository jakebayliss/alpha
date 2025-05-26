import { Fighter } from "./Fighter";
import { Player } from "./Player";
import { playerStorage } from "./localStorage";

function setPlayerStats(player: Player): void {
    ui.updateHealthBar('player-health', player);
    const playerName = document.querySelector('#player-container .character-name') as HTMLDivElement;
    ui.updateExpBar(player.baseExp);
    playerName.textContent = player.name;
}

function setEnemyStats(enemy: Fighter): void {
    ui.updateHealthBar('enemy-health', enemy);
    const enemyName = document.querySelector('#enemy-container .character-name') as HTMLDivElement;
    enemyName.textContent = enemy.name;
}

function fighting(){
    const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
    const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
    const restBtn = document.getElementById('rest-btn') as HTMLButtonElement;
    const battlefield = document.getElementById('battlefield') as HTMLDivElement;
    const enemyContainer = document.getElementById('enemy-container') as HTMLDivElement;

    playBtn.style.display = 'none';
    battlefield.style.display = 'flex';
    attackBtn.style.display = 'block';
    restBtn.style.display = 'block';
    enemyContainer.style.display = 'block';
}

function resting() {
    const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
    const restBtn = document.getElementById('rest-btn') as HTMLButtonElement;
    const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
    const battlefield = document.getElementById('battlefield') as HTMLDivElement;
    const enemyContainer = document.getElementById('enemy-container') as HTMLDivElement;
    
    playBtn.style.display = 'block';
    battlefield.style.display = 'none';
    attackBtn.style.display = 'none';
    restBtn.style.display = 'none';
    enemyContainer.style.display = 'none';
}

function updateHealthBar(element: string, player: Fighter): void {
    const healthBar = document.getElementById(`${element}-bar`) as HTMLDivElement;
    const health = document.getElementById(element) as HTMLDivElement;
    const healthPercentage = (player.currentHealth / player.totalHealth) * 100;
    healthBar.style.width = `${healthPercentage}%`;
    health.textContent = `${player.currentHealth} / ${player.totalHealth}`;
}

function updateExpBar(exp: number): void {
    const expDisplay = document.getElementById('exp-bar') as HTMLSpanElement;
    if (expDisplay) {
        expDisplay.textContent = `Exp: ${exp}`;
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

function showUsernameForm() {
    const usernameForm = document.getElementById('username-form') as HTMLDivElement;
    const battlefield = document.getElementById('battlefield') as HTMLDivElement;
    const actions = document.getElementById('actions') as HTMLDivElement;
    
    usernameForm.style.display = 'block';
    battlefield.style.display = 'none';
    actions.style.display = 'none';
}

function hideUsernameForm() {
    const usernameForm = document.getElementById('username-form') as HTMLDivElement;
    const battlefield = document.getElementById('battlefield') as HTMLDivElement;
    const actions = document.getElementById('actions') as HTMLDivElement;
    
    usernameForm.style.display = 'none';
    battlefield.style.display = 'flex';
    actions.style.display = 'block';
}

function createNewPlayer(username: string): Player {
    const player = new Player({
        name: username,
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
    playerStorage.save(player);
    return player;
}

export const ui = {
    setPlayerStats,
    setEnemyStats,
    fighting,
    resting,
    updateHealthBar,
    updateExpBar,
    log,
    showUsernameForm,
    hideUsernameForm,
    createNewPlayer
};

export default ui;