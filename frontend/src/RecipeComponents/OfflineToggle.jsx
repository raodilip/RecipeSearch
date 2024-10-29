import React from 'react';

function OfflineToggle({ isOffline, onToggle }) {
    return (
        <div className="form-check form-switch">
            {/* <label>
                <input
                    type="checkbox"
                    checked={isOffline}
                    onChange={onToggle}
                />
                Offline Mode
            </label> */}
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isOffline}
                    onChange={onToggle} />
            <label className="form-check-label" >Offline Mode</label>
        </div>
        
    );
}

export default OfflineToggle;