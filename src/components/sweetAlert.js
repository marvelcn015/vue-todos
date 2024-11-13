import Swal from 'sweetalert2'

const sweetAlert = (title, text, icon, confirmButtonText) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  })
}

export default sweetAlert
