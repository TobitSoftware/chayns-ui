import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppLayout } from '../src/components/app-layout/AppLayout.js';
const meta = {
  title: 'Layout/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof AppLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: { children: null },
  render: (args) => (
    <div style={{ blockSize: '36rem' }}>
      <AppLayout {...args}>
        <AppLayout.Header>
          <AppLayout.Logo src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E" />
        </AppLayout.Header>
        <AppLayout.Navigation aria-label="Hauptnavigation">
          <AppLayout.Navigation.Item label="Posteingang">
            <AppLayout.Navigation.Item label="Gelesen" />
          </AppLayout.Navigation.Item>
          <AppLayout.Navigation.Item href="#calendar" isActive label="Kalender" />
        </AppLayout.Navigation>
        <AppLayout.CollapseToggle
          collapseLabel="Navigation einklappen"
          expandLabel="Navigation ausklappen"
        />
        <AppLayout.Content>
          <h1>Arbeitsbereich</h1>
        </AppLayout.Content>
      </AppLayout>
    </div>
  ),
};
