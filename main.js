const objective = document.getElementById('objective')
const score = document.getElementById('score')
const health = document.getElementById('health')
const arrows = document.getElementById('arrows')
const gold = document.getElementById('gold')
const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

class Entity{
    constructor({position}, width, height, color, {speed}, health){
        this.position = position
        this.width = width
        this.height = height
        this.color = color
        this.speed = speed
        this.alive = true
        this.health = health
        this.attackBox = {
            position: this.position,
            width: 50,
            height: 5
        }
        this.isAttacking = false
    }

    spawn(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.spawn()
        if(this.position.x < 30){
            this.position.x = 30
        } else if(this.position.x + this.width > 670){
            this.position.x = 670 - this.width
        } else {
            this.position.x += this.speed.x
        }

        if(this.position.y < 60){
            this.position.y = 60
        } else if (this.position.y  + this.height > 460){
            this.position.y = 460 - this.height    
        } else {
            this.position.y += this.speed.y
        }
    }
    
    hitBox(){
        if(this.isAttacking === true){
            ctx.fillStyle = 'blue',
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y+10, this.attackBox.width, this.attackBox.height)
        }
    }

    attack(){
        this.isAttacking = true
        console.log(this.isAttacking)
        setTimeout(()=>{
            this.isAttacking = false
        }, 200)
    }

}

const adventurer = new Entity({position: {x: 40, y: 70}}, 25, 25, 'green',{speed: {x: 0, y: 0}}, 3)
// adventurer.spawn()

const goblinA = new Entity({position: {x: 300,y: 300}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)
const goblinB = new Entity({position: {x: 200, y: 230}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)
const goblinC = new Entity({position: {x: 400, y: 400}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)
const goblinD = new Entity({position: {x: 500,y: 100}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)


const levelOne = ()=>{
    if(goblinA.alive){
        goblinA.update()
    }
    if(goblinB.alive){
        goblinB.update()
    }
    if(goblinC.alive){
        goblinC.update()
    }
    if(goblinD.alive){
        goblinD.update()
    }
}

const enemyHit = (player, enemy) => {
    const left = player.attackBox.position.x + player.attackBox.width >=  enemy.position.x
    const right = player.attackBox.position.x <= enemy.position.x + enemy.width
    const top = player.attackBox.position.y + player.attackBox.height >= enemy.position.y
    const bottom = player.attackBox.position.y <= enemy.position.y + enemy.height

    if(right && left && top && bottom && player.isAttacking){
        enemy.health -= 1
        if(enemy.health == 1 && lastKey == 'w'){
            enemy.position.y -= 30
        } else if (enemy.health == 1 && lastKey == 'a') {
            enemy.position.x -= 30
        } else if (enemy.health == 1 && lastKey == 's') {
            enemy.position.y += 30
        } else if (enemy.health == 1 && lastKey == 'd') {
            enemy.position.x += 30
        } else if (enemy.health == 0){
            enemy.alive = false
        }
    } else{
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
        if(player.health === 2 && lastKey === 'w'){
            player.position.y += 60
        } else if (player.health === 2 && lastKey === 'a') {
            player.position.x += 60
        } else if (player.health === 2 && lastKey === 's') {
            player.position.y -= 60
        } else if (player.health === 2 && lastKey === 'd') {
            player.position.x -= 60
        } else if (player.health === 1 && lastKey === 'w') {
            player.position.y += 60
        } else if (player.health === 1 && lastKey === 'a') {
            player.position.x += 60
        } else if (player.health === 1 && lastKey === 's') {
            player.position.y -= 60
        } else if (player.health === 1 && lastKey === 'd') {
            player.position.x -= 60
        } else if (player.health === 0){
            player.alive = false
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

function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'gray'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    // console.log('go')
    adventurer.hitBox()
    if(adventurer.alive){
       adventurer.update()
    }
    levelOne()
    adventurer.speed.x = 0
    adventurer.speed.y = 0
    if(keys.d.pressed && keys.s.pressed){
        adventurer.speed.x = 3
        adventurer.speed.y = 3
    }  else if(keys.a.pressed && keys.s.pressed){
        adventurer.speed.x = -3
        adventurer.speed.y = 3
    }  else if(keys.d.pressed && keys.w.pressed){
        adventurer.speed.x = 3
        adventurer.speed.y = -3
    }  else if(keys.a.pressed && keys.w.pressed){
        adventurer.speed.x = -3
        adventurer.speed.y = -3
    } else if(keys.w.pressed && lastKey == 'w'){
        adventurer.speed.y = -3
    } else if(keys.a.pressed && lastKey == 'a'){
        adventurer.speed.x = -3
    } else if(keys.s.pressed && lastKey == 's'){
        adventurer.speed.y = 3
    } else if(keys.d.pressed && lastKey == 'd'){
        adventurer.speed.x = 3
    }    

    enemyHit(adventurer, goblinA)
    enemyHit(adventurer, goblinB)
    enemyHit(adventurer, goblinC)
    enemyHit(adventurer, goblinD)
    playerHit(adventurer,goblinA)
    playerHit(adventurer,goblinB)
    playerHit(adventurer,goblinC)
    playerHit(adventurer,goblinD)
    
}
animate()

const lastKeyPressed = ()=>{
if(keys.w.pressed){
        lastKey = 'w'
}  else if(keys.a.pressed){
    lastKey = 'a'
} else if (keys.s.pressed){
    lastKey = 's'
} else if(keys.d.pressed){
    lastKey = 'd'
}

}
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'w':
            keys.w.pressed = true
            lastKeyPressed()
            break
        case 'a':
            keys.a.pressed = true  
            lastKeyPressed()  
            break
        case 's':
            keys.s.pressed = true
            lastKeyPressed()
            break
        case 'd':
            keys.d.pressed = true 
            lastKeyPressed()
            break
        case 'k':
            adventurer.attack()
            console.log('k')
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

