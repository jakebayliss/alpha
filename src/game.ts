import { Enemy } from './Enemy';
import { Fighter } from './Fighter';
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

const player = new Player({
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

const enemies = [
  new Enemy({ name: 'Goblin', level: 1, strength: 10, defense: 10, speed: 10, accuracy: 0.9, totalHealth: 10, currentHealth: 10 }),
  new Enemy({ name: 'Worm', level: 2, strength: 11, defense: 11, speed: 11, accuracy: 0.9, totalHealth: 11, currentHealth: 11 }),
];

let enemy = findEnemy(player.level);

function findEnemy(level: number): Enemy {
  const levelEnemies = enemies.filter(e => e.level === level);
  if (!levelEnemies) {
    return Enemy.spawn(level);
  }
  const enemy = levelEnemies[Math.floor(Math.random() * levelEnemies.length)];
  return enemy;
}

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
        log(`You attacked ${enemy.name} for ${damage} damage!`);
        const isEnemyAlive = enemy.isAlive();
        if (!isEnemyAlive) {
            log(`${enemy} has been defeated!`);
            player.gainExp(enemy.totalHealth);
            updateExpBar(player.exp);
            await wait(1000);
            initialiseFight();
            return;
        }
        await wait(1000);
        var selfDamage = enemy.attack(player);
        updateHealthBar('player-health', player);
        log(`${enemy.name} attacked you for ${selfDamage} damage!`);
        const isPlayerAlive = player.isAlive();
        if (!isPlayerAlive) {
            log(`You have been defeated by ${enemy.name}!`);
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
    enemy = findEnemy(player.level);

    updateExpBar(player.exp);
    
    const playerLetter = document.getElementById('player-letter') as HTMLSpanElement;
    const enemyLetter = document.getElementById('enemy-letter') as HTMLSpanElement;
    playerLetter.textContent = player.name;
    updateHealthBar('player-health', player);
    enemyLetter.textContent = enemy.name;
    updateHealthBar('enemy-health', enemy);
}

function rest() {
  player.saveExp();
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
