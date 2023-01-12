import { Component } from '../../../core';
import { Button, Icon, Modal } from '../../base';
import { Form } from '../../Form';
import { ChatController } from '../../../controllers/ChatController';
import { withChatController } from '../../../hocs/withController';
import { validateNewChatForm } from '../../../utils/validation/app/newChatDataValidation';
import type { PropsWithController } from '../../../types/controller';
import * as styles from './chat-search.module.css';
import { removePortal, renderPortal } from '../../../core/DOM';
import type { State } from '../../../types/store';
import type { NewChatData } from '../../../types/forms';
import { withStore } from '../../../hocs/withStore';

type ChatsError = State['chats']['error'];

interface ChatSearchProps extends PropsWithController<ChatController> {
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
  }

  protected async createNewChat(data: FormData) {
    await this.props.controller.create(data);

    if (this.props.chatsError) {
      // eslint-disable-next-line no-alert
      alert(this.props.chatsError);
    } else {
      // eslint-disable-next-line no-alert
      alert('Новый чат успешно создан!');
      removePortal();
    }
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="${styles.container}">
            <form class="{{class}}">
                {{{icon}}}
                <label for="chat-search"></label>
                <input class="${styles.input}" type="text" name="chat-search" id="chat-search" placeholder="Поиск чата">
            </form>
            {{{createBtn}}}
        </div>

    `;
  }
}

const withChatsError = withStore((state) => ({ errors: { ...state.chats.error } }));

export const ChatSearch = withChatsError(withChatController(ChatSearchBase));
