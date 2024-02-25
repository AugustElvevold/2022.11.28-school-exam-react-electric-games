import { React } from 'react';

function DisplayMessage(props) {

  const handleOkClick=()=>{
    props.setUserInformed(true)
    props.setUpdateFlag(prev=>!prev)
  }

  return (
    <section className='popup-section'>
      <div className="popup-menu popup-message">
        <h4 className='popup-menu-title'>Update or Delete</h4>
        <div className='popup-message-content'>
            <p>If you want to update or delete: Hover over image, and click the three dots button in the top right corner on the card.</p>
            <img className='card popup-image-update-delete-hint' src={require("../img/update-delete-hint.png")} alt="how to update or delete" />
            <br />
            <p>This message won't show up again until localstorage "user-informed" is set to true</p>
        </div>
        <div className='popup-menu-footer'>
          <input type="button" className='btn btn-primary' value="Ok" onClick={handleOkClick}/>
        </div>
      </div>
    </section>
  );
}

export default DisplayMessage;