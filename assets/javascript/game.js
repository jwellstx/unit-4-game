var kenobi = {
    name: "Obi-Wan Kenobi",
    healthPoints: 120,
    attackPower: 7,
    counterAttackPower: 15,
    imgName: "./assets/images/kenobi.jpg",
    putImage: function(myParent) {
        $(myParent).append("<span id='kenobiPic' class='icon' onclick='pickedKenobi()'>" + this.name + "</span>");
        $('#kenobiPic').append("<br><img src='" + this.imgName + "' width='150px' height='150px'>");
        $('#kenobiPic').append("<br><span id='hp'>" + this.healthPoints + "</span>");
    },
}


var skywalker = {
    name: "Luke Skywalker",
    healthPoints: 100,
    attackPower: 8,
    counterAttackPower: 20,
    imgName: "./assets/images/skywalker.jpg",
    putImage: function(myParent) {
        $(myParent).append("<span id='skywalkerPic' class='icon' onclick='pickedSkywalker()'>"+ this.name + "</span>");
        $('#skywalkerPic').append("<br><img src='" + this.imgName + "' width='150px' height='150px'>");
        $('#skywalkerPic').append("<br><span id='hp'>" + this.healthPoints + "</span>");
    },
}

var sidious = {
    name: "Darth Sidious",
    healthPoints: 150,
    attackPower: 5,
    counterAttackPower: 14,
    imgName: "./assets/images/sidious.jpg",
    putImage: function(myParent) {
        $(myParent).append("<span id='sidiousPic' class='icon' onclick='pickedSidious()'>" + this.name + "</span>");
        $('#sidiousPic').append("<br><img src='" + this.imgName + "' width='150px' height='150px'>");
        $('#sidiousPic').append("<br><span id='hp'>" + this.healthPoints + "</span>");
    },
}

var maul = {
    name: "Darth Maul",
    healthPoints: 180,
    attackPower: 4,
    counterAttackPower: 11,
    imgName: "./assets/images/maul.jpg",
    putImage: function(myParent) {
        $(myParent).append("<span id='maulPic' class='icon' onclick='pickedMaul()'>" + this.name + "</span>");
        $('#maulPic').append("<br><img src='" + this.imgName + "' width='150px' height='150px'>");
        $('#maulPic').append("<br><span id='hp'>" + this.healthPoints + "</span>");
    },
}



window.onload = function() {
    resetGame();
}

var myCharacterSelected = false;
var myEnemySelected = false;
var myTotalDamage = 0;
var numOfEnemies = 3;


$('#attack').on("click", function() {
    if (myCharacterSelected && myEnemySelected) {
        var myCharHp = $('#myChar #hp').text();
        var myEnemyHp = $('#defender #hp').text();

        myTotalDamage += myCharacterSelected.attackPower;
        console.log("my power = " + myTotalDamage);
        console.log("enemy power = " + myEnemySelected.counterAttackPower);
        myEnemyHp -= myTotalDamage;
        $('#defender #hp').text(myEnemyHp);
        console.log("enemy hp = " + myEnemyHp);

        if (myEnemyHp <= 0) {
            alert("You defeated " + myEnemySelected.name + "!");
            myEnemySelected = false;
            $('#defender').empty();
            numOfEnemies--;
            if (numOfEnemies === 0) {
                alert("You defeated all enemies!");
                resetGame();
            }
            return;
        }

        myCharHp -= myEnemySelected.counterAttackPower;
        $('#myChar #hp').text(myCharHp);
        console.log("my hp = " + myCharHp);

        if (myCharHp <= 0) {
            alert("You've been defeated by " + myEnemySelected.name + "!!");
            resetGame();
            return;
        }
    }
})

function resetGame(fields) {
    $('#selChar').empty();
    kenobi.putImage("#selChar");
    skywalker.putImage("#selChar");
    sidious.putImage("#selChar");
    maul.putImage("#selChar");
    $('#myChar').empty();
    $('#enemies').empty();
    $('#defender').empty();
    myCharacterSelected = false;
    myEnemySelected = false;
    myTotalDamage = 0;
    numOfEnemies = 3;
}

function pickedKenobi() {
    if(!myCharacterSelected) {
        $("#selChar").empty();
        kenobi.putImage("#myChar");
        $('#kenobiPic').removeAttr("onclick");
        skywalker.putImage("#enemies");
        sidious.putImage("#enemies");
        maul.putImage("#enemies");
        myCharacterSelected = kenobi;
    }
    else if (!myEnemySelected) {
        $('#enemies #kenobiPic').remove();
        kenobi.putImage("#defender");
        $('#defender').removeAttr("onclick");
        myEnemySelected = kenobi;
    }
}

function pickedSkywalker() {
    if (!myCharacterSelected) {
        $("#selChar").empty();
        skywalker.putImage("#myChar");
        $('#skywalkerPic').removeAttr("onclick");
        kenobi.putImage("#enemies");
        sidious.putImage("#enemies");
        maul.putImage("#enemies");
        myCharacterSelected = skywalker;
    }
    else if (!myEnemySelected) {
        $('#enemies #skywalkerPic').remove();
        skywalker.putImage("#defender");
        $('#defender').removeAttr("onclick");
        myEnemySelected = skywalker;
    }
}

function pickedSidious() {
    if (!myCharacterSelected) {
        $("#selChar").empty();
        sidious.putImage("#myChar");
        $('#sidiousPic').removeAttr("onclick");
        kenobi.putImage("#enemies");
        skywalker.putImage("#enemies");
        maul.putImage("#enemies");
        myCharacterSelected = sidious;
    }
    else if (!myEnemySelected) {
        $('#enemies #sidiousPic').remove();
        sidious.putImage("#defender");
        $('#defender').removeAttr("onclick");
        myEnemySelected = sidious;
    }
}

function pickedMaul() {
    if (!myCharacterSelected) {
        $("#selChar").empty();
        maul.putImage("#myChar");
        $('#maulPic').removeAttr("onclick");
        sidious.putImage("#enemies");
        kenobi.putImage("#enemies");
        skywalker.putImage("#enemies");
        myCharacterSelected = maul;
    }
    else if (!myEnemySelected) {
        $('#enemies #maulPic').remove();
        maul.putImage("#defender");
        $('#defender').removeAttr("onclick");
        myEnemySelected = maul;
    }
}