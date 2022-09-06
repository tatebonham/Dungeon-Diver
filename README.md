# Dungeon-Diver

You have been asked to save a survivor stuck deep in the dungeon, although hesitant at first, the promise of treasure and riches ripe for the taking convinces you to delve into the dungeons depths. Be careful along the way, there are many strange monsters, be sure to use your spells and hack and slash your way through to get to that treasure.

---

## Game Description

An HTML Canvas game with animations that run off of your browser's frame rate. Game logic runs off Javascript and off the screen, the presentation is set up with HTML, CSS and DOM.

---

## Deployment Link

- https://tatebonham.github.io/Dungeon-Diver/

---

## General Game Info

- Controls: W=Up, A=Left, S=Down, D=Right, J=Normal Attack, K=Dive Spell("Dive into the ground avoiding damage, healing while the spell is active, and doing damage to the first enemy you collide with"), L=Spike Spell("Shoot your spikes in whichever direction you are facing, breaking when enemies are hit and doing damage")
- The bar next to the player character is the Dive Spell cooldown timer.
- Bottom left there is a Spike Spell counter, once you are out of spikes to shoot forward, you can pick up more around the level. So be on the lookout!
- Normal attack swings will do 2 damage while Dive and Spikes do 1 damage.

### Enemy stats:

1. Goblin{Damage:4, Health:5,Ablity: No ablity},
2. Hound{Damage:2, Health:4, Ablity: Charges and dashes left to right, if rammed into the wall it can do some serious damage if not just straight killing you,
   if hounds are charging they can stack or "merge" on top of eachother meaning you are about to take double the damage, good luck},
3. Reaper{Damage:3, Health:20, Ablity: Blinks on top of the player every 7 seconds, after an initial 13 second delay, slashing his scythe and doing 6 damage}

### Niche Game Info

- You can cancel your normal attack and hurt animations with dive.
- You can throw spikes during attack animations and during swim.
- Dive will push you back 60px upon collision of a unit with more than 1hp but if you kill the unit it will not bounce you back leaving you
  open to be hit by the enemy behind them if you arent careful.
- You can cancel dive early stopping the healing and putting it on cooldown.
- You can shoot spikes through dying enemies and it will pass over them to the next enemy.

### Lore

The Golum, woke up in the forest, half buried and covered in dirt and vines, with no memory of who they were. Wondering for a purpose he eventually found a house in the middle of no where. Where they would meet, Horris, a gnome tinkerer well versed in wizardry, who would take the Golumd in and clean them up. The Golum not having any memory of his past, was named Geraldo and taught spells by Horris. Months later after being trained by Horris, Geraldo came home after going hunting some food for their teacher, Horris was no where to be found with no site of anything happening. Geraldo left his now home in search of what happened to Horris.

---

## Tech Stack

- HTML
- CSS
- Javascript
- Canvas
- DOM

---

## Wireframe

![Wireframe](./images/dungeon.JPG)

---

## MVP Goals

- Create starting screen inside the Game Boy screen area
- Make a dungeon room the adventurer starts in and render him in there
- Make sure he can't walk through walls
- Make enemies that move in a designated pattern
- Make the adventurer have an attack animation(ex. a sword stab or arrow)
- Give the adventurer 3 health points total
- Make the enemies shoot arrows that take 1 health off everytime the adventurer is hit
- Make a survivor against the back wall you must touch and tell the way out is clear
- Make the survivor de-render after saving him (touching his hitbox)
- Make doors in the dungon wall that take you to the next room
- Create a treasure pile to win but there is a twist
- Make a final boss render after touching the treasure
- Once dead the game will display a message congragulating the adventurers and ending the game

---

## Stretch Goals

1. Add different monster types
2. Give the final boss different attack patterns
3. Add a High-Score counter
4. Add traps, like spikes shooting out of the walls
5. Add different weapons or attacks for the adventurer
6. Make more rooms or a second level entirely
7. Make enemies move toward the adventurer
8. Have the adventurer and monsters be pushed back when hit
9. Set respawn point every 2 rooms
10. Create more than one room

---

## Potential Roadblocks

- making sure the models I put on the objects match the hit-boxes correctly
- setting up the sword stabbing forward animation
- making the second room load after hitting the door
- how to set the spawns along the way

---

## Post-Project Reflection

- Work on my time estimation
- I tried too hard to force multipurpose fucntions and class, I eventually realized after after watching a tiktok that it's okay to just use single purpose functions.
- Take more breaks, I have so much trouble not just going on for hours without taking a break, and I definitely felt it come back to bite me.
- Wish I realized sooner, any functions in the animate would run over and over and take priority over anything else in the Javascript because its running frame by frame.
- Couldn't end up getting the enemy projectiles to work, I will come back to add those in and refactor my code to make it cleaner later on in class.
- Couldn't get the game screen to resize with the page properly, I'm not sure if thats because of canvas or I just didn't get the CSS correct

---

## Art Credit

- Doors: https://opengameart.org/content/lpc-animated-doors
- Chest: Twitter@pixelpooper
- Enemy Creatures: https://craftpix.net/product/hell-monster-pixel-art-game-sprite-pack/
- Spike: https://flyclipart.com/spikes-pixel-art-maker-spikes-png-345594#
- Boss Mob: https://opengameart.org/content/bosses-and-monsters-spritesheets-ars-notoria
- Player Character/Geraldo the Golum: https://www.gamedevmarket.net/asset/2d-animated-top-down-golem/
- Key: Legend of Zelda a Link to the Past
- Bebo the True Hero of the Story: https://craftpix.net/freebies/free-pixel-art-tiny-hero-sprites/
- Reaper: https://www.gamedevmarket.net/asset/pixel-art-reaper-character-with-animations/
- Gameboy Background: Valeria Zuniga

---

## JS Rescources

- Top-Down Animations for Character: https://www.youtube.com/watch?v=yP5DKzriqXA&t=5678s
- Canvas Animation: https://www.youtube.com/watch?v=vyqbNFMDRGQ&t=3238s
