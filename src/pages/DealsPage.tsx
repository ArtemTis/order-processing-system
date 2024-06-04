import { Button, Form, Popconfirm, Select, Space, Table, TableColumnsType, TableProps, Tag, Typography } from 'antd';
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { StyledButton, StyledWrapper } from './Settings';
import { dealsApi } from '../entities/chats/dealsApi';
import moment from 'moment';
import { IClient, IDeal, IStatuseDeal } from '../entities/types';
import { STATUS_COLOR } from '../widgets/Statuses';
import { DeleteOutlined, DownSquareOutlined, EditOutlined, FilterOutlined } from '@ant-design/icons';
import EditableDeal from '../widgets/EditableDeal';
import DealModal from '../shared/ui/DealModal';
import styled from 'styled-components';

const { Column, ColumnGroup } = Table;


// interface DataType {
//     key: React.Key;
//     name: string;
//     desc: string;
//     amount: number;
//     status_of_deal_id: ReactElement;
//     created_at: string;
//     closed_at: string;
// }

interface DataType {
    key: number;
    id: number;
    desc: string;
    amount: number;
    status_of_deal_id: IStatuseDeal;
    created_at: string;
    closed_at: string;
    contact_id: IClient;
    isSendToCrm: boolean
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Имя',
        dataIndex: 'contact_id',
        showSorterTooltip: { target: 'full-header' },
        sorter: (a, b) => a.contact_id.name.length - b.contact_id.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Название',
        dataIndex: 'desc',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.desc.length - b.desc.length,
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Статус',
        dataIndex: 'status_of_deal_id',
        defaultSortOrder: 'descend',
        //   sorter: (a, b) => a.status_of_deal_id.props.length - b.amount,
    },
    {
        title: 'Создана',
        dataIndex: 'created_at',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => +a.created_at - +b.created_at,
    },
    {
        title: 'Закрыта',
        dataIndex: 'closed_at',
    }
];

const DealsPage = () => {

    const { data: dealsResponse, isLoading: dealsLoading, isError: dealsError } = dealsApi.useGetAllDealsQuery();
    const { data: resStatus, isLoading: isLoadingStatus, isError: isErrorStatus } = dealsApi.useGetAllStatusesOfDealQuery();

    const [updateDeal] = dealsApi.useUpdateDealMutation();
    const [deleteDeal] = dealsApi.useDeleteDealMutation();

    const statuses = resStatus?.data.map(status => {
        return {
            text: status.name,
            value: status.name,
        }
    })

    const data = dealsResponse?.data.map((deal, ind) => {
        return {
            ...deal,
            key: ind
        }
    })

    const handleDelete = (id: number) => {
        // const newData = dataSource.filter((item) => item.key !== key);
        // setDataSource(newData);
        try {
            deleteDeal(id)
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = () => {
        try {
            updateDeal({
                dealId: 1,
                body: {
                    desc: '',
                    amount: 10,
                    status_of_deal_id: 1
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editableDeal, setEditableDeal] = useState<IDeal>();
    const addDealModal = (deal: DataType) => {
        setIsModalOpen(true);
        setEditableDeal(deal);
    }
    const sendToCRM = (deal: DataType) => {

    }

    // const [form] = Form.useForm();
    // const [nData, setNData] = useState<DataType[] | undefined>(data);
    // const [editingKey, setEditingKey] = useState<number>(-1);

    // const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    //     console.log('params', pagination, filters, sorter, extra);
    // };

    // const isEditing = (record: DataType) => record.key === editingKey;

    // const edit = (record: Partial<DataType> & { key: React.Key }) => {
    //     form.setFieldsValue({ name: '', age: '', address: '', ...record });
    //     setEditingKey(record.key);
    // };

    // const cancel = () => {
    //     setEditingKey(-1);
    // };

    // const save = async (key: React.Key) => {
    //     try {
    //         const row = (await form.validateFields()) as DataType;

    //         const newData = [...nData ?? []];
    //         const index = newData.findIndex((item) => key === item.key);
    //         if (index > -1) {
    //             const item = newData[index];
    //             newData.splice(index, 1, {
    //                 ...item,
    //                 ...row,
    //             });
    //             setNData(newData);
    //             setEditingKey(-1);
    //         } else {
    //             newData.push(row);
    //             setNData(newData);
    //             setEditingKey(-1);
    //         }
    //     } catch (errInfo) {
    //         console.log('Validate Failed:', errInfo);
    //     }
    // };


    // const mergedColumns: TableProps['columns'] = columns.map((col) => {
    //     if (!col.editable) {
    //         return col;
    //     }
    //     return {
    //         ...col,
    //         onCell: (record: Item) => ({
    //             record,
    //             inputType: col.dataIndex === 'age' ? 'number' : 'text',
    //             dataIndex: col.dataIndex,
    //             title: col.title,
    //             editing: isEditing(record),
    //         }),
    //     };
    // });


   
    
    return (
        <StyledWrapper>
            <h1>Список сделок</h1>
            {
                dealsLoading &&
                <p>Загрузка...</p>
            }
            {
                dealsResponse &&
                <StyledTableWrapper>
                    {/* <Form form={form} component={false}> */}
                        <Table
                            // components={{
                            //     body: {
                            //         cell: EditableDeal,
                            //     },
                            // }}
                            style={{ height: 400 }}
                            dataSource={data}
                            pagination={false}
                            // columns={columns}
                            // onChange={onChange}
                            showSorterTooltip={{ target: 'sorter-icon' }}
                        >
                            <Column
                                title="Имя"
                                dataIndex="contact_id"
                                key="contact_id"
                                // width={150}
                                sortIcon={() => <DownSquareOutlined />}
                                //@ts-ignore
                                sorter={(a, b) => a.contact_id.name.length - b.contact_id.name.length}
                                sortDirections={['descend']}
                                render={(contact: IClient) => {

                                    return (
                                        <Fragment key={contact.id}>
                                            {contact.name}
                                        </Fragment>
                                    )
                                }}
                            />
                            <Column title="Название" dataIndex="desc" key="desc" width={251} />
                            <Column
                                title="Сумма"
                                dataIndex="amount"
                                key="amount"
                                sortIcon={() => <DownSquareOutlined />}
                                sortDirections={['descend']}
                                // width={104}
                                //@ts-ignore
                                sorter={(a, b) => a.amount - b.amount}
                                render={amount => amount / 100}
                            />
                            <Column
                                title="Статус"
                                dataIndex="status_of_deal_id"
                                key="status_of_deal_id"
                                // width={180}
                                // sortDirections={['descend']}
                                // defaultSortOrder='descend'
                                filters={statuses}
                                sortIcon={() => <DownSquareOutlined />}
                                filterIcon={() => <FilterOutlined />}
                                //@ts-ignore
                                onFilter={(value, record) => record.status_of_deal_id.name.indexOf(value as string) === 0}
                                //@ts-ignore
                                sorter={(a, b) => a.status_of_deal_id.name.length - b.status_of_deal_id.name.length}
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
                                // width={175}
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
                                // width={119}
                                render={(time: string) => {
                                    const formatTime = moment(time).format("hh:mm | D MM")
                                    return (
                                        <Fragment key={time}>
                                            {
                                                time ?
                                                    <> {formatTime} </>
                                                    :
                                                    <>Не закрыто</>
                                            }
                                        </Fragment>
                                    )
                                }}
                            />
                            {/* <Column
                            title="Изменить"
                            dataIndex="update"
                            key="update"
                            render={(_: any, record: DataType) => {
                                const editable = isEditing(record);
                                return editable ? (
                                    <span>
                                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                                            Сохранить
                                        </Typography.Link>
                                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                            <a>Закрыть</a>
                                        </Popconfirm>
                                    </span>
                                ) : (
                                    // <Typography.Link disabled={editingKey !== -1} onClick={() => edit(record)}>
                                    <Typography.Link disabled={editingKey !== -1} onClick={() => editDeal(record)}>
                                        <EditOutlined />
                                    </Typography.Link>
                                );
                            }}
                        /> */}
                            {/* <Column
                                title="Отправить  в CRM"
                                dataIndex="send"
                                key="send"
                                // width={105}
                                render={(_: any, record: DataType) => {
                                    return (
                                        <Button style={{ padding: '3px 6px' }} onClick={() => sendToCRM(record)}>Отправить</Button>
                                    );
                                }}
                            /> */}
                            <Column
                                title="Изменить"
                                dataIndex="update"
                                key="update"
                                // width={105}
                                render={(_: any, record: DataType) => {
                                    return (
                                        <EditOutlined onClick={() => addDealModal(record)} />
                                    );
                                }}
                            />
                            <Column
                                title="Удалить"
                                dataIndex="delete"
                                key="delete"
                                // width={105}
                                render={(_, record) => {
                                    if ((data?.length ?? 0) >= 1) {
                                        return (
                                            //@ts-ignore
                                            <Popconfirm title="Удалить заявку?" onConfirm={() => handleDelete(record.id)}>
                                                <DeleteOutlined />
                                            </Popconfirm>
                                        )
                                    }
                                    return null
                                }}
                            />

                        </Table>
                    {/* </Form> */}

                </StyledTableWrapper>
            }

            <DealModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editableDeal={editableDeal}
                setEditableDeal={setEditableDeal}
            />

        </StyledWrapper>
    )
}

export default DealsPage

const StyledTableWrapper = styled.div`
    scrollbar-width: none;
    height: 300px;
`