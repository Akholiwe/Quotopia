import { Quote } from '../types/Quote';

export const quotes: Quote[] = [
  // Inspirational Quotes
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "inspirational"
  },
  {
    id: 2,
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "inspirational"
  },
  {
    id: 3,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "inspirational"
  },
  {
    id: 4,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "inspirational"
  },
  // Bizarre Quotes
  {
    id: 5,
    text: "I haven't slept for ten days, because that would be too long.",
    author: "Mitch Hedberg",
    category: "bizarre"
  },
  {
    id: 6,
    text: "I told my wife the truth. I told her I was seeing a psychiatrist. Then she told me the truth: that she was seeing a psychiatrist, two plumbers, and a bartender.",
    author: "Rodney Dangerfield",
    category: "bizarre"
  },
  {
    id: 7,
    text: "I'm not superstitious, but I am a little stitious.",
    author: "Michael Scott",
    character: "The Office",
    category: "bizarre"
  },
  {
    id: 8,
    text: "I used to hate facial hair, but then it grew on me.",
    author: "Anonymous",
    category: "bizarre"
  },
  // Kung Fu Panda
  {
    id: 9,
    text: "Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.",
    author: "Master Oogway",
    character: "Kung Fu Panda",
    category: "inspirational"
  },
  {
    id: 10,
    text: "There is no secret ingredient. It's just you.",
    author: "Po's Father",
    character: "Kung Fu Panda",
    category: "inspirational"
  },
  {
    id: 11,
    text: "Your mind is like this water, my friend. When it is agitated, it becomes difficult to see. When it is calm, everything becomes clear.",
    author: "Master Oogway",
    character: "Kung Fu Panda",
    category: "inspirational"
  },
  {
    id: 12,
    text: "Skadoosh!",
    author: "Po",
    character: "Kung Fu Panda",
    category: "bizarre"
  },
  // Halo Wars 1 & 2
  {
    id: 13,
    text: "All units, this is Red Team. We are the tip of the spear.",
    author: "Jerome-092",
    character: "Halo Wars 2",
    category: "inspirational"
  },
  {
    id: 14,
    text: "We've kicked the Covenant's ass before, we can do it again.",
    author: "Sergeant Forge",
    character: "Halo Wars",
    category: "inspirational"
  },
  {
    id: 15,
    text: "Sometimes the only way to save a life... is to take one.",
    author: "Captain Cutter",
    character: "Halo Wars",
    category: "inspirational"
  },
  {
    id: 16,
    text: "I am Atriox. And I am the last face you will ever see.",
    author: "Atriox",
    character: "Halo Wars 2",
    category: "bizarre"
  },
  // Star Wars
  {
    id: 17,
    text: "Do or do not, there is no try.",
    author: "Yoda",
    character: "Star Wars",
    category: "inspirational"
  },
  {
    id: 18,
    text: "Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering.",
    author: "Yoda",
    character: "Star Wars",
    category: "inspirational"
  },
  {
    id: 19,
    text: "I find your lack of faith disturbing.",
    author: "Darth Vader",
    character: "Star Wars",
    category: "bizarre"
  },
  {
    id: 20,
    text: "Help me, Obi-Wan Kenobi. You're my only hope.",
    author: "Princess Leia",
    character: "Star Wars",
    category: "bizarre"
  },
  // Thrawn
  {
    id: 21,
    text: "To defeat an enemy, you must know them. Not simply their battle tactics, but their history, philosophy, art.",
    author: "Grand Admiral Thrawn",
    character: "Star Wars",
    category: "inspirational"
  },
  {
    id: 22,
    text: "I study the art of war. Work to perfect it.",
    author: "Grand Admiral Thrawn",
    character: "Star Wars",
    category: "inspirational"
  },
  {
    id: 23,
    text: "The key to understanding a species is to understand their art.",
    author: "Grand Admiral Thrawn",
    character: "Star Wars",
    category: "inspirational"
  },
  {
    id: 24,
    text: "I will start my operations here, and pull the rebels apart piece by piece.",
    author: "Grand Admiral Thrawn",
    character: "Star Wars",
    category: "bizarre"
  },
  // Disney Movies
  {
    id: 25,
    text: "The past can hurt. But the way I see it, you can either run from it or learn from it.",
    author: "Rafiki",
    character: "The Lion King",
    category: "inspirational"
  },
  {
    id: 26,
    text: "Remember who you are.",
    author: "Mufasa",
    character: "The Lion King",
    category: "inspirational"
  },
  {
    id: 27,
    text: "Just keep swimming, just keep swimming!",
    author: "Dory",
    character: "Finding Nemo",
    category: "inspirational"
  },
  {
    id: 28,
    text: "Hakuna Matata! What a wonderful phrase!",
    author: "Timon & Pumbaa",
    character: "The Lion King",
    category: "bizarre"
  },
  // DreamWorks Movies
  {
    id: 29,
    text: "Ogres are like onions. They have layers.",
    author: "Shrek",
    character: "Shrek",
    category: "inspirational"
  },
  {
    id: 30,
    text: "Sometimes you have to believe in yourself when no one else will.",
    author: "Hiccup",
    character: "How to Train Your Dragon",
    category: "inspirational"
  },
  {
    id: 31,
    text: "Better out than in, I always say!",
    author: "Shrek",
    character: "Shrek",
    category: "bizarre"
  },
  {
    id: 32,
    text: "I like to move it, move it!",
    author: "King Julien",
    character: "Madagascar",
    category: "bizarre"
  },
  // Halo
  {
    id: 33,
    text: "Spartans never die. They're just missing in action.",
    author: "Dr. Catherine Halsey",
    character: "Halo",
    category: "inspirational"
  },
  {
    id: 34,
    text: "Don't make a girl a promise if you know you can't keep it.",
    author: "Cortana",
    character: "Halo",
    category: "inspirational"
  },
  {
    id: 35,
    text: "I need a weapon.",
    author: "Master Chief",
    character: "Halo",
    category: "bizarre"
  },
  {
    id: 36,
    text: "Wake me when you need me.",
    author: "Master Chief",
    character: "Halo",
    category: "bizarre"
  },
  // Call of Duty
  {
    id: 37,
    text: "History is written by the victors.",
    author: "Captain Price",
    character: "Call of Duty",
    category: "inspirational"
  },
  {
    id: 38,
    text: "The healthy human mind doesn't wake up in the morning thinking this is its last day on Earth.",
    author: "General Shepherd",
    character: "Call of Duty",
    category: "inspirational"
  },
  {
    id: 39,
    text: "Remember, no Russian.",
    author: "Vladimir Makarov",
    character: "Call of Duty",
    category: "bizarre"
  },
  {
    id: 40,
    text: "The numbers, Mason, what do they mean?",
    author: "Viktor Reznov",
    character: "Call of Duty",
    category: "bizarre"
  },
  // Bioshock
  {
    id: 41,
    text: "A man chooses, a slave obeys.",
    author: "Andrew Ryan",
    character: "Bioshock",
    category: "inspirational"
  },
  {
    id: 42,
    text: "We all make choices, but in the end our choices make us.",
    author: "Andrew Ryan",
    character: "Bioshock",
    category: "inspirational"
  },
  {
    id: 43,
    text: "Would you kindly?",
    author: "Atlas",
    character: "Bioshock",
    category: "bizarre"
  },
  {
    id: 44,
    text: "No gods or kings. Only man.",
    author: "Andrew Ryan",
    character: "Bioshock",
    category: "bizarre"
  },
  // Batman Arkham
  {
    id: 45,
    text: "I am vengeance. I am the night. I am Batman!",
    author: "Batman",
    character: "Batman Arkham",
    category: "inspirational"
  },
  {
    id: 46,
    text: "It's not who I am underneath, but what I do that defines me.",
    author: "Batman",
    character: "Batman Arkham",
    category: "inspirational"
  },
  {
    id: 47,
    text: "Why so serious?",
    author: "The Joker",
    character: "Batman Arkham",
    category: "bizarre"
  },
  {
    id: 48,
    text: "Madness is like gravity. All it takes is a little push.",
    author: "The Joker",
    character: "Batman Arkham",
    category: "bizarre"
  },
  // Splinter Cell
  {
    id: 49,
    text: "Information is power. But like all power, there are those who want to keep it for themselves.",
    author: "Sam Fisher",
    character: "Splinter Cell",
    category: "inspirational"
  },
  {
    id: 50,
    text: "Sometimes you have to make a choice between bad and worse.",
    author: "Sam Fisher",
    character: "Splinter Cell",
    category: "inspirational"
  },
  {
    id: 51,
    text: "I'm a Splinter Cell. We don't exist.",
    author: "Sam Fisher",
    character: "Splinter Cell",
    category: "bizarre"
  },
  {
    id: 52,
    text: "Trust is a luxury I can't afford.",
    author: "Sam Fisher",
    character: "Splinter Cell",
    category: "bizarre"
  },
  // WWE
  {
    id: 53,
    text: "Never give up. Hustle, Loyalty, Respect.",
    author: "John Cena",
    character: "WWE",
    category: "inspirational"
  },
  {
    id: 54,
    text: "To be the man, you gotta beat the man! Woooo!",
    author: "Ric Flair",
    character: "WWE",
    category: "inspirational"
  },
  {
    id: 55,
    text: "Can you smell what The Rock is cooking?",
    author: "The Rock",
    character: "WWE",
    category: "bizarre"
  },
  {
    id: 56,
    text: "You can't see me!",
    author: "John Cena",
    character: "WWE",
    category: "bizarre"
  },
  // Spec Ops: The Line
  {
    id: 57,
    text: "None of this would have happened if you had just stopped.",
    author: "Konrad",
    character: "Spec Ops: The Line",
    category: "inspirational"
  },
  {
    id: 58,
    text: "It takes a strong man to deny what's right in front of him.",
    author: "Konrad",
    character: "Spec Ops: The Line",
    category: "inspirational"
  },
  {
    id: 59,
    text: "Do you feel like a hero yet?",
    author: "Loading Screen",
    character: "Spec Ops: The Line",
    category: "bizarre"
  },
  {
    id: 60,
    text: "Welcome to Dubai.",
    author: "Martin Walker",
    character: "Spec Ops: The Line",
    category: "bizarre"
  },
  // Resident Evil
  {
    id: 61,
    text: "A man's worth isn't measured by what he owns, but by what he's willing to sacrifice.",
    author: "Leon S. Kennedy",
    character: "Resident Evil",
    category: "inspirational"
  },
  {
    id: 62,
    text: "I'm a survivor. That's what I do.",
    author: "Claire Redfield",
    character: "Resident Evil",
    category: "inspirational"
  },
  {
    id: 63,
    text: "You were almost a Jill sandwich!",
    author: "Barry Burton",
    character: "Resident Evil",
    category: "bizarre"
  },
  {
    id: 64,
    text: "Seven minutes. Seven minutes is all I can spare to play with you.",
    author: "Albert Wesker",
    character: "Resident Evil",
    category: "bizarre"
  },
  // Captain America / Steve Rogers
  {
    id: 65,
    text: "I can do this all day.",
    author: "Steve Rogers",
    character: "Captain America",
    category: "inspirational"
  },
  {
    id: 66,
    text: "The price of freedom is high. It always has been. But it's a price I'm willing to pay.",
    author: "Steve Rogers",
    character: "Captain America",
    category: "inspirational"
  },
  {
    id: 67,
    text: "I'm just a kid from Brooklyn.",
    author: "Steve Rogers",
    character: "Captain America",
    category: "bizarre"
  },
  {
    id: 68,
    text: "Language!",
    author: "Steve Rogers",
    character: "Captain America",
    category: "bizarre"
  },
  // More Halo Wars quotes
  {
    id: 69,
    text: "Every battle is won before it's ever fought.",
    author: "Professor Anders",
    character: "Halo Wars",
    category: "inspirational"
  },
  {
    id: 70,
    text: "We're going to take the fight to them. No more running.",
    author: "Captain Cutter",
    character: "Halo Wars",
    category: "inspirational"
  },
  {
    id: 71,
    text: "The Banished do not simply occupy territory. We rule it.",
    author: "Atriox",
    character: "Halo Wars 2",
    category: "bizarre"
  },
  {
    id: 72,
    text: "Your Spartans are impressive, but they are not gods.",
    author: "Atriox",
    character: "Halo Wars 2",
    category: "bizarre"
  },
  // Additional Disney quotes
  {
    id: 73,
    text: "The cold never bothered me anyway.",
    author: "Elsa",
    character: "Frozen",
    category: "inspirational"
  },
  {
    id: 74,
    text: "Some people are worth melting for.",
    author: "Olaf",
    character: "Frozen",
    category: "inspirational"
  },
  {
    id: 75,
    text: "Do you want to build a snowman?",
    author: "Anna",
    character: "Frozen",
    category: "bizarre"
  },
  {
    id: 76,
    text: "To infinity and beyond!",
    author: "Buzz Lightyear",
    character: "Toy Story",
    category: "bizarre"
  },
  // Additional DreamWorks quotes
  {
    id: 77,
    text: "With love comes loss. It's part of the deal. Sometimes it hurts, but in the end, it's all worth it.",
    author: "Stoick",
    character: "How to Train Your Dragon",
    category: "inspirational"
  },
  {
    id: 78,
    text: "Your story may not have such a happy beginning, but that doesn't make you who you are. It is the rest of your story, who you choose to be.",
    author: "Soothsayer",
    character: "Kung Fu Panda 2",
    category: "inspirational"
  },
  {
    id: 79,
    text: "This is Berk. It's twelve days north of Hopeless and a few degrees south of Freezing to Death.",
    author: "Hiccup",
    character: "How to Train Your Dragon",
    category: "bizarre"
  },
  {
    id: 80,
    text: "Smile and wave, boys. Smile and wave.",
    author: "Skipper",
    character: "Madagascar",
    category: "bizarre"
  }
];