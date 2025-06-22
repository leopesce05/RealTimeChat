import OpenAI from 'openai';

class OpenAIService {
    private client: OpenAI;
    private defaultModel: string = 'gpt-4o-mini';
    private defaultMaxTokens: number = 1000;
    private defaultTemperature: number = 0.7;

    constructor(apiKey: string) {
        this.client = new OpenAI({
            apiKey: apiKey
        });
    }

    async generateResponse(prompt: string): Promise<string> {
        try {
            const completion = await this.client.chat.completions.create({
                model: this.defaultModel,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: this.defaultMaxTokens,
                temperature: this.defaultTemperature
            });

            return completion.choices[0]?.message?.content || 'No response generated';
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw error;
        }
    }

    // Método para cambiar el modelo si es necesario
    setModel(model: string): void {
        this.defaultModel = model;
    }

    // Método para cambiar la temperatura si es necesario
    setTemperature(temperature: number): void {
        this.defaultTemperature = temperature;
    }

    // Método para cambiar el número máximo de tokens si es necesario
    setMaxTokens(maxTokens: number): void {
        this.defaultMaxTokens = maxTokens;
    }
}

export { OpenAIService };
export default OpenAIService; 