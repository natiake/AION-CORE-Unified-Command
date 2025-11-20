import { GoogleGenAI } from "@google/genai";
import { Alert, LogisticAsset, RegionData } from "../types";

// Safe access to process.env for browser environments
const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  return null;
};

const getAIClient = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will operate in offline/mock mode.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSituationReport = async (
  alerts: Alert[],
  assets: LogisticAsset[],
  regions: RegionData[]
): Promise<string> => {
  const ai = getAIClient();
  
  // Fallback if no API key is available
  if (!ai) {
    // Simulate a delay to feel like a real request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `## SITUATION REPORT (OFFLINE MODE)
    
**Status:** System running in secure offline mode.
**Summary:** Automated analysis unavailable. Manual review required.

**Current Statistics:**
- **Active Alerts:** ${alerts.length}
- **Tracked Assets:** ${assets.length}
- **Monitored Regions:** ${regions.length}

**Preliminary Diagnostics:**
- Logistics chain operating within normal parameters.
- Regional risk levels stable in 4/7 sectors.
- Weather patterns monitoring active.

*Please verify API configuration to enable full GenAI capabilities.*`;
  }

  const prompt = `
  You are AION-CORE, the central AI for the National Multi-Force Unified Command Platform of Ethiopia.
  Analyze the following system data and provide a secure, non-tactical, organizational situation report.
  
  **Current Alerts:**
  ${JSON.stringify(alerts)}

  **Logistics Assets:**
  ${JSON.stringify(assets)}

  **Regional Status:**
  ${JSON.stringify(regions)}

  **Format:**
  1. **Executive Summary:** A 2-sentence overview of national status.
  2. **Key Risks:** Bullet points of high-priority items (Risk Score > 40 or High/Critical Alerts).
  3. **Logistics Outlook:** Brief assessment of supply chain health.
  4. **Recommendations:** 2-3 strategic organizational actions.

  Keep the tone professional, authoritative, and concise. Use Markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Report generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating report. Connection to AI core interrupted.";
  }
};

export const generateChatResponse = async (history: string[], message: string): Promise<string> => {
    const ai = getAIClient();
    if (!ai) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return "Secure AI Core Offline. Please check system credentials.";
    }

    const prompt = `
    You are an AI assistant within a government command dashboard. 
    Your role is to assist high-ranking officials with data queries and summaries.
    
    Conversation History:
    ${history.join('\n')}
    
    User Query: ${message}
    
    Provide a helpful, concise response. Do not invent facts outside of general knowledge or typical system capabilities.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "No response generated.";
    } catch (error) {
        console.error("Gemini Chat Error", error);
        return "System Error. Unable to process request.";
    }
}