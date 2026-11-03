import Avatar from '../../avatar/Avatar.js';
import ButtonIcon from '../../button/button-icon/ButtonIcon.js';
import type { ComposerSelectionItem } from '../MessageComposer.types.js';

function ComposerIdentity({ item }: { item: ComposerSelectionItem }) {
  if (item.avatarSrc || !item.icon)
    return (
      <Avatar
        aria-hidden="true"
        name={item.label}
        {...(item.avatarSrc ? { src: item.avatarSrc } : {})}
      />
    );
  return (
    <span aria-hidden="true" className="chayns-message-composer__identity-icon">
      <ButtonIcon icon={item.icon} />
    </span>
  );
}
ComposerIdentity.displayName = 'ComposerIdentity';
export default ComposerIdentity;
