import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import TeamTalkInput from '../src/components/team-talk-input/TeamTalkInput.js';
import type {
  TeamTalkInputProps,
  TeamTalkSendPayload,
} from '../src/components/team-talk-input/TeamTalkInput.types.js';
import usage from '../../../docs/03-components/team-talk-input/team-talk-input-usage.md?raw';
import '../src/components/team-talk-input/team-talk-input.css';

const labels: TeamTalkInputProps['labels'] = {
  input: 'Kommentar schreiben',
  placeholder: 'Stimme zu',
  agree: 'Zustimmen',
  send: 'Senden',
  addPerson: 'Personen hinzufügen',
  peopleSearch: 'Personen suchen',
  peopleSearchPlaceholder: 'Person suchen',
  peopleLoading: 'Personen werden geladen …',
  peopleNoResults: 'Keine Personen gefunden.',
  peopleSelectionCount: (count) =>
    count === 0
      ? 'Keine Person ausgewählt'
      : `${count} ${count === 1 ? 'Person ausgewählt' : 'Personen ausgewählt'}`,
  peopleApply: 'Hinzufügen',
  leave: 'TeamTalk verlassen',
  participants: (names) => `Im TeamTalk: ${names.join(', ')}`,
};

function ControlledTeamTalkInput(props: Partial<TeamTalkInputProps>) {
  const [value, setValue] = useState('');
  const [lastAction, setLastAction] = useState<TeamTalkSendPayload | null>(null);
  const [left, setLeft] = useState(false);
  return (
    <div>
      <TeamTalkInput
        {...props}
        labels={labels}
        members={[
          { id: 'ada', name: 'Ada Lovelace' },
          { id: 'grace', name: 'Grace Hopper' },
          { id: 'alan', name: 'Alan Turing' },
        ]}
        peopleSuggestions={[
          { id: 'marie', name: 'Marie Curie', description: 'Physik' },
          { id: 'katherine', name: 'Katherine Johnson', description: 'Mathematik' },
          { id: 'emmy', name: 'Emmy Noether', description: 'Algebra' },
        ]}
        peopleQuery=""
        onPeopleQueryChange={() => undefined}
        onAddPeople={() => undefined}
        value={value}
        onValueChange={setValue}
        onSend={setLastAction}
        onLeave={() => setLeft(true)}
      />
      <output aria-label="Letzte Aktion">{lastAction ? JSON.stringify(lastAction) : ''}</output>
      {left ? <p>Leave wurde an die Anwendung gemeldet.</p> : null}
    </div>
  );
}
ControlledTeamTalkInput.displayName = 'ControlledTeamTalkInput';

const meta = {
  title: 'Business/TeamTalkInput',
  component: TeamTalkInput,
  tags: ['autodocs'],
  args: {
    labels,
    members: [],
    peopleSuggestions: [],
    peopleQuery: '',
    onPeopleQueryChange: () => undefined,
    onAddPeople: () => undefined,
    value: '',
    onValueChange: () => undefined,
    onSend: () => undefined,
  },
  parameters: { docs: { description: { component: usage } }, a11y: { test: 'error' } },
} satisfies Meta<typeof TeamTalkInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyWithoutAgree: Story = {
  render: (args) => <ControlledTeamTalkInput {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Senden' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Personen hinzufügen' })).toBeEnabled();
  },
};

export const AgreeEnabled: Story = {
  args: { allowAgree: true },
  render: (args) => <ControlledTeamTalkInput {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Zustimmen' }));
    await expect(canvas.getByLabelText('Letzte Aktion')).toHaveTextContent('"type":"agree"');
  },
};

export const WithParticipants: Story = {
  args: {
    members: [
      { id: 'ada', name: 'Ada Lovelace' },
      { id: 'grace', name: 'Grace Hopper' },
      { id: 'alan', name: 'Alan Turing' },
    ],
  },
  render: (args) => <ControlledTeamTalkInput {...args} />,
};

export const AddPeople: Story = {
  render: (args) => <ControlledTeamTalkInput {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Personen hinzufügen' }));
    const dialog = within(document.body).getByRole('dialog', { name: 'Personen hinzufügen' });
    await expect(within(dialog).getByRole('searchbox', { name: 'Personen suchen' })).toHaveFocus();
    const option = within(dialog).getByRole('checkbox', { name: /Marie Curie/ });
    await userEvent.click(option);
    await expect(within(dialog).getByRole('button', { name: 'Hinzufügen' })).toBeEnabled();
  },
};

export const MessageAndLeave: Story = {
  args: {
    members: [
      { id: 'ada', name: 'Ada Lovelace' },
      { id: 'grace', name: 'Grace Hopper' },
    ],
  },
  render: (args) => <ControlledTeamTalkInput {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole('textbox', { name: 'Kommentar schreiben' });
    await userEvent.type(textbox, '  Hallo Team  ');
    await expect(canvas.getByRole('button', { name: 'Senden' })).toBeEnabled();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByLabelText('Letzte Aktion')).toHaveTextContent('"text":"Hallo Team"');
    await userEvent.click(canvas.getByRole('button', { name: 'TeamTalk verlassen' }));
    await expect(canvas.getByText('Leave wurde an die Anwendung gemeldet.')).toBeInTheDocument();
  },
};
