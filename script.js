// ゲームの状態
let playerHealth = 100;
let enemyHealth = 100;
let playerattackPower = 10;
let enemyattackPower = 5;
let gameOver = false;
let level = 1;

// プレイヤーの初期位置
let player = document.getElementById('player');
let playerPosition = { top: 50, left: 50 };

// 敵の初期設定
let enemies = [];  // 敵の配列

// 敵の数と配置範囲を設定
let enemyCount = 5;
let enemyAreaWidth = 800;  // ゲーム画面の幅
let enemyAreaHeight = 600; // ゲーム画面の高さ

// プレイヤーのHPとステータス表示
let playerHealthBar = document.getElementById('playerHealthBar');
let playerHealthLabel = document.getElementById('playerHealthLabel');

// 敵のHPとステータス表示
let enemyHealthBar = document.getElementById('enemyHealthBar');
let enemyHealthLabel = document.getElementById('enemyHealthLabel');

// プレイヤーの移動処理
function movePlayer(event) {
    if (gameOver) return;
    let key = event.key;

    if (key === 'ArrowUp') playerPosition.top -= 10;
    if (key === 'ArrowDown') playerPosition.top += 10;
    if (key === 'ArrowLeft') playerPosition.left -= 10;
    if (key === 'ArrowRight') playerPosition.left += 10;

    player.style.top = playerPosition.top + 'px';
    player.style.left = playerPosition.left + 'px';

    checkCollision(); // プレイヤーと敵の衝突チェック
}

// プレイヤーと敵の衝突判定
function checkCollision() {
    enemies.forEach((enemy) => {
        let enemyPositionRect = enemy.getBoundingClientRect();
        let playerPositionRect = player.getBoundingClientRect();
        
        // 衝突判定
        if (
            playerPositionRect.top < enemyPositionRect.bottom &&
            playerPositionRect.bottom > enemyPositionRect.top &&
            playerPositionRect.left < enemyPositionRect.right &&
            playerPositionRect.right > enemyPositionRect.left
        ) {
            // 衝突したら戦闘画面に遷移
            startBattle();
        }
    });
}

// 敵をランダムに配置（プレイヤーの位置と重ならないように修正）
function generateEnemies() {
    for (let i = 0; i < enemyCount; i++) {
        let enemyDiv = document.createElement('div');
        enemyDiv.classList.add('enemy');

        let randomTop, randomLeft;

        // プレイヤーの位置と重ならないようにランダムな座標を設定
        do {
            randomTop = Math.floor(Math.random() * enemyAreaHeight);
            randomLeft = Math.floor(Math.random() * enemyAreaWidth);
        } while (
            // プレイヤーの位置と重なっていた場合、再度ランダムに決定
            (randomTop < playerPosition.top + 50 && randomTop > playerPosition.top - 50) &&
            (randomLeft < playerPosition.left + 50 && randomLeft > playerPosition.left - 50)
        );

        enemyDiv.style.top = randomTop + 'px';
        enemyDiv.style.left = randomLeft + 'px';

        // 敵を配列に追加し、ゲーム画面に配置
        enemies.push(enemyDiv);
        document.getElementById('game-map').appendChild(enemyDiv);

        // 敵が生成されたら表示
        enemyDiv.style.display = 'block';
    }
}

// 戦闘開始
function startBattle() {
    if (gameOver) return;

    // ゲームマップを隠す
    document.getElementById('game-map').style.display = 'none';
    document.getElementById('battle-screen').style.display = 'block';

    // 戦闘画面でのキャラクター表示
    document.getElementById('battle-player').style.display = 'block';
    document.getElementById('battle-enemy').style.display = 'block';

    // 敵のHPをリセット
    enemyHealth = 100;
    updateBattleStatus();
}

// 戦闘の攻撃処理
function battleAttack() {
    if (gameOver) return;

    // プレイヤーと敵のHPを減らす
    enemyHealth -= playerattackPower;
    playerHealth -= enemyattackPower; // 敵が攻撃してくるように追加

    // 敵またはプレイヤーのHPが0以下になった場合
    if (enemyHealth <= 0) {
        enemyHealth = 0;
        // 敵を倒した場合、その敵を削除
        let enemyDiv = document.querySelector('.enemy');
        if (enemyDiv) {
            enemyDiv.remove(); // 敵を画面から削除
        }
        document.getElementById('gameOver').textContent = 'You Win!';
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('battle-screen').style.display = 'none';
        document.getElementById('game-map').style.display = 'block';
        gameOver=false;

    }
    
    if (playerHealth <= 0) {
        playerHealth = 0;
        document.getElementById('gameOver').textContent = 'Game Over';
        document.getElementById('game-map').style.display = 'none';
        document.getElementById('battle-screen').style.display = 'block';
        document.getElementById('gameOver').style.display = 'block';
        gameOver = true;
    }

    updateBattleStatus(); // 戦闘ステータスを更新
}

// 戦闘の逃げる処理
function battleRun() {
    if (gameOver) return;
    
    // 戦闘画面を隠して、マップに戻る
    document.getElementById('battle-screen').style.display = 'none';
    document.getElementById('game-map').style.display = 'block';
}

// 戦闘ステータスを更新する関数
function updateBattleStatus() {
    // プレイヤーのHPバーとラベルを更新
    playerHealthLabel.textContent = playerHealth;
    playerHealthBar.value = playerHealth;

    // 敵のHPバーとラベルを更新
    enemyHealthLabel.textContent = enemyHealth;
    enemyHealthBar.value = enemyHealth;
}

// キー入力によるプレイヤー移動
document.addEventListener('keydown', movePlayer);

// ゲーム開始時に敵を配置
generateEnemies();
