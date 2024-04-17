import { Autocomplete, Chip, CircularProgress, TextField } from '@mui/material';

type OptionType = {
  label: string,
  data: any
}

type PlayersFieldPropTypes = {
  freeSolo?: boolean,
  label: string,
  loading?: boolean,
  multiline?: boolean,
  multiple?: boolean,
  options: OptionType[],
  onChange: (options: (string | OptionType)[] | OptionType | string) => void,
}

export default function PlayersField({
  freeSolo = false,
  label,
  loading = false,
  multiline = false,
  multiple = false,
  options,
  onChange
}: PlayersFieldPropTypes) {
  return (
    <Autocomplete
      freeSolo={freeSolo}
      loading={loading}
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
      filterSelectedOptions
      onChange={(e, value) => onChange(value ? value : [])}
      noOptionsText={'Sem jogadores'}
      fullWidth
      renderTags={(value, getTagProps) => (
        value.map((option: any, index: number) => {
          return <Chip color={'default'} label={typeof option === 'string' ? option : option.label} {...getTagProps({ index })} />
        }))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          multiline={multiline}
          rows={3}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}