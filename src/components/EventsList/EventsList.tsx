import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from '@mantine/core';
import classes from './EventsList.module.scss';
import { IEventPageProps } from '../../interfaces';
import { getDateRangeString } from '../../utils/getDateRangeString';
import { NEW_EVENT_TEXT_BUTTON, ROUTE_EVENT, ROUTE_NEW_EVENT_PAGE } from '../../constants';

export const EventsList: FC<IEventPageProps> = ({ events }) => {
    const navigate = useNavigate();

    const goToEventPage = (id: string): void => {
        navigate(`${ROUTE_EVENT}/${id}`);
    };

    const goToNewEventPage = () => {
        navigate(ROUTE_NEW_EVENT_PAGE);
    };

    return (
        <div className={classes.EventsList}>
            <h1 className={classes.Title}>События</h1>

            <Button size='xs' onClick={goToNewEventPage} className={classes.NewEventButton}>
                {NEW_EVENT_TEXT_BUTTON}
            </Button>

            <Table className={classes.EventsListTable}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Дата и время проведения</Table.Th>
                        <Table.Th>Название</Table.Th>
                        <Table.Th>Место проведения</Table.Th>
                        <Table.Th>Пост</Table.Th>
                        <Table.Th>Подробнее</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {events?.length
                        ? events.map((event) => {
                              const { startDate, startTime, endDate, endTime, name, place, lent, url, id } = event;

                              return (
                                  <Table.Tr key={id}>
                                      <Table.Td>{`${getDateRangeString({ startDate, startTime, endDate, endTime })}`}</Table.Td>
                                      <Table.Td>{name}</Table.Td>
                                      <Table.Td>{place}</Table.Td>
                                      <Table.Td>{lent ?? ''}</Table.Td>
                                      <Table.Td>{url ?? ''}</Table.Td>
                                      <Table.Td>
                                          <Button size='compact-xs' onClick={() => goToEventPage(id)}>
                                              Редактировать
                                          </Button>
                                      </Table.Td>
                                  </Table.Tr>
                              );
                          })
                        : null}
                </Table.Tbody>
            </Table>
        </div>
    );
};
