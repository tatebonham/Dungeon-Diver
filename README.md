# Dungeon-Diver

Delve deep into the dungeons! ...why? To save the survivors of the last party that went down there...what? Is that not enough for you? Okay fine there is also more treasure than your arms can carry. Oh...you'll go now? Okay adventurer get down there, slay those goblins, save the survivors and get some riches!

---

## Tech Stack

- HTML
- CSS
- Javascript
- Canvas

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

## Game Info

- You can cancel attack and hurt animations with dive
- You can throw spikes during attack animations and during swim
- Normal attack swings will do 2 damage while dive and spikes do 1 damage
- Dive will push you back 60px upon collision of a unit with more than 1hp but if you kill the unit it will not bounce you back leaving you
- open to be hit by the enemy behind them if you arent careful.
- You can cancel dive early stopping the healing and putting it on cooldown
- You can shoot spikes through dying enemies and it will pass over them to the next enemy
- Enemy stats:
- Goblin{dmg:4,hp:5, no ablity},
- Hound{dmg:2, hp:4, charges and dashes left and right if rammed into the wall it can do some serious damage if not just straight killing you,
- if hounds are charging they can stack or "merge" on top of eachother meaning you are about to take double the damage, good luck},
- Reaper{dmg:3,hp:14,blinks on top of the player slashing his scythe and doing 6 damage

## Art Credit

- Doors: https://opengameart.org/content/lpc-animated-doors
- Chest: Twitter@pixelpooper
- Enemy Creatures: https://craftpix.net/product/hell-monster-pixel-art-game-sprite-pack/
- Spike: https://flyclipart.com/spikes-pixel-art-maker-spikes-png-345594#
- Boss Mob: https://opengameart.org/content/bosses-and-monsters-spritesheets-ars-notoria
- Player Character: https://www.gamedevmarket.net/asset/2d-animated-top-down-golem/
- Key: Legend of Zelda a Link to the Past
- Bebo the True Hero of the Story: https://craftpix.net/freebies/free-pixel-art-tiny-hero-sprites/
- Reaper: https://www.gamedevmarket.net/asset/pixel-art-reaper-character-with-animations/

---

## JS Rescources

- Top-Down Animations for Character: https://www.youtube.com/watch?v=yP5DKzriqXA&t=5678s
- Canvas Animation: https://www.youtube.com/watch?v=vyqbNFMDRGQ&t=3238s
