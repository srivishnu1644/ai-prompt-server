const express = require("express");
const router = express.Router();
const Prompt = require("../models/Prompt");
const adminMiddleware = require("../adminMiddleware");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

router.post("/", async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt text is required" });
    }

    console.log("Sending prompt to Gemini:", prompt);
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response.text();
    console.log("Received response from Gemini.");

    const newHistoryEntry = await Prompt.create({
      prompt: prompt,
      response: aiResponse,
      user: req.user.id,
    });

    res.status(201).json(newHistoryEntry);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allPrompts = await Prompt.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(allPrompts);
  } catch (err) {
    next(err);
  }
});

router.get("/all", adminMiddleware, async (req, res, next) => {
  try {
    const allPrompts = await Prompt.find({}).sort({ createdAt: -1 });
    res.json(allPrompts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await Prompt.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { prompt } = req.body;

    let item = await Prompt.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const updatedItem = await Prompt.findByIdAndUpdate(
      req.params.id,
      { prompt: prompt },
      { new: true }
    );

    res.json(updatedItem);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let item = await Prompt.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    await Prompt.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
