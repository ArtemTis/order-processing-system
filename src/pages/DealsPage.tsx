import { Space, Table, Tag } from 'antd';
import React, { Fragment } from 'react'
import { StyledWrapper } from './Settings';
import { dealsApi } from '../entities/chats/dealsApi';
import moment from 'moment';
import { IClient, IStatuseDeal } from '../entities/types';
import { STATUS_COLOR } from '../widgets/Statuses';

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
                    {/* <Column title="Почта" dataIndex="age" key="age" /> */}
                    <Column
                        title="Имя"
                        dataIndex="contact_id"
                        key="contact_id"
                        render={(contact: IClient) => {

                            return (
                                <Fragment key={contact.id}>
                                    {contact.name}
                                </Fragment>
                            )
                        }}
                    />
                    <Column title="Название" dataIndex="desc" key="desc" />
                    <Column title="Сумма" dataIndex="amount" key="amount" />
                    <Column
                        title="Статус"
                        dataIndex="status_of_deal_id"
                        key="status_of_deal_id"
                        render={(status: IStatuseDeal) => {
                            return (
                                <Tag color={STATUS_COLOR[status.id] ?? 'geekblue'} key={status.id}>
                                    {status.name}
                                </Tag>
                            );
                        }}
                    />
                    <Column
                        title="Создана"
                        dataIndex="created_at"
                        key="created_at"
                        render={(time: string) => {
                            const formatTime = moment(time).format("hh:mm | D MMM YYYY")
                            return (
                                <Fragment key={time}>
                                    {
                                        time &&
                                        <>{formatTime}</>

                                    }
                                </Fragment>
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
                                <Fragment key={time}>
                                    {
                                        time ?
                                            <> formatTime </>
                                            :
                                            <>Не закрыто</>
                                    }
                                </Fragment>
                            )
                        }}
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

            }
        </StyledWrapper>
    )
}

export default DealsPage