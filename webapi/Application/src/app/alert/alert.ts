interface Alert {
  type: string;
  message: string;
}

const enum AlertType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  primary = 'primary'
}
