import {tavily as Tavily} from '@tavily/core'

const tavily = Tavily({
    apiKey : process.env.TAVILY_API_KEY
})

export const searchInternet = async ({ query }) => {
    try {
        console.log("SEARCH QUERY:", query);

        const response = await tavily.search(query, {
            maxResults: 5,
            searchDepth: "advanced"
        });

        // ✅ important: string return karo
        return response.results?.map(r => r.content).join("\n") 
               || "No results found";

    } catch (error) {
        console.log("Tavily Error:", error);
        return "Error fetching data from internet.";
    }
}