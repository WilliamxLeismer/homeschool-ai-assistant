import { fromRecord, readArtifactRecords } from "@/lib/storage/db";

export async function getArtifact(id: string) {
  const records = await readArtifactRecords();
  const record = records.find((artifact) => artifact.id === id);
  return record ? fromRecord(record) : null;
}
