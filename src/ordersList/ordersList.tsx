import { useMemo, useState, type ReactNode } from 'react';
import { PhoneCell } from '../phoneCell/phoneCell';
import type { OrderDto } from '../orders/orderDto';
import styles from './ordersList.module.css';

export interface OrdersListProps {
    readonly orders: OrderDto[];
}

export const OrdersList = (props: OrdersListProps): ReactNode => {
    const [shipmentDateFilter, setShipmentDateFilter] = useState<string | undefined>(undefined);
    const [shipmentDateFrom, setShipmentDateFrom] = useState<Date | null>(null);
    const [shipmentDateTo, setShipmentDateTo] = useState<Date | null>(null);

    const onShipmentDateClick = () => {
        const value = prompt(
            'Введите дату отгрузки в формате ДД.ММ.ГГГГ или диапазон через / (включительно)',
            shipmentDateFilter
        );

        if (value == null) {
            return;
        }

        if (!value || value.trim() === '') {
            setShipmentDateFilter(undefined);
            setShipmentDateFrom(null);
            setShipmentDateTo(null);
            return;
        }

        const parts = value!
            .trim()
            .split('/')
            .map(x => x.trim());

        console.log(parts);

        if (parts.length === 1) {
            const date = new Date(parts[0].split('.').reverse().join('-'));

            if (isNaN(date.getTime())) {
                alert('Некорректный формат даты отгрузки');
                return;
            }

            setShipmentDateFrom(date);
            setShipmentDateTo(date);
        } else if (parts.length === 2) {
            const dateFrom = new Date(parts[0].split('.').reverse().join('-'));
            const dateTo = new Date(parts[1].split('.').reverse().join('-'));

            if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
                alert('Некорректный формат даты отгрузки');
                return;
            }

            if (dateTo < dateFrom) {
                alert('Дата отгрузки "до" не может быть меньше даты "от"');
                return;
            }

            setShipmentDateFrom(dateFrom);
            setShipmentDateTo(dateTo);
        } else {
            alert('Некорректный формат даты отгрузки');
        }

        setShipmentDateFilter(value);
    };

    const orders = useMemo(() => {
        if (!shipmentDateFrom && !shipmentDateTo) {
            return props.orders;
        }

        return props.orders.filter(order => {
            const shipmentDate = new Date(order.shipmentDate);

            if (shipmentDateFrom && shipmentDate < shipmentDateFrom) {
                return false;
            }

            if (shipmentDateTo && shipmentDate > shipmentDateTo) {
                return false;
            }

            return true;
        });
    }, [props.orders, shipmentDateFrom, shipmentDateTo]);

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={`${styles.th} ${styles.link}`}>Номер</th>
                        <th className={styles.th}>Откуда</th>
                        <th className={styles.th}>Куда</th>
                        <th className={styles.th}>Мерчант</th>
                        <th className={styles.th}>Сл. доставки</th>
                        <th className={styles.th}>Клиент</th>
                        <th className={styles.th}>Телефон</th>
                        <th className={`${styles.th} ${styles.link}`} onClick={onShipmentDateClick}>
                            Отгрузка
                        </th>
                        <th className={styles.th}>Дост.&nbsp;план.</th>
                        <th className={styles.th}>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td className={`${styles.td}`}>{order.id}</td>
                            <td className={styles.td}>{order.from}</td>
                            <td className={styles.td}>{order.to}</td>
                            <td className={styles.td}>{order.merchantName}</td>
                            <td className={styles.td}>{order.carrierName}</td>
                            <td className={styles.td}>{order.clientName}</td>
                            <PhoneCell phoneNumber={order.phoneNumber} />
                            <td className={`${styles.td}`}>{order.shipmentDate.toLocaleDateString()}</td>
                            <td className={styles.td}>{order.deliveryDate.toLocaleDateString()}</td>
                            <td className={styles.td}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
