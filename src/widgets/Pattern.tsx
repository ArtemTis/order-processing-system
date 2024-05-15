import { Button, Cascader, CascaderProps, Popover } from 'antd';
import React, { useState } from 'react'
import { companyApi } from '../entities/chats/companyApi';

interface Option {
    value: string;
    label: string;
    children?: Option[];
}



const Pattern = () => {

    // const { data, isLoading, isError } = companyApi.useGetTypesPatternsQuery();
    const { data: res, isLoading: isLoad, isError: isErr } = companyApi.useGetPatternsByTypeQuery();

    const options: Option[] = (res?.data || []).map(pattern => {
        return {
            value: `${pattern.id}`,
            label: pattern.name,
            children: pattern.messagePatterns.map(patternChild => (
                {
                    value: `${patternChild.id}`,
                    label: patternChild.text,
                }
            ))
        }
    })

    const [text, setText] = useState('');
    const onChange: CascaderProps<Option>['onChange'] = (_, selectedOptions) => {
        setText(selectedOptions[1].label);
        // setText(selectedOptions.map((o) => o.label).join(', '));
    };


    return (
        <>
            {text}
            <Cascader options={options} onChange={onChange}>
                <a>Паттерн ответа</a>
            </Cascader>
            {/* <Popover content={content} title="Title" trigger="click">
                <Button>Click me</Button>
            </Popover> */}
        </>
    )
}

export default Pattern
