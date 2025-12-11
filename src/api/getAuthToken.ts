import { gqlMutation } from '../utils/gqlMutation';
import { LoginDocument } from '../generated/graphql';
import { ILoginData, ITokenResponseData } from '../interfaces';

export const getAuthToken = async (loginData: ILoginData): Promise<ITokenResponseData> => {
    const { email, phone, password } = loginData;

    const { data, errors } = await gqlMutation(LoginDocument, {
        input: {
            email,
            phone,
            password,
        },
    });

    return { token: data?.login.toString(), errors };
};
