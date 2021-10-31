import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-2_twjdaxlk7',        
    ClientId: 'odvmadlf3dg8ac6n3pa976bsq'
};

export default new CognitoUserPool(poolData);
