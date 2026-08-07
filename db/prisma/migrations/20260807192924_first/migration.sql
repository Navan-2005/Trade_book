-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credentials_email_key" ON "credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_id_key" ON "credentials"("id");
