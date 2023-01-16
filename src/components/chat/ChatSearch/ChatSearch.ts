import { Component } from '@core';
import { ChatController } from '@controllers/ChatController';
import { withChatController } from '@hocs/withController';
import { validateNewChatForm } from '@utils/validation/app/newChatDataValidation';
import { removePortal, renderPortal } from '@core/DOM';
import { withStore } from '@hocs/withStore';
import type { PropsWithController } from '@typings/controller';
import type { State } from '@typings/store';
import type { NewChatData } from '@typings/forms';
import type { Props } from '@typings/component';
import template from './template.hbs';
import styles from './chat-search.module.css';
import { Form } from '../../Form';
import { Button, Icon, Modal } from '../../base';

type ChatsError = State['chats']['error'];

interface ChatSearchProps extends PropsWithController<ChatController>, Props {
  class?: string,
  chatsError: ChatsError
}

export class ChatSearchBase extends Component<ChatSearchProps> {
  protected init() {
    this.children.icon = new Icon({ type: 'search', class: styles.icon });

    const form = new Form<NewChatData>({
      name: 'newChat',
      title: 'Создать новый чат',
      validateForm: validateNewChatForm,
      submitButtonText: 'Создать',
      cancelButtonText: 'Отмена',
      mode: 'profile',
      sentData: this.createNewChat.bind(this),
      handleCancel: removePortal,
    });

    this.children.createBtn = new Button({
      text: '',
      class: styles.createBtn,
      icon: new Icon({ type: 'addChat' }),
      onClick: () => renderPortal(new Modal({ content: form })),
    });

    this.props.styles = styles;
  }

  protected async createNewChat(data: FormData) {
    const { controller, chatsError } = this.props;

    await controller.create(data);

    if (chatsError) {
      // eslint-disable-next-line no-alert
      alert(chatsError);
    } else {
      // eslint-disable-next-line no-alert
      alert('Новый чат успешно создан!');
      removePortal();
    }
  }

  protected render() {
    return template;
  }
}

const withChatsError = withStore((state) => ({ errors: { ...state.chats.error } }));

export const ChatSearch = withChatsError(withChatController(ChatSearchBase));
