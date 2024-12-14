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
        this.game.load.image('platform', 'assets/ground.png');
        this.game.load.spritesheet('santa-running', 'assets/santa-running.png', 37, 52);
        this.game.load.image('snow-bg', 'assets/bg.png');
        this.game.load.image('snowflake', 'assets/snowflake.png');
        this.game.load.image("logo", "assets/game-logo.png");
        this.game.load.image("instructions", "assets/instructions.png");
        this.game.load.image("game-over", "assets/game-over.png");
        this.game.load.image("startbtn", "assets/start-btn.png");
        this.game.load.image("playbtn", "assets/play-btn.png");
        this.game.load.image("restartBtn", "assets/restart-btn.png");
        this.game.load.image("insta-st", "assets/insta-st.png");
        this.game.load.image('gift', 'assets/gift.png');  // gift.png asset'ini yükle
        
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
  },
  startClicked: function() {
    this.game.state.start("username"); // Kullanıcı adı ekranına geçiyoruz
  },
},

// Kullanıcı adı ekranı (HTML input)
username: {
  create: function() {
    this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
    this.usernameLabel = this.game.add.text(this.game.world.width / 2 - 100, this.game.world.height / 2 - 100, 'Enter Username:', {
      font: "24px Arial",
      fill: "white",
      fontWeight: "bold",
      align: "center"
    });

    // HTML input alanı
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.placeholder = "Username";
    inputElement.style.position = "absolute";
    inputElement.style.left = `${this.game.world.width / 2 - 100}px`;
    inputElement.style.top = `${this.game.world.height / 2}px`;
    inputElement.style.fontSize = "24px";
    inputElement.style.textAlign = "center";
    inputElement.style.padding = "8px";
    inputElement.style.borderRadius = "10px";
    inputElement.style.border = "2px solid #ffffff";
    document.body.appendChild(inputElement);

    // HTML input'tan veri almak için buton
    this.continueBtn = this.game.add.button(this.game.world.width / 2 - 159, this.game.world.height - 120, 'startbtn', this.continueClicked, this);
    this.continueBtn.alpha = 0;
    this.game.add.tween(this.continueBtn).to({
      alpha: 1
    }, 1000, Phaser.Easing.Linear.None, true, 1000);
  },

  continueClicked: function() {
    var username = document.querySelector('input[type="text"]').value.trim(); // HTML input'tan değer alıyoruz
    if (username === "") {
      alert("Please enter a username!"); // Eğer boşsa, kullanıcıya uyarı veriyoruz
    } else {
      // Kullanıcı adını global değişkende sakla
      this.game.username = username;

      // Kullanıcı adı ile 'instructions' state'ine geçiyoruz
      this.game.state.start("instructions", true, false, username);

      // Input elemanını ve butonu gizle
      var inputElement = document.querySelector('input[type="text"]');
      var continueBtn = this.continueBtn;

      // Input ve butonu gizle
      inputElement.style.display = "none"; // Inputu gizle
      continueBtn.alpha = 0; // Butonun alfa değerini sıfır yaparak gizle
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
<<<<<<< HEAD
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

    // Fizik motoru başlatıldı
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Müzik
    this.music = this.game.add.audio("drivin-home");
    this.music.loop = true;
    this.music.play();

    // Arka plan
    this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
    this.bg.fixedToCamera = true;

    // Zemin ve hediye grupları
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    this.gifts = this.game.add.group();
    this.gifts.enableBody = true;

    var plat;
    for (var i = 0; i < 5; i++) {
      // Platform oluştur
      plat = this.platforms.create(i * 192, this.game.world.height - 24, 'platform');
      plat.width = 192;
      plat.height = 24;
      this.game.physics.arcade.enable(plat);
      plat.body.immovable = true;
      plat.body.bounce.set(0);

      // Rastgele platforma hediye ekle
      if (Math.random() < 0.2) { // %50 ihtimalle hediye oluştur
        var gift = this.gifts.create(plat.x + plat.width / 2, plat.y - 10, 'gift'); // Hediye platformun üzerine yerleştirilir
        gift.anchor.set(0.5); // Ortalanır
        gift.scale.set(0.15); // Hediye boyutunu ayarla
        gift.body.immovable = true; // Hediye hareket etmeyecek
      }
    }
    this.lastPlatform = plat;

    // Santa karakteri
    this.santa = this.game.add.sprite(100, this.game.world.height - 200, 'santa-running');
    this.santa.animations.add("run");
    this.santa.animations.play('run', 20, true);
    this.game.physics.arcade.enable(this.santa);
    this.santa.body.gravity.y = 1450;
    this.santa.body.collideWorldBounds = true;

    // Skor ve yüksek skor
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

    // Klavye kontrolleri
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Ekrana tıklama dinleyicisi
    this.game.input.onDown.add(this.jump, this);
  },

  update: function() {
    if (this.isJumping && (this.cursors.up.isDown || this.spacebar.isDown)) {
      this.jumpTimer += this.game.time.physicsElapsed; // Zıplama süresini artır
      if (this.jumpTimer < 0.3) { // Maksimum 0.3 saniye boyunca zıplama sürer
          this.santa.body.velocity.y = -350; // Yukarı doğru sürekli hız uygula
      }
  } else {
      this.isJumping = false; // Tuş bırakıldığında zıplamayı durdur
  }

  // Karakter yere temas edince zıplama sıfırlanır
  if (this.santa.body.touching.down) {
      this.isJumping = false;
  };

    
    var that = this;

    if (!this.isGameOver) {
      // Skor güncelleniyor
      gameScore += 0.5;
      this.gameSpeed += 0.03;
      this.score.text = 'Score: ' + Math.floor(gameScore);

      var moveAmount = this.gameSpeed / 100;

      // Çarpışma kontrolleri
      this.game.physics.arcade.collide(this.santa, this.platforms);
      this.game.physics.arcade.overlap(this.santa, this.gifts, this.endGame, null, this);

      // Santa yere düştü mü?
      if (this.santa.body.bottom >= this.game.world.bounds.bottom) {
        this.isGameOver = true;
        this.endGame();
      }

      // Klavye ile zıplama
      if (this.cursors.up.isDown && this.santa.body.touching.down ||
          this.spacebar.isDown && this.santa.body.touching.down) {
        this.jump();
      }

      // Platformların hareketi
      this.platforms.children.forEach(function(platform) {
        platform.body.position.x -= moveAmount;
        if (platform.body.right <= 0) {
          platform.kill();
          var plat = that.platforms.create(that.lastPlatform.body.right + 192, that.game.world.height - (Math.floor(Math.random() * 50)) - 24, 'platform');
          plat.width = 192;
          plat.height = 24;
          plat.body.immovable = true;
          that.lastPlatform = plat;

          // Yeni platforma rastgele hediye ekle
          if (Math.random() < 0.3) { // %20 ihtimalle hediye ekle
            var gift = that.gifts.create(plat.x + plat.width / 2, plat.y - 10, 'gift');
            gift.anchor.set(0.5);
            gift.scale.set(0.13);
            gift.body.immovable = true;
=======
      // instructions screen
      instructions: {
        create: function() {
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');

          if (this.game.device.desktop) {
          this.instructions = this.game.add.sprite(this.game.world.width / 2 - 292, 30, 'instructions');
          } else {
            this.instructions = this.game.add.sprite(this.game.world.width / 2 - 292, 150, 'instructions');
            this.instructions.scale.x = 0.5;
            this.instructions.anchor.setTo(0.5);
            this.instructions.x = this.game.world.centerX;
          }
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
>>>>>>> refs/remotes/origin/main
          }
        }
      });

      // Hediyelerin (gifts) hareketi
      this.gifts.children.forEach(function(gift) {
        gift.body.position.x -= moveAmount;
        if (gift.body.right <= 0) {
          gift.kill(); // Hediye ekran dışında kalırsa yok et
        }
      });
    }
  },

  jump: function() {
    if (this.santa.body.touching.down) { 
        this.isJumping = true; // Zıplama başladı
        this.jumpTimer = 0; // Zıplama süresini sıfırla
        this.jumpSound = this.game.add.audio("hop");
        this.jumpSound.play();
        this.santa.body.velocity.y = -350; // İlk zıplama hızı
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
<<<<<<< HEAD
=======
      gameOver: {
        create: function() {
            this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
            if (this.game.device.desktop) {
              this.msg = this.game.add.sprite(this.game.world.width / 2 - 280.5, 50, 'game-over');
            } else {
                this.msg = this.game.add.sprite(this.game.world.width / 2 - 280.5, 100, 'game-over');
                this.msg.scale.x = 0.5;
                this.msg.anchor.setTo(0.5);
                this.msg.x = this.game.world.centerX;
            }

            this.msg.alpha = 0;
            this.game.add.tween(this.msg).to({
                alpha: 1
            }, 600, Phaser.Easing.Linear.None, true, 0);
>>>>>>> refs/remotes/origin/main
    
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