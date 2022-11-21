import type { FormFieldProps } from '../types';

export const formsData: Record<string, FormFieldProps[]> = {
  signin: [
    {
      label: 'Логин',
      name: 'login',
      hasError: false,
      placeholder: 'user_name',

    },
    {
      label: 'Пароль',
      name: 'password',
      hasError: false,
      type: 'password',
    },
  ],
  signup: [
    {
      name: 'login',
      hasError: false,
      placeholder: 'user_name',
      label: 'Логин',
    },
    {
      name: 'first_name',
      hasError: false,
      placeholder: 'Иван',
      label: 'Имя',
    },
    {
      name: 'second_name',
      hasError: false,
      placeholder: 'Иванов',
      label: 'Фамилия',
    },
    {
      name: 'email',
      hasError: false,
      placeholder: 'example@email.com',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'phone',
      hasError: false,
      placeholder: '+7 (123) 456-78-89',
      label: 'Телефон',
      type: 'tel',
    },
    {
      name: 'password',
      hasError: false,
      label: 'Пароль',
      type: 'password',
    },
    {
      name: 'password_check',
      hasError: false,
      label: 'Пароль (ещё раз)',
      type: 'password',
    },
  ],
  profile: [
    {
      mode: 'profile',
      direction: 'horizontal',
      name: 'email',
      hasError: false,
      label: 'Почта',
      placeholder: 'example@email.com',
      type: 'email',
    },
    {
      mode: 'profile',
      direction: 'horizontal',
      name: 'login',
      hasError: false,
      label: 'Логин',
      placeholder: 'user_name',
    },
    {
      mode: 'profile',
      direction: 'horizontal',
      name: 'first_name',
      hasError: false,
      label: 'Имя',
      placeholder: 'Иван',
    },
    {
      mode: 'profile',
      direction: 'horizontal',
      name: 'second_name',
      hasError: false,
      label: 'Фамилия',
      placeholder: 'Иванов',

    },
    {
      mode: 'profile',
      direction: 'horizontal',
      name: 'display_name',
      hasError: false,
      label: 'Имя в чате',
      placeholder: 'Ванька',
    },
    {
      mode: 'profile',
      direction: 'horizontal',
      name: 'phone',
      hasError: false,
      label: 'Телефон',
      placeholder: '+7 (123) 456-78-90',
      type: 'tel',
    },
  ],
  password: [
    {
      name: 'oldPassword',
      hasError: false,
      label: 'Старый пароль',
      type: 'password',
    },
    {
      name: 'newPassword',
      hasError: false,
      label: 'Новый пароль',
      type: 'password',
    },
    {
      name: 'checkNewPassword',
      hasError: false,
      label: 'Повторите новый пароль',
      type: 'password',
    },
  ],
};
