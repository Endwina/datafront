// import { GetIndustryInfos } from "@/apis";
// import { FilterOutlined } from "@ant-design/icons";
// import { useMutation, useQuery } from "@apollo/client";
// import { useMount,  } from "ahooks";
// import { Button, Col, Divider, Form, Input, message, Modal,
//      Row, Select, Space, Table, TablePaginationConfig } from "antd";
// import { ColumnsType } from "antd/lib/table";
// import { useEffect, useState } from "react";

// import type { DataType, } from "../IndustryInfo/types";

// export default function IndustryDetailInfo() {

//     // 表格：每一行中的数据
//     const [record, setRecord] = useState<DataType>();
//     const [loading, setLoading] = useState(false);
//     //弹窗方法
//     const [visible, setVisible] = useState(false);
//     const [visibleUpdate, setVisibleUpdate] = useState(false);
//     const [visibleDelete, setVisibleDelete] = useState(false);
//     const [confirmLoading, setConfirmLoading] = useState(false);
//     const [pagination, setPagination] = useState<TablePaginationConfig>({
//         current: 1,
//         pageSize: 10,
//     });
//     // 记录所选行业id
//     const [IndustryInfoId, setIndustryInfoId] = useState(Number);
//     // 筛选按钮状态
//     const [screenDataState, setScreenDataState] = useState(false);
//     // 储存一级分类变量
//     const [industryInfo, setindustryInfo] = useState<IndustryInfoType[]>;
//     // 记录表格页码数
//     const current: any = pagination.current;
//     const pageSize: any = pagination.pageSize;
//     const skip = (current -1) * pageSize;
//     const take = pageSize;
//     //设置筛选逻辑
//     let selectObject: selectObjectType;
//     if (screenDataState) {
//         selectObject = {skip, take, industryId: IndustryInfoId};
//     } else {
//         selectObject = {skip, take };
//     }

//     const [form] = Form.useForm();

//     const columns:ColumnsType<DataType> = [
//         {
//             title: '序号',
//             dataIndex: 'num',
//             render:(_text, _record, index) => `${(current - 1) * pageSize + index +1} `,//
//             width: '20%',
//             align: 'center',
//         },
//         {
//             title: '行业详情信息名称',
//             dataIndex: 'industryTypeName',
//             width: '20%',
//             align: 'center',
//         },
//         {
//             title: '行业信息名称',
//             dataIndex: 'industryName',
//             render:(_text, record) => {
//                 const indutryInfoData = industryInfo?.find((item: any) => {
//                     return item.id === record?.id;
//                 });
//                 return <p>{indutryInfoData?.industryName}</p>
//             },//
//             width: '20%',
//             align: 'center',
//         },
//         {
//             title: '修改时间',
//             dataIndex: 'timeStamp',
//             width: '20%',
//             align: 'center',
//         },
//         {
//             title: '操作',
//             width: '20%',
//             align: 'center',
//             render:(_text, record) => (
//                 <Space size="middle">
//                     <a onClick={() => showModalUpdate(_text, record)}>修改</a>
//                     <a onClick={() => showModalDelete(_text, record)}>删除</a>
//                 </ Space>
//             ),
//         },
//     ];

//     // 查询：得到行业信息列表，client下使用useQuery
//     const {data: getindustryInfosData, refetch} = useQuery(
//         GetIndustryInfos,
//         {},
//     );
//     // 查询：得到行业详情信息，client下使用useQUery
//     const { data } = useQuery(GetIndustryDetail,{
//         variables: selectObject,
//         onCompleted: () => {
//             setLoading(false);
//         },},);
//     // 删除：client下使用useMutation
//     const [deleteindustryDetail] = useMutation(DeleteIndustryDetail, {
//         variables: {id: record?.id},
//         refetchQueries: ['getindustryDetail'],
//     });
//     // 修改：client下使用useMutation
//     const [updateindustryDetail] = useMutation(UpdateIndustryDetail, {
//         variables: {
//             id: record?.id,
//             updateindustryDetailInput: {
//                 industryid: record?.id,//?
//                 industryTypeName: '',
//             },
//         },
//         refetchQueries: ['getinudstryDetail'],
//     });
//     // 添加：调用接口
//     const [createindustryDetail] = useMutation(CreateIndustryDetail, {
//         variables: {
//             createindustryDetailInput: {
//                 industryTypeName: '',
//                 industryId: record?.id,
//             },
//         },
//         refetchQueries: ['getindustryDetail'],
//     });

//     // 添加行业信息确认窗口
//     const handleOkCreate = () => {
//         form.validateFields().then(() => {
//             const newRecord: DataType = form.getFieldsValue();
//             createindustryDetail({
//                 variables: {
//                     createindustryDetailInput: {
//                         industryTypeName: newRecord?.industryTypeName,
//                         industryId: newRecord?.id,
//                     },
//                 },
//                 refetchQueries: ['getindustryDetail'],
//             })
//                 .then(() => {
//                     message.success('添加成功');
//                 })
//                 .catch(() => {
//                     message.error('添加失败');
//                 });
//                 setConfirmLoading(true);
//                 setTimeout(() => {
//                     setVisible(false),
//                     setConfirmLoading(false)
//                 },500);
//             });
//     };
//     // 添加行业信息取消弹窗
//     const handleCancelCreate = () => {
//         setVisible(false);
//     };

//     //修改行业详情信息弹窗确认
//     const handleOkUpdate = () => {
//         form.validateFields().then(() => {
//             const newRecord: DataType = form.getFieldsValue();
//             updateindustryDetail({
//                 variables: {
//                     id: record?.id,
//                     updateindustryDetailInput: {
//                         industryTypeName: newRecord?.industryTypeName,
//                         industryid: newRecord?.id
//                     },
//                 },
//             })
//             .then( () => {
//                 message.success('修改成功');
//             })
//             .catch( (res) => {
//                 message.error('' + res);
//             });

//             setConfirmLoading(true);
//             setTimeout( () => {
//                 setVisibleUpdate(false);
//                 setConfirmLoading(false);
//             },500);
//         });
//     };
//     // 弹窗：修改行业详情信息，取消后执行
//     const handleCancelUpdate = () => {
//         setVisibleUpdate(false);
//     }

//     // 弹窗：删除行业详情信息，确定后执行
//     const handleOkDelete = () => {
//         setConfirmLoading(true);
//         deleteindustryDetail({ variables: {id: record?.id}})
//         .then(() => {
//             setTimeout( () => {
//                 setVisibleDelete(false);
//                 setConfirmLoading(false);
//                 message.success('删除成功');
//             },500)
//         })
//         .catch((res) => {
//             setTimeout(() => {
//             setVisibleDelete(false);
//             setConfirmLoading(false);
//             message.error('' + res);
//             },500);
//         });
//     };
//     // 弹窗：删除行业详情信息，取消后执行
//     const handleCancelDelete = () => {
//         setVisibleDelete(false);
//     }

//     // 打开或关闭添加行业信息弹窗
//     const showModal = () => {
//         setVisible(true);
//         form.resetFields();
//     };
//     // 打开或关闭修改行业信息弹窗
//     const showModalUpdate = (_text: any, record: DataType) => {
//         setVisibleUpdate(true);
//         setRecord(record);
//         form.setFieldsValue(record);
//     };
//     // 打开或关闭删除行业详情信息弹窗
//     const showModalDelete = (_text: any, record: DataType) => {
//         setVisibleDelete(true);
//         setRecord(record);
//     };

//     // 选择行业信息，点击一级列表方法
//     const selectIndustryInfo = (v: number) => {
//         setIndustryInfoId(v);
//     };
//     // 筛选按钮
//     const screenData = () => {
//         if (IndustryInfoId) {
//             setScreenDataState(!screenDataState);
//         } else {
//             message.info('请选择行业信息');
//         }
//     }

//     // 每次点击标签页，页面改变
//     const handleTableChange = (newPagination: TablePaginationConfig) => {
//         setPagination(newPagination);
//     }

//     const { Option } = Select;

//     const layout = {
//         labelCol: {
//             span: 7,
//         },
//         wrapperCol: {
//             span: 16,
//         },
//     };

//     useMount(() => {
//         refetch();
//     });

//     useEffect(() => {
//         if (getindustryInfosData) {
//             setindustryInfo(() => getindustryInfosData.industryInfos.data);
//         }

//     }, [getindustryInfosData]);

//     useEffect(() => {
//         if (data) {
//             setPagination((pagination) => {
//                 return {
//                     ...pagination,
//                     total: data.industryDetails.total,
//                 };
//             });
//         } else {
//             setLoading(true);
//         }
//     }, [data]);

//     return (
//         <>
//         <Divider
//             style={{ marginTop: '30px', borderTopWidth: '2px', marginBottom: '10px'}}
//         />

//         <div className={styles.IndustryDetailInfo}>
//             <div className={styles.AddIndustryDeatilInfoButton}>
//                 <Button type="primary" onClick={showModal}>
//                     添加行业详情信息
//                 </Button>
//             </div>

//             {/* 添加行业详情信息弹窗 */}
//             <div className={styles.addIndustryDetailInfo}>
//                 <Modal
//                     title= "添加行业详情信息"
//                     confirmLoading={confirmLoading}
//                     visible={visible}
//                     onOk={handleOkCreate}
//                     onCancel={handleCancelCreate}
//                     okText="确认"
//                     cancelText="取消"
//                 >
//                     <Form {...layout} form={form} name="control-hooks">
//                         <Form.Item
//                             name="industryId"
//                             label="行业信息"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: '请选择行业信息名称',
//                                 },
//                             ]}
//                             >
//                                 <Select placeholder="请选择行业信息名称">
//                                     {industryInfo?.map((item: any) => {
//                                         <Option key={item.id} value={item.id}>
//                                             {item.industryName}
//                                         </Option>
//                                     })}
//                                 </Select>
//                         </Form.Item>
//                         <Form.Item
//                             name="industryTypeName"
//                             label="行业详情信息"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: '请输入行业详情信息名称',
//                                 },
//                             ]}
//                         >
//                                 <Input placeholder="行业详情信息名称" />
//                         </Form.Item>
//                     </Form>
//                 </Modal>
//             </div>

//             {/* 删除行业详情信息弹框 */}
//             <Modal
//                 title= "确认提示"
//                 visible={visibleDelete}
//                 onOk={handleOkUpdate}
//                 confirmLoading={confirmLoading}
//                 onCancel={handleCancelDelete}
//                 okText="确认"
//                 cancelText="取消"
//             >
//                 确定删除该条行业详情信息？
//             </Modal>
//             {/* 修改行业详情信息弹窗 */}
//             <Modal
//                 title="修改行业详情信息"
//                 visible={visibleUpdate}
//                 onOk={handleOkUpdate}
//                 confirmLoading={confirmLoading}
//                 onCancel={handleCancelUpdate}
//                 okText="确认"
//                 cancelText="取消"
//                 >
//                     <Form {...layout} form={form} name="control-hooks">
//                         <Form.Item
//                             name="industryId"
//                             label="行业信息名称"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: '请选择行业信息名称',
//                                 },
//                             ]}
//                         >
//                             <Select placeholder="请选择行业信息">
//                                 {industryInfo?.map((item: any) => {
//                                     <Option key={item.id} value={item.id}>
//                                         {item.industryName}
//                                     </Option>
//                                 })}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item
//                             name="industryTypeName"
//                             label="行业详情信息名称"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: '请输入行业详情信息名称',
//                                 },
//                             ]}>
//                                 <Input placeholder="请输入行业详情信息名称" />
//                         </Form.Item>
//                     </Form>
//                 </Modal>

//                 {/* 展示表格和数据总数一级筛选选择框 */}
//                 <div className={styles.industryDetailInfoTabel}>
//                     {/* 数据总数以及筛选 */}
//                     <div className={styles.industryDetailInfoTotal}>
//                         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}}>
//                             <Col span={2}>
//                                 <h1>数据总数({pagination.total})</h1>
//                             </Col>

//                             <Col span={2} offset={17}>
//                                 <Space>
//                                     <Select
//                                         placeholder="请选择行业信息"
//                                         style={{width: '200px'}}
//                                         onChange={selectIndustryInfo}
//                                     >
//                                         {industryInfo?.map((item: any) => {
//                                             <Option key={item.id} value={item.id} >
//                                                 {item.industryName}
//                                             </Option>
//                                         })}
//                                     </Select>
//                                     <Button type="primary"
//  onClick={screenData} icon={<FilterOutlined />}>
//                                         {screenDataState ? '取消' : '筛选'}
//                                     </Button>
//                                 </Space>
//                             </Col>
//                         </Row>
//                     </div>
//                     <Divider style={{ marginTop: '0px'}} />
//                     <Table
//                         columns={columns}
//                         rowKey={(record) => record.id}
//                         dataSource={data?.industryDetails.data}
//                         pagination={pagination}
//                         loading={loading}
//                         onChange={handleTableChange}
//                     ></Table>
//                 </div>
//         </div>
//         </>
//     )
// }
