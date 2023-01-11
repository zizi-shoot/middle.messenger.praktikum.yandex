import { Component } from '../../../core';
import { Button, Icon, Modal, Avatar } from '../../base';
import { Form } from '../../Form';
import * as styles from './chat-head.module.css';
import { removePortal, renderPortal } from '../../../core/DOM';
import { withChatController } from '../../../hocs/withController';
import { withChats } from '../../../hocs/withStore';
import { validateChatUserForm } from '../../../utils/validation/app/addUserDataValidation';
import type { PropsWithController } from '../../../types/controller';
import type { ChatController } from '../../../controllers/ChatController';
import type { State } from '../../../types/store';
import type { ChatUserData } from '../../../types/forms';

interface ChatHeadBaseProps extends PropsWithController<ChatController>, Pick<State, 'chats'> {
  title?: ChatTitle,
  avatar?: AvatarType,
}

export class ChatHeadBase extends Component<ChatHeadBaseProps> {
  protected componentDidUpdate() {
    const { data, selectedChatId } = this.props.chats;

    if (selectedChatId) {
      const selectedChat = data.find(({ id }) => id === selectedChatId);

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
    const { selectedChatId } = this.props.chats;

    if (selectedChatId) {
      await this.props.controller.addUserToChat(selectedChatId, data);

      if (this.props.chats.error) {
        alert(this.props.chats.error);
      } else {
        alert('Пользователь успешно добавлен в чат!');
        removePortal();
      }
    }
  }

  protected async deleteUserFromChat(data: FormData) {
    const { selectedChatId } = this.props.chats;

    if (selectedChatId) {
      await this.props.controller.deleteUserFromChat(selectedChatId, data);

      if (this.props.chats.error) {
        alert(this.props.chats.error);
      } else {
        alert('Пользователь успешно удалён из чата!');
        removePortal();
      }
    }
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="${styles.container}">
            <div class="${styles.user}">
                {{{avatar}}}
                <span>{{title}}</span>
            </div>
            <div class="${styles.controls}">
                {{{addUserButton}}}
                {{{removeUserButton}}}
            </div>
        </div>
    `;
  }
}

export const ChatHead = withChats(withChatController(ChatHeadBase));
