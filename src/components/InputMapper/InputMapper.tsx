import React, { ChangeEventHandler } from 'react';
import { ColorInput, Select, TextInput } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import classes from './InputMapper.module.scss';
import { IInput } from '../../interfaces';
import { EInputType } from '../../enums';
import { getDateObject } from '../../utils/getDateObject';

export const InputMapper = ({
    input,
    handler,
    value,
    categoriesSelectData,
}: {
    input: IInput;
    handler: (arg: InputEvent | string) => void | ChangeEventHandler<HTMLInputElement>;
    value: string;
    categoriesSelectData: string[];
}) => {
    const { label, placeholder, name, defaultValue, type, required } = input;

    const inputMap = {
        [EInputType.Text]: (
            <TextInput
                name={name}
                label={label}
                placeholder={placeholder}
                value={value ?? defaultValue}
                // @ts-ignore
                onChange={handler as ChangeEventHandler}
                required={required}
                className={classes.Input}
            />
        ),
        [EInputType.Date]: (
            <DatePickerInput
                name={name}
                label={label}
                placeholder={placeholder}
                onChange={handler}
                firstDayOfWeek={0}
                highlightToday={true}
                locale={'ru'}
                valueFormatter={({ date }) => {
                    if (date) {
                        const dateObject = getDateObject(date as string);
                        return dateObject.toLocaleDateString();
                    }

                    return '';
                }}
                required={required}
                className={classes.Input}
            />
        ),
        [EInputType.Time]: (
            <TimeInput
                name={name}
                label={label}
                value={value}
                // @ts-ignore
                onChange={handler as ChangeEventHandler}
                required={required}
                className={classes.Input}
            />
        ),
        [EInputType.Color]: (
            <ColorInput
                name={name}
                label={label}
                placeholder={placeholder}
                value={value}
                onChange={handler}
                required={required}
                className={classes.Input}
            />
        ),
        [EInputType.Select]: (
            <Select
                name={name}
                label={label}
                placeholder={placeholder}
                data={categoriesSelectData}
                onChange={handler}
                required={required}
                className={classes.Input}
            />
        ),
    };

    return inputMap[type];
};
