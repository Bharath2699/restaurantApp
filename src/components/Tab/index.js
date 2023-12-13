import './index.css'

const Tab = props => {
  const {tabDetails, onSelectTab, isActive} = props
  const {menuCategoryId, category} = tabDetails

  const onClickTab = () => {
    onSelectTab(menuCategoryId)
  }

  let activeTab
  if (isActive) {
    activeTab = 'active'
  }
  return (
    <button
      type="button"
      className={`tab-button ${activeTab}`}
      onClick={onClickTab}
    >
      {category}
    </button>
  )
}
export default Tab
