// ゲームの初期設定
let player = {
    name: '勇者',
    health: 100,
    attack: 15,
};

let enemy = {
    name: 'スライム',
    health: 50,
    attack: 10,
};

// ゲームの状態
let gameStarted = false;
let playerTurn = true; // プレイヤーのターンかどうか

// ゲーム開始ボタンが押された時の処理
document.getElementById('startButton').addEventListener('click', function() {
    if (!gameStarted) {
        gameStarted = true;
        startGame();
    }
});

// ゲームを開始する関数
function startGame() {
    document.getElementById('game-message').innerHTML = `
        <p>あなたの名前は ${player.name} です。<br> 
        敵は ${enemy.name} です。<br>
        戦う準備をしましょう！</p>
        <button onclick="battle()">戦う</button>
    `;
}

// 戦闘を開始する関数
function battle() {
    if (gameStarted && player.health > 0 && enemy.health > 0) {
        if (playerTurn) {
            // プレイヤーのターン
            playerAttack();
        } else {
            // 敵のターン
            enemyAttack();
        }

        // 戦闘状況を更新
        updateGameMessage();
        
        // ターン交代
        playerTurn = !playerTurn;

        // 戦闘終了判定
        if (enemy.health <= 0) {
            document.getElementById('game-message').innerHTML += `<br>${enemy.name} は倒れました！<br>おめでとう、勝利です！`;
            gameStarted = false; // ゲーム終了
        } else if (player.health <= 0) {
            document.getElementById('game-message').innerHTML += `<br>あなたは倒れました... ゲームオーバー。`;
            gameStarted = false; // ゲーム終了
        }
    }
}

// プレイヤーの攻撃処理
function playerAttack() {
    let playerDamage = Math.floor(Math.random() * player.attack) + 1;
    enemy.health -= playerDamage;
    document.getElementById('game-message').innerHTML += `
        <p>あなたは ${enemy.name} に ${playerDamage} ダメージを与えました。<br>
        ${enemy.name} の残り HP: ${enemy.health}</p>
    `;
}

// 敵の攻撃処理
function enemyAttack() {
    let enemyDamage = Math.floor(Math.random() * enemy.attack) + 1;
    player.health -= enemyDamage;
    document.getElementById('game-message').innerHTML += `
        <p>${enemy.name} はあなたに ${enemyDamage} ダメージを与えました。<br>
        あなたの残り HP: ${player.health}</p>
    `;
}

// ゲームメッセージを更新する関数
function updateGameMessage() {
    document.getElementById('game-message').innerHTML += `
        <p>あなたのターン: ${playerTurn ? 'プレイヤー' : '敵'}</p>
    `;
}
