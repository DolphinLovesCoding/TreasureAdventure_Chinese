info.onCountdownEnd(function () {
    game.setGameOverMessage(false, "Try faster!")
    game.setGameOverEffect(false, effects.starField)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fountain, 200)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
})
info.onScore(10, function () {
    hero.sayText("到左下角觸碰寶箱來過關。", 2000, true)
    tiles.setTileAt(tiles.getTileLocation(0, 17), sprites.dungeon.stairSouth)
    tiles.setTileAt(tiles.getTileLocation(1, 17), sprites.dungeon.stairSouth)
    tiles.setTileAt(tiles.getTileLocation(2, 17), sprites.dungeon.stairSouth)
    tiles.setTileAt(tiles.getTileLocation(2, 18), sprites.dungeon.stairEast)
    tiles.setTileAt(tiles.getTileLocation(2, 19), sprites.dungeon.stairEast)
    tiles.setWallAt(tiles.getTileLocation(0, 17), false)
    tiles.setWallAt(tiles.getTileLocation(1, 17), false)
    tiles.setWallAt(tiles.getTileLocation(2, 17), false)
    tiles.setWallAt(tiles.getTileLocation(2, 18), false)
    tiles.setWallAt(tiles.getTileLocation(2, 19), false)
})
info.onScore(5, function () {
    hero.sayText("到左下角挑戰第二關。", 2000, true)
    tiles.setTileAt(tiles.getTileLocation(0, 16), sprites.dungeon.stairSouth)
    tiles.setTileAt(tiles.getTileLocation(1, 16), sprites.dungeon.stairSouth)
    tiles.setTileAt(tiles.getTileLocation(2, 16), sprites.dungeon.stairSouth)
    tiles.setTileAt(tiles.getTileLocation(3, 16), sprites.dungeon.stairSouth)
    tiles.setTileAt(tiles.getTileLocation(3, 18), sprites.dungeon.stairEast)
    tiles.setTileAt(tiles.getTileLocation(3, 19), sprites.dungeon.stairEast)
    tiles.setWallAt(tiles.getTileLocation(0, 16), false)
    tiles.setWallAt(tiles.getTileLocation(1, 16), false)
    tiles.setWallAt(tiles.getTileLocation(2, 16), false)
    tiles.setWallAt(tiles.getTileLocation(3, 16), false)
    tiles.setWallAt(tiles.getTileLocation(3, 18), false)
    tiles.setWallAt(tiles.getTileLocation(3, 19), false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    info.stopCountdown()
    game.setGameOverMessage(true, "You Win!" + (" Time:" + time + "s"))
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles14, function (sprite, location) {
    tiles.placeOnTile(hero, tiles.getTileLocation(10, 10))
    tiles.setCurrentTilemap(tilemap`層級17`)
    for (let index = 0; index < 5; index++) {
        treasure = sprites.create(img`
            . . . . . . . b b . . . . . . . 
            . . . . . . b d d b . . . . . . 
            . . . . . b d 5 5 d b . . . . . 
            . . . . b b 5 5 5 5 b b . . . . 
            . . . . b 5 5 5 5 5 5 b . . . . 
            b b b b b 5 5 5 5 1 1 d b b b b 
            b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
            b d d 5 5 5 5 5 5 1 1 1 5 d d b 
            . b d d 5 5 5 5 5 5 5 5 d d b . 
            . . b b 5 5 5 5 5 5 5 5 b b . . 
            . . c b 5 5 5 5 5 5 5 5 b c . . 
            . . c 5 5 5 5 d d 5 5 5 5 c . . 
            . . c 5 5 d b b b b d 5 5 c . . 
            . . c 5 d b c c c c b d 5 c . . 
            . . c c c c . . . . c c c c . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnRandomTile(treasure, sprites.dungeon.darkGroundCenter)
    }
    for (let index = 0; index < 4; index++) {
        bat = sprites.create(img`
            . . f f f . . . . . . . . f f f 
            . f f c c . . . . . . f c b b c 
            f f c c . . . . . . f c b b c . 
            f c f c . . . . . . f b c c c . 
            f f f c c . c c . f c b b c c . 
            f f c 3 c c 3 c c f b c b b c . 
            f f b 3 b c 3 b c f b c c b c . 
            . c 1 b b b 1 b c b b c c c . . 
            . c 1 b b b 1 b b c c c c . . . 
            c b b b b b b b b b c c . . . . 
            c b 1 f f 1 c b b b b f . . . . 
            f f 1 f f 1 f b b b b f c . . . 
            f f 2 2 2 2 f b b b b f c c . . 
            . f 2 2 2 2 b b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(bat, sprites.dungeon.darkGroundCenter)
        bat.setVelocity(40, 40)
        bat.setBounceOnWall(true)
    }
})
info.onLifeZero(function () {
    info.stopCountdown()
    game.setGameOverMessage(false, "Be careful!")
    game.setGameOverEffect(false, effects.starField)
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    pause(500)
})
let bat: Sprite = null
let treasure: Sprite = null
let hero: Sprite = null
let time = 0
game.splash("躲避蝙蝠、收集星星！", "<按A鍵開始遊玩>")
time = 0
info.startCountdown(120)
info.setLife(3)
tiles.setCurrentTilemap(tilemap`層級9`)
hero = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(hero)
tiles.placeOnTile(hero, tiles.getTileLocation(10, 10))
scene.cameraFollowSprite(hero)
for (let index = 0; index < 5; index++) {
    treasure = sprites.create(img`
        . . . . . . . b b . . . . . . . 
        . . . . . . b d d b . . . . . . 
        . . . . . b d 5 5 d b . . . . . 
        . . . . b b 5 5 5 5 b b . . . . 
        . . . . b 5 5 5 5 5 5 b . . . . 
        b b b b b 5 5 5 5 1 1 d b b b b 
        b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
        b d d 5 5 5 5 5 5 1 1 1 5 d d b 
        . b d d 5 5 5 5 5 5 5 5 d d b . 
        . . b b 5 5 5 5 5 5 5 5 b b . . 
        . . c b 5 5 5 5 5 5 5 5 b c . . 
        . . c 5 5 5 5 d d 5 5 5 5 c . . 
        . . c 5 5 d b b b b d 5 5 c . . 
        . . c 5 d b c c c c b d 5 c . . 
        . . c c c c . . . . c c c c . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnRandomTile(treasure, sprites.castle.tileGrass3)
}
for (let index = 0; index < 5; index++) {
    bat = sprites.create(img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c 1 b b b 1 b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b 1 f f 1 c b b b b f . . . . 
        f f 1 f f 1 f b b b b f c . . . 
        f f 2 2 2 2 f b b b b f c c . . 
        . f 2 2 2 2 b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(bat, sprites.castle.tileGrass1)
    bat.setVelocity(30, 30)
    bat.setBounceOnWall(true)
}
info.setScore(0)
forever(function () {
    if (controller.A.isPressed()) {
        for (let index = 0; index < 121; index++) {
            pause(1000)
            time += 1
        }
    }
})
