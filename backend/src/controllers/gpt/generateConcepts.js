import { extractAiEntities } from "../../prompts/prompts.js";
import clientOpenAI from "../../utils/openaiClient.js";

export const generateConcepts = async (req, res) => {
  try {
    const textForPrompt = req.body.text;

    const concepts = await extractAiEntities(textForPrompt, clientOpenAI);
    res.status(201).json({
      success: true,
      content: concepts,
    });
  } catch (err) {
    console.error("Error with prompting GPT: ", err);
  }
};
