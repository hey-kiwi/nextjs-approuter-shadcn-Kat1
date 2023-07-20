import {NextApiRequest, NextApiResponse} from 'next'
import {OpenAI} from 'langchain'
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter'
import {VectorDBQAChain} from 'langchain/chains'
import * as fs from 'fs'
import {DirectoryLoader} from 'langchain/document_loaders/fs/directory'
import {TextLoader} from 'langchain/document_loaders/fs/text'
import {HNSWLib} from "langchain/vectorstores";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";

const query = async (req: NextApiRequest, res: NextApiResponse) => {
	const model = new OpenAI({
		openAIApiKey: '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'
	})

	const newZealandLoader = new DirectoryLoader(
		'./src/context/newzealand/',
		{
			".txt": (path) => new TextLoader(path)
		}
	)

	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000
	})

	const rules = fs.readFileSync(`./src/context/rules.txt`, 'utf-8')
	const newZealand = await newZealandLoader.load()
	const integration = fs.readFileSync(`./src/context/integration/${req.body.integration}.txt`, 'utf-8')

	const document = await textSplitter.createDocuments([rules, integration], newZealand)

	const vectorStore = await HNSWLib.fromDocuments(document, new OpenAIEmbeddings({
		openAIApiKey: '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'
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