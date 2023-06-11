import React from "react";
import "./AdvisorCard.scss";
import cn from "classnames";
import Start from "../../icons/star";

interface AdvisorCardProps {
    advisor: {
        icon: string,
        fullName: string,
        reviews: number,
        language: string,
        status: string,
        onSiteSince: string
    }
}

const AdvisorCard = ({advisor}: AdvisorCardProps) => {
    return (
        <div className="AdvisorCard">
            <span className="avatar"><img src={advisor.icon}/></span>
            <span className="fullName">{advisor.fullName}</span>
            <span>{advisor.language}</span>
            <div className="reviews"><Start /><span >{advisor.reviews}</span><Start /></div>
            <span>{advisor.onSiteSince}</span>
            <span className={cn("status", {
                ["online"]: advisor.status === "online"
            })}>{advisor.status}</span>
        </div>
    )
}

export default AdvisorCard;