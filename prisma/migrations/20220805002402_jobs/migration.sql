/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jobs_id_key" ON "Jobs"("id");
