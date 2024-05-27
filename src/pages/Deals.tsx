import { Space, Table, Tag } from 'antd';
import React from 'react'
import { StyledWrapper } from './Settings';

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

    return (
        <StyledWrapper>
            <h1>Список заказов</h1>


            <Table dataSource={data} pagination={false}>
                {/* <ColumnGroup title="Name">
                    <Column title="Имя" dataIndex="firstName" key="firstName" />
                    <Column title="Last Name" dataIndex="lastName" key="lastName" />
                </ColumnGroup> */}
                <Column title="Имя" dataIndex="firstName" key="firstName" />
                <Column title="Почта" dataIndex="age" key="age" />
                <Column title="Название" dataIndex="address" key="address" />
                <Column title="Сумма" dataIndex="address" key="address" />
                <Column
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
                />
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
        </StyledWrapper>
    )
}

export default DealsPage