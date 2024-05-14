import { Button, Popover } from 'antd';
import React from 'react'
import { companyApi } from '../entities/chats/companyApi';

const Pattern = () => {

    const content = (
        <div style={{ height: '100px', overflowY: 'scroll', scrollbarWidth: 'none' }}>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    const { data, isLoading, isError } = companyApi.useGetTypesPatternsQuery();
    const { data: res, isLoading: isLoad, isError: isErr } = companyApi.useGetPatternsByTypeQuery();

    return (
        <>
            <Popover content={content} title="Title" trigger="click">
                <Button>Click me</Button>
            </Popover>
        </>
    )
}

export default Pattern