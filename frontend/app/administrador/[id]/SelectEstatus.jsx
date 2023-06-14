import Select from 'react-select'

export const SelectEstatus = ({ onChange = () => {} }) => {
  return (
    <Select
      options={[
        { value: 'Abierto', label: 'Abierto' },
        { value: 'Finalizado', label: 'Finalizado' }
      ]}
      placeholder={'Selecciona el nuevo estatus'}
      noOptionsMessage={() => 'Sin estatus'}
      isClearable
      onChange={(event) => onChange(event)}
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
  )
}

export default SelectEstatus
