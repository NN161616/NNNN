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
    // プレイヤーと敵の攻撃処理
    let playerDamage = Math.floor(Math.random() * player.attack) + 1;
    let enemyDamage = Math.floor(Math.random() * enemy.attack) + 1;

    enemy.health -= playerDamage;
    player.health -= enemyDamage;

    // 戦闘結果を表示
    let message = `
        あなたは ${enemy.name} に ${playerDamage} ダメージを与えました。<br>
        ${enemy.name} は残り ${enemy.health} HP。<br>
        ${enemy.name} はあなたに ${enemyDamage} ダメージを与えました。<br>
        あなたの残り HP: ${player.health}.
    `;

    if (enemy.health <= 0) {
        message += `<br>${enemy.name} は倒れました！<br>おめでとう、勝利です！`;
        gameStarted = false;
    } else if (player.health <= 0) {
        message += `<br>あなたは倒れました... ゲームオーバー。`;
        gameStarted = false;
    }

    document.getElementById('game-message').innerHTML = message;
}
