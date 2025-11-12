import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './LeftSideBar.module.scss';
import { leftSideBarItems } from '../../constants';
import cn from 'classnames';

export const LeftSideBar = () => {
    const location = useLocation();

    console.log(location);

    return (
        <div className={classes.LeftSideBar}>
            <ul className={classes.List}>
                {leftSideBarItems.map((item) => {
                    const listItemClasses = cn(classes.ListItem, {
                        [classes.Active]: item.type === location.pathname.replace('/', ''),
                    });

                    return (
                        <li className={listItemClasses}>
                            <Link key={Math.random()} to={item.redirectRoute} className={classes.Link}>
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
