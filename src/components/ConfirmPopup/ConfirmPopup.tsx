import React from 'react';
import classes from './ConfirmPopup.module.scss';
import { Button } from '@mantine/core';

export const ConfirmPopup = ({
    layout,
    successClickHandler,
    cancelClickHandler,
    title,
    text,
    buttonSuccessText,
    buttonCancelText,
}: {
    layout?: boolean;
    title?: string;
    text?: string;
    buttonSuccessText?: string;
    buttonCancelText?: string;
    successClickHandler?: () => void;
    cancelClickHandler?: () => void;
}) => {
    const popup = (
        <div className={classes.ConfirmPopup}>
            {title ? <h3 className={classes.Title}>{title}</h3> : null}
            {text ? <p className={classes.Text}>{text}</p> : null}

            <div className={classes.Buttons}>
                <Button variant='default' onClick={cancelClickHandler} className={classes.Button}>
                    {buttonCancelText}
                </Button>

                <Button onClick={successClickHandler} className={classes.Button}>
                    {buttonSuccessText}
                </Button>
            </div>
        </div>
    );

    return layout ? <div className={classes.ConfirmPopupLayout}>{popup}</div> : popup;
};
