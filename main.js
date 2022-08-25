const objective = document.getElementById('objective')
const score = document.getElementById('score')
const health = document.getElementById('health')
const spikes = document.getElementById('spikes')
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
        this.alive = false
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
            

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            this.image.width  * this.scale,
            this.image.height * this.scale
            )
            // ctx.fillStyle = 'green'
            // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }


        update(){
            this.draw()
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
                width: 40,
                height: 25
            },
            left: {
                position: this.position,
                width: 30,
                height: 60
            },
            down: {
                position: this.position,
                width: 40,
                height: 25
            },
            right: {
                position: this.position,
                width: 30,
                height: 60
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
            // ctx.fillStyle = 'green'
            // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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
        // if(this.isAttacking === true){
        //     ctx.fillStyle = 'black'
        //     if(lastKey === 'w'){  
        //         ctx.fillRect(this.attackBox.up.position.x, this.attackBox.up.position.y -25, this.attackBox.up.width, this.attackBox.up.height)
        //     } else if (lastKey === 'a') {
        //         ctx.fillRect(this.attackBox.left.position.x - 30, this.attackBox.left.position.y, this.attackBox.left.width, this.attackBox.left.height)
        //     } else if (lastKey === 's') {
        //         ctx.fillRect(this.attackBox.down.position.x, this.attackBox.down.position.y+55, this.attackBox.down.width, this.attackBox.down.height)
        //     } else if (lastKey === 'd') {
        //         ctx.fillRect(this.attackBox.right.position.x + 40, this.attackBox.right.position.y, this.attackBox.right.width, this.attackBox.right.height)
        //     }

        // }
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




const adventurer = new Player({
    position: {x: 50, y: 70},
    width: 40,
    height: 55,
    speed: {x: 0, y: 0},
    health: 20,
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
            offset: {x:30, y: 14},
            width: 40,
            height: 55
        },
        idleUp:{
            offset: {x: 30 ,y: 10},
            width: 40,
            height: 55
        },
        attRight:{
            offset: {x: 15 ,y: 8},
            width: 40,
            height: 55,
        },
        attLeft:{
            offset: {x: 30 ,y: 9},
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
        swimRight:{
            offset: {x: 30 ,y: 18},
            width: 40,
            height: 55,
            y: 10
        },
        swimLeft:{
            offset: {x: 38 ,y: 18},
            width: 40,
            height: 55,
            y: 10
        },
        swimUnD: {
            offset: {x: 30, y: 18}
        }, 
        hurt: {
            offset: {x: 30, y: 9},
            width: 40,
            height: 55
        }

    }
})
let hurt = false
let dying = false

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
    if(!attacking && !dying && !hurt){
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
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runUp.offset.x
                adventurer.offset.y = adventurer.sprites.runUp.offset.y
                adventurer.image.src = `./images/adventurer/runUp/golem-run-t-0${runCurrentFrame}.png`
                }
            } else if (keys.s.pressed && keys.a.pressed && keys.d.pressed){
                adventurer.speed.x = 0
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runDown.width
                adventurer.height = adventurer.sprites.runDown.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runDown.offset.x
                adventurer.offset.y = adventurer.sprites.runDown.offset.y
                adventurer.image.src = `./images/adventurer/runDown/golem-run-d-0${runCurrentFrame}.png`
                }
            } else if (keys.d.pressed && keys.w.pressed && keys.s.pressed){
                adventurer.speed.x = 3
                adventurer.speed.y = 0
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            } else if (keys.a.pressed && keys.s.pressed && keys.w.pressed) {
                adventurer.speed.x = -3
                adventurer.speed.y = 0
                adventurer.width = adventurer.sprites.runLeft.width
                adventurer.height = adventurer.sprites.runLeft.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runLeft.offset.x
                adventurer.offset.y = adventurer.sprites.runLeft.offset.y
                adventurer.image.src = `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            } else if(keys.d.pressed && keys.s.pressed){
                adventurer.speed.x = 3
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            }  else if(keys.a.pressed && keys.s.pressed){
                adventurer.speed.x = -3
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runUp.width
                adventurer.height = adventurer.sprites.runUp.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runUp.offset.x
                adventurer.offset.y = adventurer.sprites.runUp.offset.y
                adventurer.image.src =  `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            }  else if(keys.d.pressed && keys.w.pressed){
                adventurer.speed.x = 3
                adventurer.speed.y = -3
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            }  else if(keys.a.pressed && keys.w.pressed){
                adventurer.speed.x = -3
                adventurer.speed.y = -3
                adventurer.width = adventurer.sprites.runLeft.width
                adventurer.height = adventurer.sprites.runLeft.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runLeft.offset.x
                adventurer.offset.y = adventurer.sprites.runLeft.offset.y
                adventurer.image.src =  `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            }   else if(keys.a.pressed && keys.d.pressed){
                adventurer.speed.x = 0
                adventurer.speed.y = 0
                adventurer.width = adventurer.sprites.idleDown.width
                adventurer.height = adventurer.sprites.idleDown.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.idleDown.offset.x
                adventurer.offset.y = adventurer.sprites.idleDown.offset.y
                adventurer.image.src =  `./images/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
                }
            }  else if(keys.w.pressed && keys.s.pressed){
                adventurer.speed.x = 0
                adventurer.speed.y = 0              
                adventurer.width = adventurer.sprites.idleDown.width
                adventurer.height = adventurer.sprites.idleDown.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.idleDown.offset.x
                adventurer.offset.y = adventurer.sprites.idleDown.offset.y
                adventurer.image.src = `./images/adventurer/idleDown/golem-idle-d-0${idleCurrentFrame}.png`
                }
            } else if(keys.w.pressed){
                adventurer.speed.y = -3
                adventurer.width = adventurer.sprites.runUp.width
                adventurer.height = adventurer.sprites.runUp.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runUp.offset.x
                adventurer.offset.y = adventurer.sprites.runUp.offset.y
                adventurer.image.src = `./images/adventurer/runUp/golem-run-t-0${runCurrentFrame}.png`
                }
            } else if(keys.a.pressed){
                adventurer.speed.x = -3
                adventurer.width = adventurer.sprites.runLeft.width
                adventurer.height = adventurer.sprites.runLeft.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runLeft.offset.x
                adventurer.offset.y = adventurer.sprites.runLeft.offset.y
                adventurer.image.src =  `./images/adventurer/runLeft/golem-run-l-0${runCurrentFrame}.png`
                }
            } else if(keys.s.pressed){
                adventurer.speed.y = 3
                adventurer.width = adventurer.sprites.runDown.width
                adventurer.height = adventurer.sprites.runDown.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runDown.offset.x
                adventurer.offset.y = adventurer.sprites.runDown.offset.y
                adventurer.image.src = `./images/adventurer/runDown/golem-run-d-0${runCurrentFrame}.png`
                }
            } else if(keys.d.pressed){
                adventurer.speed.x = 3
                adventurer.width = adventurer.sprites.runRight.width
                adventurer.height = adventurer.sprites.runRight.height
                if(!swimming){
                adventurer.offset.x = adventurer.sprites.runRight.offset.x
                adventurer.offset.y = adventurer.sprites.runRight.offset.y
                adventurer.image.src = `./images/adventurer/runRight/golem-run-r-0${runCurrentFrame}.png`
                }
            }    else {
                moving = false  
            }
        }
}
let attacking = false
let attFramesElaped = 0
let attCurrentFrame = 0
let attFramesMax = 7
let attFramesHold = 6

const attack= () => {
    if(attacking && !swimming && !dying && !hurt){
        attFramesElaped++
            if(attFramesElaped % attFramesHold === 0){  
                if(attCurrentFrame < attFramesMax - 1){
                    attCurrentFrame++
                    adventurer.speed.x = 0
                    adventurer.speed.y = 0
                } else {
                    attCurrentFrame = 0
                    swimFramesElaped = 0
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
    if(!moving && !attacking && !swimming && !dying && !hurt){
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
}
let swimming = false
let swimFramesElaped = 0
let swimCurrentFrame = 0
let swimFramesMax = 13
let swimFramesHold = 15

let onCooldown = true
let cdBar = 0
let cdY = 23
let diveTimerFramesElaped = 0
let diveTimerCurrentFrame = 0
let diveTimerFramesMax = 23
let diveTimerFramesHold = 15


const diveTimer = ()=>{
    if(onCooldown && !dying){
        diveTimerFramesElaped++
        if(diveTimerFramesElaped % diveTimerFramesHold === 0){  
            if(diveTimerCurrentFrame < diveTimerFramesMax - 1 && cdBar <= 22){
                diveTimerCurrentFrame++
                cdBar += 1
                cdY -= 1
            } else {
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
                onCooldown = false
            }
        }
        
        // console.log('h')
        ctx.fillStyle = 'black'
        ctx.fillRect(adventurer.position.x + adventurer.width + 9, adventurer.position.y -4, 7, 28)
        ctx.fillStyle = 'white'
        ctx.fillRect(adventurer.position.x + adventurer.width + 11, (adventurer.position.y - 2) + cdY, 3, cdBar)
    }
}


const swimFrames = () =>{
    if(swimming == true && !onCooldown){
        hurt = false
        attacking = false
        attCurrentFrame = 0
        attFramesElaped = 0
        swimFramesElaped++
            if(swimFramesElaped % swimFramesHold === 0){  
                if(swimCurrentFrame < swimFramesMax - 1){
                    if(adventurer.health == 20){
                        adventurer.health = 20
                    } else{
                        adventurer.health += 1
                    }
                    swimCurrentFrame++
                } else {
                    swimFramesElaped = 0
                    swimCurrentFrame = 0
                    swimming = false
                    onCooldown = true
            }
        }

    
    if(keys.a.pressed && keys.d.pressed){
        adventurer.width = adventurer.sprites.swimLeft.width
        adventurer.height = adventurer.sprites.swimLeft.height
        adventurer.offset.x = adventurer.sprites.swimUnD.offset.x
        adventurer.offset.y = adventurer.sprites.swimUnD.offset.y
        adventurer.image.src = `./images/adventurer/swim/swimD/golem-swim-d-0${swimCurrentFrame}.png`
    } else if (keys.d.pressed ||  lastKey == 'd'){
        adventurer.width = adventurer.sprites.swimRight.width
        adventurer.height = adventurer.sprites.swimRight.height
        adventurer.offset.x = adventurer.sprites.swimRight.offset.x
        adventurer.offset.y = adventurer.sprites.swimRight.offset.y
        adventurer.image.src = `./images/adventurer/swim/swimR/golem-swim-r-0${swimCurrentFrame}.png`
    } else if (keys.d.pressed ||  lastKey == 'd'){
        adventurer.width = adventurer.sprites.swimRight.width
        adventurer.height = adventurer.sprites.swimRight.height
        adventurer.offset.x = adventurer.sprites.swimRight.offset.x
        adventurer.offset.y = adventurer.sprites.swimRight.offset.y
        adventurer.image.src = `./images/adventurer/swim/swimR/golem-swim-r-0${swimCurrentFrame}.png`
    } else if(keys.a.pressed ||  lastKey == 'a'){
        adventurer.width = adventurer.sprites.swimLeft.width
        adventurer.height = adventurer.sprites.swimLeft.height
        adventurer.offset.x = adventurer.sprites.swimLeft.offset.x
        adventurer.offset.y = adventurer.sprites.swimLeft.offset.y
        adventurer.image.src = `./images/adventurer/swim/swimL/golem-swim-l-0${swimCurrentFrame}.png`
    } else if(keys.w.pressed ||  lastKey == 'w'){
        adventurer.width = adventurer.sprites.swimLeft.width
        adventurer.height = adventurer.sprites.swimLeft.height
        adventurer.offset.x = adventurer.sprites.swimUnD.offset.x
        adventurer.offset.y = adventurer.sprites.swimUnD.offset.y
        adventurer.image.src = `./images/adventurer/swim/swimU/golem-swim-u-0${swimCurrentFrame}.png`
    } else if(keys.s.pressed ||  lastKey == 's'){
        adventurer.width = adventurer.sprites.swimLeft.width
        adventurer.height = adventurer.sprites.swimLeft.height
        adventurer.offset.x = adventurer.sprites.swimUnD.offset.x
        adventurer.offset.y = adventurer.sprites.swimUnD.offset.y
        adventurer.image.src = `./images/adventurer/swim/swimD/golem-swim-d-0${swimCurrentFrame}.png`
    } 
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

const spikeA = new Entity({
    position: {x: 650, y: 80},
    width: 22,
    height: 20,
    speed: {x: 0, y: 0},
    imageSrc: './images/adventurer/spike/spike-u.png',
    scale: .15,
    framesMax: 1,
    offset: {x: 2, y: 1}
    
})
const spikeB = new Entity({
    position: {x: 360, y: 220},
    width: 5,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/adventurer/spike/spike-u.png',
    scale: .5,
    framesMax: 1,
    offset: {x: 2, y: 1}
})
const spikeC = new Entity({
    position: {x: 620, y: 420},
    width: 5,
    height: 30,
    speed: {x: 0, y: 0},
    imageSrc: './images/adventurer/spike/spike-u.png',
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


const enemyA = new Entity({
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
const enemyB = new Entity({
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
const enemyC = new Entity({
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
const enemyD = new Entity({
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
const enemyE = new Entity({
    position:{x: 30, y: 60},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const enemyF = new Entity({
    position:{x: 30, y: 440},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const enemyG = new Entity({
    position:{x: 660, y: 440},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
    imageSrc: './images/entities/bat.png', 
    scale: 1, 
    framesMax: 5, 
    offset: {x: 2, y: 1}
})
const enemyH = new Entity({
    position:{x: 660, y: 60},
    width: 12, height: 12,
    speed: {x: 0, y: 0},
    health: 1,
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
    imageSrc: './images/head/head.png', 
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
const enemyAttack = (player, enemy)=>{
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
    enemyA.alive = true
    enemyB.alive = true
    enemyC.alive = true
    enemyD.alive = true

    if(enemyA.alive){
        enemyAttack(adventurer, enemyA)
        enemyA.update()
    }
   
    if(enemyB.alive){
        enemyAttack(adventurer, enemyB)
        enemyB.update()
    }
    if(enemyC.alive){
        enemyAttack(adventurer, enemyC)
        enemyC.update()
    }
    if(enemyD.alive){
        enemyAttack(adventurer, enemyD)
        enemyD.update()
    }
    door.update()

    if(enemyA.alive == false && enemyB.alive == false && enemyC.alive == false && enemyD.alive == false){
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


    if(spikeA.alive){
        spikeA.update()
    }
    door.update()

    if(batA.alive == false && batB.alive == false && batC.alive == false && batD.alive == false){
        level = 3
        scoreCount += 4
    }
}
let roomOver = false
const levelThree = () =>{
    if(spikeA.alive){
        spikeA.update()
    }
    door.update()
}
const levelFour = () =>{
  if(survivorRoomOne.notSafe){
        survivorRoomOne.update()
    }
    chest.update()
    door.update()
    if(spikeB.alive){
        spikeB.update()
    }
    if(survivorRoomOne.notSafe == false){
        dialogue = true
        message.classList.remove('hidden')
        message.innerText = 'Oh my gosh, thank you so much for coming to save me. Here is one gold as a token of my appreciation. Good luck getting that chest full of gold open!'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'k' to Continue`
        window.addEventListener('keydown', (e)=>{if(e.key == 'Enter'){
            dialogue = false
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
    if(spikeB.alive){
        spikeB.update()
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
        enemyAttack(adventurer, goblinE)
        goblinE.update()
    }
    if(goblinF.alive){
        enemyAttack(adventurer, goblinF)
        goblinF.update()
    }
    if(goblinG.alive){
        enemyAttack(adventurer, goblinG)
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
    if(spikeB.alive){
        spikeB.update()
    }
    if(spikeC.alive){
        spikeC.update()
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
        spikeB.alive = false
        spikeC.alive = false
    }
}
const levelSeven = ()=>{
    chest.update()
    door.update()
    if(key.alive){
        key.update()
    }
    if(chest.alive == false){
        dialogue = true
        message.classList.remove('hidden')
        message.innerText = '...it\'s empty...'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'k' to Continue`
        window.addEventListener('keydown', (e)=>{if(e.key == 'Enter'){
            dialogue = false
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
let spikeCount = 5
const spikeArr = []


class Spell{
    constructor({position, width, height, imageSrc, offset, color, speed, health}){
        this.position = position
        this.width = width
        this.height = height
        this.alive = true
        this.health = health
        this.color = color
        this.speed = speed
        this.image = new Image()
        this.image.src = imageSrc
        this.offset = offset
        this.scale = .18
        this.framesMax = 1
        this.framesCurrent = this.framesCurrent
        this.framesElaped = 0
        this.framesHold = 9
    }

    drawSpikes(){
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

        // ctx.fillStyle = this.color
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    updateSpikes(){
        this.drawSpikes()
        if(this.position.x < 50){
            this.alive = false
        } else if(this.position.x + this.width > 670){
            this.alive = false
        } else {
            this.position.x += this.speed.x
        }

        if(this.position.y < 60){
            this.alive = false
        } else if (this.position.y  + this.height > 450){
            this.alive = false  
        } else {
            this.position.y += this.speed.y
        }
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
const spikeDirection = () =>{
    if(keys.a.pressed && keys.d.pressed){
        spikeArr.push(new Spell({position: {x: adventurer.position.x + 10.5, y: adventurer.position.y + adventurer.height},width: 21, height: 20, imageSrc: './images/adventurer/spike/spike-d.png', offset: {x: 2, y: 0}, color: 'black', speed: {x: 0, y: 2.5},health: 0}))
    } else if(lastKey ==='d'){
        spikeArr.push(new Spell({position: {x: adventurer.position.x + adventurer.width, y: adventurer.position.y + 20}, width: 20, height: 21, imageSrc: './images/adventurer/spike/spike-r.png', offset: {x: 0, y: 2}, color: 'black', speed: {x: 2.5, y: 0},health: 0}))
    } else if(lastKey === 'w'){
        spikeArr.push(new Spell({position: {x: adventurer.position.x + 10.5, y: adventurer.position.y - 20},width: 21, height: 20, imageSrc: './images/adventurer/spike/spike-u.png', offset: {x: 2, y: 0},color:  'black', speed: {x: 0, y: -2.5},health: 0}))
    } else if(lastKey === 'a'){
        spikeArr.push(new Spell({position: {x: adventurer.position.x - 20, y: adventurer.position.y + 20},width: 20, height: 21, imageSrc: './images/adventurer/spike/spike-l.png', offset: {x: 0, y: 2}, color:'black', speed: {x: -2.5, y: 0},health: 0}))
    } else if(lastKey === 's'){
        spikeArr.push(new Spell({position: {x: adventurer.position.x + 10.5, y: adventurer.position.y + adventurer.height},width: 21, height: 20, imageSrc: './images/adventurer/spike/spike-d.png', offset: {x: 2, y: 0}, color: 'black', speed: {x: 0, y: 2.5},health: 0}))
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
    if(spikeCount
     >= 10){
        spikes.innerText = `Spikes:${spikeCount
    }`
    } else {
        spikes.innerText = `Spikes: ${spikeCount
    }`
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

const collectSpike = (spike, player) => {
    const left = spike.position.x + spike.width >=  player.position.x
    const right = spike.position.x <= player.position.x + player.width
    const top = spike.position.y + spike.height >= player.position.y
    const bottom = spike.position.y <= player.position.y + player.height
    
    if(right && left && top && bottom && spike.alive){
        spikeCount
     += 5
        spike.alive = false
    } else {
        return false
    }
}
const spikeHit = (spike, enemy) => {
        // AABB -- axis aligned bounding box collision detection
        const Left = spike.position.x + spike.width >= enemy.position.x
    
        const Right = spike.position.x <= enemy.position.x + enemy.width 
    
        const Top = spike.position.y + spike.height >= enemy.position.y
    
        const Bottom = spike.position.y <= enemy.position.y + enemy.height
    
        if(Right && Left && Bottom && Top){
            enemy.health -= 1
            if(enemy.health >= 1 && spike.speed.x > 0){
                enemy.position.x += 30
                spike.alive = false
            } else if(enemy.health >=  1 && spike.speed.x < 0){
                enemy.position.x -= 30
                spike.alive = false
            } else if(enemy.health >=  1 && spike.speed.y < 0){
                enemy.position.y -= 30
                spike.alive = false
            } else if(enemy.health >=  1 && spike.speed.y > 0){
                enemy.position.y += 30
                spike.alive = false
            } else if (enemy.health == 0){
                enemy.alive = false
                spike.alive = false
            }    
        } else {
            return false
        }
}
const enemyHit = (player, enemy) => {
    const rLeft = (player.attackBox.right.position.x + 40)+ player.attackBox.right.width >=  enemy.position.x
    const rRight = player.attackBox.right.position.x <= enemy.position.x + enemy.width
    const rTop =  (player.attackBox.right.position.y) + player.attackBox.right.height>= enemy.position.y
    const rBottom =(player.attackBox.right.position.y) <= enemy.position.y + enemy.height

    const lLeft = (player.attackBox.left.position.x - 30)+ player.attackBox.left.width >=  enemy.position.x
    const lRight = player.attackBox.left.position.x - 30 <= enemy.position.x + enemy.width
    const lTop = (player.attackBox.left.position.y) + player.attackBox.left.height >= enemy.position.y
    const lBottom = (player.attackBox.left.position.y) <= enemy.position.y + enemy.height

    const uLeft = (player.attackBox.up.position.x)+ player.attackBox.up.width >=  enemy.position.x
    const uRight = (player.attackBox.up.position.x) <= enemy.position.x + enemy.width
    const uTop = (player.attackBox.up.position.y - 25) + player.attackBox.up.height >= enemy.position.y
    const uBottom = (player.attackBox.up.position.y - 25) <= enemy.position.y + enemy.height

    const dLeft = player.attackBox.down.position.x + player.attackBox.down.width >=  enemy.position.x
    const dRight = player.attackBox.down.position.x <= enemy.position.x + enemy.width
    const dTop = player.attackBox.down.position.y + 55 + player.attackBox.down.height >= enemy.position.y
    const dBottom = player.attackBox.down.position.y + 55 <= enemy.position.y + enemy.height


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
    // console.log(player.health)
    if(player.health == 20){
        health.style.width = '100%'
        health.style.backgroundColor = 'green'
    } else if(player.health == 19){
        health.style.width = '95%'
        health.style.backgroundColor = 'green'
    } else if(player.health == 18){
        health.style.width = '90%'
        health.style.backgroundColor = 'green'
    } else if(player.health == 17){
        health.style.width = '85%'
        health.style.backgroundColor = 'green'
    } else if(player.health == 16){
        health.style.width = '80%'
        health.style.backgroundColor = 'green'
    } else if(player.health == 15){
        health.style.width = '75%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 14){
        health.style.width = '70%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 13){
        health.style.width = '65%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 12){
        health.style.width = '60%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 11){
        health.style.width = '55%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 10){
        health.style.width = '50%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 9){
        health.style.width = '45%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 8){
        health.style.width = '40%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 7){
        health.style.width = '35%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 6){
        health.style.width = '30%'
        health.style.backgroundColor = 'orange'
    } else if(player.health == 5){
        health.style.width = '25%'
        health.style.backgroundColor = 'red'
    } else if(player.health == 4){
        health.style.width = '20%'
        health.style.backgroundColor = 'red'
    } else if(player.health == 3){
        health.style.width = '15%'
        health.style.backgroundColor = 'red'
    } else if(player.health == 2){
        health.style.width = '10%'
        health.style.backgroundColor = 'red'
    } else if(player.health == 1) {
        health.style.width = '5%'
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

let dyingFramesElaped = 0
let dyingCurrentFrame = 0
let dyingFramesMax = 9
let dyingFramesHold = 15

let hurtFramesElaped = 0
let hurtCurrentFrame = 0
let hurtFramesMax = 3
let hurtFramesHold = 15
const hurtFrames = ()=>{
                if(hurt){
                    hurtFramesElaped++
                    if(hurtFramesElaped % hurtFramesHold === 0){  
                        if(hurtCurrentFrame < hurtFramesMax - 1){
                            hurtCurrentFrame++
                            adventurer.speed.x = 0
                            adventurer.speed.y = 0
                        } else {
                            hurtFramesElaped = 0
                            hurtCurrentFrame = 0
                            hurt = false
                        }
                    }
                    if(lastKey == 's'){
                        adventurer.width = adventurer.sprites.hurt.width
                        adventurer.height = adventurer.sprites.hurt.height
                        adventurer.offset.x = adventurer.sprites.hurt.offset.x
                        adventurer.offset.y = adventurer.sprites.hurt.offset.y
                        adventurer.image.src = `./images/adventurer/hurtD/golem-hurt-d-0${hurtCurrentFrame}.png`
                    } else if (lastKey == 'w'){
                        adventurer.width = adventurer.sprites.hurt.width
                        adventurer.height = adventurer.sprites.hurt.height
                        adventurer.offset.x = adventurer.sprites.hurt.offset.x
                        adventurer.offset.y = adventurer.sprites.hurt.offset.y
                        adventurer.image.src = `./images/adventurer/hurtU/golem-hurt-t-0${hurtCurrentFrame}.png`
                    } else if (lastKey == 'a'){
                        adventurer.width = adventurer.sprites.hurt.width
                        adventurer.height = adventurer.sprites.hurt.height
                        adventurer.offset.x = adventurer.sprites.hurt.offset.x
                        adventurer.offset.y = adventurer.sprites.hurt.offset.y
                        adventurer.image.src = `./images/adventurer/hurtL/golem-hurt-l-0${hurtCurrentFrame}.png`
                    } else if (lastKey == 'd'){
                        adventurer.width = adventurer.sprites.hurt.width
                        adventurer.height = adventurer.sprites.hurt.height
                        adventurer.offset.x = adventurer.sprites.hurt.offset.x
                        adventurer.offset.y = adventurer.sprites.hurt.offset.y
                        adventurer.image.src = `./images/adventurer/hurtR/golem-hurt-r-0${hurtCurrentFrame}.png`
                    }
                }
}


            


const playerHit = (player, enemy) => {
    const left = enemy.position.x + enemy.width >=  player.position.x
    const right = enemy.position.x <= player.position.x + player.width
    const top = enemy.position.y + enemy.height >= player.position.y
    const bottom = enemy.position.y <= player.position.y + player.height

    const sleft = enemy.position.x + enemy.width >=  player.position.x -15
    const sright = enemy.position.x <= player.position.x + player.width + 15
    const stop = enemy.position.y + enemy.height >= player.position.y + 17
    const sbottom = enemy.position.y <= player.position.y + player.height + 5

    if(enemy.health > 0){
        enemy.alive = true
    }

    

    
    if(swimming && sright && sleft && stop && sbottom && enemy.alive){
            enemy.health -= 1
            if(enemy.health >= 1 && lastKey === 'w'){
                enemy.position.y -= 60
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health >= 1 && lastKey === 'a') {
                enemy.position.x -= 60
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health >= 1 && lastKey === 's') {
                enemy.position.y += 60
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health >= 1 && lastKey === 'd') {
                enemy.position.x += 60
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health === 0){
                enemy.alive = false
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            }
        } else if (!swimming && right && left && top && bottom && enemy.alive){
            player.health -= 5
            healthChecker(player)
            hurt = true

            if(player.health >= 1 && lastKey === 'w'){
                player.position.y += 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            } else if (player.health >= 1 && lastKey === 'a') {
                player.position.x += 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            } else if (player.health >= 1 && lastKey === 's') {
                player.position.y -= 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            } else if (player.health >= 1 && lastKey === 'd') {
                player.position.x -= 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            } else if (player.health <= 0){
                dying = true
                if(dying){
                    dyingFramesElaped++
                    if(dyingFramesElaped % dyingFramesHold === 0){  
                        if(dyingCurrentFrame < dyingFramesMax - 1){
                            dyingCurrentFrame++
                        } else {
                            dyingFramesElaped = 0
                            dyingCurrentFrame = 0
                            gameLost = true 
                            player.alive = false
                        }
                    }
                }
                adventurer.speed.x = 0
                adventurer.speed.y = 0
                adventurer.width = adventurer.sprites.swimLeft.width
                adventurer.height = adventurer.sprites.swimLeft.height
                adventurer.offset.x = adventurer.sprites.swimUnD.offset.x
                adventurer.offset.y = adventurer.sprites.swimUnD.offset.y
                adventurer.image.src = `./images/adventurer/dying/golem-death-d-0${dyingCurrentFrame}.png`

           
                
            }
      } else {
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
    //spikes background
    ctx.fillRect(65, 490, 188, 26)
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
    ctx.fillRect(0, 485, 65, 31)
    //bottom right border
    ctx.fillRect(695, 485, 5, 31)
    //bottom top border
    ctx.fillRect(0, 485, 700, 5)
   

    //top left background border
    ctx.fillRect(170, 4, 25, 26)
    //top right background border
    ctx.fillRect(341, 4, 39, 26)
    //bottom background border
    ctx.fillRect(251, 490, 24, 26)
 

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
            if(e.key == 'Enter'){
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
        continueButton.innerText = `Press 'Enter' to Retry?`
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'Enter'){
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
        continueButton.innerText = `Press 'Enter' to Retry?`
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'Enter'){
            location.reload()
            }})
    }

}

const checkEnemyHit = ()=>{
        enemyHit(adventurer, enemyA)
        enemyHit(adventurer, enemyB)
        enemyHit(adventurer, enemyC)
        enemyHit(adventurer, enemyD)
        enemyHit(adventurer, enemyE)
        enemyHit(adventurer, enemyF)
        enemyHit(adventurer, enemyG)
        enemyHit(adventurer, enemyH)
        headHit(adventurer, head) 

}
const checkPlayerHit = () => {
        playerHit(adventurer,enemyA)
        playerHit(adventurer,enemyB)
        playerHit(adventurer,enemyC)
        playerHit(adventurer,enemyD)
        playerHit(adventurer,enemyE)
        playerHit(adventurer,enemyF)
        playerHit(adventurer,enemyG)
        playerHit(adventurer,enemyH)
        playerHit(adventurer, head)
        
 }
let moved = false






function animate(){
    window.requestAnimationFrame(animate)
   
    ctx.fillStyle = 'gray'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    gameBorders()

    if(adventurer.alive){
       adventurer.update()
       adventurer.visualHitBox()
    
    }

    gameState()
    
    
    attack()
    swimFrames()
    hurtFrames()
    diveTimer()
    movementFrames()
    idleDirection()
    healthChecker(adventurer)

 
    
    spikeArr.forEach(spell =>{
        if(spell.alive){
        spell.position.x += spell.speed.x
        spell.position.y += spell.speed.y
        spell.updateSpikes()
        
        spikeHit(spell, enemyA)
        spikeHit(spell, enemyB)
        spikeHit(spell, enemyC)
        spikeHit(spell, enemyD)
        spikeHit(spell, enemyE)
        spikeHit(spell, enemyF)
        spikeHit(spell, enemyG)
        spikeHit(spell, enemyH)
        spikeHit(spell, head)
      }
    })
    // console.log(roomOver)
    // console.log(level)
    
    checkEnemyHit()
    checkPlayerHit()

    collectSpike(spikeA, adventurer)
    collectSpike(spikeB, adventurer)
    collectSpike(spikeC, adventurer)
    saveSurvivor(survivorRoomOne, adventurer)
    touchDoor(door, adventurer)
    touchChest(chest, adventurer)
    touchKey(key, adventurer)

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
            if(!attacking && !dialogue && !hurt){
                keys.w.pressed = true
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'a':
            if(!attacking && !dialogue && !hurt){
                keys.a.pressed = true  
                lastKeyPressed()  
                moving = true
                moved = true
            }
            break
        case 's':
            if(!attacking && !dialogue && !hurt){
                keys.s.pressed = true
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'd':
            if(!attacking && !dialogue && !hurt){
                keys.d.pressed = true 
                lastKeyPressed()
                moving = true
                moved = true
            }
            break
        case 'j':
            if(adventurer.alive &&  !bossDead && !dialogue && !attacking && !swimming && !hurt){
                adventurer.attack()
                currentFrame = 0
                attacking = true
            }
            break
        case 'l': 
        if(adventurer.alive && spikeCount >= 1 && !dialogue && moved && !hurt){
            spikeDirection()
            spikeCount -= 1
            }
            break
        case 'k':
            if(adventurer.alive && !dialogue && moved && !onCooldown){
                if(swimming == true){
                    swimming = false
                    onCooldown = true
                    swimCurrentFrame = 0
                    swimFramesElaped = 0
                } else{
                    swimming = true
                }
                
                swimFrames()
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

