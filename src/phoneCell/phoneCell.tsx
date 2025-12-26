import { useMemo, type ReactNode } from 'react';

import styles from './phoneCell.module.css';

export interface PhoneCellProps {
    readonly phoneNumber: string;
}

export const PhoneCell = (props: PhoneCellProps): ReactNode => {
    const [phonePrefix, phone] = useMemo(() => {
        if (props.phoneNumber.startsWith('7')) {
            return [
                '+7',
                `${props.phoneNumber[1]}${props.phoneNumber[2]}${props.phoneNumber[3]} ${props.phoneNumber[4]}${props.phoneNumber[5]}${props.phoneNumber[6]}-${props.phoneNumber[7]}${props.phoneNumber[8]}-${props.phoneNumber[9]}${props.phoneNumber[10]}`
            ];
        }

        if (props.phoneNumber.startsWith('375')) {
            return [
                '+375',
                `${props.phoneNumber[3]}${props.phoneNumber[4]}${props.phoneNumber[5]} ${props.phoneNumber[6]}${props.phoneNumber[7]}${props.phoneNumber[8]}-${props.phoneNumber[9]}${props.phoneNumber[10]}-${props.phoneNumber[11]}${props.phoneNumber[12]}`
            ];
        }

        return ['', props.phoneNumber];
    }, [props.phoneNumber]);

    const nbspPhone = useMemo(() => phone.replace(/ /g, '\u00A0').replace(/-/g, '\u2011'), [phone]);

    return (
        <td className={styles.td}>
            <span className={styles.phonePrefix}>{phonePrefix}</span>
            {nbspPhone}
        </td>
    );
};
