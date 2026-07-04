import type { GeneratedArtifact } from "@/workflows/types";
import { readArtifactRecords, toRecord, writeArtifactRecords } from "@/lib/storage/db";

export async function saveArtifact(artifact: GeneratedArtifact) {
  const records = await readArtifactRecords();
  records.unshift(toRecord(artifact));
  await writeArtifactRecords(records);
  return artifact;
}
