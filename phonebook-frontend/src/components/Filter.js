const Filter = (props) => {
    return (
      <div>
        filter shown with <input value={props.showAll} onChange={props.handleToShowChange} />
      </div>
    )
}

export default Filter