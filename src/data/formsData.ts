import { FormFieldProps } from '../types';

export const formsData: Record<string, FormFieldProps[]> = {
  signin: [
    {
      label: 'Логин',
      name: 'login',
      hasError: false,
      placeholder: 'user_name',
      id: 'login',
    },
    {
      label: 'Пароль',
      name: 'password',
      hasError: false,
      type: 'password',
      id: 'password',
    },
  ],
  signup: [
    {
      name: 'login',
      hasError: false,
      placeholder: 'user_name',
      label: 'Логин',
      id: 'login',
    },
    {
      name: 'first_name',
      hasError: false,
      placeholder: 'Иван',
      label: 'Имя',
      id: 'first_name',
    },
    {
      name: 'second_name',
      hasError: false,
      placeholder: 'Иванов',
      label: 'Фамилия',
      id: 'second_name',
    },
    {
      name: 'email',
      hasError: false,
      placeholder: 'example@email.com',
      label: 'Email',
      type: 'email',
      id: 'email',
    },
    {
      name: 'phone',
      hasError: false,
      placeholder: '+7 (123) 456-78-89',
      label: 'Телефон',
      type: 'tel',
      id: 'phone',
    },
    {
      name: 'password',
      hasError: false,
      label: 'Пароль',
      type: 'password',
      id: 'password',
    },
    {
      name: 'password_check',
      hasError: false,
      label: 'Пароль (ещё раз)',
      type: 'password',
      id: 'password_check',
    },
  ],
  profile: [
    {
      name: 'email',
      hasError: false,
      label: 'Почта',
      placeholder: 'example@email.com',
      id: 'email',
    },
    {
      name: 'login',
      hasError: false,
      label: 'Логин',
      placeholder: 'user_name',
      id: 'login',
    },
    {
      name: 'first_name',
      hasError: false,
      label: 'Имя',
      placeholder: 'Иван',
      id: 'first_name',
    },
    {
      name: 'second_name',
      hasError: false,
      label: 'Фамилия',
      placeholder: 'Иванов',
      id: 'second_name',

    },
    {
      name: 'display_name',
      hasError: false,
      label: 'Имя в чате',
      placeholder: 'Ванька',
      id: 'display_name',
    },
    {
      name: 'phone',
      hasError: false,
      label: 'Телефон',
      placeholder: '+7 (123) 456-78-90',
      id: 'phone',
    },
  ],
  password: [
    {
      name: 'oldPassword',
      hasError: false,
      label: 'Старый пароль',
      id: 'oldPassword',
    },
    {
      name: 'newPassword',
      hasError: false,
      label: 'Новый пароль',
      id: 'newPassword',
    },
    {
      name: 'checkNewPassword',
      hasError: false,
      label: 'Повторите новый пароль',
      id: 'checkNewPassword',
    },
  ],
};
