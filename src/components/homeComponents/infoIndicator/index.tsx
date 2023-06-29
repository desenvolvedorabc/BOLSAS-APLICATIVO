import { Box } from './styledComponents';

export function InfoIndicator({ icon, value, title, border }) {
  return (
    <Box border={border}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
        <div>{icon}</div>
        <div style={{ marginLeft: 10, fontSize: 21 }}>{value}</div>
      </div>
      <div style={{ fontSize: 11 }}>{title}</div>
    </Box>
  );
}
