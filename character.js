class Card {
    constructor(id, character) {
        this.id = id;
        this.character = character;
    }
}

class Character {
    constructor(name, image, up, down, left, right) {
        this.name = name;
        this.image = image;
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    }
}

/*
Available Cards metrics: performance, ease of use, community/ecosystem, portability/tooling 
*/
const characterMap = new Map();
const apple = new Character("Apple", "img/apple.png", 4, 3, 3, 3);
characterMap.set(apple.name, apple);
const coffee = new Character("Coffee", "img/coffee.png", 3, 3, 2, 5);
characterMap.set(coffee.name, coffee);
const crab = new Character("Crab", "img/crab.png", 5, 1, 4, 2);
characterMap.set(crab.name, crab);
const fish = new Character("Fish", "img/fish.png", 5, 2, 2, 3);
characterMap.set(fish.name, fish);
const gin = new Character("Gin", "img/gin.png", 3, 3, 4, 4);
characterMap.set(gin.name, gin);
const gopher = new Character("Gopher", "img/gopher.png", 4, 4, 3, 3);
characterMap.set(gopher.name, gopher);
const penguin = new Character("Penguin", "img/penguin.png", 3, 2, 5, 3);
characterMap.set(penguin.name, penguin);
const sheep = new Character("Sheep", "img/sheep.png", 2, 4, 4, 4);
characterMap.set(sheep.name, sheep);
const snake = new Character("Snake", "img/snake.png", 1, 5, 3, 4);
characterMap.set(snake.name, snake);
const star = new Character("Star", "img/star.png", 4, 3, 1, 4);
characterMap.set(star.name, star);

const cardMap = new Map();
const apple1 = new Card(id++, apple);
cardMap.set(apple1.id, apple1);
const coffee1 = new Card(id++, coffee);
cardMap.set(coffee1.id, coffee1);
const crab1 = new Card(id++, crab);
cardMap.set(crab1.id, crab1);
const fish1 = new Card(id++, fish);
cardMap.set(fish1.id, fish1);
const gin1 = new Card(id++, gin);
cardMap.set(gin1.id, gin1);
const gopher1 = new Card(id++, gopher);
cardMap.set(gopher1.id, gopher1);
const penguin1 = new Card(id++, penguin);
cardMap.set(penguin1.id, penguin1);
const sheep1 = new Card(id++, sheep);
cardMap.set(sheep1.id, sheep1);
const snake1 = new Card(id++, snake);
cardMap.set(snake1.id, snake1);
const star1 = new Card(id++, star);
cardMap.set(star1.id, star1);