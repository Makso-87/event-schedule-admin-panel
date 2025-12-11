import { DeleteCategoriesDocument } from '../generated/graphql';
import { gqlMutation } from '../utils/gqlMutation';

export const deleteCategories = (ids: string[]) => {
    return gqlMutation(DeleteCategoriesDocument, { input: { ids } });
};
