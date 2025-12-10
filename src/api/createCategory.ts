import { ICreateCategoryQueryParams } from '../interfaces';
import { gqlMutation } from '../utils/gqlMutation';
import { CreateCategoryDocument } from '../generated/graphql';

export const createCategory = (params: ICreateCategoryQueryParams) => {
    return gqlMutation(CreateCategoryDocument, { input: params });
};
