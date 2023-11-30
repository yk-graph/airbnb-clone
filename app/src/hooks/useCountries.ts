/*
  [Tips] 世界の国と国旗を表示してくれるライブラリ
  カスタムフック -> getAll...全ての国の情報を取得する
  カスタムフック -> getByValue...選択された国の情報を取得する
*/

import countries from 'world-countries'

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}))

const useCountries = () => {
  const getAll = () => formattedCountries

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value)
  }

  return {
    getAll,
    getByValue,
  }
}

export default useCountries
