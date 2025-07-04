const express = require('express');
const multer = require('multer');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const Issue = require('../models/Issue');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/create', protect, upload.single('image'), async (req, res) => {
  const { address, description } = req.body;
  const issue = new Issue({
    userId: req.user.id,
    image: req.file?.filename || null,
    address,
    description
  });
  await issue.save();
  res.json(issue);
});

router.get('/user', protect, async (req, res) => {
  const issues = await Issue.find({ userId: req.user.id });
  res.json(issues);
});

router.get('/all', protect, adminOnly, async (req, res) => {
  const issues = await Issue.find().populate('userId', 'name email');
  res.json(issues);
});

router.put('/update/:id', protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  const issue = await Issue.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(issue);
});

module.exports = router;
