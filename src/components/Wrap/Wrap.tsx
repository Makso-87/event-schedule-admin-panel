import React, { FC } from 'react';
import classes from './Wrap.module.scss';
import { TProps } from '../../types';

export const Wrap: FC<TProps> = ({ children }) => {
    return <div className={classes.Wrap}>{children}</div>;
};
