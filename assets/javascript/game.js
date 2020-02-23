var starWarsGame = {
    // variable definitions
    myCharacterSelected: false,
    myEnemySelected: false,
    myTotalDamage: 0,
    numOfEnemies: 3,
    playThemeSong: new Audio("./assets/audio/rebel-theme.mp3"),
    playerChosenAudio: new Audio("./assets/audio/wtoaot.mp3"),
    playerWon: new Audio("./assets/audio/forceisstrong.mp3"),
    playerLost: new Audio("./assets/audio/dontfailme.mp3"),

    // character definitions
    kenobi: {
        name: "Obi-Wan Kenobi",
        healthPoints: 120,
        attackPower: 7,
        counterAttackPower: 15,
        imgName: "./assets/images/kenobi.jpg",
        picTag: "kenobi",
    },
    skywalker: {
        name: "Luke Skywalker",
        healthPoints: 100,
        attackPower: 8,
        counterAttackPower: 20,
        imgName: "./assets/images/skywalker.jpg",
        picTag: "skywalker",
    },
    sidious: {
        name: "Darth Sidious",
        healthPoints: 150,
        attackPower: 5,
        counterAttackPower: 14,
        imgName: "./assets/images/sidious.jpg",
        picTag: "sidious",
    },
    maul: {
        name: "Darth Maul",
        healthPoints: 180,
        attackPower: 4,
        counterAttackPower: 11,
        imgName: "./assets/images/maul.jpg",
        picTag: "maul",
    },

    // functions
    putImage: function (obj, parentFunc) {
        // this is a helper function to build our player icons to be inserted into the html page with name, picture and health
        $(parentFunc).append("<span id='" + obj.picTag + "' class='icon' onclick=\"starWarsGame.pickChar(\'" + obj.picTag + "\')\">" + obj.name + "</span>");
        $('#' + obj.picTag).append("<br><img src='" + obj.imgName + "' width='150px' height='150px'>");
        $('#' + obj.picTag).append("<br><span id='hp'>" + obj.healthPoints + "</span>");
    },

    attackPressed: function () {
        // this function is the fighting logic which gets current health, subtracts damage done and check results
        // then allows to either select a new enemy, report if you defeated everyone or if we have been defeated
        if (this.myCharacterSelected && this.myEnemySelected) {
            var myCharHp = $('#myChar #hp').text();
            var myEnemyHp = $('#defender #hp').text();

            // increase our attack power (starting from 0) and subtract enemy HP and display it
            this.myTotalDamage += this.myCharacterSelected.attackPower;
            myEnemyHp -= this.myTotalDamage;
            $('#defender #hp').text(myEnemyHp);

            // check if we defeated enemy, allow selection of new enemy
            if (myEnemyHp <= 0) {
                alert("You defeated " + this.myEnemySelected.name + "!");
                this.myEnemySelected = false;
                $('#defender').empty();
                this.numOfEnemies--;
                // end game and reset if we defeated everyone!
                if (this.numOfEnemies === 0) {
                    alert("You defeated all enemies!");
                    this.playThemeSong.pause();
                    this.playThemeSong.currentTime = 0;
                    this.playerWon.play();
                    this.resetGame();
                }
                return;
            }

            // allow the enemy to counterattack if we didn't defeat them
            myCharHp -= this.myEnemySelected.counterAttackPower;
            $('#myChar #hp').text(myCharHp);

            // check if we've been defeated and reset the game
            if (myCharHp <= 0) {
                alert("You've been defeated by " + this.myEnemySelected.name + "!!");
                this.playThemeSong.pause();
                this.playThemeSong.currentTime = 0;
                this.playerLost.play();
                this.resetGame();
                return;
            }
        }
    },
    pickChar: function (pictureTag) {
        // logic for character selection, if main character is not selected, pick one, display it as Your Character
        // then place everyone else under enemies.  Also set myCharacterSelected to the chosen one.
        // pictureTag value is obtained from onclick event for each picture
        if (!this.myCharacterSelected) {
            $("#selChar").empty();
            pictureTag === "kenobi"    ? this.putImage(this.kenobi,"#myChar")     : this.putImage(this.kenobi, "#enemies");
            pictureTag === "skywalker" ? this.putImage(this.skywalker, "#myChar") : this.putImage(this.skywalker, "#enemies");
            pictureTag === "sidious"   ? this.putImage(this.sidious, "#myChar")   : this.putImage(this.sidious, "#enemies");
            pictureTag === "maul"      ? this.putImage(this.maul, "#myChar")      : this.putImage(this.maul, "#enemies");
            // remove click since we don't care about that anymore
            $('#' + pictureTag).removeAttr("onclick");

            switch (pictureTag) {
                case "kenobi":
                    this.myCharacterSelected = this.kenobi;
                    break;
                case "skywalker":
                    this.myCharacterSelected = this.skywalker;
                    break;
                case "sidious":
                    this.myCharacterSelected = this.sidious;
                    break;
                case "maul":
                    this.myCharacterSelected = this.maul
                    break;
            }
            // play fun audio clips
            this.playerChosenAudio.play();
            setTimeout(function() { starWarsGame.playThemeSong.play(); }, 8000);
        }
        // if character is selected but enemy is not, select enemy to fight and move them to Defender
        else if (!this.myEnemySelected) {
            // remove them from enemies row
            $('#enemies #' + pictureTag).remove();
            switch (pictureTag) {
                case "kenobi":
                    this.putImage(this.kenobi, "#defender");
                    this.myEnemySelected = this.kenobi;
                    break;
                case "skywalker":
                    this.putImage(this.skywalker, "#defender");
                    this.myEnemySelected = this.skywalker
                    break;
                case "sidious":
                    this.putImage(this.sidious, "#defender");
                    this.myEnemySelected = this.sidious
                    break;
                case "maul":
                    this.putImage(this.maul, "#defender");
                    this.myEnemySelected = this.maul;
                    break;
            }
            // remove click since we dont care to click on them anymore
            $('#defender').removeAttr("onclick");
            // now we are ready to fight, add a click listener on attack id
            $('#attack').attr('onClick', 'starWarsGame.attackPressed()');
        }
    },
    resetGame: function () {
        // remove everything and reset all characters to character selection screen and reinit out variables
        $('#selChar').empty();
        this.putImage(this.kenobi, "#selChar");
        this.putImage(this.skywalker, "#selChar");
        this.putImage(this.sidious, "#selChar");
        this.putImage(this.maul, "#selChar");
        $('#myChar').empty();
        $('#enemies').empty();
        $('#defender').empty();
        this.myCharacterSelected = false;
        this.myEnemySelected = false;
        this.myTotalDamage = 0;
        this.numOfEnemies = 3;
    },
    log: function (printThis) {
        console.log(printThis);
    }
}

// One time game setup on page load - dont need to wait for document since script is loaded at end of body
starWarsGame.resetGame();
