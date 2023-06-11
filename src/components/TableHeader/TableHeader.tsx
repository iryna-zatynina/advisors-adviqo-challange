import React from "react";
import "./TableHeader.scss";

const TableHeader = () => {
    return (
        <div className="tableHeader">
            <span className="name">Name</span>
            <span>Language</span>
            <span className="reviews">Reviews</span>
            <span>On site since</span>
            <span>Status</span>
        </div>
    )
}

export default TableHeader;