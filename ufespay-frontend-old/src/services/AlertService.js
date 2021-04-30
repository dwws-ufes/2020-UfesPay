import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const fireToastAlert = (type, text) => {
  MySwal.fire({
    toast: true,
    showConfirmButton: false,
    timer: 3000,
    position: 'bottom-end',
    title: text,
    background: type === 'error' ? '#ffbbbb' : '#bbffbb',
  });
};

export const fireConfimationAlert = async text => {
  const { isConfirmed } = await MySwal.fire({
    text,
    showCancelButton: true,
  });
  return isConfirmed;
};
