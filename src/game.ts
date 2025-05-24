import { Player } from './Player';

type GameState = {
    fighting: boolean;
    resting: boolean;
    player: string;
    enemy: string;
};

const gameState: GameState = {
    fighting: false, 
    resting: false, 
    player: 'a',
    enemy: 'a',
};

const player = new Player(gameState.player,{
    strength: 5,
    defense: 3,
    speed: 2,
    totalHealth: 20,
    currentHealth: 20,
    baseExp: 0,
    exp: 0,
});

let enemy = Player.spawn(gameState.enemy);

document.addEventListener('DOMContentLoaded', () => {
    initialiseGame(gameState);
});

async function initialiseGame(gameState: GameState){
    const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
    const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
    const restBtn = document.getElementById('rest-btn') as HTMLButtonElement;
    playBtn.addEventListener('click', () => {
        const gameContainer = document.getElementById('game-container') as HTMLDivElement;
        playBtn.style.display = 'none';
        gameContainer.style.display = 'flex';
        attackBtn.style.display = 'block';
        restBtn.style.display = 'block';

        initialiseFight();
    });

    attackBtn.addEventListener('click', async () => {
        const damage = player.attack(enemy);
        updateHealthBar('enemy-health', enemy);
        log(`You attacked ${enemy.letter} for ${damage} damage!`);
        const isEnemyAlive = enemy.isAlive();
        if (!isEnemyAlive) {
            log(`${enemy.letter} has been defeated!`);
            player.gainExp(enemy.totalHealth);
            updateExpBar(player.exp);
            await wait(1000);
            initialiseFight();
            return;
        }
        await wait(1000);
        var selfDamage = enemy.attack(player);
        updateHealthBar('player-health', player);
        log(`${enemy.letter} attacked you for ${selfDamage} damage!`);
        const isPlayerAlive = player.isAlive();
        if (!isPlayerAlive) {
            log(`You have been defeated by ${enemy.letter}!`);
            await wait(1000);
            initialiseFight();
            return;
        }
    });

    restBtn.addEventListener('click', () => {
        rest();
    });
}

function initialiseFight() {
    enemy = Player.spawn(gameState.enemy);

    updateExpBar(player.exp);
    
    const playerLetter = document.getElementById('player-letter') as HTMLSpanElement;
    const enemyLetter = document.getElementById('enemy-letter') as HTMLSpanElement;
    playerLetter.textContent = player.letter;
    updateHealthBar('player-health', player);
    enemyLetter.textContent = enemy.letter;
    updateHealthBar('enemy-health', enemy);
}

function rest() {
  player.saveExp();
}

function updateHealthBar(element: string, player: Player): void {
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

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(message: string): void {
  const logDiv = document.getElementById('log');
  if (logDiv) {
    const entry = document.createElement('p');
    entry.textContent = message;
    logDiv.prepend(entry);
  }
}
