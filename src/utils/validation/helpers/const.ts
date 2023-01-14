export const MIN_LOGIN_LENGTH = 3;
export const MAX_LOGIN_LENGTH = 20;

/*
 * начинается и заканчивается буквами или цифрами
 * может содержать не более одного подряд дефиса или подчёркивания
 */
export const LOGIN_PATTERN = /^[a-z\d]+([-_]?[a-z0-9]+)+$/i;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 40;

/*
 * латинские буквы и спец символы
 */
/* eslint-disable-next-line no-useless-escape */
export const PASSWORD_PATTERN = /^[\w!?@#№$%^&*)(+=.,<>{}\[\]:;'"|\/\\~`_-]+$/i; //

export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 40;
/*
 * Начинается с заглавной буквы (лат/кир), состоит только из букв и дефисов
 */
export const NAME_PATTERN = /^[A-ZА-Я]+(-?[a-zа-я]+)+$/;

/*
 * не может начинаться и заканчиваться точкой
 * не содержит пробелов
 * не содержит спец символов кроме точек, подчёркиваний и дефисов
 * может содержать точки до "@"
 */
export const EMAIL_PATTERN = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export const MIN_PHONE_LENGTH = 10;
export const MAX_PHONE_LENGTH = 15;
export const PHONE_PATTERN = /^(\+\d{1,3}|\d|)(?=\d{10,15}$)/;

export const MIN_CHAT_TITLE_LENGTH = 3;
export const MAX_CHAT_TITLE_LENGTH = 20;
