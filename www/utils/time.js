export const timeFormat = (date) => {
  const yyyy = date.getFullYear();
  const d = date.getDate();
  const H = date.getHours();
  const m = date.getMonth() + 1;
  const mm = m  < 10 ? '0' + m : m;
  return (yyyy === new Date().getFullYear ? yyyy + '-' : '' )
          + `${m}-${d} ${H}:${mm}`;
};

