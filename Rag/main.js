import dotenv from "dotenv";
dotenv.config()
import { PDFParse } from "pdf-parse";
import fs from 'fs'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {MistralAIEmbeddings} from "@langchain/mistralai"
import { Pinecone } from '@pinecone-database/pinecone';
// import { text } from "stream/consumers";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const index = pc.index('cohort-2-rag');

// let dataBuffer = fs.readFileSync('./Aarav_Developer_Story.pdf');

// const parser = new PDFParse({
//     data: dataBuffer
// })

// const data = await parser.getText()
// // console.log(data);

const embeddings = new MistralAIEmbeddings({
    apiKey : process.env.MISTRAL_API_KEY,
    model:"mistral-embed"
})

// const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 0 })

// const chunks = await splitter.splitText(data.text)
// // console.log(chunks,chunks.length);

// const docs = await Promise.all(chunks.map(async(chunk)=>{
//     const embedding  = await embeddings.embedQuery(chunk)
//     return{
//         text:chunk,embedding
//     }
// }))
// // console.log(docs);

// const result = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embedding,
//         metadata: {
//             text: doc.text
//         }
//     }))
// })

// console.log(result);

const queryEmbedding = await embeddings.embedQuery("how was the internship experience?");




console.log(queryEmbedding)

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})


console.log(JSON.stringify(result))

