import { EEntityGroupType, EInputType } from './enums';
import { IInput } from './interfaces';

export const NEW_EVENT_TEXT_BUTTON = 'Добавить событие';
export const NEW_CATEGORY_TEXT_BUTTON = 'Добавить категорию';
export const AUTH_TOKEN_TEXT = 'token';
export const ROUTE_ROOT = '/';
export const ROUTE_LOGIN = '/login';
export const ROUTE_EVENTS_PAGE = '/events';
export const ROUTE_EVENT_PAGE = 'event/:id';
export const ROUTE_EVENT = 'event';
export const ROUTE_NEW_EVENT_PAGE = 'new_event';
export const ROUTE_CATEGORY_PAGE = 'category/:id';
export const ROUTE_CATEGORY = 'category';
export const ROUTE_CATEGORIES_PAGE = '/categories';
export const ROUTE_NEW_CATEGORY_PAGE = 'new_category';

export const leftSideBarItems = [
    {
        type: EEntityGroupType.Events,
        name: 'События',
        redirectRoute: ROUTE_EVENTS_PAGE,
    },
    {
        type: EEntityGroupType.Categories,
        name: 'Категории',
        redirectRoute: ROUTE_CATEGORIES_PAGE,
    },
];

export const setOfInputsEvent: IInput[] = [
    {
        name: 'name',
        type: EInputType.Text,
        label: 'Название',
        defaultValue: '',
        value: '',
        required: true,
        placeholder: 'Укажите название',
    },
    {
        name: 'startDate',
        type: EInputType.Date,
        label: 'Дата начала',
        defaultValue: '',
        value: '',
        required: true,
        placeholder: 'Укажите дату начала',
    },
    {
        name: 'endDate',
        type: EInputType.Date,
        label: 'Дата окончания',
        defaultValue: '',
        value: '',
        required: false,
        placeholder: 'Укажите дату окончания',
    },
    {
        name: 'startTime',
        type: EInputType.Time,
        label: 'Время начала',
        defaultValue: '',
        value: '',
        required: false,
        placeholder: 'Укажите время начала',
    },
    {
        name: 'endTime',
        type: EInputType.Time,
        label: 'Время окончания',
        defaultValue: '',
        value: '',
        required: false,
        placeholder: 'Укажите время окончания',
    },
    {
        name: 'place',
        type: EInputType.Text,
        label: 'Место проведения',
        defaultValue: '',
        value: '',
        required: true,
        placeholder: 'Укажите место',
    },
    {
        name: 'url',
        type: EInputType.Text,
        label: 'Ссылка на мероприятие',
        defaultValue: '',
        value: '',
        required: false,
        placeholder: 'Укажите ссылку',
    },
    {
        name: 'lent',
        type: EInputType.Text,
        label: 'Сведения о посте',
        defaultValue: '',
        value: '',
        required: false,
        placeholder: 'Добавьте сведения',
    },
    {
        name: 'category',
        type: EInputType.Select,
        label: 'Категория мероприятия',
        defaultValue: '',
        value: '',
        required: true,
        placeholder: 'Выберите категорию',
    },
];
