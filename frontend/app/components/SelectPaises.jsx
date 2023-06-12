import Select from 'react-select'

export const SelectPaises = ({
  options = [
    { value: 'Example 1', label: 'Example 1' },
    { value: 'Example 2', label: 'Example 2' }
  ],
  Controller = () => {},
  isClearable = false,
  noOptionsMessage = '',
  defaultValue = {},
  placeholder = '',
  control = {},
  className = '',
  errors = {},
  name = '',
  rules = {}
}) => {
  return (
    <div className={className}>
      <Controller
        rules={{ ...rules }}
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={(event) => {
              onChange(event)
            }}
            value={value}
            placeholder={placeholder}
            noOptionsMessage={() => noOptionsMessage}
            isClearable={isClearable}
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                text: '#fff',
                primary25: '#f1f1f1',
                primary50: '#f1f1f1',
                primary: '#323232'
              }
            })}
          />
        )}
      />
      {errors[name] && (
        <p className='textfield_error'>{errors[name]?.message}</p>
      )}
    </div>
  )
}

export default SelectPaises
