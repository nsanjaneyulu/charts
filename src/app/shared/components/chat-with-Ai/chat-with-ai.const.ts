export const dummyChatResponses: any[] = [
    { prompt: 'Hello', response: 'Hi there! How can I help you today?' },
    { prompt: 'Whats up?', response: 'Not much, just here to assist you!' },
    { prompt: 'Tell me a joke', response: 'Why dont skeletons fight each other? Because they dont have the guts!' },
    { prompt: 'Goodbye', response: 'Goodbye! Have a great day!' }
];

export const defaultPrompts: Array<{ prompt: string }> = [
    { prompt: 'Hashtags to increase the visibility of my content.' },
    { prompt: 'How can I enhance the audio quality of videos?' },
    { prompt: 'How can I improve the quality of my posts?' },
    { prompt: 'What are the best practices for crafting engaging captions?' }
];

// const Content_Testing_Post_Json = {
//     'Organic': true,
//     'socialMdiaPlatform': 'Instagram | TikTok | Meta',
//     'postVersion': [
//         {
//             'postType': 'string ( reel | carousel | image | video ) ',
//             'timeZone': 'string',
//             'scheduleDate': 'string',
//             'scehduleTime': 'string',
//             'media': [
//                 {
//                     'name': 'string',
//                     'base64String': 'string',
//                     'fileType': 'string',
//                 },
//                 {
//                     'name': 'string',
//                     'base64String': 'string',
//                     'fileType': 'string',
//                 },
//             ],
//             'postCaption': 'string', //optional
//             'hashtag': 'string[]' //optional
//         }
//     ]
// }