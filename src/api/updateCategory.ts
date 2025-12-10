import { IUpdateCategoryQueryParams } from '../interfaces';
import { gqlMutation } from '../utils/gqlMutation';
import { UpdateCategoryDocument } from '../generated/graphql';

export const updateCategory = (params: IUpdateCategoryQueryParams) => {
    return gqlMutation(UpdateCategoryDocument, { input: params });
};
