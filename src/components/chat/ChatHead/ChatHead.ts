import { Component } from '@core';
import { removePortal, renderPortal } from '@core/DOM';
import { withChatController } from '@hocs/withController';
import { withChats } from '@hocs/withStore';
import { validateChatUserForm } from '@utils/validation/app/addUserDataValidation';
import type { PropsWithController } from '@typings/controller';
import type { ChatController } from '@controllers/ChatController';
import type { State } from '@typings/store';
import type { ChatUserData } from '@typings/forms';
import type { Props } from '@typings/component';
import template from './template.hbs';
import styles from './chat-head.module.css';
import { Form } from '../../Form';
import { Avatar, Button, Icon, Modal } from '../../base';

interface ChatHeadBaseProps extends PropsWithController<ChatController>, Pick<State, 'chats'>, Props {
  title?: ChatTitle,
  avatar?: AvatarType,
}

export class ChatHeadBase extends Component<ChatHeadBaseProps> {
  protected init() {
    this.props.styles = styles;
  }

  protected componentDidUpdate() {
    const { chats } = this.props;

    if (chats.selectedChatId) {
      const selectedChat = chats.data.find(({ id }) => id === chats.selectedChatId);

      const addForm = new Form<ChatUserData>({
        name: 'chatUser',
        title: 'Добавить пользователя в чат',
        submitButtonText: 'Добавить',
        cancelButtonText: 'Отмена',
        validateForm: validateChatUserForm,
        mode: 'profile',
        sentData: this.addUserToChat.bind(this),
        handleCancel: removePortal,
      });

      const deleteForm = new Form<ChatUserData>({
        name: 'chatUser',
        title: 'Удалить пользователя из чата',
        validateForm: validateChatUserForm,
        submitButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        mode: 'profile',
        sentData: this.deleteUserFromChat.bind(this),
        handleCancel: removePortal,
      });

      this.props.title = selectedChat?.title;
      this.props.avatar = selectedChat?.avatar;

      this.children.avatar = new Avatar({
        size: 48,
        src: this.props.avatar || '',
        altText: `аватар чата ${this.props.title}`,
      });

      this.children.addUserButton = new Button({
        text: 'Добавить пользователя',
        mode: 'alt',
        icon: new Icon({ type: 'add' }),
        onClick: () => renderPortal(new Modal({ content: addForm })),
      });

      this.children.removeUserButton = new Button({
        text: 'Удалить пользователя',
        mode: 'alt',
        icon: new Icon({ type: 'remove' }),
        onClick: () => renderPortal(new Modal({ content: deleteForm })),
      });
    }
  }

  protected async addUserToChat(data: FormData) {
    const { selectedChatId, error } = this.props.chats;

    if (selectedChatId) {
      await this.props.controller.addUserToChat(selectedChatId, data);

      if (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      } else {
        // eslint-disable-next-line no-alert
        alert('Пользователь успешно добавлен в чат!');
        removePortal();
      }
    }
  }

  protected async deleteUserFromChat(data: FormData) {
    const { selectedChatId, error } = this.props.chats;

    if (selectedChatId) {
      await this.props.controller.deleteUserFromChat(selectedChatId, data);

      if (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      } else {
        // eslint-disable-next-line no-alert
        alert('Пользователь успешно удалён из чата!');
        removePortal();
      }
    }
  }

  protected render() {
    return template;
  }
}

export const ChatHead = withChats(withChatController(ChatHeadBase));
