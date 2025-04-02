/*
  Warnings:

  - You are about to drop the column `details` on the `filmes` table. All the data in the column will be lost.
  - Added the required column `director` to the `filmes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `filmes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "filmeId" TEXT NOT NULL,
    CONSTRAINT "Review_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "filmes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_filmes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "maximum_attendees" INTEGER
);
INSERT INTO "new_filmes" ("id", "maximum_attendees", "slug", "title") SELECT "id", "maximum_attendees", "slug", "title" FROM "filmes";
DROP TABLE "filmes";
ALTER TABLE "new_filmes" RENAME TO "filmes";
CREATE UNIQUE INDEX "filmes_slug_key" ON "filmes"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
