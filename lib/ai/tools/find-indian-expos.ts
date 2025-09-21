import { tool } from 'ai';
import { z } from 'zod';

export const findIndianExpos = tool({
  description:
    'Search for specific upcoming trade shows, exhibitions, and expos in India. Returns 5 actual expo events with names, dates, venues, contact details, and descriptions.',
  inputSchema: z.object({
    productType: z
      .string()
      .describe(
        'Type of products the seller wants to showcase (e.g., textiles, electronics, food, handicrafts)',
      ),
    location: z
      .string()
      .optional()
      .describe('Preferred location/city in India for the expo'),
    timeframe: z
      .string()
      .optional()
      .describe(
        'When the seller wants to participate (e.g., next 3 months, 2024, Q1 2025)',
      ),
  }),
  execute: async ({ productType, location = '', timeframe = '' }) => {
    const searchContext = {
      productType,
      location: location || 'all major cities in India',
      timeframe: timeframe || 'upcoming events in 2024-2025',
      searchInstructions: [
        `Search for 5 specific upcoming ${productType} expos and trade shows in India ${location ? `particularly in ${location}` : ''}`,
        'Find exact event names, dates, venues, and contact information',
        'Look for registration details, organizer contacts, and event descriptions',
        'Include phone numbers, email addresses, and websites where available',
        'Focus on events happening in the next 6-12 months',
      ],
      requiredDetails: [
        'Event name',
        'Event dates (start and end)',
        'Venue name and full address',
        'Organizer name and contact details (phone, email, website)',
        'Brief description of the expo and its focus',
        'Registration or participation information',
      ],
    };

    return {
      searchRequest: `Please search the web to find 5 specific ${productType} expos in India${location ? ` in ${location}` : ''} and provide detailed information for each`,
      searchContext,
      message: `I'll search for specific ${productType} expos in India now. Let me find actual events with contact details.`,
      instructions:
        'After this tool call, perform web searches to find 5 specific expo events with all the required details including names, dates, venues, organizer contacts, and descriptions.',
    };
  },
});
