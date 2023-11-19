import Swal from "sweetalert2";

export function executeSwal(text, icon) {
  Swal.fire({
    text: text,
    icon: icon,
    confirmButtonText: "확인",
    confirmButtonColor: "#e06c75"
  })
}