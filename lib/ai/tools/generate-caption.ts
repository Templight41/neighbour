import { tool } from 'ai';
import { z } from 'zod';

export const generateCaption = tool({
  description: 'Generate a caption or description for images in the conversation. Use this when users ask for captions, descriptions, or want to know what is in their attached images.',
  inputSchema: z.object({
    style: z.enum(['casual', 'formal', 'creative', 'social_media']).optional().default('casual').describe('The style of caption to generate'),
    length: z.enum(['short', 'medium', 'long']).optional().default('medium').describe('The desired length of the caption'),
  }),
  execute: async ({ style, length }) => {
    console.log('generatecaption tool called');

    const styleInstructions = {
      casual: "Write in a friendly, conversational tone",
      formal: "Write in a professional, descriptive tone", 
      creative: "Write in an artistic, imaginative tone with vivid language",
      social_media: "Write in an engaging, hashtag-friendly tone perfect for social media"
    };

    const lengthInstructions = {
      short: "Keep it brief - one concise sentence",
      medium: "Write 2-3 sentences with good detail",
      long: "Write a detailed paragraph with rich description"
    };

    const instructions = `${styleInstructions[style]}. ${lengthInstructions[length]}. Focus on the main subjects, emotions, actions, setting, and any interesting details in the image.`;

    return {
      instructions,
      style,
      length,
      message: `I'll analyze the image(s) and create a ${style} ${length} caption. ${instructions}`,
      success: true
    };
  },
});