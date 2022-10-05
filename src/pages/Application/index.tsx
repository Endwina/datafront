// export default function Application() {
//     return(
//         <>
//         <Divider
//         style={{ marginTop: '-30px', borderTopWidth: '2px', marginBottom: '10px' }}
//       />
//       <div className={styles.Form}>
//         <Form form={form}>
//           {/* 由栅格对下拉框和筛选按钮作右对齐 */}
//           <Row justify="end">
//             <Space>
//               <Col span={4}>
//                 <Form.Item name="industryInfo">
//                   <Select
//                     placeholder="请选择行业信息"
//                     style={{ width: '13vw' }}
//                     onChange={selectIndustryInfo}
//                     allowClear
//                   >
//                     {industryInfo?.map((item) => (
//                       <Option key={item.id} value={item.id}>
//                         {item.industryName}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item name="dateSelect">
//                   <RangePicker
//                     // 日期时间的格式
//                     showTime={{
//                       format: 'HH',
//                       defaultValue: [
//                         moment('00:00:00', 'HH:mm:ss'),
//                         moment('00:00:00', 'HH:mm:ss'),
//                       ],
//                     }}
//                     format="YYYY-MM-DD HH"
//                     // 预设可供选择的范围
//                     ranges={{
//                       近一月: [
//                         moment().subtract(1, 'month').startOf('day'),
//                         moment().endOf('day'),
//                       ],
//                       近三月: [
//                         moment().subtract(3, 'month').startOf('day'),
//                         moment().endOf('day'),
//                       ],
//                     }}
//                     // 允许起始项部分为空
//                     allowEmpty={[true, true]}
//                     style={{ width: '20vw' }}
//                     locale={locale}
//                     value={hackValue || value}
//                     disabledDate={disabledDate}
//                     onChange={onDataChange}
//                     onCalendarChange={(val) => setDates(val)}
//                     onOpenChange={onOpenChange}
//                   />
//                 </Form.Item>
//               </Col>

//               <Col span={2}>
//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     onClick={screenData}
//                     style={{ width: '6vw' }}
//                     icon={<FilterOutlined />}
//                   >
//                     {screenDataState ? '取消' : '筛选'}
//                   </Button>
//                 </Form.Item>
//               </Col>
//             </Space>
//           </Row>
//         </Form>
//       </div>
//       {/* 基本信息显示 */}
//       <div className={styles.NglTable}>
//         <Divider style={{ marginTop: '0px' }} />
//         <div className={styles.Static}>
//           <div className={styles.InfoTitle}>基本信息</div>
//           <Row gutter={[16, 16]}>
//             <Col className="gutter-row" span={4}>
//               {/* 具体参数由服务器传入 */}
//               <div>源IP数量:{statistics?.srcIpSum}个</div>
//             </Col>
//             <Col className="gutter-row" span={4}>
//               <div>源国家数:{statistics?.srcCountrySum}个</div>
//             </Col>
//             <Col className="gutter-row" span={4}>
//               <div>源用户数:{statistics?.srcUsernameSum}个</div>
//             </Col>
//             <Col className="gutter-row" span={4}>
//               <div>目的IP数量:{statistics?.dstIpSum}个</div>
//             </Col>
//             <Col className="gutter-row" span={4}>
//               <div>目的国家数:{statistics?.dstCountrySum}个</div>
//             </Col>
//             <Col className="gutter-row" span={4}>
//               <div>目的用户数:{statistics?.dstUsernameSum}个</div>
//             </Col>
//           </Row>
//         </div>
//         <Divider style={{ marginTop: '0px' }} />
//         <Table
//           columns={columns}
//           rowKey={(record) => record.id}
//           dataSource={data?.sslLogs.data}
//           pagination={pagination}
//           loading={dataLoading}
//           onChange={handleTableChange}
//           scroll={{ x: 3250, y: 750 }}
//         />
//       </div>
//     </>
//     )
// }
