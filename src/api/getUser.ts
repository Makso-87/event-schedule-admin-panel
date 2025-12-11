import { gqlQuery } from '../utils/gqlQuery';
import { MeDocument } from '../generated/graphql';
import { IUser, IUserResponseData } from '../interfaces';

export const getUser = async (): Promise<IUserResponseData> => {
    const { data, errors } = await gqlQuery(MeDocument);

    return { user: data?.me as IUser, errors };
};
