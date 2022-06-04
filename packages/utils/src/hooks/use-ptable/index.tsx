import { Button, Cascader, Checkbox, DatePicker, Form, Input, Radio, Select, Table, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import './index.scss';
const { Option } = Select;
const { RangePicker } = DatePicker;
export const usePtable = (getData, options = {}) => {
    const initOptions = {
        // 其余配置
        pageByHeight: true, // 分页pagesize是否根据高度变化
        addtionParams: {}, // 额外请求参数
        pageParams: {
            // 默认分页参数
            pageSize: 10,
            page: 1
        }
    };

    const _options = {} as any;

    Object.keys(initOptions).forEach((key) => {
        if (typeof options[key] !== 'undefined') {
            if (key === 'pageByHeight') {
                _options[key] = options[key];
            } else {
                _options[key] = {
                    ...initOptions[key],
                    ...options[key]
                };
            }
        } else {
            _options[key] = initOptions[key];
        }
    });

    const [exportObj, setExportObj] = useState({}) as any;

    const defaultPageParams = {
        ..._options.pageParams
    };

    const tableLineHeight = 42;
    const [rheight, setRheight] = useState(0);

    const Ptable = useCallback(
        (props) => {
            const [pform] = Form.useForm();
            const [total, setTotal] = useState(0);
            const [dataSource, setdataSource] = useState([]);
            const { searchProps, tableProps, tableButtons, headerFixed = true } = props;
            const [requestLoading, setrequestLoading] = useState(false);
            const [searchParams, setSearchParams] = useState({}) as any; // 实际请求参数

            const getTableData = useCallback(
                async (params = {}) => {
                    const realParams = {
                        ...searchParams,

                        ...params
                    };
                    delete realParams.timeStamp;
                    console.log('执行到这里');
                    setrequestLoading(true);
                    const rparmas = {};
                    Object.keys(realParams).forEach((key) => {
                        if (typeof realParams[key] === 'string') {
                            rparmas[key] = realParams[key].trim();
                        } else {
                            rparmas[key] = realParams[key];
                        }
                    });
                    const result = await getData(rparmas);
                    console.log(result, '执行到这里');
                    setrequestLoading(false);
                    if (result) {
                        setTotal(result.total);
                        setdataSource(result.list);
                    }
                },
                [getData, searchParams]
            );

            const searchsFromColumns = tableProps.columns
                .filter((item) => !item.hideInSearch)
                .sort((a, b) => a.sort - b.sort);

            const tableColumns = tableProps.columns
                .filter((item) => !item.hideInTable)
                .map((item) => ({
                    ...item,
                    align: 'left'
                }));

            const lColumns = [
                {
                    title: '序号',
                    dataIndex: 'index',
                    align: 'center',
                    width: 60,
                    fixed: 'left',
                    hideInSearch: true,
                    render: (text, record, index) => {
                        return index + 1 + (searchParams.page - 1) * searchParams.pageSize;
                    }
                },
                ...tableColumns
            ];
            useEffect(() => {
                const formParams = pform.getFieldsValue();

                // let pageSize = defaultPageParams.pageSize;

                // const bHeight = document.body.clientHeight;
                // const hHeight = document.querySelector('.ant-layout-header').clientHeight;
                // const routeTabHeight = document.querySelector('.routeTabContainer')?.clientHeight || 0;
                // const navHeight = document.querySelector('.navbar').clientHeight;
                // const searchHeight = (searchRef as any).current.clientHeight;
                // const tableHeaderHeight = document.querySelector('.ant-table-thead').clientHeight;
                // const dataHeight =
                //     bHeight - hHeight - navHeight - searchHeight - routeTabHeight - tableHeaderHeight - 56 - 60 - 17;

                // setRheight(dataHeight);
                // if (_options.pageByHeight) {
                //     pageSize = Math.floor(dataHeight / tableLineHeight);
                // }

                setSearchParams((pre) => ({
                    ...pre,
                    ..._options.addtionParams,
                    ...defaultPageParams,
                    ...formParams
                    // pageSize
                }));
            }, []);
            useEffect(() => {
                if (!Object.keys(searchParams).length) {
                    return;
                }

                getTableData({
                    // ...formParams,
                    ...searchParams
                });
            }, [searchParams, getTableData]);

            useEffect(() => {
                console.log('ccccccccccc');
                setExportObj({
                    searchParams,
                    search: getTableData,
                    total,
                    dataSource
                });
            }, [searchParams, getTableData, dataSource, getData, total]);
            /* 
            根据类型渲染不同组件
            */
            const renderComponentByType = (obj) => {
                if (obj.type === 'select') {
                    return (
                        <Select
                            style={{
                                width: '180px'
                            }}
                            {...obj.componentProps}
                        >
                            {obj.options.map((item) => (
                                <Option key={item.key} value={item.key}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    );
                }
                if (obj.type === 'check-box') {
                    return (
                        <Checkbox.Group
                            style={{
                                width: '180px'
                            }}
                            {...obj.componentProps}
                        >
                            {obj.options.map((item) => (
                                <Checkbox value={item.key} key={item.key}>
                                    {item.value}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    );
                }

                if (obj.type === 'radio') {
                    return (
                        <Radio.Group
                            style={{
                                width: '180px'
                            }}
                            {...obj.componentProps}
                        >
                            {obj.options.map((item) => (
                                <Radio value={item.key} key={item.key}>
                                    {item.value}
                                </Radio>
                            ))}
                        </Radio.Group>
                    );
                }
                if (obj.type === 'datePicker') {
                    return (
                        <DatePicker
                            style={{
                                width: '180px'
                            }}
                            {...obj.componentProps}
                        />
                    );
                }
                if (obj.type === 'date-rangePicker') {
                    return (
                        <RangePicker
                            style={{
                                width: '240px'
                            }}
                            {...obj.componentProps}
                        />
                    );
                }
                if (obj.type === 'cascader') {
                    return (
                        <Cascader
                            options={obj.options}
                            style={{
                                width: '240px'
                            }}
                            {...obj.componentProps}
                        />
                    );
                }
                return (
                    <Input
                        style={{
                            width: '180px'
                        }}
                        {...obj.componentProps}
                    />
                );
            };
            console.log(dataSource, '99999999999999');
            return (
                <>
                    <div className={'p-ui-searchContainer'}>
                        {searchsFromColumns.length ? (
                            <Form
                                form={pform}
                                className={'p-ui-searchForm'}
                                name="basic"
                                initialValues={{ remember: true }}
                                // autoComplete="off"
                            >
                                {searchsFromColumns.map((item, index) => {
                                    return (
                                        <div className={'p-ui-formItemContainer'} key={index}>
                                            {item.stitle ? (
                                                item.isToolTip ? (
                                                    <Tooltip title={item.stitle}>
                                                        <span className={'p-ui-title'}>{item.stitle}</span>
                                                    </Tooltip>
                                                ) : (
                                                    <span className={'p-ui-title'}>{item.stitle}：</span>
                                                )
                                            ) : null}

                                            <Form.Item name={item.name} {...item.formItemProps}>
                                                {renderComponentByType(item)}
                                            </Form.Item>
                                        </div>
                                    );
                                })}
                                <Button
                                    loading={requestLoading}
                                    className={'p-ui-searchClassName'}
                                    onClick={() => {
                                        setSearchParams((pre) => {
                                            return {
                                                ...pre,
                                                ...pform.getFieldsValue(),
                                                page: 1
                                            };
                                        });
                                    }}
                                >
                                    {searchProps?.searchText || '查询'}
                                </Button>
                                <Button
                                    className={'p-ui-resetClassName'}
                                    onClick={() => {
                                        pform.resetFields();
                                        setSearchParams((pre) => {
                                            return {
                                                ...pre,
                                                ...pform.getFieldsValue(),
                                                ...defaultPageParams
                                            };
                                        });
                                    }}
                                >
                                    {searchProps?.resetText || '重置'}
                                </Button>
                                {searchProps && searchProps.addtionButtons}
                            </Form>
                        ) : (
                            searchProps && searchProps.addtionButtons
                        )}

                        {searchProps && searchProps.elementRight && searchProps.elementRight()}
                    </div>

                    <div className={'p-ui-tableContainer'}>
                        {tableButtons && tableButtons()}
                        <Table
                            loading={requestLoading}
                            dataSource={dataSource}
                            rowKey={'id'}
                            {...tableProps}
                            pagination={{
                                // hideOnSinglePage: false,

                                ...tableProps.pagination,
                                pageSize: searchParams.pageSize,
                                showSizeChanger: true,
                                current: searchParams.page,
                                total,
                                onChange: (page) => {
                                    setSearchParams((pre) => ({
                                        ...pre,
                                        page
                                    }));

                                    // getProjectBySiteId(siteRecord);
                                },

                                showQuickJumper: true,
                                showTotal: (total, range) => {
                                    return (
                                        <div>
                                            共 <span className="p-ui-total p-ui-pcolor">{total}</span>
                                            <span> 条记录</span>,<span> 第 </span>
                                            <span>
                                                <span className={'p-ui-pcolor'}>{searchParams.page}</span>
                                                <span>/</span>
                                                <span className={'p-ui-pcolor'}>
                                                    {Math.ceil(total / searchParams.pageSize)}
                                                </span>
                                            </span>
                                            <span> 页</span>
                                        </div>
                                    );
                                },
                                onShowSizeChange: (current, size) => {
                                    setSearchParams((pre) => ({
                                        ...pre,
                                        pageSize: size
                                    }));
                                }
                            }}
                            columns={lColumns}
                            rowClassName={(record, index) => {
                                if (index % 2 === 0) {
                                    return 'evenRow';
                                }
                                return 'oddRow';
                            }}
                            scroll={{
                                ...tableProps.scroll
                                // y: headerFixed ? rheight : null
                            }}
                            size="small"
                        ></Table>
                    </div>
                </>
            );
        },
        [rheight]
    );

    return [Ptable, exportObj];
};
