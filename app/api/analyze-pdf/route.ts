import { generateText } from "ai";

export async function POST(req: Request) {
  const { pdf, prompt } = await req.json();

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "file",
              data: pdf,
              mimeType: "application/pdf",
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
      maxTokens: 4000,
      temperature: 0.7,
    });

    return Response.json({ content: text });
  } catch (error) {
    console.error("PDF Analysis error:", error);
    return Response.json(
      { error: "Failed to analyze PDF" },
      { status: 500 }
    );
  }
}
