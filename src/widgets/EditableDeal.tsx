import { Form, Input, InputNumber, Select } from 'antd';
import React, { useState } from 'react'
import { dealsApi } from '../entities/chats/dealsApi';



interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'select';
    record: Item;
    index: number;
}

const EditableDeal: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const [selectedStatus, setSelectedStatus] = useState<string>();

    const handleChange = (value: string) => {
        setSelectedStatus(value);
    };

    const { data: resStatus, isLoading: isLoadingStatus, isError: isErrorStatus } = dealsApi.useGetAllStatusesOfDealQuery();
    let inputNode = 
    inputType === 'number' ?
        <InputNumber />
        : 'select' ?
            <Select
                style={{ width: 220 }}
                onChange={handleChange}
                placeholder='Статус'
                options={
                    resStatus?.data.map(status => {
                        return { value: status.id, label: status.name }
                    })
                }
            />
            : <Input />;
    

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableDeal;