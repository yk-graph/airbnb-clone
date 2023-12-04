// [Tips] react-date-range のライブラリを使ってカレンダーを表示する方法（https://hypeserver.github.io/react-date-range/）

'use client'

import { DateRange, Range, RangeKeyDict } from 'react-date-range'

// [Tips] react-date-range のライブラリでスタイルを使うための方法
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface DatePickerProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates?: Date[]
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default DatePicker
