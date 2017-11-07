// Loads enemy image; sets location and speed
var Enemy = function(x, y) {
		this.sprite = '../images/enemy-bug.png';
		this.x = x;
		this.y = y;
		this.speed = Math.floor(Math.random() * 200) + 150;
};

// Renders enemies on screen
Enemy.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks for collisions between player and enemies
Enemy.prototype.checkCollision = function() {
		if (player.x < this.x + 82.5 &&
				player.x + 82.5 > this.x &&
				player.y < this.y + 72.5 &&
				72.5 + player.y > this.y) {
				player.reset();
		}
};

// Updates position of enemies
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
		this.x += dt * this.speed;
		if (this.x >= 505) {
				this.x = 0;
		}
		this.checkCollision();
};

// Loads player image; sets player location
var Player = function() {
		this.sprite = '../images/char-cat-girl.png';
		this.x = 201;
		this.y = 405;
};

// Renders player on screen
Player.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player direction and movement
Player.prototype.handleInput = function(direction) {
		if (direction === 'left' && this.x > 0) {
				this.x -= 101;
		} else if (direction === 'up' && this.y > 0) {
				this.y -= 83;
		} else if (direction === 'right' && this.x < 403) {
				this.x += 101;
		} else if (direction === 'down' && this.y < 405) {
				this.y += 83;
		}
};

// Updates position of player
Player.prototype.update = function() {
		if (this.y < 1) {
				setTimeout(function() {
						this.reset();
				}.bind(this), 200);
		}
};

// Resets player position after collision or win
Player.prototype.reset = function() {
		this.x = 201;
		this.y = 405;
};

// Instantiates player
var player = new Player();

// Instantiates enemies
var enemy1 = new Enemy(-75, 63);
var enemy2 = new Enemy(-75, 146);
var enemy3 = new Enemy(-75, 229);
var allEnemies = [enemy1, enemy2, enemy3];

// Listens for key presses and sends keys to handleInput() method
document.addEventListener('keyup', function(e) {
		var allowedKeys = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down'
		};
		player.handleInput(allowedKeys[e.keyCode]);
});
