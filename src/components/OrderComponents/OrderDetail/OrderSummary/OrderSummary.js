import React from 'react'

class OrderSummary extends React.Component {
  render() {
    let { pager } = this.state
    return (
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>เพิ่มการจอง</strong>
          </div>
        </div>
        <hr />
        <div className="card-body" />
      </div>
    )
  }
}

export default OrderSummary
