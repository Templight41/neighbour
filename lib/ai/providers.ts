import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
// import { gateway } from '@ai-sdk/gateway';
import { isTestEnvironment } from '../constants';
import { google } from '@ai-sdk/google';

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require('./models.mock');
      return customProvider({
        languageModels: {
          'chat-model': chatModel,
          'chat-model-reasoning': reasoningModel,
          'title-model': titleModel,
          'artifact-model': artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        'chat-model': google('gemini-2.5-flash'),
        'chat-model-reasoning': wrapLanguageModel({
          model: google('gemini-2.5-pro'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': google('gemini-2.5-flash-lite'),
        'artifact-model': google('gemini-2.5-flash'),
      },
    });
