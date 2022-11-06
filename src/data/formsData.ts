import { FormFieldProps } from '../types';

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
      helperText: 'Неправильный логин',
    },
    {
      name: 'first_name',
      hasError: false,
      placeholder: 'Иван',
      label: 'Имя',
      helperText: 'Неправильное имя',
    },
    {
      name: 'second_name',
      hasError: false,
      placeholder: 'Иванов',
      label: 'Фамилия',
      helperText: 'Неправильная фамилия',
    },
    {
      name: 'email',
      hasError: false,
      placeholder: 'example@email.com',
      label: 'Email',
      type: 'email',
      helperText: 'Неправильный email',
    },
    {
      name: 'phone',
      hasError: false,
      placeholder: '+7 (123) 456-78-89',
      label: 'Телефон',
      type: 'tel',
      helperText: 'Неправильный телефон',
    },
    {
      name: 'password',
      hasError: false,
      label: 'Пароль',
      type: 'password',
      helperText: 'Неправильный пароль',
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
      name: 'email',
      hasError: false,
      label: 'Почта',
      placeholder: 'example@email.com',
      helperText: 'Неправильный email',
    },
    {
      name: 'login',
      hasError: false,
      label: 'Логин',
      placeholder: 'user_name',
      helperText: 'Неправильный логин',
    },
    {
      name: 'first_name',
      hasError: false,
      label: 'Имя',
      placeholder: 'Иван',
      helperText: 'Неправильное имя',
    },
    {
      name: 'second_name',
      hasError: false,
      label: 'Фамилия',
      placeholder: 'Иванов',
      helperText: 'Неправильная фамилия',

    },
    {
      name: 'display_name',
      hasError: false,
      label: 'Имя в чате',
      placeholder: 'Ванька',
      helperText: 'Неправильное имя',
    },
    {
      name: 'phone',
      hasError: false,
      label: 'Телефон',
      placeholder: '+7 (123) 456-78-90',
      helperText: 'Неправильный телефон',
    },
  ],
  password: [
    {
      name: 'oldPassword',
      hasError: false,
      label: 'Старый пароль',
      helperText: 'Неправильный пароль',

    },
    {
      name: 'newPassword',
      hasError: false,
      label: 'Новый пароль',
      helperText: 'Пароль должен содержать цифры, английские большие и маленькие буквы',
    },
    {
      name: 'checkNewPassword',
      hasError: false,
      label: 'Повторите новый пароль',
      helperText: 'Пароли не совпадают',
    },
  ],
};
