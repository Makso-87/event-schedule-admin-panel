import { DeleteEventsDocument } from '../generated/graphql';
import { gqlMutation } from '../utils/gqlMutation';

export const deleteEvents = (ids: string[]) => {
    return gqlMutation(DeleteEventsDocument, { input: { ids } });
};
