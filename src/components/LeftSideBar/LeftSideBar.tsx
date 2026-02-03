import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './LeftSideBar.module.scss';
import { leftSideBarItems, ROUTE_ROOT } from '../../constants';
import cn from 'classnames';

export const LeftSideBar = () => {
    const location = useLocation();

    console.log(location);

    return (
        <div className={classes.LeftSideBar}>
            <ul className={classes.List}>
                {leftSideBarItems.map((item) => {
                    const listItemClasses = cn(classes.ListItem, {
                        [classes.Active]:
                            location.pathname !== ROUTE_ROOT &&
                            item.type.includes(location.pathname.replace(ROUTE_ROOT, '')),
                    });

                    return (
                        <li key={Math.random()} className={listItemClasses}>
                            <Link to={item.redirectRoute} className={classes.Link}>
                                {' '}
                                {item.name}{' '}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
