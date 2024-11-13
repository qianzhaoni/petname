const express = require('express');
const router = express.Router();
const { generateNames } = require('../services/nameGenerator');

router.post('/generate', async (req, res) => {
  try {
    const { petType, nameStyle } = req.body;
    
    // 验证输入
    if (!petType || !nameStyle) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        message: 'Pet type and name style are required'
      });
    }
    
    // 验证参数值
    const validPetTypes = ['dog', 'cat'];
    const validStyles = ['cute', 'cool', 'funny'];
    
    if (!validPetTypes.includes(petType)) {
      return res.status(400).json({
        error: 'Invalid pet type',
        message: 'Pet type must be either "dog" or "cat"'
      });
    }
    
    if (!validStyles.includes(nameStyle)) {
      return res.status(400).json({
        error: 'Invalid name style',
        message: 'Style must be one of: cute, cool, funny'
      });
    }
    
    // 生成名字
    const names = generateNames({
      petType,
      nameStyle,
      count: 5
    });
    
    // 确保生成了名字
    if (!names || names.length === 0) {
      throw new Error('No names were generated');
    }
    
    res.json({ 
      success: true,
      names,
      message: `Generated ${names.length} names for your ${petType}`
    });
    
  } catch (error) {
    console.error('Error generating names:', error);
    res.status(500).json({ 
      error: 'Failed to generate names',
      message: 'Please try again'
    });
  }
});

module.exports = router; 