import { Cascader, CascaderProps } from 'antd'
import React from 'react'
import star from '../shared/assets/star.svg'
import { companyApi } from '../entities/chats/companyApi';

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

interface IProps {
    setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const ChatPatterns:React.FC<IProps> = ({setInputValue}) => {

    const { data: res, isLoading: isLoad, isError: isErr } = companyApi.useGetPatternsByTypeQuery();

    const onChange: CascaderProps<Option>['onChange'] = (_, selectedOptions) => {
        setInputValue(selectedOptions[1]?.label)
    };

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
    
    return (
        <Cascader options={options} onChange={onChange}>
            {/* <a>Паттерн ответа</a> */}
            <img src={star} alt="Паттерн ответа" />
        </Cascader>
    )
}

export default ChatPatterns