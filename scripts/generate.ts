import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { DocumentInterface } from "@langchain/core/documents";
import { Redis } from "@upstash/redis";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { getVectorStore } from "../src/lib/vectordb";
import { sql } from "@vercel/postgres";

async function generateEmbeddings() {
  console.log("Ensuring database table exists...");
  // Initialize the vector store, which also ensures the table exists.
  const vectorStore = await getVectorStore();

  console.log("Clearing existing data from the database and cache...");
  // Clear existing data from the table
  await sql`TRUNCATE TABLE embeddings;`;
  
  // Clear the Redis cache
  await Redis.fromEnv().flushdb();

  console.log("Loading documents...");
  const routeLoader = new DirectoryLoader(
    "src/app",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true,
  );

  // routes
  const routes = (await routeLoader.load())
    .filter((route) => route.metadata.source.endsWith("page.tsx"))
    .map((route): DocumentInterface => {
      const url =
        route.metadata.source
          .replace(/\\/g, "/") // replace "\\" with "/"
          .split("/src/app")[1]
          .split("/page.tsx")[0] || "/";

      const pageContentTrimmed = route.pageContent
        .replace(/^import.*$/gm, "") // remove all import statements
        .replace(/ className=(["']).*?\1| className={.*?}/g, "") // remove all className props
        .replace(/^\s*[\r]/gm, "") // remove empty lines
        .trim();

      return { pageContent: pageContentTrimmed, metadata: { url } };
    });

  const routesSplitter = RecursiveCharacterTextSplitter.fromLanguage("html");
  const splitRoutes = await routesSplitter.splitDocuments(routes);

  // resume data
  const dataLoader = new DirectoryLoader("src/data", {
    ".json": (path) => new TextLoader(path),
  });

  const data = await dataLoader.load();

  const dataSplitter = RecursiveCharacterTextSplitter.fromLanguage("js");
  const splitData = await dataSplitter.splitDocuments(data);

  // blog posts
  const postLoader = new DirectoryLoader(
    "content",
    {
      ".mdx": (path) => new TextLoader(path),
    },
    true,
  );

  const posts = (await postLoader.load())
    .filter((post) => post.metadata.source.endsWith(".mdx"))
    .map((post): DocumentInterface => {
      const pageContentTrimmed = post.pageContent.split("---")[1]; // only want the frontmatter

      return { pageContent: pageContentTrimmed, metadata: post.metadata };
    });

  const postSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown");
  const splitPosts = await postSplitter.splitDocuments(posts);

  console.log("Adding documents to the vector store...");
  await vectorStore.addDocuments(splitRoutes);
  await vectorStore.addDocuments(splitData);
  await vectorStore.addDocuments(splitPosts);

  console.log("Embedding generation complete!");
}

generateEmbeddings();