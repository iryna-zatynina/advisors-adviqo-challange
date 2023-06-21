// @ts-nocheck
import React from "react";
import "./TableHeader.scss";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface  TableHeaderProps {
    sortAdvisors: (x: string) => void;
}

const TableHeader = ({sortAdvisors} :TableHeaderProps):JSX.Element => {
    return (
        <div className="TableHeader">
            <span className="name">Name</span>
            <span>Language</span>
            <span className="reviews">
                Reviews  
                <div className="arrows">
                    <CaretUpOutlined onClick={() => sortAdvisors('ascending')}/> 
                    <CaretDownOutlined onClick={() => sortAdvisors('descending')}/>
                </div>
                </span>
            <span>On site since</span>
            <span>Status</span>
        </div>
    )
}

export default TableHeader;