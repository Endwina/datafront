import { useMutation, useQuery } from '@apollo/client';
import type { TablePaginationConfig } from 'antd';
import { message } from 'antd';
import { Divider } from 'antd';
import { Form, Input } from 'antd';
import { Modal } from 'antd';
import { Space } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import {
  CreateIndustryInfo,
  DeleteIndustryInfo,
  GetIndustryInfos,
  UpdateIndustryInfo,
} from '@/apis';

import styles from './styles.module.less';
import type { DataType } from './types';

export default function IndustryInifo() {
  const [loading, setLoading] = useState(false);
  // 弹窗方法
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // 表格
  const [record, setRecord] = useState<DataType>();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  // 记录表格页码数
  const current: any = pagination.current;
  const pageSize: any = pagination.pageSize;
  const skip = (current - 1) * pageSize;
  const take = pageSize;
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'num',
      render: (_text, _record, index) => `${(current - 1) * pageSize + index + 1}`,
      width: '10%',
      align: 'center',
    },
    {
      title: '行业信息名称',
      dataIndex: 'industryName',
      width: '40%',
      align: 'center',
    },
    {
      title: '修改时间',
      dataIndex: 'timestamp',
      width: '20%',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showUpdateModal(text, record)}>修改</a>
          <a onClick={() => showDeleteModal(text, record)}>删除</a>
        </Space>
      ),
    },
  ];
  // 查询：得到行业信息列表，client下使用useQuery
  const { data } = useQuery(GetIndustryInfos, {
    variables: { skip, take },
    onCompleted: () => {
      setLoading(false);
    },
  });
  // 删除：client下使用useMutation
  const [deleteindustryinfo] = useMutation(DeleteIndustryInfo, {
    variables: { id: record?.id },
    refetchQueries: ['getindustryinfos'],
  });
  // 插入：新建行业信息调用的接口
  const [createindustryinfo] = useMutation(CreateIndustryInfo, {
    variables: { industryName: '' },
    refetchQueries: ['getindustryinfos'],
  });
  // 修改：修改行业信息调用的接口
  const [updateindustryinfo] = useMutation(UpdateIndustryInfo, {
    variables: {
      id: record?.id,
      industryName: record?.industryName,
    },
    refetchQueries: ['getindustryinfos'],
  });

  const [form] = Form.useForm();

  // data变化
  useEffect(() => {
    // 只要data不为空就可以对pagination设置
    if (data) {
      setPagination((pagination) => {
        return {
          ...pagination,
          total: data.industryInfos.total,
        };
      });
    } else {
      setLoading(true);
    }
  }, [data]);
  // 打开或关闭增加信息窗口
  const showModal = () => {
    setVisible(true);
    form.resetFields();
  };
  // 打开或关闭删除信息窗口
  const showDeleteModal = (_text: any, record: DataType) => {
    setVisibleDelete(true);
    setRecord(record);
  };
  // 打开或关闭修改信息窗口
  const showUpdateModal = (_text: any, record: DataType) => {
    setVisibleUpdate(true);
    setRecord(record);
  };
  // 弹窗：插入页面，确定以后执行的方法
  const handleOk = () => {
    // 表单检验成功以后继续往下执行
    form.validateFields().then(() => {
      const newRecord: DataType = form.getFieldsValue();
      createindustryinfo({
        variables: { industryName: newRecord.industryName },
        refetchQueries: ['getindustryinfos'],
      })
        .then(() => {
          message.success('添加成功');
        })
        .catch(() => {
          message.error('添加失败');
        });

      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 500);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // 弹窗：删除行业信息页面，确定以后执行方法
  const handleOkDelete = () => {
    setConfirmLoading(true);

    deleteindustryinfo({
      variables: { id: record?.id },
    })
      .then(() => {
        setTimeout(() => {
          setVisibleDelete(false);
          setConfirmLoading(false);
          message.success('删除成功');
        }, 500);
      })
      .catch((res) => {
        setTimeout(() => {
          setVisibleDelete(false);
          setConfirmLoading(false);
          message.error('' + res);
        }, 500);
      });
  };
  // 弹窗：删除行业信息取消后执行
  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };
  // 弹窗：修改信息页面，确定后执行
  const handleOkUpdate = () => {
    const newRecord: DataType = form.getFieldsValue();
    form.validateFields().then(() => {
      updateindustryinfo({
        variables: {
          id: record?.id,
          industryName: newRecord?.industryName,
        },
        refetchQueries: ['getindustryinfos'],
      })
        .then(() => {
          message.success('修改成功');
        })
        .catch((res) => {
          message.error('' + res);
        });
      setConfirmLoading(true);
      setTimeout(() => {
        setVisibleUpdate(false);
        setConfirmLoading(false);
      }, 500);
    });
  };
  // 弹窗：修改信息页面取消后执行
  const handleCancelUpdate = () => {
    setVisible(false);
  };
  // 每次点击标签页进行的改变，主要改变了页码数
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  return (
    <>
      <Divider
        style={{ marginTop: '-30px', borderTopWidth: '2px', marginBottom: '10px' }}
      />

      <div className={styles.IndustryInfo}>
        {/* 添加行业信息按钮 */}
        <div className={styles.AddIndustryInfoButton}>
          <Button type="primary" onClick={showModal}>
            添加行业信息
          </Button>
        </div>

        {/* 添加行业信息的弹框*/}
        <div className={styles.addIndustyInfo}>
          <Modal
            title="添加行业信息"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 6 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="行业信息名称"
                name="industryName"
                rules={[{ required: true, message: '请输入行业信息名称' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>

        {/* 删除行业信息*/}
        <Modal
          title="确认提示"
          visible={visibleDelete}
          onOk={handleOkDelete}
          confirmLoading={confirmLoading}
          onCancel={handleCancelDelete}
          okText="确认"
          cancelText="取消"
        >
          请确定删除该信息
        </Modal>

        {/* 修改行业信息*/}
        <div className={styles.addIndustyInfo}>
          <Modal
            title="修改行业信息"
            visible={visibleUpdate}
            onOk={handleOkUpdate}
            confirmLoading={confirmLoading}
            onCancel={handleCancelUpdate}
            okText="确认"
            cancelText="取消"
          >
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 6 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="行业信息名称"
                name="industryName"
                rules={[{ required: true, message: '请输入行业信息名称' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>

        {/* 展示表格和数据总数 */}
        <div className={styles.IndutsryInfoTable}>
          <div className={styles.total}>数据总数({pagination.total})</div>
          <Divider style={{ marginTop: '0px' }} />
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data?.industryInfos.data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
          ></Table>
        </div>
      </div>
    </>
  );
}
