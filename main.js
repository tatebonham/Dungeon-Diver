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
                width: 50,
                height: 5
            }
          
        }
        this.isAttacking = false
        this.notSafe = true
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
    
    visualHitBox(){
        if(this.isAttacking === true){
            ctx.fillStyle = 'black'
            if(lastKey === 'w'){  
                ctx.fillRect(this.attackBox.up.position.x+10, this.attackBox.up.position.y-25, this.attackBox.up.width, this.attackBox.up.height -25)
            } else if (lastKey === 'a') {
                ctx.fillRect(this.attackBox.left.position.x-25, this.attackBox.left.position.y+10, this.attackBox.left.width -25, this.attackBox.left.height)
            } else if (lastKey === 's') {
                ctx.fillRect(this.attackBox.down.position.x+10, this.attackBox.down.position.y+25, this.attackBox.down.width, this.attackBox.down.height -25)
            } else if (lastKey === 'd') {
                ctx.fillRect(this.attackBox.right.position.x + 25, this.attackBox.right.position.y+10, this.attackBox.right.width - 25, this.attackBox.right.height)
            }

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
const survivorRoomOne = new Entity({position: {x: 650, y: 350}}, 25, 25, 'blue', {speed: {x: 0, y:0}})

const goblinA = new Entity({position: {x: 300,y: 300}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)
const goblinB = new Entity({position: {x: 200, y: 230}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)
const goblinC = new Entity({position: {x: 400, y: 400}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)
const goblinD = new Entity({position: {x: 500,y: 100}}, 25, 25, 'red', {speed: {x: 0, y: 0}}, 2)
// const goldPieceOne = new Entity({position: {x: goblinA.position.x,y: goblinA.position.y}}, 10, 10, 'gold', {speed: {x: 0, y: 0}}, 2)

const enemyAttack = (player, enemy)=>{
    if(enemy.position.x >= player.position.x){
        enemy.position.x -= .2
    }
    if(enemy.position.x <= player.position.x){
        enemy.position.x += .2
    }
    if(enemy.position.y >= player.position.y){
        enemy.position.y -= .2
    }
    if(enemy.position.y <= player.position.y){
        enemy.position.y += .2
    }
    
}

const levelOne = ()=>{
    if(goblinA.alive){
        // enemyAttack(adventurer, goblinA)
        goblinA.update()
    } 

    if(goblinB.alive){
        // enemyAttack(adventurer, goblinB)
        goblinB.update()
    }
    if(goblinC.alive){
        // enemyAttack(adventurer, goblinC)
        goblinC.update()
    }
    if(goblinD.alive){
        // enemyAttack(adventurer, goblinD)
        goblinD.update()
    }
    if(survivorRoomOne.notSafe){
        survivorRoomOne.update()
    }
}

let scoreCount = 0
let goldCount = 0
let arrowCount = 5
// let healthCount = 0

const arrowArr = []

const arrowDirection = () =>{
   if(lastKey ==='d'){
    arrowArr.push(new Entity({position: {x: adventurer.position.x + adventurer.width, y: adventurer.position.y + 12}}, 20, 3, 'black', {speed: {x: 1.5, y: 0}}, 0))
    } else if(lastKey === 'w'){
        arrowArr.push(new Entity({position: {x: adventurer.position.x + 12, y: adventurer.position.y - 19}}, 3, 20, 'black', {speed: {x: 0, y: -1.5}}, 0))
    } else if(lastKey === 'a'){
        arrowArr.push(new Entity({position: {x: adventurer.position.x - 19, y: adventurer.position.y + 12}}, 20, 3, 'black', {speed: {x: -1.5, y: 0}}, 0))
    } else if(lastKey === 's'){
        arrowArr.push(new Entity({position: {x: adventurer.position.x + 12, y: adventurer.position.y + adventurer.height}}, 3, 20, 'black', {speed: {x: 0, y: 1.5}}, 0))
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

const arrowHit = (arrow, enemy) => {
        // AABB -- axis aligned bounding box collision detection
        const Left = arrow.x + arrow.width >= enemy.x
    
        const Right = arrow.x <= enemy.x + enemy.width 
    
        const Top = arrow.y + arrow.height >= enemy.y
    
        const Bottom = arrow.y <= enemy.y + enemy.height
    
        if(Right && Left && Bottom && Top){
            enemy.alive = false
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
            if(enemy.health == 1){
                enemy.position.y -= 60
            } else if (enemy.health == 0){
                scoreCount += 1
                enemy.alive = false
            }   
        } else if (lRight && lLeft && lTop && lBottom && lastKey == 'a') {
            enemy.health -= 1
            if(enemy.health == 1){
                enemy.position.x -= 60
            } else if (enemy.health == 0){
                scoreCount += 1
                enemy.alive = false
            }            
        } else if (dRight && dLeft && dTop && dBottom && lastKey == 's') {
            enemy.health -= 1
            if(enemy.health == 1){
                enemy.position.y += 60
            } else if (enemy.health == 0){
                scoreCount += 1
                enemy.alive = false
            }          
        } else if (rRight && rLeft && rTop && rBottom && lastKey == 'd') {
            enemy.health -= 1
            if(enemy.health == 1){
                enemy.position.x += 60
            } else if (enemy.health == 0){
                scoreCount += 1
                enemy.alive = false
            }         
       }
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

const gameBorders = () => {
    //health bar border
    ctx.fillStyle = 'darkgreen'
    ctx.fillRect(380, 1, 265, 30)

    //behind health bar
    ctx.fillStyle = 'darkgray'
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
function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'gray'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    gameBorders()

    if(adventurer.alive){
       adventurer.update()
       adventurer.visualHitBox()
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
    arrowArr.forEach(projectile =>{
        projectile.position.x += projectile.speed.x
        projectile.update()
        arrowHit(projectile,goblinA)
        arrowHit(projectile,goblinB)
        arrowHit(projectile,goblinC)
        arrowHit(projectile,goblinD)
    })

    // console.log(lastKey)
    
    enemyHit(adventurer, goblinA)
    enemyHit(adventurer, goblinB)
    enemyHit(adventurer, goblinC)
    enemyHit(adventurer, goblinD)
    playerHit(adventurer,goblinA)
    playerHit(adventurer,goblinB)
    playerHit(adventurer,goblinC)
    playerHit(adventurer,goblinD)
    keepTrack()
    saveSurvivor(survivorRoomOne, adventurer)
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
            if(adventurer.alive){
                adventurer.attack()
            }
            console.log('k')
            break
        case 'l' : 
        if(adventurer.alive && arrowCount >= 1){
            arrowDirection()
            
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

