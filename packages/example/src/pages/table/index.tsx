import { encrypt, useGeetest, usePtable } from '@yyds-npm/utils';
import { Button } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
export default () => {
    const navigate = useNavigate();
    const [Ptable, options] = usePtable(() => {
        console.log('options');
    });
    console.log(options);
    const { search } = options;
    const columns = useMemo(() => {
        return [
            {
                type: 'input',
                title: '仓库名称',
                dataIndex: 'depository_name',
                stitle: '仓库名称',
                align: 'center',
                name: 'depository_name',
                sort: 1,
                // ellipsis: true,
                // tip: '标题过长会自动收缩',
                componentProps: {
                    placeholder: '请输入'
                },

                formItemProps: {
                    initialValue: ''
                }
            },
            {
                type: 'select',
                title: '仓库类型',
                dataIndex: 'depository_type',
                stitle: '仓库类型',
                name: 'depository_type',
                align: 'center',
                sort: 3,
                options: [
                    {
                        key: -1,
                        value: '全部'
                    }
                ],
                componentProps: {
                    placeholder: '请选择'
                },
                formItemProps: {
                    initialValue: -1,
                    rules: []
                }
            },
            {
                title: '所属项目',
                dataIndex: 'project_name',

                align: 'center',

                hideInSearch: true
            },
            {
                type: 'select',
                title: '所属平台',
                dataIndex: 'platform_name',
                stitle: '所属平台',
                name: 'platform_id',
                align: 'center',
                sort: 3,
                options: [
                    {
                        key: -1,
                        value: '全部'
                    }
                ],
                componentProps: {
                    placeholder: '请选择'
                },

                formItemProps: {
                    initialValue: -1
                }
            },
            {
                title: '仓库地址',
                dataIndex: 'depository_url',

                align: 'center',

                hideInSearch: true
            },
            {
                title: '账号',
                dataIndex: 'depository_user',

                align: 'center',

                hideInSearch: true
            },
            {
                title: '操作时间',
                dataIndex: 'create_time',

                align: 'center',
                sort: 3,

                hideInSearch: true
            },
            {
                title: '操作人',
                dataIndex: 'update_by',

                align: 'center',
                sort: 3,

                hideInSearch: true
            },
            {
                title: '操作',
                valueType: 'option',
                align: 'center',
                hideInSearch: true,
                width: 230
            }
        ];
    }, [search]);
    const [gInstance, init] = useGeetest({
        init: true
    });

    return (
        <div>
            <Ptable
                tableProps={{
                    columns
                }}
            />
            <Button
                onClick={() => {
                    gInstance.showCaptcha();
                    console.log(encrypt('cccccccc'));
                }}
            >
                显示极验
            </Button>
            <Button
                onClick={() => {
                    navigate('/');
                }}
            >
                首页
            </Button>
        </div>
    );
};
