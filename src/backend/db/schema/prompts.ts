import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Configuration to maintain post quality and persona for each subject.
 */
export interface WritingConfig {
  identity: string; // AI persona
  principles: string[]; // key values for content
  structure: {
    // guidelines for the each section
    intro: string;
    body: string;
    outro: string;
  };
  forbiddenTopics: string[];
  writingStyle: string[];
}

/**
 * Configuration to maintain thumbnail consistency and branding for each subject.
 */
export interface ThumbnailConfig {
  visual: {
    // basic visualization config
    ratio: string;
    backgroundColor: string;
    textColor: string;
  };
  iconStyle: string; // specific graphic style in thumnail
  thumbnailGuides: string[]; // guideline in detailed
}

/**
 * Configuration to maintain the quality and relevance of images within the post body.
 */
export interface InnerImageConfig {
  visual: {
    // basic visualization config
    ratio: string;
  };
  artStyle: string; // preferred artistic style
  innerImageGuides: string[]; // guideline in detailed
}

export const prompts = sqliteTable("Prompts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),

  // save object to use JSON mode
  writingConfig: text("writing_config", { mode: "json" })
    .$type<WritingConfig>()
    .notNull(),
  thumbnailConfig: text("thumbnail_config", { mode: "json" })
    .$type<ThumbnailConfig>()
    .notNull(),
  innerImageConfig: text("inner_image_config", { mode: "json" })
    .$type<InnerImageConfig>()
    .notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
