import { NextApiRequest, NextApiResponse } from 'next'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { VectorDBQAChain } from 'langchain/chains'
import * as fs from 'fs'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import path from 'path'
import { OpenAI } from 'langchain'
import { HNSWLib } from 'langchain/vectorstores'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const query = async (req: NextApiRequest, res: NextApiResponse) => {
	const model = new OpenAI({
		openAIApiKey: OPENAI_API_KEY
	})

	const newZealandLoader = new DirectoryLoader(
		path.join(process.cwd(), '/src/context/newzealand/'),
		{ '.txt': (path) => new TextLoader(path) }
	)

	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000
	})


	const rules = fs.readFileSync(path.join(process.cwd(), `/src/context/rules.txt`), 'utf-8')
	const newZealand = await newZealandLoader.load()
	const integration = fs.readFileSync(path.join(process.cwd(), `src/context/integration/${req.body.integration}.txt`), 'utf-8')

	const document = await textSplitter.createDocuments([rules, integration], newZealand)

	const vectorStore = await HNSWLib.fromDocuments(document, new OpenAIEmbeddings({
		openAIApiKey: OPENAI_API_KEY
	}))

	const chain = VectorDBQAChain.fromLLM(model, vectorStore)

	const result = await chain.call({
		input_documents: document,
		query: req.body.query
	})

	res.send({
		result: result || ''
	})
}

export default query