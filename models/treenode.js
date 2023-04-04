const mongoose = require('mongoose');

const TreeNodeSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  left: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreeNode'
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TreeNode'
  }
});

const TreeNode = mongoose.model('TreeNode', TreeNodeSchema);

module.exports = TreeNode;