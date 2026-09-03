import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse, ChatMessage } from "@/lib/ai";

const MAX_MESSAGE_LENGTH = 1000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate message
    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string." },
        { status: 400 }
      );
    }

    const message = body.message.trim();

    if (message.length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`,
        },
        { status: 400 }
      );
    }

    // Validate history (optional)
    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (msg: Record<string, unknown>) =>
              msg &&
              typeof msg.content === "string" &&
              (msg.role === "user" || msg.role === "assistant")
          )
          .slice(-20) // Keep last 20 messages for context
      : [];

    // Build full conversation with current message
    const messages: ChatMessage[] = [
      ...history,
      { role: "user", content: message },
    ];

    const reply = await generateChatResponse(messages);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
