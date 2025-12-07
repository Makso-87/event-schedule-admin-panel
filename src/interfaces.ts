import React from 'react';
import { EInputType, EResponseStatus } from './enums';

export interface IRootPagesProps {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface ILoginData {
    email?: string;
    phone?: string;
    password: string;
}

export interface ITokenResponseData {
    token: string;
    errors: Error[];
}

export interface IUserResponseData {
    user: IUser;
    errors: Error[];
}

export interface ILoginResponseData {
    status: EResponseStatus;
    errors?: Error[];
}

export interface IUser {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    phone?: string;
}

export interface ICategory {
    id: string;
    name: string;
    color: string;
    description: string;
    events: IEvent[];
}

export interface IEvent {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    place: string;
    url: string;
    lent: string;
    category: ICategory;
}

export interface IEventPageProps {
    events: IEvent[];
}
export interface ICategoriesPageProps {
    categories: ICategory[];
}

export interface IAuthContext {
    user: IUser;
    login: (loginData: ILoginData) => void;
    logout: () => void;
}

export interface ICategoriesState {
    categories: ICategory[];
}
export interface IEventsState {
    events: IEvent[];
}

export interface IEventState {
    event: IEvent;
}

export interface ICategoryState {
    category: ICategory | null;
}

export interface IUserState {
    user: IUser | null;
    status: EResponseStatus;
    errors: Error[];
}
export interface IInput {
    name: string;
    label: string;
    type: EInputType;
    defaultValue: string;
    placeholder: string;
    value: string;
    required: boolean;
}

export interface ICreateEventQueryParams {
    name: string;
    startDate: Date;
    endDate?: Date;
    startTime?: string;
    endTime?: string;
    place: string;
    categoryId: string;
    lent?: string;
}
