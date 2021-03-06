'use strict';

let shortid = require('shortid');

var mapSizeX = 30;
var mapSizeY = 30;

function Viking() {

    this.id = shortid.generate();
    this.name = 'Bob';
    this.level = 1;
    this.health = 2;
    this.experience = 0;
    this.kills = 0;
    this.killed = 0;
    this.action = {
        order: 'stop'
    };
    this.position = {
        x: 0,
        y: 0
    };

}

Viking.prototype.parse = function (withId) {

    let vikingJSON = {
        name: this.name,
        level: this.level,
        health: this.health,
        kills: this.kills,
        experience: this.experience,
        killed: this.killed,
        action: this.action,
        position: this.position
    };

    if (withId) {
        vikingJSON.id = this.id;
    }

    return vikingJSON;
};

Viking.prototype.getActionPosition = function () {

    let position = {};

    let p = this.action.position;

    if (p.x >= -1 && p.x <= 1 && p.y >= -1 && p.y <= 1) {

        position.x = this.position.x + parseInt(p.x);
        position.y = this.position.y + parseInt(p.y);

        position.x = position.x < 0 ? 0 : position.x >= mapSizeX ? mapSizeX : position.x;
        position.y = position.y < 0 ? 0 : position.y >= mapSizeY ? mapSizeY : position.y;

        position.x = parseInt(position.x);
        position.y = parseInt(position.y);

    } else {
        throw new Error(this.id + 'position of order is invalid');
    }

    return position;

};

Viking.prototype.checkForLevelUp = function () {


    if (this.experience > Math.pow(2, this.level - 1)) {

        this.level += 1;
        this.experience = 0;
        this.increaseHitPoints(2);

    }


};

Viking.prototype.increaseHitPoints = function (healthToAdd) {

    this.health += healthToAdd;

    if (this.health > this.level * 2) {

        this.health = this.level * 2;
    }
};

Viking.prototype.isDead = function () {

    return this.health <= 0;
};

Viking.prototype.increasKilled = function () {

    this.killed += 1;
};


module.exports = Viking;