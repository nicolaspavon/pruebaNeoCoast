import { render, fireEvent, screen } from '@testing-library/react';
import LoginForm from './index';

it('Should have login button disabled and show error tooltip when no username and password', () => {
  const { container } = render(<LoginForm />);
  const usernameInput = screen.getByRole('textbox', {
    name: 'Username',
  });
  const passwordInput = screen.getByRole('textbox', {
    name: 'Password',
  });
  const loginButton = screen.getByRole('button');
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: '' } });
  fireEvent.change(passwordInput, { target: { value: '' } });
  expect(loginButton).toBeDisabled();
  expect(loginButton).toHaveTextContent('Login');
  expect(loginButton).toHaveAttribute('title', 'Username is missing. Password is missing. ');
  expect(container).toMatchSnapshot();
});

it('Should have login button disabled and show error tooltip when no username', () => {
  const { container } = render(<LoginForm />);
  const usernameInput = screen.getByRole('textbox', {
    name: 'Username',
  });
  const passwordInput = screen.getByRole('textbox', {
    name: 'Password',
  });
  const loginButton = screen.getByRole('button');
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: '' } });
  fireEvent.change(passwordInput, { target: { value: 'contra' } });
  expect(loginButton).toBeDisabled();
  expect(loginButton).toHaveTextContent('Login');
  expect(loginButton).toHaveAttribute('title', 'Username is missing. ');
  expect(container).toMatchSnapshot();
});

it('Should have login button disabled and show error tooltip when no password', () => {
  const { container } = render(<LoginForm />);
  const usernameInput = screen.getByRole('textbox', {
    name: 'Username',
  });
  const passwordInput = screen.getByRole('textbox', {
    name: 'Password',
  });
  const loginButton = screen.getByRole('button');
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: 'nico' } });
  fireEvent.change(passwordInput, { target: { value: '' } });
  expect(loginButton).toBeDisabled();
  expect(loginButton).toHaveTextContent('Login');
  expect(loginButton).toHaveAttribute('title', 'Password is missing. ');
  expect(container).toMatchSnapshot();
});

it('Should have login button enabled and show no tooltip', () => {
  const { container } = render(<LoginForm />);
  const usernameInput = screen.getByRole('textbox', {
    name: 'Username',
  });
  const passwordInput = screen.getByRole('textbox', {
    name: 'Password',
  });
  const loginButton = screen.getByRole('button');
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: 'nico' } });
  fireEvent.change(passwordInput, { target: { value: 'pass' } });
  expect(loginButton).not.toBeDisabled();
  expect(loginButton).toHaveTextContent('Login');
  expect(loginButton).toHaveAttribute('title', '');
  expect(container).toMatchSnapshot();
});

it('Should change button text to loading', () => {
  const { container } = render(<LoginForm />);
  const usernameInput = screen.getByRole('textbox', {
    name: 'Username',
  });
  const passwordInput = screen.getByRole('textbox', {
    name: 'Password',
  });
  const loginButton = screen.getByRole('button');
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(usernameInput, { target: { value: 'nico' } });
  fireEvent.change(passwordInput, { target: { value: 'pass' } });
  expect(loginButton).not.toBeDisabled();
  fireEvent.click(loginButton);
  expect(loginButton).toHaveTextContent('Loading');
  expect(container).toMatchSnapshot();
});

// Otros posibles tests a implementar:
// Se podría hacer un mock de la promise "doLogin", y chequear que el boton vuelva a decir login luego de que se cumple la promise