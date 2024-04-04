import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('should render input field and add button', () => {
    render(<App />);
    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should add task to list when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const button = screen.getByRole('button', { name: 'Add' });

    await user.type(input, 'New Task');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  test('should delete task from list when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Add a task
    await user.type(input, 'New Task');
    await user.click(addButton);

    // Find and click the delete button
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    await user.click(deleteButton);

    // Task should be removed from the list
    await waitFor(() => {
      expect(screen.queryByText('New Task')).not.toBeInTheDocument();
    });
  });

  test('should edit task when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add Task:' });
    const addButton = screen.getByRole('button', { name: 'Add' });

    // Add a task
    await user.type(input, 'New Task');
    await user.click(addButton);

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: 'Edit' });
    await user.click(editButton);

    // Edit the task
    const editInput = screen.getByRole('textbox');
    await user.clear(editInput);
    await user.type(editInput, 'Edited Task');

    // Save the edited task
    const saveButton = screen.getByRole('button', { name: 'Save' });
    await user.click(saveButton);

    // Task should be edited in the list
    await waitFor(() => {
      expect(screen.getByText('Edited Task')).toBeInTheDocument();
    });
  });
});
