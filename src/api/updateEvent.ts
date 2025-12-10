import { IUpdateEventQueryParams } from '../interfaces';
import { gqlMutation } from '../utils/gqlMutation';
import { UpdateEventDocument } from '../generated/graphql';

export const updateEvent = (params: IUpdateEventQueryParams) => {
    return gqlMutation(UpdateEventDocument, { input: params });
};
