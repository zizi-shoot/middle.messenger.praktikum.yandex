import { nanoid } from 'nanoid';
import { ProfileItemProps } from '../types';

export const profileItemList: ProfileItemProps[] = [
  {
    id: nanoid(),
    name: 'email',
    label: 'Почта',
    value: 'example@email.com',
  },
  {
    id: nanoid(),
    name: 'login',
    label: 'Логин',
    value: 'joker',
  },
  {
    id: nanoid(),
    name: 'first_name',
    label: 'Имя',
    value: 'Артур',
  },
  {
    id: nanoid(),
    name: 'second_name',
    label: 'Фамилия',
    value: 'Флек',
  },
  {
    id: nanoid(),
    name: 'display_name',
    label: 'Имя в чате',
    value: 'Джокер',
  },
  {
    id: nanoid(),
    name: 'phone',
    label: 'Телефон',
    value: '+7 (123) 456-78-90',
  },
];
