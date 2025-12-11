import { client } from '../apollo/client';
import { DocumentNode } from 'graphql';
import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import { TGraphQLResponse } from '../types';

export const gqlMutation = async (
    mutation: DocumentNode | TypedDocumentNode<string, unknown>,
    variables: OperationVariables,
) => {
    return client
        .mutate({
            mutation,
            variables,
        })
        .then((res): TGraphQLResponse => {
            const { data, errors } = res as TGraphQLResponse;

            return {
                data,
                errors,
            };
        })
        .catch((error: Error): TGraphQLResponse => {
            return {
                data: null,
                errors: [error],
            };
        });
};
