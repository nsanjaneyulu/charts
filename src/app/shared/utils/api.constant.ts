export namespace ApiUrls {
  export const signin: string = '/saml2/login';
  export const signout: string = '/saml2/logout';
  export const runAnalysis: string = '/ContentTesting/create';
  export const contentTesttingResult: string = '';
  export const askChatWithAi: string = '/AIChat/ask';
  export const getResult = (id: any, tenant: any) => `/ContentTesting/${id}?tenantId=${tenant}`;
  export const getPredictionData: string = '/PredictionEngineAPI/ImagePrediction';
  export const schedulePost = (id: any) => `/ContentTesting/${id}`;
  export const askAIChat: string = '/AIChat/ask';
}
