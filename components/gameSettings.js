class GameSettings {
    constructor() {
        this.refreshTimeMs = 25;
        this.holeScreenWidth = 380;
        this.holeScreenHeight = 680;
        this.mainScreenWidth = 380;
        this.mainScreenHeight = 640;
        this.scoreScreenWidth = 100;
        this.healthScreenWidth = 100;
        this.timerScreenWidth = 190;
        this.gameSpeed = 5;
        this.scoreScale = 1;
        this.isGameOver = true;
        this.isPaused = false;
        this.lastLeaSpawnTimestamp = -1;
        this.leaSpawnFrequencyMs = 1500;
        this.leaSpeed = 5;
        this.lastBoneSpawnTimestamp = -1;
        this.boneSpawnFrequencyMs = 6000;
        this.boneSpeed = 8;
    }
}

export default GameSettings;