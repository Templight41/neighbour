import { tool } from 'ai';
import { z } from 'zod';

export const generateCaption = tool({
  description: 'Generate a social media like caption for images in the conversation. Use this when users ask for captions for their attached images.',
  inputSchema: z.object({
  }),
  execute: async () => {
    console.log('generatecaption tool called');

    const instructions = `Focus on the main subjects, emotions, actions, setting, and any interesting details in the image. Only generate a social media like caption.`;

    return {
      instructions,
      message: `I'll analyze the image(s) and create a caption. ${instructions}`,
      success: true
    };
  },
});