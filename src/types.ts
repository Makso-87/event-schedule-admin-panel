import { ReactNode } from 'react';

export type TGraphQLResponse = {
    data: Record<string, unknown | null>;
    errors: Error[];
};

export type TProps = {
    children: ReactNode;
};

export type TValidationRulesType = {
    [key: string]: RegExp;
};

export type TState = {
    state: string;
    setState: (value: string) => void;
};
