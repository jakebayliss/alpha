import { Enemy } from './Enemy';
import { playerStorage } from './localStorage';
import ui from './ui';
import { Player } from './Player';

type GameState = {
    fighting: boolean;
    resting: boolean;
    player: Player;
    enemy: string;
};

let gameState: GameState;
let player: Player;
let enemy: Enemy;

const enemies = [
  new Enemy({ name: 'Goblin', level: 1, strength: 10, defense: 10, speed: 10, accuracy: 0.9, totalHealth: 3, currentHealth: 3 }),
  new Enemy({ name: 'Worm', level: 2, strength: 11, defense: 11, speed: 11, accuracy: 0.9, totalHealth: 4, currentHealth: 4 }),
];

function findEnemy(level: number): Enemy {
  const levelEnemies = enemies.filter(e => e.level === level);
  if (!levelEnemies) {
    return Enemy.spawn(level);
  }
  const enemy = levelEnemies[Math.floor(Math.random() * levelEnemies.length)];
  enemy.currentHealth = enemy.totalHealth; // Reset health for new fight
  return enemy;
}

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    // Check if player exists in localStorage
    const savedPlayer = playerStorage.load();
    const enemyContainer = document.getElementById('enemy-container') as HTMLDivElement;
    enemyContainer.style.display = 'none';

    if (savedPlayer.name === 'Hero') {
        // No saved player, show username form
        ui.showUsernameForm();
        const startGameBtn = document.getElementById('start-game-btn') as HTMLButtonElement;
        const usernameInput = document.getElementById('username-input') as HTMLInputElement;

        startGameBtn.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            if (username) {
                player = ui.createNewPlayer(username);
                gameState = {
                    fighting: false,
                    resting: false,
                    player: player,
                    enemy: 'a'
                };
                ui.hideUsernameForm();
                ui.setPlayerStats(player);
                setupGameControls();
            }
        });
    } else {
        // Player exists, start game
        player = savedPlayer;
        gameState = {
            fighting: false,
            resting: false,
            player: player,
            enemy: 'a'
        };
        ui.setPlayerStats(player);
        setupGameControls();
    }
}

function setupGameControls() {
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
            ui.log(`${enemy.name} has been defeated!`);
            player.gainExp(enemy.totalHealth);
            player.saveExp();
            playerStorage.save(player);
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
    ui.setEnemyStats(enemy);
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