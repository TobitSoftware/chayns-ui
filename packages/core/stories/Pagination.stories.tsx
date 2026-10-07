import usage from '../../../docs/03-components/pagination/pagination-usage.md?raw';
import ControlledPagination from './examples/ControlledPagination.js';
import controlledSource from './examples/ControlledPagination.tsx?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from '../src/components/pagination/Pagination.js';

const meta = {
  title: 'Core/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Seiten',
    page: 1,
    pageCount: 20,
    labels: { previous: 'Zurück', next: 'Weiter', pageLabel: (page: number) => `Seite ${page}` },
    onPageChange: () => undefined,
  },
  parameters: { docs: { source: { type: 'code', code: controlledSource } } },
  render: ControlledPagination,
};
export const EdgeCases: Story = {
  args: {
    'aria-label': 'Seiten',
    page: 1,
    pageCount: 1,
    labels: { previous: 'Zurück', next: 'Weiter', pageLabel: (page: number) => `Seite ${page}` },
    onPageChange: () => undefined,
  },
};
