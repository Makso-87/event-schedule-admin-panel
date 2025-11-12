import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import classes from './NewEventPage.module.scss';
import { setOfInputsEvent } from '../../constants';

type TState = {
    state: string;
    setState: (value: string) => void;
};

export const NewEventPage = () => {
    const [stateName, setStateName] = useState('');
    const [stateStartDate, setStateStartDate] = useState('');
    const [stateEndDate, setStateEndDate] = useState('');
    const [stateStartTime, setStateStartTime] = useState('');
    const [stateEndTime, setStateEndTime] = useState('');
    const [statePlace, setStatePlace] = useState('');
    const [stateUrl, setStateUrl] = useState('');
    const [stateLent, setStateLent] = useState('');
    const [stateCategory, setStateCategory] = useState('');

    const states: Record<string, TState> = {
        name: { state: stateName, setState: setStateName },
        startDate: { state: stateStartDate, setState: setStateStartDate },
        endDate: { state: stateEndDate, setState: setStateEndDate },
        startTime: { state: stateStartTime, setState: setStateStartTime },
        endTime: { state: stateEndTime, setState: setStateEndTime },
        place: { state: statePlace, setState: setStatePlace },
        url: { state: stateUrl, setState: setStateUrl },
        lent: { state: stateLent, setState: setStateLent },
        category: { state: stateCategory, setState: setStateCategory },
    };

    return (
        <div className={classes.NewEventPage}>
            <h1 className={classes.Title}>Новое событие</h1>

            {setOfInputsEvent.map((item) => {
                return (
                    <TextInput
                        label='Floating label'
                        placeholder='OMG, it also has a placeholder'
                        required
                        classNames={classes}
                        value={states[item.name].state}
                        onChange={(event) => states[item.name].setState(event.currentTarget.value)}
                        mt='md'
                        autoComplete='nope'
                        // data-floating={floating}
                        // labelProps={{ 'data-floating': floating }}
                    />
                );
            })}
        </div>
    );
};
