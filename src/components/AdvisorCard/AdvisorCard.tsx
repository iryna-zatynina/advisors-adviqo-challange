import React from "react";
import "./AdvisorCard.scss";
import cn from "classnames";
import Start from "../../icons/star";
import { IAdvisor } from "../../interfaces/interfaces";

interface AdvisorCardProps {
    advisor: IAdvisor
}

const AdvisorCard = ({advisor}: AdvisorCardProps) => {
    return (
        <div className="AdvisorCard">
            <span className="avatar"><img src={advisor.icon} alt="icon"/></span>
            <span className="fullName">{advisor.fullName}</span>
            <span>{advisor.language}</span>
            <div className="reviews"><Start /><span >{advisor.reviews}</span><Start /></div>
            <span>{advisor.onSiteSince}</span>
            <span className={cn("status", {
                "online": advisor.status === "online"
            })}>{advisor.status}</span>
        </div>
    )
}

export default AdvisorCard;