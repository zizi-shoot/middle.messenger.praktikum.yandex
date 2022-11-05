export const formsData = {
  signin: [
    {
      label: 'Логин',
      name: 'login',
      placeholder: 'user_name',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
    },
  ],
  signup: [
    {
      name: 'login',
      placeholder: 'user_name',
      label: 'Логин',
    },
    {
      name: 'first_name',
      placeholder: 'Иван',
      label: 'Имя',
    },
    {
      name: 'second_name',
      placeholder: 'Иванов',
      label: 'Фамилия',
    },
    {
      name: 'email',
      placeholder: 'example@email.com',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'phone',
      placeholder: '+7 (123) 456-78-89',
      label: 'Телефон',
      type: 'tel',
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
    },
    {
      name: 'password_check',
      label: 'Пароль (ещё раз)',
      type: 'password',
    },
  ],
  profile: [
    {
      name: 'email',
      label: 'Почта',
      placeholder: 'example@email.com',
      helperText: 'Неправильный email',
      hasError: 'true',
    },
    {
      name: 'login',
      label: 'Логин',
      placeholder: 'user_name',
    },
    {
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Иван',
    },
    {
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Иванов',
    },
    {
      name: 'display_name',
      label: 'Имя в чате',
      placeholder: 'Ванька',
    },
    {
      name: 'phone',
      label: 'Телефон',
      placeholder: '+7 (123) 456-78-90',
    },
  ],
  password: [
    {
      name: 'oldPassword',
      label: 'Старый пароль',
    },
    {
      name: 'newPassword',
      label: 'Новый пароль',
    },
    {
      name: 'checkNewPassword',
      label: 'Повторите новый пароль',
    },
  ],
};