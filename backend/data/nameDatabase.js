// 基础名字元素
const elements = {
  prefixes: {
    cute: [
      'Sweet', 'Little', 'Baby', 'Tiny', 'Lovely', 'Precious', 'Honey', 'Sugar', 'Angel', 'Fluffy',
      'Cuddly', 'Cozy', 'Snuggly', 'Rosy', 'Sunny', 'Happy', 'Lucky', 'Jolly', 'Merry', 'Sparkly'
    ],
    cool: [
      'King', 'Lord', 'Master', 'Royal', 'Brave', 'Noble', 'Grand', 'Mighty', 'Supreme', 'Epic',
      'Alpha', 'Prime', 'Ultra', 'Super', 'Mega', 'Dark', 'Storm', 'Thunder', 'Blitz', 'Flash'
    ],
    funny: [
      'Silly', 'Goofy', 'Crazy', 'Lazy', 'Chubby', 'Wobbly', 'Wiggly', 'Jumpy', 'Grumpy', 'Dopey',
      'Wacky', 'Quirky', 'Derpy', 'Loopy', 'Clumsy', 'Dizzy', 'Giggly', 'Bouncy', 'Floppy', 'Nutty'
    ]
  },
  suffixes: {
    dog: [
      'Paw', 'Bark', 'Woof', 'Tail', 'Fang', 'Howl', 'Pup', 'Hound', 'Scout', 'Guard',
      'Dog', 'Pooch', 'Buddy', 'Pal', 'Friend', 'Mate', 'Champ', 'Chief', 'Boss', 'Captain'
    ],
    cat: [
      'Paw', 'Purr', 'Meow', 'Whisker', 'Claw', 'Kitty', 'Cat', 'Felix', 'Tiger', 'Leo',
      'Puss', 'Tabby', 'Kitten', 'Prince', 'Princess', 'Queen', 'King', 'Duke', 'Duchess', 'Lord'
    ]
  },
  nouns: {
    cute: [
      'Cookie', 'Muffin', 'Candy', 'Bubble', 'Pearl', 'Star', 'Moon', 'Cloud', 'Snow', 'Rose',
      'Cupcake', 'Marshmallow', 'Cotton', 'Blossom', 'Sunshine', 'Rainbow', 'Crystal', 'Diamond', 'Button', 'Petal'
    ],
    cool: [
      'Shadow', 'Storm', 'Thunder', 'Phoenix', 'Dragon', 'Knight', 'Warrior', 'Legend', 'Hero', 'Spirit',
      'Blade', 'Frost', 'Blaze', 'Flame', 'Steel', 'Rock', 'Wolf', 'Lion', 'Eagle', 'Hawk'
    ],
    funny: [
      'Potato', 'Noodle', 'Pickle', 'Waffle', 'Donut', 'Burger', 'Taco', 'Dumpling', 'Bean', 'Nugget',
      'Meatball', 'Biscuit', 'Pancake', 'Sushi', 'Pizza', 'Cheese', 'Bacon', 'Cookie', 'Pudding', 'Jelly'
    ]
  }
};

// 生成所有可能的组合
function generateAllCombinations() {
  const combinations = {
    dog: {},
    cat: {}
  };

  ['dog', 'cat'].forEach(pet => {
    ['cute', 'cool', 'funny'].forEach(style => {
      combinations[pet][style] = [];
      
      // 组合1：前缀 + 后缀
      elements.prefixes[style].forEach(prefix => {
        elements.suffixes[pet].forEach(suffix => {
          combinations[pet][style].push(`${prefix} ${suffix}`);
        });
      });

      // 组合2：前缀 + 名词
      elements.prefixes[style].forEach(prefix => {
        elements.nouns[style].forEach(noun => {
          combinations[pet][style].push(`${prefix} ${noun}`);
        });
      });

      // 组合3：名词 + 后缀
      elements.nouns[style].forEach(noun => {
        elements.suffixes[pet].forEach(suffix => {
          combinations[pet][style].push(`${noun} ${suffix}`);
        });
      });

      // 组合4：单个名词（作为简单名字）
      elements.nouns[style].forEach(noun => {
        combinations[pet][style].push(noun);
      });

      // 组合5：单个后缀（作为简单名字）
      elements.suffixes[pet].forEach(suffix => {
        if (suffix.length > 3) { // 只使用较长的后缀作为独立名字
          combinations[pet][style].push(suffix);
        }
      });
    });
  });

  return combinations;
}

// 预生成所有组合
const nameDatabase = generateAllCombinations();

module.exports = {
  nameDatabase
}; 