import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Table } from '@mantine/core';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import cn from 'classnames';
import classes from './EventsList.module.scss';
import { IEventPageProps } from '../../interfaces';
import { getDateRangeString } from '../../utils/getDateRangeString';
import { NEW_EVENT_TEXT_BUTTON, ROUTE_EVENT, ROUTE_NEW_EVENT_PAGE } from '../../constants';
import { ConfirmPopup } from '../ConfirmPopup/ConfirmPopup';
import { deleteEvents } from '../../api/deleteEvents';
import { getEvents } from '../../api/getEvents';
import { setEvents } from '../../store/slices/eventsListSlice';
import { useDispatch } from 'react-redux';

export const EventsList: FC<IEventPageProps> = ({ events }) => {
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToEventPage = (id: string): void => {
        navigate(`${ROUTE_EVENT}/${id}`);
    };

    const goToNewEventPage = () => {
        navigate(ROUTE_NEW_EVENT_PAGE);
    };

    const deleteEvent = useCallback(async (id: string) => {
        await deleteEvents([id]);
        const eventsList = await getEvents();
        dispatch(setEvents(eventsList));
    }, []);

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
                                          <ActionIcon
                                              size='lg'
                                              variant='default'
                                              aria-label='Edit'
                                              className={cn(classes.ActionIconButton, classes.EditEventButton)}
                                              onClick={() => goToEventPage(id)}
                                          >
                                              <AiFillEdit size='24' className={classes.Icon} />
                                          </ActionIcon>

                                          <ActionIcon
                                              size='lg'
                                              variant='default'
                                              aria-label='Delete'
                                              className={cn(classes.ActionIconButton, classes.DeleteEventButton)}
                                              onClick={() => setShowConfirmDeletePopup(id)}
                                          >
                                              <AiFillDelete size='24' className={classes.Icon} />
                                          </ActionIcon>

                                          {showConfirmDeletePopup === id ? (
                                              <ConfirmPopup
                                                  title={'Вы действительно хотите удалить событие?'}
                                                  text={`"${events.find((event) => event.id === id).name}"`}
                                                  buttonSuccessText='Да'
                                                  buttonCancelText='Нет'
                                                  successClickHandler={() => deleteEvent(id)}
                                                  cancelClickHandler={() => setShowConfirmDeletePopup(null)}
                                              />
                                          ) : null}
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
