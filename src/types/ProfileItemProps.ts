import type { Props } from './Component';

export interface ProfileItemProps extends Props {
  id: string,
  name: string,
  label: string,
  value: string
}
