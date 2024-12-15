(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var gameScore = 0;
    var highScore = 0;
  
    var isMobile = width <= 768; // Mobil tespit için basit bir kontrol
  
    var SantaGame = {
      init: function() {
        this.game = new Phaser.Game(width, height, Phaser.CANVAS, '');
        this.game.state.add("load", this.load);
        this.game.state.add("play", this.play);
        this.game.state.add("title", this.title);
        this.game.state.add("gameOver", this.gameOver);
        this.game.state.add("instructions", this.instructions);
        this.game.state.add("username", this.username); // Kullanıcı adı ekranını ekliyoruz
        this.game.state.start("load");
      },
      load: {
        preload: function() {
          this.game.load.audio('drivin-home', 'assets/drivin-home-low.mp3');
          this.game.load.audio('ho-ho-ho', 'assets/ho-ho-ho.mp3');
          this.game.load.audio('hop', 'assets/jump-sound.mp3');
          this.game.load.image('platform', 'assets/ground.webp');
          this.game.load.spritesheet('santa-running', 'assets/santa-running.webp', 37, 52);
          this.game.load.image('snow-bg', 'assets/bg.webp');
          this.game.load.image('snowflake', 'assets/snowflake.webp');
          this.game.load.image("logo", "assets/game-logo.webp");
          this.game.load.image("instructions", "assets/instructions.webp");
          this.game.load.image("game-over", "assets/game-over.webp");
          this.game.load.image("startbtn", "assets/start-btn.webp");
          this.game.load.image("playbtn", "assets/play-btn.webp");
          this.game.load.image("restartBtn", "assets/restart-btn.webp");
          this.game.load.image("insta-st", "assets/insta-st.webp");
          this.game.load.image('gift', 'assets/gift.webp');  // gift.webp asset'ini yükle
          
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
  
      // Mobilde scale 0.5 yapma ve yatayda ortalama
      if (isMobile) {
        this.logo.scale.set(0.5);
        this.startBtn.scale.set(0.5);
  
        // Yatayda ortalamak için x koordinatlarını ayarla
        this.logo.x = (this.game.world.width - this.logo.width) / 2;
        this.startBtn.x = (this.game.world.width - this.startBtn.width) / 2;
      }
  
      // PHP'den en yüksek skorları al
      this.showHighScores();
    },
  
    showHighScores: function() {
    fetch('../../php/santa_db/get_high_scores.php')
      .then(response => response.json())  // JSON'a dönüştür
      .then(data => {
        // Gelen veriyi kontrol et
        console.log(data);  // PHP'den gelen veri konsola yazdır
        let highScoresText = 'High Scores:\n';
        
        // Eğer veri boş ise (beklenmeyen bir şey dönerse)
        if (!data || data.length === 0) {
          highScoresText = "No scores available yet.";
        } else {
          // Skorlar ve kullanıcı adlarıyla metin oluştur
          data.forEach((entry, index) => {
            highScoresText += (index + 1) + ". " + entry.username + ": " + entry.score + "\n";
          });
        }
  
        // Skorları ekranda göster
        if (this.highScoresLabel) {
          this.highScoresLabel.setText(highScoresText);
        } else {
          this.highScoresLabel = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2 + 100, highScoresText, {
            font: "20px Arial",
            fill: "white",
            align: "center"
          });
          this.highScoresLabel.anchor.setTo(0.5); // Ortalamak için
        }
      })
      .catch(error => {
        console.error('Error fetching high scores:', error);
        if (this.highScoresLabel) {
          this.highScoresLabel.text = "Error loading high scores.";
        }
      });
  },
  
    
  
    // Başla butonuna tıklama olayı
    startClicked: function() {
      this.game.state.start("username"); // Kullanıcı adı ekranına geçiyoruz
    },
  },
  
  
  username: {
    create: function() {
      // Arka plan ekleme
      this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'snow-bg');
  
      // Kullanıcı adı label'ı
      this.usernameLabel = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2 - 100, 'Enter Username:', {
        font: "24px Arial",
        fill: "white",
        fontWeight: "bold",
        align: "center"
      });
      this.usernameLabel.anchor.setTo(0.5); // Ortalamak için
  
      // HTML input alanı
      var inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.placeholder = "Username";
      inputElement.style.position = "absolute";
      inputElement.style.left = "50%";
      inputElement.style.top = "50%";
      inputElement.style.transform = "translate(-50%, -50%)"; // Tam ortalamak için
      inputElement.style.fontSize = "24px";
      inputElement.style.textAlign = "center";
      inputElement.style.padding = "8px";
      inputElement.style.borderRadius = "10px";
      inputElement.style.border = "2px solid #ffffff";
      inputElement.style.backgroundColor = "#000000"; // Arka plan rengini belirleme
      inputElement.style.color = "#ffffff"; // Yazı rengini beyaz yapma
      document.body.appendChild(inputElement);
  
      // Devam butonu
      this.continueBtn = this.game.add.button(this.game.world.width / 2, this.game.world.height - 120, 'startbtn', this.continueClicked, this);
      this.continueBtn.anchor.setTo(0.5); // Ortalamak için
      this.continueBtn.alpha = 0; // Görünmez başlat
      this.game.add.tween(this.continueBtn).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 1000);
    },
  
    continueClicked: function() {
      // HTML input alanından değeri al
      var inputElement = document.querySelector('input[type="text"]');
      var username = inputElement.value.trim();
  
      if (username === "") {
        alert("Please enter a username!"); // Boşsa uyarı göster
      } else {
        // Kullanıcı adını global değişkende sakla
        this.game.username = username;
  
        // Kullanıcı adı ile 'instructions' state'ine geç
        this.game.state.start("instructions", true, false, username);
  
        // Input alanını kaldır
        inputElement.parentNode.removeChild(inputElement);
      }
    }
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
  
          // Mobilde scale 0.5 yapma ve yatayda ortalama
          if (isMobile) {
            this.instructions.scale.set(0.5);
            this.playBtn.scale.set(0.5);
  
            // Yatayda ortalamak için x koordinatlarını ayarla
            this.instructions.x = (this.game.world.width - this.instructions.width) / 2;
            this.playBtn.x = (this.game.world.width - this.playBtn.width) / 2;
          }
        },
        playClicked: function() {
          this.game.state.start("play");
        },
      },
      // Main game state "play"
      play: {
        create: function() {
            highScore = gameScore > highScore ? Math.floor(gameScore) : highScore;
            gameScore = 0;
            this.currentFrame = 0;
            this.particleInterval = 2 * 60;
            this.gameSpeed = 580;
            this.isGameOver = false;
      
            // Physics engine
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
      
            // Background music
            this.music = this.game.add.audio("drivin-home");
            this.music.loop = true;
            this.music.play();
      
            // Background
            this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
            this.bg.fixedToCamera = true;
      
            // Platforms and gifts groups
            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;
      
            this.gifts = this.game.add.group();
            this.gifts.enableBody = true;
      
            // Create platforms and gifts
            var plat;
            for (var i = 0; i < 10; i++) {  // Total platforms are 30 now, first 10 will have no gifts
                plat = this.platforms.create(i * 192, this.game.world.height - 24, 'platform');
                plat.width = 192;
                plat.height = 24;
                this.game.physics.arcade.enable(plat);
                plat.body.immovable = true;
                plat.body.bounce.set(0);
      
                // First 10 platforms should not have gifts
                if (i >= 10 && Math.random() < 0.3) {  // Gifts will be added after platform 10
                    var giftSide = Math.random() < 0.5 ? 'left' : 'right';
                    var giftX;
      
                    // If gift is to the left, position it on the left edge of the platform
                    if (giftSide === 'left') {
                        giftX = plat.x + 10; // 10px from the left edge
                    }
                    // If gift is to the right, position it on the right edge of the platform
                    else {
                        giftX = plat.x + plat.width - 10; // 10px from the right edge
                    }
      
                    var gift = this.gifts.create(giftX, plat.y - 10, 'gift');
                    gift.anchor.set(0.5);
                    gift.scale.set(0.10);
                    gift.body.immovable = true;
                }
            }
            this.lastPlatform = plat;
      
            // Santa character
            this.santa = this.game.add.sprite(100, this.game.world.height - 200, 'santa-running');
            this.santa.animations.add("run");
            this.santa.animations.play('run', 20, true);
            this.game.physics.arcade.enable(this.santa);
            this.santa.body.gravity.y = 1450;
            this.santa.body.collideWorldBounds = true;
      
            // Score and high score
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
      
            // Keyboard controls
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      
            // Touch input listener
            this.game.input.onDown.add(this.startJump, this);
            this.game.input.onUp.add(this.stopJump, this);
      
            // Spacebar input listener
            let spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spacebar.onDown.add(this.startJump, this);
            spacebar.onUp.add(this.stopJump, this);
        },
      
        update: function() {
            if (isMobile) {
                if (this.isJumping) {
                    this.jumpTimer += this.game.time.physicsElapsed;
                    if (this.jumpTimer < 0.3) {
                        this.santa.body.velocity.y = -350;
                    }
                }
            } else {
                if (this.isJumping && (this.cursors.up.isDown || this.spacebar.isDown)) {
                    this.jumpTimer += this.game.time.physicsElapsed;
                    if (this.jumpTimer < 0.3) {
                        this.santa.body.velocity.y = -350;
                    }
                } else {
                    this.isJumping = false;
                }
            }
      
            if (this.santa.body.touching.down) {
                this.isJumping = false;
                this.jumpTimer = 0;
            }
      
            var that = this;
            if (!this.isGameOver) {
                gameScore += 0.5;
                this.gameSpeed += 0.03;
                this.score.text = 'Score: ' + Math.floor(gameScore);
      
                var moveAmount = this.gameSpeed / 100;
      
                this.game.physics.arcade.collide(this.santa, this.platforms);
                this.game.physics.arcade.overlap(this.santa, this.gifts, this.endGame, null, this);
      
                if (this.santa.body.bottom >= this.game.world.bounds.bottom) {
                    this.isGameOver = true;
                    this.endGame();
                }
      
                this.platforms.children.forEach(function(platform) {
                    platform.body.position.x -= moveAmount;
                    if (platform.body.right <= 0) {
                        platform.kill();
                        var plat = that.platforms.create(that.lastPlatform.body.right + 192, that.game.world.height - (Math.floor(Math.random() * 50)) - 24, 'platform');
                        plat.width = 192;
                        plat.height = 24;
                        plat.body.immovable = true;
                        that.lastPlatform = plat;
      
                        // Add gift to the new platform after the 10th platform
                        if (Math.random() < 0.3) {
                            var giftSide = Math.random() < 0.5 ? 'left' : 'right';
                            var giftX;
      
                            if (giftSide === 'left') {
                                giftX = plat.x + 10; // 10px from the left edge
                            } else {
                                giftX = plat.x + plat.width - 10; // 10px from the right edge
                            }
      
                            var gift = that.gifts.create(giftX, plat.y - 10, 'gift');
                            gift.anchor.set(0.5);
                            gift.scale.set(0.13);
                            gift.body.immovable = true;
                        }
                    }
                });
      
                this.gifts.children.forEach(function(gift) {
                    gift.body.position.x -= moveAmount;
                    if (gift.body.right <= 0) {
                        gift.kill();
                    }
                });
            }
        },
      
        startJump: function() {
            if (this.santa.body.touching.down) {
                this.isJumping = true;
                this.jumpTimer = 0;
                this.jumpSound = this.game.add.audio("hop");
                this.jumpSound.play();
                this.santa.body.velocity.y = -350;
            }
        },
      
        stopJump: function() {
            this.isJumping = false;
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
          // Arka planı ekle
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
          
          // Game Over yazısını ekleyelim ve ölçeklendirelim
          this.msg = this.game.add.sprite(this.game.world.width / 2 - 280.5, 50, 'game-over');
          this.msg.alpha = 0;
          this.game.add.tween(this.msg).to({
            alpha: 1
          }, 600, Phaser.Easing.Linear.None, true, 0);
          
          // Mobilde Game Over yazısını ölçeklendir
          if (isMobile) {
            this.msg.scale.set(0.5);  // Game over yazısını mobilde %50 ölçeklendir
            this.msg.x = (this.game.world.width - this.msg.width) / 2;  // Yatayda ortala
          }
          
          // Kullanıcı adı ve skoru ekrana yazdırma
          this.usernameText = this.game.add.text(this.game.world.width / 2 - 100, 200, 'Player: ' + this.game.username, {
            font: "32px Arial",
            fill: "white",
            fontWeight: "bold",
            align: "center"
          });
          this.usernameText.alpha = 0;
          this.game.add.tween(this.usernameText).to({
            alpha: 1
          }, 600, Phaser.Easing.Linear.None, true, 600);
          
          // Score metnini ekleyelim
          this.scoreText = this.game.add.text(this.game.world.width / 2 - 100, 250, 'Score: ' + Math.floor(gameScore), {
            font: "42px Arial",
            fill: "white"
          });
          this.scoreText.alpha = 0;
          this.game.add.tween(this.scoreText).to({
            alpha: 1
          }, 600, Phaser.Easing.Linear.None, true, 600);
          
          // Mobilde Score yazısını ölçeklendir
          if (isMobile) {
            this.scoreText.scale.set(0.5);  // Score yazısını mobilde %50 ölçeklendir
            this.usernameText.scale.set(0.5);  // Kullanıcı adını mobilde %50 ölçeklendir
            this.usernameText.x = (this.game.world.width - this.usernameText.width) / 2;  // Yatayda ortala
            this.scoreText.x = (this.game.world.width - this.scoreText.width) / 2;  // Yatayda ortala
          }
          
          // Restart butonunu eski konumuna çeviriyoruz
          this.restartBtn = this.game.add.button(this.game.world.width / 2 - 183.5, 350, 'restartBtn', this.restartClicked); // Y koordinatını eski haline 350 olarak ayarladık
          this.restartBtn.alpha = 0;
          this.game.add.tween(this.restartBtn).to({
            alpha: 1
          }, 600, Phaser.Easing.Linear.None, true, 1000);
          
          // Instagram Paylaş butonunu ekleyelim
          this.shareBtn = this.game.add.button(this.game.world.width / 2 - 91.75, height - 120, 'insta-st', this.shareScore); 
          this.shareBtn.alpha = 1;  // Doğrudan görünür yapmak için alpha 1
          this.shareBtn.scale.set(0.10); // Yüzde 15 boyutunda
          var shareBtnY = height - this.shareBtn.height - 10; // 10px kadar bir boşluk bırakarak alt kısımda
          this.shareBtn.y = shareBtnY; // Paylaş butonunun y konumunu ayarlama
          
          // Mobilde Paylaş butonunu ölçeklendir
          if (isMobile) {
            this.restartBtn.scale.set(0.5);
            this.shareBtn.x = (this.game.world.width - this.shareBtn.width) / 2;
            this.restartBtn.x = (this.game.world.width - this.restartBtn.width) / 2;
          }
      
          // Veritabanına gönderme işlemi
          this.sendScoreToServer(this.game.username, Math.floor(gameScore));
        },
      
        // Veriyi PHP'ye gönderme
        sendScoreToServer: function(username, score) {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "../../php/santa_db/save_score.php", true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          
          // AJAX isteği ile verileri PHP'ye gönder
          xhr.send("username=" + encodeURIComponent(username) + "&score=" + encodeURIComponent(score));
      
          xhr.onload = function() {
            if (xhr.status == 200) {
              console.log("Veri başarıyla kaydedildi");
            } else {
              console.log("Veri kaydedilemedi");
            }
          };
        },
      
        // Paylaşma işlemi
        shareScore: function() {
          var scoreText = 'Score: ' + Math.floor(gameScore);
      
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
      
          canvas.width = 1080;
          canvas.height = 1920;
      
          var bgImage = new Image();
          bgImage.src = 'assets/insta-bg.jpg'; 
          bgImage.onload = function() {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
            ctx.font = "80px Arial";
            ctx.fillStyle = "white";
            var textWidth = ctx.measureText(scoreText).width;
            var x = (canvas.width - textWidth) / 2;
            var y = (canvas.height / 2) + 200;
      
            ctx.fillText(scoreText, x, y);
      
            var link = document.createElement('a');
            link.download = 'score_image.jpg';
            link.href = canvas.toDataURL("image/jpg");
            link.click();
          };
        },
      
          restartClicked: function() {
              this.game.state.start("play");
          },
      }
  
      };
      SantaGame.init();
    })();