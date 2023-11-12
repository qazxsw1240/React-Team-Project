import Swal from "sweetalert2";

export function executeSwal(text, icon) {
    Swal.fire({
        text: text,
        icon: icon,
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('알림이 확인되었습니다.');
        }
    });
}