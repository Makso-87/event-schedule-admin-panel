import { CategoriesDocument } from '../generated/graphql';
import { ICategory } from '../interfaces';
import { gqlQuery } from '../utils/gqlQuery';

export const getCategories = async () => {
    const { data } = await gqlQuery(CategoriesDocument);
    return data.categories as ICategory[];
};
