import { expect, test, describe, beforeAll } from "bun:test";
import { prompts, type WritingConfig } from "@backend/db/schema/prompts";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { setupTestDb } from "@backend/tests/helpers/db";

describe("Prompts Schema Unit Test", () => {
  let db: BunSQLiteDatabase;

  beforeAll(async () => {
    const { db: testDb } = await setupTestDb();
    db = testDb;
  });

  test("Should insert and retrieve prompt template with JSON mode", async () => {
    // Mock (w. Gemini)
    const mockWriting: WritingConfig = {
      identity: "Professional Barista & Roaster",
      principles: ["Science-based", "Sensory-focused", "No-snobbery"],
      structure: {
        intro: "Hook with the aroma description of a specific origin",
        body: "Detailed ratio, grind size, and water temperature variables",
        outro: "Enjoyment tips and 'share your brew' CTA",
      },
      forbiddenTopics: ["Instant coffee", "Adding sugar/syrup"],
      writingStyle: ["Elegant", "Informative", "Sensory-rich"],
    };

    const mockThumbnail = {
      visual: {
        ratio: "16:9",
        backgroundColor: "#F5F5DC", // Warm beige (Crema color)
        textColor: "#3E2723", // Deep espresso brown
      },
      iconStyle: "Minimalist Line Art (Dripper & Kettle)",
      thumbnailGuides: ["Use Serif font for title", "Margin 10% from edges"],
    };

    const mockInnerImage = {
      visual: { ratio: "4:3" },
      artStyle: "Soft Natural Light Photography",
      innerImageGuides: [
        "Focus on water stream from the kettle",
        "Show the bloom of the coffee grounds clearly",
      ],
    };

    // given
    await db.insert(prompts).values({
      name: "Barista & Roaster Project Template",
      writingConfig: mockWriting,
      thumbnailConfig: mockThumbnail,
      innerImageConfig: mockInnerImage,
    });

    // when
    const result = await db.select().from(prompts);
    const savedPrompt = result[0]!;

    // then
    expect(result).toHaveLength(1);
    expect(savedPrompt.name).toBe("Barista & Roaster Project Template");
    expect(savedPrompt.writingConfig.identity).toBe(
      "Professional Barista & Roaster",
    );
    expect(savedPrompt.writingConfig.principles).toContain("Science-based");
    expect(savedPrompt.thumbnailConfig.visual.backgroundColor).toBe("#F5F5DC");
    expect(savedPrompt.innerImageConfig.artStyle).toBe(
      "Soft Natural Light Photography",
    );
  });
});
