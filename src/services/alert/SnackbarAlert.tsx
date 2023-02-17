import { useSnackbar, VariantType } from 'notistack';

// type SnackbarAlertProps = {
//   msgVariant: 'default' | 'error' | 'success' | 'warning' | 'info';
//   msgDesc: string;
// };

const SnackbarAlert = (msgVariant: VariantType, msgDesc: string) => {
  const { enqueueSnackbar } = useSnackbar();

  return enqueueSnackbar(msgDesc, {
    variant: msgVariant,
    preventDuplicate: true,
    autoHideDuration: 3000,
  });
};

export default SnackbarAlert;
