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
    constructor({position, width, height, health, damage, imageSrc, scale = 1, framesMax, offset, sprites}){
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
        this.damage = damage
        this.offset = offset
        this.notSafe = true
        this.direction = 'left'
        this.hurt = false
        this.dying = false
        this.waiting = false
        this.attacking = false
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
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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
        if(this.position.x < 30){
            this.position.x = 30
        } else if(this.position.x + this.width > 670){
            this.position.x = 670 - this.width
        } 

        if(this.position.y < 60){
            this.position.y = 60
        } else if (this.position.y  + this.height > 450){
            this.position.y = 450 - this.height    
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
            this.speed.x = 0
            this.position.x = 30
        } else if(this.position.x + this.width > 670){
            this.speed.x = 0
            this.position.x = 670 - this.width
        } else {
            this.position.x += this.speed.x
        }

        if(this.position.y < 60){
            this.speed.y = 0
            this.position.y = 60
        } else if (this.position.y  + this.height > 450){
            this.speed.y = 0
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
        }, 400)
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
    width: 22,
    height: 20,
    speed: {x: 0, y: 0},
    imageSrc: './images/adventurer/spike/spike-u.png',
    scale: .15,
    framesMax: 1,
    offset: {x: 2, y: 1}
})
const spikeC = new Entity({
    position: {x: 620, y: 420},
    width: 22,
    height: 20,
    speed: {x: 0, y: 0},
    imageSrc: './images/adventurer/spike/spike-u.png',
    scale: .15,
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
    position: {x: 666, y: 200},
    width: 10,
    height: 65,
    speed: {x: 0, y: 0},
    imageSrc: './images/entities/door.png',
    scale: 1,
    framesMax: 1,
    offset: {x: 22, y: 15},
    sprites: {openDoor: {
        imageSrc: './images/entities/door2.png',
        offset: {x: 18, y: 15},
        scale: 1.25
    },
    door:{
        imageSrc: './images/entities/door.png',
        offset: {x: 22, y: 15},
        scale: 1
    }

}
})
const chest = new Entity({
    position: {x: 600, y: 70},
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
    position:{x: 650, y: 400},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 5,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: './images/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: './images/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: './images/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: './images/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: './images/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: './images/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: './images/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33,
        },
        houndRight:{    
            imageSrc: './images/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: './images/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: './images/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndDeathLeft: {
            imageSrc: './images/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: './images/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndAttackLeft: {
            imageSrc: './images/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: './images/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
    }
})
const enemyB = new Entity({
    position:{x: 410, y: 300},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 5,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 7, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: './images/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: './images/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: './images/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: './images/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: './images/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: './images/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: './images/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndRight:{    
            imageSrc: './images/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: './images/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: './images/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndDeathLeft: {
            imageSrc: './images/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: './images/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndAttackLeft: {
            imageSrc: './images/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: './images/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },

    }
})
const enemyC = new Entity({
    position:{x: 400, y: 400},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 4,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 7, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: './images/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: './images/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: './images/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: './images/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: './images/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: './images/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: './images/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndRight:{    
            imageSrc: './images/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: './images/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: './images/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndDeathLeft: {
            imageSrc: './images/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: './images/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndAttackLeft: {
            imageSrc: './images/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: './images/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },

    }
})
const enemyD = new Entity({
    position:{x: 500, y: 100},
    width: 25, height: 40,
    speed: {x: 0, y: 0},
    health: 5,
    damage: 4,
    imageSrc: '', 
    scale: 1, 
    framesMax: 8, 
    offset: {x: 0, y: 0},
    sprites: {
        goblinLeft: {
            imageSrc: './images/entities/goblin/goblinL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinRight:{    
                imageSrc: './images/entities/goblin/goblinR.png',
                framesMax: 6,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinHurtLeft:{
            imageSrc: './images/entities/goblin/goblinHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinHurtRight:{
            imageSrc: './images/entities/goblin/goblinHurtR.png',
            framesMax: 4,
                framesHold: 7,
                offset: {x: 5, y:11},
                width: 25,
                height: 38
        },
        goblinDeathLeft:{
            imageSrc: './images/entities/goblin/goblinDeathL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 20, y:11},
            width: 25,
            height: 38
        },
        goblinDeathRight:{
            imageSrc: './images/entities/goblin/goblinDeathR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 5, y:11},
            width: 25,
            height: 38
        },
        houndLeft: {
            imageSrc: './images/entities/hound/houndL.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndRight:{    
            imageSrc: './images/entities/hound/houndR.png',
            framesMax: 6,
            framesHold: 5,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
        },
        houndHurtLeft: {
            imageSrc: './images/entities/hound/houndHurtL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndHurtRight:{    
            imageSrc: './images/entities/hound/houndHurtR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndDeathLeft: {
            imageSrc: './images/entities/hound/houndDyingL.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndDeathRight:{    
            imageSrc: './images/entities/hound/houndDyingR.png',
            framesMax: 6,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },
        houndAttackLeft: {
            imageSrc: './images/entities/hound/houndAttackL.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 10, y:16},
            width: 36,
            height: 33
        },
        houndAttackRight:{    
            imageSrc: './images/entities/hound/houndAttackR.png',
            framesMax: 4,
            framesHold: 7,
            offset: {x: 4, y:16},
            width: 36,
            height: 33
    },

    }
})
const reaper = new Entity({
    position:{x: 100, y: 240},
    width: 20, height: 20,
    speed: {x: 0, y: 0},
    health: 20,
    damage: 3,
    imageSrc: '', 
    scale: .7, 
    framesMax: 1, 
    offset: {x: 12, y: 2},
    sprites: {
            reaperLeft: {
                imageSrc: './images/entities/reaper/reaperRunningLeft.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 16, y:10},
                width: 20,
                height: 30
            },
            reaperRight:{    
                imageSrc: './images/entities/reaper/reaperRunningRight.png',
                framesMax: 8,
                framesHold: 7,
                offset: {x: 14, y:10},
                width: 20,
                height: 30
            },
            reaperIdle:{
                imageSrc: './images/entities/reaper/reaperIdle.png',
                framesMax: 5,
                framesHold: 7,
                offset: {x: 14, y:10},
                width: 20,
                height: 30
            },
            reaperIdleLeft:{
                imageSrc: './images/entities/reaper/reaperIdleLeft.png',
                framesMax: 5,
                framesHold: 7,
                offset: {x: 16, y:10},
                width: 20,
                height: 30
            },
            reaperAttackRight:{
                imageSrc: './images/entities/reaper/reaperAttackRight.png',
                framesMax: 10,
                framesHold: 15,
                offset: {x: 14, y: 10},
                width: 20,
                height: 30
            },
            reaperHolsterWeaponLeft:{
                imageSrc: './images/entities/reaper/reaperHolsterWeaponLeft.png',
                framesMax: 10,
                framesHold: 10,
                offset: {x: 16, y:10},
                width: 20,
                height: 30
            },
            reaperHolsterWeaponRight:{
                imageSrc: './images/entities/reaper/reaperHolsterWeaponRight.png',
                framesMax: 10,
                framesHold: 10,
                offset: {x: 14, y:10},
                width: 20,
                height: 30
            },
    }
})

const mobCollision = (mobOne, mobTwo)=>{    
    const left = mobOne.position.x + mobOne.width >=  mobTwo.position.x
    const right = mobOne.position.x <= mobTwo.position.x + mobTwo.width
    const top = mobOne.position.y + mobOne.height >= mobTwo.position.y
    const bottom = mobOne.position.y <= mobTwo.position.y + mobTwo.height


    if(left && right && top && bottom && mobOne.alive && mobTwo.alive && !mobOne.dying && !mobTwo.dying && !mobOne.hurt){
            mobTwo.waiting = true
    } else {
            mobTwo.waiting = false
    }


}


const houndAttack = (player, enemy)=>{
    enemy.damage = 2

    if(enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndDeathLeft.framesMax
            enemy.width = enemy.sprites.houndDeathLeft.width
            enemy.height = enemy.sprites.houndDeathLeft.height
            enemy.image = enemy.sprites.houndDeathLeft.image 
            enemy.offset.x = enemy.sprites.houndDeathLeft.offset.x
            enemy.offset.y = enemy.sprites.houndDeathLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndDeathRight.framesMax
            enemy.width = enemy.sprites.houndDeathRight.width
            enemy.height = enemy.sprites.houndDeathRight.height
            enemy.image = enemy.sprites.houndDeathRight.image 
            enemy.offset.x = enemy.sprites.houndDeathRight.offset.x
            enemy.offset.y = enemy.sprites.houndDeathRight.offset.y
        }
    } else if(enemy.hurt && !enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndHurtLeft.framesMax
            enemy.width = enemy.sprites.houndHurtLeft.width
            enemy.height = enemy.sprites.houndHurtLeft.height
            enemy.image = enemy.sprites.houndHurtLeft.image 
            enemy.offset.x = enemy.sprites.houndHurtLeft.offset.x
            enemy.offset.y = enemy.sprites.houndHurtLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.houndHurtRight.framesMax
            enemy.width = enemy.sprites.houndHurtRight.width
            enemy.height = enemy.sprites.houndHurtRight.height
            enemy.image = enemy.sprites.houndHurtRight.image 
            enemy.offset.x = enemy.sprites.houndHurtRight.offset.x
            enemy.offset.y = enemy.sprites.houndHurtRight.offset.y
        }
    } else if (!enemy.hurt && !enemy.dying && enemy.alive && !enemy.waiting){
        if(enemy.position.x <= player.position.x + player.width + 45 && enemy.position.x >= player.position.x + player.width && !player.dying && !enemy.dying){
            setTimeout(()=>{enemy.position.x -= 2; enemy.position.y += 0 }, 1000)
            enemy.image = enemy.sprites.houndAttackLeft.image
            enemy.framesMax = enemy.sprites.houndAttackLeft.framesMax
            enemy.offset.x = enemy.sprites.houndAttackLeft.offset.x
            enemy.offset.y = enemy.sprites.houndAttackLeft.offset.y
            
        } else if(enemy.position.x + enemy.width  >= player.position.x - 45 && enemy.position.x + enemy.width <= player.position.x && !enemy.dying && !player.dying) {
            setTimeout(()=>{enemy.position.x += 2; enemy.position.y += 0}, 1000)
            enemy.image = enemy.sprites.houndAttackRight.image
            enemy.framesMax = enemy.sprites.houndAttackRight.framesMax
            enemy.offset.x = enemy.sprites.houndAttackRight.offset.x
            enemy.offset.y = enemy.sprites.houndAttackRight.offset.y
        } else{
          if(enemy.position.x >= player.position.x + player.width + 35){
           
            enemy.position.x -= .5
            enemy.direction = 'left'
            enemy.width = enemy.sprites.houndLeft.width
            enemy.height = enemy.sprites.houndLeft.height
            enemy.image = enemy.sprites.houndLeft.image
            enemy.framesMax = enemy.sprites.houndLeft.framesMax
            enemy.offset.x = enemy.sprites.houndLeft.offset.x
            enemy.offset.y = enemy.sprites.houndLeft.offset.y
        }
        if(enemy.position.x + enemy.width <= player.position.x - 35){
            enemy.position.x += .5
            enemy.direction = 'right'
            enemy.width = enemy.sprites.houndRight.width
            enemy.height = enemy.sprites.houndRight.height
            enemy.image = enemy.sprites.houndRight.image
            enemy.framesMax = enemy.sprites.houndRight.framesMax
            enemy.offset.x = enemy.sprites.houndRight.offset.x
            enemy.offset.y = enemy.sprites.houndRight.offset.y
        }
        if(enemy.position.y >= player.position.y + 20){
            enemy.position.y -= .5
        }
        if(enemy.position.y <= player.position.y + 20){
            enemy.position.y += .5
        }
    }
  }
}

let intermission = false
const reaperBlink=()=>{
    if(!intermission && reaper.alive){
        console.log('working')
        setInterval(()=>{
            console.log('still working')
            setTimeout(()=>{
                reaper.framesCurrent = 0
                reaper.attacking = true
                reaper.position.x = adventurer.position.x - 22
                reaper.position.y = adventurer.position.y + 20
            }, 5000)
            setTimeout(()=>{
                reaper.damage = 6
                reaper.width = 40
            }, 5400)
            setTimeout(()=>{
                reaper.damage = 3
                reaper.width = 20
            }, 5600)
            setTimeout(()=>{
                reaper.attacking = false
                reaper.framesCurrent = 0
            }, 6000)
        }, 7000)
    }
}


const reaperAttack = (player, enemy)=>{

    enemy.scale = 1
    if(enemy.attacking){
        enemy.direction = 'right'
        enemy.position.x -= 0
        enemy.framesMax = enemy.sprites.reaperAttackRight.framesMax
        enemy.height = enemy.sprites.reaperAttackRight.height
        enemy.image = enemy.sprites.reaperAttackRight.image 
        enemy.offset.x = enemy.sprites.reaperAttackRight.offset.x
        enemy.offset.y = enemy.sprites.reaperAttackRight.offset.y
    } else if(intermission){
        enemy.position.x = 330
        enemy.position.y = 240
        enemy.framesMax = enemy.sprites.reaperIdle.framesMax
        enemy.width = enemy.sprites.reaperIdle.width
        enemy.height = enemy.sprites.reaperIdle.height
        enemy.image = enemy.sprites.reaperIdle.image 
        enemy.offset.x = enemy.sprites.reaperIdle.offset.x
        enemy.offset.y = enemy.sprites.reaperIdle.offset.y
    } else if(enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperHolsterWeaponLeft.framesMax
            enemy.width = enemy.sprites.reaperHolsterWeaponLeft.width
            enemy.height = enemy.sprites.reaperHolsterWeaponLeft.height
            enemy.image = enemy.sprites.reaperHolsterWeaponLeft.image 
            enemy.offset.x = enemy.sprites.reaperHolsterWeaponLeft.offset.x
            enemy.offset.y = enemy.sprites.reaperHolsterWeaponLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperHolsterWeaponRight.framesMax
            enemy.width = enemy.sprites.reaperHolsterWeaponRight.width
            enemy.height = enemy.sprites.reaperHolsterWeaponRight.height
            enemy.image = enemy.sprites.reaperHolsterWeaponRight.image 
            enemy.offset.x = enemy.sprites.reaperHolsterWeaponRight.offset.x
            enemy.offset.y = enemy.sprites.reaperHolsterWeaponRight.offset.y
        }
    } else if(enemy.hurt && !enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperIdleLeft.framesMax
            enemy.width = enemy.sprites.reaperIdleLeft.width
            enemy.height = enemy.sprites.reaperIdleLeft.height
            enemy.image = enemy.sprites.reaperIdleLeft.image 
            enemy.offset.x = enemy.sprites.reaperIdleLeft.offset.x
            enemy.offset.y = enemy.sprites.reaperIdleLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.reaperIdle.framesMax
            enemy.width = enemy.sprites.reaperIdle.width
            enemy.height = enemy.sprites.reaperIdle.height
            enemy.image = enemy.sprites.reaperIdle.image 
            enemy.offset.x = enemy.sprites.reaperIdle.offset.x
            enemy.offset.y = enemy.sprites.reaperIdle.offset.y
        }
    } else if (!enemy.hurt && !enemy.dying && enemy.alive && !enemy.waiting &&  !enemy.attacking && !intermission){
        if(enemy.position.x >= player.position.x){
            enemy.direction = 'left'
            enemy.position.x -= 1
            enemy.width = enemy.sprites.reaperLeft.width
            enemy.height = enemy.sprites.reaperLeft.height
            enemy.image = enemy.sprites.reaperLeft.image
            enemy.framesMax = enemy.sprites.reaperLeft.framesMax
            enemy.offset.x = enemy.sprites.reaperLeft.offset.x
            enemy.offset.y = enemy.sprites.reaperLeft.offset.y
        }
        if(enemy.position.x <= player.position.x){
            enemy.direction = 'right'
            enemy.position.x += 1
            enemy.width = enemy.sprites.reaperRight.width
            enemy.height = enemy.sprites.reaperRight.height
            enemy.image = enemy.sprites.reaperRight.image
            enemy.framesMax = enemy.sprites.reaperRight.framesMax
            enemy.offset.x = enemy.sprites.reaperRight.offset.x
            enemy.offset.y = enemy.sprites.reaperRight.offset.y           
        }
        if(enemy.position.y >= player.position.y + 20){
            enemy.position.y -= 1
        }
        if(enemy.position.y <= player.position.y + 20){
            enemy.position.y += 1
        }
      }
}

const goblinAttack = (player, enemy)=>{
    enemy.damage = 4
    if(enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinDeathLeft.framesMax
            enemy.width = enemy.sprites.goblinDeathLeft.width
            enemy.height = enemy.sprites.goblinDeathLeft.height
            enemy.image = enemy.sprites.goblinDeathLeft.image 
            enemy.offset.x = enemy.sprites.goblinDeathLeft.offset.x
            enemy.offset.y = enemy.sprites.goblinDeathLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinDeathRight.framesMax
            enemy.width = enemy.sprites.goblinDeathRight.width
            enemy.height = enemy.sprites.goblinDeathRight.height
            enemy.image = enemy.sprites.goblinDeathRight.image 
            enemy.offset.x = enemy.sprites.goblinDeathRight.offset.x
            enemy.offset.y = enemy.sprites.goblinDeathRight.offset.y
        }
    } else if(enemy.hurt && !enemy.dying){
        if(enemy.direction == 'left'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinHurtLeft.framesMax
            enemy.width = enemy.sprites.goblinHurtLeft.width
            enemy.height = enemy.sprites.goblinHurtLeft.height
            enemy.image = enemy.sprites.goblinHurtLeft.image 
            enemy.offset.x = enemy.sprites.goblinHurtLeft.offset.x
            enemy.offset.y = enemy.sprites.goblinHurtLeft.offset.y
        } if(enemy.direction == 'right'){
            enemy.position.x -= 0
            enemy.framesMax = enemy.sprites.goblinHurtRight.framesMax
            enemy.width = enemy.sprites.goblinHurtRight.width
            enemy.height = enemy.sprites.goblinHurtRight.height
            enemy.image = enemy.sprites.goblinHurtRight.image 
            enemy.offset.x = enemy.sprites.goblinHurtRight.offset.x
            enemy.offset.y = enemy.sprites.goblinHurtRight.offset.y
        }
    } else if (!enemy.hurt && !enemy.dying && enemy.alive && !enemy.waiting){
        if(enemy.position.x >= player.position.x && !enemy.waiting){
            enemy.direction = 'left'
            enemy.position.x -= .6
            enemy.width = enemy.sprites.goblinLeft.width
            enemy.height = enemy.sprites.goblinLeft.height
            enemy.image = enemy.sprites.goblinLeft.image
            enemy.framesMax = enemy.sprites.goblinLeft.framesMax
            enemy.offset.x = enemy.sprites.goblinLeft.offset.x
            enemy.offset.y = enemy.sprites.goblinLeft.offset.y
        }
        if(enemy.position.x <= player.position.x && !enemy.waiting){
            enemy.direction = 'right'
            enemy.position.x += .6
            enemy.width = enemy.sprites.goblinRight.width
            enemy.height = enemy.sprites.goblinRight.height
            enemy.image = enemy.sprites.goblinRight.image
            enemy.framesMax = enemy.sprites.goblinRight.framesMax
            enemy.offset.x = enemy.sprites.goblinRight.offset.x
            enemy.offset.y = enemy.sprites.goblinRight.offset.y           
        }
        if(enemy.position.y >= player.position.y + 15 && !enemy.waiting){
            enemy.position.y -= .6
        }
        if(enemy.position.y <= player.position.y + 15 && !enemy.waiting){
            enemy.position.y += .6
        }
      }
}

let dialogue = false

const levelOne = ()=>{
    
    if(enemyA.alive){
        goblinAttack(adventurer, enemyA)
        enemyA.update()
    }
   
    if(enemyB.alive){
        goblinAttack(adventurer, enemyB)
        enemyB.update()
    }
    if(enemyC.alive){
        goblinAttack(adventurer, enemyC)
        enemyC.update()
    }
    if(enemyD.alive){
        goblinAttack(adventurer, enemyD)
        enemyD.update()
    }
    door.update()

    if(enemyA.alive == false && enemyB.alive == false && enemyC.alive == false && enemyD.alive == false){
        level = 2
        scoreCount += 4
        spikeA.alive = true
        enemyA.alive = true
        enemyB.alive = true
        enemyC.alive = true
        enemyD.alive = true
        enemyA.health = 4
        enemyB.health = 4
        enemyC.health = 4
        enemyD.health = 4
        enemyA.position.x = 40
        enemyA.position.y = 70
        enemyB.position.x = 630
        enemyB.position.y = 70
        enemyC.position.x = 40
        enemyC.position.y = 400
        enemyD.position.x = 630
        enemyD.position.y = 400
    }
}

const levelTwo = () =>{
    if(enemyA.alive){
        houndAttack(adventurer, enemyA)
        enemyA.update()
    }
   
    if(enemyB.alive){
        houndAttack(adventurer, enemyB)
        enemyB.update()
    }
    if(enemyC.alive){
        houndAttack(adventurer, enemyC)
        enemyC.update()
    }
    if(enemyD.alive){
        houndAttack(adventurer, enemyD)
        enemyD.update()
    }


    if(spikeA.alive){
        spikeA.update()
    }
    door.update()

    if(enemyA.alive == false && enemyB.alive == false && enemyC.alive == false && enemyD.alive == false){
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
    if(level == 4 && survivorRoomOne.notSafe == false){
        dialogue = true
        message.classList.remove('hidden')
        message.innerText = 'Oh my gosh, thank you so much for coming to save me. Here is one gold as a token of my appreciation. Good luck getting that chest full of gold open!'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'Enter' to Continue`
        
        window.addEventListener('keydown', (e)=>{if(e.key == 'Enter' && level == 4){
            dialogue = false
            message.classList.add('hidden')
            continueButton.classList.add('hidden')
            scoreCount = 9
            goldCount = 1
            level = 5
            reaper.position.x = 100
            reaper.position.y = 240
            intermission = false
            reaper.alive = true
            reaperBlink()
            enemyA.alive = false
            enemyB.alive = false
            enemyC.alive = false
            enemyD.alive = false
            reaper.health = 20
        }})
      
    }
}
const levelFive = () =>{
    if(reaper.alive){
        reaperAttack(adventurer, reaper)
        reaper.update()
    }
    chest.update()
    door.update()
    if(spikeB.alive){
        spikeB.update()
    }

    if(reaper.health <= 8){
        level = 6
        intermission = true
        spikeC.alive = true
        enemyA.alive = true
        enemyB.alive = true
        enemyC.alive = true
        enemyD.alive = true
        enemyA.health = 4
        enemyB.health = 4
        enemyC.health = 4
        enemyD.health = 4
        enemyA.position.x = 40
        enemyA.position.y = 70
        enemyB.position.x = 630
        enemyB.position.y = 70
        enemyC.position.x = 40
        enemyC.position.y = 400
        enemyD.position.x = 630
        enemyD.position.y = 400
    }

}
const levelSix = () =>{

    if(reaper.alive){
        reaperAttack(adventurer, reaper)
        reaper.update()
    }
    if(enemyA.alive){
        houndAttack(adventurer, enemyA)
        enemyA.update()
    }
    if(enemyB.alive){
        houndAttack(adventurer, enemyB)
        enemyB.update()
    }
    if(enemyC.alive){
        houndAttack(adventurer, enemyC)
        enemyC.update()
    }
    if(enemyD.alive){
        houndAttack(adventurer,enemyD)
        enemyD.update()
    }
    chest.update()
    door.update()
    if(spikeB.alive){
        spikeB.update()
    }
    if(spikeC.alive){
        spikeC.update()
    }
   

    if(enemyA.alive == false && enemyB.alive == false && enemyC.alive == false && enemyD.alive == false){
        scoreCount = 13
        level = 7
        intermission = false
        enemyA.alive = true
        enemyB.alive = true
        enemyC.alive = true
        enemyD.alive = true
        enemyA.health = 5
        enemyB.health = 5
        enemyC.health = 5
        enemyD.health = 5
        enemyA.position.x = 40
        enemyA.position.y = 70
        enemyB.position.x = 630
        enemyB.position.y = 70
        enemyC.position.x = 630
        enemyC.position.y = 400
        enemyD.position.x = 40
        enemyD.position.y = 400

    }
}
const levelSeven = () =>{

    if(reaper.alive){
        reaperAttack(adventurer, reaper)
        reaper.update()
    }
    if(enemyA.alive){
        goblinAttack(adventurer, enemyA)
        enemyA.update()
    }
    if(enemyB.alive){
        goblinAttack(adventurer, enemyB)
        enemyB.update()
    }
    if(enemyC.alive){
        goblinAttack(adventurer, enemyC)
        enemyC.update()
    }
    if(enemyD.alive){
        goblinAttack(adventurer,enemyD)
        enemyD.update()
    }
    chest.update()
    door.update()
    if(spikeB.alive){
        spikeB.update()
    }
    if(spikeC.alive){
        spikeC.update()
    }
    if(reaper.alive == false && enemyA.alive == false && enemyB.alive == false && enemyC.alive == false && enemyD.alive == false){
        scoreCount = 33
        level = 8
        bossDead = true
        key.alive = true
        chest.alive = true
    }
}
const levelEight = ()=>{
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
            scoreCount = 33
            level = 9
            enemyA.alive = false
            enemyB.alive = false
            enemyC.alive = false
            enemyD.alive = false
            reaper.alive = false


        }})
    }
}
const levelNine = ()=>{
    // message.classList.add('hidden')
    // continueButton.classList.add('hidden')
    chest.image = chest.sprites.open.image
    chest.offset.x = 55
    chest.offset.y = 60
    chest.update()
    door.update()
    scoreCount = 33
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
            survivorRoomOne.alive = true
            survivorRoomOne.notSafe = true
            player.position.x = 40
            player.position.y = 230
            door.position.x = 30
            door.position.y = 200
            door.image = door.sprites.openDoor.image
            door.offset = door.sprites.openDoor.offset
            door.scale = door.sprites.openDoor.scale
            doorOpened = true
            level = 4
        } else if(level == 9) {
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
    
        if(Right && Left && Bottom && Top && !enemy.dying && enemy.alive){
            enemy.health -= 1
            if(enemy.health >= 1 && spike.speed.x > 0){
                enemy.position.x += 30
                spike.alive = false
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
            } else if(enemy.health >=  1 && spike.speed.x < 0){
                enemy.position.x -= 30
                spike.alive = false
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
            } else if(enemy.health >=  1 && spike.speed.y < 0){
                enemy.position.y -= 30
                spike.alive = false
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
            } else if(enemy.health >=  1 && spike.speed.y > 0){
                enemy.position.y += 30
                spike.alive = false
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
            } else if (enemy.health <= 0){
                enemy.dying = true
                spike.alive = false
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.alive = false
                    enemy.framesCurrent = 0
                    enemy.dying = false
                }, 500)
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


    if(player.isAttacking && !enemy.dying && enemy.alive){
        if(uRight && uLeft && uTop && uBottom && lastKey == 'w'){
            enemy.health -= 2
            if(enemy.health >= 1){
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                enemy.position.y -= 50
            } else if (enemy.health <= 0){
                enemy.dying = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.alive = false
                    enemy.framesCurrent = 0
                    enemy.dying = false
                }, 500)
            }   
        } else if (lRight && lLeft && lTop && lBottom && lastKey == 'a') {
            enemy.health -= 2
            if(enemy.health >= 1){
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                enemy.position.x -= 50
            } else if (enemy.health <= 0){
                enemy.dying = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.alive = false
                    enemy.framesCurrent = 0
                    enemy.dying = false
                }, 500)
            }            
        } else if (dRight && dLeft && dTop && dBottom && lastKey == 's') {
            enemy.health -= 2
            if(enemy.health >= 1){
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                enemy.position.y += 50
            } else if (enemy.health <= 0){
                enemy.dying = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.alive = false
                    enemy.framesCurrent = 0
                    enemy.dying = false
                }, 500)
            }          
        } else if (rRight && rLeft && rTop && rBottom && lastKey == 'd') {
            enemy.health -= 2
            if(enemy.health >= 1){
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                enemy.position.x += 50
            } else if (enemy.health <= 0){
                enemy.dying = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.alive = false
                    enemy.framesCurrent = 0
                    enemy.dying = false
                }, 500)
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
    } else if (player.health <= 0){
        health.style.width = '0%'
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
}

let dyingFramesElaped = 0
let dyingCurrentFrame = 0
let dyingFramesMax = 9
let dyingFramesHold = 15

let hurtFramesElaped = 0
let hurtCurrentFrame = 0
let hurtFramesMax = 3
let hurtFramesHold = 5
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

    if(swimming && sright && sleft && stop && sbottom && enemy.alive && !enemy.dying){
            enemy.health -= 1
            if(enemy.health >= 1 && lastKey === 'w'){
                enemy.position.y -= 60
                player.position.y += 60
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health >= 1 && lastKey === 'a') {
                enemy.position.x -= 60
                player.position.x += 60
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health >= 1 && lastKey === 's') {
                enemy.position.y += 60
                player.position.y -= 60
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health >= 1 && lastKey === 'd') {
                enemy.position.x += 60
                player.position.x -= 60
                enemy.hurt = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.hurt = false
                    enemy.framesCurrent = 0
                }, 500)
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            } else if (enemy.health <= 0){
                enemy.dying = true
                enemy.framesCurrent = 0
                setTimeout(()=>{
                    enemy.alive = false
                    enemy.framesCurrent = 0
                    enemy.dying = false
                }, 500)
                swimming = false
                swimCurrentFrame = 0
                swimFramesElaped = 0
                onCooldown = true
                cdBar = 0
                cdY = 23
                diveTimerCurrentFrame = 0
            }
        } else if (!swimming && right && left && top && bottom && enemy.alive && !enemy.dying){
            player.health -= enemy.damage
            hurt = true

            if(player.health >= 1 && keys.w.pressed){
                player.position.y += 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            }else if (player.health >= 1 && keys.s.pressed) {
                player.position.y -= 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            }else if (player.health >= 1 && enemy.direction == 'left') {
                player.position.x -= 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            } else if (player.health >= 1 && enemy.direction == 'right') {
                player.position.x += 60
                adventurer.speed.x = 0
                adventurer.speed.y = 0
            } else if (player.health <= 0){
                dying = true
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
    if(!gameStart && level == 1){
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'Enter' && level == 1){
                message.classList.add('hidden')
                continueButton.classList.add('hidden')
                gameStart = true
                adventurer.alive = true
                enemyA.alive = true
                enemyB.alive = true
                enemyC.alive = true
                enemyD.alive = true
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
            if(e.key == 'Enter' && gameLost == true){

                level = 1
                enemyA.alive = true
                enemyB.alive = true
                enemyC.alive = true
                enemyD.alive = true
                reaper.position.x = 100
                reaper.position.y = 240
                reaper.alive = false
                reaper.health = 20
                enemyA.health = 5
                enemyB.health = 5
                enemyC.health = 5
                enemyD.health = 5
                enemyA.position.x = 650
                enemyA.position.y = 400
                enemyB.position.x = 410
                enemyB.position.y = 300
                enemyC.position.x = 400
                enemyC.position.y = 400
                enemyD.position.x = 500
                enemyD.position.y = 100
                dying = false
                moved = false
                adventurer.alive = true
                adventurer.position.x = 50
                adventurer.position.y = 70
                adventurer.health = 20
                spikeCount = 5
                scoreCount = 0
                goldCount = 0
                message.classList.add('hidden')
                continueButton.classList.add('hidden')
                door.image = door.sprites.door.image
                door.scale = 1
                door.position.x = 666
                door.position.y = 200
                door.offset.x = door.sprites.door.offset.x
                door.offset.y = door.sprites.door.offset.y
                gameLost = false
            }})
    }
    if(gameStart){
        if(level == 1){
            objective.innerText = 'Slay all the goblins!'
            levelOne()
        } else if (level == 2){
            objective.innerText = 'Careful, hounds!'
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
            objective.innerText = 'More hounds?!?!'
            levelSix()
        } else if (level == 7){
            objective.innerText = 'Don\'t die...'
            levelSeven()
        } else if (level == 8){
            objective.innerText = 'Collect your prize.'
            levelEight()
        } else if(level == 9){
            levelNine()
            objective.innerText = 'Leave dissappointed'
        }
    }  
    if(gameWon){
        scoreCount = 34
        message.innerText = 'Well, you saved Bebo... but you only came out with 1 measely gold. But hey, that\'s 1 more gold than before. Take an extra point on the house!'
        message.classList.remove('hidden')
        message.style.backgroundColor = 'skyblue'
        continueButton.classList.remove('hidden')
        continueButton.innerText = `Press 'Enter' to Retry?`
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'Enter' && gameWon == true){
                level = 1
                enemyA.alive = true
                enemyB.alive = true
                enemyC.alive = true
                enemyD.alive = true
                reaper.alive = false
                reaper.health = 20
                enemyA.health = 5
                enemyB.health = 5
                enemyC.health = 5
                enemyD.health = 5
                enemyA.position.x = 650
                enemyA.position.y = 400
                enemyB.position.x = 410
                enemyB.position.y = 300
                enemyC.position.x = 400
                enemyC.position.y = 400
                enemyD.position.x = 500
                enemyD.position.y = 100
                adventurer.alive = true
                dying = false
                moved = false
                adventurer.position.x = 50
                adventurer.position.y = 70
                adventurer.health = 20
                spikeCount = 5
                scoreCount = 0
                goldCount = 0  
                message.classList.add('hidden')
                continueButton.classList.add('hidden')
                door.image = door.sprites.door.image
                door.scale = 1
                door.position.x = 666
                door.position.y = 200
                door.offset.x = door.sprites.door.offset.x
                door.offset.y = door.sprites.door.offset.y
                gameWon = false
            }})
    }

}

const checkMobCollision = ()=>{
        mobCollision(enemyA, enemyB)
        mobCollision(enemyA, enemyC)
        mobCollision(enemyA, enemyD)
        mobCollision(enemyB, enemyC)
        mobCollision(enemyB, enemyD)    
        mobCollision(enemyC, enemyD)

}

const checkEnemyHit = ()=>{
        enemyHit(adventurer, enemyA)
        enemyHit(adventurer, enemyB)
        enemyHit(adventurer, enemyC)
        enemyHit(adventurer, enemyD)
        if(!intermission){
        enemyHit(adventurer, reaper) 
        }

}
const checkPlayerHit = () => {
        playerHit(adventurer,enemyA)
        playerHit(adventurer,enemyB)
        playerHit(adventurer,enemyC)
        playerHit(adventurer,enemyD)
        playerHit(adventurer, reaper)
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
        if(!intermission){
        spikeHit(spell, reaper)
        }
      }
    })
    
    
    
    checkEnemyHit()
    checkPlayerHit()
    checkMobCollision()

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
                console.log('R:', reaper.alive)
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

