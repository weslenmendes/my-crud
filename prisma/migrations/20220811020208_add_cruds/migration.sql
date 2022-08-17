-- CreateTable
CREATE TABLE "cruds" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "lastKey" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cruds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cruds" ADD CONSTRAINT "cruds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
