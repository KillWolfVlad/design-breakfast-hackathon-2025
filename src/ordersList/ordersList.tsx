import type { ReactNode } from 'react';
import type { OrderDto } from '../orders/orderDto';

export interface OrdersListProps {
    readonly orders: OrderDto[];
}

export const OrdersList = (props: OrdersListProps): ReactNode => {
    return props.orders.map(order => (
        <div key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>From: {order.from}</p>
            <p>To: {order.to}</p>
            <p>Merchant: {order.merchantName}</p>
            <p>Carrier: {order.carrierName}</p>
            <p>Client: {order.clientName}</p>
            <p>Phone: {order.phoneNumber}</p>
            <p>Status: {order.status}</p>
            <p>Shipment Date: {order.shipmentDate.toDateString()}</p>
            <p>Delivery Date: {order.deliveryDate.toDateString()}</p>
            <hr />
        </div>
    ));
};
