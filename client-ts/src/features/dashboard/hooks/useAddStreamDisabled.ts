import { useMemo } from 'react';
import { isTwitterAccount } from '../../../api/social/types';
import { IConnectedAccount } from '../../../core/types/social';
import { StreamType } from '../components/AddStream/SelectStreamType';

interface Props {
  selectedAccount?: IConnectedAccount<unknown>;
  selectedStreamType?: StreamType;
  search?: string;
}
const useAddStreamDisabled = ({
  selectedAccount,
  selectedStreamType,
  search,
}: Props) => {
  const isSubmitDisabled = useMemo(() => {
    if (!selectedAccount) {
      return true;
    }
    if (!selectedStreamType) {
      return true;
    }
    if (
      isTwitterAccount(selectedAccount) &&
      selectedStreamType === 'home_timeline'
    ) {
      return false;
    }
    if (
      isTwitterAccount(selectedAccount) &&
      selectedStreamType === 'search' &&
      search
    ) {
      return false;
    }
    return true;
  }, [selectedAccount, selectedStreamType, search]);

  return isSubmitDisabled;
};

export default useAddStreamDisabled;
