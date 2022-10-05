import { FilterOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { useMount, useUpdateEffect } from 'ahooks';
import type { TablePaginationConfig } from 'antd';
import { message } from 'antd';
import { Col } from 'antd';
import { Row } from 'antd';
import { Select } from 'antd';
import { Divider } from 'antd';
import { Form, Input } from 'antd';
import { Modal } from 'antd';
import { Space } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import {
  CreateSensitiveRule,
  DeleteSensitiveRule,
  GetIndustryDetail,
  GetIndustryInfos,
  GetSensitiveRules,
  UpdateSensitiveRule,
} from '@/apis';

import styles from './style.module.less';
import type {
  DataType,
  industryDetailType,
  IndustryInfoType,
  selectDetailType,
} from './type';

export default function SensitiveRule() {
  const [form] = Form.useForm();
  const [confirmLoading, setComfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [industryInfoFirst, setIndustryInfoFirst] = useState<string>();
  const [industryInfo, setIndustryInfo] = useState<IndustryInfoType[]>();
  const [industryDetailT, setIndustryDetailT] = useState<industryDetailType[]>();
  const [industryDetailFirst, setIndustryDetailFirst] = useState<string>();
  const [industryDetail, setIndustryDetail] = useState<industryDetailType[]>();
  const [industryDetailId, setIndustryDetailId] = useState<number>();
  const [industryInfoAdd, setIndustryInfoAdd] = useState<IndustryInfoType[]>();
  const [industryDetaillAdd, setIndustryDetailAdd] = useState<industryDetailType[]>();
  const [screenDataState, setScreenDataState] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const current: any = pagination.current;
  const pageSize: any = pagination.pageSize;
  const skip = (current - 1) * pageSize;
  const take = pageSize;

  const [record, setRecord] = useState<DataType>();

  let selectObject: selectDetailType;
  if (screenDataState) {
    selectObject = { skip, take, industryTypeId: industryDetailId };
  } else {
    selectObject = { skip, take };
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'num',
      render: (_text, _record, index) => `${(current - 1) * pageSize + index + 1}$`,
      width: '5%',
      align: 'center',
    },
    {
      title: '敏感规则名称',
      dataIndex: 'name',
      width: '10%',
      align: 'center',
    },
    {
      title: '行业信息名称',
      dataIndex: 'industryName',
      width: '10%',
      align: 'center',
      render: (_text, record) => {
        const industryDetailData = industryDetailT?.find((item) => {
          return record.industryTypeId === item.id;
        });

        const industryInfoData = industryInfo?.find((item) => {
          return item.id === industryDetailData?.industryId;
        });

        return <p>{industryInfoData?.industryName}</p>;
      },
    },
    {
      title: '行业详情信息名称',
      dataIndex: 'industryTypeName',
      width: '10%',
      align: 'center',
      render: (_text, record) => {
        const industryDetailData = industryDetailT?.find((item) => {
          return record?.industryTypeId === item.id;
        });
        return <p>{industryDetailData?.industryTypeName}</p>;
      },
    },
    {
      title: '敏感规则内容',
      dataIndex: 'rule',
      width: '10%',
      align: 'center',
    },
    {
      title: '修改时间',
      dataIndex: 'timestamp',
      width: '10%',
      align: 'center',
    },
    {
      title: '操作',
      width: '10%',
      align: 'center',
      render: (_text, record) => (
        <Space size="middle">
          <a onClick={() => showUpdateModal(_text, record)}>修改</a>
          <a onClick={() => showDeleteModal(_text, record)}>删除</a>
        </Space>
      ),
    },
  ];

  const { data: getinduutryiinfosData, refetch: getindustryInfosRefetch } =
    useQuery(GetIndustryInfos);

  const { data: getindustryDetailData, refetch: getindustryDetailRefetch } =
    useQuery(GetIndustryDetail);

  const { data } = useQuery(GetSensitiveRules, {
    variables: selectObject,
    onCompleted: () => {
      setLoading(false);
    },
  });

  const [createSensitiveRule] = useMutation(CreateSensitiveRule, {
    variables: {
      createSensitiveRuleInput: {
        name: '',
        industryTypeId: 1,
        rule: '',
      },
    },
  });

  const [deleteSensitiveRule] = useMutation(DeleteSensitiveRule, {
    variables: { id: record?.id },
    refetchQueries: ['getSensitiveRules'],
  });

  const [updateSensitiveRule] = useMutation(UpdateSensitiveRule, {
    variables: {
      id: record?.id,
      updateSensitiveRuleInput: {
        name: '',
        industryTypeId: 1,
        rule: '',
      },
    },
    refetchQueries: ['getSensitiveRules'],
  });

  const getNewRecord = () => {
    const industryDetailData = industryDetailT?.find((item) => {
      return record?.industryTypeId === item.id;
    });

    const industryInfoData = industryInfo?.find((item) => {
      return item.id === industryDetailData?.industryId;
    });

    const result = industryDetailT?.filter((item) => {
      return item.id === industryInfoData?.id;
    });
    setIndustryDetailAdd(result);

    const newRecord = { ...record, industryInfoId: industryInfoData?.id };

    form.setFieldsValue(newRecord);
  };

  useMount(() => {
    getindustryInfosRefetch();
    getindustryDetailRefetch();
  });

  useUpdateEffect(() => {
    getNewRecord();
    return () => {
      form.resetFields();
    };
  }, [visibleUpdate]);

  useEffect(() => {
    if (data) {
      setPagination((pagination) => {
        return {
          ...pagination,
          total: data.sensitiveRules.total,
        };
      });
    } else {
      setLoading(true);
    }
  }, [data]);

  useEffect(() => {
    if (getinduutryiinfosData && getindustryDetailData) {
      setIndustryInfo(() => getinduutryiinfosData.industryInfos.data);
      setIndustryDetail(() => getindustryDetailData.industryDetails.data);
      setIndustryDetailT(() => getindustryDetailData.industryDetails.data);

      setIndustryInfoAdd(getinduutryiinfosData.industryInfos.data);
      setIndustryDetailAdd(() => getindustryDetailData.industryDetails.data);
    }
  }, [getindustryDetailData, getinduutryiinfosData]);

  const handleOk = () => {
    form.validateFields().then(() => {
      const newRecord: DataType = form.getFieldsValue();
      createSensitiveRule({
        variables: {
          createSensitiveRuleInput: {
            name: newRecord?.name,
            industryTypeId: newRecord?.industryTypeId,
            rule: newRecord?.rule,
          },
        },
        refetchQueries: ['getSensitiveRules'],
      })
        .then(() => {
          message.success('添加成功');
        })
        .catch(() => {
          message.error('添加失败');
        });
      setComfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setComfirmLoading(false);
      }, 500);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOkUpdate = () => {
    form.validateFields().then(() => {
      const newRecord: DataType = form.getFieldsValue();
      updateSensitiveRule({
        variables: {
          id: record?.id,
          updateSensitiveRuleInput: {
            name: newRecord?.name,
            industryTypeId: newRecord?.industryTypeId,
            rule: newRecord?.rule,
          },
        },
        refetchQueries: ['getSensitiveRule'],
      })
        .then(() => {
          message.success('修改成功');
        })
        .catch((res) => {
          message.error('' + res);
        });

      setComfirmLoading(true);
      setTimeout(() => {
        setComfirmLoading(false);
        setVisibleUpdate(false);
      }, 500);
    });
  };

  const handleCancelUpdate = () => {
    setVisibleUpdate(false);
  };

  const handleOkDelete = () => {
    setComfirmLoading(true);
    deleteSensitiveRule({
      variables: { id: record?.id },
      refetchQueries: ['getSensitiveRules'],
    })
      .then(() => {
        setTimeout(() => {
          message.success('删除成功');
          setVisibleDelete(false);
          setComfirmLoading(false);
        }, 500);
      })
      .catch((res) => {
        setTimeout(() => {
          message.error('' + res);
          setVisibleDelete(false);
          setComfirmLoading(false);
        }, 500);
      });
  };

  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };

  const showModal = () => {
    setVisible(true);
    form.resetFields();
  };

  const showUpdateModal = (_text: any, record: DataType) => {
    setVisibleUpdate(true);
    setRecord(record);
  };

  const showDeleteModal = (_text: any, record: DataType) => {
    setVisibleDelete(true);
    setRecord(record);
  };

  const selectIndustryInfo = (v: any) => {
    setIndustryInfoFirst(v);

    const result: any = industryDetailT?.filter((item) => {
      return item.industryId === v;
    });

    setIndustryDetail(result);

    if (result?.length > 0) {
      setIndustryDetailFirst(result[0].industryName);
      setIndustryDetailId(result[0].id);
    } else {
      message.error('当前行业信息下，没有行业详情信息，请重新选择');
      setIndustryInfoFirst('');
      setIndustryDetailFirst('');
      setIndustryDetailId(undefined);
    }
  };

  const selectDetail = (value: any) => {
    setIndustryDetailFirst(value);
    setIndustryDetailId(value);
  };

  const selectIndustryInfoAdd = (v: number) => {
    const result: any = industryDetailT?.filter((item) => {
      return item.industryId === v;
    });
    setIndustryDetailAdd(result);

    if (result.length > 0) {
      form.setFieldsValue({ industryTypeId: result[0].id });
    } else {
      if (visible) {
        message.error('当前行业信息下，没有行业详情信息，请重新选择');
        form.resetFields();
      }
      if (visibleUpdate) {
        message.error('当前行业信息下，没有行业详情信息，请重新选择');
        getNewRecord();
      }
    }
  };

  const screenData = () => {
    if (industryDetailId) {
      setScreenDataState(!screenDataState);
    } else {
      message.info('请选择行业详情信息');
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const { Option } = Select;

  const layout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <>
      <Divider
        style={{ marginTop: '-30px', borderTopWidth: '2px', marginBottom: '10px' }}
      />

      <div className={styles.Sensitiverules}>
        {/* 添加敏感信息规则 */}
        <div className={styles.AddSensitiveRuleButton}>
          <Button type="primary" onClick={showModal}>
            添加敏感信息规则
          </Button>
        </div>

        {/* 添加敏感信息弹窗*/}
        <div className={styles.addSensitiveRuleModal}>
          <Modal
            title="添加敏感信息规则"
            confirmLoading={confirmLoading}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form {...layout} form={form} name="control-hooks">
              <Form.Item
                name="industryName"
                label="行业信息名称"
                rules={[
                  {
                    required: true,
                    message: '请选择行业信息',
                  },
                ]}
              >
                <Select placeholder="请选择行业信息" onChange={selectIndustryInfoAdd}>
                  {industryInfoAdd?.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.industryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="industryTypeName"
                label="行业详情信息"
                rules={[
                  {
                    required: true,
                    message: '请选择行业详情信息',
                  },
                ]}
              >
                <Select placeholder="请选择行业详情信息">
                  {industryDetaillAdd?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.industryTypeName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="sensitiveRuleName"
                label="敏感规则名称"
                rules={[
                  {
                    required: true,
                    message: '请输入敏感规则名称',
                  },
                ]}
              >
                <Input placeholder="请输入敏感规则名称" />
              </Form.Item>
              <Form.Item
                name="sensitiveRuleContent"
                label="敏感规则内容"
                rules={[
                  {
                    required: true,
                    message: '请输入敏感规则内容',
                  },
                ]}
              >
                <Input placeholder="请输入敏感规则内容" />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        {/* 修改敏感信息弹窗*/}

        <Modal
          title="修改敏感信息规则"
          confirmLoading={confirmLoading}
          onOk={handleOkUpdate}
          onCancel={handleCancelUpdate}
          okText="确认"
          cancelText="取消"
        >
          <Form {...layout} form={form} name="control-hooks">
            <Form.Item
              name="industryName"
              label="行业信息名称"
              rules={[
                {
                  required: true,
                  message: '请选择行业信息',
                },
              ]}
            >
              <Select placeholder="请选择行业信息" onChange={selectIndustryInfoAdd}>
                {industryInfoAdd?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.industryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="industryTypeName"
              label="行业详情信息"
              rules={[
                {
                  required: true,
                  message: '请选择行业详情信息',
                },
              ]}
            >
              <Select placeholder="请选择行业详情信息">
                {industryDetaillAdd?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.industryTypeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="sensitiveRuleName"
              label="敏感规则名称"
              rules={[
                {
                  required: true,
                  message: '请输入敏感规则名称',
                },
              ]}
            >
              <Input placeholder="请输入敏感规则名称" />
            </Form.Item>
            <Form.Item
              name="sensitiveRuleContent"
              label="敏感规则内容"
              rules={[
                {
                  required: true,
                  message: '请输入敏感规则内容',
                },
              ]}
            >
              <Input placeholder="请输入敏感规则内容" />
            </Form.Item>
          </Form>
        </Modal>
        {/* 删除敏感规则弹窗*/}
        <Modal
          title="确认提示"
          onOk={handleOkDelete}
          onCancel={handleCancelDelete}
          okText="确认"
          cancelText="取消"
          confirmLoading={confirmLoading}
          visible={visibleDelete}
        >
          请确定删除该条敏感规则
        </Modal>

        {/* 数据总数和筛选框 */}
        <div className={styles.SensitiRulesTable}>
          <div className={styles.SensitiveRuleTotal}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={2}>
                <h1>数据总数({pagination.total})</h1>
              </Col>
              <Col span={2} offset={10}>
                <Space>
                  <Select
                    placeholder="请选择行业信息"
                    value={industryInfoFirst}
                    onChange={selectIndustryInfo}
                    style={{ width: '200px' }}
                  >
                    {industryInfo?.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.industryName}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    placeholder="请选择行业详情信息"
                    value={industryDetailFirst}
                    onChange={selectDetail}
                    style={{ width: '200px' }}
                  >
                    {industryDetail?.map((item: any) => (
                      <Option key={item.id} value={item.id}>
                        {item.industryTypeName}
                      </Option>
                    ))}
                  </Select>
                  <Button type="primary" onClick={screenData} icon={<FilterOutlined />}>
                    {screenDataState ? '取消' : '筛选'}
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>

          <Divider style={{ marginTop: '0px' }} />
          <Table
            columns={columns}
            dataSource={data?.SensitiveRule.data}
            rowKey={(record) => record?.id}
            pagination={pagination}
            loading={Loading}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </>
  );
}
