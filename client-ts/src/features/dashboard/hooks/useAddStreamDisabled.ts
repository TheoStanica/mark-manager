import { useMemo } from 'react';
import { isFacebookAccount, isTwitterAccount } from '../../../api/social/types';
import { FacebookStreamTypes } from '../../../api/user/types';
import { Option } from '../../../core/components/SelectConnectedAccount';
import { StreamType } from '../components/AddStream/SelectStreamType';

interface Props {
  selectedOption?: Option;
  selectedStreamType?: StreamType | FacebookStreamTypes;
  search?: string;
}
const useAddStreamDisabled = ({
  selectedOption,
  selectedStreamType,
  search,
}: Props) => {
  const isSubmitDisabled = useMemo(() => {
    if (!selectedOption) {
      return true;
    }
    if (!selectedStreamType) {
      return true;
    }
    if (
      isTwitterAccount(selectedOption.account) &&
      selectedStreamType === 'home_timeline'
    ) {
      return false;
    }
    if (
      isTwitterAccount(selectedOption.account) &&
      selectedStreamType === 'search' &&
      search
    ) {
      return false;
    }
    if (
      isFacebookAccount(selectedOption.account) &&
      selectedStreamType === 'page'
    ) {
      return false;
    }
    return true;
  }, [selectedOption, selectedStreamType, search]);

  return isSubmitDisabled;
};

export default useAddStreamDisabled;
