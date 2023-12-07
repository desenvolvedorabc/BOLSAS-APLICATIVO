export function MissingDataWarning() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          border: '1px solid #d5d5d5',
          padding: '20px',
          borderRadius: '8px',
          color: '#A9A9A9',
        }}
      >
        <em>Não há resultados para o filtro aplicado.</em>
      </div>
    </div>
  )
}