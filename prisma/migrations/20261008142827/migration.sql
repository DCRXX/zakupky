-- CreateTable
CREATE TABLE "DeliveryTermsContent" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailedInformationId" INTEGER,

    CONSTRAINT "DeliveryTermsContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeliveryTermsContent_detailedInformationId_idx" ON "DeliveryTermsContent"("detailedInformationId");

-- AddForeignKey
ALTER TABLE "DeliveryTermsContent" ADD CONSTRAINT "DeliveryTermsContent_detailedInformationId_fkey" FOREIGN KEY ("detailedInformationId") REFERENCES "DetailedInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
