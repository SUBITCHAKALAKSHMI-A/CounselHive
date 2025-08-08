import { useState } from 'react'
import { FaComment, FaPhone, FaBookmark } from 'react-icons/fa'

const QuickAccessWidgets = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="quick-access-widgets position-fixed bottom-0 end-0 p-3">
      <div className="d-flex flex-column gap-3">
        {expanded && (
          <>
            <button className="btn btn-primary rounded-circle p-3 shadow">
              <FaComment size={24} />
            </button>
            <button className="btn btn-danger rounded-circle p-3 shadow">
              <FaPhone size={24} />
            </button>
            <button className="btn btn-warning rounded-circle p-3 shadow">
              <FaBookmark size={24} />
            </button>
          </>
        )}
        <button 
          className="btn btn-dark rounded-circle p-3 shadow"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '×' : '+'}
        </button>
      </div>
    </div>
  )
}

export default QuickAccessWidgets