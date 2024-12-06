import { alert } from "../store/store";

export function showAlert(type, content) {
  alert.set({ type, content, show: true });
}

export function hideAlert() {
  alert.set({ type: "", content: "", show: false });
}

export function trigerAlert(type, content, time=3000) {
  showAlert(type, content);
  setTimeout(() => {
    hideAlert();
  }, time);
}


export function triggerErrorAlert(content, time=3000) {
  trigerAlert("error", content, time);
  throw new Error(content);
}