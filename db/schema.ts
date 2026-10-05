import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const editorState = sqliteTable('editor_state', {
  key: text('key').primaryKey(),
  payload: text('payload').notNull(),
  revision: integer('revision').notNull().default(0),
  updatedAt: text('updated_at').notNull(),
  updatedBy: text('updated_by').notNull(),
});
export const editorVersions = sqliteTable('editor_versions', {
  id: text('id').primaryKey(),
  payload: text('payload').notNull(),
  createdAt: text('created_at').notNull(),
  createdBy: text('created_by').notNull(),
});
export const editorMedia = sqliteTable('editor_media', {
  id: text('id').primaryKey(),
  filename: text('filename').notNull(),
  mime: text('mime').notNull(),
  size: integer('size').notNull(),
  createdAt: text('created_at').notNull(),
  createdBy: text('created_by').notNull(),
});
