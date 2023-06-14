import { useEffect, useState } from 'react'
import Select from 'react-select'
import Skeleton from '@mui/material/Skeleton'

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
  className = 'w-100',
  errors = {},
  name = '',
  rules = {}
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [optionsPaises, setOptionsPaises] = useState([])
  useEffect(() => {
    const getPaises = async () => {
      const request = await fetch('http://localhost:9000/api/v1/paises', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      const response = await request.json()
      const swapData = response?.data?.map((item) => {
        return {
          ...item,
          value: item.id,
          label: item.nombrePais
        }
      })
      setOptionsPaises(swapData || [])
      setIsLoading(false)
    }
    getPaises()
  }, [])

  return (
    <>
      {isLoading ? (
        <Skeleton variant='rounded' width={'100%'} height={30} />
      ) : (
        <div className={'w-100'}>
          <Controller
            rules={{ ...rules }}
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={(event) => {
                  onChange(event)
                }}
                placeholder={placeholder}
                noOptionsMessage={() => noOptionsMessage}
                isClearable={isClearable}
                options={optionsPaises}
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
      )}
    </>
  )
}

export default SelectPaises
