import { Menu } from '@mui/material';
import { useState, MouseEvent } from 'react';
import * as S from './styles';
import { MdExpandMore } from 'react-icons/md';

type ButtonProps = {
  handlePrint: () => void;
  handleCsv: (e) => void;
};

export function ButtonMenu({ handlePrint, handleCsv }: ButtonProps) {
  const [anchorExport, setAnchorExport] = useState<null | HTMLElement>(null);
  const openExport = Boolean(anchorExport);
  const handleClickExport = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorExport(event.currentTarget);
  };
  const handleCloseExport = (e, type: string) => {
    if (type === 'pdf') handlePrint();
    else if (type === 'excel') handleCsv(e);
    setAnchorExport(null);
  };

  return (
    <>
      <S.ButtonMenu
        style={{ border: '1px solid #A12C81' }}
        className="export"
        id="export-button"
        aria-controls={openExport ? 'export-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openExport ? 'true' : undefined}
        onClick={handleClickExport}
      >
        Exportar Lista Em
        <MdExpandMore size={22} />
      </S.ButtonMenu>
      <Menu
        id="export-menu"
        anchorEl={anchorExport}
        open={openExport}
        onClose={(e) => handleCloseExport(e, null)}
      >
        {handlePrint && (
          <S.MenuItemStyled onClick={(e) => handleCloseExport(e, 'pdf')}>
            PDF (Gráfico)
          </S.MenuItemStyled>
        )}
        {handleCsv && (
          <S.MenuItemStyled onClick={(e) => handleCloseExport(e, 'excel')}>
            EXCEL (Dados)
          </S.MenuItemStyled>
        )}
      </Menu>
    </>
  );
}
