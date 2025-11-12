import { ReactNode } from 'react';

export type TGraphQLResponse = {
    data: Record<string, unknown | null>;
    errors: Error[];
};

export type TProps = {
    children: ReactNode;
};
