const router = require("express").Router();
const mongoose = require("mongoose");
const Node = require("../models/treenode");
var url = require("url");

// Retrieve all nodes
router.get('/nodes', async (req, res) => {
    try {
      const nodes = await Node.find({});
      res.send(nodes);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: 'Error retrieving all binary tree node' });
    }
  });
  
  // Retrieve a single node by ID
  router.get('/nodes/:id', async (req, res) => {
    try {
      const node = await Node.findById(mongoose.Types.ObjectId(req.params.id));
      if (!node) {
        res.sendStatus(404).json({ message: 'Node not found' });
      } else {
        res.send(node);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: 'Error retrieving a binary tree node' });
    }
  });
  
  // Create a new node
  router.post('/nodes', async (req, res) => {
    try {
      const newNode = await Node.create(req.body);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: 'Error adding new binary tree node'});
    }
  });
  
  // Update an existing node
  router.put('/nodes/:id', async (req, res) => {
    try {
      const updatedNode = await Node.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.params.id),
        req.body,
        { new: true }
      );
      if (!updatedNode) {
        res.sendStatus(404).json({ message: 'Node updated successfully' });
      } else {
        res.sendStatus(204).json({ message: 'Could not update binary tree node' });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: 'Error updating binary tree node' });
    }
  });
  
  // Delete a node
  router.delete('/nodes/:id', async (req, res) => {
    try {
      const deletedNode = await Node.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));
      if (!deletedNode) {
        res.sendStatus(404).json({ message: 'Node deleted successfully' });
      } else {
        res.sendStatus(204).json({ message: 'Could not delete binary tree node' });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: 'Error deleting binary tree node' });
    }
  });
  
// Perform a breadth-first search starting from a node
router.get('/nodes/bfs/:id', async (req, res) => {
    try {
      const startNode = await Node.findById(mongoose.Types.ObjectId(req.params.id));
      if (!startNode) {
        res.sendStatus(404).json({ message: 'Node not found' });
      } else {
        const queue = [startNode];
        const visited = [startNode._id];
        const bfsResult = [];
        while (queue.length > 0) {
          const node = queue.shift();
          bfsResult.push(node);
          if (node.left && !visited.includes(node.left)) {
            visited.push(node.left);
            const leftNode = await Node.findById(node.left);
            if (leftNode) {
              queue.push(leftNode);
            }
          }
          if (node.right && !visited.includes(node.right)) {
            visited.push(node.right);
            const rightNode = await Node.findById(node.right);
            if (rightNode) {
              queue.push(rightNode);
            }
          }
        }
        res.sendStatus(200).send(bfsResult);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500).json({ message: 'Error searching binary tree' });
    }
  });  

module.exports = router;