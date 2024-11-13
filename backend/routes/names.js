const express = require('express');
const router = express.Router();
const { generateNames } = require('../services/nameGenerator');

router.post('/generate', async (req, res) => {
  try {
    const { petType, nameStyle, language } = req.body;
    
    // 验证输入
    if (!petType || !nameStyle || !language) {
      return res.status(400).json({ 
        error: 'Missing required parameters' 
      });
    }
    
    // 生成名字
    const names = generateNames({
      petType,
      nameStyle,
      language,
      count: 5
    });
    
    res.json({ 
      success: true,
      names,
      message: `Generated ${names.length} names for your ${petType}`
    });
    
  } catch (error) {
    console.error('Error generating names:', error);
    res.status(500).json({ 
      error: 'Failed to generate names',
      message: error.message 
    });
  }
});

module.exports = router; 