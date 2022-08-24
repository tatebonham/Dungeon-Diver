const objective = document.getElementById('objective')
const score = document.getElementById('score')
const health = document.getElementById('health')
const arrows = document.getElementById('arrows')
const gold = document.getElementById('gold')
const canvas = document.getElementById('canvas')
const continueButton = document.getElementById('continueButton')
const message = document.getElementById('screenMessage')

const ctx = canvas.getContext('2d')

canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

class Entity{
    constructor({position, width, height, health, imageSrc, scale = 1, framesMax, offset, sprites}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = this.framesCurrent
        this.framesElaped = 0
        this.framesHold = 9
        this.sprites = sprites
        for(const obj in this.sprites){
            sprites[obj].image = new Image()
            sprites[obj].image.src = sprites[obj].imageSrc
        }
        this.width = width
        this.height = height
        this.alive = true
        this.health = health
        this.offset = offset
        this.notSafe = true
    }

    draw(){
        ctx.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
            )
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.framesElaped++
        if(this.framesElaped % this.framesHold === 0){  
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
}
class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1}){
        this.position = position
        this.width = 25
        this.height = 25
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = this.framesCurrent
        this.framesElaped = 0
        this.framesHold = 10
    }

    draw(){
        ctx.drawImage(
            this.image, 
            0,
            0,
            this.image.width,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
            )
    }

        update(){
            this.draw()
            this.framesElaped++
            if(this.framesElaped % this.framesHold === 0){  
                if(this.framesCurrent < this.framesMax - 1){
                    this.framesCurrent++
                } else {
                    this.framesCurrent = 0
                }
            }       



        }
        
       
}

class Player {
    constructor({position, width, height, speed, health, imageSrc, scale = 1, offset, sprites}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.sprites = sprites
        this.width = width
        this.height = height
        this.speed = speed
        this.alive = true
        this.health = health
        this.offset = offset
        this.attackBox = {
            up: {
                position: this.position,
                width: 5,
                height: 50
            },
            left: {
                position: this.position,
                width: 50,
                height: 5
            },
            down: {
                position: this.position,
                width: 5,
                height: 50
            },
            right: {
                position: this.position,
                width: 65,
                height: 40
            }
          
        }
        this.isAttacking = false
    }

    draw(){
        ctx.drawImage(
            this.image, 
            0,
            0,
            this.image.width,
            this.image.height,
            

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            this.image.width  * this.scale,
            this.image.height * this.scale
            )
            ctx.fillStyle = 'green'
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        if(this.position.x < 30){
            this.position.x = 30
        } else if(this.position.x + this.width > 670){
            this.position.x = 670 - this.width
        } else {
            this.position.x += this.speed.x
        }

        if(this.position.y < 60){
            this.position.y = 60
        } else if (this.position.y  + this.height > 450){
            this.position.y = 450 - this.height    
        } else {
            this.position.y += this.speed.y
        }
    }
    
    visualHitBox(){
        if(this.isAttacking === true){
            ctx.fillStyle = 'black'
            if(lastKey === 'w'){  
                ctx.fillRect(this.attackBox.up.position.x+10, this.attackBox.up.position.y-25, this.attackBox.up.width, this.attackBox.up.height -25)
            } else if (lastKey === 'a') {
                ctx.fillRect(this.attackBox.left.position.x-25, this.attackBox.left.position.y+15, this.attackBox.left.width -25, this.attackBox.left.height)
            } else if (lastKey === 's') {
                ctx.fillRect(this.attackBox.down.position.x+10, this.attackBox.down.position.y+25, this.attackBox.down.width, this.attackBox.down.height -25)
            } else if (lastKey === 'd') {
                ctx.fillRect(this.attackBox.right.position.x + 25, this.attackBox.right.position.y+15, this.attackBox.right.width - 25, this.attackBox.right.height)
            }

        }
    }

    attack(){
        setTimeout(()=>{
            this.isAttacking = true
        }, 250)       
        setTimeout(()=>{
          this.isAttacking = false
        }, 600)
    }

}

const adventurerTest = new Sprite({
    position: {
        x: 40,
        y: 200
    },
    imageSrc: '',
    scale: 1,
    framesMax: 5
})



const adventurer = new Player({
    position: {x: 40, y: 70},
    width: 40,
    height: 55,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '',
    scale: 1,
    offset: {x: 30, y:9},
    sprites: {
        idleLeft:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        idleRight:{
            offset: {x: 22 ,y: 9},
            width: 40,
            height: 55
        },
        idleDown:{
            offset: {x:30, y: 10},
            width: 40,
            height: 55
        },
        idleUp:{
            offset: {x: 30 ,y: 10},
            width: 40,
            height: 55
        },
        attRight:{
            offset: {x: 20 ,y: 8},
            width: 40,
            height: 55,
        },
        attLeft:{
            offset: {x: 27 ,y: 9},
            width: 40,
            height: 55
        },
        attUp:{
            offset: {x: 30 ,y: 20},
            width: 40,
            height: 45,
        },
        attDown:{
            offset: {x: 30 ,y: 0},
            width: 40,
            height: 55
        },
        runUp:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        runDown:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },
        runRight:{
            offset: {x: 22 ,y: 9},
            width: 40,
            height: 55
        },
        runLeft:{
            offset: {x: 30 ,y: 9},
            width: 40,
            height: 55
        },

    }
})

let runFramesElaped = 0
let runCurrentFrame = 0
let runFramesMax = 6
let runFramesHold = 7
let moving = true

let idleframesElaped = 0
let idleCurrentFrame = 0
let idleframesMax = 5
let idleframesHold = 10

const movementFrames = ()=>{
            runFramesElaped++
            if(runFramesElaped % runFramesHold === 0){  
                if(runCurrentFrame < runFramesMax - 1){
                    runCurrentFrame++
                } else {
                    runCurrentFrame = 0
                }
            }
            idleframesElaped++
            if(idleframesElaped % idleframesHold === 0){  
                if(idleCurrentFrame < idleframesMax - 1){
                    idleCurrentFrame++
                } else {
                    idleCurrentFrame = 0
                }
            }
        

            adventurer.speed.x = 0
            adventurer.speed.y = 0
            if(keys.w.pressed && keys.a.pressed && keys.d.pressed){
                adventurer.speed.x = 0
                adventurer.speed.y = -3
                adventurer.width = adventurer.sprites.runUp.width
                adventurer.height = adventurer.sprites.runUp.height
                adventurer.offset.x = adventurer.sprites.runUp.offset.x
                adventurer.offset.y = adventurer.sprites.runUp.offset.y
                adventurer.image.src = `./images/adventurer/runUp/golem-run-t-0${runCurrentFrame}.png`
            } else if (keys.s.pressed && keys.a.pressed && keys.d.pressed){
                adventurer.speed.x = 0
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runDown.width
                adventurer.height = adventurer.sprites.runDown.height
                adventurer.offset.x = adventurer.sprites.runDown.offset.x
                adventurer.offset.y = adventurer.sprites.runDown.offset.y
                adventurer.image.src = `./images/adventurer/runDown/golem-run-d-0${runCurrentFrame}.png`
            } else if (keys.d.pressed && keys.w.pressed && keys.s.pressed){
                adventurer.speed.x = 3
                adventurer.speed.y = 0
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
            } else if (keys.a.pressed && keys.s.pressed && keys.w.pressed) {
                adventurer.speed.x = -3
                adventurer.speed.y = 0
                adventurer.width = adventurer.sprites.runLeft.width
                adventurer.height = adventurer.sprites.runLeft.height
                adventurer.offset.x = adventurer.sprites.runLeft.offset.x
                adventurer.offset.y = adventurer.sprites.runLeft.offset.y
                adventurer.image.src = `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
            } else if(keys.d.pressed && keys.s.pressed){
                adventurer.speed.x = 3
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
            }  else if(keys.a.pressed && keys.s.pressed){
                adventurer.speed.x = -3
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runUp.width
                adventurer.height = adventurer.sprites.runUp.height
                adventurer.offset.x = adventurer.sprites.runUp.offset.x
                adventurer.offset.y = adventurer.sprites.runUp.offset.y
                adventurer.image.src =  `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
            }  else if(keys.d.pressed && keys.w.pressed){
                adventurer.speed.x = 3
                adventurer.speed.y = -3
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
            }  else if(keys.a.pressed && keys.w.pressed){
                adventurer.speed.x = -3
                adventurer.speed.y = -3
                adventurer.width = adventurer.sprites.runLeft.width
                adventurer.height = adventurer.sprites.runLeft.height
                adventurer.offset.x = adventurer.sprites.runLeft.offset.x
                adventurer.offset.y = adventurer.sprites.runLeft.offset.y
                adventurer.image.src =  `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
            }   else if(keys.a.pressed && keys.d.pressed){
                adventurer.speed.x = 0
                adventurer.speed.y = 0
                adventurer.width = adventurer.sprites.idleDown.width
                adventurer.height = adventurer.sprites.idleDown.height
                adventurer.offset.x = adventurer.sprites.idleDown.offset.x
                adventurer.offset.y = adventurer.sprites.idleDown.offset.y
                adventurer.image.src =  `./images/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
            }  else if(keys.w.pressed && keys.s.pressed){
                adventurer.speed.x = 0
                adventurer.speed.y = 0              
                adventurer.width = adventurer.sprites.idleDown.width
                adventurer.height = adventurer.sprites.idleDown.height
                adventurer.offset.x = adventurer.sprites.idleDown.offset.x
                adventurer.offset.y = adventurer.sprites.idleDown.offset.y
                adventurer.image.src = `./images/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
            } else if(keys.w.pressed){
                adventurer.speed.y = -3
                adventurer.width = adventurer.sprites.runUp.width
                adventurer.height = adventurer.sprites.runUp.height
                adventurer.offset.x = adventurer.sprites.runUp.offset.x
                adventurer.offset.y = adventurer.sprites.runUp.offset.y
                adventurer.image.src = `./images/adventurer/runUp/golem-run-t-0${runCurrentFrame}.png`
            } else if(keys.a.pressed){
                adventurer.speed.x = -3
                adventurer.width = adventurer.sprites.runLeft.width
                adventurer.height = adventurer.sprites.runLeft.height
                adventurer.offset.x = adventurer.sprites.runLeft.offset.x
                adventurer.offset.y = adventurer.sprites.runLeft.offset.y
                adventurer.image.src =  `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
            } else if(keys.s.pressed){
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runDown.width
                adventurer.height = adventurer.sprites.runDown.height
                adventurer.offset.x = adventurer.sprites.runDown.offset.x
                adventurer.offset.y = adventurer.sprites.runDown.offset.y
                adventurer.image.src = `./images/adventurer/runDown/golem-run-d-0${runCurrentFrame}.png`
            } else if(keys.d.pressed){
                adventurer.speed.x = 3
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
            }    else {
                moving = false  
            }
}
let attacking = false
let attFramesElaped = 0
let attCurrentFrame = 0
let attFramesMax = 7
let attFramesHold = 6

const attack= () => {
    if(attacking == true){
        attFramesElaped++
            if(attFramesElaped % attFramesHold === 0){  
                if(attCurrentFrame < attFramesMax - 1){
                    attCurrentFrame++
                } else {
                    attCurrentFrame = 0
                    attacking = false
            }
        }
    if (lastKey == 'w'){
        adventurer.width = adventurer.sprites.attUp.width
        adventurer.height = adventurer.sprites.attUp.height
        adventurer.offset.x = adventurer.sprites.attUp.offset.x
        adventurer.offset.y = adventurer.sprites.attUp.offset.y
        adventurer.image.src = `./images/adventurer/attUp/golem-attack-t-0${attCurrentFrame}.png`
    } else if(lastKey == 'a'){
        adventurer.width = adventurer.sprites.attLeft.width
        adventurer.height = adventurer.sprites.attLeft.height
        adventurer.offset.x = adventurer.sprites.attLeft.offset.x
        adventurer.offset.y = adventurer.sprites.attLeft.offset.y
        adventurer.image.src =  `./images/adventurer/attLeft/golem-attack-l-0${attCurrentFrame}.png`
    } else if(lastKey == 's'){
        adventurer.width = adventurer.sprites.attDown.width
        adventurer.height = adventurer.sprites.attDown.height
        adventurer.offset.x = adventurer.sprites.attDown.offset.x
        adventurer.offset.y = adventurer.sprites.attDown.offset.y
        adventurer.image.src = `./images/adventurer/attDown/golem-attack-d-0${attCurrentFrame}.png`
    } else if(lastKey == 'd'){
        adventurer.width = adventurer.sprites.attRight.width
        adventurer.height = adventurer.sprites.attRight.height
        adventurer.offset.x = adventurer.sprites.attRight.offset.x
        adventurer.offset.y = adventurer.sprites.attRight.offset.y
        adventurer.image.src = `./images/adventurer/attRight/golem-attack-r-0${attCurrentFrame}.png`
    }    
  }
}

const idleDirection = () => {
    idleframesElaped++
    if(idleframesElaped % idleframesHold === 0){  
        if(idleCurrentFrame < idleframesMax - 1){
            idleCurrentFrame++
        } else {
            idleCurrentFrame = 0
        }
    }

        if(lastKey == 'w'){
            adventurer.width = adventurer.sprites.runUp.width
                adventurer.height = adventurer.sprites.runUp.height
            adventurer.offset.x = adventurer.sprites.idleUp.offset.x
            adventurer.offset.y = adventurer.sprites.idleUp.offset.y
            adventurer.image.src =  `./images/adventurer/idleUp/golem-idle-t-0${idleCurrentFrame}.png`
        } else if(lastKey == 'a'){    
            adventurer.width = adventurer.sprites.runUp.width
                adventurer.height = adventurer.sprites.runUp.height
            adventurer.offset.x = adventurer.sprites.idleLeft.offset.x
            adventurer.offset.y = adventurer.sprites.idleLeft.offset.y
            adventurer.image.src =  `./images/adventurer/idleLeft/golem-idle-l-0${idleCurrentFrame}.png`
        } else if(lastKey == 's'|| !moved){   
            adventurer.width = adventurer.sprites.runUp.width
            adventurer.height = adventurer.sprites.runUp.height
            adventurer.offset.x = adventurer.sprites.idleDown.offset.x
            adventurer.offset.y = adventurer.sprites.idleDown.offset.y
            adventurer.image.src =  `./images/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
        } else if(lastKey == 'd'){    
            adventurer.width = adventurer.sprites.runUp.width
            adventurer.height = adventurer.sprites.runUp.height
            adventurer.offset.x = adventurer.sprites.idleRight.offset.x
            adventurer.offset.y = adventurer.sprites.idleRight.offset.y
            adventurer.image.src =  `./images/adventurer/idleRight/golem-idle-r-0${idleCurrentFrame}.png`
        }
}



// {position, width, height, speed, health, imageSrc, scale = 1, framesMax = 1, offset}
const survivorRoomOne = new Entity({
    position: {x: 600, y: 250},
    width: 28,
    height: 40,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: './images/entities/survivor.png',
    scale: 1.5,
    framesMax: 4,
    offset: {x: 9, y: 9},
    sprites: {
        idle: {
            imageSrc: './images/entities/survivor.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 22, y:10}
        }
    }
})



const heartA = new Entity({
    position: {x: 350, y: 350},
    width: 30,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/heart.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 1, y: 0}
})
const heartB = new Entity({
    position: {x: 440, y: 350},
    width: 30,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/heart.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 1, y: 0}
})
const heartC = new Entity({
    position: {x: 60, y: 410},
    width: 30,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/heart.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 1, y: 0}
})
const heartD = new Entity({
    position: {x: 60, y: 70},
    width: 30,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/heart.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 1, y: 0}
})

const arrowA = new Entity({
    position: {x: 650, y: 80},
    width: 5,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/arrow.png',
    scale: .5,
    framesMax: 1,
    offset: {x: 2, y: 1}
    
})
const arrowB = new Entity({
    position: {x: 360, y: 220},
    width: 5,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/arrow.png',
    scale: .5,
    framesMax: 1,
    offset: {x: 2, y: 1}
})
const arrowC = new Entity({
    position: {x: 620, y: 420},
    width: 5,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/arrow.png',
    scale: .5,
    framesMax: 1,
    offset: {x: 2, y: 1}
})


const key = new Entity({
    position: {x: 200, y: 224},
    width: 28,
    height: 28,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: './images/entities/key.png',
    scale: .05,
    framesMax: 1,
    offset: {x: 1, y: 0}
})
const door = new Entity({
    position: {x: 665, y: 200},
    width: 10,
    height: 65,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/door.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 29, y: 15},
    sprites: {openDoor: {
        imageSrc: './images/entities/door2.png',
        offset: {x: 18, y: 15},
        scale: 1.25
    }}
})
const chest = new Entity({
    position: {x: 400, y: 70},
    width: 50,
    height: 40,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: './images/entities/chest.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 48, y: 46},
    sprites:{open:{imageSrc: './images/entities/openChest.png'}}
})


const goblinA = new Entity({
    position:{x: 300, y: 300},
    width: 25, height: 48,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        left: {
                imageSrc: './images/entities/leftGoblin.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 25, y:8}
        },
        right:{    
                imageSrc: './images/entities/rightGoblin.png',
                framesMax: 7,
                framesHold: 7,
                offset: {x: 22, y:13}
        }
    }
})
const goblinB = new Entity({
    position:{x: 200, y: 230},
    width: 25, height: 48,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '', 
    scale: 1, 
    framesMax: 7, 
    offset: {x: 0, y: 0},
    sprites: {
        left: {
                imageSrc: './images/entities/leftGoblin.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 25, y:8}
        },
        right:{    
                imageSrc: './images/entities/rightGoblin.png',
                framesMax: 7,
                framesHold: 7,
                offset: {x: 22, y:13}
        }
    }
})
const goblinC = new Entity({
    position:{x: 400, y: 400},
    width: 25, height: 48,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '', 
    scale: 1, 
    framesMax: 7, 
    offset: {x: 0, y: 0},
    sprites: {
        left: {
                imageSrc: './images/entities/leftGoblin.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 25, y:8}
        },
        right:{    
                imageSrc: './images/entities/rightGoblin.png',
                framesMax: 7,
                framesHold: 7,
                offset: {x: 22, y:13}
        }
    }
})
const goblinD = new Entity({
    position:{x: 500, y: 100},
    width: 25, height: 48,
    speed: {x: 0, y: 0},
    health: 3,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        left: {
                imageSrc: './images/entities/leftGoblin.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 25, y:8}
        },
        right:{    
                imageSrc: './images/entities/rightGoblin.png',
                framesMax: 7,
                framesHold: 7,
                offset: {x: 22, y:13}
        }
    }
})
const goblinE = new Entity({
    position:{x: 30, y: 200},
    width: 25, height: 48,
    speed: {x: 0, y: 0},
    health: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        left: {
                imageSrc: './images/entities/leftGoblin.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 25, y:8}
        },
        right:{    
                imageSrc: './images/entities/rightGoblin.png',
                framesMax: 7,
                framesHold: 7,
                offset: {x: 22, y:13}
        }
    }
})
const goblinF = new Entity({
    position:{x: 320, y: 410},
    width: 25, height: 48,
    speed: {x: 0, y: 0},
    health: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        left: {
                imageSrc: './images/entities/leftGoblin.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 25, y:8}
        },
        right:{    
                imageSrc: './images/entities/rightGoblin.png',
                framesMax: 7,
                framesHold: 7,
                offset: {x: 22, y:13}
        }
    }
})
const goblinG = new Entity({
    position:{x: 320, y: 60},
    width: 25, height: 48,
    speed: {x: 0, y: 0},
    health: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        left: {
                imageSrc: './images/entities/leftGoblin.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 25, y:8}
        },
        right:{    
                imageSrc: './images/entities/rightGoblin.png',
                framesMax: 7,
                framesHold: 7,
                offset: {x: 22, y:13}
        }
    }
})

const batA = new Entity({
    position:{x: 30, y: 60},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batB = new Entity({
    position:{x: 30, y: 440},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batC = new Entity({
    position:{x: 660, y: 440},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batD = new Entity({
    position:{x: 660, y: 60},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batE = new Entity({
    position:{x: 350, y: 60},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batF = new Entity({
    position:{x: 350, y: 440},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batG = new Entity({
    position:{x: 30, y: 215},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batH = new Entity({
    position:{x: 655, y: 220},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batI = new Entity({
    position:{x: 30, y: 60},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 2,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batJ = new Entity({
    position:{x: 30, y: 440},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 2,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const batK = new Entity({
    position:{x: 660, y: 60},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 2,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const head = new Entity({
    position:{x: 30, y: 160},
    width: 120, height: 170,
    speed: {x: 0, y: 0},
    health: 20,
    imageSrc: './images/entities/head.png', 
    scale: .7, 
    framesMax: 1, 
    offset: {x: 12, y: 2}
})


const enemyLeft = (enemy) =>{
    enemy.image = enemy.sprites.left.image
        enemy.framesMax = enemy.sprites.left.framesMax
        enemy.offset.x = enemy.sprites.left.offset.x
        enemy.offset.y = enemy.sprites.left.offset.y
}
const enemyRight = (enemy) =>{
    enemy.image = enemy.sprites.right.image
        enemy.framesMax = enemy.sprites.right.framesMax
        enemy.offset.x = enemy.sprites.right.offset.x
        enemy.offset.y = enemy.sprites.right.offset.y
}
const batAttack = (player, enemy)=>{
    if(enemy.position.x >= player.position.x + 6){
        enemy.position.x -= 1.2
    }
    if(enemy.position.x <= player.position.x + 6){
        enemy.position.x += 1.2
    }
    if(enemy.position.y >= player.position.y + 12){
        enemy.position.y -= 1.2
    }
    if(enemy.position.y <= player.position.y + 12){
        enemy.position.y += 1.2
    }
}
const headAttack = (player, enemy)=>{
    if(enemy.position.x >= player.position.x){
        enemy.position.x -= .5
    }
    if(enemy.position.x <= player.position.x){
        enemy.position.x += .5
    }
    if(enemy.position.y >= player.position.y - (enemy.height/2)){
        enemy.position.y -= .5
    }
    if(enemy.position.y <= player.position.y - (enemy.height/2)){
        enemy.position.y += .5
    }
   
}
const goblinAttack = (player, enemy)=>{
    if(enemy.position.x >= player.position.x){
        enemy.position.x -= 0
        enemyLeft(enemy)
    }
    if(enemy.position.x <= player.position.x){
        enemy.position.x += 0
        enemyRight(enemy)
    }
    if(enemy.position.y >= player.position.y - 10){
        enemy.position.y -= 0
    }
    if(enemy.position.y <= player.position.y - 10){
        enemy.position.y += 0
    }
}

let dialogue = false

const levelOne = ()=>{
    if(goblinA.alive){
        goblinAttack(adventurer, goblinA)
        goblinA.update()
    }
   
    if(goblinB.alive){
        goblinAttack(adventurer, goblinB)
        goblinB.update()
    }
    if(goblinC.alive){
        goblinAttack(adventurer, goblinC)
        goblinC.update()
    }
    if(goblinD.alive){
        goblinAttack(adventurer, goblinD)
        goblinD.update()
    }
    door.update()

    if(goblinA.alive == false && goblinB.alive == false && goblinC.alive == false && goblinD.alive == false){
        level = 2
        scoreCount += 4
    }
}

const levelTwo = () =>{
    if(batA.alive){
        batAttack(adventurer, batA)
        batA.update()
    }    
    if(batB.alive){
        batAttack(adventurer, batB)
        batB.update()
    }    
    if(batC.alive){
        batAttack(adventurer, batC)
        batC.update()
    }    
    if(batD.alive){
        batAttack(adventurer, batD)
        batD.update()
    }    

    if(batE.alive){
        batAttack(adventurer, batE)
        batE.update()
    }    
    if(batF.alive){
        batAttack(adventurer, batF)
        batF.update()
    }    
    if(batG.alive){
        batAttack(adventurer, batG)
        batG.update()
    }    
    if(batH.alive){
        batAttack(adventurer, batH)
        batH.update()
    }    


    if(arrowA.alive){
        arrowA.update()
    }
    if(heartA.alive){
        heartA.update()
    }
    door.update()

    if(batA.alive == false && batB.alive == false && batC.alive == false && batD.alive == false && batF.alive == false && batG.alive == false && batE.alive == false && batH.alive == false){
        level = 3
        scoreCount += 4
    }
}
let roomOver = false
const levelThree = () =>{
    if(arrowA.alive){
        arrowA.update()
    }
    if(heartA.alive){
        heartA.update()
    }
    door.update()
}
const levelFour = () =>{
  if(survivorRoomOne.notSafe){
        survivorRoomOne.update()
    }
    chest.update()
    door.update()
    if(heartB.alive){
        heartB.update()
    }
    if(arrowB.alive){
        arrowB.update()
    }
    if(survivorRoomOne.notSafe == false){
        message.classList.remove('hidden')
        message.innerText = 'Oh my gosh, thank you so much for coming to save me. Here is one gold as a token of my appreciation. Good luck getting that chest full of gold open!'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'k' to Continue`
        window.addEventListener('keydown', (e)=>{if(e.key == 'k'){
            message.classList.add('hidden')
            continueButton.classList.add('hidden')
            scoreCount = 9
            goldCount = 1
            level = 5
        }})
    }
}
const levelFive = () =>{
    if(head.alive){
        headAttack(adventurer, head)
        head.update()
    }
    chest.update()
    door.update()
    if(heartC.alive){
        heartC.update()
    }   door.update()
    if(heartB.alive){
        heartB.update()
    }
    if(arrowB.alive){
        arrowB.update()
    }
   

    if(head.health <= 15){
        level = 6
    }

}
const levelSix = () =>{

    if(head.alive){
        headAttack(adventurer, head)
        head.update()
    }
    if(goblinE.alive){
        goblinAttack(adventurer, goblinE)
        goblinE.update()
    }
    if(goblinF.alive){
        goblinAttack(adventurer, goblinF)
        goblinF.update()
    }
    if(goblinG.alive){
        goblinAttack(adventurer, goblinG)
        goblinG.update()
    }
    if(batI.alive){
        batAttack(adventurer,batI)
        batI.update()
    }
    if(batJ.alive){
        batAttack(adventurer,batJ)
        batJ.update()
    }
    if(batK.alive){
        batAttack(adventurer,batK)
        batK.update()
    }
    chest.update()
    door.update()
    if(heartB.alive){
        heartB.update()
    }
    if(heartC.alive){
        heartC.update()
    }
    if(heartD.alive){
        heartD.update()
    }
    if(arrowB.alive){
        arrowB.update()
    }
    if(arrowC.alive){
        arrowC.update()
    }
   

    if(head.alive == false){
        bossDead = true
        scoreCount = 29
        level = 7
        goblinE.alive = false
        goblinF.alive = false
        goblinG.alive = false
        batI.alive = false
        batJ.alive = false
        batK.alive = false
        heartB.alive = false
        heartC.alive = false
        heartD.alive = false
        arrowB.alive = false
        arrowC.alive = false
    }
}
const levelSeven = ()=>{
    chest.update()
    door.update()
    if(key.alive){
        key.update()
    }
    if(chest.alive == false){
        message.classList.remove('hidden')
        message.innerText = '...it\'s empty...'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'k' to Continue`
        window.addEventListener('keydown', (e)=>{if(e.key == 'k'){
            message.classList.add('hidden')
            continueButton.classList.add('hidden')
            scoreCount = 29
            level = 8
        }})
    }
}
const levelEight = ()=>{
    // message.classList.add('hidden')
    // continueButton.classList.add('hidden')
    chest.image = chest.sprites.open.image
    chest.offset.x = 55
    chest.offset.y = 60
    chest.update()
    door.update()
    scoreCount = 29
}

let scoreCount = 0
let goldCount = 0
let arrowCount = 5
const arrowArr = []


class Projectile{
    constructor({position}, width, height, color, {speed}, health){
        this.position = position
        this.width = width
        this.height = height
        this.alive = true
        this.health = health
        this.color = color
        this.speed = speed
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        if(this.position.x < 50){
            this.position.x = 30
        } else if(this.position.x + this.width > 670){
            this.position.x = 670 - this.width
        } else {
            this.position.x += this.speed.x
        }

        if(this.position.y < 60){
            this.position.y = 60
        } else if (this.position.y  + this.height > 450){
            this.position.y = 450 - this.height    
        } else {
            this.position.y += this.speed.y
        }
    }
}
const arrowDirection = () =>{
   if(lastKey ==='d'){
    arrowArr.push(new Projectile({position: {x: adventurer.position.x + adventurer.width, y: adventurer.position.y + 12}}, 20, 3, 'black', {speed: {x: 2.5, y: 0}}, 0))
    } else if(lastKey === 'w'){
        arrowArr.push(new Projectile({position: {x: adventurer.position.x + 12, y: adventurer.position.y - 19}}, 3, 20, 'black', {speed: {x: 0, y: -2.5}}, 0))
    } else if(lastKey === 'a'){
        arrowArr.push(new Projectile({position: {x: adventurer.position.x - 19, y: adventurer.position.y + 12}}, 20, 3, 'black', {speed: {x: -2.5, y: 0}}, 0))
    } else if(lastKey === 's'){
        arrowArr.push(new Projectile({position: {x: adventurer.position.x + 12, y: adventurer.position.y + adventurer.height}}, 3, 20, 'black', {speed: {x: 0, y: 2.5}}, 0))
    }
}


const keepTrack = () => {
    if(scoreCount >= 10){
        score.innerText =  `Score:${scoreCount}`
    } else {
        score.innerText =  `Score: ${scoreCount}`
    }
    if(goldCount >= 10){
        gold.innerText = `Gold:${goldCount}`
    } else {
        gold.innerText = `Gold: ${goldCount}`
    }
    if(arrowCount >= 10){
        arrows.innerText = `Arrows:${arrowCount}`
    } else {
        arrows.innerText = `Arrows: ${arrowCount}`
    }
}

const saveSurvivor = (survivor, player) => {
    const left = survivor.position.x + survivor.width >=  player.position.x
    const right = survivor.position.x <= player.position.x + player.width
    const top = survivor.position.y + survivor.height >= player.position.y
    const bottom = survivor.position.y <= player.position.y + player.height
    
    if(right && left && top && bottom && survivor.notSafe){
        survivor.notSafe = false
    } else {
        return false
    }
}
let hasKey = false
const touchKey = (key, player) => {
    const left = key.position.x + key.width >=  player.position.x
    const right = key.position.x <= player.position.x + player.width
    const top = key.position.y + key.height >= player.position.y
    const bottom = key.position.y <= player.position.y + player.height
    
    if(right && left && top && bottom){
        key.alive = false
        hasKey = true
    } else {
        return false
    }
}
let doorOpened = false
const touchDoor = (door, player) => {
    const left = door.position.x + door.width >=  player.position.x
    const right = door.position.x <= player.position.x + player.width
    const top = door.position.y + door.height >= player.position.y
    const bottom = door.position.y <= player.position.y + player.height
    
    if(right && left && top && bottom){
        if(level == 3){
            player.position.x = 40
            player.position.y = 230
            door.position.x = 30
            door.position.y = 200
            door.image = door.sprites.openDoor.image
            door.offset = door.sprites.openDoor.offset
            door.scale = door.sprites.openDoor.scale
            doorOpened = true
            level = 4
        } else if(level == 8) {
            gameWon = true
        }
     
    } else {
        return false
    }
}

const touchChest = (chest, player) => {
    const left = chest.position.x + chest.width >=  player.position.x
    const right = chest.position.x <= player.position.x + player.width
    const top = chest.position.y + chest.height >= player.position.y
    const bottom = chest.position.y <= player.position.y + player.height
    
    if(right && left && top && bottom && hasKey){
        chest.alive = false
    } else {
        return false
    }
}

const collectArrow = (arrow, player) => {
    const left = arrow.position.x + arrow.width >=  player.position.x
    const right = arrow.position.x <= player.position.x + player.width
    const top = arrow.position.y + arrow.height >= player.position.y
    const bottom = arrow.position.y <= player.position.y + player.height
    
    if(right && left && top && bottom && arrow.alive){
        arrowCount += 5
        arrow.alive = false
    } else {
        return false
    }
}
const arrowHit = (arrow, enemy) => {
        // AABB -- axis aligned bounding box collision detection
        const Left = arrow.position.x + arrow.width >= enemy.position.x
    
        const Right = arrow.position.x <= enemy.position.x + enemy.width 
    
        const Top = arrow.position.y + arrow.height >= enemy.position.y
    
        const Bottom = arrow.position.y <= enemy.position.y + enemy.height
    
        if(Right && Left && Bottom && Top){
            enemy.health -= 1
            if(enemy.health >= 1 && arrow.speed.x > 0){
                enemy.position.x += 30
                arrow.alive = false
            } else if(enemy.health >=  1 && arrow.speed.x < 0){
                enemy.position.x -= 30
                arrow.alive = false
            } else if(enemy.health >=  1 && arrow.speed.y < 0){
                enemy.position.y -= 30
                arrow.alive = false
            } else if(enemy.health >=  1 && arrow.speed.y > 0){
                enemy.position.y += 30
                arrow.alive = false
            } else if (enemy.health == 0){
                enemy.alive = false
                arrow.alive = false
            }    
        } else {
            return false
        }
}
const enemyHit = (player, enemy) => {
    const rLeft = player.attackBox.right.position.x + player.attackBox.right.width >=  enemy.position.x
    const rRight = player.attackBox.right.position.x <= enemy.position.x + enemy.width
    const rTop =  (player.attackBox.right.position.y + 10) + player.attackBox.right.height>= enemy.position.y
    const rBottom =(player.attackBox.right.position.y + 10) <= enemy.position.y + enemy.height

    const lLeft = (player.attackBox.left.position.x - 25)+ player.attackBox.left.width >=  enemy.position.x
    const lRight = player.attackBox.left.position.x - 25 <= enemy.position.x + enemy.width
    const lTop = (player.attackBox.left.position.y + 10) + player.attackBox.left.height >= enemy.position.y
    const lBottom = (player.attackBox.left.position.y + 10) <= enemy.position.y + enemy.height

    const uLeft = (player.attackBox.up.position.x + 10 )+ player.attackBox.up.width >=  enemy.position.x
    const uRight = (player.attackBox.up.position.x + 10) <= enemy.position.x + enemy.width
    const uTop = (player.attackBox.up.position.y - 25) + player.attackBox.up.height >= enemy.position.y
    const uBottom = (player.attackBox.up.position.y - 25) <= enemy.position.y + enemy.height

    const dLeft = (player.attackBox.down.position.x + 10)+ player.attackBox.down.width >=  enemy.position.x
    const dRight = player.attackBox.down.position.x + 10 <= enemy.position.x + enemy.width
    const dTop = player.attackBox.down.position.y + player.attackBox.down.height >= enemy.position.y
    const dBottom = player.attackBox.down.position.y  <= enemy.position.y + enemy.height


    if(player.isAttacking){
        if(uRight && uLeft && uTop && uBottom && lastKey == 'w'){
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.y -= 50
            } else if (enemy.health == 0){
                enemy.alive = false
            }   
        } else if (lRight && lLeft && lTop && lBottom && lastKey == 'a') {
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.x -= 50
            } else if (enemy.health == 0){
                enemy.alive = false
            }            
        } else if (dRight && dLeft && dTop && dBottom && lastKey == 's') {
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.y += 50
            } else if (enemy.health == 0){
                enemy.alive = false
            }          
        } else if (rRight && rLeft && rTop && rBottom && lastKey == 'd') {
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.x += 50
            } else if (enemy.health == 0){
                enemy.alive = false
            }         
       }
    } else {
     return false
    }
}
const headHit = (player, enemy) => {
    const rLeft = player.attackBox.right.position.x + player.attackBox.right.width >=  enemy.position.x
    const rRight = player.attackBox.right.position.x <= enemy.position.x + enemy.width
    const rTop =  (player.attackBox.right.position.y + 10) + player.attackBox.right.height>= enemy.position.y
    const rBottom =(player.attackBox.right.position.y + 10) <= enemy.position.y + enemy.height

    const lLeft = (player.attackBox.left.position.x - 25)+ player.attackBox.left.width >=  enemy.position.x
    const lRight = player.attackBox.left.position.x - 25 <= enemy.position.x + enemy.width
    const lTop = (player.attackBox.left.position.y + 10) + player.attackBox.left.height >= enemy.position.y
    const lBottom = (player.attackBox.left.position.y + 10) <= enemy.position.y + enemy.height

    const uLeft = (player.attackBox.up.position.x + 10 )+ player.attackBox.up.width >=  enemy.position.x
    const uRight = (player.attackBox.up.position.x + 10) <= enemy.position.x + enemy.width
    const uTop = (player.attackBox.up.position.y - 25) + player.attackBox.up.height >= enemy.position.y
    const uBottom = (player.attackBox.up.position.y - 25) <= enemy.position.y + enemy.height

    const dLeft = (player.attackBox.down.position.x + 10)+ player.attackBox.down.width >=  enemy.position.x
    const dRight = player.attackBox.down.position.x + 10 <= enemy.position.x + enemy.width
    const dTop = player.attackBox.down.position.y + player.attackBox.down.height >= enemy.position.y
    const dBottom = player.attackBox.down.position.y  <= enemy.position.y + enemy.height


    if(player.isAttacking){
        if(uRight && uLeft && uTop && uBottom && lastKey == 'w'){
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.y -= 40
            } else if (enemy.health == 0){
                enemy.alive = false
            }   
        } else if (lRight && lLeft && lTop && lBottom && lastKey == 'a') {
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.x -= 40
            } else if (enemy.health == 0){
                enemy.alive = false
            }            
        } else if (dRight && dLeft && dTop && dBottom && lastKey == 's') {
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.y += 40
            } else if (enemy.health == 0){
                enemy.alive = false
            }          
        } else if (rRight && rLeft && rTop && rBottom && lastKey == 'd') {
            enemy.health -= 1
            if(enemy.health >= 1){
                enemy.position.x += 40
            } else if (enemy.health == 0){
                enemy.alive = false
            }         
       }
    } else {
     return false
    }
}
const healthChecker = (player) =>{
    if(player.health == 2){
        health.style.width = '66%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 1) {
        health.style.width = '33%'
        health.style.backgroundColor = 'red'
    } else if (player.health == 0){
        health.style.width = '0%'
    }   
}
const collectHeart = (heart, player) => {
    const left = heart.position.x + heart.width >=  player.position.x
    const right = heart.position.x <= player.position.x + player.width
    const top = heart.position.y + heart.height >= player.position.y
    const bottom = heart.position.y <= player.position.y + player.height
    
    if(right && left && top && bottom && heart.alive){
        player.health = 3
        heart.alive = false
        health.style.width = '100%'
        health.style.backgroundColor = 'green'
    } else {
        return false
    }
}
const playerHit = (player, enemy) => {
    const left = enemy.position.x + enemy.width >=  player.position.x
    const right = enemy.position.x <= player.position.x + player.width
    const top = enemy.position.y + enemy.height >= player.position.y
    const bottom = enemy.position.y <= player.position.y + player.height

    if(right && left && top && bottom && enemy.alive){
        player.health -= 1
        healthChecker(player)
        if(player.health >= 1 && lastKey === 'w'){
            player.position.y += 60
        } else if (player.health >= 1 && lastKey === 'a') {
            player.position.x += 60
        } else if (player.health >= 1 && lastKey === 's') {
            player.position.y -= 60
        } else if (player.health >= 1 && lastKey === 'd') {
            player.position.x -= 60
        } else if (player.health === 0){
            player.alive = false
            gameLost = true
        }
    } else{
        return false
    }

}

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let lastKey = ''
const gameBorders = () => {
    //health bar border
    ctx.fillStyle = 'darkgreen'
    ctx.fillRect(380, 1, 265, 30)

    //behind health bar
    ctx.fillStyle = '#3D3D3D'
    ctx.fillRect(383, 6, 259, 22)

    ctx.fillStyle = 'black'
    //score background
    ctx.fillRect(0, 1, 170, 29)
    //gold background
    ctx.fillRect(195, 1, 146, 29)
    //arrows background
    ctx.fillRect(55, 490, 188, 26)
    //objective background
    ctx.fillRect(275, 490, 420, 26)

    ctx.fillStyle = 'brown'
  
    //top border
    ctx.fillRect(0, 0, 700, 4)
    //top left border
    ctx.fillRect(0, 0, 5, 30)
    //top right border
    ctx.fillRect(645, 0, 55, 30)
    //top bottom border
    ctx.fillRect(0, 30, 700, 5)
    
    //bottom border
    ctx.fillRect(0, 516, 700, 4)
    //bottom left border
    ctx.fillRect(0, 485, 55, 31)
    //bottom right border
    ctx.fillRect(695, 485, 5, 31)
    //bottom top border
    ctx.fillRect(0, 485, 700, 5)
   

    //top left background border
    ctx.fillRect(170, 4, 25, 26)
    //top right background border
    ctx.fillRect(341, 4, 39, 26)
    //bottom background border
    ctx.fillRect(241, 490, 34, 26)
 

    ctx.fillStyle = 'purple'
      //top wall
      ctx.fillRect(0, 35, 700, 24)
      //left wall
      ctx.fillRect(0, 40, 29, 421)
      //right wall
      ctx.fillRect(671, 40, 30, 421)
      //bottom wall
      ctx.fillRect(0, 461, 700, 24)

}

let gameWon = false
let gameLost = false
let gameStart = false
let level = 1
let gamePause = false
let bossDead = false





const gameState=()=>{
    if(!gameStart){
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'k'){
                message.classList.add('hidden')
                continueButton.classList.add('hidden')
                gameStart = true
                adventurer.alive = true
            }
        })
    }
    if(gameLost){
        message.innerText = 'Looks like you weren\'t strong enough this time, try again?'
        message.classList.remove('hidden')
        message.style.backgroundColor = 'red'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'k' to Retry?`
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'k'){
            location.reload()
            }})
    }
    if(gameStart){
        if(level == 1){
            objective.innerText = 'Slay all the goblins!'
            levelOne()
        } else if (level == 2){
            objective.innerText = 'Careful there\'s bats!'
            levelTwo()
        } else if (level == 3){
            objective.innerText = 'Go find Bebo!'
            levelThree()
        } else if (level == 4 && doorOpened){
            objective.innerText = 'Oh, there he is.'
            levelFour()
        } else if (level == 5){
            objective.innerText = 'What\'s that????'
            levelFive()
        } else if (level == 6){
            objective.innerText = 'Don\'t die...'
            levelSix()
        } else if (level == 7){
            objective.innerText = 'Collect your prize.'
            levelSeven()
        } else if(level == 8){
            levelEight()
            objective.innerText = 'Leave dissappointed'
        }
    }  
    if(gameWon){
        message.innerText = 'Well, you saved Bebo... but you only came out with 1 measely gold. But hey, that\'s 1 more gold than before.'
        message.classList.remove('hidden')
        message.style.backgroundColor = 'red'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'k' to Retry?`
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'k'){
            location.reload()
            }})
    }

}

const checkEnemyHit = ()=>{
    if(level == 1){
        enemyHit(adventurer, goblinA)
        enemyHit(adventurer, goblinB)
        enemyHit(adventurer, goblinC)
        enemyHit(adventurer, goblinD)
        }
        if(level == 2){
        enemyHit(adventurer,batA)
        enemyHit(adventurer,batB)
        enemyHit(adventurer,batC)
        enemyHit(adventurer,batD)
        enemyHit(adventurer,batE)
        enemyHit(adventurer,batF)
        enemyHit(adventurer,batG)
        enemyHit(adventurer,batH)
        }
       if(level == 5 || level == 6){
        headHit(adventurer, head)
       }
        if(level == 6){
        enemyHit(adventurer,batI)
        enemyHit(adventurer,batJ)
        enemyHit(adventurer,batK)
        enemyHit(adventurer, goblinE)
        enemyHit(adventurer, goblinF)
        enemyHit(adventurer, goblinG)
        }

        
}
const checkPlayerHit = () => {
    if(level == 1){
        playerHit(adventurer,goblinA)
        playerHit(adventurer,goblinB)
        playerHit(adventurer,goblinC)
        playerHit(adventurer,goblinD)
        }
        if(level == 2){
        playerHit(adventurer,batA)
        playerHit(adventurer,batB)
        playerHit(adventurer,batC)
        playerHit(adventurer,batD)
        playerHit(adventurer,batE)
        playerHit(adventurer,batF)
        playerHit(adventurer,batG)
        playerHit(adventurer,batH)
        
        }

        if(level == 6){
        playerHit(adventurer,batI)
        playerHit(adventurer,batJ)
        playerHit(adventurer,batK)
        playerHit(adventurer, goblinE)
        playerHit(adventurer, goblinF)
        playerHit(adventurer, goblinG)
        }
    
        if(level == 5 || level == 6){
            playerHit(adventurer, head)
        }
 }
let moved = false






function animate(){
    window.requestAnimationFrame(animate)
   
    ctx.fillStyle = 'gray'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    gameBorders()
     
    adventurerTest.update()
    console.log()

    if(adventurer.alive){
       adventurer.update()
       adventurer.visualHitBox()
    
    }

    gameState()
    if(attacking){
        attack()
        adventurer.speed.x = 0
        adventurer.speed.y = 0
    } else if (moving){
        movementFrames()
        
    } else {
        idleDirection()
    }
  

 
    
    arrowArr.forEach(projectile =>{
        if(projectile.alive){
        projectile.position.x += projectile.speed.x
        projectile.position.y += projectile.speed.y
        projectile.update()
        if(level == 1){
        arrowHit(projectile, goblinA)
        arrowHit(projectile, goblinB)
        arrowHit(projectile, goblinC)
        arrowHit(projectile, goblinD)
        }
        if(level == 2){
        arrowHit(projectile,batA)
        arrowHit(projectile,batB)
        arrowHit(projectile,batC)
        arrowHit(projectile,batD)
        arrowHit(projectile,batE)
        arrowHit(projectile,batF)
        arrowHit(projectile,batG)
        arrowHit(projectile,batH)
        
        }
        if(level == 6){
            arrowHit(projectile,batA)
            arrowHit(projectile,batB)
            arrowHit(projectile,batC)
            arrowHit(projectile, goblinA)
            arrowHit(projectile, goblinB)
            arrowHit(projectile, goblinC)
        }
        if(level == 5 || level == 6){
        arrowHit(projectile,head)
        }
        }
    })
    // console.log(roomOver)
    // console.log(level)
    
    checkEnemyHit()

    checkPlayerHit()

    if(level == 2 || level == 3){
    collectHeart(heartA, adventurer)
    }
    if(level >= 4){
    collectHeart(heartB, adventurer)
    }
    if(level >= 5){
    collectHeart(heartC, adventurer)
    }
    if(level == 6){
    collectHeart(heartD, adventurer)
    }
    if(level == 2 || level == 3){
    collectArrow(arrowA, adventurer)
    }
    if(level >= 4){
    collectArrow(arrowB, adventurer)
    }
    if(level >= 5){
    collectArrow(arrowC, adventurer)
    }
    if(level == 4){
    saveSurvivor(survivorRoomOne, adventurer)
    }
    touchDoor(door, adventurer)
    if(level == 7){
        touchChest(chest, adventurer)
        touchKey(key, adventurer)
    }
    
    keepTrack()
}

animate()


const lastKeyPressed = ()=>{
    if(!attacking){
    if(keys.a.pressed){
        lastKey = 'a'
    } else if(keys.d.pressed){
        lastKey = 'd'
    }else if(keys.w.pressed){
        lastKey = 'w'
    }  else if (keys.s.pressed){
        lastKey = 's'
    }
    }
}
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'w':
            if(!attacking && !dialogue){
                keys.w.pressed = true
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'a':
            if(!attacking && !dialogue){
                keys.a.pressed = true  
                lastKeyPressed()  
                moving = true
                moved = true
            }
            break
        case 's':
            if(!attacking && !dialogue){
                keys.s.pressed = true
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'd':
            if(!attacking && !dialogue){
                keys.d.pressed = true 
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'k':
            if(adventurer.alive &&  !bossDead && !dialogue && !attacking){
                adventurer.attack()
                currentFrame = 0
                attacking = true
            }
            break
        case 'l' : 
        if(adventurer.alive && arrowCount >= 1 && !dialogue){
            arrowDirection()
            arrowCount -= 1
        }
        break
    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'w':
            keys.w.pressed = false 
            lastKeyPressed()
            break
        case 'a':
            keys.a.pressed = false 
            lastKeyPressed()
            break
        case 's':
            keys.s.pressed = false 
            lastKeyPressed()
            break
        case 'd':
            keys.d.pressed = false 
            lastKeyPressed()
            break
    }
})

