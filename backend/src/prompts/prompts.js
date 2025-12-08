const MODEL = "gpt-4.1";

export const extractAiEntities = async (text, client) => {
  const prompt = `
        Extract the main *concepts* and *relationships* from the text below.
        Return a valid JSON with this structure:
        {
        "concepts": [{
            "id": "unique snake_case identifier",
            "label": "human readable name",
            "type": "category of concept (muscle, process, event, principle, etc.)",
            "description": "short definition or explanation"
        }],
        "relationships": [
                {
                    "from": "id of concept A",
                    "to": "id of concept B",
                    "type": "relationship type (depends_on, part_of, causes, performs, located_in, example_of, etc.)",
                    "description": "natural language explanation"
                }
            ]
        }

        Always output JSON only.
        Always follow this schema.
        Never add extra fields.
        Ensure every relationship uses valid concept IDs.

        Rules:
        - Ensure all concept IDs are unique snake_case.
        - Ensure relationships only reference IDs defined in the concepts list.
        - Do not include duplicate concepts.
        - Do not include duplicate relationships.
        - Focus on core ideas, not trivial sentences.
        - If concept relationships are ambiguous, infer them logically.
        - Output ONLY valid JSON. Nothing else.
        - Make sure to create a concept and relation for the biggest, most important topics or chapters

        Text: ${text}
    `;

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are an NLP extractor that extracts structured knowledge graphs from lessons, notes, textbooks, or educational content. Your output must ALWAYS be valid JSON using the schema below. No explanation, no extra text.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });
  return response.choices[0].message.content;
};
