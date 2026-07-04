import { fromRecord, readArtifactRecords } from "@/lib/storage/db";

export async function listArtifacts() {
  const records = await readArtifactRecords();
  return records.map(fromRecord);
}
