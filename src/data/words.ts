import type { Word } from '../types/game';

export const CATEGORIES = [
  'Animals',
  'Objects',
  'Emotions',
  'Sentences',
  'Places',
  'Food',
  'Actions'
];

const w = (text: string, category: string, difficulty: 'Easy' | 'Medium' | 'Hard'): Word => ({ text, category, difficulty });

export const WORD_BANK: Word[] = [
  // ── ANIMALS ──────────────────────────────────────────────────────
  // Easy (easy to draw)
  w('Cat', 'Animals', 'Easy'), w('Dog', 'Animals', 'Easy'),
  w('Fish', 'Animals', 'Easy'), w('Bird', 'Animals', 'Easy'),
  w('Cow', 'Animals', 'Easy'), w('Pig', 'Animals', 'Easy'),
  w('Duck', 'Animals', 'Easy'), w('Frog', 'Animals', 'Easy'),
  w('Bee', 'Animals', 'Easy'), w('Ant', 'Animals', 'Easy'),
  w('Rabbit', 'Animals', 'Easy'), w('Horse', 'Animals', 'Easy'),
  w('Sheep', 'Animals', 'Easy'), w('Chicken', 'Animals', 'Easy'),
  w('Mouse', 'Animals', 'Easy'), w('Butterfly', 'Animals', 'Easy'),
  w('Snail', 'Animals', 'Easy'), w('Turtle', 'Animals', 'Easy'),
  w('Bear', 'Animals', 'Easy'), w('Lion', 'Animals', 'Easy'),
  // Medium (need a bit more attention to details)
  w('Elephant', 'Animals', 'Medium'), w('Kangaroo', 'Animals', 'Medium'),
  w('Penguin', 'Animals', 'Medium'), w('Giraffe', 'Animals', 'Medium'),
  w('Dolphin', 'Animals', 'Medium'), w('Octopus', 'Animals', 'Medium'),
  w('Parrot', 'Animals', 'Medium'), w('Cheetah', 'Animals', 'Medium'),
  w('Monkey', 'Animals', 'Medium'), w('Flamingo', 'Animals', 'Medium'),
  w('Crocodile', 'Animals', 'Medium'), w('Gorilla', 'Animals', 'Medium'),
  w('Peacock', 'Animals', 'Medium'), w('Jellyfish', 'Animals', 'Medium'),
  w('Scorpion', 'Animals', 'Medium'), w('Owl', 'Animals', 'Medium'),
  w('Hedgehog', 'Animals', 'Medium'), w('Seahorse', 'Animals', 'Medium'),
  w('Tiger', 'Animals', 'Medium'), w('Zebra', 'Animals', 'Medium'),
  // Hard (needs more details)
  w('Dragon', 'Animals', 'Hard'), w('Chameleon', 'Animals', 'Hard'),
  w('Walrus', 'Animals', 'Hard'), w('Rhino', 'Animals', 'Hard'),
  w('Panda', 'Animals', 'Hard'), w('Lobster', 'Animals', 'Hard'),
  w('Spider', 'Animals', 'Hard'), w('Bat', 'Animals', 'Hard'),
  w('Shark', 'Animals', 'Hard'), w('Whale', 'Animals', 'Hard'),
  w('Ostrich', 'Animals', 'Hard'), w('Sloth', 'Animals', 'Hard'),
  w('Camel', 'Animals', 'Hard'), w('Polar Bear', 'Animals', 'Hard'),
  w('Moose', 'Animals', 'Hard'), w('Raccoon', 'Animals', 'Hard'),
  w('Beaver', 'Animals', 'Hard'), w('Skunk', 'Animals', 'Hard'),
  w('Squid', 'Animals', 'Hard'), w('Starfish', 'Animals', 'Hard'),

  // ── OBJECTS ────────────────────────────────────────────────────────
  // Easy (easy to draw)
  w('Chair', 'Objects', 'Easy'), w('Table', 'Objects', 'Easy'),
  w('Lamp', 'Objects', 'Easy'), w('Book', 'Objects', 'Easy'),
  w('Cup', 'Objects', 'Easy'), w('Phone', 'Objects', 'Easy'),
  w('Key', 'Objects', 'Easy'), w('Bed', 'Objects', 'Easy'),
  w('Door', 'Objects', 'Easy'), w('Window', 'Objects', 'Easy'),
  w('Shoe', 'Objects', 'Easy'), w('Hat', 'Objects', 'Easy'),
  w('Bag', 'Objects', 'Easy'), w('Clock', 'Objects', 'Easy'),
  w('Pen', 'Objects', 'Easy'), w('Scissors', 'Objects', 'Easy'),
  w('Mirror', 'Objects', 'Easy'), w('Umbrella', 'Objects', 'Easy'),
  w('Glasses', 'Objects', 'Easy'), w('Toothbrush', 'Objects', 'Easy'),
  // Medium (need a bit more attention to details)
  w('Bicycle', 'Objects', 'Medium'), w('Microphone', 'Objects', 'Medium'),
  w('Guitar', 'Objects', 'Medium'), w('Blender', 'Objects', 'Medium'),
  w('Compass', 'Objects', 'Medium'), w('Iron', 'Objects', 'Medium'),
  w('Calculator', 'Objects', 'Medium'), w('Thermometer', 'Objects', 'Medium'),
  w('Camera', 'Objects', 'Medium'), w('Watering Can', 'Objects', 'Medium'),
  w('Backpack', 'Objects', 'Medium'), w('Stapler', 'Objects', 'Medium'),
  w('Telescope', 'Objects', 'Medium'), w('Birdcage', 'Objects', 'Medium'),
  w('Helmet', 'Objects', 'Medium'), w('Fire Extinguisher', 'Objects', 'Medium'),
  w('Keyboard', 'Objects', 'Medium'), w('Magnifying Glass', 'Objects', 'Medium'),
  w('Computer', 'Objects', 'Medium'), w('Sewing Machine', 'Objects', 'Medium'),
  // Hard (needs more details)
  w('Helicopter', 'Objects', 'Hard'), w('Submarine', 'Objects', 'Hard'),
  w('Robot', 'Objects', 'Hard'), w('Castle', 'Objects', 'Hard'),
  w('Spaceship', 'Objects', 'Hard'), w('Pirate Ship', 'Objects', 'Hard'),
  w('Rollercoaster', 'Objects', 'Hard'), w('Ferris Wheel', 'Objects', 'Hard'),
  w('Piano', 'Objects', 'Hard'), w('Drum Set', 'Objects', 'Hard'),
  w('Crown', 'Objects', 'Hard'), w('Treasure Chest', 'Objects', 'Hard'),
  w('Diamond', 'Objects', 'Hard'), w('Statue', 'Objects', 'Hard'),
  w('Bridge', 'Objects', 'Hard'), w('Volcano', 'Objects', 'Hard'),
  w('Windmill', 'Objects', 'Hard'), w('Tractor', 'Objects', 'Hard'),
  w('Motorcycle', 'Objects', 'Hard'), w('Hot Air Balloon', 'Objects', 'Hard'),

  // ── EMOTIONS ─────────────────────────────────────────────────────────
  // Easy (easy to draw)
  w('Happy', 'Emotions', 'Easy'), w('Sad', 'Emotions', 'Easy'),
  w('Angry', 'Emotions', 'Easy'), w('Crying', 'Emotions', 'Easy'),
  w('Surprised', 'Emotions', 'Easy'), w('Scared', 'Emotions', 'Easy'),
  w('Tired', 'Emotions', 'Easy'), w('Sleeping', 'Emotions', 'Easy'),
  w('Laughing', 'Emotions', 'Easy'), w('Smiling', 'Emotions', 'Easy'),
  // Medium (need a bit more attention to details)
  w('Confused', 'Emotions', 'Medium'), w('Bored', 'Emotions', 'Medium'),
  w('Excited', 'Emotions', 'Medium'), w('Nervous', 'Emotions', 'Medium'),
  w('Shy', 'Emotions', 'Medium'), w('Proud', 'Emotions', 'Medium'),
  w('Sick', 'Emotions', 'Medium'), w('Dizzy', 'Emotions', 'Medium'),
  w('Winking', 'Emotions', 'Medium'), w('Thinking', 'Emotions', 'Medium'),
  // Hard (needs more details)
  w('Embarrassed', 'Emotions', 'Hard'), w('Jealous', 'Emotions', 'Hard'),
  w('Guilty', 'Emotions', 'Hard'), w('Curious', 'Emotions', 'Hard'),
  w('Shocked', 'Emotions', 'Hard'), w('Disgusted', 'Emotions', 'Hard'),
  w('Annoyed', 'Emotions', 'Hard'), w('Grumpy', 'Emotions', 'Hard'),
  w('Lonely', 'Emotions', 'Hard'), w('Relaxed', 'Emotions', 'Hard'),

  // ── SENTENCES ────────────────────────────────────────────────────────
  // Easy (easy to draw)
  w('Cat on a bed', 'Sentences', 'Easy'), w('Dog with a bone', 'Sentences', 'Easy'),
  w('Sun in the sky', 'Sentences', 'Easy'), w('Fish in a bowl', 'Sentences', 'Easy'),
  w('Bird in a tree', 'Sentences', 'Easy'), w('Apple on a table', 'Sentences', 'Easy'),
  w('Boy with a ball', 'Sentences', 'Easy'), w('Girl with a flower', 'Sentences', 'Easy'),
  w('Car on a road', 'Sentences', 'Easy'), w('Star in the night', 'Sentences', 'Easy'),
  w('Tree on a hill', 'Sentences', 'Easy'), w('Boat on water', 'Sentences', 'Easy'),
  w('Cloud raining', 'Sentences', 'Easy'), w('House with a door', 'Sentences', 'Easy'),
  w('Flower in a pot', 'Sentences', 'Easy'), w('Cup of milk', 'Sentences', 'Easy'),
  w('Book on a chair', 'Sentences', 'Easy'), w('Sock on a foot', 'Sentences', 'Easy'),
  w('Hat on a head', 'Sentences', 'Easy'), w('Pen on a desk', 'Sentences', 'Easy'),
  // Medium (need a bit more attention to details)
  w('Boy in a car', 'Sentences', 'Medium'), w('Monkey eating a banana', 'Sentences', 'Medium'),
  w('Bear sleeping in a cave', 'Sentences', 'Medium'), w('Frog on a lily pad', 'Sentences', 'Medium'),
  w('Mouse eating cheese', 'Sentences', 'Medium'), w('Robot drinking water', 'Sentences', 'Medium'),
  w('Alien flying a ship', 'Sentences', 'Medium'), w('Spider spinning a web', 'Sentences', 'Medium'),
  w('Penguin on the ice', 'Sentences', 'Medium'), w('Rabbit in a hat', 'Sentences', 'Medium'),
  w('Cat catching a mouse', 'Sentences', 'Medium'), w('Dog chasing a ball', 'Sentences', 'Medium'),
  w('Bird flying over a house', 'Sentences', 'Medium'), w('Girl riding a horse', 'Sentences', 'Medium'),
  w('Boy flying a kite', 'Sentences', 'Medium'), w('Shark eating a fish', 'Sentences', 'Medium'),
  w('Lion sleeping in grass', 'Sentences', 'Medium'), w('Elephant spraying water', 'Sentences', 'Medium'),
  w('Chef cooking pizza', 'Sentences', 'Medium'), w('Doctor helping a patient', 'Sentences', 'Medium'),
  // Hard (needs more details)
  w('Santa on a sleigh', 'Sentences', 'Hard'), w('Knight fighting a dragon', 'Sentences', 'Hard'),
  w('Pirate finding treasure', 'Sentences', 'Hard'), w('Astronaut on the moon', 'Sentences', 'Hard'),
  w('Dinosaur eating a tree', 'Sentences', 'Hard'), w('Mermaid under the sea', 'Sentences', 'Hard'),
  w('Wizard reading a book', 'Sentences', 'Hard'), w('King sitting on a throne', 'Sentences', 'Hard'),
  w('Superhero flying in the sky', 'Sentences', 'Hard'), w('Clown riding a bike', 'Sentences', 'Hard'),
  w('Alien visiting Earth', 'Sentences', 'Hard'), w('Dragon breathing fire', 'Sentences', 'Hard'),
  w('Vampire drinking juice', 'Sentences', 'Hard'), w('Ninja hiding in shadows', 'Sentences', 'Hard'),
  w('Unicorn flying over a rainbow', 'Sentences', 'Hard'), w('Detective looking for clues', 'Sentences', 'Hard'),
  w('Robot playing the piano', 'Sentences', 'Hard'), w('Monkey swinging from vine', 'Sentences', 'Hard'),
  w('Bear catching a fish', 'Sentences', 'Hard'), w('Snowman wearing a scarf', 'Sentences', 'Hard'),

  // ── PLACES ────────────────────────────────────────────────────────
  // Easy (easy to draw)
  w('Beach', 'Places', 'Easy'), w('School', 'Places', 'Easy'),
  w('Farm', 'Places', 'Easy'), w('Park', 'Places', 'Easy'),
  w('House', 'Places', 'Easy'), w('Store', 'Places', 'Easy'),
  w('Zoo', 'Places', 'Easy'), w('Pool', 'Places', 'Easy'),
  w('Tent', 'Places', 'Easy'), w('Castle', 'Places', 'Easy'),
  w('Cave', 'Places', 'Easy'), w('Forest', 'Places', 'Easy'),
  w('Moon', 'Places', 'Easy'), w('Island', 'Places', 'Easy'),
  w('Sun', 'Places', 'Easy'), w('Road', 'Places', 'Easy'),
  w('City', 'Places', 'Easy'), w('Shop', 'Places', 'Easy'),
  w('Room', 'Places', 'Easy'), w('Yard', 'Places', 'Easy'),
  // Medium (need a bit more attention to details)
  w('Library', 'Places', 'Medium'), w('Hospital', 'Places', 'Medium'),
  w('Airport', 'Places', 'Medium'), w('Restaurant', 'Places', 'Medium'),
  w('Cinema', 'Places', 'Medium'), w('Museum', 'Places', 'Medium'),
  w('Bakery', 'Places', 'Medium'), w('Playground', 'Places', 'Medium'),
  w('Church', 'Places', 'Medium'), w('Hotel', 'Places', 'Medium'),
  w('Bank', 'Places', 'Medium'), w('Gym', 'Places', 'Medium'),
  w('Stadium', 'Places', 'Medium'), w('Bridge', 'Places', 'Medium'),
  w('Factory', 'Places', 'Medium'), w('Desert', 'Places', 'Medium'),
  w('Jungle', 'Places', 'Medium'), w('Mountain', 'Places', 'Medium'),
  w('River', 'Places', 'Medium'), w('Garden', 'Places', 'Medium'),
  // Hard (needs more details)
  w('Fire Station', 'Places', 'Hard'), w('Police Station', 'Places', 'Hard'),
  w('Gas Station', 'Places', 'Hard'), w('Post Office', 'Places', 'Hard'),
  w('Supermarket', 'Places', 'Hard'), w('Pharmacy', 'Places', 'Hard'),
  w('Dentist', 'Places', 'Hard'), w('Hair Salon', 'Places', 'Hard'),
  w('Pet Shop', 'Places', 'Hard'), w('Train Station', 'Places', 'Hard'),
  w('Bus Stop', 'Places', 'Hard'), w('Skyscraper', 'Places', 'Hard'),
  w('Lighthouse', 'Places', 'Hard'), w('Volcano', 'Places', 'Hard'),
  w('Space Station', 'Places', 'Hard'), w('Submarine', 'Places', 'Hard'),
  w('Pyramids', 'Places', 'Hard'), w('Taj Mahal', 'Places', 'Hard'),
  w('Eiffel Tower', 'Places', 'Hard'), w('Colosseum', 'Places', 'Hard'),

  // ── FOOD ────────────────────────────────────────────────────────
  // Easy (easy to draw)
  w('Pizza', 'Food', 'Easy'), w('Ice Cream', 'Food', 'Easy'),
  w('Apple', 'Food', 'Easy'), w('Banana', 'Food', 'Easy'),
  w('Taco', 'Food', 'Easy'), w('Strawberry', 'Food', 'Easy'),
  w('Cake', 'Food', 'Easy'), w('Egg', 'Food', 'Easy'),
  w('Bread', 'Food', 'Easy'), w('Milk', 'Food', 'Easy'),
  w('Cheese', 'Food', 'Easy'), w('Cookie', 'Food', 'Easy'),
  w('Pie', 'Food', 'Easy'), w('Donut', 'Food', 'Easy'),
  w('Soup', 'Food', 'Easy'), w('Meat', 'Food', 'Easy'),
  w('Fish', 'Food', 'Easy'), w('Water', 'Food', 'Easy'),
  w('Juice', 'Food', 'Easy'), w('Corn', 'Food', 'Easy'),
  // Medium (need a bit more attention to details)
  w('Hamburger', 'Food', 'Medium'), w('Hot Dog', 'Food', 'Medium'),
  w('Fries', 'Food', 'Medium'), w('Sandwich', 'Food', 'Medium'),
  w('Salad', 'Food', 'Medium'), w('Chicken', 'Food', 'Medium'),
  w('Spaghetti', 'Food', 'Medium'), w('Pancake', 'Food', 'Medium'),
  w('Waffle', 'Food', 'Medium'), w('Sushi', 'Food', 'Medium'),
  w('Muffin', 'Food', 'Medium'), w('Cupcake', 'Food', 'Medium'),
  w('Pretzel', 'Food', 'Medium'), w('Peanut', 'Food', 'Medium'),
  w('Carrot', 'Food', 'Medium'), w('Tomato', 'Food', 'Medium'),
  w('Potato', 'Food', 'Medium'), w('Onion', 'Food', 'Medium'),
  w('Lemon', 'Food', 'Medium'), w('Grapes', 'Food', 'Medium'),
  // Hard (needs more details)
  w('Burrito', 'Food', 'Hard'), w('Steak', 'Food', 'Hard'),
  w('Lobster', 'Food', 'Hard'), w('Croissant', 'Food', 'Hard'),
  w('Ramen', 'Food', 'Hard'), w('Noodles', 'Food', 'Hard'),
  w('Cereal', 'Food', 'Hard'), w('Yogurt', 'Food', 'Hard'),
  w('Bacon', 'Food', 'Hard'), w('Sausage', 'Food', 'Hard'),
  w('Pineapple', 'Food', 'Hard'), w('Watermelon', 'Food', 'Hard'),
  w('Avocado', 'Food', 'Hard'), w('Broccoli', 'Food', 'Hard'),
  w('Mushroom', 'Food', 'Hard'), w('Coconut', 'Food', 'Hard'),
  w('Chocolate', 'Food', 'Hard'), w('Candy', 'Food', 'Hard'),
  w('Popcorn', 'Food', 'Hard'), w('Marshmallow', 'Food', 'Hard'),

  // ── ACTIONS ────────────────────────────────────────────────────────
  // Easy (easy to draw)
  w('Jumping', 'Actions', 'Easy'), w('Swimming', 'Actions', 'Easy'),
  w('Sleeping', 'Actions', 'Easy'), w('Laughing', 'Actions', 'Easy'),
  w('Running', 'Actions', 'Easy'), w('Walking', 'Actions', 'Easy'),
  w('Crying', 'Actions', 'Easy'), w('Eating', 'Actions', 'Easy'),
  w('Drinking', 'Actions', 'Easy'), w('Smiling', 'Actions', 'Easy'),
  w('Sitting', 'Actions', 'Easy'), w('Standing', 'Actions', 'Easy'),
  w('Clapping', 'Actions', 'Easy'), w('Waving', 'Actions', 'Easy'),
  w('Hugging', 'Actions', 'Easy'), w('Kicking', 'Actions', 'Easy'),
  w('Throwing', 'Actions', 'Easy'), w('Catching', 'Actions', 'Easy'),
  w('Drawing', 'Actions', 'Easy'), w('Reading', 'Actions', 'Easy'),
  // Medium (need a bit more attention to details)
  w('Singing', 'Actions', 'Medium'), w('Dancing', 'Actions', 'Medium'),
  w('Writing', 'Actions', 'Medium'), w('Cooking', 'Actions', 'Medium'),
  w('Baking', 'Actions', 'Medium'), w('Cleaning', 'Actions', 'Medium'),
  w('Washing', 'Actions', 'Medium'), w('Brushing', 'Actions', 'Medium'),
  w('Combing', 'Actions', 'Medium'), w('Driving', 'Actions', 'Medium'),
  w('Flying', 'Actions', 'Medium'), w('Riding', 'Actions', 'Medium'),
  w('Climbing', 'Actions', 'Medium'), w('Falling', 'Actions', 'Medium'),
  w('Tripping', 'Actions', 'Medium'), w('Pushing', 'Actions', 'Medium'),
  w('Pulling', 'Actions', 'Medium'), w('Digging', 'Actions', 'Medium'),
  w('Building', 'Actions', 'Medium'), w('Painting', 'Actions', 'Medium'),
  // Hard (needs more details)
  w('Juggling', 'Actions', 'Hard'), w('Skating', 'Actions', 'Hard'),
  w('Skiing', 'Actions', 'Hard'), w('Surfing', 'Actions', 'Hard'),
  w('Stretching', 'Actions', 'Hard'), w('Yawning', 'Actions', 'Hard'),
  w('Sneezing', 'Actions', 'Hard'), w('Coughing', 'Actions', 'Hard'),
  w('Whispering', 'Actions', 'Hard'), w('Shouting', 'Actions', 'Hard'),
  w('Pointing', 'Actions', 'Hard'), w('Hiding', 'Actions', 'Hard'),
  w('Sneaking', 'Actions', 'Hard'), w('Lifting', 'Actions', 'Hard'),
  w('Typing', 'Actions', 'Hard'), w('Sewing', 'Actions', 'Hard'),
  w('Knitting', 'Actions', 'Hard'), w('Fishing', 'Actions', 'Hard'),
  w('Hunting', 'Actions', 'Hard'), w('Paddling', 'Actions', 'Hard'),
];

const usedWords = new Set<string>();

export const getRandomWord = (category: string, difficulty: string): Word => {
  const filtered = WORD_BANK.filter(w =>
    (category === 'Random' || w.category === category) &&
    w.difficulty === difficulty
  );
  
  if (filtered.length === 0) return WORD_BANK[0];

  // Find words that haven't been used yet
  let available = filtered.filter(w => !usedWords.has(w.text));

  // If all words for this filter have been used, reset them
  if (available.length === 0) {
    filtered.forEach(w => usedWords.delete(w.text));
    available = filtered;
  }

  // Shuffle available words and pick one
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const selected = shuffled[0];

  // Mark as used
  usedWords.add(selected.text);

  return selected;
};
