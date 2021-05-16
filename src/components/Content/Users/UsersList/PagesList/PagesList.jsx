import s from './PagesList.module.css'
import Preloader from '../../../../common/Preloader'
import { reduxForm } from 'redux-form'
import { createField, InputTemplate } from '../../../../common/CustomFields/CustomFields'
import { noErrorRequired, validateNum } from '../../../../../scripts/validates'
import { useValidation } from '../../../../../hooks/useValidation'

const PagesList = (props) => {
  const { pagesCount, selectedPage, isFetching } = props
  const { onPageClick, resetForm } = props

  const handleSubmit = (jsonObj) => {
    onPageClick(jsonObj.page)
    resetForm('page-search')
  }

  let pagesArr = [
    selectedPage === 3 ? 1 : null,
    selectedPage - 1 > 0 ? selectedPage - 1 : null,
    selectedPage,
    selectedPage + 1 <= pagesCount ? selectedPage + 1 : null,
    selectedPage === pagesCount - 2 ? pagesCount : null
  ]
  pagesArr = pagesArr.filter((page) => !!page)

  return (
    <div className={s.pagesList}>
      <div>
        {selectedPage >= 4 ? (
          <span>
            <span role="button" tabIndex="0" onClick={() => onPageClick(1)}>
              1
            </span>{' '}
            <span>...</span>
          </span>
        ) : (
          ''
        )}
      </div>
      <div>
        {pagesArr.map((p) => {
          return (
            <span
              role="button"
              tabIndex="0"
              key={p}
              onClick={() => onPageClick(p)}
              className={selectedPage === p ? s.selectedPage : undefined}
            >
              {p}
            </span>
          )
        })}
      </div>
      <div>
        {selectedPage <= pagesCount - 3 ? (
          <span>
            <span>...</span>
            <span role="button" tabIndex="0" onClick={() => onPageClick(pagesCount)}>
              {pagesCount}
            </span>
          </span>
        ) : (
          ''
        )}
      </div>
      <PageSearchForm onSubmit={handleSubmit} />
      <span className={s.preloader}>
        <Preloader isFetching={isFetching} />
      </span>
    </div>
  )
}

export default PagesList

let PageSearchForm = ({ handleSubmit }) => {
  const [pageVO] = useValidation(false)

  return (
    <form onSubmit={handleSubmit} className={s.pageSearchForm}>
      {createField(
        InputTemplate,
        'page',
        'text',
        'Enter page',
        [validateNum, noErrorRequired],
        pageVO.setIsValid
      )}
      <div>
        <button type="submit" disabled={!pageVO.isValid}>
          Go!
        </button>
      </div>
    </form>
  )
}

PageSearchForm = reduxForm({ form: 'page-search' })(PageSearchForm)
