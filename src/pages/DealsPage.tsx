import { Space, Table, Tag } from 'antd';
import React from 'react'
import { StyledWrapper } from './Settings';
import { dealsApi } from '../entities/chats/dealsApi';
import moment from 'moment';

const { Column, ColumnGroup } = Table;


interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
}

const DealsPage = () => {

    const data: DataType[] = [
        {
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const { data: dealsResponse, isLoading: dealsLoading, isError: dealsError } = dealsApi.useGetAllDealsQuery();

    return (
        <StyledWrapper>
            <h1>Список заказов</h1>


            {
                dealsLoading &&
                <p>Загрузка...</p>
            }

            {
                dealsResponse &&

                <Table dataSource={dealsResponse.data} pagination={false}>
                    {/* <ColumnGroup title="Name">
                    <Column title="Имя" dataIndex="firstName" key="firstName" />
                    <Column title="Last Name" dataIndex="lastName" key="lastName" />
                </ColumnGroup> */}
                    <Column title="Имя" dataIndex="firstName" key="firstName" />
                    <Column title="Почта" dataIndex="age" key="age" />
                    <Column title="Название" dataIndex="desc" key="desc" />
                    <Column title="Сумма" dataIndex="amount" key="amount" />
                    <Column
                        title="Создана"
                        dataIndex="created_at"
                        key="created_at"
                        render={(time: string) => {
                            const formatTime = moment(time).format("hh:mm | D MMM YYYY")
                            return (
                                <>
                                    {
                                        time &&
                                        <>  {formatTime}</>

                                    }
                                </>
                            )
                        }}
                    />
                    <Column
                        title="Закрыта"
                        dataIndex="closed_at"
                        key="closed_at"
                        render={(time: string) => {
                            const formatTime = moment(time).format("hh:mm | D MM")
                            return (
                                <>
                                    {
                                        time ?
                                            <> formatTime </>
                                            :
                                            <>Не закрыто</>
                                    }
                                </>
                            )
                        }}
                    />
                    {/* <Column
                        title="Статус"
                        dataIndex="tags"
                        key="tags"
                        render={(tags: string[]) => (
                            <>
                                {tags.map((tag) => {
                                    let color = tag.length > 5 ? 'geekblue' : 'green';
                                    if (tag === 'loser') {
                                        color = 'volcano';
                                    }
                                    return (
                                        <Tag color={color} key={tag}>
                                            {tag.toUpperCase()}
                                        </Tag>
                                    );
                                })}
                            </>
                        )}
                    /> */}
                    {/* <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: DataType) => (
                        <Space size="middle">
                            <a>Invite {record.lastName}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                /> */}
                </Table>

            }
        </StyledWrapper>
    )
}

export default DealsPage