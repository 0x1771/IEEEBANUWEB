(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var gameScore = 0;
    var highScore = 0;
    var SantaGame = {
      init: function() {
        this.game = new Phaser.Game(width, height, Phaser.CANVAS, '');
        this.game.state.add("load", this.load);
        this.game.state.add("play", this.play);
        this.game.state.add("title", this.title);
        this.game.state.add("gameOver", this.gameOver);
        this.game.state.add("instructions", this.instructions);
        this.game.state.start("load");
      },
      load: {
        preload: function() {
          this.game.load.audio('drivin-home', 'assets/drivin-home-low.mp3');
          this.game.load.audio('ho-ho-ho', 'assets/ho-ho-ho.mp3');
          this.game.load.audio('hop', 'assets/jump-sound.mp3');
          this.game.load.image('platform', 'assets/ground.png');
          this.game.load.spritesheet('santa-running', 'assets/santa-running.png', 37, 52);
          this.game.load.image('snow-bg', 'assets/snow-bg.png');
          this.game.load.image('snowflake', 'assets/snowflake.png');
          this.game.load.image("logo", "assets/game-logo.png");
          this.game.load.image("instructions", "assets/instructions.png");
          this.game.load.image("game-over", "assets/game-over.png");
          this.game.load.image("startbtn", "assets/start-btn.png");
          this.game.load.image("playbtn", "assets/play-btn.png");
          this.game.load.image("restartBtn", "assets/restart-btn.png");
          this.game.load.image("insta-st", "assets/insta-st.png");
        },
        create: function() {
          this.game.state.start("title");
        }
      },
      // title screen
      title: {
        create: function() {
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
          this.logo = this.game.add.sprite(this.game.world.width / 2 - 158, 20, 'logo');
          this.logo.alpha = 0;
          this.game.add.tween(this.logo).to({
            alpha: 1
          }, 1000, Phaser.Easing.Linear.None, true, 0);
          this.startBtn = this.game.add.button(this.game.world.width / 2 - 159, this.game.world.height - 120, 'startbtn', this.startClicked);
          this.startBtn.alpha = 0;
          this.game.add.tween(this.startBtn).to({
            alpha: 1
          }, 1000, Phaser.Easing.Linear.None, true, 1000);
        },
        startClicked: function() {
          this.game.state.start("instructions");
        },
      },
      // instructions screen
      instructions: {
        create: function() {
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
          this.instructions = this.game.add.sprite(this.game.world.width / 2 - 292, 30, 'instructions');
          this.instructions.alpha = 0;
          this.game.add.tween(this.instructions).to({
            alpha: 1
          }, 800, Phaser.Easing.Linear.None, true, 0);
          this.playBtn = this.game.add.button(this.game.world.width / 2 - 159, this.game.world.height - 120, 'playbtn', this.playClicked);
          this.playBtn.alpha = 0;
          this.game.add.tween(this.playBtn).to({
            alpha: 1
          }, 800, Phaser.Easing.Linear.None, true, 800);
        },
        playClicked: function() {
          this.game.state.start("play");
        },
      },
      // playing
      play: {
        create: function() {
          highScore = gameScore > highScore ? Math.floor(gameScore) : highScore;
          gameScore = 0;
          this.currentFrame = 0;
          this.particleInterval = 2 * 60;
          this.gameSpeed = 580;
          this.isGameOver = false;
          this.game.physics.startSystem(Phaser.Physics.ARCADE);
          this.music = this.game.add.audio("drivin-home");
          this.music.loop = true;
          this.music.play();
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
          this.bg.fixedToCamera = true;
          this.bg.autoScroll(-this.gameSpeed / 6, 0);
          this.emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
          this.platforms = this.game.add.group();
          this.platforms.enableBody = true;
          this.platforms.createMultiple(5, 'platform', 0, false);
          this.platforms.setAll('anchor.x', 0.5);
          this.platforms.setAll('anchor.y', 0.5);
          var plat;
          for (var i = 0; i < 5; i++) {
            plat = this.platforms.getFirstExists(false);
            plat.reset(i * 192, this.game.world.height - 24);
            plat.width = 192;
            plat.height = 24;
            this.game.physics.arcade.enable(plat);
            plat.body.immovable = true;
            plat.body.bounce.set(0);
          }
          this.lastPlatform = plat;
          this.santa = this.game.add.sprite(100, this.game.world.height - 200, 'santa-running');
          this.santa.animations.add("run");
          this.santa.animations.play('run', 20, true);
          this.game.physics.arcade.enable(this.santa);
          this.santa.body.gravity.y = 1500;
          this.santa.body.collideWorldBounds = true;
          this.emitter.makeParticles('snowflake');
          this.emitter.maxParticleScale = .02;
          this.emitter.minParticleScale = .001;
          this.emitter.setYSpeed(100, 200);
          this.emitter.gravity = 0;
          this.emitter.width = this.game.world.width * 1.5;
          this.emitter.minRotation = 0;
          this.emitter.maxRotation = 40;
          this.game.camera.follow(this.santa);
          this.cursors = this.game.input.keyboard.createCursorKeys();
          this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          this.emitter.start(false, 0, 0);
          this.score = this.game.add.text(20, 20, '', {
            font: "24px Arial",
            fill: "white",
            fontWeight: "bold"
          });
          if (highScore > 0) {
            this.highScore = this.game.add.text(20, 45, 'Best: ' + highScore, {
              font: "18px Arial",
              fill: "white"
            });
          }
        },
        update: function() {
          var that = this;
          if (!this.isGameOver) {
            gameScore += .5;
            this.gameSpeed += .03;
            this.score.text = 'Score: ' + Math.floor(gameScore);
            this.currentFrame++;
            var moveAmount = this.gameSpeed / 100;
            this.game.physics.arcade.collide(this.santa, this.platforms);
            if (this.santa.body.bottom >= this.game.world.bounds.bottom) {
              this.isGameOver = true;
              this.endGame();
            }
            if (this.cursors.up.isDown && this.santa.body.touching.down || this.spacebar.isDown && this.santa.body.touching.down || this.game.input.mousePointer.isDown && this.santa.body.touching.down || this.game.input.pointer1.isDown && this.santa.body.touching.down) {
              this.jumpSound = this.game.add.audio("hop");
              this.jumpSound.play();
              this.santa.body.velocity.y = -500;
            }
            if (this.particleInterval === this.currentFrame) {
              this.emitter.makeParticles('snowflake');
              this.currentFrame = 0;
            }
            this.platforms.children.forEach(function(platform) {
              platform.body.position.x -= moveAmount;
              if (platform.body.right <= 0) {
                platform.kill();
                var plat = that.platforms.getFirstExists(false);
                plat.reset(that.lastPlatform.body.right + 192, that.game.world.height - (Math.floor(Math.random() * 50)) - 24);
                plat.body.immovable = true;
                that.lastPlatform = plat;
              }
            });
          }
        },
        endGame: function() {
          this.music.stop();
          this.music = this.game.add.audio("ho-ho-ho");
          this.music.play();
          this.game.state.start("gameOver");
        }
      },
      gameOver: {
        create: function() {
            this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
            this.msg = this.game.add.sprite(this.game.world.width / 2 - 280.5, 50, 'game-over');
            this.msg.alpha = 0;
            this.game.add.tween(this.msg).to({
                alpha: 1
            }, 600, Phaser.Easing.Linear.None, true, 0);
    
            this.scoreText = this.game.add.text(this.game.world.width / 2 - 100, 200, 'Score: ' + Math.floor(gameScore), {
                font: "42px Arial",
                fill: "white"
            });
            this.scoreText.alpha = 0;
            this.game.add.tween(this.scoreText).to({
                alpha: 1
            }, 600, Phaser.Easing.Linear.None, true, 600);
    
            // Restart butonu
            this.restartBtn = this.game.add.button(this.game.world.width / 2 - 183.5, 280, 'restartBtn', this.restartClicked);
            this.restartBtn.alpha = 0;
            this.game.add.tween(this.restartBtn).to({
                alpha: 1
            }, 600, Phaser.Easing.Linear.None, true, 1000);
    
            // Instagram Paylaş butonu
            this.shareBtn = this.game.add.button(this.game.world.width / 2 - 91.75, height - 120, 'insta-st', this.shareScore); // 'insta-st' görseli kullanılıyor
            this.shareBtn.alpha = 0;
            
            // Paylaş butonunun boyutunu küçültme
            this.shareBtn.scale.set(0.15); // Yüzde 60 boyutunda
            
            // Paylaş butonunu ekranın alt kısmına yerleştirme
            var shareBtnY = height - this.shareBtn.height - 10; // 40px kadar bir boşluk bırakarak alt kısımda
            this.shareBtn.y = shareBtnY; // Paylaş butonunun y konumunu ayarlama
            
            // Paylaş butonunun yatayda ortalanması
            var shareBtnX = (this.game.world.width - this.shareBtn.width) / 2; // Yatayda tam ortalanması
            this.shareBtn.x = shareBtnX;
    
            // Paylaş butonunun animasyonla görünür hale gelmesi
            this.game.add.tween(this.shareBtn).to({
                alpha: 1
            }, 600, Phaser.Easing.Linear.None, true, 1000);
        },
    
        // Paylaşma işlemi
        shareScore: function() {
          var scoreText = 'Score: ' + Math.floor(gameScore);
      
          // Canvas üzerinde dinamik görsel oluşturma
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
      
          // Görsel boyutları
          canvas.width = 1080;
          canvas.height = 1920;
      
          // Arkaplan görselini çizme (görseli yüklemek için)
          var bgImage = new Image();
          bgImage.src = 'assets/insta-bg.png'; // Arkaplan görselinin yolu
          bgImage.onload = function() {
              ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
              // Skor metnini ekleme
              ctx.font = "80px Arial";
              ctx.fillStyle = "white";
      
              // Yatay merkezleme
              var textWidth = ctx.measureText(scoreText).width;
              var x = (canvas.width - textWidth) / 2; // Ekranın tam ortası
      
              // Dikey merkezleme (orta + bir miktar offset)
              var textHeight = 80; // Font boyutunun yüksekliği
              var y = (canvas.height / 2) + 200; // Ortadan biraz aşağıya yerleştir (örneğin 200px)
      
              ctx.fillText(scoreText, x, y); // Skoru merkezde yerleştir
      
              // Görseli indirmek için bir link oluşturma
              var link = document.createElement('a');
              link.download = 'score_image.jpg';
              link.href = canvas.toDataURL("image/jpg");
              link.click();
      
              // Instagram uygulamasını açmaya yönlendirme
              var shareUrl = "https://www.instagram.com/create/story/";
              var userConfirmation = confirm("Instagram story'ye paylaşmak için 'Tamam' butonuna basın!");
              if (userConfirmation) {
                  window.location.href = shareUrl;
              }
          };
      },
      
        restartClicked: function() {
            this.game.state.start("play");
        },
    }
    
    
    




    };
    SantaGame.init();
  })();