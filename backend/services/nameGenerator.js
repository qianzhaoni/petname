const { nameDatabase } = require('../data/nameDatabase');

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateNames(options) {
  const { petType, nameStyle, count = 5 } = options;
  
  // 从数据库中获取符合条件的名字列表
  const availableNames = nameDatabase[petType][nameStyle];
  
  // 随机选择指定数量的名字
  return getRandomItems(availableNames, count);
}

module.exports = {
  generateNames
}; 