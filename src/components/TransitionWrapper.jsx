import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import './TransitionWrapper.css'; // For the spinner styles (explained below)

const TransitionWrapper = ({ children, delay = 300 }) => {
    const [showChildren, setShowChildren] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        setShowChildren(false);
        const timeout = setTimeout(() => {
            setLoading(false);
            setShowChildren(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [location.pathname, delay]);

    return (
        <div className="transition-wrapper">
            {loading && (
                <div className="spinner">
                    <div className="lds-dual-ring"></div> {/* Simple loading spinner */}
                </div>
            )}
            <div
                style={{
                    opacity: showChildren ? 1 : 0,
                    transition: `opacity ${delay}ms ease-in-out`,
                }}
            >
                {showChildren && children}
            </div>
        </div>
    );
};

TransitionWrapper.propTypes = {
    children: PropTypes.node,
    delay: PropTypes.number,
};

export default TransitionWrapper;
