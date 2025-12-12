import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateProductDescription = async (productName: string, language: 'en' | 'ur'): Promise<string> => {
  if (!ai) return "API Key missing.";

  const prompt = language === 'ur'
    ? `Write a short, attractive, and selling product description in Urdu for an online shop for the product: "${productName}". Keep it under 2 sentences.`
    : `Write a short, attractive, and selling product description for an online shop for the product: "${productName}". Keep it under 2 sentences.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description.";
  }
};