import { ICreateEventQueryParams } from '../interfaces';
import { gqlMutation } from '../utils/gqlMutation';
import { CreateEventDocument } from '../generated/graphql';

export const createEvent = (params: ICreateEventQueryParams) => {
    return gqlMutation(CreateEventDocument, { input: params });
};
