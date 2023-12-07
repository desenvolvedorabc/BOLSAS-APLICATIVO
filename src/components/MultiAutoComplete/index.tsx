import { Autocomplete, Checkbox, TextField } from '@mui/material';
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from 'react-icons/md';

import { Box, Caption } from './styles';

interface IMultiAutoCompleteProps {
  name: string;
  options: any[];
  value?: any
  handleSelect?: any
  disabled?: boolean
}

export function MultiAutoComplete({ name, options, value, handleSelect,disabled }: IMultiAutoCompleteProps) {

  return (
    <Box>
      <Autocomplete
        sx={{
          minWidth: 150
        }}
        disabled={disabled}
        multiple
        disableCloseOnSelect
        value={value}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={handleSelect}
        renderTags={(props) => {
          return (
            <Caption>{props?.length || ''} Selecionados</Caption>
          )
        }}
        id={name.toLowerCase()}
        size="small"
        noOptionsText={name}
        options={options || []}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<MdOutlineCheckBoxOutlineBlank size={24} color="#A12C81" />}
                checkedIcon={<MdOutlineCheckBox size={24} color="#A12C81" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          )
        }
        renderInput={(params) => (
          <TextField size="small" {...params} label={name} />
        )}
      />
    </Box>
  );
}
