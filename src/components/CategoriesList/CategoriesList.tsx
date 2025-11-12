import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from '@mantine/core';
import classes from './CategoriesList.module.scss';
import { ICategoriesPageProps } from '../../interfaces';
import { NEW_CATEGORY_TEXT_BUTTON, ROUTE_CATEGORY, ROUTE_NEW_CATEGORY_PAGE } from '../../constants';

export const CategoriesList: FC<ICategoriesPageProps> = ({ categories }) => {
    const navigate = useNavigate();
    const onEditButtonCLick = (id: string): void => {
        navigate(`${ROUTE_CATEGORY}/${id}`);
    };

    const goToNewCategoryPage = () => {
        navigate(ROUTE_NEW_CATEGORY_PAGE);
    };

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
                                          <Button size='compact-xs' onClick={() => onEditButtonCLick(id)}>
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
