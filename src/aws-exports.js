// src/aws-exports.js
const config = {
    Auth: {
        identityPoolId: 'us-east-1:927bded1-9dff-4455-8a59-0d9ca51448f8	', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'us-east-1_IPGoVeMNh', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '71cebpvcjrh6k13bsjiguu9p4h', //OPTIONAL - Amazon Cognito Web Client ID
    },
    // Plus additional services configurations if any (API, Storage, etc.)
};

export default config;
