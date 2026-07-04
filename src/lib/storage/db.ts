import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { GeneratedArtifact, InterviewAnswers, WorkflowId } from "@/workflows/types";
import type { ResearchSource } from "@/lib/research/types";

export type ArtifactRecord = {
  id: string;
  workflowId: WorkflowId;
  title: string;
  markdown: string;
  answersJson: string;
  researchSourcesJson?: string;
  provider: string;
  model: string;
  createdAt: string;
  validationNotes?: string[];
  systemPrompt?: string;
  userPrompt?: string;
};

const dataDir = path.join(process.cwd(), "data");
const artifactFile = path.join(dataDir, "artifacts.json");

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(artifactFile, "utf8");
  } catch {
    await writeFile(artifactFile, "[]", "utf8");
  }
}

export async function readArtifactRecords(): Promise<ArtifactRecord[]> {
  await ensureStore();
  const raw = await readFile(artifactFile, "utf8");
  return JSON.parse(raw) as ArtifactRecord[];
}

export async function writeArtifactRecords(records: ArtifactRecord[]) {
  await ensureStore();
  await writeFile(artifactFile, JSON.stringify(records, null, 2), "utf8");
}

export function toRecord(artifact: GeneratedArtifact): ArtifactRecord {
  return {
    ...artifact,
    answersJson: JSON.stringify(artifact.answers),
    researchSourcesJson: JSON.stringify(artifact.researchSources || [])
  };
}

export function fromRecord(record: ArtifactRecord): GeneratedArtifact {
  return {
    ...record,
    answers: JSON.parse(record.answersJson) as InterviewAnswers,
    researchSources: record.researchSourcesJson ? JSON.parse(record.researchSourcesJson) as ResearchSource[] : []
  };
}
