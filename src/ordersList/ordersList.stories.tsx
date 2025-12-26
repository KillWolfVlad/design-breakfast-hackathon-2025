import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrdersList } from './ordersList';
import { loadTestData } from '../__test__/loadTestData';

const meta = {
    title: 'Orders List',
    component: OrdersList,
    parameters: {
        backgrounds: {
            default: 'dark'
        }
    }
} satisfies Meta<typeof OrdersList>;

type TStory = StoryObj<typeof OrdersList>;

export const Basic: TStory = {
    args: {
        orders: loadTestData()
    }
};

Basic.storyName = 'OrdersList';

export default meta;
