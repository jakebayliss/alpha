import { Enemy } from './Enemy';
import { playerStorage } from './localStorage';
import ui from './ui';

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

const player = playerStorage.load();

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

async function initialiseGame(gameState: GameState) {
    const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
    const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
    const restBtn = document.getElementById('rest-btn') as HTMLButtonElement;

    playBtn.addEventListener('click', () => {
        ui.fighting();

        initialiseFight();
    });

    attackBtn.addEventListener('click', async () => {
        const damage = player.attack(enemy);
        ui.updateHealthBar('enemy-health', enemy);
        ui.log(`You attacked ${enemy.name} for ${damage} damage!`);
        const isEnemyAlive = enemy.isAlive();
        if (!isEnemyAlive) {
            ui.log(`${enemy} has been defeated!`);
            player.gainExp(enemy.totalHealth);
            ui.updateExpBar(player.exp);
            await wait(1000);
            initialiseFight();
            return;
        }
        await wait(1000);
        var selfDamage = enemy.attack(player);
        ui.updateHealthBar('player-health', player);
        ui.log(`${enemy.name} attacked you for ${selfDamage} damage!`);
        const isPlayerAlive = player.isAlive();
        if (!isPlayerAlive) {
            ui.log(`You have been defeated by ${enemy.name}!`);
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

    ui.updateExpBar(player.exp);
    
    const playerLetter = document.getElementById('player-letter') as HTMLSpanElement;
    const enemyLetter = document.getElementById('enemy-letter') as HTMLSpanElement;
    playerLetter.textContent = player.name;
    ui.updateHealthBar('player-health', player);
    enemyLetter.textContent = enemy.name;
    ui.updateHealthBar('enemy-health', enemy);
}

function rest() {
    ui.log(`You rest and recover your health.`);
    player.saveExp();
    playerStorage.save(player);

    ui.resting();
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}