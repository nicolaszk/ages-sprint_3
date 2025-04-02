-- CreateTable
CREATE TABLE "filmes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "filmes_slug_key" ON "filmes"("slug");
