export interface edit_type {
  id?: string;
  status: number | null; //状态 1待支付 2待发货 3待收货 4已完成 5取消订单
  address: string;
  phone: string;
  logisticsNumber: string;
  remark: string;
}
