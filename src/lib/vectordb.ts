import { VercelPostgres } from "@langchain/community/vectorstores/vercel_postgres";
import { OpenAIEmbeddings } from "@langchain/openai";

export async function getVectorStore() {
  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });

  // Use the initialize method to create an instance
  const vectorStore = await VercelPostgres.initialize(embeddings, {
    tableName: "embeddings",
  });

  return vectorStore;
}

export { VercelPostgres as VercelPostgresStore };