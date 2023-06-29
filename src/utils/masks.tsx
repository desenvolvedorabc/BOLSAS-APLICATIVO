export const maskCEP = (value) => {
  if (!value) return;
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
};

export const maskCPF = (value) => {
  if (!value) return;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const maskPhone = (value) => {
  if (!value) return;
  return value
    .replace(/\D/g, '')
    .replace(/(\d{0})(\d)/, '$1($2')
    .replace(/(\d{2})(\d)/, '$1)$2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

export function formatLink(text: string): string {
  let str = text.replace(/^\s+|\s+$/g, '').toLowerCase();
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return str;
}
