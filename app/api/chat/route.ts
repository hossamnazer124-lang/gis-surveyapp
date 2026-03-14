import { generateText } from "ai";

export async function POST(req: Request) {
  const { system, messages } = await req.json();

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: system || undefined,
      messages: messages.map(
        (m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })
      ),
      maxTokens: 2000,
      temperature: 0.7,
    });

    return Response.json({ content: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
