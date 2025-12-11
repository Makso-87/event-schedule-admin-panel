import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionIcon, Button, Table } from '@mantine/core';
import cn from 'classnames';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import classes from './CategoriesList.module.scss';
import { ICategoriesPageProps } from '../../interfaces';
import { NEW_CATEGORY_TEXT_BUTTON, ROUTE_CATEGORY, ROUTE_NEW_CATEGORY_PAGE } from '../../constants';
import { ConfirmPopup } from '../ConfirmPopup/ConfirmPopup';
import { getCategories } from '../../api/getCategories';
import { setCategories } from '../../store/slices/categoriesListSlice';
import { deleteCategories } from '../../api/deleteCategories';

export const CategoriesList: FC<ICategoriesPageProps> = ({ categories }) => {
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToCategoryPage = (id: string): void => {
        navigate(`${ROUTE_CATEGORY}/${id}`);
    };

    const goToNewCategoryPage = () => {
        navigate(ROUTE_NEW_CATEGORY_PAGE);
    };

    const deleteCategory = useCallback(async (id: string) => {
        await deleteCategories([id]);
        const { categories } = await getCategories();
        dispatch(setCategories(categories));
    }, []);

    return (
        <div className={classes.CategoriesList}>
            <h1 className={classes.Title}>Категории</h1>

            <Button size='xs' onClick={goToNewCategoryPage} className={classes.NewCategoryButton}>
                {NEW_CATEGORY_TEXT_BUTTON}
            </Button>

            <Table className={classes.CategoriesTable}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Название</Table.Th>
                        <Table.Th>Описание</Table.Th>
                        <Table.Th>Цвет</Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {categories?.length
                        ? categories.map((category) => {
                              const { id, name, color, description } = category;

                              return (
                                  <Table.Tr key={id}>
                                      <Table.Td>{name}</Table.Td>
                                      <Table.Td>{description}</Table.Td>
                                      <Table.Td>
                                          <div className={classes.ColorCircle} style={{ background: color }} />
                                      </Table.Td>
                                      <Table.Td>
                                          <ActionIcon
                                              size='lg'
                                              variant='default'
                                              aria-label='Edit'
                                              className={cn(classes.ActionIconButton, classes.EditEventButton)}
                                              onClick={() => goToCategoryPage(id)}
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
                                                  title={'Вы действительно хотите удалить категорию?'}
                                                  text={`"${categories.find((category) => category.id === id).name}"`}
                                                  buttonSuccessText='Да'
                                                  buttonCancelText='Нет'
                                                  successClickHandler={() => deleteCategory(id)}
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
